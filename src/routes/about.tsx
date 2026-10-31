import { createFileRoute } from "@tanstack/react-router";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  BrainCircuit,
  Check,
  ChevronDown,
  Download,
  Globe2,
  GraduationCap,
  HandCoins,
  Leaf,
  MapPin,
  Microscope,
  Puzzle,
  Rocket,
  ShieldCheck,
  Sprout,
  Tractor,
  Users,
  Wrench,
} from "lucide-react";
import { CtaLink, PageHero, Reveal, SectionTitle } from "@/components/site/primitives";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Our Story & Roadmap | Agrivion" },
      {
        name: "description",
        content:
          "Agrivion's agricultural roots, two-phase rover and farm-intelligence roadmap, development methodology, project proposer and proposed business model.",
      },
    ],
  }),
  component: About,
});

const PHASES = [
  {
    n: "01",
    icon: Tractor,
    title: "Build the field platform.",
    label: "Rover development & validation",
    description:
      "A compact 4WD rover, beginning with remote control and progressing towards GPS/GNSS waypoint navigation and suitable field operations.",
    objectives: [
      "Develop a compact 4WD platform for suitable Indian field conditions.",
      "Integrate motor control, Ackermann steering and GPS/GNSS navigation.",
      "Develop interchangeable spraying and inter-row cultivation tools; investigate crop-specific harvesting later.",
      "Evaluate mobility, navigation error, operating efficiency and safety through supervised trials.",
      "Use available components to pursue affordability, repairability and adaptability.",
    ],
  },
  {
    n: "02",
    icon: BrainCircuit,
    title: "Connect field intelligence.",
    label: "AI, satellite data & farm monitoring",
    description:
      "Bring camera observations, agricultural sensors, georeferenced data and satellite insights together in a farmer-focused monitoring platform.",
    objectives: [
      "Evaluate crop-row detection, weed identification and preliminary disease-symptom recognition.",
      "Process suitable satellite imagery and vegetation indices to observe crop conditions and field variability.",
      "Combine GPS-tagged rover observations with satellite-derived information.",
      "Develop a mobile or web dashboard for rover status, crop observations and field operations.",
      "Progress towards a scalable platform for precise, location-specific farming decisions.",
    ],
  },
];

const METHOD = [
  {
    title: "Mechanical design & fabrication",
    body: "Design the chassis, 4WD layout, steering knuckles, tie rods and servo mounts in CAD. Use selected 3D-printed parts where appropriate; evaluate strength, ground clearance, steering geometry, traction and payload.",
  },
  {
    title: "Electronic control & integration",
    body: "Integrate an ESP32, motor drivers, geared motors, power supply and steering actuator. Develop manual control, speed calibration and emergency-stop functions.",
  },
  {
    title: "Simulation & navigation",
    body: "Use the app or web dashboard to simulate movement and steering. Develop GPS waypoint navigation, route following and obstacle response, then evaluate turning radius, steering accuracy and navigation performance.",
  },
  {
    title: "Agricultural implements",
    body: "Begin with a spraying module and inter-row cultivator. Investigate crop-specific harvesting only after assessing the rover's power, traction, payload and mechanical feasibility.",
  },
  {
    title: "Supervised field validation",
    body: "Measure mobility, battery endurance, navigation error, operating speed, spraying performance, cultivation effectiveness and crop damage in suitable plots. Refine the design from the results.",
  },
  {
    title: "Computer vision & sensors",
    body: "Integrate an onboard camera and suitable crop or environmental sensors. Develop and evaluate models for row detection, weeds and preliminary disease symptoms across different field conditions.",
  },
  {
    title: "Satellite monitoring",
    body: "Process suitable imagery, such as Sentinel-2, into vegetation-index maps including NDVI where appropriate. Identify changing patterns and areas needing closer field inspection.",
  },
  {
    title: "Rover + satellite integration",
    body: "Combine georeferenced camera images and rover observations with satellite maps. Evaluate the usefulness, uncertainty and limitations of the combined information.",
  },
  {
    title: "Mobile / web platform",
    body: "Bring sensor readings, routes, crop observations and satellite maps into the dashboard. Develop storage and synchronisation for historical comparison and future analysis.",
  },
  {
    title: "Integrated trials & business validation",
    body: "Test reliability, detection performance, data quality, maintenance and operational efficiency. Gather farmer feedback, estimate manufacturing and running costs, and evaluate realistic service and sales opportunities.",
  },
];

const BUSINESS = [
  {
    icon: Tractor,
    title: "Rover sales & integrated solutions",
    body: "Suitable rover, navigation and implement packages for universities, FPOs, agri-tech teams and farming enterprises.",
  },
  {
    icon: Sprout,
    title: "Agricultural operations as a service",
    body: "Spraying, inter-row cultivation and scouting services where validated capabilities match the crop and field.",
  },
  {
    icon: Microscope,
    title: "Precision monitoring services",
    body: "Camera observations, AI-assisted crop analysis, vegetation maps and georeferenced field reports.",
  },
  {
    icon: Wrench,
    title: "Customisation, maintenance & upgrades",
    body: "Crop-specific implements, sensor integration, repairs, replacement parts and technical support.",
  },
  {
    icon: Globe2,
    title: "Digital farm platform",
    body: "Field maps, historical monitoring and operational planning, with subscriptions where customer demand supports them.",
  },
];

function About() {
  return (
    <>
      <PageHero
        eyebrow="Our story / Our direction"
        title="About Agrivion"
        intro="Agrivion begins with a simple ambition: make modern farming tools and useful knowledge more accessible to the people who grow our food."
      >
        <div className="flex flex-wrap gap-3">
          <a
            href="#development"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-gradient px-5 py-3 text-sm font-semibold text-primary-foreground"
          >
            Explore the roadmap <ArrowDown className="size-4" />
          </a>
          <a
            href="/Agrivion-Synopsis.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border px-5 py-3 text-sm transition hover:bg-accent"
          >
            <Download className="size-4" /> Read the synopsis
          </a>
        </div>
      </PageHero>

      <Reveal className="mx-auto grid max-w-7xl gap-10 px-5 pb-16 md:grid-cols-[1.2fr_0.8fr] md:px-8 md:pb-20">
        <div data-reveal>
          <p className="eyebrow">The ambition</p>
          <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
            A complete support system.
            <br />
            <span className="text-emerald-glow">From sowing to selling.</span>
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground">
            Farmers face rising labour costs, worker shortages, crop diseases, pest attacks and
            difficult access to affordable technology. Reliable guidance, soil-health information,
            market visibility and support schemes can be just as important as a machine in the
            field.
          </p>
          <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
            Our wider vision brings a field rover, crop intelligence, agricultural experts and a
            farmer community onto one platform. We are building and testing the foundations, with
            each capability progressing through development and validation.
          </p>
        </div>
        <div data-reveal className="grid gap-4 self-start">
          {[
            {
              icon: HandCoins,
              title: "Accessible by design",
              body: "Cost-conscious components and a modular platform, with real affordability still to be validated.",
            },
            {
              icon: Puzzle,
              title: "Adaptable by nature",
              body: "Repairable parts and interchangeable tools shaped around local agricultural needs.",
            },
            {
              icon: ShieldCheck,
              title: "Evidence before promises",
              body: "Supervised trials and measured performance will guide what we can reliably offer.",
            },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border bg-card/40 p-6">
              <item.icon className="size-6 text-emerald-glow" />
              <h3 className="mt-4 text-base font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </div>
          ))}
        </div>
      </Reveal>

      <section id="development" className="scroll-mt-28 border-y bg-charcoal">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
          <SectionTitle
            eyebrow="Development roadmap"
            title="Two phases. One connected vision."
            body="The engineering programme moves from a dependable rover to an integrated monitoring platform. Dates and performance targets depend on validation."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            {PHASES.map((phase) => (
              <article
                key={phase.n}
                className="relative overflow-hidden rounded-[2rem] border bg-background/60 p-7 md:p-10"
              >
                <span
                  aria-hidden
                  className="absolute -right-2 top-0 font-display text-[10rem] leading-none text-emerald/5"
                >
                  {phase.n}
                </span>
                <phase.icon className="relative size-8 text-emerald-glow" />
                <p className="eyebrow relative mt-8">Phase {phase.n} / Building & testing</p>
                <h3 className="relative mt-3 text-2xl font-semibold md:text-3xl">{phase.title}</h3>
                <p className="relative mt-2 text-sm text-emerald-glow">{phase.label}</p>
                <p className="relative mt-5 leading-relaxed text-muted-foreground">
                  {phase.description}
                </p>
                <details className="group relative mt-7 border-t pt-5">
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-3 text-sm font-medium">
                    Explore phase objectives{" "}
                    <ChevronDown className="size-4 transition-transform group-open:rotate-180" />
                  </summary>
                  <ul className="mt-5 space-y-3">
                    {phase.objectives.map((objective) => (
                      <li
                        key={objective}
                        className="flex gap-3 text-sm leading-relaxed text-muted-foreground"
                      >
                        <Check className="mt-0.5 size-4 shrink-0 text-emerald-glow" />
                        {objective}
                      </li>
                    ))}
                  </ul>
                </details>
              </article>
            ))}
          </div>
          <div className="mt-6 flex flex-col gap-5 rounded-2xl border border-emerald/25 bg-accent/20 p-6 md:flex-row md:items-center md:justify-between">
            <div>
              <p className="text-sm font-medium">The wider ecosystem</p>
              <p className="mt-2 max-w-3xl text-sm leading-relaxed text-muted-foreground">
                Alongside the engineering roadmap: crop and soil guidance, disease/pest assistance,
                market prices, schemes, expert advice, community knowledge and farm records.
              </p>
            </div>
            <CtaLink to="/ecosystem" variant="ghost">
              Explore the platform <ArrowRight className="size-4" />
            </CtaLink>
          </div>
        </div>
      </section>

      <Reveal className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr]">
          <div data-reveal className="self-start lg:sticky lg:top-32">
            <p className="eyebrow">From idea to evidence</p>
            <h2 className="mt-4 text-3xl font-semibold leading-tight md:text-4xl">
              Ten steps.
              <br />
              Measured progress.
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              A structured methodology connects mechanical design, real field work and business
              learning. Open a step to see the plan.
            </p>
            <p className="mt-6 rounded-xl border p-4 text-xs leading-relaxed text-muted-foreground">
              Accuracy, cost savings, productivity and agricultural benefits will be based on
              experimental results. No verified field-performance results are claimed here.
            </p>
          </div>
          <div data-reveal>
            {METHOD.map((step, index) => (
              <details key={step.title} className="group border-b first:border-t">
                <summary className="flex cursor-pointer list-none items-center gap-4 py-5">
                  <span className="font-mono text-xs text-emerald-glow">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="flex-1 text-sm font-medium md:text-base">{step.title}</span>
                  <ChevronDown className="size-4 shrink-0 text-muted-foreground transition-transform group-open:rotate-180" />
                </summary>
                <p className="pb-6 pl-8 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </details>
            ))}
          </div>
        </div>
      </Reveal>

      <section className="border-y bg-charcoal">
        <div className="mx-auto max-w-7xl px-5 py-16 md:px-8">
          <SectionTitle
            eyebrow="The impact we are working towards"
            title="Technology with a farmer's purpose."
          />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              {
                icon: Tractor,
                title: "Less repetitive workload",
                body: "Support timely field tasks and reduce the burden of selected repetitive operations.",
              },
              {
                icon: Leaf,
                title: "More considered inputs",
                body: "Observe field variability and work towards better-targeted use of farm resources.",
              },
              {
                icon: Users,
                title: "Stronger decisions",
                body: "Connect practical knowledge, monitoring, market information and farmer experiences.",
              },
              {
                icon: GraduationCap,
                title: "Local skills & opportunity",
                body: "Create learning opportunities around agricultural science, repair, robotics and enterprise.",
              },
            ].map((item) => (
              <div key={item.title} className="rounded-2xl border bg-background/50 p-6">
                <item.icon className="size-7 text-emerald-glow" />
                <h3 className="mt-6 text-base font-medium">{item.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reveal className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <SectionTitle
          eyebrow="Proposed business model"
          title="A platform built to grow sustainably."
          body="Five potential paths to commercialisation, to be tested against reliability, customer needs and real operating costs."
        />
        <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {BUSINESS.map((item, index) => (
            <article data-reveal key={item.title} className="rounded-2xl border bg-card/40 p-7">
              <div className="flex items-center justify-between">
                <item.icon className="size-6 text-emerald-glow" />
                <span className="font-mono text-xs text-muted-foreground">0{index + 1}</span>
              </div>
              <h3 className="mt-7 text-lg font-medium">{item.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
            </article>
          ))}
          <div
            data-reveal
            className="flex flex-col justify-center rounded-2xl border border-emerald/30 bg-accent/20 p-7"
          >
            <HandCoins className="size-7 text-emerald-glow" />
            <p className="mt-5 text-base font-medium">Affordability is a validation goal.</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              A detailed bill of materials, manufacturing quotations and field operating expenses
              are needed before setting a credible selling price or break-even point.
            </p>
          </div>
        </div>
      </Reveal>

      <section className="border-y bg-charcoal">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-16 md:px-8 lg:grid-cols-[1.15fr_0.85fr]">
          <div>
            <p className="eyebrow">Scalability & future scope</p>
            <h2 className="mt-4 text-3xl font-semibold md:text-4xl">
              Designed to evolve.
              <br />
              <span className="text-emerald-glow">Grounded in field reality.</span>
            </h2>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Progress from prototype validation to autonomous operations, intelligent monitoring,
              integrated precision agriculture and commercially viable pilots. Expansion across
              Gujarat and other regions will require crop-specific testing.
            </p>
            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Improved GNSS & obstacle response",
                "Weed-specific & variable-rate spraying",
                "Cloud records & fleet coordination",
                "Crop-specific attachments",
                "Solar-assisted charging feasibility",
                "Regional crops & service networks",
              ].map((item) => (
                <div key={item} className="flex items-start gap-2 rounded-xl border p-3 text-sm">
                  <Check className="mt-0.5 size-4 shrink-0 text-emerald-glow" />
                  {item}
                </div>
              ))}
            </div>
            <p className="mt-5 text-xs leading-relaxed text-muted-foreground">
              Future directions are subject to technical and economic feasibility, suitable
              traction, clearance, environmental protection and local operating conditions.
            </p>
          </div>
          <div className="self-center rounded-[2rem] border bg-background/60 p-7 md:p-9">
            <p className="eyebrow">Immediate priority</p>
            <Rocket className="mt-6 size-9 text-emerald-glow" />
            <h3 className="mt-6 text-2xl font-semibold">Prove one useful job, well.</h3>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              Build a mechanically dependable prototype, test it through simulation and supervised
              trials, and identify one practical application with measurable farmer value.
            </p>
            <a
              href="/Agrivion-Synopsis.pdf"
              className="mt-6 inline-flex items-center gap-2 text-sm text-emerald-glow hover:underline"
            >
              Read the full development proposal <ArrowUpRight className="size-4" />
            </a>
          </div>
        </div>
      </section>

      <Reveal className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-20">
        <div
          data-reveal
          className="grid gap-8 rounded-[2rem] border bg-card/40 p-7 md:p-12 lg:grid-cols-[0.7fr_1.3fr]"
        >
          <div>
            <span className="grid size-24 place-items-center rounded-3xl bg-emerald-gradient font-display text-3xl text-primary-foreground">
              BM
            </span>
            <p className="eyebrow mt-7">Agrivion / Project proposer</p>
            <h2 className="mt-3 text-2xl font-semibold">Bhavesh Makwana</h2>
            <p className="mt-3 flex items-center gap-2 text-sm text-muted-foreground">
              <MapPin className="size-4 text-emerald-glow" /> Anand, Gujarat
            </p>
          </div>
          <div className="self-center">
            <p className="text-xl leading-relaxed md:text-2xl">
              Agricultural understanding at the centre of the engineering.
            </p>
            <p className="mt-5 leading-relaxed text-muted-foreground">
              Proposed by Bhavesh Makwana, B.Sc. (Hons.) Agriculture, B.A. College of Agriculture,
              Anand Agricultural University. Agrivion connects agricultural science with robotics,
              embedded systems and precision-farming ideas.
            </p>
            <p className="mt-4 leading-relaxed text-muted-foreground">
              The project seeks technical mentoring, farmer participation and practical business
              validation as it develops towards an agricultural technology startup.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <CtaLink to="/contact">
                Connect with Bhavesh <ArrowRight className="size-4" />
              </CtaLink>
              <a
                href="mailto:makwanabhaveshp@gmail.com"
                className="self-center break-all text-sm text-muted-foreground hover:text-emerald-glow"
              >
                makwanabhaveshp@gmail.com
              </a>
            </div>
          </div>
        </div>
      </Reveal>
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8">
        <details className="rounded-2xl border bg-card/30 p-6">
          <summary className="text-sm font-medium">
            Research reference from the synopsis: agricultural robotics market
          </summary>
          <p className="mt-4 max-w-3xl text-sm leading-relaxed text-muted-foreground">
            The original growth illustration is retained here for completeness. Its market estimates
            and projections have not been independently verified and are not Agrivion revenue
            forecasts or validated market-size claims.
          </p>
          <a
            href="/media/market-growth.webp"
            target="_blank"
            rel="noreferrer"
            className="mt-6 block rounded-xl border bg-white p-3"
          >
            <img
              src="/media/market-growth.webp"
              alt="Original agricultural robotics market growth illustration from page 13 of the synopsis; estimates are unverified"
              loading="lazy"
              className="mx-auto w-full max-w-4xl"
            />
          </a>
          <p className="mt-3 text-xs text-muted-foreground">
            Source: Agrivion Synopsis V01, page 13. Open the illustration to inspect it at full
            size.
          </p>
        </details>
      </section>
    </>
  );
}
