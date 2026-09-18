"use client";

import { useEffect, useRef, useState } from "react";
import { site, projects, skillGroups } from "@/lib/data";

type Line = { text: string; color?: string };

const BANNER: Line[] = [
  { text: "arcorath terminal v1.0 — type 'help' to begin", color: "text-fog" },
];

function runCommand(raw: string): Line[] {
  const cmd = raw.trim().toLowerCase();
  const out: Line[] = [{ text: `$ ${raw.trim()}`, color: "text-viol" }];

  switch (cmd) {
    case "":
      return out;
    case "help":
      out.push(
        { text: "available commands:", color: "text-snow" },
        { text: "  whoami     who is this guy" },
        { text: "  projects   flagship repositories" },
        { text: "  skills     tech stack" },
        { text: "  contact    reach out" },
        { text: "  sudo       try your luck" },
        { text: "  clear      wipe the screen" },
        { text: "  exit       close terminal" }
      );
      return out;
    case "whoami":
      out.push(
        { text: `${site.name} — ${site.role}`, color: "text-neon" },
        { text: site.college, color: "text-fog" }
      );
      return out;
    case "projects":
      projects.forEach((p) => {
        out.push({
          text: `▸ ${p.title} — ${p.tagline}`,
          color: "text-ice",
        });
        out.push({ text: `  ${p.repo}`, color: "text-fog" });
      });
      return out;
    case "skills":
      skillGroups.forEach((g) => {
        out.push({
          text: `${g.title}: ${g.skills.join(", ").toLowerCase()}`,
          color: "text-fog",
        });
      });
      return out;
    case "contact":
      out.push(
        { text: `email     → ${site.email}`, color: "text-neon" },
        { text: `github    → ${site.github}`, color: "text-neon" },
        { text: `linkedin  → ${site.linkedin}`, color: "text-neon" }
      );
      return out;
    case "sudo":
      out.push({
        text: "permission denied: you are not in the sudoers file. this incident will be reported ;)",
        color: "text-[#ff5f57]",
      });
      return out;
    case "clear":
      return [];
    case "exit":
    case "close":
      return out.concat([{ text: "__CLOSE__" }]);
    default:
      out.push({
        text: `command not found: ${cmd} — try 'help'`,
        color: "text-[#ff5f57]",
      });
      return out;
  }
}

export default function TerminalEasterEgg() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<Line[]>(BANNER);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [hIdx, setHIdx] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open) inputRef.current?.focus();
  }, [open]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const submit = () => {
    const result = runCommand(input);
    if (result.some((l) => l.text === "__CLOSE__")) {
      setOpen(false);
      setLines(BANNER);
      setInput("");
      return;
    }
    if (input.trim()) {
      setHistory((h) => [...h, input.trim()]);
      setHIdx(-1);
    }
    setLines((prev) => (result.length && result[0].text === "$ " ? [] : [...prev, ...result]));
    setInput("");
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      submit();
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      if (history.length === 0) return;
      const next = hIdx < 0 ? history.length - 1 : Math.max(0, hIdx - 1);
      setHIdx(next);
      setInput(history[next]);
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      if (hIdx < 0) return;
      const next = hIdx + 1;
      if (next >= history.length) {
        setHIdx(-1);
        setInput("");
      } else {
        setHIdx(next);
        setInput(history[next]);
      }
    }
  };

  return (
    <>
      <button
        type="button"
        aria-label="Open terminal"
        onClick={() => setOpen((o) => !o)}
        className={`fixed bottom-6 right-6 z-50 flex h-12 w-12 items-center justify-center rounded-lg border font-mono text-sm transition-all duration-300 ${
          open
            ? "border-viol/60 bg-viol/10 text-viol shadow-[0_0_24px_rgba(167,139,250,0.3)]"
            : "border-neon/40 bg-panel text-neon shadow-[0_0_20px_rgba(54,188,247,0.2)] hover:shadow-[0_0_30px_rgba(54,188,247,0.4)] hover:-translate-y-0.5"
        }`}
      >
        {open ? "✕" : ">_"}
      </button>

      {open && (
        <div className="terminal-card fixed bottom-24 right-6 z-50 flex h-[420px] w-[min(92vw,540px)] flex-col overflow-hidden rounded-lg bg-panel/95 backdrop-blur-md">
          <div className="flex items-center gap-2 border-b border-line bg-panel2 px-4 py-2.5">
            <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
            <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
            <span className="ml-2 font-mono text-xs text-fog">
              guest@arcorath: ~
            </span>
          </div>

          <div
            ref={bodyRef}
            className="flex-1 space-y-1 overflow-y-auto p-4 font-mono text-[13px] leading-relaxed"
            onClick={() => inputRef.current?.focus()}
          >
            {lines.map((l, i) =>
              l.text === "__CLOSE__" ? null : (
                <p key={i} className={l.color ?? "text-fog"}>
                  {l.text}
                </p>
              )
            )}
            <div className="flex items-center gap-2 pt-1">
              <span className="shrink-0 text-viol">$</span>
              <input
                ref={inputRef}
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={onKeyDown}
                className="w-full bg-transparent text-snow caret-neon outline-none"
                aria-label="Terminal input"
                autoComplete="off"
                spellCheck={false}
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
