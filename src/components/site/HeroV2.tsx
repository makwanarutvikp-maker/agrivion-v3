import { useRef, useState } from "react";
import { motion, useInView, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, ArrowUpRight, Pause, Play, ScanLine, Sprout } from "lucide-react";
import { CtaLink } from "./primitives";
import hero from "@/assets/hero-rover.jpg";
import "./home-v2.css";

export function HeroV2() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const visible = useInView(ref);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "18%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);
  const opacity = useTransform(scrollYProgress, [0, 0.75], [1, 0.15]);
  return (
    <section ref={ref} className={`v2-hero ${visible ? "is-visible" : ""}`}>
      <motion.div className="v2-hero-landscape" style={reduce ? {} : { y, scale }}>
        <img
          src={hero}
          alt="Concept illustration of the Agrivion rover in a sunlit field"
          fetchPriority="high"
          width={1920}
          height={1088}
        />
      </motion.div>
      <div className="v2-hero-shade" />
      <div className="v2-hero-grid" aria-hidden="true" />
      <motion.div className="v2-hero-copy" style={reduce ? {} : { opacity }}>
        <motion.div
          className="v2-hero-eyebrow"
          initial={reduce ? false : { opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <span className="v2-live-dot" /> ROOTED IN AGRICULTURE. DRIVEN BY POSSIBILITY.
        </motion.div>
        <h1 className="v2-hero-title" aria-label="The future grows here.">
          {["The future", "grows here."].map((line, i) => (
            <span className="v2-title-mask" key={line} aria-hidden="true">
              <motion.span
                initial={reduce ? false : { y: "112%", rotate: 3 }}
                animate={{ y: 0, rotate: 0 }}
                transition={{ duration: 1.1, delay: 0.12 + i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className={i ? "v2-title-accent" : ""}
              >
                {line}
              </motion.span>
            </span>
          ))}
        </h1>
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <p className="v2-hero-description">
            Smarter fields. Better decisions. Stronger farmers.
            <br />
            <span>
              A connected world of robotics, agricultural intelligence and farmer support. From
              sowing to selling.
            </span>
          </p>
          <div className="v2-hero-actions">
            <CtaLink to="/dashboard">
              <Play className="size-4" /> Take the controls
            </CtaLink>
            <a href="#app-showcase" className="v2-quiet-link">
              Discover the farmer app <ArrowUpRight className="size-4" />
            </a>
          </div>
        </motion.div>
      </motion.div>
      <motion.div
        className="v2-rover-reticle"
        aria-hidden="true"
        initial={reduce ? false : { opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1, delay: 0.8 }}
      >
        <span className="v2-reticle-corner" />
        <span className="v2-reticle-corner" />
        <span className="v2-reticle-corner" />
        <span className="v2-reticle-corner" />
        <div className="v2-scan-line" />
        <span className="v2-reticle-label">
          <ScanLine size={13} /> AGRIVION / 4WD PLATFORM
        </span>
      </motion.div>
      <div className="v2-hero-foot">
        <a href="#why" className="v2-scroll-link">
          <span>
            <ArrowDown size={18} />
          </span>{" "}
          SCROLL TO EXPLORE
        </a>
        <span className="v2-hero-stage">
          <Sprout size={16} /> BUILDING & TESTING IN INDIA
        </span>
        <span className="v2-hero-source">CONCEPT VISUAL · PRODUCT IN DEVELOPMENT</span>
      </div>
    </section>
  );
}

export function VisionMarquee() {
  const ref = useRef<HTMLDivElement>(null);
  const visible = useInView(ref);
  const [paused, setPaused] = useState(false);
  const reduce = useReducedMotion();
  const words = [
    "SMARTER FIELDS",
    "BETTER DECISIONS",
    "STRONGER FARMERS",
    "FROM SOWING TO SELLING",
  ];
  return (
    <div
      ref={ref}
      className={`v2-marquee ${visible ? "is-visible" : ""}`}
      aria-label={words.join(". ")}
    >
      <div
        className="v2-marquee-track"
        aria-hidden="true"
        style={paused ? { animationPlayState: "paused" } : undefined}
      >
        {[0, 1].map((copy) => (
          <div className="v2-marquee-group" key={copy}>
            {words.map((word) => (
              <span key={word}>
                {word}
                <span className="v2-marquee-flower">✳</span>
              </span>
            ))}
          </div>
        ))}
      </div>
      {!reduce && (
        <button
          className="v2-marquee-toggle"
          type="button"
          onClick={() => setPaused(!paused)}
          aria-label={paused ? "Play vision marquee" : "Pause vision marquee"}
        >
          {paused ? <Play size={16} /> : <Pause size={16} />}
        </button>
      )}
    </div>
  );
}
