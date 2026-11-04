import os
import re
import sys
from datetime import datetime, timezone
from typing import List

from bson import ObjectId
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
from pydantic import BaseModel, BeforeValidator, EmailStr, Field
from typing_extensions import Annotated

load_dotenv()


def to_object_id(v):
    if isinstance(v, ObjectId):
        return str(v)
    return v


PyObjectId = Annotated[str, BeforeValidator(to_object_id)]


class BaseDocument(BaseModel):
    id: PyObjectId = Field(default_factory=lambda: str(ObjectId()), alias="_id")

    model_config = {"populate_by_name": True, "arbitrary_types_allowed": True}

    def to_mongo(self):
        doc = self.model_dump(by_alias=True)
        if isinstance(doc.get("_id"), str):
            doc["_id"] = ObjectId(doc["_id"])
        return doc

    @classmethod
    def from_mongo(cls, doc):
        return cls(**doc)


class ContactMessage(BaseDocument):
    name: str
    email: str
    subject: str = ""
    project_type: str = ""
    message: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class StatusResponse(BaseModel):
    status: str
    database: str


MONGO_URL = os.environ.get("MONGO_URL")
DB_NAME = os.environ.get("DB_NAME", "test_database")
if not MONGO_URL:
    print("MONGO_URL not configured", file=sys.stderr)
    raise SystemExit(1)

app = FastAPI(title="Aditi Pusnake Portfolio API")
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"],
)

client = AsyncIOMotorClient(MONGO_URL)
db = client[DB_NAME]

# --- Emergent managed email integration (contact-form owner notification) ---
import base64
import hashlib
import hmac
import httpx
import json
import logging
import time
from html import escape
from html.parser import HTMLParser
from urllib.parse import urlparse
import ipaddress
from fastapi import Cookie, Depends, Request, Response
from pwdlib import PasswordHash

logger = logging.getLogger(__name__)

EMAIL_BASE_URL = "https://integrations.emergentagent.com"
EMAIL_KEY = os.environ["EMERGENT_EMAIL_KEY"]
EMAIL_FROM_NAME = os.environ["EMAIL_FROM_NAME"]
OWNER_EMAIL = os.environ.get("OWNER_EMAIL", "")
EMAIL_REPLY_TO = os.environ.get("EMAIL_REPLY_TO", "")

SESSION_SECRET = os.environ["SESSION_SECRET"].encode()
ADMIN_PASSCODE_HASH = os.environ["ADMIN_PASSCODE_HASH"]
password_hash = PasswordHash.recommended()

_SHORTENERS = ("bit.ly", "tinyurl.com", "t.co", "is.gd", "cutt.ly", "goo.gl", "rebrand.ly")
_CRED_ASK = ("reply with your password", "reply with the code", "send your password", "cvv",
             "send us your password", "enter your password below", "confirm your card number",
             "your full card number", "seed phrase", "recovery phrase", "verify your card",
             "social security number", "confirm your bank details")
_HOSTISH = re.compile(r"\b(?:https?://)?((?:[a-z0-9-]+\.)+[a-z]{2,})", re.I)


def _host_ok(host: str) -> bool:
    if not host or "xn--" in host:
        return False
    try:
        ipaddress.ip_address(host)
        return False
    except ValueError:
        pass
    return not any(host == s or host.endswith("." + s) for s in _SHORTENERS)


def _same_site(shown: str, real: str) -> bool:
    return shown == real or real.endswith("." + shown) or shown.endswith("." + real)


class _EmailScan(HTMLParser):
    def __init__(self):
        super().__init__()
        self.tags, self.urls, self.anchors = set(), [], []
        self._href, self._text = None, []

    def handle_starttag(self, tag, attrs):
        self.tags.add(tag.lower())
        self.urls += [v for k, v in attrs if k.lower() in ("href", "src") and v]
        if tag.lower() == "a":
            self._href = dict((k.lower(), v) for k, v in attrs).get("href")
            self._text = []

    def handle_data(self, data):
        if self._href is not None:
            self._text.append(data)

    def handle_endtag(self, tag):
        if tag.lower() == "a" and self._href is not None:
            self.anchors.append((self._href, "".join(self._text)))
            self._href, self._text = None, []


def _assert_safe_email(subject: str, html: str) -> None:
    scan = _EmailScan()
    scan.feed(html)
    if scan.tags & {"form", "input", "textarea", "select"}:
        raise ValueError("No forms or input fields in email (G2)")
    body = f"{subject}\n{html}".lower()
    for p in _CRED_ASK:
        if p in body:
            raise ValueError(f"Email asks the recipient for credentials: {p!r} (G2)")
    for url in scan.urls:
        low = url.strip().lower()
        if low.startswith(("mailto:", "tel:", "cid:", "#")):
            continue
        if not low.startswith("https://"):
            raise ValueError(f"Email links/assets must be absolute https: {url!r} (G3)")
        host = urlparse(low).hostname or ""
        if not _host_ok(host) or urlparse(low).username is not None:
            raise ValueError(f"Shortened, numeric-host or credential-bearing URL: {url!r} (G3)")
    for href, text in scan.anchors:
        real = urlparse(href.strip().lower()).hostname or ""
        if not real:
            continue
        for m in _HOSTISH.finditer(text):
            if not _same_site(m.group(1).lower(), real):
                raise ValueError(f"Anchor text {m.group(1)!r} != real link host {real!r} (G3)")


async def send_email(*, to: str, subject: str, html: str, reply_to: str | None = None) -> str | None:
    _assert_safe_email(subject, html)
    payload = {"to": [to], "subject": subject, "html": html, "from_name": EMAIL_FROM_NAME}
    if reply_to or EMAIL_REPLY_TO:
        payload["contact_email"] = reply_to or EMAIL_REPLY_TO
    try:
        async with httpx.AsyncClient(timeout=30) as http:
            resp = await http.post(
                f"{EMAIL_BASE_URL}/api/v1/email/send",
                headers={"X-Email-Key": EMAIL_KEY},
                json=payload,
            )
        resp.raise_for_status()
        return resp.json().get("id")
    except httpx.HTTPStatusError as e:
        try:
            code = e.response.json().get("code", "")
        except ValueError:
            code = ""
        if code in ("insufficient_credits", "integration_disabled", "daily_limit_reached"):
            logger.warning(f"Email paused: {code} ({e.response.status_code}): {e.response.json().get('message', '')}")
            raise HTTPException(status_code=503, detail="Email is temporarily unavailable")
        logger.error(f"Email send failed: {e.response.status_code} {e.response.text}")
        raise HTTPException(status_code=502, detail="Failed to send email")
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Email send error: {str(e)}")
        raise HTTPException(status_code=500, detail="Failed to send email")


def _contact_notification_html(p: ContactMessage) -> str:
    return (
        '<table role="presentation" width="100%" style="background:#0A1128;padding:28px">'
        '<tr><td style="font-family:Arial,sans-serif;color:#F0F9FF">'
        '<h2 style="margin:0 0 14px;font-size:20px">New portfolio message</h2>'
        f'<p style="margin:0 0 8px"><strong style="color:#7DD3FC">From:</strong> {escape(p.name)} <{escape(p.email)}></p>'
        f'<p style="margin:0 0 8px"><strong style="color:#6EE7B7">Subject:</strong> {escape(p.subject)}</p>'
        f'<p style="margin:16px 0;white-space:pre-wrap;line-height:1.6">{escape(p.message)}</p>'
        f'<p style="font-size:12px;color:#94A3B8;margin-top:24px">Sent by your {escape(EMAIL_FROM_NAME)} portfolio contact form. We never ask for your password or card details by email.</p>'
        '</td></tr></table>'
    )


# --- Lightweight admin passcode session (signed cookie, no plaintext stored) ---
def _b64(value: bytes) -> str:
    return base64.urlsafe_b64encode(value).decode().rstrip("=")


def _sign(payload: bytes) -> str:
    return _b64(hmac.new(SESSION_SECRET, payload, hashlib.sha256).digest())


def make_session() -> str:
    payload = json.dumps({"exp": int(time.time()) + 60 * 60 * 8}, separators=(",", ":")).encode()
    return f"{_b64(payload)}.{_sign(payload)}"


def valid_session(token: str | None) -> bool:
    try:
        encoded, signature = (token or "").split(".", 1)
        payload = base64.urlsafe_b64decode(encoded + "===")
        expected = _sign(payload)
        data = json.loads(payload)
        return hmac.compare_digest(signature, expected) and int(data["exp"]) > int(time.time())
    except (ValueError, KeyError, TypeError, json.JSONDecodeError):
        return False


async def require_admin(admin_session: str | None = Cookie(default=None)):
    if not valid_session(admin_session):
        raise HTTPException(status_code=401, detail="Not authenticated")


class AdminLogin(BaseModel):
    passcode: str = Field(min_length=8, max_length=256)


@app.get("/api/")
async def root():
    return {"message": "Portfolio API running"}


@app.get("/api/health", response_model=StatusResponse)
async def health():
    await client.admin.command("ping")
    return StatusResponse(status="ok", database=DB_NAME)


_RATE_LIMIT = 3
_RATE_WINDOW = 600


def _client_ip(request: Request) -> str:
    fwd = request.headers.get("x-forwarded-for", "")
    return fwd.split(",")[0].strip() or (request.client.host if request.client else "unknown")


async def _contact_rate_ok(ip: str) -> bool:
    now = time.time()
    cutoff = now - _RATE_WINDOW
    col = db.contact_rate_limits
    doc = await col.find_one({"_id": ip})
    stamps = [t for t in (doc or {}).get("timestamps", []) if t > cutoff]
    if len(stamps) >= _RATE_LIMIT:
        await col.update_one({"_id": ip}, {"$set": {"timestamps": stamps}}, upsert=True)
        return False
    stamps.append(now)
    await col.update_one({"_id": ip}, {"$set": {"timestamps": stamps}}, upsert=True)
    return True


@app.post("/api/contact", response_model=ContactMessage)
async def submit_contact(payload: ContactMessage, request: Request):
    ip = _client_ip(request)
    if not await _contact_rate_ok(ip):
        raise HTTPException(status_code=429, detail="Too many messages sent. Please wait a few minutes before trying again.")
    payload.created_at = datetime.now(timezone.utc)
    result = await db.contact_messages.insert_one(payload.to_mongo())
    doc = await db.contact_messages.find_one({"_id": result.inserted_id})
    if not doc:
        raise HTTPException(status_code=500, detail="Failed to store message")
    if OWNER_EMAIL:
        try:
            await send_email(
                to=OWNER_EMAIL,
                subject=f"New portfolio message from {payload.name}",
                html=_contact_notification_html(payload),
                reply_to=payload.email,
            )
        except Exception as e:
            logger.warning(f"Owner notification not sent: {e}")
    return ContactMessage.from_mongo(doc)


@app.get("/api/admin/messages")
async def admin_messages(_: None = Depends(require_admin)):
    docs = await db.contact_messages.find({}, {"_id": 0}).sort("created_at", -1).to_list(200)
    return docs


@app.post("/api/admin/login")
async def admin_login(body: AdminLogin, response: Response):
    if not ADMIN_PASSCODE_HASH:
        raise HTTPException(status_code=503, detail="Admin passcode not configured")
    if not password_hash.verify(body.passcode, ADMIN_PASSCODE_HASH):
        raise HTTPException(status_code=401, detail="Invalid passcode")
    response.set_cookie(
        "admin_session", make_session(), httponly=True, secure=False,
        samesite="lax", max_age=60 * 60 * 8, path="/",
    )
    return {"ok": True}


@app.post("/api/admin/logout")
async def admin_logout(response: Response):
    response.delete_cookie("admin_session", path="/")
    return {"ok": True}
