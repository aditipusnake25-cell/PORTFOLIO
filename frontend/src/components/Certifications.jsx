import { ExternalLink } from "lucide-react";
import { Reveal, SectionHeading } from "./Reveal";

const CERTIFICATES = [
  {
    title: "Certificate for Excellence",
    organization: "Eternal University",
    dateLabel: "Recognized",
    date: "March 2026",
    description:
      "Recognizes academic excellence in the Bachelor of Computer Applications program at Eternal University.",
    file: "/certificates/Academic_certificate.jpeg",
  },
  {
    title: "Certificate of Appreciation",
    organization: "NavGurukul",
    dateLabel: "Awarded",
    date: "02/10/2026",
    description:
      "Recognizes service as a Wellbeing & Workout Coordinator, supporting community wellbeing and maintaining medical records and medicine stock.",
    file: "/certificates/Aditi_Appreciation_certificate.pdf",
  },
  {
    title: "Introduction to Front-End Development",
    organization: "Meta · Coursera",
    dateLabel: "Completed",
    date: "01-Nov-2026",
    description:
      "Course completion certificate for Meta's Introduction to Front-End Development.",
    file: "/certificates/Coursera%20(Front-end).pdf",
  },
  {
    title: "MongoDB Indexing Design Fundamentals",
    organization: "MongoDB",
    dateLabel: "Completed",
    date: "Sep 23, 2026",
    description:
      "Proof of completion for MongoDB's Indexing Design Fundamentals skill course.",
    file: "/certificates/Skill_Certificate%20(1).pdf",
  },
];

const isImage = (file) => /\.(avif|gif|jpe?g|png|webp)$/i.test(file);

function CertificateCard({ certificate, index }) {
  const image = isImage(certificate.file);

  return (
    <Reveal delay={index * 0.08} className="h-full">
      <article
        className="glass group relative flex h-full flex-col overflow-hidden rounded-2xl transition-all duration-300 hover:-translate-y-1 hover:border-accent-sky/40 hover:shadow-xl hover:shadow-accent-sky/5"
        data-testid={`certification-card-${index}`}
      >
        {image ? (
          <div className="aspect-[16/10] overflow-hidden border-b border-border-subtle bg-card">
            <img
              src={certificate.file}
              alt={`${certificate.title} certificate`}
              loading="lazy"
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
            />
          </div>
        ) : (
          <iframe
            src={`${certificate.file}#toolbar=0&navpanes=0&scrollbar=0`}
            title={`${certificate.title} certificate preview`}
            loading="lazy"
            className="pointer-events-none aspect-[16/10] w-full border-0 border-b border-border-subtle bg-card"
          />
        )}

        <div className="flex flex-1 flex-col p-5 sm:p-6">
          <h3 className="font-display text-lg font-semibold leading-snug tracking-tight sm:text-xl">
            {certificate.title}
          </h3>
          <p className="mt-2 text-sm text-accent-mint">{certificate.organization}</p>
          {certificate.date && (
            <p className="mt-2 font-mono-code text-xs text-muted-foreground">
              {certificate.dateLabel} {certificate.date}
            </p>
          )}
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            {certificate.description}
          </p>
          <a
            href={certificate.file}
            target="_blank"
            rel="noopener noreferrer"
            data-testid={`certification-view-${index}`}
            className="btn-ghost mt-5 w-full justify-center sm:mt-auto"
          >
            View Certificate
            <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </article>
    </Reveal>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="relative scroll-mt-24 px-6 py-4 md:py-8">
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          eyebrow="05 — Certifications"
          title="Certifications & Achievements"
          testid="certifications-heading"
        />

        <p className="mb-8 max-w-3xl text-sm leading-relaxed text-muted-foreground sm:text-base">
          Continuous learning is an important part of my journey as a developer.
          These certifications reflect my commitment to developing new skills,
          exploring technology, and growing both personally and professionally.
        </p>

        <div className="grid auto-rows-fr gap-5 sm:grid-cols-2 sm:gap-6">
          {CERTIFICATES.map((certificate, index) => (
            <CertificateCard
              key={certificate.file}
              certificate={certificate}
              index={index}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
