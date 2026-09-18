"use client";

import { useRef } from "react";
import type { MouseEvent } from "react";
import { projects } from "@/lib/data";
import type { Project } from "@/lib/data";

function TiltCard({ project }: { project: Project }) {
  const ref = useRef<HTMLDivElement>(null);

  const onMove = (e: MouseEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5;
    const y = (e.clientY - r.top) / r.height - 0.5;
    el.style.transform = `perspective(900px) rotateY(${x * 4}deg) rotateX(${-y * 4}deg)`;
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg)";
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className="will-change-transform transition-transform duration-200 ease-out"
    >
      <article className="rounded-2xl border border-border bg-surface/50 p-6 transition-colors duration-200 hover:bg-surface/80 sm:p-7">
        <div className="flex items-baseline justify-between">
          <span className="font-mono text-xs text-faint">{project.num}</span>
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-xs text-muted hover:text-accent"
            aria-label={`${project.title} repository`}
          >
            {project.repo.replace("https://github.com/", "")} ↗
          </a>
        </div>
        <h3 className="mt-3 text-2xl font-semibold tracking-tight">
          {project.title}
        </h3>
        <dl className="mt-4 space-y-3 text-sm leading-relaxed">
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-faint">
              the problem
            </dt>
            <dd className="mt-0.5 text-muted">{project.problem}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-faint">
              what i built
            </dt>
            <dd className="mt-0.5 text-muted">{project.built}</dd>
          </div>
          <div>
            <dt className="font-mono text-[10px] uppercase tracking-widest text-faint">
              so what
            </dt>
            <dd className="mt-0.5 text-muted">{project.impact}</dd>
          </div>
        </dl>
        <p className="mt-5 font-mono text-[11px] text-faint">
          {project.tech.join(" · ")}
        </p>
      </article>
    </div>
  );
}

export default function Work() {
  return (
    <section id="work" aria-label="Work" className="py-20">
      <p className="font-mono text-[11px] uppercase tracking-widest text-faint">
        work — proof of shipped things
      </p>
      <div className="mt-6 grid gap-5 md:grid-cols-2">
        {projects.map((p) => (
          <TiltCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
