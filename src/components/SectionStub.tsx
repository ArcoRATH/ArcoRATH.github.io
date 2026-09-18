import type { ReactNode } from "react";

export default function SectionStub({
  num,
  label,
  title,
  dir = "left",
  center = false,
  children,
}: {
  num: string;
  label: string;
  title: string;
  dir?: "left" | "right";
  center?: boolean;
  children?: ReactNode;
}) {
  const tilt = dir === "left" ? "-rotate-1" : "rotate-1";

  return (
    <div className={center ? "text-center" : undefined}>
      <span
        className={`pop inline-flex items-center gap-2 rounded-md bg-surface px-3 py-1.5 font-mono text-[11px] uppercase tracking-widest ${tilt}`}
      >
        <span aria-hidden="true" className="text-accent">
          {num}
        </span>
        {label}
        {children}
      </span>
      <h2 className="mt-4 font-display text-2xl font-bold uppercase tracking-tight sm:text-3xl">
        {title}
      </h2>
    </div>
  );
}
