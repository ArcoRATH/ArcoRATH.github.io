"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data";
import ThemeToggle from "./ThemeToggle";

const LINKS = [
  { id: "about", label: "about" },
  { id: "work", label: "work" },
  { id: "experience", label: "experience" },
  { id: "stack", label: "stack" },
  { id: "world", label: "the in-between" },
];

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
          ? "border-border bg-bg/85 backdrop-blur-md"
          : "border-transparent bg-transparent"
      }`}
    >
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-6">
        <a
          href="#top"
          className="font-mono text-xs uppercase tracking-widest text-muted hover:text-accent"
        >
          {site.alias}
        </a>
        <ul className="flex items-center gap-4 font-mono text-xs uppercase tracking-wider text-muted">
          {LINKS.map((l) => (
            <li key={l.id} className="hidden sm:block">
              <a href={`#${l.id}`} className="hover:text-accent">
                {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="pop rounded-md bg-surface px-3 py-1.5 no-underline"
            >
              github ↗
            </a>
          </li>
          <li>
            <ThemeToggle />
          </li>
        </ul>
      </div>
    </nav>
  );
}
