import { useRef, useState } from "react";
import { AnimatePresence, motion, useInView, useReducedMotion } from "motion/react";
import { ArrowUpRight, MoveHorizontal, RotateCcw } from "lucide-react";
import { steeringAngles } from "@/lib/steering";
import "./pitch-enhancements.css";

export function EngineeringStudy() {
  const [view, setView] = useState<"cad" | "steering">("cad");
  const [angle, setAngle] = useState(22);
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref, { once: true, amount: 0.35 });
  const reduce = useReducedMotion();
  const angles = steeringAngles(angle);
  return (
    <div ref={ref} className="engineering-study" data-pitch-keys="off">
      <div className="engineering-study-toolbar">
        <span>DESIGN LAB / 01</span>
        <div role="group" aria-label="Engineering view">
          <button type="button" aria-pressed={view === "cad"} onClick={() => setView("cad")}>
            Original CAD
          </button>
          <button
            type="button"
            aria-pressed={view === "steering"}
            onClick={() => setView("steering")}
          >
            <MoveHorizontal size={13} /> Steer it
          </button>
        </div>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        {view === "cad" ? (
          <motion.div
            key="cad"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className={`cad-study-visual ${visible ? "has-entered" : ""}`}>
              <img
                src="/media/steering-assembly.webp"
                alt="Original Agrivion steering assembly CAD showing wheels, steering knuckles and connecting tie rod"
                width={1883}
                height={844}
                loading="lazy"
              />
              <svg
                className="cad-study-callouts"
                viewBox="0 0 660 380"
                fill="none"
                aria-hidden="true"
              >
                <path d="M150 209L100 125H32M330 210V84H420M532 222L570 295H625" />
                <circle cx="150" cy="209" r="4" />
                <circle cx="330" cy="210" r="4" />
                <circle cx="532" cy="222" r="4" />
                <text x="32" y="111">
                  01 / STEERING KNUCKLE
                </text>
                <text x="335" y="70">
                  02 / TIE ROD
                </text>
                <text x="480" y="316">
                  03 / WHEEL ASSEMBLY
                </text>
              </svg>
              <span className="cad-study-scan" aria-hidden="true" />
              <span className="cad-study-corner" aria-hidden="true">
                CAD REFERENCE / SYNOPSIS P.7
              </span>
            </div>
            <div className="engineering-study-caption">
              <span>
                Explore the steering geometry with the <strong>Steer it</strong> control.
              </span>
              <a
                href="/media/steering-assembly.webp"
                target="_blank"
                rel="noreferrer"
                aria-label="Open original CAD image"
              >
                Original <ArrowUpRight size={13} />
              </a>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="steering"
            initial={reduce ? false : { opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <svg
              viewBox="0 0 660 370"
              className="steering-lab-svg"
              role="img"
              aria-label={`Illustrative ${angle === 0 ? "straight" : angle < 0 ? "left" : "right"} turn. Inner wheel ${angles.inner.toFixed(1)} degrees, outer wheel ${angles.outer.toFixed(1)} degrees.`}
            >
              <defs>
                <pattern id="steer-grid" width="24" height="24" patternUnits="userSpaceOnUse">
                  <path
                    d="M24 0H0V24"
                    fill="none"
                    stroke="#b8d68e"
                    strokeOpacity=".12"
                    strokeWidth=".5"
                  />
                </pattern>
              </defs>
              <rect width="660" height="370" fill="url(#steer-grid)" />
              <path
                d="M190 25V340M470 25V340"
                stroke="#d5ed9b"
                strokeOpacity=".25"
                strokeDasharray="4 7"
              />
              <rect
                x="260"
                y="92"
                width="140"
                height="194"
                rx="24"
                fill="#1e3d2a"
                stroke="#819b65"
              />
              <path
                d="M330 72V315M240 123H420M240 270H420"
                stroke="#c1d4a6"
                strokeOpacity=".4"
                strokeDasharray="3 6"
              />
              <rect
                x="286"
                y="159"
                width="88"
                height="75"
                rx="10"
                fill="#14291e"
                stroke="#6d8d5a"
              />
              <text
                x="330"
                y="194"
                textAnchor="middle"
                fill="#d5ed9b"
                fontSize="12"
                fontFamily="monospace"
              >
                AGRIVION
              </text>
              <text
                x="330"
                y="213"
                textAnchor="middle"
                fill="#879e7e"
                fontSize="8"
                fontFamily="monospace"
              >
                GEOMETRY STUDY
              </text>
              {[
                { x: 240, a: angles.left, label: "LEFT" },
                { x: 420, a: angles.right, label: "RIGHT" },
              ].map((wheel) => (
                <g key={wheel.label}>
                  <motion.g
                    animate={{ rotate: wheel.a }}
                    style={{ transformOrigin: `${wheel.x}px 123px` }}
                    transition={{ duration: reduce ? 0 : 0.25 }}
                  >
                    <rect
                      x={wheel.x - 14}
                      y="88"
                      width="28"
                      height="70"
                      rx="7"
                      fill="#0b1911"
                      stroke="#d5ed9b"
                      strokeWidth="2"
                    />
                    {[99, 111, 123, 135, 147].map((y) => (
                      <path key={y} d={`M${wheel.x - 8} ${y}h16`} stroke="#71895d" />
                    ))}
                    <path
                      d={`M${wheel.x} 123V61`}
                      stroke="#d5ed9b"
                      strokeWidth="2"
                      strokeDasharray="3 4"
                    />
                  </motion.g>
                  <text
                    x={wheel.x}
                    y="42"
                    textAnchor="middle"
                    fill="#c6d9ae"
                    fontSize="10"
                    fontFamily="monospace"
                  >
                    {wheel.label} {Math.abs(wheel.a).toFixed(1)}°
                  </text>
                  <rect
                    x={wheel.x - 14}
                    y="238"
                    width="28"
                    height="65"
                    rx="7"
                    fill="#0b1911"
                    stroke="#7b9665"
                    strokeWidth="1.5"
                  />
                </g>
              ))}
              <path
                d={`M250 ${143 + Math.sin((angles.left * Math.PI) / 180) * 15}L410 ${143 + Math.sin((angles.right * Math.PI) / 180) * 15}`}
                stroke="#b2c0a2"
                strokeWidth="4"
                strokeLinecap="round"
              />
              <circle cx="330" cy="123" r="6" fill="#d5ed9b" />
              <path d="M330 123V141" stroke="#c1d4a6" strokeWidth="4" />
              <text
                x="330"
                y="345"
                textAnchor="middle"
                fill="#8ca17b"
                fontSize="9"
                letterSpacing="2"
                fontFamily="monospace"
              >
                TOP VIEW / ILLUSTRATIVE PROPORTIONS
              </text>
            </svg>
            <div className="steering-lab-controls">
              <div>
                <label htmlFor="steer-angle">Turn the front axle</label>
                <button type="button" onClick={() => setAngle(0)}>
                  <RotateCcw size={12} /> Centre
                </button>
              </div>
              <input
                id="steer-angle"
                type="range"
                min={-35}
                max={35}
                step={1}
                value={angle}
                onChange={(e) => setAngle(Number(e.target.value))}
              />
              <div className="steer-readouts">
                <span>
                  INNER <strong>{angles.inner.toFixed(1)}°</strong>
                </span>
                <span>
                  OUTER <strong>{angles.outer.toFixed(1)}°</strong>
                </span>
                <span>
                  {angle === 0 ? "STRAIGHT" : angle < 0 ? "TURNING LEFT" : "TURNING RIGHT"}
                </span>
              </div>
              <p>
                The inner wheel turns further so both wheels share a turning centre. An idealised
                model; actual dimensions and performance require validation.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
