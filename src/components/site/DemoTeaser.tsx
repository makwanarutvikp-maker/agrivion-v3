import { useEffect, useMemo, useRef, useState } from "react";
import { useInView, useReducedMotion } from "motion/react";
import { Pause, Play } from "lucide-react";
import { DemoFieldScene } from "./DemoFieldScene";
import { coverageRoute } from "@/lib/rover-sim";

export function DemoTeaser() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { amount: 0.25 });
  const reduce = useReducedMotion();
  const [playing, setPlaying] = useState<boolean | null>(null);
  const [progress, setProgress] = useState(0.18);
  const route = useMemo(() => coverageRoute(6), []);
  const running = visible && (playing ?? !reduce);
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
    <div ref={ref} className="v2-demo-teaser">
      <div className="v2-demo-teaser-header">
        <span>
          <i /> GPS ROUTE / DEMO PREVIEW
        </span>
        <button
          type="button"
          onClick={() => setPlaying(!running)}
          aria-label={running ? "Pause field preview" : "Play field preview"}
        >
          {running ? <Pause size={14} /> : <Play size={14} />}
        </button>
      </div>
      <DemoFieldScene
        rows={6}
        route={route}
        progress={progress}
        trail={[]}
        moving={running}
        operation="Crop scouting"
        planning={false}
        onPoint={() => {}}
      />
      <div className="v2-demo-teaser-footer">
        <span>4WD ROVER · SAMPLE FIELD</span>
        <span>{Math.round(progress * 100)}% COVERED</span>
      </div>
    </div>
  );
}
