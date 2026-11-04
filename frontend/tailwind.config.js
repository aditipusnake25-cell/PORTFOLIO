import tailwindcssAnimate from "tailwindcss-animate";

export default {
  content: ["./src/**/*.{js,jsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "muted-foreground": "var(--muted-foreground)",
        surface: "var(--surface)",
        card: "var(--card)",
        "border-subtle": "var(--border)",
        "accent-sky": "var(--accent-sky)",
        "accent-mint": "var(--accent-mint)",
        "accent-deep": "var(--accent-deep)",
        "glow-sky": "var(--glow-sky)",
        "glow-mint": "var(--glow-mint)",
      },
      fontFamily: {
        display: ["Outfit", "sans-serif"],
        sans: ["Plus Jakarta Sans", "sans-serif"],
        code: ["JetBrains Mono", "monospace"],
      },
    },
  },
  plugins: [tailwindcssAnimate],
};
