import { useEffect, useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useReducedMotion, useInView } from "motion/react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";

export type Status = "prototype" | "proposed" | "roadmap" | "simulated";

const statusMap: Record<Status, { label: string; cls: string }> = {
  prototype: {
    label: "Building & testing",
    cls: "border-emerald/40 text-emerald-glow bg-emerald/10",
  },
  proposed: {
    label: "Proposed capability",
    cls: "border-proposed/40 text-proposed bg-proposed/10",
  },
  roadmap: { label: "Future roadmap", cls: "border-warning/40 text-warning bg-warning/10" },
  simulated: { label: "Simulated demo data", cls: "border-warning/50 text-warning bg-warning/10" },
};

export function StatusTag({ status, className }: { status: Status; className?: string }) {
  const s = statusMap[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-[10px] uppercase tracking-[0.14em]",
        s.cls,
        className,
      )}
    >
      <span className="size-1.5 rounded-full bg-current" aria-hidden />
      {s.label}
    </span>
  );
}

export function Magnetic({
  children,
  className,
  strength = 0.15,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const reduce = useReducedMotion();
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 250, damping: 22 });
  const sy = useSpring(y, { stiffness: 250, damping: 22 });
  useEffect(() => {
    if (reduce) {
      x.set(0);
      y.set(0);
    }
  }, [reduce, x, y]);
  return (
    <span
      ref={ref}
      className={cn("inline-flex", className)}
      onPointerMove={(e) => {
        if (reduce || e.pointerType !== "mouse" || !ref.current) return;
        const r = ref.current.getBoundingClientRect();
        x.set(Math.max(-8, Math.min(8, (e.clientX - r.left - r.width / 2) * strength)));
        y.set(Math.max(-5, Math.min(5, (e.clientY - r.top - r.height / 2) * strength)));
      }}
      onPointerLeave={() => {
        x.set(0);
        y.set(0);
      }}
    >
      <motion.span className="inline-flex" style={{ x: reduce ? 0 : sx, y: reduce ? 0 : sy }}>
        {children}
      </motion.span>
    </span>
  );
}

type CtaProps = { to: string; children: ReactNode; variant?: "primary" | "ghost" };
export function CtaLink({ to, children, variant = "primary" }: CtaProps) {
  return (
    <Magnetic>
      <Link
        to={to}
        className={cn(
          "v2-cta group inline-flex items-center gap-2 rounded-full px-6 py-3.5 text-sm font-semibold transition-colors duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
          variant === "primary"
            ? "bg-emerald-gradient text-primary-foreground shadow-glow hover:brightness-110"
            : "glass text-foreground hover:border-emerald/50",
        )}
      >
        {children}
      </Link>
    </Magnetic>
  );
}

/** Staggered word-by-word headline reveal. */
export function SplitHeadline({
  text,
  className,
  as: Tag = "h1",
  delay = 0,
  onScroll = false,
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2";
  delay?: number;
  onScroll?: boolean;
}) {
  const reduce = useReducedMotion();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const inView = useInView(headingRef, { once: true, amount: 0.25, margin: "0px 0px -30px 0px" });
  const words = text.split(" ");
  return (
    <Tag ref={headingRef} className={className} aria-label={text}>
      {words.map((w, i) => (
        <span key={i} className="inline-block overflow-hidden pb-[0.08em] align-bottom" aria-hidden>
          <motion.span
            className="inline-block"
            initial={reduce ? false : { y: "110%", rotate: 4 }}
            animate={!onScroll || inView || reduce ? { y: 0, rotate: 0 } : { y: "110%", rotate: 4 }}
            transition={{
              duration: reduce ? 0 : 0.85,
              delay: reduce ? 0 : delay + Math.min(i * 0.055, 0.45),
              ease: [0.22, 1, 0.36, 1],
            }}
          >
            {w}
            {i < words.length - 1 ? "\u00a0" : ""}
          </motion.span>
        </span>
      ))}
    </Tag>
  );
}

/** GSAP ScrollTrigger reveal for children with [data-reveal]. */
export function Reveal({
  children,
  className,
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  as?: "section" | "div";
}) {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (reduce || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ctx: { revert: () => void } | undefined;
    let cancelled = false;
    (async () => {
      const { gsap } = await import("gsap");
      const { ScrollTrigger } = await import("gsap/ScrollTrigger");
      if (cancelled) return;
      gsap.registerPlugin(ScrollTrigger);
      ctx = gsap.context(() => {
        const items = el.querySelectorAll("[data-reveal]");
        const targets = items.length ? Array.from(items) : [el];
        targets.forEach((item, index) => {
          gsap.fromTo(
            item,
            { y: 36, opacity: 0 },
            {
              y: 0,
              opacity: 1,
              duration: 0.85,
              ease: "power3.out",
              delay: (index % 4) * 0.045,
              clearProps: "transform,opacity",
              scrollTrigger: { trigger: item, start: "top 92%", once: true },
            },
          );
        });
        el.querySelectorAll("[data-parallax]").forEach((p) => {
          gsap.to(p, { yPercent: -12, ease: "none", scrollTrigger: { trigger: el, scrub: true } });
        });
      }, el);
    })().catch(() => {
      ctx?.revert();
    });
    return () => {
      cancelled = true;
      ctx?.revert();
    };
  }, [reduce]);
  const Comp = Tag as "section";
  return (
    <Comp ref={ref as React.RefObject<HTMLElement & HTMLDivElement>} className={className}>
      {children}
    </Comp>
  );
}

export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <header className="relative overflow-hidden bg-hero pt-36 pb-20 md:pt-44 md:pb-28">
      <div
        className="absolute inset-0 grid-lines opacity-30 [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]"
        aria-hidden
      />
      <div
        className="animated-orb absolute -right-20 top-10 size-[28rem] rounded-full"
        aria-hidden
      />
      <div className="relative mx-auto max-w-7xl px-5 md:px-8">
        <motion.p
          className="eyebrow"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
        >
          {eyebrow}
        </motion.p>
        <SplitHeadline
          text={title}
          className="mt-5 max-w-4xl text-4xl font-semibold leading-[1.05] md:text-6xl lg:text-7xl"
          delay={0.1}
        />
        <motion.p
          className="mt-6 max-w-2xl text-lg text-muted-foreground md:text-xl"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
        >
          {intro}
        </motion.p>
        {children && <div className="mt-8">{children}</div>}
      </div>
    </header>
  );
}

export function SectionTitle({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="max-w-3xl">
      <p data-reveal className="eyebrow">
        {eyebrow}
      </p>
      <SplitHeadline
        text={title}
        as="h2"
        onScroll
        className="mt-4 text-3xl font-semibold leading-tight tracking-[-.04em] md:text-5xl"
      />
      {body && (
        <p data-reveal className="mt-5 text-lg text-muted-foreground">
          {body}
        </p>
      )}
    </div>
  );
}
