import { useMemo } from "react";
import { Reveal } from "./Reveal";

export { Reveal };

export default function SparkleLayer({ theme = "dark" }) {
  const sparkles = useMemo(() => {
    const isMobile = window.innerWidth < 768;
    const n = isMobile ? 14 : 30;
    return Array.from({ length: n }, (_, i) => ({
      id: i,
      top: Math.random() * 100,
      left: Math.random() * 100,
      size: Math.random() < 0.75 ? "2px" : "3px",
      delay: Math.random() * 8,
      duration: 4 + Math.random() * 6,
      mint: Math.random() < 0.3,
    }));
  }, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
      <div
        className="absolute -top-40 left-[8%] h-[34rem] w-[34rem] rounded-full opacity-70 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--glow-sky), transparent 65%)",
          animation: "aurora-drift 22s ease-in-out infinite",
        }}
      />
      <div
        className="absolute bottom-[-10rem] right-[5%] h-[30rem] w-[30rem] rounded-full opacity-60 blur-3xl"
        style={{
          background: "radial-gradient(circle, var(--glow-mint), transparent 65%)",
          animation: "aurora-drift 28s ease-in-out infinite reverse",
        }}
      />
      {sparkles.map(s => (
        <span
          key={s.id}
          className="absolute rounded-full"
          style={{
            top: `${s.top}%`,
            left: `${s.left}%`,
            width: s.size,
            height: s.size,
            background: s.mint ? "var(--accent-mint)" : "var(--accent-sky)",
            boxShadow: `0 0 6px ${s.mint ? "var(--glow-mint)" : "var(--glow-sky)"}`,
            animation: `twinkle ${s.duration}s ease-in-out ${s.delay}s infinite`,
          }}
        />
      ))}
    </div>
  );
}
