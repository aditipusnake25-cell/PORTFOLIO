import { useEffect, useState } from "react";
import { Moon, Sun, FileDown, Menu, X, Send } from "lucide-react";

const LINKS = [
  { name: "Home", href: "#top", testid: "nav-link-home" },
  { name: "About", href: "#about", testid: "nav-link-about" },
  { name: "My Journey", href: "#journey", testid: "nav-link-journey" },
  { name: "Projects", href: "#projects", testid: "nav-link-projects" },
  { name: "Certifications", href: "#certifications", testid: "nav-link-certifications" },
  { name: "Ideas", href: "#ideas", testid: "nav-link-ideas" },
  { name: "Resume", href: "#resume", testid: "nav-link-resume" },
  { name: "Contact", href: "#contact", testid: "nav-link-contact" },
];

const LogoMark = () => (
  <svg viewBox="0 0 64 64" className="h-9 w-9 shrink-0" aria-hidden="true">
    <defs>
      <linearGradient id="navg" x1="0" y1="0" x2="1" y2="1">
        <stop offset="0" stopColor="var(--accent-sky)" />
        <stop offset="1" stopColor="var(--accent-mint)" />
      </linearGradient>
    </defs>
    <path d="M32 6 L54 32 L32 58 L10 32 Z" fill="none" stroke="url(#navg)" strokeWidth="4" />
    <path d="M26 25 L20 32 L26 39" fill="none" stroke="var(--accent-sky)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M38 25 L44 32 L38 39" fill="none" stroke="var(--accent-mint)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export default function Navbar({ theme, onToggleTheme }) {
  const [open, setOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");

  useEffect(() => {
    let frame = 0;
    const updateActiveSection = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const marker = 240;
        const sections = document.querySelectorAll("main section[id]");
        let current = sections[0]?.id || "top";

        sections.forEach(section => {
          if (
            section.getBoundingClientRect().top <= marker &&
            LINKS.some(link => link.href === `#${section.id}`)
          ) {
            current = section.id;
          }
        });

        if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 2) {
          const lastNavigableSection = [...sections]
            .reverse()
            .find(section => LINKS.some(link => link.href === `#${section.id}`));
          current = lastNavigableSection?.id || current;
        }

        setActiveSection(current);
      });
    };

    updateActiveSection();
    window.addEventListener("scroll", updateActiveSection, { passive: true });
    window.addEventListener("resize", updateActiveSection);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateActiveSection);
      window.removeEventListener("resize", updateActiveSection);
    };
  }, []);

  const linkClass = (href) =>
    `nav-link whitespace-nowrap text-[11px] font-medium transition-colors duration-200 hover:text-accent-sky ${
      activeSection === href.slice(1) ? "is-active text-accent-sky" : "text-muted-foreground"
    }`;

  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 sm:px-5">
      <nav className="glass mx-auto flex max-w-[1440px] items-center justify-between gap-3 rounded-2xl px-3 py-2.5 sm:px-5 xl:gap-4">
        <a
          href="#top"
          className="flex min-w-0 shrink-0 items-center gap-2.5"
          data-testid="nav-logo"
        >
          <LogoMark />
          <span className="min-w-0">
            <span className="font-display block whitespace-nowrap text-[13px] font-bold uppercase tracking-[0.16em] sm:text-sm">
              Aditi <span className="text-accent-sky">Pusnake</span>
            </span>
            <span className="mt-0.5 hidden whitespace-nowrap text-[9px] text-muted-foreground sm:block">
              Full-Stack Developer <span className="text-accent-mint">|</span> Gen-AI Developer
            </span>
          </span>
        </a>

        <div className="hidden min-w-0 items-center gap-3 min-[1100px]:flex 2xl:gap-4">
          {LINKS.map(link => (
            <a
              key={link.name}
              href={link.href}
              data-testid={link.testid}
              aria-current={activeSection === link.href.slice(1) ? "location" : undefined}
              className={linkClass(link.href)}
            >
              {link.name}
            </a>
          ))}
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            onClick={onToggleTheme}
            data-testid="theme-toggle-btn"
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-muted-foreground transition-all duration-200 hover:border-accent-sky hover:text-accent-sky"
          >
            {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>
          <a
            href="/resume.pdf"
            download
            data-testid="nav-resume-btn"
            className="btn-ghost hidden whitespace-nowrap !px-3 !py-2 !text-[11px] min-[1100px]:inline-flex"
          >
            <FileDown className="h-3.5 w-3.5" /> Resume
          </a>
          <a
            href="#contact"
            data-testid="nav-contact-btn"
            className="btn-primary hidden whitespace-nowrap !px-3 !py-2 !text-[11px] min-[1100px]:inline-flex"
          >
            <Send className="h-3.5 w-3.5" /> Get in Touch
          </a>
          <button
            onClick={() => setOpen(value => !value)}
            aria-label={open ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={open}
            aria-controls="mobile-navigation"
            data-testid="nav-mobile-toggle"
            className="flex h-9 w-9 items-center justify-center rounded-full border border-border-subtle text-muted-foreground transition-colors duration-200 hover:border-accent-sky hover:text-accent-sky min-[1100px]:hidden"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </nav>

      {open && (
        <div
          id="mobile-navigation"
          className="glass mx-auto mt-2 max-h-[calc(100dvh-6rem)] max-w-[1440px] overflow-y-auto rounded-2xl p-3 sm:p-4 min-[1100px]:hidden"
          data-testid="nav-mobile-menu"
        >
          <div className="grid gap-1 sm:grid-cols-2">
            {LINKS.map(link => (
              <a
                key={link.name}
                href={link.href}
                data-testid={`${link.testid}-mobile`}
                aria-current={activeSection === link.href.slice(1) ? "location" : undefined}
                onClick={() => setOpen(false)}
                className={`rounded-xl border border-transparent px-3 py-2.5 text-sm font-medium transition-colors duration-200 hover:border-border-subtle hover:bg-white/5 hover:text-accent-sky ${
                  activeSection === link.href.slice(1) ? "border-border-subtle bg-white/5 text-accent-sky" : "text-muted-foreground"
                }`}
              >
                {link.name}
              </a>
            ))}
          </div>
          <div className="mt-3 grid gap-2 border-t border-border-subtle pt-3 sm:grid-cols-2">
            <a
              href="/resume.pdf"
              download
              data-testid="nav-mobile-resume-btn"
              onClick={() => setOpen(false)}
              className="btn-ghost justify-center !py-2.5 !text-sm"
            >
              <FileDown className="h-4 w-4" /> Download Resume
            </a>
            <a
              href="#contact"
              data-testid="nav-mobile-contact-btn"
              onClick={() => setOpen(false)}
              className="btn-primary justify-center !py-2.5 !text-sm"
            >
              <Send className="h-4 w-4" /> Get in Touch
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
