import { useEffect, useRef } from "react";

const PALETTES = {
  dark: ["56,189,248", "125,211,252", "240,249,255", "52,211,153", "110,231,183", "96,165,250"],
  light: ["2,132,199", "14,165,233", "71,85,105", "5,150,105", "37,99,235", "56,189,248"],
};

const rand = (a, b) => a + Math.random() * (b - a);

export default function ParticleBackground({ theme = "dark" }) {
  const canvasRef = useRef(null);
  const themeRef = useRef(theme);
  themeRef.current = theme;

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf = 0;
    let running = true;
    let particles = [];
    let glows = [];
    let width = 0;
    let height = 0;
    let dpr = 1;
    const mouse = { x: -9999, y: -9999 };

    const count = () => {
      const area = window.innerWidth * window.innerHeight;
      const base = Math.min(145, Math.max(45, Math.round(area / 9500)));
      return window.innerWidth < 768 ? Math.round(base * 0.38) : base;
    };

    const build = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = width + "px";
      canvas.style.height = height + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      particles = Array.from({ length: count() }, () => {
        const depth = Math.random();
        return {
          x: rand(0, width),
          y: rand(0, height),
          r: depth < 0.75 ? rand(0.5, 1.6) : rand(1.8, 3.2),
          depth,
          vx: rand(-0.12, 0.12),
          vy: rand(-0.22, 0.22),
          wobbleAmp: rand(0.1, 0.45),
          wobbleSpeed: rand(0.001, 0.003),
          wobble: rand(0, Math.PI * 2),
          alpha: rand(0.25, 0.85),
          fadeSpeed: rand(0.002, 0.006),
          fadeDir: Math.random() > 0.5 ? 1 : -1,
          color: PALETTES[themeRef.current][Math.floor(rand(0, PALETTES[themeRef.current].length))],
          glow: depth > 0.9,
          spark: Math.random() < 0.12,
        };
      });

      glows = Array.from({ length: window.innerWidth < 768 ? 3 : 6 }, () => ({
        x: rand(0, width),
        y: rand(0, height),
        r: rand(50, 130),
        vx: rand(-0.05, 0.05),
        vy: rand(-0.04, 0.04),
        color: Math.random() > 0.5 ? PALETTES[themeRef.current][0] : PALETTES[themeRef.current][3],
        alpha: rand(0.035, 0.07),
      }));
    };

    const drawGlowOrb = (g) => {
      const grad = ctx.createRadialGradient(g.x, g.y, 0, g.x, g.y, g.r);
      grad.addColorStop(0, `rgba(${g.color},${g.alpha})`);
      grad.addColorStop(1, `rgba(${g.color},0)`);
      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(g.x, g.y, g.r, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawParticle = (p, alpha) => {
      if (p.glow) {
        const grad = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, p.r * 5);
        grad.addColorStop(0, `rgba(${p.color},${alpha})`);
        grad.addColorStop(1, `rgba(${p.color},0)`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r * 5, 0, Math.PI * 2);
        ctx.fill();
      } else {
        ctx.fillStyle = `rgba(${p.color},${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      if (p.spark && alpha > 0.55) {
        ctx.strokeStyle = `rgba(${p.color},${(alpha - 0.5) * 0.7})`;
        ctx.lineWidth = 0.6;
        const s = p.r * 3.2;
        ctx.beginPath();
        ctx.moveTo(p.x - s, p.y);
        ctx.lineTo(p.x + s, p.y);
        ctx.moveTo(p.x, p.y - s);
        ctx.lineTo(p.x, p.y + s);
        ctx.stroke();
      }
    };

    const step = () => {
      ctx.clearRect(0, 0, width, height);

      for (const g of glows) {
        g.x += g.vx;
        g.y += g.vy;
        if (g.x < -g.r) g.x = width + g.r;
        if (g.x > width + g.r) g.x = -g.r;
        if (g.y < -g.r) g.y = height + g.r;
        if (g.y > height + g.r) g.y = -g.r;
        drawGlowOrb(g);
      }

      for (const p of particles) {
        p.alpha += p.fadeSpeed * p.fadeDir;
        if (p.alpha > 0.85) { p.alpha = 0.85; p.fadeDir = -1; }
        if (p.alpha < 0.12) { p.alpha = 0.12; p.fadeDir = 1; }

        p.wobble += p.wobbleSpeed * 16;
        const speed = 0.4 + p.depth * 1.1;
        p.x += (p.vx + Math.sin(p.wobble) * p.wobbleAmp * 0.3) * speed;
        p.y += p.vy * speed;

        const dx = p.x - mouse.x;
        const dy = p.y - mouse.y;
        const dist2 = dx * dx + dy * dy;
        if (dist2 < 14400 && dist2 > 0.01) {
          const dist = Math.sqrt(dist2);
          const force = (120 - dist) / 120;
          p.x += (dx / dist) * force * 1.6;
          p.y += (dy / dist) * force * 1.6;
        }

        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        if (p.y < -20) p.y = height + 20;
        if (p.y > height + 20) p.y = -20;

        drawParticle(p, p.alpha * (themeRef.current === "light" ? 0.75 : 1));
      }
    };

    const connect = () => {
      const cell = 120;
      const cols = Math.ceil(width / cell);
      const grid = new Map();
      for (const p of particles) {
        const key = Math.floor(p.x / cell) + Math.floor(p.y / cell) * cols;
        if (!grid.has(key)) grid.set(key, []);
        grid.get(key).push(p);
      }
      ctx.lineWidth = 0.5;
      for (const [key, bucket] of grid) {
        const neighbours = [
          ...(grid.get(key) || []),
          ...(grid.get(key + 1) || []),
          ...(grid.get(key + cols) || []),
          ...(grid.get(key + cols + 1) || []),
        ];
        for (let i = 0; i < bucket.length; i++) {
          for (let j = i + 1; j < neighbours.length; j++) {
            const a = bucket[i];
            const b = neighbours[j];
            if (a === b) continue;
            const dx = a.x - b.x;
            const dy = a.y - b.y;
            const d2 = dx * dx + dy * dy;
            if (d2 < 10000) {
              const o = (1 - Math.sqrt(d2) / 100) * 0.12 * Math.min(a.alpha, b.alpha);
              ctx.strokeStyle = `rgba(${a.color},${o})`;
              ctx.beginPath();
              ctx.moveTo(a.x, a.y);
              ctx.lineTo(b.x, b.y);
              ctx.stroke();
            }
          }
        }
      }
    };

    const loop = () => {
      if (!running) return;
      step();
      connect();
      raf = requestAnimationFrame(loop);
    };

    const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onMouseLeave = () => { mouse.x = -9999; mouse.y = -9999; };
    const onResize = () => { build(); if (reduced) step(); };
    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!reduced) {
        running = true;
        raf = requestAnimationFrame(loop);
      }
    };

    build();
    if (reduced) {
      step();
    } else {
      raf = requestAnimationFrame(loop);
      window.addEventListener("mousemove", onMouseMove, { passive: true });
      document.addEventListener("mouseleave", onMouseLeave);
    }
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseleave", onMouseLeave);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
      data-testid="particle-background"
    />
  );
}
