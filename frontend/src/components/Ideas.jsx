import { Reveal, SectionHeading } from "./Reveal";

const IDEAS = [
  {
    title: "Meaningful Web Applications",
    body: "Software should solve a real problem for a real person. I'd rather ship one useful tool than ten impressive demos.",
    testid: "ideas-card-apps",
  },
  {
    title: "The Possibilities of AI",
    body: "Generative AI is becoming a normal part of the stack. I'm exploring where it genuinely helps — from interview prep to reflective journaling.",
    testid: "ideas-card-ai",
  },
  {
    title: "Learning Through Challenges",
    body: "Every bug, failed deploy and broken build is a lesson. The harder the problem, the more it teaches.",
    testid: "ideas-card-learning",
  },
  {
    title: "Continuous Improvement",
    body: "Each project should be a little better engineered than the last — cleaner APIs, tighter security, sharper interfaces.",
    testid: "ideas-card-improvement",
  },
];

export default function Ideas() {
  return (
    <section id="ideas" className="relative scroll-mt-24 px-6 py-4 md:py-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="06 — Ideas" title="What I care about." testid="ideas-heading" />
        <div className="grid gap-5 sm:grid-cols-2">
          {IDEAS.map((idea, i) => (
            <Reveal key={idea.title} delay={i * 0.08} className="h-full">
              <div
                data-testid={idea.testid}
                className="glass group relative h-full overflow-hidden rounded-2xl p-7 transition-colors duration-300 hover:border-accent-mint/40"
              >
                <div
                  className="pointer-events-none absolute -bottom-14 -right-14 h-40 w-40 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "var(--glow-mint)" }}
                />
                <span className="font-mono-code text-xs text-accent-sky">0{i + 1}</span>
                <h3 className="font-display mt-3 text-xl font-semibold tracking-tight sm:text-2xl">{idea.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{idea.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
