"use client";

import { useEffect, useState } from "react";

export default function TypingTagline({ lines }: { lines: string[] }) {
  const [text, setText] = useState("");
  const [line, setLine] = useState(0);
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const current = lines[line % lines.length];
    let delay = deleting ? 28 : 55;
    let action: "type" | "delete" | "pause" = deleting ? "delete" : "type";

    if (!deleting && text === current) {
      action = "pause";
      delay = 1600;
    }

    const t = setTimeout(() => {
      if (action === "pause") {
        setDeleting(true);
      } else if (action === "delete") {
        if (text === "") {
          setDeleting(false);
          setLine((l) => (l + 1) % lines.length);
        } else {
          setText(current.slice(0, text.length - 1));
        }
      } else {
        setText(current.slice(0, text.length + 1));
      }
    }, delay);

    return () => clearTimeout(t);
  }, [text, deleting, line, lines]);

  return (
    <p className="font-mono text-lg sm:text-xl text-fog">
      <span className="text-viol">$</span>{" "}
      <span className="text-snow">{text}</span>
      <span className="blink text-neon">▍</span>
    </p>
  );
}
