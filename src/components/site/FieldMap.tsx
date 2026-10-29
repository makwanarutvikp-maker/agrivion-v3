import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "motion/react";
import satellite from "@/assets/satellite-field.jpg";
import { routePosition, type Point } from "@/lib/rover-sim";

export type Waypoint = Point;

export function serpentine(rows = 6, x0 = 18, x1 = 82, y0 = 22, y1 = 78): Waypoint[] {
  const pts: Waypoint[] = [];
  const count = Math.max(1, Math.floor(rows));
  for (let i = 0; i < count; i++) {
    const y = count === 1 ? y0 : y0 + ((y1 - y0) * i) / (count - 1);
    pts.push(i % 2 === 0 ? { x: x0, y } : { x: x1, y }, i % 2 === 0 ? { x: x1, y } : { x: x0, y });
  }
  return pts;
}

export function FieldMap({
  waypoints,
  progress,
  position,
  running = true,
  ndvi = false,
  className,
}: {
  waypoints: Waypoint[];
  progress?: number;
  position?: (Point & { heading: number }) | undefined;
  running?: boolean;
  ndvi?: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [auto, setAuto] = useState(0);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const reduce = useReducedMotion();
  const t = progress ?? (reduce ? 0.5 : auto);
  const pos = position ?? routePosition(waypoints, t);
  const d = waypoints.map((p, i) => `${i ? "L" : "M"}${p.x} ${p.y}`).join(" ");

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry!.isIntersecting), {
      threshold: 0.05,
    });
    observer.observe(element);
    const onVisibility = () => setPageVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);

  useEffect(() => {
    if (progress !== undefined || position || !running || reduce || !visible || !pageVisible)
      return;
    // 20fps is sufficient for this small decorative map; no SVG reads or second render.
    const id = window.setInterval(() => setAuto((v) => (v + 0.05 / 22) % 1), 50);
    return () => window.clearInterval(id);
  }, [progress, position, running, reduce, visible, pageVisible]);

  return (
    <div
      ref={ref}
      className={`relative isolate overflow-hidden rounded-[1.5rem] border bg-charcoal ${className ?? ""}`}
    >
      <img
        src={satellite}
        alt="Illustrative aerial farm view, not a live satellite feed"
        width={1280}
        height={1280}
        loading="lazy"
        className="absolute inset-0 size-full object-cover opacity-65"
        style={ndvi ? { filter: "saturate(2.4) hue-rotate(-25deg) contrast(1.3)" } : undefined}
      />
      <div
        className="absolute inset-0 bg-gradient-to-t from-background/75 via-background/10 to-background/30"
        aria-hidden
      />
      <div className="absolute inset-0 grid-lines opacity-25" aria-hidden />
      <svg
        viewBox="0 0 100 100"
        preserveAspectRatio="none"
        className="absolute inset-0 size-full"
        role="img"
        aria-label={
          position
            ? "Manual rover position in a bounded sample field"
            : `Simulated rover route, ${Math.round(t * 100)} percent complete`
        }
      >
        <rect
          x="14"
          y="16"
          width="72"
          height="68"
          rx="1"
          fill="var(--emerald)"
          fillOpacity="0.05"
          stroke="var(--emerald-glow)"
          strokeWidth="1.2"
          strokeDasharray="5 4"
          vectorEffect="non-scaling-stroke"
        />
        {!position && (
          <>
            <path
              d={d}
              fill="none"
              stroke="var(--foreground)"
              strokeOpacity="0.4"
              strokeWidth="1.5"
              strokeDasharray="3 4"
              vectorEffect="non-scaling-stroke"
            />
            <path
              d={d}
              pathLength={1}
              fill="none"
              stroke="var(--emerald-glow)"
              strokeWidth="3"
              vectorEffect="non-scaling-stroke"
              strokeDasharray="1"
              strokeDashoffset={1 - t}
              strokeLinecap="round"
            />
            {waypoints.map((p, i) => (
              <circle
                key={i}
                cx={p.x}
                cy={p.y}
                r="0.8"
                fill={i === 0 ? "var(--emerald-glow)" : "var(--background)"}
                stroke="var(--emerald-glow)"
                strokeWidth="0.5"
              />
            ))}
          </>
        )}
      </svg>
      <div
        className="pointer-events-none absolute"
        style={{
          left: `${pos.x}%`,
          top: `${pos.y}%`,
          transform: `translate(-50%,-50%) rotate(${pos.heading}deg)`,
        }}
      >
        <span className="relative flex h-5 w-7 items-center justify-center rounded-md border border-foreground/60 bg-emerald-glow text-background shadow-glow ring-4 ring-emerald-glow/20">
          <span className="ml-1 text-[10px] font-bold">▸</span>
        </span>
      </div>
      <div className="pointer-events-none absolute bottom-4 left-4 flex items-center gap-2 rounded-full border border-foreground/10 bg-background/75 px-3 py-1.5 font-mono text-[9px] uppercase tracking-[0.14em] text-foreground/75 backdrop-blur-md">
        <span className="size-1.5 rounded-full bg-emerald-glow" />
        {position ? "Manual control simulation" : "Sample coverage route"}
      </div>
      <span className="absolute bottom-4 right-4 font-mono text-[9px] text-foreground/55">N ↑</span>
    </div>
  );
}
