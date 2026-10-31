import { createFileRoute, Link } from "@tanstack/react-router";
import {
  ArrowRight,
  ArrowUpRight,
  Gamepad2,
  Navigation,
  Sprout,
  ChartNoAxesCombined,
  Users,
  BookOpen,
  ShieldCheck,
  ChevronDown,
  Tractor,
  Smartphone,
  Mail,
} from "lucide-react";
import { CtaLink, StatusTag } from "@/components/site/primitives";
import { AppShowcase } from "@/components/site/AppShowcase";
import hero from "@/assets/hero-rover.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Agrivion | Smart Farming, Made Accessible" },
      {
        name: "description",
        content:
          "Explore Agrivion's agricultural rover and farmer app in development. Field robotics, crop guidance, market information and farmer community, from sowing to selling.",
      },
      { property: "og:title", content: "Agrivion | Smart Farming, Made Accessible" },
    ],
  }),
  component: Home,
});
const services = [
  {
    icon: Sprout,
    title: "Crop & soil guidance",
    copy: "Crop selection, soil-health information and practical growing guidance.",
  },
  {
    icon: ShieldCheck,
    title: "Crop health support",
    copy: "Planned disease and pest assistance, with expert advice for follow-up.",
  },
  {
    icon: ChartNoAxesCombined,
    title: "Market information",
    copy: "Compare available market prices to support selling decisions.",
  },
  {
    icon: BookOpen,
    title: "Schemes & support",
    copy: "Find eligibility details, required documents and official scheme links.",
  },
  {
    icon: Users,
    title: "Experts & community",
    copy: "Ask questions, share experience and learn from other farmers.",
  },
  {
    icon: Smartphone,
    title: "Farm records",
    copy: "Bring observations, expenses and everyday farm information together.",
  },
];
const faqs = [
  [
    "Can I buy or use Agrivion today?",
    "Agrivion is being built and tested. The rover and farmer app are not available as launched products yet. Contact us for development enquiries or to discuss a possible supervised pilot.",
  ],
  [
    "What can I try on this website?",
    "You can explore the original design images and app screens, drive the simulated rover manually, and try a GPS route. Website examples use sample data and do not connect to hardware.",
  ],
  [
    "Who is Agrivion for?",
    "Agrivion is being developed for Indian farmers, FPOs, agricultural institutions and service providers. Field suitability, affordability and practical benefits will be evaluated through testing.",
  ],
];
function Home() {
  return (
    <>
      <section className="pro-home-hero">
        <div className="pro-container pro-hero-grid">
          <div className="pro-hero-copy">
            <p className="eyebrow">Technology for Indian agriculture</p>
            <h1>
              Smart farming.
              <br />
              <span>Made accessible.</span>
            </h1>
            <p className="pro-hero-description">
              A field rover and farmer app, designed to bring practical technology, useful
              information and farming support together.
            </p>
            <div className="pro-hero-actions">
              <CtaLink to="/rover">
                Explore the rover <ArrowRight size={17} />
              </CtaLink>
              <CtaLink to="/ecosystem" variant="ghost">
                Discover the farmer app
              </CtaLink>
            </div>
            <div className="pro-development-note">
              <StatusTag status="prototype" />
              <span>Building and testing, with farmers in mind.</span>
            </div>
          </div>
          <figure className="pro-hero-visual">
            <img
              src={hero}
              alt="Agrivion agricultural rover concept in a crop field"
              width={1536}
              height={1024}
              fetchPriority="high"
            />
            <div className="pro-visual-label">
              <Tractor size={20} />
              <div>
                <strong>Agrivion Rover</strong>
                <span>4WD · Manual & GPS modes in development</span>
              </div>
            </div>
            <figcaption>Concept illustration · Prototype in development</figcaption>
          </figure>
        </div>
      </section>
      <section className="pro-quick-links pro-container" aria-label="Start exploring">
        {[
          {
            to: "/dashboard",
            icon: Gamepad2,
            title: "Try the rover demo",
            copy: "Explore manual and GPS controls",
          },
          {
            to: "/ecosystem",
            icon: Smartphone,
            title: "Explore the farmer app",
            copy: "See planned tools and original screens",
          },
          {
            to: "/contact",
            icon: Mail,
            title: "Talk to Agrivion",
            copy: "Product questions and collaboration",
          },
        ].map((item) => (
          <Link to={item.to} className="pro-quick-link" key={item.to}>
            <span className="pro-icon-box">
              <item.icon size={23} />
            </span>
            <span>
              <strong>{item.title}</strong>
              <small>{item.copy}</small>
            </span>
            <ArrowRight size={18} />
          </Link>
        ))}
      </section>
      <section className="pro-container pro-section">
        <div className="pro-section-heading">
          <div className="pro-section-title">
            <p className="eyebrow">From sowing to selling</p>
            <h2>Support for the whole farming journey.</h2>
            <p>
              Farm work comes with labour pressure, crop risks and scattered information. Our
              connected platform is being developed around these everyday needs.
            </p>
          </div>
          <Link className="pro-text-link" to="/ecosystem">
            All app features <ArrowRight size={16} />
          </Link>
        </div>
        <div className="pro-service-grid">
          {services.map((item) => (
            <article className="pro-service-card" key={item.title}>
              <span className="pro-icon-box">
                <item.icon size={23} />
              </span>
              <h3>{item.title}</h3>
              <p>{item.copy}</p>
            </article>
          ))}
        </div>
        <p className="pro-section-note">
          App features are in development. Agricultural guidance and data services will require
          suitable sources and validation.
        </p>
      </section>
      <section className="pro-product-section">
        <div className="pro-container pro-section pro-rover-summary">
          <div className="pro-product-image">
            <img
              src="/media/rover-concept.webp"
              alt="Original Agrivion four-wheel agricultural rover concept from the project synopsis"
              width={885}
              height={680}
              loading="lazy"
            />
            <span>Original synopsis concept · AI-generated illustration</span>
          </div>
          <div>
            <p className="eyebrow">Agrivion Rover</p>
            <h2>Practical tools for fieldwork.</h2>
            <p className="pro-body">
              A modular 4WD rover for supervised development of spraying, inter-row cultivation and
              crop observation.
            </p>
            <div className="pro-mode-info">
              <Gamepad2 size={23} />
              <div>
                <h3>Manual control</h3>
                <p>
                  Control movement through a mobile interface. In the demo, hold a direction to move
                  and release to stop.
                </p>
              </div>
            </div>
            <div className="pro-mode-info">
              <Navigation size={23} />
              <div>
                <h3>GPS-based navigation</h3>
                <p>
                  Set a route or waypoints for guided movement. Navigation and safety remain under
                  testing.
                </p>
              </div>
            </div>
            <div className="pro-hero-actions">
              <CtaLink to="/dashboard">
                Try the interactive demo <ArrowRight size={16} />
              </CtaLink>
              <Link to="/rover" className="pro-text-link">
                Rover details <ArrowUpRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
      <AppShowcase />
      <section className="pro-container pro-section pro-faq">
        <div className="pro-section-title">
          <p className="eyebrow">Helpful to know</p>
          <h2>A few common questions.</h2>
          <p>Clear information about what we are building and what you can explore today.</p>
        </div>
        <div>
          {faqs.map(([title, text]) => (
            <details key={title}>
              <summary>
                {title}
                <ChevronDown size={18} />
              </summary>
              <p>{text}</p>
            </details>
          ))}
        </div>
      </section>
      <section className="pro-container pro-contact-banner">
        <div>
          <p className="eyebrow">Get in touch</p>
          <h2>Let’s make farming support more useful.</h2>
          <p>Have a question, a field need or an idea to share? We’d like to hear from you.</p>
        </div>
        <CtaLink to="/contact">
          Contact Agrivion <ArrowRight size={17} />
        </CtaLink>
      </section>
    </>
  );
}
