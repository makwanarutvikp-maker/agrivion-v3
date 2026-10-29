import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { AnimatePresence, motion, useReducedMotion, useScroll } from "motion/react";
import { Menu, X, ArrowUpRight, ArrowUp } from "lucide-react";
import { cn } from "@/lib/utils";
export const NAV = [
  { to: "/ecosystem", label: "Ecosystem" },
  { to: "/rover", label: "Rover" },
  { to: "/technology", label: "Technology" },
  { to: "/dashboard", label: "Demo" },
  { to: "/about", label: "Our story" },
] as const;
const more = [
  { to: "/intelligence", label: "AI & satellite" },
  { to: "/applications", label: "Applications" },
];
export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 font-display font-semibold tracking-[.12em]",
        className,
      )}
    >
      <img
        src="/media/logo.webp"
        alt=""
        className="size-10 rounded-xl object-contain"
        width={40}
        height={40}
      />
      <span>
        AGRIVION
        <span className="mt-0.5 block font-sans text-[8px] font-normal tracking-[.28em] text-muted-foreground">
          FROM SOWING TO SELLING
        </span>
      </span>
    </span>
  );
}
export function Nav() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const toggle = useRef<HTMLButtonElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const on = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", on);
    return () => window.removeEventListener("keydown", on);
  }, [open]);
  return (
    <header className="fixed inset-x-0 top-0 z-50 px-3 pt-3 md:px-6 md:pt-4">
      <nav
        aria-label="Main navigation"
        className="glass mx-auto flex max-w-[1360px] items-center justify-between gap-4 rounded-2xl px-4 py-3 md:px-6"
      >
        <Link to="/" aria-label="Agrivion home">
          <Logo className="text-sm" />
        </Link>
        <div className="hidden items-center gap-1 lg:flex">
          {NAV.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              className="v2-nav-link rounded-full px-4 py-2 text-sm text-muted-foreground transition hover:text-foreground"
              activeProps={{ className: "bg-accent !text-foreground" }}
            >
              {n.label}
            </Link>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <Link
            to="/contact"
            className="v2-cta hidden items-center gap-2 rounded-full bg-primary px-5 py-3 text-xs font-semibold text-primary-foreground sm:flex"
          >
            Let’s collaborate <ArrowUpRight className="size-4" />
          </Link>
          <button
            ref={toggle}
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-controls="mobile-nav"
            aria-label={open ? "Close menu" : "Open menu"}
            className="grid size-11 place-items-center rounded-full border lg:hidden"
          >
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-nav"
            initial={reduce ? false : { opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            className="glass mx-auto mt-2 max-h-[75svh] max-w-[1360px] overflow-y-auto rounded-2xl p-3 lg:hidden"
          >
            {[
              { to: "/", label: "Home" },
              ...NAV,
              ...more,
              { to: "/contact", label: "Contact & collaboration" },
            ].map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-4 py-3 text-base"
                activeOptions={{ exact: true }}
                activeProps={{ className: "bg-accent text-emerald-glow" }}
              >
                {n.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div
        aria-hidden
        className="fixed inset-x-0 top-0 h-[2px] origin-left bg-primary"
        style={{ scaleX: scrollYProgress }}
      />
    </header>
  );
}
export function Footer() {
  return (
    <footer className="border-t bg-charcoal">
      <div className="section-shell !py-16">
        <div className="grid gap-12 md:grid-cols-[1.5fr_1fr_1fr]">
          <div>
            <Logo />
            <p className="mt-6 max-w-sm text-lg leading-relaxed">
              Smarter Fields. Better Decisions.
              <br />
              <span className="text-emerald-glow">Stronger Farmers.</span>
            </p>
            <p className="mt-5 max-w-sm text-xs leading-relaxed text-muted-foreground">
              Agricultural robotics, practical guidance and farmer community. Building and testing a
              connected ecosystem for Indian agriculture.
            </p>
          </div>
          <div>
            <p className="eyebrow">Explore Agrivion</p>
            <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
              {[...NAV, ...more].map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="transition hover:text-foreground">
                    {n.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="eyebrow">Build with us</p>
            <a
              href="mailto:makwanabhaveshp@gmail.com"
              className="mt-5 block break-all text-sm hover:text-emerald-glow"
            >
              makwanabhaveshp@gmail.com
            </a>
            <p className="mt-3 text-sm text-muted-foreground">Anand, Gujarat, India</p>
            <a
              href="/Agrivion-Synopsis.pdf"
              download
              className="mt-6 inline-flex items-center gap-2 text-sm text-emerald-glow"
            >
              Project synopsis <ArrowUpRight className="size-4" />
            </a>
            <Link
              to="/contact"
              className="mt-4 block text-sm text-muted-foreground hover:text-foreground"
            >
              Pilot & research collaboration
            </Link>
          </div>
        </div>
        <div className="mt-14 flex flex-wrap items-center justify-between gap-5 border-t pt-7 text-[11px] text-muted-foreground">
          <p>© 2026 Agrivion. All products in development. Website demos use illustrative data.</p>
          <button
            onClick={() =>
              window.scrollTo({
                top: 0,
                behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                  ? "instant"
                  : "smooth",
              })
            }
            className="flex min-h-11 items-center gap-2"
          >
            Back to top <ArrowUp className="size-4" />
          </button>
        </div>
      </div>
    </footer>
  );
}
