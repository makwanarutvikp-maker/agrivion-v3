import { useRef } from "react";
import { motion, useReducedMotion, useScroll } from "motion/react";
const phases = [
  {
    n: "I",
    title: "Field robotics",
    status: "BUILD & TEST",
    body: "Develop and validate the rover, manual control, navigation, safety and modular field tools.",
  },
  {
    n: "II",
    title: "Farm intelligence",
    status: "PLANNED INTEGRATION",
    body: "Integrate computer vision, satellite monitoring and georeferenced crop observations.",
  },
  {
    n: "+",
    title: "Connected support",
    status: "ECOSYSTEM VISION",
    body: "Bring guidance, markets, schemes, expert access and community into the wider platform.",
  },
];
export function DevelopmentRoadmap() {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 85%", "center 45%"] });
  return (
    <div ref={ref} className="development-roadmap">
      <div className="roadmap-track" aria-hidden="true">
        <motion.span style={reduce ? { scaleX: 1 } : { scaleX: scrollYProgress }} />
      </div>
      {phases.map((phase, i) => (
        <motion.article
          key={phase.n}
          className="roadmap-phase"
          initial={reduce ? false : { opacity: 0, y: 22 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.65, delay: i * 0.1 }}
        >
          <span className="roadmap-badge">{phase.n}</span>
          <span className="roadmap-status">{phase.status}</span>
          <h3>{phase.title}</h3>
          <p>{phase.body}</p>
        </motion.article>
      ))}
    </div>
  );
}
