import { describe, it, expect } from "vitest";
import {
  changeMode,
  coverageRoute,
  driveManual,
  initialSim,
  moveManual,
  pauseMission,
  resetEstop,
  resetMission,
  routePosition,
  startMission,
  stepSim,
  triggerEstop,
} from "./rover-sim";

const noRand = () => 0.99;

describe("GPS mission simulation", () => {
  it("emergency stop halts movement immediately and remains latched through a mission reset", () => {
    const running = stepSim(startMission(initialSim()), 1, noRand);
    const stopped = stepSim(triggerEstop(running), 5, noRand);
    expect(stopped.speed).toBe(0);
    expect(stopped.running).toBe(false);
    expect(stopped.progress).toBe(running.progress);
    expect(startMission(resetMission(stopped)).running).toBe(false);
    expect(startMission(resetEstop(stopped)).running).toBe(true);
  });

  it("pause holds position and battery, and resume continues from that point", () => {
    const running = stepSim(startMission(initialSim()), 10, noRand);
    const paused = pauseMission(running);
    expect(stepSim(paused, 10, noRand)).toBe(paused);
    expect(paused.speed).toBe(0);
    expect(stepSim(startMission(paused), 10, noRand).progress).toBeCloseTo(0.5);
  });

  it("completes a route exactly once, stops, and can explicitly run again", () => {
    const completed = stepSim(startMission(initialSim()), 100, noRand);
    expect(completed.progress).toBe(1);
    expect(completed.running).toBe(false);
    expect(completed.speed).toBe(0);
    expect(completed.battery).toBeCloseTo(88.8);
    expect(startMission(completed).progress).toBe(0);
  });

  it("stops at battery depletion and refuses to restart with an empty battery", () => {
    const depleted = stepSim(startMission({ ...initialSim(), battery: 0.04 }), 10, noRand);
    expect(depleted.battery).toBe(0);
    expect(depleted.progress).toBeCloseTo(0.0125);
    expect(depleted.running).toBe(false);
    expect(depleted.speed).toBe(0);
    expect(startMission(depleted)).toBe(depleted);
  });

  it("ignores invalid elapsed time and does not run a GPS mission in manual mode", () => {
    const running = startMission(initialSim());
    expect(stepSim(running, -2)).toBe(running);
    expect(stepSim(running, Number.NaN)).toBe(running);
    const manual = changeMode(running, "manual");
    expect(manual.running).toBe(false);
    expect(manual.speed).toBe(0);
    expect(startMission(manual)).toBe(manual);
  });
});

describe("manual controls", () => {
  it("moves the same distance at different frame rates and normalizes diagonal input", () => {
    const start = changeMode(initialSim(), "manual");
    let sixty = start,
      thirty = start;
    for (let i = 0; i < 60; i++) sixty = driveManual(sixty, { x: 1, y: 0 }, 1 / 60);
    for (let i = 0; i < 30; i++) thirty = driveManual(thirty, { x: 1, y: 0 }, 1 / 30);
    expect(sixty.manual.x).toBeCloseTo(thirty.manual.x, 9);
    expect(sixty.battery).toBeCloseTo(thirty.battery, 9);
    const diagonal = driveManual(start, { x: 1, y: 1 }, 1);
    expect(
      Math.hypot(diagonal.manual.x - start.manual.x, diagonal.manual.y - start.manual.y),
    ).toBeCloseTo(sixty.manual.x - start.manual.x);
  });

  it("stops continuously driven movement on release, at the boundary, and during E-stop", () => {
    const start = changeMode(initialSim(), "manual");
    const moving = driveManual(start, { x: 1, y: 0 }, 1);
    expect(moving.speed).toBeGreaterThan(0);
    const released = driveManual(moving, { x: 0, y: 0 }, 1);
    expect(released.speed).toBe(0);
    expect(released.manual).toEqual(moving.manual);
    const stopped = triggerEstop(moving);
    expect(driveManual(stopped, { x: 1, y: 0 }, 10)).toBe(stopped);
    const edge = driveManual(start, { x: 1, y: 0 }, 20);
    expect(edge.manual.x).toBe(84);
    expect(driveManual(edge, { x: 1, y: 0 }, 1).speed).toBe(0);
  });

  it("caps movement by remaining battery and ignores invalid manual input", () => {
    const start = changeMode(initialSim(), "manual");
    const depleted = driveManual({ ...start, battery: 0.04 }, { x: 1, y: 0 }, 10);
    expect(depleted.battery).toBe(0);
    expect(depleted.speed).toBe(0);
    expect(depleted.manual.x).toBeCloseTo(23.5);
    expect(driveManual(start, { x: Number.NaN, y: 0 }, 1)).toBe(start);
    expect(driveManual(start, { x: 1, y: 0 }, -1)).toBe(start);
  });
  it("moves in the requested direction and clamps to the field boundary", () => {
    let state = changeMode(initialSim(), "manual");
    state = moveManual(state, "right");
    expect(state.manual.x).toBe(21);
    expect(state.manual.y).toBe(22);
    for (let i = 0; i < 100; i++) state = moveManual(state, "up");
    expect(state.manual.y).toBe(18);
    expect(state.manual.heading).toBe(-90);
    const atBoundary = state;
    expect(moveManual(atBoundary, "up")).toBe(atBoundary);
  });

  it("locks manual movement during emergency stop and resets without automatically unlocking", () => {
    const stopped = triggerEstop(changeMode(initialSim(), "manual"));
    expect(moveManual(stopped, "right")).toBe(stopped);
    const reset = resetMission(stopped);
    expect(reset.mode).toBe("manual");
    expect(reset.estop).toBe(true);
    expect(reset.manual.steps).toBe(0);
    expect(moveManual(resetEstop(reset), "right").manual.x).toBe(21);
  });
});

describe("distance-based route readout", () => {
  it("generates curved coverage routes inside the field and visits every lane", () => {
    for (const rows of [4, 6, 8]) {
      const route = coverageRoute(rows);
      expect(
        route.every((p) => p.x >= 18 - 1e-8 && p.x <= 82 + 1e-8 && p.y >= 22 && p.y <= 78),
      ).toBe(true);
      expect(route[0]!.y).toBe(22);
      expect(route.at(-1)!.y).toBe(78);
      expect(route.length).toBeGreaterThan(rows * 2);
    }
  });

  it("unwraps route headings across the 180-degree boundary", () => {
    const route = [
      { x: 80, y: 40 },
      { x: 50, y: 41 },
      { x: 20, y: 40 },
    ];
    const before = routePosition(route, 0.49).heading;
    const after = routePosition(route, 0.51).heading;
    expect(Math.abs(after - before)).toBeLessThan(5);
    expect(after).toBeGreaterThan(180);
  });
  const points = [
    { x: 0, y: 0 },
    { x: 100, y: 0 },
    { x: 100, y: 10 },
  ];
  it("keeps the waypoint and marker on the same unequal-length route segment", () => {
    const halfway = routePosition(points, 0.5);
    expect(halfway.x).toBeCloseTo(55);
    expect(halfway.y).toBe(0);
    expect(halfway.waypoint).toBe(2);
    const turning = routePosition(points, 0.95);
    expect(turning.x).toBe(100);
    expect(turning.y).toBeCloseTo(4.5);
    expect(turning.waypoint).toBe(3);
    expect(turning.heading).toBe(90);
  });

  it("preserves the final route heading and handles empty or single-point routes", () => {
    expect(routePosition(points, 1)).toEqual({ x: 100, y: 10, heading: 90, waypoint: 3 });
    expect(routePosition([], 0).waypoint).toBe(0);
    expect(routePosition([{ x: 4, y: 7 }], 1)).toEqual({ x: 4, y: 7, heading: 0, waypoint: 1 });
  });
});
