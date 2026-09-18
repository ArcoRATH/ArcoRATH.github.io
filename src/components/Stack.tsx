import SectionStub from "./SectionStub";
import { stackGroups } from "@/lib/data";

export default function Stack() {
  return (
    <section id="stack" aria-label="Stack" className="py-20">
      <SectionStub
        num="04"
        label="spells i can cast under pressure"
        title="stack"
        dir="right"
      />
      <dl className="mt-6 grid gap-x-10 gap-y-4 sm:grid-cols-2 md:grid-cols-3">
        {stackGroups.map((group) => (
          <div key={group.label}>
            <dt className="font-mono text-[11px] uppercase tracking-widest text-faint">
              {group.label}
            </dt>
            <dd className="mt-1 text-base text-muted">{group.items.join(", ")}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
