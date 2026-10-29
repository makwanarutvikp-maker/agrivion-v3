/** Frontend demonstration only. These values do not describe real hardware. */
export type Point = { x: number; y: number };
export type Direction = "up" | "down" | "left" | "right";
export type SimMode = "manual" | "gps";
export type SimState = {
  mode: SimMode;
  running: boolean;
  estop: boolean;
  progress: number;
  battery: number;
  satellites: number;
  speed: number;
  manual: Point & { heading: number; steps: number };
};

export const SIM = { SPEED: 0.6, ROUTE_SECONDS: 40, DRAIN_PER_S: 0.08, MANUAL_STEP: 3 } as const;
export const initialSim = (): SimState => ({
  mode: "gps",
  running: false,
  estop: false,
  progress: 0,
  battery: 92,
  satellites: 11,
  speed: 0,
  manual: { x: 18, y: 22, heading: 0, steps: 0 },
});

export function stepSim(
  s: SimState,
  dt: number,
  rand: () => number = Math.random,
  pace = 1,
): SimState {
  if (s.battery <= 0 || s.estop)
    return s.running || s.speed ? { ...s, running: false, speed: 0 } : s;
  if (!s.running || s.mode !== "gps" || !Number.isFinite(dt) || dt <= 0) return s;
  const multiplier = Number.isFinite(pace) ? Math.max(0.5, Math.min(2, pace)) : 1;
  const elapsed = Math.min(
    dt * multiplier,
    s.battery / SIM.DRAIN_PER_S,
    (1 - s.progress) * SIM.ROUTE_SECONDS,
  );
  const progress = Math.min(1, s.progress + elapsed / SIM.ROUTE_SECONDS);
  const battery = Math.max(0, s.battery - elapsed * SIM.DRAIN_PER_S);
  const running = progress < 1 && battery > 0;
  const satellites = Math.max(
    6,
    Math.min(16, s.satellites + (rand() < 0.04 ? (rand() < 0.5 ? -1 : 1) : 0)),
  );
  return {
    ...s,
    progress,
    battery,
    satellites,
    speed: running ? SIM.SPEED * multiplier : 0,
    running,
  };
}

/** Frame-rate independent held control. Diagonals have the same speed as straight movement. */
export function driveManual(s: SimState, vector: Point, dt: number, pace = 1): SimState {
  if (s.mode !== "manual" || s.estop || s.battery <= 0 || !Number.isFinite(dt) || dt <= 0) return s;
  const length = Math.hypot(vector.x, vector.y);
  if (!Number.isFinite(length) || length === 0) return s.speed ? { ...s, speed: 0 } : s;
  const multiplier = Number.isFinite(pace) ? Math.max(0.5, Math.min(2, pace)) : 1;
  const elapsed = Math.min(dt, s.battery / (SIM.DRAIN_PER_S * multiplier));
  const distance = 11 * multiplier * elapsed;
  const x = Math.max(16, Math.min(84, s.manual.x + (vector.x / length) * distance));
  const y = Math.max(18, Math.min(82, s.manual.y + (vector.y / length) * distance));
  if (x === s.manual.x && y === s.manual.y) return s.speed ? { ...s, speed: 0 } : s;
  const targetHeading = (Math.atan2(vector.y, vector.x) * 180) / Math.PI;
  const heading =
    s.manual.heading + ((((targetHeading - s.manual.heading + 180) % 360) + 360) % 360) - 180;
  const battery = Math.max(0, s.battery - elapsed * SIM.DRAIN_PER_S * multiplier);
  return {
    ...s,
    running: false,
    battery,
    speed: battery > 0 ? SIM.SPEED * multiplier : 0,
    manual: { ...s.manual, x, y, heading },
  };
}

/** Crop lanes joined by sampled semicircles so the rover follows a smooth headland turn. */
export function coverageRoute(rows: number): Point[] {
  const count = Math.max(2, Math.min(10, Math.floor(rows)));
  const gap = 56 / (count - 1);
  const radius = Math.min(gap / 2, 5);
  const left = 18 + radius;
  const right = 82 - radius;
  const points: Point[] = [];
  for (let row = 0; row < count; row++) {
    const y = 22 + row * gap;
    const forward = row % 2 === 0;
    if (row === 0) points.push({ x: left, y });
    points.push({ x: forward ? right : left, y });
    if (row < count - 1) {
      const centreX = forward ? right : left;
      for (let step = 1; step <= 12; step++) {
        const angle = -Math.PI / 2 + (Math.PI * step) / 12;
        points.push({
          x: centreX + (forward ? 1 : -1) * radius * Math.cos(angle),
          y: y + gap / 2 + (gap / 2) * Math.sin(angle),
        });
      }
    }
  }
  return points;
}

export const pauseMission = (s: SimState): SimState => ({ ...s, running: false, speed: 0 });
export const triggerEstop = (s: SimState): SimState => ({
  ...s,
  estop: true,
  running: false,
  speed: 0,
});
export const resetEstop = (s: SimState): SimState => ({
  ...s,
  estop: false,
  running: false,
  speed: 0,
});
export const resetMission = (s: SimState): SimState => ({
  ...initialSim(),
  mode: s.mode,
  estop: s.estop,
});
export const changeMode = (s: SimState, mode: SimMode): SimState => ({
  ...s,
  mode,
  running: false,
  speed: 0,
});
export const startMission = (s: SimState): SimState =>
  s.estop || s.battery <= 0 || s.mode !== "gps"
    ? s
    : { ...s, running: true, speed: SIM.SPEED, progress: s.progress >= 1 ? 0 : s.progress };

export function moveManual(s: SimState, direction: Direction): SimState {
  if (s.estop || s.battery <= 0 || s.mode !== "manual") return s;
  const offsets = {
    up: [0, -1, -90],
    down: [0, 1, 90],
    left: [-1, 0, 180],
    right: [1, 0, 0],
  } as const;
  const [dx, dy, heading] = offsets[direction];
  const x = Math.max(16, Math.min(84, s.manual.x + dx * SIM.MANUAL_STEP));
  const y = Math.max(18, Math.min(82, s.manual.y + dy * SIM.MANUAL_STEP));
  if (x === s.manual.x && y === s.manual.y) return s;
  return {
    ...s,
    running: false,
    speed: 0,
    battery: Math.max(0, s.battery - 0.03),
    manual: { x, y, heading, steps: s.manual.steps + 1 },
  };
}

/** One distance-based route model shared by the map and waypoint readout. */
export function routePosition(
  points: Point[],
  progress: number,
): Point & { heading: number; waypoint: number } {
  if (!points.length) return { x: 50, y: 50, heading: 0, waypoint: 0 };
  if (points.length === 1) return { ...points[0]!, heading: 0, waypoint: 1 };
  const lengths = points.slice(1).map((p, i) => Math.hypot(p.x - points[i]!.x, p.y - points[i]!.y));
  const total = lengths.reduce((sum, length) => sum + length, 0);
  const target = Math.max(0, Math.min(1, progress)) * total;
  let traversed = 0;
  let heading = 0;
  for (let i = 0; i < lengths.length; i++) {
    const length = lengths[i]!;
    if (length > 0) {
      const a = points[i]!,
        b = points[i + 1]!;
      const nextAngle = (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI;
      heading =
        i === 0 ? nextAngle : heading + ((((nextAngle - heading + 180) % 360) + 360) % 360) - 180;
    }
    if (target <= traversed + length || i === lengths.length - 1) {
      const a = points[i]!,
        b = points[i + 1]!;
      const fraction = length ? (target - traversed) / length : 0;
      return {
        x: a.x + (b.x - a.x) * fraction,
        y: a.y + (b.y - a.y) * fraction,
        heading,
        waypoint: progress <= 0 ? 1 : i + 2,
      };
    }
    traversed += length;
  }
  return { ...points.at(-1)!, heading: 0, waypoint: points.length };
}
