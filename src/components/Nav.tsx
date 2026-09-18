"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data";

const LINKS = ["about", "work", "experience", "stack"];

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <nav
      className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-200 ${
        scrolled
          ? "border-border bg-bg/80 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a
          href="#top"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-fg"
        >
          {site.alias}
        </a>
        <ul className="flex items-center gap-5 font-mono text-xs uppercase tracking-wider text-muted">
          {LINKS.map((l) => (
            <li key={l} className="hidden sm:block">
              <a href={`#${l}`} className="hover:text-accent">
                {l}
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-border bg-surface px-3 py-1.5 hover:border-accent/50 hover:text-accent"
            >
              github ↗
            </a>
          </li>
        </ul>
      </div>
    </nav>
  );
}
