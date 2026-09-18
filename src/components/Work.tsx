"use client";

import { useRef } from "react";
import type { MouseEvent } from "react";
import Photo from "./Photo";
import SectionStub from "./SectionStub";
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
      <article className="pop rounded-lg bg-surface p-6 sm:p-7">
        {project.photo && (
          <Photo
            src={project.photo}
            caption={project.photoCaption}
            alt={`${project.title} photo`}
            className="mb-5 w-full"
          />
        )}
        <div className="flex items-start justify-between gap-3">
          <span className="mt-0.5 font-mono text-xs text-faint">
            {project.num}
          </span>
          <a
            href={project.repo}
            target="_blank"
            rel="noreferrer"
            className="font-mono text-[11px] text-accent hover:underline underline-offset-4"
            aria-label={`${project.title} repository`}
          >
            {project.repo.replace("https://github.com/", "")} ↗
          </a>
        </div>
        <h3 className="mt-3 font-display text-xl font-bold uppercase tracking-tight sm:text-2xl">
          {project.title}
        </h3>
        <dl className="mt-4 space-y-3 text-sm leading-relaxed">
          {[
            { label: "the mess", value: project.problem },
            { label: "my fix", value: project.built },
            { label: "who cares", value: project.impact },
          ].map((field) => (
            <div key={field.label}>
              <dt className="font-mono text-[10px] uppercase tracking-widest text-faint">
                {field.label}
              </dt>
              <dd className="mt-0.5 text-muted">{field.value}</dd>
            </div>
          ))}
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
      <SectionStub
        num="02"
        label="receipts, with annotations"
        title="work"
        dir="right"
      />
      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {projects.map((p) => (
          <TiltCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
