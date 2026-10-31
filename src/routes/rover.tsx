import { createFileRoute } from "@tanstack/react-router";
import { useRef, useState } from "react";
import {
  ArrowRight,
  ArrowUpRight,
  Cpu,
  Droplets,
  Expand,
  Gamepad2,
  Navigation,
  ScanEye,
  ShieldCheck,
  Shovel,
  X,
} from "lucide-react";
import { CtaLink, PageHero, Reveal, SectionTitle, StatusTag } from "@/components/site/primitives";
import { EngineeringStudy } from "@/components/site/EngineeringStudy";
import { RoverStage } from "@/components/site/RoverStage";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export const Route = createFileRoute("/rover")({
  head: () => ({
    meta: [
      { title: "Agrivion Rover | Engineering for the field" },
      {
        name: "description",
        content:
          "Explore Agrivion's 4WD rover development, original CAD studies, manual and GPS operating modes, modular tools and validation plan.",
      },
    ],
  }),
  component: RoverPage,
});

const GALLERY = [
  {
    src: "/media/steering-assembly.webp",
    title: "Steering assembly",
    caption:
      "Front steering geometry, tie rod and wheel assemblies. CAD study from the project synopsis.",
  },
  {
    src: "/media/cad-components.webp",
    title: "The details behind the drive",
    caption: "Component-level mechanical design studies from the project synopsis.",
  },
  {
    src: "/media/chassis-cad.webp",
    title: "Chassis study",
    caption: "Early platform layout. Dimensions and field performance remain under development.",
  },
  {
    src: "/media/rover-concept.webp",
    title: "The original rover vision",
    caption:
      "AI-generated concept illustration from the project synopsis. A design direction for the platform in development.",
  },
];
const TOOLS = [
  {
    id: "spray",
    icon: Droplets,
    title: "Spraying",
    body: "A modular spraying system for selected row operations, beginning with supervised testing of application consistency and coverage.",
    note: "Initial implement development",
    tests: "Spray distribution · flow control · crop compatibility",
  },
  {
    id: "cultivate",
    icon: Shovel,
    title: "Inter-row cultivation",
    body: "A cultivation attachment designed around crop-row spacing, traction and safe clearance from plants.",
    note: "Initial implement development",
    tests: "Working depth · traction · crop damage",
  },
  {
    id: "scout",
    icon: ScanEye,
    title: "Crop scouting",
    body: "Future camera and sensor payloads for repeatable observations, with position-tagged data feeding the farming platform.",
    note: "Phase II integration",
    tests: "Image quality · location accuracy · useful observations",
  },
];

function RoverPage() {
  const dialog = useRef<HTMLDialogElement>(null);
  const [selected, setSelected] = useState(0);
  return (
    <>
      <PageHero
        eyebrow="01 / Field robotics"
        title="Agrivion agricultural rover"
        intro="A compact, modular 4WD platform. Agrivion brings agricultural knowledge and practical engineering together, one tested capability at a time."
      >
        <div className="flex flex-wrap items-center gap-4">
          <StatusTag status="prototype" />
          <span className="text-sm text-muted-foreground">Specifications under validation</span>
        </div>
      </PageHero>

      <Reveal className="mx-auto max-w-7xl px-5 md:px-8">
        <div
          data-reveal
          className="grid overflow-hidden rounded-[2rem] border bg-card lg:grid-cols-[1.35fr_1fr]"
        >
          <div className="p-4 sm:p-6">
            <EngineeringStudy />
          </div>
          <div className="flex flex-col justify-center p-7 sm:p-10">
            <p className="eyebrow">A foundation, designed to evolve</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
              Four driven wheels.
              <br />
              One adaptable platform.
            </h2>
            <p className="mt-5 text-muted-foreground">
              The development starts with a reliable chassis, calibrated steering and accessible
              electronics. Agricultural tools and intelligent sensing build on that foundation.
            </p>
            <dl className="mt-8 grid grid-cols-2 gap-x-6 gap-y-5 border-t pt-6">
              {[
                ["Drive architecture", "4WD"],
                ["Steering design", "Ackermann"],
                ["Control platform", "ESP32-based"],
                ["Development approach", "Modular"],
              ].map(([label, value]) => (
                <div key={label}>
                  <dt className="text-xs text-muted-foreground">{label}</dt>
                  <dd className="mt-1 font-semibold">{value}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <SectionTitle
          eyebrow="Two operating modes"
          title="From hands-on control to planned routes."
          body="Both modes are in development. The interactive website demonstrates the intended experience using simulated movement."
        />
        <div className="mt-12 grid gap-5 md:grid-cols-2">
          {[
            {
              icon: Gamepad2,
              number: "01",
              title: "Manual mode",
              text: "Control the rover through a mobile or web interface. Develop and test drive commands, steering calibration and an immediate stop before moving into automated operation.",
              detail: "Operator-directed movement",
            },
            {
              icon: Navigation,
              number: "02",
              title: "GPS-based mode",
              text: "Set waypoints and work towards guided movement between them. Route following, navigation error and obstacle responses will be evaluated in suitable, supervised field trials.",
              detail: "Waypoint navigation under development",
            },
          ].map((mode) => (
            <article
              data-reveal
              key={mode.number}
              className="group relative overflow-hidden rounded-3xl border bg-card/50 p-8 md:p-10"
            >
              <span className="absolute right-6 top-2 font-display text-8xl font-semibold text-foreground/5">
                {mode.number}
              </span>
              <mode.icon className="size-9 text-emerald-glow transition-transform duration-500 group-hover:-translate-y-1" />
              <h3 className="mt-6 text-2xl font-semibold">{mode.title}</h3>
              <p className="mt-4 leading-relaxed text-muted-foreground">{mode.text}</p>
              <p className="mt-8 border-t pt-4 font-mono text-xs text-emerald-glow">
                {mode.detail}
              </p>
            </article>
          ))}
        </div>
        <div data-reveal className="mt-8">
          <CtaLink to="/dashboard">
            Try both modes <ArrowRight className="size-4" />
          </CtaLink>
        </div>
      </Reveal>

      <section className="border-y bg-charcoal">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <Reveal>
            <SectionTitle
              eyebrow="Engineering notebook"
              title="See the thinking behind the machine."
              body="Original studies from the Agrivion synopsis. Open an image to explore the details."
            />
          </Reveal>
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            {GALLERY.map((item, i) => (
              <button
                key={item.src}
                onClick={() => {
                  setSelected(i);
                  dialog.current?.showModal();
                }}
                className="group overflow-hidden rounded-3xl border bg-card text-left transition hover:border-emerald/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                aria-label={`Enlarge ${item.title}`}
              >
                <div className="relative aspect-[4/3] bg-[#f1f3ef] p-5">
                  <img
                    src={item.src}
                    alt={item.title}
                    loading="lazy"
                    className="size-full object-contain transition-transform duration-700 group-hover:scale-105"
                  />
                  <span className="absolute right-4 top-4 grid size-9 place-items-center rounded-full bg-[#143d2b] text-white">
                    <Expand className="size-4" />
                  </span>
                </div>
                <div className="p-6">
                  <h3 className="text-lg font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {item.caption}
                  </p>
                </div>
              </button>
            ))}
          </div>
          <dialog
            ref={dialog}
            aria-labelledby="engineering-image-title"
            className="m-auto max-h-[92vh] w-[min(1100px,92vw)] overflow-auto rounded-3xl border bg-card p-5 text-foreground shadow-2xl backdrop:bg-black/80"
            onClick={(event) => {
              if (event.target === event.currentTarget) dialog.current?.close();
            }}
          >
            <div className="mb-4 flex items-center justify-between gap-4">
              <h3 id="engineering-image-title" className="font-semibold">
                {GALLERY[selected]!.title}
              </h3>
              <button
                onClick={() => dialog.current?.close()}
                aria-label="Close image"
                className="grid size-11 shrink-0 place-items-center rounded-full border hover:bg-accent"
              >
                <X className="size-5" />
              </button>
            </div>
            <img
              src={GALLERY[selected]!.src}
              alt={GALLERY[selected]!.title}
              className="max-h-[65vh] w-full rounded-xl bg-[#f1f3ef] object-contain"
            />
            <p className="mt-4 text-sm text-muted-foreground">{GALLERY[selected]!.caption}</p>
          </dialog>
        </div>
      </section>

      <Reveal className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[.8fr_1.2fr]">
          <SectionTitle
            eyebrow="Modular by intent"
            title="Change the task. Keep the foundation."
            body="Interchangeable implements are being developed around the rover's available power, payload, traction and field suitability."
          />
          <Tabs defaultValue="spray" className="min-w-0">
            <TabsList
              aria-label="Agricultural attachments"
              className="grid h-auto w-full grid-cols-3 gap-1 rounded-2xl p-1.5"
            >
              {TOOLS.map((tool) => (
                <TabsTrigger
                  key={tool.id}
                  value={tool.id}
                  className="min-h-12 whitespace-normal rounded-xl px-2"
                >
                  {tool.title}
                </TabsTrigger>
              ))}
            </TabsList>
            {TOOLS.map((tool) => (
              <TabsContent
                key={tool.id}
                value={tool.id}
                className="mt-5 rounded-3xl border bg-card/60 p-8"
              >
                <tool.icon className="size-12 text-emerald-glow" />
                <p className="mt-6 eyebrow">{tool.note}</p>
                <h3 className="mt-3 text-3xl font-semibold">{tool.title}</h3>
                <p className="mt-4 leading-relaxed text-muted-foreground">{tool.body}</p>
                <div className="mt-8 border-t pt-5">
                  <span className="text-xs uppercase tracking-widest text-muted-foreground">
                    Validation focus
                  </span>
                  <p className="mt-2 text-sm">{tool.tests}</p>
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
        <p className="mt-10 rounded-2xl border border-warning/25 bg-warning/5 px-6 py-4 text-sm text-muted-foreground">
          <strong className="text-warning">Future exploration:</strong> crop-specific harvesting
          will depend on mechanical feasibility, power, payload and crop requirements.
        </p>
      </Reveal>

      <Reveal className="border-y bg-charcoal">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-16 md:px-8 lg:grid-cols-[.8fr_1.2fr]">
          <div>
            <SectionTitle
              eyebrow="Controller design"
              title="A field mission, in your hands."
              body="The supplied interface studies explore field boundaries, row width, coverage routes and an emergency stop. These screens document the intended control experience."
            />
            <a
              href="/Agrivion-Synopsis.pdf"
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex min-h-11 items-center gap-2 text-sm text-emerald-glow underline underline-offset-4"
            >
              Read the complete synopsis <ArrowUpRight className="size-4" />
            </a>
          </div>
          <div data-reveal className="grid grid-cols-3 items-start gap-3 sm:gap-5">
            {[1, 2, 3].map((n) => (
              <figure key={n}>
                <img
                  src={`/media/controller-${n}.webp`}
                  alt={
                    [
                      "Agrivion controller: select a field boundary",
                      "Agrivion controller: generated coverage route",
                      "Agrivion controller: mission controls",
                    ][n - 1]
                  }
                  loading="lazy"
                  className="w-full rounded-xl border bg-black shadow-xl"
                />
                <figcaption className="mt-3 text-center font-mono text-[10px] text-muted-foreground">
                  0{n} / {["BOUNDARY", "COVERAGE", "CONTROL"][n - 1]}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </Reveal>

      <Reveal className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="grid items-start gap-12 lg:grid-cols-2">
          <div>
            <SectionTitle
              eyebrow="Explore the form"
              title="A concept you can turn around."
              body="Drag to orbit this simplified 3D study. The final geometry will follow mechanical development and field testing."
            />
            <div data-reveal className="mt-8 flex items-start gap-3 rounded-2xl border p-5">
              <ShieldCheck className="size-6 shrink-0 text-emerald-glow" />
              <p className="text-sm text-muted-foreground">
                Safety development includes emergency-stop functions, obstacle-response mechanisms
                and supervised operation. Physical safeguards require validation.
              </p>
            </div>
          </div>
          <div data-reveal className="overflow-hidden rounded-3xl border">
            <RoverStage className="h-[400px] w-full" />
            <p className="border-t p-4 text-center font-mono text-[10px] uppercase tracking-wider text-muted-foreground">
              Interactive concept model · not final hardware
            </p>
          </div>
        </div>
        <div data-reveal className="mt-14 flex flex-wrap gap-3">
          <CtaLink to="/technology">
            Explore the technology <Cpu className="size-4" />
          </CtaLink>
          <CtaLink to="/contact" variant="ghost">
            Discuss a field trial <ArrowRight className="size-4" />
          </CtaLink>
        </div>
      </Reveal>
    </>
  );
}
