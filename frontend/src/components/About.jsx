import { useEffect, useRef } from "react";
import { Reveal, SectionHeading } from "./Reveal";

const STATS = [
  { value: "BCA", label: "Bachelor of Computer Applications — Eternal University, Baru Sahib, HP" },
  { value: "03", label: "Full-stack projects designed, built & deployed" },
  { value: "10+", label: "Technologies across frontend, backend & AI" },
];

const DRIVES = [
  { title: "Curiosity", body: "I enjoy exploring new technologies and understanding how things work." },
  { title: "Building", body: "I learn best by converting ideas into working projects." },
  { title: "Problem Solving", body: "I see challenges and errors as opportunities to improve." },
  { title: "Continuous Learning", body: "I'm always working on improving my technical and communication skills." },
  { title: "Creativity", body: "I enjoy thinking of practical ideas that can solve everyday problems." },
];

const FOCUS = ["Full-Stack Development", "MERN Stack", "Generative AI", "Problem-Solving & Deployment", "Internship Opportunities"];

export default function About() {
  return (
    <section id="about" className="relative scroll-mt-24 px-6 py-4 md:py-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="01 — About Me" title="A developer who learns by building." testid="about-heading" />

        <div className="grid gap-10 lg:grid-cols-[1fr_1.1fr]">
          <div className="relative" data-testid="about-quickfacts-sticky">
            <div className="relative lg:sticky lg:top-28">
            <div
              className="absolute -inset-3 -z-10 rounded-3xl opacity-70 blur-2xl"
              style={{ background: "linear-gradient(140deg, var(--glow-sky), var(--glow-mint))" }}
            />
            <Reveal y={0} className="block">
            <div className="glass grain relative w-full overflow-hidden rounded-3xl p-6">
              <p className="font-mono-code mb-4 text-[10px] uppercase tracking-[0.3em] text-accent-sky">Quick Facts</p>
              <div className="flex flex-col divide-y divide-border-subtle">
                {STATS.map(s => (
                  <div key={s.label} className="flex flex-col justify-center py-3.5">
                    <p className="font-display gradient-text text-3xl font-extrabold sm:text-4xl">{s.value}</p>
                    <p className="mt-1 text-sm leading-snug text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>
            </div>
            </Reveal>
            </div>
          </div>

          <div className="space-y-8">
            <Reveal delay={0.1}>
              <p className="text-lg leading-relaxed text-muted-foreground" data-testid="about-intro">
                I'm Aditi — a BCA student at Eternal University and an aspiring Full-Stack Developer with a
                growing interest in Generative AI. My journey in technology started with curiosity about how
                websites and applications work — curiosity that gradually turned into a passion for building
                things on my own. I enjoy working with frontend and backend technologies, connecting APIs,
                managing databases, and turning ideas into real-world applications.
              </p>
            </Reveal>
            <Reveal delay={0.14}>
              <p className="leading-relaxed text-muted-foreground" data-testid="about-intro-2">
                I believe the best way to learn development is by building projects, making mistakes, solving
                problems, and trying again. Every project teaches me something new — whether it's writing
                cleaner code, debugging an issue, or deploying an application.
              </p>
            </Reveal>

            <div>
              <Reveal delay={0.16}>
                <h3 className="font-display mb-4 text-xl font-semibold">What drives me</h3>
              </Reveal>
              <div className="grid gap-4 sm:grid-cols-2">
                {DRIVES.map((d, i) => (
                  <Reveal key={d.title} delay={0.18 + i * 0.06} className="h-full">
                    <div
                      className="glass h-full rounded-2xl p-5 transition-colors duration-300 hover:border-accent-sky/40"
                      data-testid={`about-drive-${i}`}
                    >
                      <span className="font-mono-code text-xs text-accent-mint">0{i + 1}</span>
                      <h4 className="font-display mt-1 font-semibold">{d.title}</h4>
                      <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">{d.body}</p>
                    </div>
                  </Reveal>
                ))}
              </div>
            </div>

            <Reveal delay={0.24}>
              <div className="glass rounded-2xl p-6" data-testid="about-beyond">
                <h3 className="font-display mb-2 font-semibold">Beyond coding</h3>
                <p className="text-sm leading-relaxed text-muted-foreground">
                  Growth isn't limited to technical skills — I enjoy collaborating with people, sharing ideas,
                  and improving my communication and teamwork. My goal is to become a skilled developer who
                  builds meaningful products, keeps learning, and creates a positive impact through technology.
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.28}>
              <div data-testid="about-focus">
                <h3 className="font-display mb-3 font-semibold">Current focus</h3>
                <div className="flex flex-wrap gap-2">
                  {FOCUS.map(f => (
                    <span key={f} className="font-mono-code rounded-full border border-border-subtle px-3.5 py-1.5 text-[11px] text-muted-foreground transition-colors duration-200 hover:border-accent-mint/50 hover:text-accent-mint">
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
