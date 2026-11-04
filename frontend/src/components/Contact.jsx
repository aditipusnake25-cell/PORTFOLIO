import { useState, useRef } from "react";
import { toast } from "sonner";
import { Copy, Send, Github, Linkedin, Mail, MapPin, Loader2, CheckCircle2, AlertCircle, ChevronRight } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const EMAIL = "aditipusnake15@gmail.com";

const CONTACT_ROWS = [
  { icon: Mail, label: "Email", value: EMAIL, href: null, copyable: true, testid: "contact-row-email" },
  { icon: MapPin, label: "Location", value: "Yavatmal, Maharashtra, India", href: null, testid: "contact-row-location" },
  { icon: Linkedin, label: "LinkedIn", value: "aditi-pusnake", href: "https://www.linkedin.com/in/aditi-pusnake-143230400/", testid: "contact-row-linkedin" },
  { icon: Github, label: "GitHub", value: "aditipusnake25-cell", href: "https://github.com/aditipusnake25-cell", testid: "contact-row-github" },
];

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const EMPTY_FORM = { name: "", email: "", subject: "", message: "" };

export default function Contact() {
  const [form, setForm] = useState(EMPTY_FORM);
  const [errors, setErrors] = useState({});
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState("");
  const inFlight = useRef(false);

  const update = (k) => (e) => {
    setForm(f => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors(er => ({ ...er, [k]: "" }));
    if (sendError) setSendError("");
  };

  const validate = () => {
    const er = {};
    if (!form.name.trim()) er.name = "Please enter your full name";
    if (!form.email.trim()) er.email = "Please enter your email address";
    else if (!EMAIL_RE.test(form.email.trim())) er.email = "That doesn't look like a valid email";
    if (!form.subject.trim()) er.subject = "Please add a subject";
    if (!form.message.trim()) er.message = "Please write a short message";
    setErrors(er);
    return Object.keys(er).length === 0;
  };

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(EMAIL);
      toast.success("Email copied to clipboard");
    } catch {
      toast.error("Could not copy email");
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    if (inFlight.current) return;
    if (!validate()) return;
    inFlight.current = true;
    setSending(true);
    setSent(false);
    setSendError("");
    try {
      const res = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, project_type: form.subject }),
      });
      if (!res.ok && res.status !== 429) throw new Error();
      if (res.status === 429) {
        setSendError("You've sent a few messages recently — please wait a few minutes before sending another.");
        toast.error("Too many messages — please wait a few minutes");
        return;
      }
      setSent(true);
      setForm(EMPTY_FORM);
      toast.success("Message sent — I'll get back to you soon");
    } catch {
      setSendError("Something went wrong sending your message. Please try again in a moment.");
      toast.error("Sending failed — please try again");
    } finally {
      inFlight.current = false;
      setSending(false);
    }
  };

  const inputClass = (k) =>
    `input-field w-full rounded-xl border px-4 py-3 text-sm outline-none transition-colors duration-200 focus:border-accent-sky ${
      errors[k] ? "border-red-400/70" : "border-border-subtle"
    }`;

  return (
    <section id="contact" className="relative scroll-mt-24 overflow-hidden px-6 py-4 md:py-8">
      <div
        className="pointer-events-none absolute left-1/2 top-0 -z-[1] h-[28rem] w-[52rem] -translate-x-1/2 opacity-60 blur-3xl"
        style={{ background: "radial-gradient(ellipse at center, var(--glow-sky), transparent 65%)" }}
      />
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="08 — Contact" title="Let's Build Something Together." testid="contact-heading" />

        <div className="grid gap-10 lg:grid-cols-[0.85fr_1.15fr]">
          <div className="space-y-6">
            <Reveal>
              <p className="max-w-md text-lg leading-relaxed text-muted-foreground" data-testid="contact-description">
                Have an opportunity, an interesting idea, or just want to connect? I'd love to hear from you!
              </p>
            </Reveal>

            <div className="space-y-3">
              {CONTACT_ROWS.map((row, i) => (
                <Reveal key={row.label} delay={0.08 + i * 0.06}>
                  <div
                    className="glass group flex items-center gap-4 rounded-2xl px-5 py-4 transition-all duration-300 hover:border-accent-sky/40 hover:shadow-lg"
                    style={{ boxShadow: "0 0 0 rgba(0,0,0,0)" }}
                    data-testid={row.testid}
                  >
                    <span
                      className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-border-subtle text-accent-sky transition-all duration-300 group-hover:border-accent-sky/50"
                      style={{ background: "var(--glow-sky)" }}
                    >
                      <row.icon className="h-4.5 w-4.5" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="font-mono-code block text-[10px] uppercase tracking-[0.25em] text-accent-mint">{row.label}</span>
                      <span className="block truncate text-sm font-medium">{row.value}</span>
                    </span>
                    {row.copyable ? (
                      <button
                        onClick={copyEmail}
                        aria-label="Copy email address"
                        data-testid="contact-copy-email"
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-subtle text-muted-foreground transition-colors duration-200 hover:border-accent-sky hover:text-accent-sky"
                      >
                        <Copy className="h-3.5 w-3.5" />
                      </button>
                    ) : row.href ? (
                      <a
                        href={row.href}
                        aria-label={`${row.label} profile`}
                        data-testid={`${row.testid}-link`}
                        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-border-subtle text-muted-foreground transition-all duration-200 hover:border-accent-sky hover:text-accent-sky group-hover:translate-x-0.5"
                      >
                        <ChevronRight className="h-4 w-4" />
                      </a>
                    ) : null}
                  </div>
                </Reveal>
              ))}
            </div>

            <Reveal delay={0.3}>
              <div className="glass inline-flex items-center gap-2.5 rounded-full px-4 py-2 text-sm" data-testid="contact-status-badge">
                <span className="h-2 w-2 rounded-full bg-accent-mint" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
                Open to Internship Opportunities
              </div>
            </Reveal>
          </div>

          <Reveal delay={0.12}>
            <form
              onSubmit={submit}
              noValidate
              className="glass grain relative space-y-5 rounded-3xl p-7 shadow-xl shadow-black/10 sm:p-9"
              data-testid="contact-form"
            >
              <div
                className="pointer-events-none absolute -inset-px -z-10 rounded-3xl opacity-50 blur-2xl"
                style={{ background: "linear-gradient(120deg, var(--glow-sky), var(--glow-mint))" }}
              />

              <div className="grid gap-5 sm:grid-cols-2">
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Full Name <span className="text-accent-sky">*</span></span>
                  <input
                    value={form.name}
                    onChange={update("name")}
                    data-testid="contact-input-name"
                    aria-invalid={!!errors.name}
                    className={inputClass("name")}
                    placeholder="Your full name"
                  />
                  {errors.name && (
                    <span className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400" data-testid="contact-error-name">
                      <AlertCircle className="h-3 w-3" /> {errors.name}
                    </span>
                  )}
                </label>
                <label className="block">
                  <span className="mb-2 block text-sm font-medium">Email Address <span className="text-accent-sky">*</span></span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    data-testid="contact-input-email"
                    aria-invalid={!!errors.email}
                    className={inputClass("email")}
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <span className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400" data-testid="contact-error-email">
                      <AlertCircle className="h-3 w-3" /> {errors.email}
                    </span>
                  )}
                </label>
              </div>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">Subject <span className="text-accent-sky">*</span></span>
                <input
                  value={form.subject}
                  onChange={update("subject")}
                  data-testid="contact-input-subject"
                  aria-invalid={!!errors.subject}
                  className={inputClass("subject")}
                  placeholder="Internship opportunity, collaboration, or just saying hi"
                />
                {errors.subject && (
                  <span className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400" data-testid="contact-error-subject">
                    <AlertCircle className="h-3 w-3" /> {errors.subject}
                  </span>
                )}
              </label>

              <label className="block">
                <span className="mb-2 block text-sm font-medium">Message <span className="text-accent-sky">*</span></span>
                <textarea
                  value={form.message}
                  onChange={update("message")}
                  rows={6}
                  data-testid="contact-input-message"
                  aria-invalid={!!errors.message}
                  className={`${inputClass("message")} resize-none leading-relaxed`}
                  placeholder="Tell me what you have in mind — timelines, ideas, questions..."
                />
                {errors.message && (
                  <span className="mt-1.5 flex items-center gap-1.5 text-xs text-red-400" data-testid="contact-error-message">
                    <AlertCircle className="h-3 w-3" /> {errors.message}
                  </span>
                )}
              </label>

              {sent && (
                <div
                  className="flex items-center gap-2.5 rounded-xl border border-accent-mint/40 px-4 py-3 text-sm text-accent-mint"
                  style={{ background: "var(--glow-mint)" }}
                  data-testid="contact-success-banner"
                >
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  Message sent successfully — thank you! I'll get back to you soon.
                </div>
              )}
              {sendError && (
                <div
                  className="flex items-center gap-2.5 rounded-xl border border-red-400/40 px-4 py-3 text-sm text-red-400"
                  style={{ background: "rgba(239,68,68,0.08)" }}
                  data-testid="contact-error-banner"
                >
                  <AlertCircle className="h-4 w-4 shrink-0" />
                  {sendError}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                data-testid="contact-submit-btn"
                className="btn-primary w-full justify-center disabled:cursor-not-allowed disabled:opacity-60"
              >
                {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
                {sending ? "Sending..." : "Send Message"}
              </button>
            </form>
          </Reveal>
        </div>

        <footer className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border-subtle pt-6 sm:flex-row">
          <p className="font-mono-code text-xs text-muted-foreground">© 2025 ADITI PUSNAKE — BUILT WITH PARTICLES & PRECISION</p>
          <div className="flex items-center gap-5">
            <p className="font-mono-code text-xs text-muted-foreground">YAVATMAL, MAHARASHTRA · REMOTE FRIENDLY</p>
            <a href="/admin" data-testid="footer-admin-link" className="font-mono-code text-xs text-muted-foreground transition-colors duration-200 hover:text-accent-sky">Admin</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
