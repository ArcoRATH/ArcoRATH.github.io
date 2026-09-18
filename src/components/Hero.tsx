"use client";

import { motion, useReducedMotion } from "framer-motion";
import { site } from "@/lib/data";
import IstClock from "./IstClock";
import Scribble from "./Scribble";

export default function Hero() {
  const reduced = useReducedMotion();

  return (
    <header className="pb-20 pt-36 sm:pt-44">
      <p className="font-mono text-[11px] uppercase tracking-widest text-faint">
        ~/start — hello, i persist state (professionally)
      </p>
      <div className="relative mb-10 inline-block max-w-full sm:mb-14">
        <h1
          aria-label={site.name}
          className="mt-6 font-display text-4xl font-bold uppercase tracking-tighter sm:text-6xl"
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
        <div className="mt-3 flex -rotate-1 items-center justify-center gap-2 sm:absolute sm:-bottom-10 sm:right-1 sm:mt-0 sm:-rotate-3 sm:items-start sm:justify-end">
          <span className="font-hand text-[26px] leading-none text-accent">
            <Scribble>so&hellip; what brings you here?</Scribble>
          </span>
          <motion.svg
            viewBox="0 0 48 48"
            fill="none"
            className="h-6 w-6 shrink-0 text-accent sm:h-7 sm:w-7"
            aria-hidden="true"
          >
            <motion.path
              d="M14 6 C 22 14, 28 24, 30 40 M 30 40 l 1.5 -7 M 30 40 l -7 -1.5"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              initial={{ pathLength: reduced ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.7, delay: 1, ease: "easeOut" }}
            />
          </motion.svg>
        </div>
      </div>
      <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted">
        i build scalable backend architectures and agentic workflows — the kind
        that remember everything you told them. it&apos;s not creepy, it&apos;s
        state management.
      </p>
      <div className="mt-4">
        <IstClock />
      </div>
      <div className="mt-8 flex flex-wrap items-center gap-4">
        <span className="pop inline-flex items-center gap-2 rounded-md bg-surface px-4 py-2 font-mono text-xs uppercase tracking-wider">
          <span className="relative flex h-2 w-2" aria-hidden="true">
            <span
              className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-500 opacity-60 motion-reduce:animate-none dark:bg-emerald-400"
            />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500 dark:bg-emerald-400" />
          </span>
          open to work
        </span>
        <a
          href="#contact"
          className="pop rounded-md bg-accent px-5 py-2.5 font-mono text-xs uppercase tracking-wider text-bg"
        >
          say hi
        </a>
        <span className="font-hand text-xl text-faint">
          or just mail me — it works. promise.
        </span>
      </div>
    </header>
  );
}
