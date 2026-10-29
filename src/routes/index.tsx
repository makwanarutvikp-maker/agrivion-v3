import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ScrollText } from "@/components/site/MotionEffects";

import {
  ArrowUpRight,
  ArrowRight,
  Play,
  Sprout,
  Cpu,
  Users,
  Leaf,
  Navigation,
  Plus,
  Minus,
} from "lucide-react";
import { CtaLink, Reveal, SectionTitle, StatusTag } from "@/components/site/primitives";
import { DemoTeaser } from "@/components/site/DemoTeaser";
import { HeroV2, VisionMarquee } from "@/components/site/HeroV2";
import { AppShowcase } from "@/components/site/AppShowcase";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agrivion | From Sowing to Selling" },
      {
        name: "description",
        content:
          "A smart-farming ecosystem in development: agricultural robotics, practical guidance and a connected farmer community. Explore the Agrivion vision and interactive demos.",
      },
      { property: "og:title", content: "Agrivion — Smarter Fields. Stronger Farmers." },
    ],
  }),
  component: Home,
});

const pillars = [
  {
    icon: Cpu,
    title: "Work the field.",
    tag: "01 / AGRIVION ROVER",
    body: "A modular 4WD platform, with manual control and GPS navigation under development. Designed for spraying, cultivation and crop observation.",
    to: "/rover",
    image: "/media/rover-concept.webp",
    note: "AI-generated concept from the synopsis",
  },
  {
    icon: Leaf,
    title: "Know your crop.",
    tag: "02 / FARMER APP",
    body: "Bring crop selection, soil health, pest support, market information and government schemes into one accessible place.",
    to: "/ecosystem",
    image: "/media/app-overview.webp",
    note: "App interface concepts from the synopsis",
  },
  {
    icon: Users,
    title: "Grow together.",
    tag: "03 / KNOWLEDGE & COMMUNITY",
    body: "Connect with agricultural experts and fellow farmers. Share experiences, ask better questions and learn from the field.",
    to: "/ecosystem",
    image: "/media/app-overview.webp",
    note: "Expert and community services are planned",
  },
];
const challenges = [
  [
    "01",
    "Labour pressure",
    "Rising costs and fewer available workers make timely field operations harder.",
  ],
  [
    "02",
    "Crop uncertainty",
    "Disease, pests and changing field conditions demand timely observation.",
  ],
  [
    "03",
    "Access to technology",
    "High costs and complex equipment can put modern tools beyond small farms.",
  ],
  [
    "04",
    "Scattered information",
    "Soil advice, market prices and support schemes are difficult to navigate together.",
  ],
];
const faqs = [
  [
    "What stage is Agrivion at?",
    "Agrivion is in the building and testing phase. The rover and digital ecosystem are being developed. Website demonstrations use illustrative data and are not evidence of validated field performance.",
  ],
  [
    "How will the rover operate?",
    "The proposed rover has two modes: farmer-controlled manual operation through an app, and GPS-based navigation towards selected waypoints. Both require development, calibration and supervised testing.",
  ],
  [
    "Who is the platform designed for?",
    "Indian farmers, especially small and marginal farmers, as well as FPOs, agricultural institutions and service providers. The cost and shared-service model will be assessed through pilot validation.",
  ],
  [
    "How can I collaborate?",
    "We welcome technical mentoring, research collaboration, pilot locations and funding discussions. Use the collaboration page to prepare an email to the project proposer.",
  ],
];
function Home() {
  const [faq, setFaq] = useState<number | null>(0);
  return (
    <>
      <HeroV2 />
      <VisionMarquee />
      <Reveal className="paper-section">
        <div id="why" className="section-shell scroll-mt-28">
          <div className="grid gap-9 md:grid-cols-[.6fr_1.4fr]">
            <p data-reveal className="eyebrow">
              01 / THE REASON WE BUILD
            </p>
            <div>
              <ScrollText
                className="v2-reason-title"
                text="Farming is demanding. Support should be simpler."
              />
              <p data-reveal className="mt-6 max-w-xl text-lg leading-relaxed opacity-70">
                Small farms deserve tools that understand their reality. Agrivion starts with the
                everyday challenges of Indian agriculture.
              </p>
            </div>
          </div>
          <div className="mt-16 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {challenges.map(([num, title, body]) => (
              <article
                key={num}
                data-reveal
                className="v2-challenge border-t border-current/20 pt-6"
              >
                <span className="font-mono text-xs opacity-40">/{num}</span>
                <h3 className="mt-7 text-xl font-semibold">{title}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-65">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </Reveal>
      <Reveal className="section-shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionTitle
            eyebrow="02 / THE CONNECTED ECOSYSTEM"
            title="More than a rover."
            body="Technology in the field. Knowledge in your hand. A community by your side."
          />
          <Link to="/ecosystem" className="text-link">
            Meet the ecosystem <ArrowUpRight className="size-4" />
          </Link>
        </div>
        <div className="v2-pillar-grid">
          {pillars.map((item, i) => (
            <Link
              to={item.to}
              className="v2-pillar"
              key={item.title}
              data-reveal
              data-cursor="Explore"
            >
              <span className="v2-pillar-number" aria-hidden="true">
                0{i + 1}
              </span>
              <span className="v2-pillar-icon">
                <item.icon size={24} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.body}</p>
              <span className="v2-pillar-link">
                {i === 0 ? "EXPLORE THE ROVER" : "EXPLORE THE PLATFORM"}
                <ArrowUpRight size={18} />
              </span>
            </Link>
          ))}
        </div>
      </Reveal>
      <AppShowcase />
      <Reveal className="border-y bg-charcoal">
        <div className="section-shell grid items-center gap-14 lg:grid-cols-[.9fr_1.1fr]">
          <div>
            <p data-reveal className="eyebrow">
              03 / BUILT THROUGH ITERATION
            </p>
            <h2 data-reveal className="editorial-title mt-5">
              An idea.
              <br />
              Taking shape.
            </h2>
            <p data-reveal className="mt-6 max-w-md text-muted-foreground">
              A modular chassis. Carefully considered steering. A controller designed around the
              field. Explore the engineering work documented in our synopsis.
            </p>
            <div data-reveal className="mt-8 flex flex-wrap gap-3">
              <StatusTag status="prototype" />
              <span className="rounded-full border px-3 py-1 text-xs text-muted-foreground">
                CAD & interface concepts
              </span>
            </div>
            <div data-reveal className="mt-9">
              <CtaLink to="/rover">
                Inside the rover <ArrowRight className="size-4" />
              </CtaLink>
            </div>
          </div>
          <div
            data-reveal
            className="v2-engineering engineering-board relative overflow-hidden rounded-3xl"
          >
            <img
              src="/media/steering-assembly.webp"
              alt="Agrivion CAD steering assembly with steering knuckles and tie rod"
              loading="lazy"
              className="w-full object-contain"
            />
            <div className="flex flex-wrap justify-between gap-2 border-t border-black/10 p-5 font-mono text-[10px] uppercase tracking-widest text-[#355841]">
              <span>Steering assembly / Design study</span>
              <span>Source: project synopsis, p.7</span>
            </div>
          </div>
        </div>
      </Reveal>
      <Reveal className="section-shell">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          <div data-reveal className="v2-demo-preview order-2 relative lg:order-1">
            <DemoTeaser />
          </div>
          <div className="order-1 lg:order-2">
            <SectionTitle
              eyebrow="04 / TAKE THE CONTROLS"
              title="See the vision in motion."
              body="Explore manual driving and GPS waypoint missions in the interactive rover demo. Plan a route, follow progress and test the emergency stop."
            />
            <div data-reveal className="mt-8 grid grid-cols-2 gap-5 border-y py-6">
              <div>
                <Navigation className="size-5 text-emerald-glow" />
                <p className="mt-3 text-sm">Manual + GPS modes</p>
              </div>
              <div>
                <Sprout className="size-5 text-emerald-glow" />
                <p className="mt-3 text-sm">Illustrative farm data</p>
              </div>
            </div>
            <div data-reveal className="mt-8">
              <CtaLink to="/dashboard">
                <Play className="size-4" /> Launch rover demo
              </CtaLink>
            </div>
            <p data-reveal className="mt-5 text-xs text-muted-foreground">
              Browser simulation. No hardware connected.
            </p>
          </div>
        </div>
      </Reveal>
      <Reveal className="paper-section">
        <div className="section-shell">
          <p data-reveal className="eyebrow">
            05 / A PRACTICAL PATH FORWARD
          </p>
          <h2 data-reveal className="editorial-title mt-5 max-w-3xl">
            Build. Test. Learn.
            <br />
            Grow with the farmer.
          </h2>
          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {[
              [
                "I",
                "Field robotics",
                "Develop and validate the rover, manual control, navigation, safety and modular field tools.",
              ],
              [
                "II",
                "Farm intelligence",
                "Integrate computer vision, satellite monitoring and georeferenced crop observations.",
              ],
              [
                "+",
                "Connected support",
                "Bring guidance, markets, schemes, expert access and community into the wider platform.",
              ],
            ].map(([n, t, b]) => (
              <div key={n} data-reveal className="v2-challenge border-t border-current/20 pt-6">
                <span className="font-display text-5xl text-forest-soft">{n}</span>
                <h3 className="mt-6 text-xl">{t}</h3>
                <p className="mt-3 text-sm leading-relaxed opacity-65">{b}</p>
              </div>
            ))}
          </div>
          <Link
            to="/about"
            className="mt-10 inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-8"
          >
            Explore the development plan <ArrowUpRight className="size-4" />
          </Link>
        </div>
      </Reveal>
      <Reveal className="section-shell grid gap-12 lg:grid-cols-[.8fr_1.2fr]">
        <SectionTitle eyebrow="A FEW THINGS TO KNOW" title="Built on clear expectations." />
        <div>
          {faqs.map(([q, a], i) => (
            <div key={q} data-reveal className="border-b">
              <h3>
                <button
                  onClick={() => setFaq(faq === i ? null : i)}
                  aria-expanded={faq === i}
                  aria-controls={`faq-${i}`}
                  className="flex w-full items-center justify-between gap-4 py-6 text-left text-base font-medium"
                >
                  {q}
                  {faq === i ? (
                    <Minus className="size-4 shrink-0" />
                  ) : (
                    <Plus className="size-4 shrink-0" />
                  )}
                </button>
              </h3>
              <AnimatePresence initial={false}>
                {faq === i && (
                  <motion.div
                    id={`faq-${i}`}
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <p className="pb-6 text-sm leading-relaxed text-muted-foreground">{a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          ))}
        </div>
      </Reveal>
      <section className="collaboration-section relative overflow-hidden">
        <div className="section-shell relative">
          <p className="eyebrow">LET’S BUILD WHAT COMES NEXT</p>
          <h2 className="v2-collab-word mt-6 max-w-6xl">
            Better decisions.
            <br />
            Stronger farmers.
          </h2>
          <div className="mt-8 flex flex-wrap items-center gap-7">
            <CtaLink to="/contact">
              Start a conversation <ArrowUpRight className="size-4" />
            </CtaLink>
            <a
              href="/Agrivion-Synopsis.pdf"
              download
              className="text-sm text-muted-foreground underline underline-offset-4"
            >
              Download project synopsis
            </a>
          </div>
          <p className="mt-10 max-w-xl text-sm text-muted-foreground">
            Seeking research collaborators, technical mentors, pilot partners and conversations that
            help the next stage of development.
          </p>
        </div>
      </section>
    </>
  );
}
