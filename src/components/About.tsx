import { aboutLines, facts } from "@/lib/data";

export default function About() {
  return (
    <section id="about" aria-label="About" className="py-20">
      <p className="font-mono text-[11px] uppercase tracking-widest text-faint">
        about
      </p>
      <div className="mt-6 max-w-2xl space-y-4 leading-relaxed text-muted">
        {aboutLines.map((line) => (
          <p key={line}>{line}</p>
        ))}
        <p className="font-mono text-xs leading-relaxed text-faint">
          {facts.join("  ·  ")}
        </p>
      </div>
    </section>
  );
}
