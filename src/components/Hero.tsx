"use client";

import { motion } from "framer-motion";
import ParticleField from "./ParticleField";
import TypingTagline from "./TypingTagline";
import { site, taglines } from "@/lib/data";

function GithubIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.56 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .96-.31 3.15 1.18a10.9 10.9 0 0 1 5.74 0c2.19-1.49 3.15-1.18 3.15-1.18.62 1.59.23 2.76.11 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14 0 1.54-.01 2.79-.01 3.17 0 .31.21.68.8.56A10.52 10.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
    </svg>
  );
}

function LinkedinIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5" aria-hidden="true">
      <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.55C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.72C24 .77 23.2 0 22.22 0Z" />
    </svg>
  );
}

export default function Hero() {
  return (
    <section
      id="top"
      className="relative flex min-h-screen items-center justify-center overflow-hidden"
    >
      <div className="grid-bg absolute inset-0" aria-hidden="true" />
      <ParticleField />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_0%,#050810_85%)]"
        aria-hidden="true"
      />

      <div className="relative z-10 mx-auto max-w-4xl px-6 text-center">
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="font-mono text-sm text-neon mb-4"
        >
          {"// hello world, i am"}
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-5xl sm:text-7xl font-bold tracking-tight"
        >
          <span className="text-glow bg-gradient-to-r from-neon via-ice to-viol bg-clip-text text-transparent">
            {site.name}
          </span>
        </motion.h1>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.25 }}
          className="mt-6 flex justify-center"
        >
          <TypingTagline lines={taglines} />
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mx-auto mt-6 max-w-2xl text-fog leading-relaxed"
        >
          I design scalable backend architectures and build context-aware
          agentic workflows — from SHA-256 content-addressed storage to
          mastery-gated learning agents running on vector databases.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.55 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#projects"
            className="rounded-md bg-neon/10 px-6 py-3 font-mono text-sm text-neon border border-neon/50 transition-all hover:bg-neon/20 hover:shadow-[0_0_28px_rgba(54,188,247,0.35)]"
          >
            view projects
          </a>
          <a
            href="#contact"
            className="rounded-md border border-line px-6 py-3 font-mono text-sm text-fog transition-all hover:border-viol/60 hover:text-viol hover:shadow-[0_0_28px_rgba(167,139,250,0.2)]"
          >
            get in touch
          </a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-10 flex items-center justify-center gap-5"
        >
          <a
            href={site.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-fog transition-all hover:text-neon hover:-translate-y-0.5"
          >
            <GithubIcon />
          </a>
          <a
            href={site.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-fog transition-all hover:text-neon hover:-translate-y-0.5"
          >
            <LinkedinIcon />
          </a>
        </motion.div>
      </div>

      <a
        href="#about"
        aria-label="Scroll to about"
        className="bounce-slow absolute bottom-8 left-1/2 -translate-x-1/2 font-mono text-fog hover:text-neon"
      >
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-6 w-6" aria-hidden="true">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 14l-7 7-7-7M19 5l-7 7-7-7" />
        </svg>
      </a>
    </section>
  );
}
