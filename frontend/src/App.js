import { useEffect, useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ParticleBackground from "@/components/ParticleBackground";
import SparkleLayer from "@/components/SparkleLayer";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import About from "@/components/About";
import Journey from "@/components/Journey";
import SkillsBento from "@/components/SkillsBento";
import Projects from "@/components/Projects";
import Certifications from "@/components/Certifications";
import Ideas from "@/components/Ideas";
import Resume from "@/components/Resume";
import Contact from "@/components/Contact";
import AdminMessages from "@/components/AdminMessages";
import ErrorBoundary from "@/components/ErrorBoundary";

function Portfolio({ theme, onToggleTheme }) {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.location.search.includes("nolenis")) return;
    let lenis;
    let rafId;
    let removeClick = () => {};
    let alive = true;
    import("lenis").then(({ default: Lenis }) => {
      if (!alive) return;
      lenis = new Lenis({ lerp: 0.1, smoothWheel: true });
      const raf = (time) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(raf);
      };
      rafId = requestAnimationFrame(raf);
      const onClick = (e) => {
        const a = e.target.closest('a[href^="#"]');
        if (!a) return;
        const hash = a.getAttribute("href");
        if (hash && hash.length > 1 && document.querySelector(hash)) {
          e.preventDefault();
          lenis.scrollTo(hash, { offset: -90 });
        }
      };
      document.addEventListener("click", onClick);
      removeClick = () => document.removeEventListener("click", onClick);
    });
    return () => {
      alive = false;
      cancelAnimationFrame(rafId);
      if (lenis) lenis.destroy();
      removeClick();
    };
  }, []);

  return (
    <div className="relative min-h-screen bg-background text-foreground antialiased">
      <ParticleBackground theme={theme} />
      <SparkleLayer theme={theme} />
      <div className="relative z-10">
        <Navbar theme={theme} onToggleTheme={onToggleTheme} />
        <main>
          <Hero />
          <Marquee />
          <About />
          <Journey />
          <SkillsBento />
          <Projects />
          <Certifications />
          <Ideas />
          <Resume />
          <Contact />
        </main>
      </div>
    </div>
  );
}

function App() {
  const [theme, setTheme] = useState(() => {
    if (typeof window === "undefined") return "dark";
    return localStorage.getItem("av-theme") || "dark";
  });

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("av-theme", theme);
  }, [theme]);

  return (
    <ErrorBoundary>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Portfolio theme={theme} onToggleTheme={() => setTheme(t => (t === "dark" ? "light" : "dark"))} />} />
          <Route path="/admin" element={<AdminMessages />} />
          <Route path="*" element={<Portfolio theme={theme} onToggleTheme={() => setTheme(t => (t === "dark" ? "light" : "dark"))} />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="bottom-right" richColors />
    </ErrorBoundary>
  );
}

export default App;
