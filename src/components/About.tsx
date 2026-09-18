import Reveal from "./Reveal";
import { aboutLines, site } from "@/lib/data";

export default function About() {
  return (
    <section id="about" className="mx-auto max-w-5xl px-6 py-28">
      <Reveal>
        <h2 className="font-mono text-2xl sm:text-3xl font-bold mb-12">
          <span className="text-viol">01.</span> <span className="text-glow">about me</span>
          <span className="mt-4 block h-px w-24 bg-gradient-to-r from-neon to-transparent" />
        </h2>
      </Reveal>

      <div className="grid gap-12 md:grid-cols-2 md:items-center">
        <Reveal>
          <div className="terminal-card overflow-hidden rounded-lg bg-panel">
            <div className="flex items-center gap-2 border-b border-line bg-panel2 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f57]" />
              <span className="h-3 w-3 rounded-full bg-[#febc2e]" />
              <span className="h-3 w-3 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-fog">
                adarsh@iitbhu: ~
              </span>
            </div>
            <div className="space-y-3 p-5 font-mono text-[13px] sm:text-sm leading-relaxed">
              {aboutLines.map((l) => (
                <div key={l.prompt}>
                  <p>
                    <span className="text-viol">$</span>{" "}
                    <span className="text-ice">{l.prompt}</span>
                  </p>
                  <p className={l.out.startsWith("●") ? "text-neon" : "text-fog"}>
                    {l.out}
                  </p>
                </div>
              ))}
              <p>
                <span className="text-viol">$</span>{" "}
                <span className="blink text-neon">▍</span>
              </p>
            </div>
          </div>
        </Reveal>

        <Reveal delay={0.15}>
          <div className="space-y-5 text-fog leading-relaxed">
            <p>
              I am a <span className="text-snow">Mathematics and Computing</span>{" "}
              undergraduate at{" "}
              <span className="text-snow">IIT (BHU), Varanasi</span> who feels
              most at home somewhere between system design diagrams and a
              terminal window.
            </p>
            <p>
              My work centers on{" "}
              <span className="text-neon">backend architecture</span> —
              microservices, distributed systems, and high-performance ML data
              pipelines — plus a growing obsession with{" "}
              <span className="text-viol">agentic AI workflows</span>: LLM
              orchestration, vector search, and state machines that actually
              persist their state.
            </p>
            <p>
              When a problem interests me, I document it like an engineering
              memo: both of my flagship repos ship with architecture diagrams,
              API references, and troubleshooting guides.
            </p>
            <p className="font-mono text-sm">
              <span className="text-ice">let&apos;s connect over</span> →
              backend system design · graph/vector databases · python/c++
            </p>
            <p className="font-mono text-xs text-fog/70">
              find me on github as{" "}
              <a
                href={site.github}
                target="_blank"
                rel="noreferrer"
                className="text-neon hover:underline"
              >
                @{site.handle}
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
