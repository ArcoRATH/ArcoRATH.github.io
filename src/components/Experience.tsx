import SectionStub from "./SectionStub";
import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="py-20">
      <SectionStub
        num="03"
        label="paid to learn, a timeline"
        title="experience"
        dir="left"
      />
      <ol className="mt-6 space-y-5">
        {experience.map((job) => (
          <li
            key={job.org}
            className="pop rounded-lg bg-surface p-6 sm:p-7"
          >
            <div className="grid gap-4 sm:grid-cols-[13rem_minmax(0,1fr)]">
              <div>
                <p className="font-display text-lg font-bold uppercase tracking-tight">
                  {job.org}
                </p>
                <p className="mt-0.5 text-sm text-muted">{job.role}</p>
                <p className="mt-1 font-mono text-[11px] text-faint">
                  {job.period}
                </p>
                <p className="mt-1 font-mono text-[11px] text-faint">
                  {job.note}
                </p>
              </div>
              <ul className="space-y-2" aria-label={`what ${job.org} saw me do`}>
                {job.bullets.map((b) => (
                  <li
                    key={b}
                    className="flex gap-3 text-sm leading-relaxed text-muted"
                  >
                    <span
                      aria-hidden="true"
                      className="mt-1.5 h-px w-4 shrink-0 bg-accent"
                    />
                    <span>{b}</span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
