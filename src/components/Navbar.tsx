"use client";

import { useEffect, useState } from "react";
import { navLinks, site } from "@/lib/data";

export default function Navbar() {
  const [active, setActive] = useState("");
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sections = navLinks
      .map((l) => document.getElementById(l.id))
      .filter((el): el is HTMLElement => el !== null);

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" }
    );

    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-40 transition-all duration-300 ${
        scrolled
          ? "bg-ink/80 backdrop-blur-md border-b border-line"
          : "bg-transparent border-b border-transparent"
      }`}
    >
      <nav className="mx-auto flex max-w-5xl items-center justify-between px-6 py-4">
        <a href="#top" className="font-mono text-sm text-neon hover:text-ice">
          <span className="text-fog">~/</span>
          {site.handle.toLowerCase()}
          <span className="text-viol">:~$</span>
        </a>

        <ul className="hidden sm:flex items-center gap-7 font-mono text-sm">
          {navLinks.map((l, i) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                className={`transition-colors hover:text-neon ${
                  active === l.id ? "text-neon" : "text-fog"
                }`}
              >
                <span className="text-viol">0{i + 1}.</span> {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="rounded-md border border-neon/40 px-3 py-1.5 text-neon transition-all hover:bg-neon/10 hover:shadow-[0_0_18px_rgba(54,188,247,0.25)]"
            >
              github
            </a>
          </li>
        </ul>

        <button
          type="button"
          aria-label="Toggle menu"
          onClick={() => setOpen((o) => !o)}
          className="sm:hidden font-mono text-neon text-lg px-2"
        >
          {open ? "✕" : "☰"}
        </button>
      </nav>

      {open && (
        <ul className="sm:hidden border-t border-line bg-ink/95 backdrop-blur-md px-6 py-4 flex flex-col gap-4 font-mono text-sm">
          {navLinks.map((l, i) => (
            <li key={l.id}>
              <a
                href={`#${l.id}`}
                onClick={() => setOpen(false)}
                className={active === l.id ? "text-neon" : "text-fog"}
              >
                <span className="text-viol">0{i + 1}.</span> {l.label}
              </a>
            </li>
          ))}
          <li>
            <a
              href={site.github}
              target="_blank"
              rel="noreferrer"
              className="text-neon"
            >
              github ↗
            </a>
          </li>
        </ul>
      )}
    </header>
  );
}
