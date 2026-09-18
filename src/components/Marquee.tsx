import { marqueeItems } from "@/lib/data";

export default function Marquee() {
  const strip = [...marqueeItems, ...marqueeItems];

  return (
    <section
      aria-label="Things i have shipped, and other flexes"
      className="marquee overflow-hidden border-y-2 border-fg py-3"
    >
      <div className="marquee-strip flex w-max items-center gap-8">
        {strip.map((item, i) => (
          <span
            key={`${item}-${i}`}
            aria-hidden={i >= marqueeItems.length}
            className="flex items-center gap-8 font-mono text-[11px] uppercase tracking-widest text-faint"
          >
            {item}
            <span aria-hidden="true" className="text-accent">
              ✦
            </span>
          </span>
        ))}
      </div>
    </section>
  );
}
