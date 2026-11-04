import { Reveal, SectionHeading } from "./Reveal";

const STAGES = [
  {
    step: "01",
    title: "Foundations",
    tag: "HTML5 · CSS3 · JavaScript",
    body: "Started with the core of the web — structure, styling and logic. Learned how browsers, requests and the DOM really work before touching any framework.",
  },
  {
    step: "02",
    title: "Full-Stack Development",
    tag: "React · Node.js · Express · MongoDB",
    body: "Moved from single pages to complete products: component-driven frontends, RESTful APIs, authentication with JWT & bcrypt, and persistent data with MongoDB & MongoDB Atlas.",
  },
  {
    step: "03",
    title: "Exploring Gen-AI",
    tag: "Google Gemini API · Prompting",
    body: "Now weaving generative AI into real applications — dynamically generated interview questions and mood-aware journaling prompts, with API credentials kept safely on the server.",
  },
];

export default function Journey() {
  return (
    <section id="journey" className="relative scroll-mt-24 px-6 py-4 md:py-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="02 — My Journey" title="From first tags to generative AI." testid="journey-heading" />

        <div className="relative ml-3 space-y-5 md:ml-6">
          <div className="absolute bottom-2 left-0 top-2 w-px" style={{ background: "linear-gradient(180deg, var(--accent-sky), var(--accent-mint), transparent)" }} />
          {STAGES.map((s, i) => (
            <Reveal key={s.step} delay={i * 0.1}>
              <div className="relative pl-10 md:pl-14" data-testid={`journey-stage-${i}`}>
                <span
                  className="absolute -left-[7px] top-1.5 h-3.5 w-3.5 rounded-full border-2"
                  style={{ borderColor: "var(--accent-sky)", background: "var(--background)", boxShadow: "0 0 12px var(--glow-sky)" }}
                />
                <div className="glass group rounded-2xl p-7 transition-colors duration-300 hover:border-accent-mint/40">
                  <div className="flex flex-wrap items-baseline justify-between gap-3">
                    <h3 className="font-display text-2xl font-semibold tracking-tight">
                      <span className="font-mono-code mr-3 text-sm text-accent-mint">{s.step}</span>
                      {s.title}
                    </h3>
                    <span className="font-mono-code rounded-full border border-border-subtle px-3 py-1 text-[11px] text-accent-sky">{s.tag}</span>
                  </div>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{s.body}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.2}>
          <div className="glass mt-8 flex flex-col items-start justify-between gap-4 rounded-2xl p-7 sm:flex-row sm:items-center" data-testid="journey-education">
            <div>
              <p className="font-mono-code mb-1 text-[10px] uppercase tracking-[0.3em] text-accent-mint">Education</p>
              <h3 className="font-display text-xl font-semibold">BCA — Bachelor of Computer Applications</h3>
              <p className="mt-1 text-sm text-muted-foreground">Currently pursuing · Eternal University, Baru Sahib, HP</p>
            </div>
            <span className="font-mono-code rounded-full border border-border-subtle px-4 py-2 text-xs text-muted-foreground">Ongoing</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
