import { useEffect, useState } from "react";
import { Inbox, LogOut, LockKeyhole, Loader2, MailOpen } from "lucide-react";

const API = process.env.REACT_APP_BACKEND_URL;

const fmtDate = (iso) => {
  try {
    return new Date(iso).toLocaleString(undefined, { dateStyle: "medium", timeStyle: "short" });
  } catch {
    return "—";
  }
};

export default function AdminMessages() {
  const [checking, setChecking] = useState(true);
  const [authed, setAuthed] = useState(false);
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("");
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const api = (path, init = {}) =>
    fetch(`${API}/api${path}`, {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      ...init,
    });

  useEffect(() => {
    api("/admin/messages")
      .then(r => { setAuthed(r.ok); setChecking(false); })
      .catch(() => setChecking(false));
  }, []);

  const load = async () => {
    setLoading(true);
    try {
      const r = await api("/admin/messages");
      if (r.status === 401) { setAuthed(false); setMessages([]); }
      else if (r.ok) setMessages(await r.json());
    } finally {
      setLoading(false);
    }
  };

  const login = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const r = await api("/admin/login", { method: "POST", body: JSON.stringify({ passcode }) });
      if (!r.ok) { setError("Invalid passcode"); return; }
      setPasscode("");
      setAuthed(true);
      load();
    } catch {
      setError("Login failed — please try again");
    }
  };

  const logout = async () => {
    await api("/admin/logout", { method: "POST" }).catch(() => {});
    setAuthed(false);
    setMessages([]);
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A1128] text-slate-400">
        <Loader2 className="h-5 w-5 animate-spin" />
      </div>
    );
  }

  if (!authed) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A1128] px-6 text-slate-100">
        <form
          onSubmit={login}
          className="w-full max-w-sm rounded-3xl border border-sky-400/15 bg-[#0F1B3D]/60 p-8 shadow-2xl backdrop-blur-xl"
          data-testid="admin-login-form"
        >
          <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-2xl border border-sky-400/25 bg-sky-400/10 text-sky-300">
            <LockKeyhole className="h-5 w-5" />
          </div>
          <h1 className="font-display text-2xl font-bold">Messages Admin</h1>
          <p className="mt-1 text-sm text-slate-400">Enter your admin passcode to view contact messages.</p>
          <input
            type="password"
            value={passcode}
            onChange={e => { setPasscode(e.target.value); setError(""); }}
            placeholder="Admin passcode"
            data-testid="admin-passcode-input"
            className="mt-6 w-full rounded-xl border border-sky-400/20 bg-[#0A1128]/70 px-4 py-3 text-sm text-slate-100 outline-none transition-colors duration-200 placeholder:text-slate-500 focus:border-sky-400"
          />
          {error && <p className="mt-2 text-xs text-red-400" data-testid="admin-login-error">{error}</p>}
          <button
            type="submit"
            data-testid="admin-login-btn"
            className="mt-5 w-full rounded-xl bg-gradient-to-r from-sky-400 to-emerald-400 py-3 text-sm font-semibold text-[#04101F] transition-transform duration-200 hover:-translate-y-0.5"
          >
            Sign In
          </button>
          <a href="/" className="mt-4 block text-center text-xs text-slate-500 hover:text-sky-300">← Back to portfolio</a>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0A1128] px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-4xl">
        <div className="mb-8 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <span className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/25 bg-emerald-400/10 text-emerald-300">
              <Inbox className="h-5 w-5" />
            </span>
            <div>
              <h1 className="font-display text-2xl font-bold">Contact Messages</h1>
              <p className="text-xs text-slate-400">{messages.length} message{messages.length === 1 ? "" : "s"} received</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={load}
              data-testid="admin-refresh-btn"
              className="rounded-full border border-sky-400/25 px-4 py-2 text-xs text-sky-300 transition-colors duration-200 hover:border-sky-400"
            >
              {loading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : "Refresh"}
            </button>
            <button
              onClick={logout}
              data-testid="admin-logout-btn"
              className="flex items-center gap-1.5 rounded-full border border-slate-600 px-4 py-2 text-xs text-slate-300 transition-colors duration-200 hover:border-red-400 hover:text-red-300"
            >
              <LogOut className="h-3.5 w-3.5" /> Sign Out
            </button>
          </div>
        </div>

        {messages.length === 0 ? (
          <div className="rounded-3xl border border-slate-700/60 bg-[#0F1B3D]/50 p-16 text-center" data-testid="admin-empty-state">
            <MailOpen className="mx-auto mb-4 h-8 w-8 text-slate-600" />
            <p className="text-sm text-slate-400">No messages yet — new contact-form submissions will appear here.</p>
          </div>
        ) : (
          <div className="space-y-4" data-testid="admin-messages-list">
            {messages.map((m, i) => (
              <article
                key={m._id || i}
                data-testid="admin-message-row"
                className="rounded-2xl border border-slate-700/60 bg-[#0F1B3D]/50 p-6 transition-colors duration-200 hover:border-sky-400/40"
              >
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-display text-lg font-semibold">{m.name}</h2>
                  <span className="font-mono text-[11px] text-slate-500">{fmtDate(m.created_at)}</span>
                </div>
                <p className="mt-1 text-sm text-sky-300">{m.email}</p>
                {m.subject ? <p className="font-mono mt-1 text-[11px] uppercase tracking-widest text-emerald-300">{m.subject}</p> : null}
                <p className="mt-3 whitespace-pre-wrap text-sm leading-relaxed text-slate-300">{m.message}</p>
              </article>
            ))}
          </div>
        )}

        <a href="/" className="mt-10 block text-center text-xs text-slate-500 hover:text-sky-300">← Back to portfolio</a>
      </div>
    </div>
  );
}
