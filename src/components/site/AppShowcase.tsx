import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUpRight,
  Expand,
  LayoutGrid,
  Smartphone,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import "./app-showcase.css";

const source = "/media/app-overview.webp";
const screens = [
  {
    name: "Registration",
    label: "Start with your farm",
    detail: "A farmer profile brings local context into the platform.",
    x: 48,
    y: 195,
  },
  {
    name: "Login",
    label: "Your own farming space",
    detail: "A simple entry point to the planned Agrivion experience.",
    x: 538,
    y: 195,
  },
  {
    name: "Farm dashboard",
    label: "One place. A whole farm.",
    detail: "Soil health, crop guidance, rover access, markets and farm accounts.",
    x: 1028,
    y: 195,
  },
  {
    name: "Communities",
    label: "Knowledge grows together",
    detail: "Discover farmer groups and share practical experience from the field.",
    x: 48,
    y: 1147,
  },
  {
    name: "Farmer feed",
    label: "Learn from the field",
    detail: "Crop conversations, farming techniques and a connected community.",
    x: 538,
    y: 1147,
  },
  {
    name: "Farm accounts",
    label: "See the everyday details",
    detail: "A clearer picture of farm income, expenses and everyday records.",
    x: 1028,
    y: 1147,
  },
];

/** CSS window into the unmodified, original six-screen synopsis image. */
function OriginalPhone({ index, className = "" }: { index: number; className?: string }) {
  const screen = screens[index]!;
  const style = {
    "--source-left": `${-(screen.x / 448) * 100}%`,
    "--source-top": `${-(screen.y / 866) * 100}%`,
  } as CSSProperties;
  return (
    <div className={`app-original-phone ${className}`} style={style}>
      <img
        src={source}
        alt={`Original Agrivion ${screen.name.toLowerCase()} interface concept from the synopsis`}
        width={1524}
        height={2155}
        loading="lazy"
        draggable={false}
      />
    </div>
  );
}

function offsetFor(index: number, active: number) {
  let delta = (index - active + screens.length) % screens.length;
  if (delta > screens.length / 2) delta -= screens.length;
  return delta;
}

export function AppShowcase({ id = "app-showcase" }: { id?: string }) {
  const [active, setActive] = useState(2);
  const [modal, setModal] = useState<number | "all" | null>(null);
  const [zoom, setZoom] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const reduced = useReducedMotion();
  const activeScreen = screens[active]!;
  const step = (direction: number) =>
    setActive((current) => (current + direction + screens.length) % screens.length);

  useEffect(() => {
    const element = dialog.current;
    if (!element || modal === null) return;
    element.showModal();
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previousOverflow;
      element.close();
    };
  }, [modal !== null]);

  const open = (screen: number | "all") => {
    setZoom(false);
    setModal(screen);
  };

  return (
    <section
      id={id}
      className="app-showcase"
      aria-label="Explore the Agrivion app interface concepts"
    >
      <div className="app-showcase-heading">
        <div>
          <p className="eyebrow">THE AGRIVION APP / FROM SOWING TO SELLING</p>
          <motion.h2
            initial={reduced ? false : { opacity: 0, y: 35 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          >
            A whole farm.
            <br />
            <span>In your hand.</span>
          </motion.h2>
        </div>
        <div className="app-showcase-intro">
          <p>
            Take a closer look at the original app designs. Every screen is part of one connected
            vision for the farmer.
          </p>
          <button type="button" className="app-sheet-link" onClick={() => open("all")}>
            <LayoutGrid size={16} /> View all original screens <ArrowUpRight size={16} />
          </button>
        </div>
      </div>

      <div className="app-gallery-shell">
        <div className="app-gallery-topline">
          <span>
            <span className="app-concept-dot" /> APP INTERFACE CONCEPT
          </span>
          <span>SELECT A SCREEN. EXPLORE THE DETAILS.</span>
        </div>
        <div className="app-screen-picker" role="group" aria-label="Choose an app screen">
          {screens.map((screen, index) => (
            <button
              type="button"
              key={screen.name}
              aria-pressed={active === index}
              onClick={() => setActive(index)}
            >
              <span>0{index + 1}</span>
              {screen.name}
            </button>
          ))}
        </div>

        <div
          className="app-coverflow"
          role="group"
          aria-roledescription="carousel"
          aria-label="App screens. Use left and right arrow keys to browse."
          tabIndex={0}
          onKeyDown={(event) => {
            if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
              event.preventDefault();
              // Keep keyboard focus on a stable target as phone cards move out of view.
              event.currentTarget.focus({ preventScroll: true });
              step(event.key === "ArrowLeft" ? -1 : 1);
            }
          }}
        >
          <div className="app-orbit app-orbit-one" aria-hidden="true" />
          <div className="app-orbit app-orbit-two" aria-hidden="true" />
          <div className="app-coverflow-word" aria-hidden="true">
            AGRIVION
          </div>
          {screens.map((screen, index) => {
            const position = offsetFor(index, active);
            const isCenter = position === 0;
            const visible = Math.abs(position) <= 1;
            return (
              <motion.div
                key={screen.name}
                className={`app-device-position ${isCenter ? "is-center" : "is-side"}`}
                style={{ zIndex: isCenter ? 3 : visible ? 2 : 0 }}
                initial={false}
                animate={{
                  x: `${position * 108}%`,
                  y: isCenter ? 0 : 40,
                  rotate: isCenter ? 0 : position * 7,
                  scale: isCenter ? 1 : 0.82,
                  opacity: visible ? (isCenter ? 1 : 0.65) : 0,
                }}
                transition={
                  reduced ? { duration: 0 } : { type: "spring", stiffness: 160, damping: 24 }
                }
                aria-hidden={!visible}
              >
                <button
                  type="button"
                  tabIndex={visible ? 0 : -1}
                  className="app-device-button"
                  aria-label={
                    isCenter ? `Enlarge ${screen.name} screen` : `Show ${screen.name} screen`
                  }
                  onClick={() => (isCenter ? open(index) : setActive(index))}
                  disabled={!visible}
                >
                  <OriginalPhone index={index} />
                  {isCenter && (
                    <span className="app-screen-expand">
                      <Expand size={15} /> Click to explore
                    </span>
                  )}
                </button>
              </motion.div>
            );
          })}
        </div>

        <div className="app-gallery-bottomline">
          <button
            type="button"
            className="app-gallery-arrow"
            aria-label="Previous app screen"
            onClick={() => step(-1)}
          >
            <ArrowLeft size={22} />
          </button>
          <div className="app-screen-caption" aria-live="polite" aria-atomic="true">
            <span className="app-screen-count">0{active + 1} / 06</span>
            <h3>{activeScreen.label}</h3>
            <p>{activeScreen.detail}</p>
          </div>
          <button
            type="button"
            className="app-gallery-arrow"
            aria-label="Next app screen"
            onClick={() => step(1)}
          >
            <ArrowRight size={22} />
          </button>
        </div>
        <p className="app-source-caption">
          Original interface concepts from the Agrivion synopsis. The app is in development.
        </p>
      </div>

      <dialog
        ref={dialog}
        className="app-image-dialog"
        aria-labelledby={headingId}
        onClose={() => setModal(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setModal(null);
        }}
      >
        <div className="app-dialog-content">
          <div className="app-dialog-toolbar">
            <div>
              <p>AGRIVION / ORIGINAL APP DESIGNS</p>
              <h3 id={headingId}>
                {modal === "all"
                  ? "All six original screens"
                  : typeof modal === "number"
                    ? screens[modal]!.name
                    : "App interface"}
              </h3>
            </div>
            <button type="button" aria-label="Close app image" onClick={() => setModal(null)}>
              <X size={22} />
            </button>
          </div>
          <div className="app-dialog-options">
            <button
              type="button"
              onClick={() => {
                setModal(modal === "all" ? active : "all");
                setZoom(false);
              }}
            >
              {modal === "all" ? <Smartphone size={16} /> : <LayoutGrid size={16} />}
              {modal === "all" ? "Selected screen" : "Original six-screen sheet"}
            </button>
            <button type="button" onClick={() => setZoom(!zoom)} aria-pressed={zoom}>
              {zoom ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
              {zoom ? "Fit view" : "Enlarge"}
            </button>
            <a href={source} target="_blank" rel="noreferrer">
              Open original <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="app-dialog-scroll">
            {modal === "all" ? (
              <img
                src={source}
                width={1524}
                height={2155}
                className={zoom ? "app-full-source is-zoomed" : "app-full-source"}
                alt="Complete six-screen Agrivion app design sheet from the project synopsis"
              />
            ) : typeof modal === "number" ? (
              <div className={zoom ? "app-dialog-phone is-zoomed" : "app-dialog-phone"}>
                <OriginalPhone index={modal} />
              </div>
            ) : null}
          </div>
          <p className="app-dialog-note">
            Interface concepts from the project synopsis. Use Enlarge to inspect the details.
          </p>
        </div>
      </dialog>
    </section>
  );
}
