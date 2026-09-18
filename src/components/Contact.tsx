"use client";

import { useEffect, useRef, useState } from "react";
import { site } from "@/lib/data";
import IstClock from "./IstClock";
import Scribble from "./Scribble";
import SectionStub from "./SectionStub";

export default function Contact() {
  const [copied, setCopied] = useState(false);
  const copyTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(
    () => () => {
      if (copyTimer.current) clearTimeout(copyTimer.current);
    },
    []
  );

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(site.email);
      setCopied(true);
      if (copyTimer.current) clearTimeout(copyTimer.current);
      copyTimer.current = setTimeout(() => setCopied(false), 2000);
    } catch {
      window.location.href = `mailto:${site.email}`;
    }
  };

  return (
    <section id="contact" aria-label="Contact" className="pb-24 pt-20 text-center">
      <SectionStub
        num="06"
        label="negotiations department"
        title="let's build something"
        dir="left"
        center
      />
      <div className="relative mx-auto mt-2 w-max">
        <span className="font-hand text-2xl text-faint">
          <Scribble>inbox is always open — really</Scribble>
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
        <button
          type="button"
          onClick={copyEmail}
          aria-label={
            copied
              ? `copied ${site.email} to clipboard`
              : `copy ${site.email} to clipboard`
          }
          className={`pop rounded-md px-6 py-3 font-mono text-xs uppercase tracking-wider ${
            copied ? "bg-accent text-bg" : "bg-fg text-bg"
          }`}
        >
          {copied ? "copied ✓" : site.email}
        </button>
        <a
          href={site.github}
          target="_blank"
          rel="noreferrer"
          className="pop rounded-md bg-surface px-6 py-3 font-mono text-xs uppercase tracking-wider"
        >
          github/{site.alias}
        </a>
        <a
          href={site.linkedin}
          target="_blank"
          rel="noreferrer"
          className="pop rounded-md bg-surface px-6 py-3 font-mono text-xs uppercase tracking-wider"
        >
          linkedin/adarsh-mishra
        </a>
      </div>
      <p className="mt-4 font-mono text-[11px] text-faint">
        <a
          href={`https://mail.google.com/mail/?view=cm&fs=1&to=${site.email}`}
          target="_blank"
          rel="noreferrer"
          className="hover:underline underline-offset-4 hover:text-accent"
        >
          no mail client? send from gmail ↗
        </a>
        <span role="status" aria-live="polite" className="sr-only">
          {copied ? "email copied to clipboard" : ""}
        </span>
      </p>
      <p className="mt-10">
        <IstClock />
      </p>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t-2 border-fg">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-2 px-6 py-8 font-mono text-[11px] uppercase tracking-wider text-faint sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name} · shipped from faridabad ·
          uptime: mostly yes
        </p>
        <p>
          built with next 16 · tailwind ·{" "}
          <span className="text-accent">stubborn optimism</span>
        </p>
      </div>
    </footer>
  );
}
