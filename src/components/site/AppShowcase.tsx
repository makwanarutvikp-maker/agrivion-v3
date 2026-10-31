import { useEffect, useId, useRef, useState, type CSSProperties } from "react";
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
    label: "Set up a farmer profile",
    detail:
      "A planned profile for basic contact and farm details, helping bring local context into the app.",
    x: 48,
    y: 195,
  },
  {
    name: "Login",
    label: "Access your account",
    detail: "The proposed sign-in screen for a farmer’s own Agrivion account and farm information.",
    x: 538,
    y: 195,
  },
  {
    name: "Farm dashboard",
    label: "Find your farming tools",
    detail:
      "A proposed home screen for soil health, crop guidance, rover controls, markets and farm records.",
    x: 1028,
    y: 195,
  },
  {
    name: "Communities",
    label: "Find farmer groups",
    detail:
      "The planned community area brings farmers together around crops, techniques and shared interests.",
    x: 48,
    y: 1147,
  },
  {
    name: "Farmer feed",
    label: "Share practical experience",
    detail:
      "A concept for crop discussions, farming questions and useful updates from other farmers.",
    x: 538,
    y: 1147,
  },
  {
    name: "Farm accounts",
    label: "Keep farm records together",
    detail:
      "The proposed accounts view helps organise income, expenses and day-to-day farm records.",
    x: 1028,
    y: 1147,
  },
];

/** A CSS crop of the unmodified six-screen image from the original synopsis. */
function OriginalPhone({ index }: { index: number }) {
  const screen = screens[index]!;
  const style = {
    "--source-left": `${-(screen.x / 448) * 100}%`,
    "--source-top": `${-(screen.y / 866) * 100}%`,
  } as CSSProperties;
  return (
    <div className="simple-app-phone" style={style}>
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

export function AppShowcase({ id = "app-showcase" }: { id?: string }) {
  const [active, setActive] = useState(2);
  const [modal, setModal] = useState<number | "all" | null>(null);
  const [zoom, setZoom] = useState(false);
  const dialog = useRef<HTMLDialogElement>(null);
  const headingId = useId();
  const activeScreen = screens[active]!;

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
  const step = (direction: number) =>
    setActive((current) => (current + direction + screens.length) % screens.length);

  return (
    <section id={id} className="simple-app-section" aria-label="Agrivion app designs">
      <div className="simple-app-heading">
        <div>
          <p className="eyebrow">Farmer app</p>
          <h2>
            Useful farming information.
            <br />
            In one place.
          </h2>
        </div>
        <p>
          Explore the six original app designs from the synopsis. Select a screen to see it clearly,
          or open the complete image.
        </p>
      </div>

      <div className="simple-app-gallery">
        <div className="simple-app-details">
          <span className="simple-app-status">App in development</span>
          <h3>Explore the app screens</h3>
          <p className="simple-app-instruction">Choose a screen below.</p>
          <div className="simple-app-choices" role="group" aria-label="Choose an app screen">
            {screens.map((screen, index) => (
              <button
                type="button"
                key={screen.name}
                aria-pressed={active === index}
                onClick={() => setActive(index)}
              >
                <span>{index + 1}</span>
                {screen.name}
              </button>
            ))}
          </div>
          <div className="simple-app-description" aria-live="polite" aria-atomic="true">
            <h4>{activeScreen.label}</h4>
            <p>{activeScreen.detail}</p>
          </div>
          <div className="simple-app-actions">
            <button type="button" className="simple-app-primary" onClick={() => open(active)}>
              <Expand size={17} /> Enlarge this screen
            </button>
            <button type="button" onClick={() => open("all")}>
              <LayoutGrid size={17} /> View all six screens
            </button>
          </div>
          <p className="simple-app-note">
            These are interface concepts. App features are being built and tested.
          </p>
        </div>
        <div className="simple-app-preview">
          <button
            type="button"
            className="simple-app-screen-button"
            aria-label={`Enlarge ${activeScreen.name} screen`}
            onClick={() => open(active)}
          >
            <OriginalPhone index={active} />
          </button>
          <div className="simple-app-pagination">
            <button type="button" aria-label="Previous app screen" onClick={() => step(-1)}>
              <ArrowLeft size={18} />
            </button>
            <span>
              {active + 1} of {screens.length} · {activeScreen.name}
            </span>
            <button type="button" aria-label="Next app screen" onClick={() => step(1)}>
              <ArrowRight size={18} />
            </button>
          </div>
        </div>
      </div>

      <dialog
        ref={dialog}
        className="simple-app-dialog"
        aria-labelledby={headingId}
        onClose={() => setModal(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setModal(null);
        }}
      >
        <div className="simple-app-dialog-content">
          <div className="simple-app-dialog-header">
            <div>
              <p>Original app designs</p>
              <h3 id={headingId}>
                {modal === "all"
                  ? "All six app screens"
                  : typeof modal === "number"
                    ? screens[modal]!.name
                    : "App interface"}
              </h3>
            </div>
            <button type="button" aria-label="Close app image" onClick={() => setModal(null)}>
              <X size={22} />
            </button>
          </div>
          <div className="simple-app-dialog-options">
            <button
              type="button"
              onClick={() => {
                setModal(modal === "all" ? active : "all");
                setZoom(false);
              }}
            >
              {modal === "all" ? <Smartphone size={16} /> : <LayoutGrid size={16} />}
              {modal === "all" ? "Selected screen" : "All six screens"}
            </button>
            <button type="button" onClick={() => setZoom(!zoom)} aria-pressed={zoom}>
              {zoom ? <ZoomOut size={16} /> : <ZoomIn size={16} />}
              {zoom ? "Fit to window" : "Zoom in"}
            </button>
            <a href={source} target="_blank" rel="noreferrer">
              Open original <ArrowUpRight size={15} />
            </a>
          </div>
          <div className="simple-app-dialog-scroll">
            {modal === "all" ? (
              <img
                src={source}
                width={1524}
                height={2155}
                className={zoom ? "simple-app-full-source is-zoomed" : "simple-app-full-source"}
                alt="Complete six-screen Agrivion app design sheet from the project synopsis"
              />
            ) : typeof modal === "number" ? (
              <div
                className={zoom ? "simple-app-dialog-phone is-zoomed" : "simple-app-dialog-phone"}
              >
                <OriginalPhone index={modal} />
              </div>
            ) : null}
          </div>
          <p className="simple-app-dialog-note">
            Original interface concepts from the Agrivion synopsis. Use Zoom in to inspect details.
          </p>
        </div>
      </dialog>
    </section>
  );
}
