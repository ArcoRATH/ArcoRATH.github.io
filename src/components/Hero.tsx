"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/data";
import IstClock from "./IstClock";

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <header className="pb-20 pt-36 sm:pt-44">
      <p className="font-mono text-[11px] uppercase tracking-widest text-faint">
        ~/backend engineer — two dots on a terminal, one persistent state
      </p>
      <h1
        aria-label={site.name}
        className="mt-6 text-5xl font-semibold tracking-tighter sm:text-7xl"
      >
        {site.name.split("").map((ch, i) => (
          <span
            key={i}
            aria-hidden="true"
            className="hero-letter inline-block whitespace-pre"
            style={{ "--i": i } as React.CSSProperties}
          >
            {ch === " " ? "\u00A0" : ch}
          </span>
        ))}
      </h1>
      <div className="relative -mt-2 ml-[52%] inline-flex items-center gap-1 sm:ml-[44%]">
        <span className="font-hand text-2xl text-accent">aka {site.alias}</span>
        {!reduced && (
          <motion.svg
            viewBox="0 0 40 40"
            fill="none"
            className="h-8 w-8 text-accent"
            aria-hidden="true"
          >
            <motion.path
              d="M6 32 C 14 28, 22 22, 34 8 M 34 8 l -7 1 M 34 8 l -2 6"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.8, delay: 0.9, ease: "easeOut" }}
            />
          </motion.svg>
        )}
      </div>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        i build scalable backend architectures and context-aware agentic
        workflows — the kind that persist their state.
      </p>
      <div className="mt-4">
        <IstClock />
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <span className="inline-flex items-center gap-2 rounded-full border border-border bg-surface px-4 py-2 font-mono text-xs uppercase tracking-wider text-muted">
          <span
            className="relative flex h-2 w-2"
            aria-hidden="true"
          >
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60 motion-reduce:animate-none" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          open to work
        </span>
        <a
          href="#contact"
          className="rounded-full bg-fg px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-bg transition-colors hover:bg-accent"
        >
          say hi
        </a>
        <span className="font-hand text-xl text-faint">
          or just mail me — it works.
        </span>
      </div>
    </header>
  );
}
