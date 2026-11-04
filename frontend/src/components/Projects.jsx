import { motion } from "framer-motion";
import { Github, ExternalLink } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const PROJECTS = [
  {
    id: "mockmind",
    number: "01",
    category: "AI · Full-Stack Platform",
    title: "MockMind",
    subtitle: "AI Interview Preparation Platform",
    description:
      "A full-stack web application designed to help job seekers prepare for technical interviews through secure user management and automated question generation.",
    tech: ["React.js", "Node.js", "Express.js", "MongoDB Atlas", "Google Gemini API", "JWT", "bcrypt"],
    image: "/screenshots/Screenshot%202026-11-03%20195334.png",
    github: "https://github.com/aditipusnake25-cell/AI_Interview_Preparation_Platform",
    demo: "https://ai-interview-preparation-platform-1-ujov.onrender.com",
    accent: "sky",
  },
  {
    id: "markdown-notes",
    number: "02",
    category: "Full-Stack Application",
    title: "Collaborative Markdown Notes Saver",
    subtitle: "Markdown Note-Taking App",
    description:
      "A full-stack note-taking application that allows users to create, edit, and permanently save notes with Markdown formatting.",
    tech: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express.js", "MongoDB"],
    image: "/screenshots/Screenshot%202026-11-04%20085438.png",
    github: "https://github.com/aditipusnake25-cell/Collaborative_markdown_notes_",
    demo: "https://collaborative-markdown-notes-frontend.onrender.com",
    accent: "mint",
  },
  {
    id: "journal-prompter",
    number: "03",
    category: "AI · Journaling",
    title: "AI Daily Journal Prompter",
    subtitle: "Mood-Aware AI Journaling",
    description:
      "An AI-powered journaling application that analyzes users' mood inputs and generates personalized daily reflection prompts.",
    tech: ["HTML5", "CSS3", "JavaScript", "Node.js", "Express.js", "Google Gemini API"],
    image: "/screenshots/Screenshot%202026-11-04%20085539.png",
    github: "https://github.com/aditipusnake25-cell/FULL_STACK_PROJECT_ASK_GEMINI",
    demo: "https://full-stack-project-ask-gemini-jmrs.vercel.app",
    accent: "sky",
  },
  {
    id: "collabsphere",
    number: "04",
    category: "Full-Stack Application",
    title: "CollabSphere",
    subtitle: "Full-Stack Web Application",
    description:
      "A full-stack collaboration web application built with a React (Vite) frontend and a Node.js/Express backend, using MongoDB for data storage, JWT for secure authentication, and the Google Gemini API.",
    tech: ["React (Vite)", "Node.js", "Express.js", "MongoDB", "JWT", "Google Gemini API"],
    image: "/screenshots/Screenshot%202026-11-03%20194943.png",
    github: "https://github.com/aditipusnake25-cell/CollabSphere",
    demo: "https://collabsphere-frontend-i4ov.onrender.com",
    accent: "mint",
  },
];

const PreviewPlaceholder = ({ project }) => (
  <div
    className={`relative flex w-full items-center justify-center self-center overflow-hidden rounded-xl border border-border-subtle bg-card/60 ${
      project.image ? "" : "aspect-[16/10]"
    }`}
  >
    {project.image ? (
      <img
        src={project.image}
        alt={`${project.title} screenshot`}
        loading="lazy"
        className="block h-auto w-full rounded-xl object-contain transition-transform duration-500 ease-out group-hover:scale-[1.025]"
      />
    ) : (
    <div
      className="absolute inset-0 transition-transform duration-700 ease-out group-hover:scale-105"
      style={{
        background:
          project.accent === "mint"
            ? "linear-gradient(135deg, rgba(52,211,153,0.16), rgba(56,189,248,0.08) 55%, transparent)"
            : "linear-gradient(135deg, rgba(56,189,248,0.18), rgba(52,211,153,0.08) 55%, transparent)",
      }}
    >
      <div className="absolute inset-x-6 top-5 flex items-center gap-1.5 rounded-t-lg border border-border-subtle border-b-0 bg-background/50 px-3 py-2 backdrop-blur-sm">
        <span className="h-2 w-2 rounded-full bg-accent-sky/70" />
        <span className="h-2 w-2 rounded-full bg-accent-mint/70" />
        <span className="h-2 w-2 rounded-full bg-muted-foreground/40" />
        <span className="font-mono-code ml-2 text-[9px] text-muted-foreground">{project.id.replace(/-/g, "-")}.app</span>
      </div>
      <div className="absolute inset-x-6 bottom-0 top-[3.4rem] rounded-b-lg border border-border-subtle bg-card p-4 backdrop-blur-sm">
        <div className="mb-3 flex items-center justify-between">
          <span className="font-display text-lg font-extrabold tracking-tight text-foreground/80">{project.title.split(" ")[0]}</span>
          <span className="font-mono-code rounded-full border border-border-subtle px-2 py-0.5 text-[8px] uppercase tracking-widest text-accent-mint">
            {project.category.split("·")[0].trim()}
          </span>
        </div>
        <div className="space-y-2">
          <div className="h-2 w-3/4 rounded-full bg-muted-foreground/25" />
          <div className="h-2 w-1/2 rounded-full bg-muted-foreground/20" />
          <div className="mt-4 grid grid-cols-3 gap-2">
            <div className="h-10 rounded-md" style={{ background: "var(--glow-sky)" }} />
            <div className="h-10 rounded-md" style={{ background: "var(--glow-mint)" }} />
            <div className="h-10 rounded-md bg-muted-foreground/15" />
          </div>
        </div>
      </div>
      <span className="font-mono-code absolute bottom-2 right-4 text-[8px] uppercase tracking-widest text-muted-foreground/60">
        Screenshot placeholder
      </span>
    </div>
    )}
  </div>
);

export default function Projects() {
  return (
    <section id="projects" className="relative scroll-mt-24 px-6 py-4 md:py-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading eyebrow="04 — Featured Projects" title="Things I've designed, built & shipped." testid="projects-heading" />

        <div className="grid gap-6">
          {PROJECTS.map((p, i) => (
            <Reveal key={p.id} delay={i * 0.05}>
              <motion.article
                data-testid={`project-item-${p.id}`}
                className="glass group relative rounded-2xl shadow-lg shadow-accent-deep/10 transition-all duration-300 hover:border-accent-sky/40 hover:shadow-xl hover:shadow-accent-sky/10"
                style={{
                  background:
                    "linear-gradient(135deg, var(--glow-sky), transparent 48%, var(--glow-mint)), var(--surface)",
                }}
                whileHover={{ y: -4 }}
                transition={{ type: "spring", stiffness: 200, damping: 20 }}
              >
                <div className="grid items-center lg:grid-cols-[minmax(0,0.44fr)_minmax(0,0.56fr)]">
                  <div className="p-4 sm:p-5 lg:p-6">
                    <PreviewPlaceholder project={p} />
                  </div>
                  <div className="p-5 pt-1 sm:p-6 sm:pt-1 lg:p-7">
                    <div className="mb-2.5 flex items-center gap-3">
                      <span className="font-display gradient-text text-2xl font-extrabold opacity-80">{p.number}</span>
                      <span className="font-mono-code rounded-full border border-border-subtle bg-card/60 px-3 py-1 text-[10px] uppercase tracking-widest text-accent-mint">
                        {p.category}
                      </span>
                    </div>
                    <h3 className="font-display text-xl font-bold tracking-tight sm:text-2xl" data-testid={`project-title-${p.id}`}>
                      {p.title}
                    </h3>
                    <p className="font-mono-code mt-1 text-[11px] uppercase tracking-widest text-accent-sky">{p.subtitle}</p>
                    <p className="mt-2.5 text-sm leading-relaxed text-muted-foreground">{p.description}</p>

                    <div className="mt-3.5 flex flex-wrap gap-2">
                      {p.tech.map(t => (
                        <span key={t} className="font-mono-code rounded-full border border-border-subtle bg-card/70 px-2.5 py-1 text-[10px] text-muted-foreground">
                          {t}
                        </span>
                      ))}
                    </div>

                    <div className="mt-4 flex flex-wrap gap-3 border-t border-border-subtle pt-3.5">
                      <a
                        href={p.github}
                        target="_blank"
                        rel="noreferrer"
                        data-testid={`project-github-${p.id}`}
                        className="btn-ghost !px-5 !py-2.5 !text-sm"
                        aria-label={`${p.title} GitHub repository`}
                      >
                        <Github className="h-4 w-4" /> GitHub <ExternalLink className="h-3 w-3 opacity-60" />
                      </a>
                      <a
                        href={p.demo}
                        target="_blank"
                        rel="noreferrer"
                        data-testid={`project-demo-${p.id}`}
                        className="btn-primary !px-5 !py-2.5 !text-sm"
                        aria-label={`${p.title} live demo`}
                      >
                        Live Demo <ExternalLink className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.article>
            </Reveal>
          ))}
        </div>

        <Reveal delay={0.1}>
          <p className="font-mono-code mt-5 text-center text-[11px] text-muted-foreground" data-testid="projects-links-note">
            All GitHub & Live Demo buttons open the real repositories and deployments.
          </p>
        </Reveal>
      </div>
    </section>
  );
}
