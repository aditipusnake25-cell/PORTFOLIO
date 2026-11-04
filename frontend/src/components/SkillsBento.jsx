import { Reveal, SectionHeading } from "./Reveal";

const CARDS = [
  {
    title: "Frontend Development",
    body: "Responsive, component-driven interfaces with clean, semantic markup and thoughtful interactions.",
    tags: ["React.js", "HTML5", "CSS3", "JavaScript"],
    layout: "xl:col-span-4",
    testid: "skills-card-frontend",
  },
  {
    title: "Backend & APIs",
    body: "RESTful services, CRUD operations and production-ready deployments.",
    tags: ["Node.js", "Express.js", "REST APIs", "Render"],
    layout: "xl:col-span-4",
    testid: "skills-card-backend",
  },
  {
    title: "Databases & Auth",
    body: "Persistent data models and secure user management.",
    tags: ["MongoDB", "MongoDB Atlas", "JWT", "bcrypt"],
    layout: "xl:col-span-4",
    testid: "skills-card-database",
  },
  {
    title: "AI Integration",
    body: "Practical Gen-AI features with credentials kept server-side.",
    tags: ["Google Gemini API", "Prompt Design", "Express Middleware"],
    layout: "xl:col-span-4 xl:col-start-3",
    testid: "skills-card-ai",
  },
  {
    title: "Currently Exploring",
    body: "Always levelling up — next stops on the learning path.",
    tags: ["Gen-AI Workflows", "TypeScript", "Testing", "System Design"],
    layout: "xl:col-span-4 xl:col-start-7",
    testid: "skills-card-exploring",
  },
];

export default function SkillsBento() {
  return (
    <section id="skills" className="relative scroll-mt-24 px-6 py-4 md:py-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="03 — Skills & Technologies" title="My toolkit, honestly mapped." testid="skills-heading" />
        <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-12">
          {CARDS.map((card, i) => (
            <Reveal key={card.title} delay={i * 0.07} className={`${card.layout} flex`}>
              <div
                data-testid={card.testid}
                className="glass group relative flex h-full w-full flex-col overflow-hidden rounded-2xl p-6 transition-colors duration-300 hover:border-accent-mint/40 sm:p-7"
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  style={{ background: "var(--glow-sky)" }}
                />
                <div>
                  <h3 className="font-display text-xl font-semibold tracking-tight sm:text-2xl">
                    {card.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{card.body}</p>
                </div>
                <div className="mt-6 flex flex-wrap gap-2">
                  {card.tags.map(tag => (
                    <span
                      key={tag}
                      className="font-mono-code rounded-full border border-border-subtle px-3 py-1 text-[11px] text-muted-foreground transition-colors duration-200 hover:border-accent-sky/50 hover:text-accent-sky"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
