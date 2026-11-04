import { motion } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1];

export const Reveal = ({ children, delay = 0, y = 28, className = "" }) => (
  <motion.div
    initial={{ opacity: 0, y }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.15 }}
    transition={{ duration: 0.75, delay, ease: EASE }}
    className={className}
  >
    {children}
  </motion.div>
);

export const SectionHeading = ({ eyebrow, title, testid }) => (
  <div className="mb-8 md:mb-12">
    <Reveal>
      <p className="font-mono-code mb-4 flex items-center gap-3 text-xs uppercase tracking-[0.3em] text-accent-mint">
        <span className="h-1.5 w-1.5 rounded-full bg-accent-mint" style={{ animation: "pulse-dot 2.4s ease-in-out infinite" }} />
        {eyebrow}
      </p>
    </Reveal>
    <Reveal delay={0.08}>
      <h2 data-testid={testid} className="font-display text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
        {title}
      </h2>
    </Reveal>
  </div>
);
