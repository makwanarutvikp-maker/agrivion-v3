import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from "react";
import { ClientOnly } from "@tanstack/react-router";
import { useReducedMotion } from "motion/react";

const Rover3D = lazy(() => import("./Rover3D"));

function Fallback({ loading = false }: { loading?: boolean }) {
  return (
    <div className="relative flex size-full min-h-[280px] flex-col items-center justify-center overflow-hidden bg-charcoal">
      <div className="absolute inset-0 grid-lines opacity-25" aria-hidden />
      <svg
        viewBox="0 0 360 230"
        className="relative w-72 max-w-[80%] text-emerald-glow"
        role="img"
        aria-label="Stylised Agrivion four-wheel rover concept illustration"
      >
        <ellipse cx="180" cy="187" rx="125" ry="14" fill="currentColor" opacity=".08" />
        <path
          d="M79 145 184 105 280 137 177 179Z"
          fill="#263b30"
          stroke="currentColor"
          strokeOpacity=".5"
        />
        <path d="M98 107 191 73 259 97 168 132Z" fill="#e0e6d4" />
        <path d="M98 107 168 132 168 160 98 135Z" fill="#a4b29a" />
        <path d="M168 132 259 97 259 125 168 160Z" fill="#405447" />
        <path d="M108 115 154 132" stroke="currentColor" strokeWidth="5" />
        <g fill="#121a17" stroke="#647b68" strokeWidth="3">
          <ellipse cx="97" cy="153" rx="19" ry="26" />
          <ellipse cx="173" cy="179" rx="19" ry="26" />
          <ellipse cx="255" cy="149" rx="18" ry="25" />
          <ellipse cx="177" cy="123" rx="17" ry="23" />
        </g>
        <g fill="none" stroke="currentColor" strokeWidth="2">
          <ellipse cx="97" cy="153" rx="8" ry="12" />
          <ellipse cx="173" cy="179" rx="8" ry="12" />
          <ellipse cx="255" cy="149" rx="7" ry="11" />
        </g>
        <path d="M203 93V43" stroke="#a4b29a" strokeWidth="4" />
        <ellipse cx="203" cy="42" rx="16" ry="5" fill="currentColor" />
      </svg>
      <p className="relative mt-2 font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
        {loading ? "Preparing interactive view" : "Concept illustration"}
      </p>
      {!loading && (
        <p className="relative mt-2 max-w-xs px-5 text-center text-xs text-muted-foreground">
          A visual concept of the platform. Actual design is shown in the project gallery.
        </p>
      )}
    </div>
  );
}

class SceneBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  override state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  override render() {
    return this.state.failed ? <Fallback /> : this.props.children;
  }
}

export function RoverStage({ className }: { className?: string }) {
  const reduce = useReducedMotion() ?? false;
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(true);
  const [visited, setVisited] = useState(false);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry!.isIntersecting);
        if (entry!.isIntersecting) setVisited(true);
      },
      { rootMargin: "120px", threshold: 0 },
    );
    observer.observe(ref.current);
    const onVisibility = () => setPageVisible(!document.hidden);
    onVisibility();
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, []);
  return (
    <div ref={ref} className={className}>
      <SceneBoundary>
        <ClientOnly fallback={<Fallback loading />}>
          {visited ? (
            <Suspense fallback={<Fallback loading />}>
              <Rover3D reduce={reduce} active={visible && pageVisible} fallback={<Fallback />} />
            </Suspense>
          ) : (
            <Fallback loading />
          )}
        </ClientOnly>
      </SceneBoundary>
    </div>
  );
}
