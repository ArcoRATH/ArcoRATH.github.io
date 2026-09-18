import type { ReactNode } from "react";

export default function Scribble({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={`relative inline-block ${className ?? ""}`}>
      {children}
      <svg
        aria-hidden="true"
        viewBox="0 0 120 8"
        preserveAspectRatio="none"
        fill="none"
        className="pointer-events-none absolute -bottom-2 left-0 h-2 w-full text-accent"
      >
        <path
          d="M2 5 C 15 1, 30 8, 45 4 S 75 1, 90 5 S 112 4, 118 3"
          stroke="currentColor"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
      </svg>
    </span>
  );
}
