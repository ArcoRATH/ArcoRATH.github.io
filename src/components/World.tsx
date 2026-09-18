"use client";

import { useEffect, useRef, useState } from "react";
import type { Globe } from "cobe";
import { useReducedMotion } from "framer-motion";
import SectionStub from "./SectionStub";
import { homeCoords, PIN_MERGE_KM } from "@/lib/data";
import { useVisitorGeo, fetchWeather, haversine, roundKm } from "@/lib/visitor";
import type { Visitor } from "@/lib/visitor";

const RED: [number, number, number] = [0.94, 0.33, 0.23];
const BLUE: [number, number, number] = [0.31, 0.62, 0.93];
const ARC: [number, number, number] = [0.7, 0.94, 0.89]; // teal accent

const ZOOMS = [1, 1.25, 1.5, 1.75, 2];

type Ang = { phi: number; theta: number };

function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

function wrapAngle(x: number): number {
  let y = x % (2 * Math.PI);
  if (y > Math.PI) y -= 2 * Math.PI;
  if (y < -Math.PI) y += 2 * Math.PI;
  return y;
}

// Solve (phi, theta) that puts a lat/lng point front-center.
// Uses the exact projection math from cobe's marker shader:
//   screen-c = cosθ·x + sinθ·z, screen-s = sinφ·sinθ·x + cosθ·y − cosφ·sinθ·z
// with x = cos(lat)cos(lng), y = sin(lat), z = −cos(lat)sin(lng).
function anglesFor(lat: number, lng: number): Ang {
  const rad = Math.PI / 180;
  const v = {
    x: Math.cos(rad * lat) * Math.cos(rad * lng),
    y: Math.sin(rad * lat),
    z: -Math.cos(rad * lat) * Math.sin(rad * lng),
  };
  const score = (phi: number, theta: number): number => {
    const ct = Math.cos(theta);
    const st = Math.sin(theta);
    const cf = Math.cos(phi);
    const sf = Math.sin(phi);
    const c = ct * v.x + st * v.z;
    const s = sf * st * v.x + ct * v.y - cf * st * v.z;
    return c * c + s * s;
  };

  let best: Ang & { d: number } = { phi: 0, theta: 0.25, d: Infinity };
  for (let p = -18; p < 18; p++) {
    const phi = (p / 18) * (Math.PI / 2);
    for (let t = -28; t <= 28; t++) {
      const theta = (t / 28) * (Math.PI / 3);
      const d = score(phi, theta);
      if (d < best.d) best = { phi, theta, d };
    }
  }
  let step = Math.PI / 36;
  for (let i = 0; i < 4; i++) {
    for (let p = -2; p <= 2; p++) {
      for (let t = -2; t <= 2; t++) {
        const phi = best.phi + p * step;
        const theta = clamp(best.theta + t * step, -1.2, 1.2);
        const d = score(phi, theta);
        if (d < best.d) best = { phi, theta, d };
      }
    }
    step /= 2;
  }
  return { phi: wrapAngle(best.phi), theta: clamp(best.theta, -1.2, 1.2) };
}

// Port of cobe's own marker projection (O()/U() in its dist source):
//   t = U([lat,lng]) scaled by (0.8 + markerElevation)
//   x = (c·scale/aspect + 1)/2, y = (−s·scale + 1)/2
//   visible = depth >= 0 || c² + s² >= 0.64
function screenPos(
  lat: number,
  lng: number,
  phi: number,
  theta: number,
  scale: number,
  aspect: number
): { x: number; y: number; visible: boolean } {
  const rad = Math.PI / 180;
  const t0 = Math.cos(rad * lat) * Math.cos(rad * lng);
  const t1 = Math.sin(rad * lat);
  const t2 = -Math.cos(rad * lat) * Math.sin(rad * lng);
  const r = 0.85;
  const v = [t0 * r, t1 * r, t2 * r];
  const ct = Math.cos(theta);
  const st = Math.sin(theta);
  const cf = Math.cos(phi);
  const sf = Math.sin(phi);
  const c = ct * v[0] + st * v[2];
  const s = sf * st * v[0] + ct * v[1] - cf * st * v[2];
  const depth = -sf * ct * v[0] + st * v[1] + cf * st * v[2];
  const visible = depth >= 0 || c * c + s * s >= 0.64;
  return {
    x: (c * scale / (aspect || 1) + 1) / 2,
    y: (-s * scale + 1) / 2,
    visible,
  };
}

const HOME_MARKER = {
  location: [homeCoords.lat, homeCoords.lng] as [number, number],
  size: 0.07,
  color: RED,
};

const HOME_VIEW = anglesFor(homeCoords.lat, homeCoords.lng);

function Dot({ color = "bg-accent" }: { color?: string }) {
  return (
    <span aria-hidden="true" className={`mt-1 h-2 w-2 shrink-0 rounded-full ${color}`} />
  );
}

export default function World() {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const globeRef = useRef<Globe | null>(null);
  const angRef = useRef<Ang>({ ...HOME_VIEW });
  const dragRef = useRef({ on: false, x: 0, y: 0 });
  const animRef = useRef<{ t0: number; from: Ang; to: Ang } | null>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const meLabelRef = useRef<HTMLDivElement>(null);
  const youLabelRef = useRef<HTMLDivElement>(null);
  const syncRef = useRef<() => void>(() => {});
  const zoomRef = useRef(0);
  const overlapRef = useRef(false);
  const visitorRef = useRef<Visitor | null>(null);
  const { visitor } = useVisitorGeo();
  const reduced = useReducedMotion();

  const [ready, setReady] = useState(false);
  const [zoomIdx, setZoomIdx] = useState(0);
  const [homeTemp, setHomeTemp] = useState<{ temp: number; note: string } | null>(null);
  const [visitorTemp, setVisitorTemp] = useState<{ temp: number; note: string } | null>(null);

  const distance =
    visitor?.kind === "located"
      ? haversine(homeCoords.lat, homeCoords.lng, visitor.lat, visitor.lng)
      : null;
  const overlap = distance !== null && distance < PIN_MERGE_KM;

  const applyAngle = () => {
    globeRef.current?.update({
      phi: angRef.current.phi,
      theta: angRef.current.theta,
    });
    syncRef.current();
  };

  const syncRing = () => {
    const wrapper = wrapperRef.current;
    const ring = ringRef.current;
    if (!wrapper || !ring) return;
    const scale = 0.95 * ZOOMS[zoomRef.current];
    const aspect = wrapper.offsetWidth / wrapper.offsetHeight || 1;
    const homePos = screenPos(
      homeCoords.lat,
      homeCoords.lng,
      angRef.current.phi,
      angRef.current.theta,
      scale,
      aspect
    );

    if (ring) {
      ring.style.left = `${(homePos.x * 100).toFixed(2)}%`;
      ring.style.top = `${(homePos.y * 100).toFixed(2)}%`;
      ring.style.opacity = overlapRef.current ? "1" : "0";
    }

    const me = meLabelRef.current;
    if (me) {
      me.style.left = `${(homePos.x * 100).toFixed(2)}%`;
      me.style.top = `calc(${(homePos.y * 100).toFixed(2)}% + 12px)`;
      me.style.opacity = homePos.visible ? "1" : "0";
    }

    const you = youLabelRef.current;
    if (you) {
      const v = visitorRef.current;
      const show =
        overlapRef.current === false &&
        v !== null &&
        v.kind === "located";
      if (show && v.kind === "located") {
        const pos = screenPos(v.lat, v.lng, angRef.current.phi, angRef.current.theta, scale, aspect);
        you.style.left = `${(pos.x * 100).toFixed(2)}%`;
        you.style.top = `calc(${(pos.y * 100).toFixed(2)}% + 12px)`;
        you.style.opacity = pos.visible ? "1" : "0";
      } else {
        you.style.opacity = "0";
      }
    }
  };

  // keep refs in sync with state for the imperative callbacks
  useEffect(() => {
    zoomRef.current = zoomIdx;
    overlapRef.current = overlap;
    visitorRef.current = visitor;
    syncRef.current = syncRing;
  });

  useEffect(() => {
    let alive = true;
    fetchWeather(homeCoords.lat, homeCoords.lng).then((w) => {
      if (alive && w) setHomeTemp(w);
    });
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    if (visitor?.kind !== "located") return;
    let alive = true;
    fetchWeather(visitor.lat, visitor.lng).then((w) => {
      if (alive && w) setVisitorTemp(w);
    });
    return () => {
      alive = false;
    };
  }, [visitor]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;
    let observer: ResizeObserver | null = null;

    (async () => {
      try {
        const { default: createGlobeLazy } = await import("cobe");
        if (cancelled) return;
        const w = wrapperRef.current?.offsetWidth || 380;
        canvas.style.opacity = "1";
        globeRef.current = createGlobeLazy(canvas, {
          devicePixelRatio: Math.min(window.devicePixelRatio || 1, 2),
          width: w * 2,
          height: w * 2,
          phi: angRef.current.phi,
          theta: angRef.current.theta,
          mapSamples: 17000,
          mapBrightness: 5,
          diffuse: 1.3,
          baseColor: [0.26, 0.25, 0.23],
          markerColor: RED,
          glowColor: [0.42, 0.31, 0.14],
          dark: 1,
          scale: 0.95,
          arcColor: ARC,
          arcHeight: 0.25,
        });
        observer = new ResizeObserver(() => {
          const cw = wrapperRef.current?.offsetWidth || 380;
          globeRef.current?.update({ width: cw * 2, height: cw * 2 });
          syncRef.current();
        });
        observer.observe(wrapperRef.current!);
        syncRef.current();
        setReady(true);
      } catch {
        return;
      }
    })();

    return () => {
      cancelled = true;
      observer?.disconnect();
      globeRef.current?.destroy();
      globeRef.current = null;
      setReady(false);
    };
  }, []);

  useEffect(() => {
    const g = globeRef.current;
    if (!g || !ready || !visitor) return;
    const markers = [HOME_MARKER];
    let arcs: { from: [number, number]; to: [number, number] }[] = [];
    if (visitor.kind === "located" && !overlap) {
      markers.push({
        location: [visitor.lat, visitor.lng],
        size: 0.055,
        color: BLUE,
      });
      arcs = [{ from: [visitor.lat, visitor.lng], to: [homeCoords.lat, homeCoords.lng] }];
    }
    g.update({ markers: markers, arcs: arcs });
    syncRef.current();
  }, [visitor, ready, overlap]);

  useEffect(() => {
    if (!ready) return;
    globeRef.current?.update({ scale: 0.95 * ZOOMS[zoomIdx] });
    syncRef.current();
  }, [zoomIdx, ready]);

  const recenterHome = () => {
    const target = HOME_VIEW;
    if (reduced || !globeRef.current) {
      angRef.current = { ...target };
      applyAngle();
      return;
    }
    const from = { ...angRef.current };
    const t0 = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - t0) / 600);
      const e = 1 - Math.pow(1 - t, 3);
      const dPhi = wrapAngle(target.phi - from.phi);
      angRef.current = {
        phi: wrapAngle(from.phi + dPhi * e),
        theta: from.theta + (target.theta - from.theta) * e,
      };
      applyAngle();
      if (t < 1) window.requestAnimationFrame(step);
    };
    window.requestAnimationFrame(step);
  };

  const visitorLine =
    visitor?.kind === "located"
      ? visitor.city
      : visitor?.kind === "guess"
        ? visitor.label
        : "locating you…";

  const readoutCards = (
    <div
      className="grid gap-4"
      aria-label={`I am in ${homeCoords.label}, haryana, india. ${
        visitor?.kind === "located"
          ? `you are around ${distance} kilometres away in ${visitor.city}.`
          : "your approximate location shows on the globe."
      }`}
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="pop rounded-md bg-surface p-4">
          <p className="flex items-start gap-2 text-sm text-fg">
            <Dot color="bg-[#ef4444]" />
            <span>me — faridabad, haryana</span>
          </p>
          <p className="mt-2 font-mono text-[11px] text-faint">
            {homeTemp ? `${homeTemp.temp}° · ${homeTemp.note} · utc+05:30` : "…"}
          </p>
        </div>

        <div className="pop rounded-md bg-surface p-4">
          <p className="flex items-start gap-2 text-sm text-fg">
            <Dot color="bg-[#60a5fa]" />
            <span>
              you — {visitorLine}
              {overlap ? " · basically my neighbour" : ""}
            </span>
          </p>
          <p className="mt-2 font-mono text-[11px] text-faint">
            {visitor?.kind === "located" && visitorTemp
              ? `${visitorTemp.temp}° · ${visitorTemp.note}`
              : visitor?.kind === "located"
                ? "weather not answering right now"
                : visitor?.kind === "guess"
                  ? "ip lookup blocked — no weather from a timezone alone"
                  : "…"}
          </p>
        </div>
      </div>

      <div className="pop rounded-md bg-surface p-5">
        <p className="font-mono text-2xl font-medium text-accent sm:text-3xl">
          {distance !== null
            ? `≈ ${roundKm(distance).toLocaleString("en-IN")} km apart`
            : "distance pending…"}
        </p>
        <p className="mt-2 max-w-md font-hand text-xl leading-snug text-muted">
          {distance !== null ? distance < PIN_MERGE_KM
            ? "same pin code, probably. hi neighbour."
            : distance < 500
              ? "practically commuting distance. bring snacks."
              : distance < 3000
                ? "close enough for a call, far enough for an alibi."
                : "different timezones, same inbox. physics is weak."
            : "the dot finder is working on it."}
        </p>
      </div>
    </div>
  );

  return (
    <section id="world" aria-label="The in-between — me, you, and the weather" className="py-20">
      <SectionStub
        num="05"
        label="me, you, and the weather in between"
        title="the in-between"
        dir="left"
      />

      <div className="mt-8 grid items-start gap-8 md:grid-cols-[auto_minmax(0,1fr)]">
        <div className="relative mx-auto w-[min(80vw,380px)]">
          <div
            ref={wrapperRef}
            className="relative aspect-square"
        >
          <canvas
            ref={canvasRef}
            aria-hidden="true"
            className="absolute inset-0 h-full w-full touch-none opacity-0 transition-opacity duration-700"
            style={{ cursor: "grab" }}
            onPointerDown={(e) => {
              e.preventDefault();
              dragRef.current = { on: true, x: e.clientX, y: e.clientY };
              animRef.current = null;
            }}
            onPointerMove={(e) => {
              if (!dragRef.current.on || !globeRef.current) return;
              const dx = e.clientX - dragRef.current.x;
              const dy = e.clientY - dragRef.current.y;
              dragRef.current.x = e.clientX;
              dragRef.current.y = e.clientY;
              angRef.current = {
                phi: wrapAngle(angRef.current.phi + dx * 0.006),
                theta: clamp(angRef.current.theta + dy * 0.005, -0.5, 1.1),
              };
              applyAngle();
            }}
            onPointerUp={() => {
              dragRef.current.on = false;
            }}
            onPointerLeave={() => {
              dragRef.current.on = false;
            }}
          />

          <div
            ref={ringRef}
            className="absolute -translate-x-1/2 -translate-y-1/2 animate-pulse rounded-full border-2 border-dashed border-[#60a5fa] motion-reduce:animate-none"
            style={{
              opacity: 0,
              width: "18px",
              height: "18px",
            }}
          />

          <div
            ref={meLabelRef}
            aria-hidden="true"
            className="pointer-events-none absolute -translate-x-1/2 rounded-sm bg-bg/85 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#f87171] backdrop-blur-sm"
            style={{ opacity: 0, transition: "opacity 200ms" }}
          >
            me
          </div>
          <div
            ref={youLabelRef}
            aria-hidden="true"
            className="pointer-events-none absolute -translate-x-1/2 rounded-sm bg-bg/85 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-widest text-[#60a5fa]"
            style={{ opacity: 0, transition: "opacity 200ms" }}
          >
            you
          </div>

          <div className="absolute bottom-3 right-3 flex flex-col gap-1.5">
            <button
              type="button"
              aria-label="zoom the globe in"
              onClick={() => setZoomIdx((i) => Math.min(ZOOMS.length - 1, i + 1))}
              className="pop rounded-md bg-surface p-2 font-mono text-xs"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true">
                <path strokeLinecap="round" d="M12 5v14M5 12h14" />
              </svg>
            </button>
            <button
              aria-label="zoom the globe out"
              onClick={() => setZoomIdx((i) => Math.max(0, i - 1))}
              className="pop rounded-md bg-surface p-2 font-mono text-xs"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true">
                <path strokeLinecap="round" d="M5 12h14" />
              </svg>
            </button>
            <button
              aria-label="reset the globe to home view"
              onClick={() => {
                setZoomIdx(0);
                recenterHome();
              }}
              className="pop rounded-md bg-surface p-2 font-mono text-xs"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="h-3.5 w-3.5" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3 12a9 9 0 1 0 3-6.7L3 8m0-4v4h4" />
              </svg>
            </button>
          </div>
          </div>

          <div
            aria-hidden="true"
            className="relative mt-2 -rotate-2 self-start font-hand text-lg leading-snug text-fg/80 sm:absolute sm:-bottom-[3.25rem] sm:left-0 sm:w-max"
          >
            <svg
              viewBox="0 0 32 32"
              fill="none"
              className="-ml-1 mr-1.5 inline-block h-5 w-5 text-accent sm:absolute sm:-left-6 sm:-top-5 sm:h-6 sm:w-6"
            >
              <path
                d="M22 28 C 18 18, 16 12, 12 5 M 12 5 l 5 1 M 12 5 l 0.5 5.5"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                fill="none"
              />
            </svg>
            <span className="relative top-0.5">pssh&hellip; it doesn&apos;t spin on its own — i have that power, i choose restraint.</span>
          </div>
        </div>

        {readoutCards}
      </div>
    </section>
  );
}
