"use client";

function flipTheme() {
  const next = document.documentElement.classList.contains("dark")
    ? "light"
    : "dark";
  document.documentElement.classList.toggle("dark", next === "dark");
  try {
    localStorage.setItem("theme", next);
  } catch {
    /* private mode */
  }
}

function SunIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="4" />
      <path
        strokeLinecap="round"
        d="M12 2v2m0 16v2M2 12h2m16 0h2M4.9 4.9l1.4 1.4m11.3 11.3 1.4 1.4M19.1 4.9l-1.4 1.4M5.4 18.6 4 20"
      />
    </svg>
  );
}

function MoonIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      className="h-4 w-4"
      aria-hidden="true"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8Z"
      />
    </svg>
  );
}

export default function ThemeToggle() {
  return (
    <button
      type="button"
      onClick={flipTheme}
      aria-label="toggle color theme"
      className="pop rounded-md bg-surface p-2 font-mono text-xs"
    >
      <span aria-hidden="true" className="dark:hidden">
        <SunIcon />
      </span>
      <span aria-hidden="true" className="hidden dark:inline">
        <MoonIcon />
      </span>
      <span className="sr-only">toggle lights</span>
    </button>
  );
}
