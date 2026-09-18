import Reveal from "./Reveal";
import { skillGroups } from "@/lib/data";

export default function Skills() {
  return (
    <section id="skills" className="relative mx-auto max-w-5xl px-6 py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_70%_20%,rgba(167,139,250,0.06),transparent)]"
        aria-hidden="true"
      />
      <Reveal>
        <h2 className="font-mono text-2xl sm:text-3xl font-bold mb-12">
          <span className="text-viol">02.</span> <span className="text-glow">skills</span>
          <span className="mt-4 block h-px w-24 bg-gradient-to-r from-neon to-transparent" />
        </h2>
      </Reveal>

      <div className="grid gap-6 sm:grid-cols-2">
        {skillGroups.map((group, gi) => (
          <Reveal key={group.title} delay={gi * 0.1}>
            <div className="group h-full rounded-lg border border-line bg-panel p-6 transition-all duration-300 hover:border-neon/40 hover:shadow-[0_0_32px_rgba(54,188,247,0.12)]">
              <h3 className="mb-5 flex items-center gap-3 font-mono text-sm uppercase tracking-widest text-snow">
                <span className="text-neon group-hover:text-viol transition-colors">
                  {group.icon}
                </span>
                {group.title}
              </h3>
              <ul className="flex flex-wrap gap-2.5">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded border border-line bg-panel2 px-3 py-1.5 font-mono text-xs text-fog transition-all hover:border-neon/50 hover:text-neon hover:shadow-[0_0_14px_rgba(54,188,247,0.2)]"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}
