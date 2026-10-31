import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "motion/react";
import {
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Battery,
  Check,
  Crosshair,
  Gamepad2,
  Gauge,
  Maximize2,
  Navigation,
  OctagonX,
  Pause,
  Play,
  RotateCcw,
  Route as RouteIcon,
  Satellite,
  ScanLine,
  Droplets,
  Shovel,
  Undo2,
  X,
} from "lucide-react";
import { DemoFieldScene } from "@/components/site/DemoFieldScene";
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
  type Direction,
  type Point,
} from "@/lib/rover-sim";
import "@/components/site/rover-demo.css";

export const Route = createFileRoute("/dashboard")({
  head: () => ({
    meta: [
      { title: "Rover Simulator | Agrivion" },
      {
        name: "description",
        content:
          "Try Agrivion's manual rover controls and GPS route planning in a browser simulation. No hardware is connected.",
      },
    ],
  }),
  component: Dashboard,
});

const FIELDS = [
  { id: "a", name: "Plot A", rows: 6 },
  { id: "b", name: "Plot B", rows: 8 },
  { id: "c", name: "Plot C", rows: 4 },
];
const TASKS = [
  { name: "Crop scouting", label: "Scout", icon: ScanLine },
  { name: "Spraying", label: "Spray", icon: Droplets },
  { name: "Inter-row", label: "Cultivate", icon: Shovel },
];
const KEY_DIRECTION: Record<string, Direction> = {
  ArrowUp: "up",
  ArrowDown: "down",
  ArrowLeft: "left",
  ArrowRight: "right",
  w: "up",
  s: "down",
  a: "left",
  d: "right",
};
const VECTORS: Record<Direction, Point> = {
  up: { x: 0, y: -1 },
  down: { x: 0, y: 1 },
  left: { x: -1, y: 0 },
  right: { x: 1, y: 0 },
};

function Dashboard() {
  const [field, setField] = useState(FIELDS[0]!);
  const [operation, setOperation] = useState("Crop scouting");
  const [sim, setSim] = useState(() => changeMode(initialSim(), "manual"));
  const [pace, setPace] = useState(1);
  const [routeType, setRouteType] = useState<"coverage" | "custom">("coverage");
  const [customPoints, setCustomPoints] = useState<Point[]>([]);
  const [pointX, setPointX] = useState("50");
  const [pointY, setPointY] = useState("50");
  const [trail, setTrail] = useState<Point[]>([]);
  const [held, setHeld] = useState<Direction[]>([]);
  const [visible, setVisible] = useState(true);
  const [fullscreen, setFullscreen] = useState(false);
  const [fullscreenNotice, setFullscreenNotice] = useState("");
  const keys = useRef(new Map<string, Direction>());
  const pointerDirection = useRef<Direction | null>(null);
  const deck = useRef<HTMLDivElement>(null);
  const currentControls = useRef<Direction[]>([]);
  const wps = useMemo(
    () => (routeType === "custom" ? customPoints : coverageRoute(field.rows)),
    [routeType, customPoints, field.rows],
  );
  const pos = sim.mode === "manual" ? sim.manual : routePosition(wps, sim.progress);
  const locked = sim.estop || sim.battery <= 0;
  const moving = !locked && (sim.mode === "manual" ? sim.speed > 0 : sim.running && visible);
  const percent = Math.round(sim.progress * 100);
  const status = sim.estop
    ? "Emergency stop engaged"
    : sim.battery <= 0
      ? "Battery depleted — reset to recharge"
      : sim.mode === "manual"
        ? moving
          ? "Manual drive active"
          : "Ready to drive"
        : sim.running
          ? "Following planned route"
          : sim.progress >= 1
            ? "Mission complete"
            : sim.progress > 0
              ? "Mission paused"
              : "Ready to start route";

  const syncControls = () => {
    const directions = [
      ...keys.current.values(),
      ...(pointerDirection.current ? [pointerDirection.current] : []),
    ];
    currentControls.current = directions;
    setHeld(directions);
    if (directions.length === 0)
      setSim((s) => (s.mode === "manual" && s.speed ? { ...s, speed: 0 } : s));
  };
  const releaseControls = () => {
    keys.current.clear();
    pointerDirection.current = null;
    currentControls.current = [];
    setHeld([]);
    setSim((s) => (s.mode === "manual" && s.speed ? { ...s, speed: 0 } : s));
  };
  const beginDrive = (direction: Direction) => {
    pointerDirection.current = direction;
    syncControls();
    setSim((s) => driveManual(s, VECTORS[direction], 0.08, pace));
  };
  const endDrive = () => {
    pointerDirection.current = null;
    syncControls();
    setSim((s) => ({ ...s, speed: 0 }));
  };
  const driveProps = {
    held,
    locked,
    estop: sim.estop,
    onStart: beginDrive,
    onRelease: endDrive,
    onNudge: (direction: Direction) => setSim((s) => moveManual(s, direction)),
    onStop: () => {
      releaseControls();
      setSim(triggerEstop);
    },
  };

  useEffect(() => {
    if (!deck.current) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry!.isIntersecting), {
      threshold: 0.08,
    });
    observer.observe(deck.current);
    const onBlur = () => {
      releaseControls();
      setSim(pauseMission);
    };
    const onHidden = () => {
      if (document.hidden) onBlur();
    };
    const onKeyUp = (event: KeyboardEvent) => {
      keys.current.delete(event.key.toLowerCase());
      keys.current.delete(event.key);
      syncControls();
    };
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        releaseControls();
        setSim(triggerEstop);
      }
    };
    const onFullscreen = () => setFullscreen(document.fullscreenElement === deck.current);
    window.addEventListener("blur", onBlur);
    window.addEventListener("keyup", onKeyUp);
    window.addEventListener("keydown", onEscape);
    document.addEventListener("visibilitychange", onHidden);
    document.addEventListener("fullscreenchange", onFullscreen);
    return () => {
      observer.disconnect();
      window.removeEventListener("blur", onBlur);
      window.removeEventListener("keyup", onKeyUp);
      window.removeEventListener("keydown", onEscape);
      document.removeEventListener("visibilitychange", onHidden);
      document.removeEventListener("fullscreenchange", onFullscreen);
    };
  }, []);

  useEffect(() => {
    if (!visible) {
      releaseControls();
      setSim(pauseMission);
    }
  }, [visible]);
  useEffect(() => {
    if (!visible || locked || (sim.mode === "gps" ? !sim.running : held.length === 0)) return;
    let frame = 0;
    let previous = performance.now();
    const update = (now: number) => {
      const dt = Math.min((now - previous) / 1000, 0.05);
      previous = now;
      if (!document.hidden)
        setSim((s) => {
          if (s.mode === "gps") return stepSim(s, dt, () => 0.99, pace);
          const input = currentControls.current;
          return driveManual(
            s,
            {
              x: Number(input.includes("right")) - Number(input.includes("left")),
              y: Number(input.includes("down")) - Number(input.includes("up")),
            },
            dt,
            pace,
          );
        });
      frame = requestAnimationFrame(update);
    };
    frame = requestAnimationFrame(update);
    return () => cancelAnimationFrame(frame);
  }, [visible, locked, sim.mode, sim.running, held.length, pace]);

  useEffect(() => {
    if (sim.mode !== "manual") return;
    setTrail((points) => {
      const last = points.at(-1);
      if (last && Math.hypot(last.x - sim.manual.x, last.y - sim.manual.y) < 0.65) return points;
      return [...points.slice(-180), { x: sim.manual.x, y: sim.manual.y }];
    });
  }, [sim.mode, sim.manual.x, sim.manual.y]);

  const reset = () => {
    releaseControls();
    setTrail([]);
    setSim(resetMission);
  };
  const addPoint = (point: Point) => {
    if (sim.running || sim.estop || customPoints.length >= 12) return;
    setCustomPoints((points) => [...points, point]);
    setSim(resetMission);
  };

  return (
    <div className="field-lab">
      <div className="field-lab-intro">
        <div>
          <p className="eyebrow">Product preview</p>
          <h1>Rover simulator</h1>
          <p className="field-lab-description">
            Try the controls and explore GPS route planning in a sample field.
          </p>
        </div>
        <div className="field-lab-intro-copy">
          <span className="demo-live-label">Browser simulation</span>
          <p>No hardware connected. Rover capabilities are in development and testing.</p>
        </div>
      </div>
      <ol className="demo-quick-start" aria-label="How to use the simulator">
        <li>
          <span>1</span>Choose manual or GPS mode
        </li>
        <li>
          <span>2</span>Drive with arrows or start a route
        </li>
        <li>
          <span>3</span>Pause or stop at any time
        </li>
      </ol>
      <div
        ref={deck}
        id="control-deck"
        tabIndex={0}
        className="command-deck"
        data-mode={sim.mode}
        onKeyDown={(event) => {
          if (
            sim.mode !== "manual" ||
            locked ||
            /INPUT|SELECT|TEXTAREA/.test((event.target as HTMLElement).tagName)
          )
            return;
          const direction = KEY_DIRECTION[event.key] ?? KEY_DIRECTION[event.key.toLowerCase()];
          if (direction) {
            event.preventDefault();
            keys.current.set(
              event.key.length === 1 ? event.key.toLowerCase() : event.key,
              direction,
            );
            syncControls();
          }
        }}
        onBlur={(event) => {
          if (!event.currentTarget.contains(event.relatedTarget as Node | null)) releaseControls();
        }}
      >
        <div className="deck-toolbar">
          <div className="deck-brand">
            <span className="deck-icon">
              <Navigation size={18} />
            </span>
            <span>
              Field preview <small>Interactive rover simulation</small>
            </span>
          </div>
          <div className="deck-toolbar-actions">
            <span className="demo-live-label">Simulated data</span>
            <button
              title={fullscreen ? "Exit fullscreen" : "Open fullscreen"}
              aria-label={fullscreen ? "Exit fullscreen" : "Open fullscreen"}
              onClick={() => {
                if (document.fullscreenElement) void document.exitFullscreen();
                else if (deck.current?.requestFullscreen)
                  void deck.current
                    .requestFullscreen()
                    .catch(() =>
                      setFullscreenNotice(
                        "Fullscreen is unavailable in this browser. The complete demo is available below.",
                      ),
                    );
                else
                  setFullscreenNotice(
                    "Fullscreen is unavailable in this browser. The complete demo is available below.",
                  );
              }}
            >
              {fullscreen ? <X size={17} /> : <Maximize2 size={17} />}
            </button>
          </div>
        </div>
        {fullscreenNotice && (
          <p className="demo-notice" role="status">
            {fullscreenNotice}
          </p>
        )}
        <div className="deck-content">
          <div className="deck-field">
            <div className="demo-mode-switch" role="group" aria-label="Rover operating mode">
              {(["manual", "gps"] as const).map((mode) => (
                <button
                  key={mode}
                  aria-pressed={sim.mode === mode}
                  onClick={() => {
                    releaseControls();
                    setSim((s) => changeMode(s, mode));
                  }}
                >
                  {sim.mode === mode && (
                    <motion.span
                      layoutId="rover-mode-highlight"
                      className="demo-mode-highlight"
                      transition={{ type: "spring", stiffness: 420, damping: 35 }}
                    />
                  )}
                  <span>
                    {mode === "manual" ? <Gamepad2 size={17} /> : <RouteIcon size={17} />}{" "}
                    {mode === "manual" ? "Manual control" : "GPS route"}
                  </span>
                </button>
              ))}
            </div>
            <div
              className="field-viewport"
              onPointerDown={() => {
                if (sim.mode === "manual") deck.current?.focus({ preventScroll: true });
              }}
            >
              <DemoFieldScene
                rows={field.rows}
                route={wps}
                progress={sim.progress}
                position={sim.mode === "manual" ? sim.manual : undefined}
                trail={trail}
                moving={moving}
                operation={operation}
                planning={sim.mode === "gps" && routeType === "custom" && !sim.running && !locked}
                onPoint={addPoint}
              />
              <div className="field-overlay-top">
                <span>
                  <i className={moving ? "is-active" : ""} /> {field.name.toUpperCase()} /{" "}
                  {field.rows} LANES
                </span>
                <span>{sim.mode === "manual" ? "Manual control" : "GPS route"}</span>
              </div>
              <div className="field-overlay-bottom">
                <span>
                  <Crosshair size={13} /> X {pos.x.toFixed(1)} <b>/</b> Y {pos.y.toFixed(1)}
                </span>
                <span>
                  {sim.mode === "manual"
                    ? "Arrow keys / WASD"
                    : routeType === "custom"
                      ? `${customPoints.length} / 12 WAYPOINTS`
                      : `${percent}% COMPLETE`}
                </span>
              </div>
              {sim.estop && (
                <div className="demo-stop-overlay">
                  <OctagonX size={38} />
                  <h3>Motion stopped.</h3>
                  <p>The emergency stop is engaged.</p>
                  <button onClick={() => setSim(resetEstop)}>
                    Reset emergency stop <RotateCcw size={14} />
                  </button>
                </div>
              )}
              {sim.mode === "gps" && sim.progress >= 1 && !sim.estop && (
                <div className="mission-complete">
                  <Check size={18} />
                  <span>Mission complete. Every planned point reached.</span>
                </div>
              )}
            </div>
            <div className="deck-telemetry">
              <Metric
                icon={Gauge}
                label="Speed"
                value={moving ? `${sim.speed.toFixed(1)}` : "0.0"}
                unit="m/s"
              />
              <Metric icon={Battery} label="Battery" value={sim.battery.toFixed(0)} unit="%" />
              <Metric icon={Satellite} label="GPS satellites" value="11" unit="sats" />
              <Metric
                icon={Crosshair}
                label={sim.mode === "manual" ? "Heading" : "Route progress"}
                value={
                  sim.mode === "manual"
                    ? String(Math.round(((pos.heading % 360) + 360) % 360))
                    : String(percent)
                }
                unit={sim.mode === "manual" ? "°" : "%"}
              />
            </div>
            {sim.mode === "manual" && (
              <div className="mobile-drive-controls">
                <div>
                  <span>Manual controls</span>
                  <p>
                    Hold to drive.
                    <br />
                    Release to stop.
                  </p>
                  <small>Or use the arrow keys.</small>
                </div>
                <DrivePad {...driveProps} />
              </div>
            )}
            <div className="demo-status">
              <span aria-live="polite">
                <i className={sim.estop ? "is-stop" : ""} />
                {status}
              </span>
              <span>Simulation only</span>
            </div>
          </div>
          <aside className="deck-controls">
            <div className="control-title">
              <h2>{sim.mode === "manual" ? "Drive the rover" : "Plan a GPS route"}</h2>
              <p>
                {sim.mode === "manual"
                  ? "Hold an arrow to move. Release to stop. You can also select the field and use your keyboard."
                  : "Choose a sample field, then start the route. Select custom points to draw your own path."}
              </p>
            </div>
            {sim.mode === "manual" ? (
              <div className="desktop-drive-controls">
                <DrivePad {...driveProps} />
                <p className="drive-hint">
                  Hold to move <span>·</span> Release to stop
                </p>
              </div>
            ) : (
              <div className="gps-options">
                <div className="route-type-switch" role="group" aria-label="Route planning method">
                  {(["coverage", "custom"] as const).map((type) => (
                    <button
                      key={type}
                      disabled={sim.running}
                      aria-pressed={routeType === type}
                      onClick={() => {
                        setRouteType(type);
                        reset();
                      }}
                    >
                      {type === "coverage" ? "Follow crop rows" : "Custom points"}
                    </button>
                  ))}
                </div>
                <label className="demo-field-select">
                  Sample field
                  <select
                    aria-label="Sample field"
                    value={field.id}
                    disabled={sim.running}
                    onChange={(event) => {
                      setField(FIELDS.find((f) => f.id === event.target.value)!);
                      reset();
                    }}
                  >
                    {FIELDS.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} — {f.rows} crop lanes
                      </option>
                    ))}
                  </select>
                </label>
                {routeType === "custom" && (
                  <div className="waypoint-editor">
                    <p>Click the field to add 2–12 points. The rover will follow them in order.</p>
                    <details className="coordinate-settings">
                      <summary>Enter coordinates instead</summary>
                      <div>
                        <label>
                          X
                          <input
                            type="number"
                            min="16"
                            max="84"
                            value={pointX}
                            onChange={(event) => setPointX(event.target.value)}
                            disabled={sim.running}
                          />
                        </label>
                        <label>
                          Y
                          <input
                            type="number"
                            min="18"
                            max="82"
                            value={pointY}
                            onChange={(event) => setPointY(event.target.value)}
                            disabled={sim.running}
                          />
                        </label>
                        <button
                          disabled={
                            sim.running ||
                            locked ||
                            customPoints.length >= 12 ||
                            pointX === "" ||
                            pointY === "" ||
                            !Number.isFinite(Number(pointX)) ||
                            !Number.isFinite(Number(pointY)) ||
                            +pointX < 16 ||
                            +pointX > 84 ||
                            +pointY < 18 ||
                            +pointY > 82
                          }
                          onClick={() => addPoint({ x: +pointX, y: +pointY })}
                        >
                          Add
                        </button>
                      </div>
                    </details>
                    <button
                      className="undo-waypoint"
                      disabled={sim.running || !customPoints.length}
                      onClick={() => {
                        setCustomPoints((points) => points.slice(0, -1));
                        setSim(resetMission);
                      }}
                    >
                      <Undo2 size={14} /> Remove last point
                    </button>
                  </div>
                )}
                <div className="mission-progress">
                  <span>
                    Route progress <b>{percent}%</b>
                  </span>
                  <div>
                    <div style={{ width: `${percent}%` }} />
                  </div>
                </div>
                <button
                  className="mission-launch"
                  disabled={locked || wps.length < 2}
                  onClick={() => setSim(sim.running ? pauseMission : startMission)}
                >
                  {sim.running ? <Pause size={17} /> : <Play size={17} />}
                  {sim.running
                    ? "Pause route"
                    : sim.progress >= 1
                      ? "Run route again"
                      : sim.progress > 0
                        ? "Resume route"
                        : "Start route"}
                </button>
                {wps.length < 2 && (
                  <p className="route-help">Add at least two waypoints to start.</p>
                )}
              </div>
            )}
            <details className="demo-settings">
              <summary>More simulation options</summary>
              <div className="demo-operation">
                <span className="control-label">Field operation</span>
                <div role="group" aria-label="Planned operation">
                  {TASKS.map((task) => (
                    <button
                      key={task.name}
                      aria-pressed={operation === task.name}
                      onClick={() => setOperation(task.name)}
                    >
                      <task.icon size={17} />
                      {task.label}
                    </button>
                  ))}
                </div>
              </div>
              <div className="demo-pace">
                <span className="control-label">Simulation speed</span>
                <div role="group" aria-label="Demo speed">
                  {[0.5, 1, 2].map((speed) => (
                    <button
                      key={speed}
                      aria-pressed={pace === speed}
                      onClick={() => setPace(speed)}
                    >
                      {speed}×
                    </button>
                  ))}
                </div>
              </div>
            </details>
            <div className="deck-safety">
              <button
                onClick={() => {
                  releaseControls();
                  setSim(sim.estop ? resetEstop : triggerEstop);
                }}
                aria-pressed={sim.estop}
              >
                <OctagonX size={16} />
                {sim.estop ? "Release stop" : "Emergency stop"}
              </button>
              <button aria-label="Reset simulation" title="Reset simulation" onClick={reset}>
                <RotateCcw size={16} /> Reset
              </button>
            </div>
            <p className="keyboard-note">
              <kbd>esc</kbd> emergency stop
            </p>
          </aside>
        </div>
      </div>
      <p className="demo-footnote">
        Movement, battery, GPS and speed values are illustrative. This preview does not control a
        real rover.
      </p>
      <div className="demo-explain-grid">
        <article>
          <h2>Manual control</h2>
          <p>
            Hold the direction buttons or use arrow keys after selecting the field. Release the
            controls to stop. The rover stays inside the sample field.
          </p>
        </article>
        <article>
          <h2>GPS routes</h2>
          <p>
            Follow the crop rows or click the field to create your own route. You can pause, resume
            or reset the simulation.
          </p>
        </article>
        <article>
          <h2>Development status</h2>
          <p>
            Navigation accuracy, implement performance and safety will be tested through supervised
            trials.
          </p>
          <Link to="/technology">
            Learn about the technology <ArrowRight size={15} />
          </Link>
        </article>
      </div>
    </div>
  );
}

function DrivePad({
  held,
  locked,
  estop,
  onStart,
  onRelease,
  onNudge,
  onStop,
}: {
  held: Direction[];
  locked: boolean;
  estop: boolean;
  onStart: (direction: Direction) => void;
  onRelease: () => void;
  onNudge: (direction: Direction) => void;
  onStop: () => void;
}) {
  const button = (direction: Direction, icon: typeof ArrowUp) => (
    <DirectionButton
      direction={direction}
      icon={icon}
      pressed={held.includes(direction)}
      disabled={locked}
      onStart={onStart}
      onRelease={onRelease}
      onNudge={onNudge}
    />
  );
  return (
    <div className="drive-pad" role="group" aria-label="Manual rover directional controls">
      <span />
      {button("up", ArrowUp)}
      <span />
      {button("left", ArrowLeft)}
      <button
        className="drive-stop"
        aria-label="Emergency stop manual rover"
        onClick={onStop}
        disabled={estop}
      >
        <OctagonX size={22} />
        <small>STOP</small>
      </button>
      {button("right", ArrowRight)}
      <span />
      {button("down", ArrowDown)}
      <span />
    </div>
  );
}

function DirectionButton({
  direction,
  icon: Icon,
  pressed,
  disabled,
  onStart,
  onRelease,
  onNudge,
}: {
  direction: Direction;
  icon: typeof ArrowUp;
  pressed: boolean;
  disabled: boolean;
  onStart: (direction: Direction) => void;
  onRelease: () => void;
  onNudge: (direction: Direction) => void;
}) {
  return (
    <button
      aria-label={`Move rover ${direction}`}
      disabled={disabled}
      className={pressed ? "is-held" : ""}
      onPointerDown={(event) => {
        event.preventDefault();
        event.currentTarget.setPointerCapture(event.pointerId);
        onStart(direction);
      }}
      onPointerUp={onRelease}
      onPointerCancel={onRelease}
      onLostPointerCapture={onRelease}
      onClick={(event) => {
        if (event.detail === 0) onNudge(direction);
      }}
    >
      <Icon size={23} />
    </button>
  );
}
function Metric({
  icon: Icon,
  label,
  value,
  unit,
}: {
  icon: typeof Battery;
  label: string;
  value: string;
  unit: string;
}) {
  return (
    <div className="deck-metric">
      <span>
        <Icon size={12} />
        {label}
      </span>
      <strong>
        {value}
        <small>{unit}</small>
      </strong>
    </div>
  );
}
