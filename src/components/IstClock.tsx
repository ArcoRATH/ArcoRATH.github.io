"use client";

import { useEffect, useState } from "react";
import { site } from "@/lib/data";

const fmt = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Asia/Kolkata",
  hour: "2-digit",
  minute: "2-digit",
  second: "2-digit",
  hour12: false,
});

export default function IstClock() {
  const [time, setTime] = useState("--:--:--");

  useEffect(() => {
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span suppressHydrationWarning className="font-mono text-[11px] uppercase tracking-wider text-faint">
      {site.displayCity} · {time} ist
    </span>
  );
}
