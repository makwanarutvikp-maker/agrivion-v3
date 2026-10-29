import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Pause, Play, OctagonX, RotateCcw } from "lucide-react";
import { DemoFieldScene } from "./DemoFieldScene";
import { coverageRoute } from "@/lib/rover-sim";

export function DemoTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.25 });
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0.18);
  const [rows, setRows] = useState(6);
  const [halted, setHalted] = useState(false);
  const route = useMemo(() => coverageRoute(rows), [rows]);
  const running = visible && !halted && (playing ?? !reduce);
  useEffect(() => {
    if (!running) return;
    let frame = 0;
    let last = performance.now();
    const tick = (now: number) => {
      const elapsed = Math.min(now - last, 50);
      last = now;
      if (!document.hidden) setProgress((p) => (p + elapsed / 45000) % 1);
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [running]);
  return (
    <div ref={ref} className={`v2-demo-teaser ${halted ? "is-halted" : ""}`}>
      <div className="v2-demo-teaser-header">
        <span>
          <i /> GPS ROUTE / DEMO PREVIEW
        </span>
        <button
          type="button"
          disabled={halted}
          onClick={() => setPlaying(!running)}
          aria-label={running ? "Pause field preview" : "Play field preview"}
        >
          {running ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>
      <DemoFieldScene
        rows={rows}
        route={route}
        progress={progress}
        trail={[]}
        moving={running}
        operation="Crop scouting"
        planning={false}
        onPoint={() => {}}
      />
      <div className="teaser-controls">
        <div>
          <label htmlFor="preview-lanes">
            Sample crop lanes <strong>{rows}</strong>
          </label>
          <input
            id="preview-lanes"
            type="range"
            min={4}
            max={8}
            step={2}
            value={rows}
            onChange={(event) => {
              setRows(Number(event.target.value));
              setProgress(0);
            }}
          />
        </div>
        <button
          type="button"
          className="teaser-stop"
          onClick={() => {
            if (halted) {
              setHalted(false);
            } else {
              setHalted(true);
              setPlaying(false);
            }
          }}
        >
          {halted ? <RotateCcw size={12} /> : <OctagonX size={12} />}
          {halted ? "Reset stop" : "Emergency stop"}
        </button>
      </div>
      <div className="v2-demo-teaser-footer">
        <span>{halted ? "STOP ENGAGED · RESET TO CONTINUE" : "4WD ROVER · SAMPLE FIELD"}</span>
        <span>{Math.round(progress * 100)}% COVERED</span>
      </div>
    </div>
  );
}
