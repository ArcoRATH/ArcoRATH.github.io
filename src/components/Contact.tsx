"use client";

import { site } from "@/lib/data";
import IstClock from "./IstClock";

export default function Contact() {
  return (
    <section id="contact" aria-label="Contact" className="pb-24 pt-20 text-center">
      <p className="font-mono text-[11px] uppercase tracking-widest text-faint">
        contact
      </p>
      <h2 className="mt-6 text-4xl font-semibold tracking-tighter sm:text-5xl">
        let&apos;s build something
      </h2>
      <div className="relative mx-auto mt-2 w-max">
        <span className="font-hand text-2xl text-faint">
          inbox is always open — really
        </span>
        <svg
          viewBox="0 0 60 30"
          fill="none"
          className="absolute -bottom-6 left-1/2 h-7 w-14 -translate-x-1/2 text-accent"
          aria-hidden="true"
        >
          <path
            d="M10 4 C 20 24, 40 24, 50 12 M 50 12 l -2 6 M 50 12 l -6 -2"
            stroke="currentColor"
            strokeWidth="1.5"
            strokeLinecap="round"
            fill="none"
          />
        </svg>
      </div>
      <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
        <a
          href={`mailto:${site.email}`}
          className="rounded-full bg-fg px-6 py-3 font-mono text-xs uppercase tracking-wider text-bg transition-colors hover:bg-accent"
        >
          {site.email}
        </a>
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border bg-surface px-6 py-3 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-accent/50 hover:text-accent"
        >
          github/{site.alias}
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          className="rounded-full border border-border bg-surface px-6 py-3 font-mono text-xs uppercase tracking-wider text-muted transition-colors hover:border-accent/50 hover:text-accent"
        >
          linkedin/adarsh-mishra
        </a>
      </div>
      <p className="mt-10">
        <IstClock />
      </p>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 py-8 font-mono text-[11px] uppercase tracking-wider text-faint sm:flex-row">
        <p>© {new Date().getFullYear()} {site.name}</p>
        <p>
          no-build-time-magic · next.js 16 · tailwind · a lot of
          {" "}
          <span className="text-accent">state</span>
        </p>
      </div>
    </footer>
  );
}
