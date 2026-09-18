import Photo from "./Photo";
import SectionStub from "./SectionStub";
import { aboutPhoto, facts } from "@/lib/data";

export default function About() {
  const copy = (
    <div className="space-y-4 leading-relaxed text-muted">
      <p>
        i build the systems behind systems — microservices, distributed data,
        and agentic ai that actually hits ctrl+s. the cloud is just other
        people&apos;s computers; i keep them honest.
      </p>
      <p>
        iit (bhu) 2024, mathematics &amp; computing. i document problems like
        senior memos: my repos ship with architecture diagrams, api references,
        and troubleshooting guides for bugs i refused to ship.
      </p>
      <p className="font-mono text-xs leading-relaxed text-faint">
        {facts.join("  ·  ")}
      </p>
    </div>
  );

  return (
    <section id="about" aria-label="About" className="py-20">
      <SectionStub num="01" label="the disclaimers" title="about" dir="left" />
      {aboutPhoto.src ? (
        <div className="mt-6 grid items-start gap-8 md:grid-cols-[1fr_auto]">
          {copy}
          <Photo
            src={aboutPhoto.src}
            caption={aboutPhoto.caption}
            className="w-64 md:w-72"
          />
        </div>
      ) : (
        <div className="mt-6 max-w-2xl">{copy}</div>
      )}
    </section>
  );
}
