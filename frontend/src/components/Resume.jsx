import { Download, Eye } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const RESUME_URL = "/resume.pdf";

export default function Resume() {
  return (
    <section id="resume" className="relative scroll-mt-24 px-6 py-4 md:py-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="07 — Resume"
          title="A closer look at my experience."
          testid="resume-heading"
        />

        <Reveal delay={0.1}>
          <div className="glass grain relative overflow-hidden rounded-3xl p-6 sm:p-8 lg:flex lg:items-center lg:justify-between lg:gap-8">
            <div
              className="pointer-events-none absolute -left-20 -top-24 -z-10 h-64 w-64 rounded-full opacity-50 blur-3xl"
              style={{ background: "var(--glow-sky)" }}
            />
            <div className="max-w-2xl">
              <h3 className="font-display text-xl font-semibold sm:text-2xl">
                Download or view my resume
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground sm:text-base">
                Explore my education, projects, and technical skills in a
                concise overview of my journey as a developer.
              </p>
            </div>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row lg:mt-0 lg:shrink-0">
              <a
                href={RESUME_URL}
                download
                data-testid="resume-download-btn"
                className="btn-primary justify-center"
              >
                <Download className="h-4 w-4" />
                Download Resume
              </a>
              <a
                href={RESUME_URL}
                target="_blank"
                rel="noopener noreferrer"
                data-testid="resume-view-btn"
                className="btn-ghost justify-center"
              >
                <Eye className="h-4 w-4" />
                View Resume
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
