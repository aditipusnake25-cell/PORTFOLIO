import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform, useScroll } from "framer-motion";
import { ArrowDown, FileDown, Sparkles } from "lucide-react";

const EASE = [0.16, 1, 0.3, 1];

const MaskLine = ({ children, delay, className = "" }) => (
  <span className={`block overflow-hidden ${className}`}>
    <motion.span className="block" initial={{ y: "110%" }} animate={{ y: 0 }} transition={{ duration: 1, delay, ease: EASE }}>
      {children}
    </motion.span>
  </span>
);

const CHIPS = [
  { label: "React", top: "-6%", left: "2%", delay: "0s" },
  { label: "Node.js", top: "4%", right: "-7%", delay: "1.2s" },
  { label: "Gemini API", bottom: "26%", left: "-6%", delay: "0.6s" },
  { label: "MongoDB", bottom: "-4%", right: "6%", delay: "1.8s" },
];

const CodeCard = () => {
  const ref = useRef(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const srx = useSpring(rx, { stiffness: 120, damping: 16 });
  const sry = useSpring(ry, { stiffness: 120, damping: 16 });

  const onMove = (e) => {
    const rect = ref.current.getBoundingClientRect();
    ry.set(((e.clientX - rect.left) / rect.width - 0.5) * 14);
    rx.set(-((e.clientY - rect.top) / rect.height - 0.5) * 14);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={() => { rx.set(0); ry.set(0); }}
      style={{ rotateX: srx, rotateY: sry, transformPerspective: 900 }}
      data-testid="hero-tilt-card"
      className="glass grain relative w-full max-w-sm rounded-2xl p-6 shadow-2xl shadow-black/20 sm:max-w-md"
    >
      <div className="mb-4 flex items-center justify-between">
        <div className="flex gap-1.5">
          <span className="h-2.5 w-2.5 rounded-full bg-accent-sky/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-accent-mint/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-muted-foreground/40" />
        </div>
        <span className="font-mono-code text-[10px] tracking-widest text-muted-foreground">aditi.config.js</span>
      </div>
      <pre className="font-mono-code overflow-hidden text-[11px] leading-relaxed text-muted-foreground sm:text-xs">
{`const developer = {
  name: "Aditi Pusnake",
  role: "Full-Stack Developer",
  stack: ["react", "node", "gemini"],
  mindset: "build · learn · improve",
  ai: true, // always exploring
};`}
      </pre>
      <div className="mt-5 grid grid-cols-3 gap-3 border-t border-border-subtle pt-4">
        {[
          { label: "PROJECTS", value: "03", testid: "hero-stat-projects" },
          { label: "TECH STACK", value: "10+", testid: "hero-stat-tech" },
          { label: "FOCUS", value: "Gen-AI", testid: "hero-stat-focus" },
        ].map(s => (
          <div key={s.label} className="text-center" data-testid={s.testid}>
            <p className="font-display text-lg font-bold">{s.value}</p>
            <p className="font-mono-code text-[9px] tracking-widest text-muted-foreground">{s.label}</p>
          </div>
        ))}
      </div>
      <div
        className="absolute -inset-px -z-10 rounded-2xl opacity-60 blur-xl"
        style={{ background: "linear-gradient(120deg, var(--glow-sky), var(--glow-mint))" }}
      />
    </motion.div>
  );
};

export default function Hero() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const cardY = useTransform(scrollYProgress, [0, 1], [0, 120]);
  const textY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  return (
    <section ref={ref} id="top" className="relative flex min-h-screen items-center overflow-hidden px-6 pt-32 pb-8 sm:pt-36">
      <div
        className="pointer-events-none absolute left-1/2 top-1/3 -z-[1] h-[36rem] w-[60rem] -translate-x-1/2 opacity-70 blur-3xl"
        style={{ background: "radial-gradient(ellipse at center, var(--glow-sky), transparent 60%)" }}
      />
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.1fr_1fr]">
        <motion.div style={{ y: textY }}>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: EASE }}
            className="font-mono-code mb-5 flex items-center gap-3 text-xs uppercase tracking-[0.35em] text-accent-mint"
            data-testid="hero-eyebrow"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-accent-mint" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
            Hello, I'm
          </motion.p>

          <h1 className="font-display text-5xl font-extrabold leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
            <MaskLine delay={0.15}>Aditi</MaskLine>
            <MaskLine delay={0.28} className="gradient-text">Pusnake</MaskLine>
          </h1>

          <motion.p
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: EASE }}
            className="font-display mt-5 text-lg font-semibold sm:text-xl"
            data-testid="hero-role"
          >
            Full-Stack Developer <span className="text-accent-sky">&</span> Gen-AI Enthusiast
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.62, ease: EASE }}
            className="mt-5 max-w-lg text-base leading-relaxed text-muted-foreground sm:text-lg"
            data-testid="hero-intro"
          >
            I'm a BCA student passionate about building meaningful web applications and exploring the
            possibilities of AI. I enjoy turning ideas into practical projects, learning through
            challenges, and continuously improving my development skills.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.78, ease: EASE }}
            className="mt-9 flex flex-wrap items-center gap-4"
          >
            <a href="#projects" data-testid="hero-primary-cta" className="btn-primary">
              Explore My Projects <ArrowDown className="h-4 w-4" />
            </a>
            <a href="/resume.pdf" download data-testid="hero-secondary-cta" className="btn-ghost">
              <FileDown className="h-4 w-4" /> Download Resume
            </a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.95, ease: EASE }}
            className="mt-7 inline-flex items-center gap-2.5 text-sm text-muted-foreground"
            data-testid="hero-availability"
          >
            <span className="h-2 w-2 rounded-full bg-accent-mint" style={{ animation: "pulse-dot 2s ease-in-out infinite" }} />
            Open to Internship Opportunities
          </motion.div>
        </motion.div>

        <motion.div style={{ y: cardY }} className="relative flex justify-center lg:justify-end">
          <div className="relative py-10">
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[26rem] w-[26rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border-subtle opacity-60"
              style={{ animation: "orbit-spin 40s linear infinite" }}
            >
              <span className="absolute -top-1 left-1/2 h-2 w-2 -translate-x-1/2 rounded-full bg-accent-sky" />
            </div>
            <div
              className="pointer-events-none absolute left-1/2 top-1/2 h-[34rem] w-[34rem] -translate-x-1/2 -translate-y-1/2 rounded-full border border-border-subtle opacity-30"
              style={{ animation: "orbit-spin 60s linear infinite reverse" }}
            >
              <span className="absolute -bottom-1 left-1/2 h-1.5 w-1.5 -translate-x-1/2 rounded-full bg-accent-mint" />
            </div>

            {CHIPS.map(c => (
              <span
                key={c.label}
                className="glass font-mono-code absolute z-10 hidden rounded-full px-3.5 py-1.5 text-[11px] text-muted-foreground shadow-lg sm:block"
                style={{ ...c, animation: `float-y 6s ease-in-out ${c.delay} infinite` }}
                data-testid={`hero-chip-${c.label.toLowerCase().replace(/[^a-z]+/g, "-")}`}
              >
                {c.label}
              </span>
            ))}

            <motion.div
              initial={{ opacity: 0, y: 40, rotate: 2 }}
              animate={{ opacity: 1, y: 0, rotate: 0 }}
              transition={{ duration: 1, delay: 0.55, ease: EASE }}
            >
              <CodeCard />
            </motion.div>

            <span className="absolute -right-2 top-2 hidden text-accent-mint sm:block" style={{ animation: "twinkle 5s ease-in-out infinite" }}>
              <Sparkles className="h-5 w-5" />
            </span>
          </div>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.6, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}>
          <ArrowDown className="h-5 w-5 text-muted-foreground" />
        </motion.div>
      </motion.div>
    </section>
  );
}
