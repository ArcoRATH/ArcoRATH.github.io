import { experience } from "@/lib/data";

export default function Experience() {
  return (
    <section id="experience" aria-label="Experience" className="py-20">
      <p className="font-mono text-[11px] uppercase tracking-widest text-faint">
        experience — where i have worked
      </p>
      <ol className="mt-6 divide-y divide-border border-y border-border">
        {experience.map((job) => (
          <li key={job.org} className="grid gap-2 py-6 sm:grid-cols-[13rem_1fr]">
            <div>
              <p className="font-medium">{job.org}</p>
              <p className="mt-0.5 text-sm text-muted">{job.role}</p>
              <p className="mt-1 font-mono text-[11px] text-faint">
                {job.period}
              </p>
              <p className="mt-1 font-mono text-[11px] text-faint">
                {job.note}
              </p>
            </div>
            <ul className="space-y-2">
              {job.bullets.map((b) => (
                <li key={b} className="flex gap-3 text-sm leading-relaxed text-muted">
                  <span aria-hidden="true" className="mt-1.5 h-px w-4 shrink-0 bg-faint" />
                  <span>{b}</span>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </section>
  );
}
