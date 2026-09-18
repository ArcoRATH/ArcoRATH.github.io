import Reveal from "./Reveal";
import { site } from "@/lib/data";

export default function Contact() {
  return (
    <section id="contact" className="relative mx-auto max-w-5xl px-6 py-28">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_50%_45%_at_50%_100%,rgba(54,188,247,0.07),transparent)]"
        aria-hidden="true"
      />
      <Reveal className="text-center">
        <h2 className="font-mono text-2xl sm:text-3xl font-bold mb-4">
          <span className="text-viol">04.</span> <span className="text-glow">contact</span>
          <span className="mx-auto mt-4 block h-px w-24 bg-gradient-to-r from-transparent via-neon to-transparent" />
        </h2>

        <p className="mx-auto mt-8 max-w-xl font-mono text-lg text-snow">
          <span className="text-ice">$</span> echo{" "}
          <span className="text-viol">&quot;let&apos;s build something&quot;</span>
        </p>
        <p className="mx-auto mt-5 max-w-xl leading-relaxed text-fog">
          My inbox is always open — whether it is backend system design,
          graph/vector databases, agentic AI, or just a good engineering
          conversation. I will do my best to reply.
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            className="rounded-md bg-neon/10 px-6 py-3 font-mono text-sm text-neon border border-neon/50 transition-all hover:bg-neon/20 hover:shadow-[0_0_28px_rgba(54,188,247,0.35)]"
          >
            github/{site.handle.toLowerCase()}
          </a>
          <a
            href={`mailto:${site.email}`}
            className="rounded-md border border-line px-6 py-3 font-mono text-sm text-fog transition-all hover:border-ice/60 hover:text-ice hover:shadow-[0_0_28px_rgba(34,211,238,0.2)]"
          >
            {site.email}
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            className="rounded-md border border-viol/40 px-6 py-3 font-mono text-sm text-viol transition-all hover:bg-viol/10 hover:shadow-[0_0_28px_rgba(167,139,250,0.25)]"
          >
            linkedin/adarsh-mishra
          </a>
        </div>
      </Reveal>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-line">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 py-8 font-mono text-xs text-fog sm:flex-row">
        <p>
          <span className="text-viol">©</span> {new Date().getFullYear()}{" "}
          adarsh mishra
        </p>
        <p>
          built with{" "}
          <span className="text-neon">next.js</span> ·{" "}
          <span className="text-ice">tailwind</span> ·{" "}
          <span className="text-viol">framer motion</span>
        </p>
      </div>
    </footer>
  );
}
