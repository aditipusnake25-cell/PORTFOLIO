const ITEMS = [
  "FULL-STACK DEVELOPER",
  "GEN-AI ENTHUSIAST",
  "REACT & NODE.JS",
  "GOOGLE GEMINI API",
  "RESTFUL APIS",
  "MONGODB",
];

const Track = ({ ariaHidden }) => (
  <div aria-hidden={ariaHidden} className="flex shrink-0 items-center">
    {ITEMS.map(item => (
      <span key={item} className="flex items-center">
        <span className="text-outline font-display whitespace-nowrap px-8 text-5xl font-extrabold uppercase tracking-tight sm:text-7xl">
          {item}
        </span>
        <span className="h-2.5 w-2.5 shrink-0 rounded-full bg-accent-mint" />
      </span>
    ))}
  </div>
);

export default function Marquee() {
  return (
    <section className="relative border-y border-border-subtle py-5 sm:py-8" data-testid="marquee">
      <div className="flex overflow-hidden">
        <div className="flex" style={{ animation: "marquee-scroll 45s linear infinite" }}>
          <Track ariaHidden={false} />
          <Track ariaHidden={true} />
        </div>
      </div>
    </section>
  );
}
