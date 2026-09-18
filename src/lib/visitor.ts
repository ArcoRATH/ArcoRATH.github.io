"use client";

import { useEffect, useState } from "react";

export type Visitor =
  | { kind: "located"; city: string; lat: number; lng: number }
  | { kind: "guess"; label: string };

type GeoResponse = {
  city?: string;
  region?: string;
  country_name?: string;
  latitude: number;
  longitude: number;
};

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
    const ctrl = new AbortController();
    const timeout = setTimeout(() => ctrl.abort(), 4000);
    (async () => {
      try {
        const res = await fetch("https://ipapi.co/json/", {
          signal: ctrl.signal,
        });
        const data: GeoResponse = await res.json();
        if (!alive) return;
        setVisitor({
          kind: "located",
          city: [data.city, data.country_name].filter(Boolean).join(", ") || "somewhere",
          lat: data.latitude,
          lng: data.longitude,
        });
      } catch {
        if (alive) {
          setVisitor({ kind: "guess", label: `somewhere in ${offsetLabel()}` });
        }
      } finally {
        clearTimeout(timeout);
      }
    })();
    return () => {
      alive = false;
      ctrl.abort();
      clearTimeout(timeout);
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
