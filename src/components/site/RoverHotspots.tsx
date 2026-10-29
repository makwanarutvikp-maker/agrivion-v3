import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";

const hardware = [
  {
    name: "Navigation",
    tag: "01 / GPS + GNSS",
    body: "Planned waypoint navigation. Accuracy, route following and safe stopping will be validated in supervised trials.",
    x: 75,
    y: 23,
  },
  {
    name: "Crop vision",
    tag: "02 / PHASE II",
    body: "Future onboard camera observations and AI-assisted crop monitoring. This concept image does not show validated sensing hardware.",
    x: 81,
    y: 44,
  },
  {
    name: "Control core",
    tag: "03 / ESP32",
    body: "An ESP32-based controller is central to the rover design, connecting drive, steering and modular field tools.",
    x: 71,
    y: 58,
  },
  {
    name: "4WD platform",
    tag: "04 / ACKERMANN STEERING",
    body: "Four driven wheels with steering geometry designed for controlled field manoeuvres. Mechanical design and testing are ongoing.",
    x: 90,
    y: 65,
  },
];

export function RoverHotspots() {
  const [active, setActive] = useState<number | null>(null);
  const [narrow, setNarrow] = useState(false);
  useEffect(() => {
    const media = window.matchMedia("(max-width: 767px)");
    const update = () => setNarrow(media.matches);
    update();
    media.addEventListener("change", update);
    return () => media.removeEventListener("change", update);
  }, []);
  return (
    <div className="hero-hardware-map" aria-label="Explore the rover design intent">
      <p className="hardware-map-heading">
        EXPLORE THE DESIGN <span>+</span>
      </p>
      <div className="hardware-hotspots">
        {hardware.map((item, i) => (
          <Popover
            key={item.name}
            open={active === i}
            onOpenChange={(open) => setActive(open ? i : null)}
          >
            <PopoverTrigger asChild>
              <button
                type="button"
                className={`hardware-hotspot ${active === i ? "is-active" : ""}`}
                style={{ left: `${item.x}%`, top: `${item.y}%` }}
                aria-label={`Explore ${item.name}`}
              >
                <span className="hotspot-target">{String(i + 1).padStart(2, "0")}</span>
                <span className="hotspot-name">{item.name}</span>
              </button>
            </PopoverTrigger>
            <PopoverContent
              side={narrow ? "bottom" : "left"}
              align="center"
              sideOffset={14}
              collisionPadding={20}
              className="hardware-detail"
              onOpenAutoFocus={(event) => event.preventDefault()}
              onEscapeKeyDown={(event) => event.stopPropagation()}
            >
              <div>
                <span>{item.tag}</span>
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  aria-label="Close hardware detail"
                >
                  <X size={14} />
                </button>
              </div>
              <h2>{item.name}</h2>
              <p>{item.body}</p>
              <small>DESIGN INTENT · IN DEVELOPMENT</small>
            </PopoverContent>
          </Popover>
        ))}
      </div>
    </div>
  );
}
