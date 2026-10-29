import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, Presentation, Play, X } from "lucide-react";
const stops = [
  { id: "vision", name: "The vision" },
  { id: "why", name: "The challenge" },
  { id: "ecosystem", name: "The ecosystem" },
  { id: "app-showcase", name: "Farmer app" },
  { id: "engineering", name: "Engineering lab" },
  { id: "field-demo", name: "Rover demo" },
  { id: "roadmap", name: "The roadmap" },
  { id: "collaborate", name: "Build with us" },
];
function closestStop() {
  let current = 0;
  stops.forEach((stop, i) => {
    const element = document.getElementById(stop.id);
    if (element && element.getBoundingClientRect().top <= 160) current = i;
  });
  return current;
}
export function PitchControls() {
  const [enabled, setEnabled] = useState(false);
  const [current, setCurrent] = useState(0);
  const navigate = useNavigate();
  const go = (index: number) => {
    const bounded = Math.max(0, Math.min(stops.length - 1, index));
    const section = document.getElementById(stops[bounded]!.id);
    if (section) {
      section.scrollIntoView({
        block: "start",
        behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
          ? "instant"
          : "smooth",
      });
      setCurrent(bounded);
    }
  };
  useEffect(() => {
    if (!enabled) return;
    let frame = 0;
    const scroll = () => {
      if (frame) return;
      frame = requestAnimationFrame(() => {
        frame = 0;
        setCurrent(closestStop());
      });
    };
    const key = (event: KeyboardEvent) => {
      if (event.defaultPrevented || event.altKey || event.metaKey || event.ctrlKey) return;
      if (
        (event.target instanceof Element &&
          event.target.closest(
            'input,textarea,select,[contenteditable="true"],[role="slider"],[role="tab"],[data-pitch-keys="off"],dialog',
          )) ||
        document.querySelector("dialog[open]")
      )
        return;
      if (event.key === "Escape") {
        setEnabled(false);
        return;
      }
      if (event.key === "ArrowRight" || event.key === "PageDown") {
        event.preventDefault();
        go(closestStop() + 1);
      }
      if (event.key === "ArrowLeft" || event.key === "PageUp") {
        event.preventDefault();
        go(closestStop() - 1);
      }
      if (event.shiftKey && event.key.toLowerCase() === "d") {
        event.preventDefault();
        void navigate({ to: "/dashboard" });
      }
    };
    window.addEventListener("scroll", scroll, { passive: true });
    window.addEventListener("keydown", key);
    setCurrent(closestStop());
    return () => {
      window.removeEventListener("scroll", scroll);
      window.removeEventListener("keydown", key);
      cancelAnimationFrame(frame);
    };
  }, [enabled, navigate]);
  if (!enabled)
    return (
      <button type="button" className="pitch-launcher" onClick={() => setEnabled(true)}>
        <Presentation size={15} />
        <span>Present</span>
      </button>
    );
  return (
    <aside className="pitch-controls" aria-label="Presentation controls">
      <span className="pitch-mode-tag">
        <Presentation size={14} /> PITCH MODE
      </span>
      <button
        type="button"
        onClick={() => go(current - 1)}
        disabled={current === 0}
        aria-label="Previous pitch section"
      >
        <ArrowLeft size={17} />
      </button>
      <div className="pitch-section-label" aria-live="polite">
        <span>
          {String(current + 1).padStart(2, "0")} / {String(stops.length).padStart(2, "0")}
        </span>
        <strong>{stops[current]!.name}</strong>
      </div>
      <button
        type="button"
        onClick={() => go(current + 1)}
        disabled={current === stops.length - 1}
        aria-label="Next pitch section"
      >
        <ArrowRight size={17} />
      </button>
      <button
        type="button"
        className="pitch-demo-jump"
        onClick={() => void navigate({ to: "/dashboard" })}
      >
        <Play size={13} /> Rover demo
      </button>
      <button type="button" onClick={() => setEnabled(false)} aria-label="Exit pitch mode">
        <X size={17} />
      </button>
      <small>← → sections · Shift+D demo · Esc exit</small>
    </aside>
  );
}
