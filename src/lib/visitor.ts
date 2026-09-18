"use client";

import { useEffect, useState } from "react";

export type Visitor =
  | { kind: "located"; city: string; lat: number; lng: number }
  | { kind: "guess"; label: string };

type Located = Extract<Visitor, { kind: "located" }>;

const num = (v: unknown): number | null =>
  typeof v === "number" && Number.isFinite(v) ? v : null;

const loc = (
  city: string | undefined,
  country: string | undefined,
  lat: unknown,
  lng: unknown
): Located | null => {
  const la = num(lat);
  const lo = num(lng);
  if (la === null || lo === null) return null;
  return {
    kind: "located",
    city: [city, country].filter(Boolean).join(", ") || "somewhere",
    lat: la,
    lng: lo,
  };
};

const PICKERS: { url: string; pick: (d: unknown) => Located | null }[] = [
  {
    url: "https://ipwho.is/",
    pick: (d) => {
      const o = d as { success?: boolean; city?: string; country?: string; latitude?: unknown; longitude?: unknown };
      return o?.success
        ? loc(o.city, o.country, o.latitude, o.longitude)
        : null;
    },
  },
  {
    url: "https://get.geojs.io/v1/ip/geo.json",
    pick: (d) => {
      const o = d as { city?: string; country?: string; latitude?: unknown; longitude?: unknown };
      return loc(o.city, o.country, o.latitude, o.longitude);
    },
  },
  {
    url: "https://ipapi.co/json/",
    pick: (d) => {
      const o = d as { error?: boolean; city?: string; country_name?: string; latitude?: unknown; longitude?: unknown };
      return o?.error ? null : loc(o.city, o.country_name, o.latitude, o.longitude);
    },
  },
];

async function locate(): Promise<Located | null> {
  for (const { url, pick } of PICKERS) {
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 5000);
    try {
      const res = await fetch(url, { signal: ctrl.signal });
      const data: unknown = await res.json();
      const parsed = pick(data);
      if (parsed) return parsed;
    } catch {
      /* try next provider */
    } finally {
      clearTimeout(timeout);
    }
  }
  return null;
}

function offsetLabel(): string {
  const offset = -new Date().getTimezoneOffset();
  const sign = offset >= 0 ? "+" : "-";
  const abs = Math.abs(offset);
  return `utc${sign}${String(Math.floor(abs / 60)).padStart(2, "0")}:${
    abs % 60 ? String(abs % 60).padStart(2, "0") : "00"
  }`;
}

export function useVisitorGeo(): { visitor: Visitor | null } {
  const [visitor, setVisitor] = useState<Visitor | null>(null);

  useEffect(() => {
    let alive = true;
    (async () => {
      const located = await locate();
      if (!alive) return;
      setVisitor(located ?? { kind: "guess", label: `somewhere in ${offsetLabel()}` });
    })();
    return () => {
      alive = false;
    };
  }, []);

  return { visitor };
}

export function haversine(
  aLat: number,
  aLng: number,
  bLat: number,
  bLng: number
): number {
  const R = 6371;
  const toRad = (d: number) => (d * Math.PI) / 180;
  const dLat = toRad(bLat - aLat);
  const dLng = toRad(bLng - aLng);
  const s =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(toRad(aLat)) * Math.cos(toRad(bLat / 2)) * Math.sin(dLng / 2) ** 2;
  return Math.round(2 * R * Math.asin(Math.sqrt(s)));
}

const WEATHER_CODES: [number, number, string][] = [
  [0, 0, "clear"],
  [1, 2, "mostly clear"],
  [3, 3, "overcast"],
  [45, 48, "foggy"],
  [51, 57, "drizzle"],
  [61, 67, "rain"],
  [71, 77, "snow"],
  [80, 82, "showers"],
  [85, 86, "snow showers"],
  [95, 99, "storm"],
];

export function describeWeather(code: number): string {
  for (const [min, max, label] of WEATHER_CODES) {
    if (min <= max ? code >= min && code <= max : code >= min || code <= max) {
      return label;
    }
  }
  return "some weather";
}

export async function fetchWeather(
  lat: number,
  lng: number
): Promise<{ temp: number; note: string } | null> {
  try {
    const res = await fetch(
      `https://api.open-meteo.com/v1/forecast?latitude=${lat}&longitude=${lng}&current=temperature_2m,weather_code`
    );
    const data = await res.json();
    const cur = data?.current;
    if (typeof cur?.temperature_2m !== "number") return null;
    return {
      temp: Math.round(cur.temperature_2m),
      note: describeWeather(cur.weather_code ?? 0),
    };
  } catch {
    return null;
  }
}
