import { useEffect, useRef, useState, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useMotionValue,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
  type MotionStyle,
} from "motion/react";
import { cn } from "@/lib/utils";
import "./motion-effects.css";

/** Decorative motion only. The normal cursor and every native interaction remain available. */
export function MotionEffects({ routeKey }: { routeKey: string }) {
  const reduce = useReducedMotion();
  const x = useMotionValue(-100);
  const y = useMotionValue(-100);
  const sx = useSpring(x, { stiffness: 420, damping: 36, mass: 0.55 });
  const sy = useSpring(y, { stiffness: 420, damping: 36, mass: 0.55 });
  const [pointer, setPointer] = useState({ visible: false, active: false, label: "" });
  const [transitionKey, setTransitionKey] = useState<string | null>(null);
  const previousRoute = useRef(routeKey);

  useEffect(() => {
    if (previousRoute.current !== routeKey) {
      setPointer({ visible: false, active: false, label: "" });
      if (!reduce) setTransitionKey(`${routeKey}-${Date.now()}`);
      previousRoute.current = routeKey;
    }
  }, [routeKey, reduce]);

  useEffect(() => {
    if (reduce) {
      setPointer({ visible: false, active: false, label: "" });
      setTransitionKey(null);
      return;
    }
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const hide = () => setPointer((p) => (p.visible ? { ...p, visible: false } : p));
    const move = (event: PointerEvent) => {
      if (!media.matches || event.pointerType !== "mouse") {
        hide();
        return;
      }
      x.set(event.clientX);
      y.set(event.clientY);
      const target = event.target instanceof Element ? event.target : null;
      const input = target?.closest(
        'input, textarea, select, [contenteditable="true"], [data-no-cursor]',
      );
      const interactive = target?.closest(
        'a, button, [role="button"], [role="tab"], [data-cursor]',
      );
      const label = interactive?.getAttribute("data-cursor") ?? "";
      const next = { visible: !input, active: Boolean(interactive), label };
      setPointer((p) =>
        p.visible === next.visible && p.active === next.active && p.label === next.label ? p : next,
      );
    };
    const onMediaChange = () => {
      if (!media.matches) hide();
    };
    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerleave", hide);
    window.addEventListener("blur", hide);
    media.addEventListener("change", onMediaChange);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerleave", hide);
      window.removeEventListener("blur", hide);
      media.removeEventListener("change", onMediaChange);
    };
  }, [reduce, x, y]);

  return (
    <>
      {!reduce && (
        <motion.div className="agrivion-pointer" style={{ x: sx, y: sy }} aria-hidden="true">
          <motion.div
            className={cn("agrivion-pointer-ring", pointer.label && "has-label")}
            animate={{
              opacity: pointer.visible ? 1 : 0,
              width: pointer.label ? 88 : pointer.active ? 54 : 26,
              height: pointer.label ? 88 : pointer.active ? 54 : 26,
              backgroundColor: pointer.label
                ? "rgba(214,237,156,.95)"
                : pointer.active
                  ? "rgba(214,237,156,.10)"
                  : "rgba(214,237,156,0)",
            }}
            transition={{ duration: 0.23 }}
          >
            {pointer.label && <span>{pointer.label}</span>}
          </motion.div>
        </motion.div>
      )}
      <AnimatePresence>
        {!reduce && transitionKey && (
          <motion.div
            key={transitionKey}
            className="agrivion-route-wipe"
            aria-hidden="true"
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{ duration: 0.65, ease: [0.76, 0, 0.24, 1] }}
            onAnimationComplete={() =>
              setTransitionKey((current) => (current === transitionKey ? null : current))
            }
          >
            <span className="agrivion-route-wipe-line" />
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

/** A headline that gains emphasis word by word as it crosses the viewport. */
export function ScrollText({ text, className }: { text: string; className?: string }) {
  const ref = useRef<HTMLHeadingElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 90%", "end 55%"] });
  const words = text.split(" ");
  return (
    <h2 ref={ref} className={cn("scroll-statement", className)} aria-label={text}>
      {words.map((word, index) => (
        <ScrollWord
          key={`${word}-${index}`}
          progress={scrollYProgress}
          start={index / words.length}
          end={(index + 1) / words.length}
          reduce={Boolean(reduce)}
        >
          {word}
          {index < words.length - 1 ? " " : ""}
        </ScrollWord>
      ))}
    </h2>
  );
}

function ScrollWord({
  children,
  progress,
  start,
  end,
  reduce,
}: {
  children: ReactNode;
  progress: MotionValue<number>;
  start: number;
  end: number;
  reduce: boolean;
}) {
  const opacity = useTransform(progress, [start, end], [0.28, 1]);
  return (
    <motion.span aria-hidden="true" style={{ opacity: reduce ? 1 : opacity }}>
      {children}
    </motion.span>
  );
}

/** Pointer spotlight and restrained tilt, suitable for a visual card or engineering panel. */
export function InteractiveCard({
  children,
  className,
  style,
}: {
  children: ReactNode;
  className?: string;
  style?: MotionStyle;
}) {
  const reduce = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const rotateX = useSpring(rx, { stiffness: 150, damping: 25 });
  const rotateY = useSpring(ry, { stiffness: 150, damping: 25 });
  return (
    <motion.div
      ref={ref}
      className={cn("interactive-card", className)}
      style={{
        ...style,
        rotateX: reduce ? 0 : rotateX,
        rotateY: reduce ? 0 : rotateY,
        transformPerspective: 1000,
      }}
      onPointerMove={(event) => {
        if (reduce || event.pointerType !== "mouse" || !ref.current) return;
        const rect = ref.current.getBoundingClientRect();
        const px = (event.clientX - rect.left) / rect.width;
        const py = (event.clientY - rect.top) / rect.height;
        rx.set((0.5 - py) * 4);
        ry.set((px - 0.5) * 4);
        ref.current.style.setProperty("--spot-x", `${px * 100}%`);
        ref.current.style.setProperty("--spot-y", `${py * 100}%`);
      }}
      onPointerLeave={() => {
        rx.set(0);
        ry.set(0);
      }}
    >
      {children}
    </motion.div>
  );
}
