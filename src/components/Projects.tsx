"use client";

import { useRef } from "react";
import type { MouseEvent } from "react";
import Reveal from "./Reveal";
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
    el.style.transform = `perspective(1000px) rotateY(${x * 5}deg) rotateX(${-y * 5}deg)`;
    el.style.setProperty("--mx", `${e.clientX - r.left}px`);
    el.style.setProperty("--my", `${e.clientY - r.top}px`);
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transform = "perspective(1000px) rotateY(0deg) rotateX(0deg)";
  };

  const isNeon = project.accent === "neon";
  const accentText = isNeon ? "text-neon" : "text-viol";
  const accentBorder = isNeon
    ? "hover:border-neon/50 hover:shadow-[0_0_44px_rgba(54,188,247,0.15)]"
    : "hover:border-viol/50 hover:shadow-[0_0_44px_rgba(167,139,250,0.15)]";
  const glowColor = isNeon
    ? "rgba(54, 188, 247, 0.09)"
    : "rgba(167, 139, 250, 0.09)";

  return (
    <Reveal>
      <div
        ref={ref}
        onMouseMove={onMove}
        onMouseLeave={onLeave}
        className={`group relative overflow-hidden rounded-lg border border-line bg-panel p-7 transition-all duration-300 will-change-transform ${accentBorder}`}
      >
        <div
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background: `radial-gradient(600px circle at var(--mx, 50%) var(--my, 50%), ${glowColor}, transparent 45%)`,
          }}
          aria-hidden="true"
        />

        <div className="relative">
          <div className="mb-2 flex items-center justify-between font-mono text-xs">
            <span className={accentText}>{project.index}.</span>
            <a
              href={project.repo}
              target="_blank"
              rel="noreferrer"
              className="text-fog transition-colors hover:text-snow"
              aria-label={`${project.title} repository`}
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
              </svg>
            </a>
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-snow transition-colors group-hover:text-white">
            {project.title}
          </h3>
          <p className={`mt-1 font-mono text-xs ${accentText}`}>
            {project.tagline}
          </p>

          <p className="mt-4 text-sm leading-relaxed text-fog">
            {project.description}
          </p>

          <ul className="mt-5 space-y-2">
            {project.highlights.map((h) => (
              <li key={h} className="flex gap-2.5 text-sm text-fog">
                <span className={`mt-0.5 shrink-0 font-mono ${accentText}`}>
                  ▸
                </span>
                <span>{h}</span>
              </li>
            ))}
          </ul>

          <ul className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded-full border border-line bg-panel2 px-3 py-1 font-mono text-[11px] text-fog"
              >
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Reveal>
  );
}

export default function Projects() {
  return (
    <section id="projects" className="mx-auto max-w-5xl px-6 py-28">
      <Reveal>
        <h2 className="font-mono text-2xl sm:text-3xl font-bold mb-4">
          <span className="text-viol">03.</span> <span className="text-glow">projects</span>
          <span className="mt-4 block h-px w-24 bg-gradient-to-r from-neon to-transparent" />
        </h2>
        <p className="mb-12 font-mono text-sm text-fog">
          <span className="text-ice">$</span> ls ./flagship --sort=architecture
        </p>
      </Reveal>

      <div className="grid gap-8 md:grid-cols-2">
        {projects.map((p) => (
          <TiltCard key={p.id} project={p} />
        ))}
      </div>
    </section>
  );
}
