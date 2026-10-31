import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import {
  Navigation,
  Cpu,
  ScanEye,
  Satellite,
  ArrowRight,
  ShieldCheck,
  Wrench,
  FlaskConical,
} from "lucide-react";
import { CtaLink, PageHero, Reveal, SectionTitle, StatusTag } from "@/components/site/primitives";
import { FieldMap, serpentine } from "@/components/site/FieldMap";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/technology")({
  head: () => ({
    meta: [
      { title: "Agrivion Technology | From control to intelligence" },
      {
        name: "description",
        content:
          "The development architecture behind Agrivion: accessible electronics, manual and GPS control, safety, computer vision and satellite monitoring.",
      },
    ],
  }),
  component: Tech,
});
const LAYERS = [
  {
    id: "control",
    icon: Cpu,
    phase: "Phase I",
    title: "Electronic control",
    body: "An ESP32-based architecture brings motor drivers, geared motors, a steering actuator and power supply together. Manual control and calibration establish the foundation.",
    steps: [
      "Receive an operator command",
      "Coordinate motor drivers",
      "Actuate calibrated steering",
      "Observe power and system state",
      "Stop safely when requested",
    ],
    nodes: ["APP / CONTROLLER", "ESP32", "MOTOR DRIVERS", "4WD + STEERING", "STOP FUNCTION"],
  },
  {
    id: "navigation",
    icon: Navigation,
    phase: "Phase I",
    title: "Waypoint navigation",
    body: "GPS/GNSS-based guidance is being developed for waypoint navigation, route recording and systematic field movement. Positioning accuracy and safe turning require field validation.",
    steps: [
      "Define a suitable field route",
      "Read a GPS / GNSS position",
      "Estimate the next waypoint direction",
      "Coordinate drive and steering",
      "Evaluate navigation error",
    ],
    nodes: [],
  },
  {
    id: "vision",
    icon: ScanEye,
    phase: "Phase II",
    title: "Computer vision",
    body: "Onboard imagery and suitable sensors are planned for crop-row detection, weed identification, crop-health observation and preliminary recognition of disease symptoms.",
    steps: [
      "Capture an onboard observation",
      "Inspect crop and soil patterns",
      "Identify potential rows or weeds",
      "Attach a GPS / GNSS location",
      "Validate against field observations",
    ],
    nodes: [
      "CAMERA + SENSORS",
      "IMAGE PROCESSING",
      "ROW / CROP / WEED",
      "LOCATION TAG",
      "FIELD VALIDATION",
    ],
  },
  {
    id: "satellite",
    icon: Satellite,
    phase: "Phase II",
    title: "Satellite monitoring",
    body: "Suitable imagery, such as Sentinel-2, could help map vegetation patterns and field variability. Combining it with rover observations is a development goal.",
    steps: [
      "Select suitable satellite imagery",
      "Prepare geospatial data",
      "Calculate vegetation indices",
      "Identify areas for inspection",
      "Compare with rover observations",
    ],
    nodes: [],
  },
];
const VALIDATION = [
  [
    "Mobility",
    "Traction, turning radius, ground clearance and performance in suitable soil conditions.",
  ],
  [
    "Navigation",
    "Waypoint error, steering accuracy, repeatability and obstacle-response behaviour.",
  ],
  [
    "Field operations",
    "Spray distribution, cultivation effectiveness, operational speed and crop damage.",
  ],
  [
    "Power & maintenance",
    "Battery endurance, payload suitability, repair needs and practical operating costs.",
  ],
  [
    "Intelligence",
    "Detection performance, image quality, geospatial alignment and usefulness to farmers.",
  ],
  [
    "Farmer value",
    "Supervised trials, farmer feedback and measured benefit for a practical application.",
  ],
];

function Tech() {
  const [step, setStep] = useState(0);
  const reduce = useReducedMotion();
  return (
    <>
      <PageHero
        eyebrow="02 / Technology & development"
        title="How Agrivion works"
        intro="From an operator's command to a field observation: explore how the Agrivion platform is being designed to work."
      >
        <StatusTag status="prototype" />
      </PageHero>
      <section className="mx-auto max-w-7xl px-5 pb-16 md:px-8">
        <Tabs defaultValue="control" onValueChange={() => setStep(0)}>
          <TabsList
            aria-label="Technology layers"
            className="grid h-auto w-full grid-cols-2 gap-2 rounded-2xl bg-transparent p-0 lg:grid-cols-4"
          >
            {LAYERS.map((layer) => (
              <TabsTrigger
                value={layer.id}
                key={layer.id}
                className="group min-h-24 flex-col items-start gap-3 whitespace-normal rounded-2xl border bg-card/40 px-5 py-5 text-left data-[state=active]:border-emerald/60 data-[state=active]:bg-accent"
              >
                <layer.icon className="size-6 text-emerald-glow" />
                <span>{layer.title}</span>
              </TabsTrigger>
            ))}
          </TabsList>
          {LAYERS.map((layer) => (
            <TabsContent key={layer.id} value={layer.id} className="mt-6">
              <div className="grid overflow-hidden rounded-[2rem] border bg-card/40 lg:grid-cols-2">
                <div className="p-6 sm:p-10">
                  <p className="eyebrow">{layer.phase} / Development architecture</p>
                  <h2 className="mt-5 text-3xl font-semibold sm:text-4xl">{layer.title}</h2>
                  <p className="mt-4 leading-relaxed text-muted-foreground">{layer.body}</p>
                  <ol className="mt-8 space-y-2">
                    {layer.steps.map((item, i) => (
                      <li key={item}>
                        <button
                          onClick={() => setStep(i)}
                          aria-pressed={i === step}
                          className={`flex min-h-12 w-full items-center gap-4 rounded-xl p-3 text-left transition-colors ${i === step ? "bg-accent" : "hover:bg-accent/40"}`}
                        >
                          <span
                            className={`grid size-8 shrink-0 place-items-center rounded-full font-mono text-xs ${i === step ? "bg-emerald-gradient text-primary-foreground" : "border text-muted-foreground"}`}
                          >
                            0{i + 1}
                          </span>
                          <span className="text-sm">{item}</span>
                        </button>
                      </li>
                    ))}
                  </ol>
                </div>
                <div className="relative flex min-h-[360px] flex-col justify-center border-t bg-charcoal p-6 sm:p-10 lg:border-t-0 lg:border-l">
                  {layer.id === "navigation" || layer.id === "satellite" ? (
                    <FieldMap
                      waypoints={serpentine(5)}
                      progress={step / 4}
                      ndvi={layer.id === "satellite" && step > 1}
                      className="aspect-square"
                    />
                  ) : (
                    <div className="space-y-3">
                      {layer.nodes.map((node, i) => (
                        <div key={node}>
                          <motion.div
                            animate={{
                              opacity: i <= step ? 1 : 0.35,
                              x: reduce ? 0 : i <= step ? 0 : 8,
                            }}
                            transition={{ duration: reduce ? 0 : 0.3 }}
                            className={`flex items-center justify-between rounded-xl border px-5 py-5 font-mono text-xs tracking-wider ${i === step ? "border-emerald/60 bg-accent text-emerald-glow" : ""}`}
                          >
                            <span>{node}</span>
                            <span className="size-2 rounded-full bg-current" />
                          </motion.div>
                          {i < layer.nodes.length - 1 && (
                            <div className="mx-auto h-3 w-px bg-emerald/30" />
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                  <p
                    aria-live="polite"
                    className="mt-6 text-center font-mono text-xs text-emerald-glow"
                  >
                    STEP {step + 1} / {layer.steps.length}
                  </p>
                  <p className="mt-2 text-center text-xs text-muted-foreground">
                    Illustrative architecture · capabilities under development
                  </p>
                </div>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </section>

      <Reveal className="border-y bg-charcoal">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-[.8fr_1.2fr]">
          <SectionTitle
            eyebrow="Practical by design"
            title="Build. Test. Repair. Improve."
            body="The synopsis proposes available components and a modular approach so individual systems can be refined as agricultural requirements become clearer."
          />
          <div className="space-y-6">
            {[
              {
                icon: Wrench,
                title: "Mechanical development",
                body: "CAD-led design of the chassis, steering knuckles, tie rods and servo mountings. Selected parts use 3D printing where suitable; strength, alignment and payload remain test priorities.",
              },
              {
                icon: Cpu,
                title: "Accessible electronics",
                body: "ESP32 control, geared motors, motor drivers, a battery and a steering actuator. Component selection considers repairability, availability and the needs of the field.",
              },
              {
                icon: ShieldCheck,
                title: "Safety-oriented development",
                body: "Emergency-stop functions, obstacle responses and operating safeguards are part of development. Early trials need controlled conditions and supervision.",
              },
            ].map((item) => (
              <article
                key={item.title}
                data-reveal
                className="flex gap-5 border-b pb-6 last:border-0"
              >
                <span className="grid size-12 shrink-0 place-items-center rounded-2xl bg-accent">
                  <item.icon className="size-6 text-emerald-glow" />
                </span>
                <div>
                  <h3 className="text-xl font-semibold">{item.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted-foreground">{item.body}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionTitle
            eyebrow="Validation before scale"
            title="What we intend to measure."
            body="Progress will be judged through simulation, supervised trials and farmer feedback. Accuracy, savings and productivity claims need experimental results."
          />
          <FlaskConical data-reveal className="size-14 text-emerald-glow" />
        </div>
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border bg-border md:grid-cols-2 lg:grid-cols-3">
          {VALIDATION.map(([title, body], i) => (
            <article key={title} data-reveal className="bg-background p-7 sm:p-9">
              <p className="font-mono text-xs text-emerald-glow">0{i + 1}</p>
              <h3 className="mt-5 text-xl font-semibold">{title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{body}</p>
            </article>
          ))}
        </div>
        <div data-reveal className="mt-10 flex flex-wrap gap-3">
          <CtaLink to="/intelligence">
            Explore intelligence concepts <ArrowRight className="size-4" />
          </CtaLink>
          <CtaLink to="/about" variant="ghost">
            Development roadmap
          </CtaLink>
        </div>
      </Reveal>
    </>
  );
}
