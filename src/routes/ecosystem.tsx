import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import {
  ArrowDown,
  ArrowRight,
  ArrowUpRight,
  Bookmark,
  Bug,
  Check,
  CircleHelp,
  ClipboardList,
  Landmark,
  MessageCircle,
  Plus,
  ScanEye,
  Sprout,
  TrendingUp,
  Users,
  Wallet,
} from "lucide-react";
import { AppShowcase } from "@/components/site/AppShowcase";
import { CtaLink, PageHero, SectionTitle } from "@/components/site/primitives";

export const Route = createFileRoute("/ecosystem")({
  head: () => ({
    meta: [
      { title: "Farmer App & Features | Agrivion" },
      {
        name: "description",
        content:
          "Explore the planned Agrivion farmer app: crop and soil guidance, monitoring, market prices, government schemes, expert advice, community and farm records.",
      },
    ],
  }),
  component: Ecosystem,
});

const SERVICES = [
  {
    id: "guidance",
    label: "Crop & soil guidance",
    icon: Sprout,
    body: "Crop-selection information, soil-test records and planning checklists for local farming conditions.",
  },
  {
    id: "monitoring",
    label: "Crop monitoring",
    icon: ScanEye,
    body: "Field observations and planned rover and satellite monitoring to help identify areas that need a closer look.",
  },
  {
    id: "disease",
    label: "Disease & pest support",
    icon: Bug,
    body: "Document crop symptoms, explore planned AI assistance and seek advice on suitable next steps.",
  },
  {
    id: "markets",
    label: "Market prices",
    icon: TrendingUp,
    body: "Compare available prices across markets to help decide when and where to sell produce.",
  },
  {
    id: "schemes",
    label: "Government schemes",
    icon: Landmark,
    body: "Find relevant schemes, eligibility information, required documents and official application links.",
  },
  {
    id: "experts",
    label: "Agricultural experts",
    icon: MessageCircle,
    body: "A planned consultation service for questions about crops, pests, soil health and farm operations.",
  },
  {
    id: "community",
    label: "Farmer community",
    icon: Users,
    body: "Share practical experience, discuss local farming challenges and learn from other growers.",
  },
  {
    id: "accounts",
    label: "Farm records",
    icon: Wallet,
    body: "Keep income and expenses alongside crop and field-operation records.",
  },
] as const;
type TabId = (typeof SERVICES)[number]["id"];
const selectClass =
  "mt-2 min-h-12 w-full rounded-lg border bg-card px-3 py-3 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-ring/20";
const actionClass =
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40";
const quietClass =
  "inline-flex min-h-11 items-center gap-2 rounded-lg border px-4 py-3 text-sm transition-colors hover:bg-accent";

function Ecosystem() {
  const [service, setService] = useState<TabId>("guidance");
  return (
    <>
      <PageHero
        eyebrow="Farmer app"
        title="Farming information, in one place."
        intro="Agrivion is developing an app that brings together crop guidance, farm records, market information and farmer support, alongside the agricultural rover."
      >
        <div className="flex flex-wrap items-center gap-3">
          <a href="#services" className={actionClass}>
            Explore app features <ArrowDown className="size-4" />
          </a>
          <CtaLink to="/rover" variant="ghost">
            View the rover <ArrowRight className="size-4" />
          </CtaLink>
        </div>
        <p className="mt-5 text-sm text-muted-foreground">
          In development · Features and sample screens are being built and tested.
        </p>
      </PageHero>

      <section id="services" className="mx-auto max-w-7xl scroll-mt-28 px-5 pb-16 md:px-8">
        <SectionTitle
          eyebrow="App features"
          title="Find the support you need."
          body="Select a feature to open its example below. These previews explain the planned services; they do not connect to a live farm account."
        />
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {SERVICES.map((item) => (
            <article key={item.id} className="flex flex-col rounded-xl border bg-card p-6">
              <span className="grid size-11 place-items-center rounded-lg bg-accent text-primary">
                <item.icon className="size-5" />
              </span>
              <h2 className="mt-5 text-base font-semibold">{item.label}</h2>
              <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                {item.body}
              </p>
              <a
                href="#app-preview"
                onClick={() => setService(item.id)}
                className="mt-5 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline"
              >
                Preview feature <ArrowRight className="size-4" />
              </a>
            </article>
          ))}
        </div>
      </section>

      <AppPreview service={service} onServiceChange={setService} />
      <AppShowcase />

      <section className="border-y bg-card">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-14 md:grid-cols-[1fr_auto] md:items-center md:px-8">
          <div>
            <p className="eyebrow">Field operations</p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">
              Connected to the Agrivion rover.
            </h2>
            <p className="mt-4 max-w-2xl leading-relaxed text-muted-foreground">
              The app is intended to support manual rover control and GPS-based field operations,
              including spraying and inter-row cultivation. You can try both control modes in the
              website simulation.
            </p>
          </div>
          <CtaLink to="/dashboard">
            Try rover demo <ArrowRight className="size-4" />
          </CtaLink>
        </div>
      </section>
      <section className="mx-auto max-w-7xl px-5 py-16 md:px-8">
        <div className="flex flex-col justify-between gap-6 rounded-xl border bg-card p-6 md:flex-row md:items-center md:p-8">
          <div>
            <h2 className="text-xl font-semibold">Have a question about Agrivion?</h2>
            <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
              Speak with us about the app, rover development or your farming needs.
            </p>
          </div>
          <CtaLink to="/contact">
            Contact us <ArrowRight className="size-4" />
          </CtaLink>
        </div>
      </section>
    </>
  );
}

function AppPreview({
  service,
  onServiceChange,
}: {
  service: TabId;
  onServiceChange: (id: TabId) => void;
}) {
  const selected = SERVICES.find((item) => item.id === service)!;
  return (
    <section id="app-preview" className="scroll-mt-28 border-y bg-accent/35">
      <div className="mx-auto max-w-7xl px-5 py-14 md:px-8">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Example workspace</p>
            <h2 className="mt-3 text-2xl font-semibold md:text-3xl">Preview an app feature.</h2>
            <p className="mt-3 max-w-xl text-sm leading-relaxed text-muted-foreground">
              Choose a feature and try its sample controls. All information here is illustrative.
            </p>
          </div>
          <label className="w-full text-sm font-medium md:max-w-xs">
            Choose a feature
            <select
              value={service}
              onChange={(event) => onServiceChange(event.target.value as TabId)}
              className={selectClass}
            >
              {SERVICES.map((item) => (
                <option key={item.id} value={item.id}>
                  {item.label}
                </option>
              ))}
            </select>
          </label>
        </div>
        <div className="mt-7 overflow-hidden rounded-xl border bg-card">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b bg-accent/30 px-5 py-4 md:px-7">
            <span className="flex items-center gap-2 text-sm font-semibold">
              <selected.icon className="size-4 text-primary" />
              {selected.label}
            </span>
            <span className="rounded-full border bg-card px-3 py-1 text-xs text-muted-foreground">
              Sample data · In development
            </span>
          </div>
          <div key={service} className="p-5 md:p-8 lg:p-10">
            {service === "guidance" && <GuidanceDemo />}
            {service === "monitoring" && <MonitoringDemo />}
            {service === "disease" && <DiseaseDemo />}
            {service === "markets" && <MarketDemo />}
            {service === "schemes" && <SchemesDemo />}
            {service === "experts" && <ExpertsDemo />}
            {service === "community" && <CommunityDemo />}
            {service === "accounts" && <AccountsDemo />}
          </div>
          <p className="flex items-start gap-2.5 border-t px-5 py-4 text-xs leading-relaxed text-muted-foreground md:px-7">
            <CircleHelp className="mt-0.5 size-4 shrink-0" />
            These examples are not connected to live market feeds, AI diagnosis, expert messaging or
            a farm account.
          </p>
        </div>
      </div>
    </section>
  );
}

function Heading({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <div className="mb-7">
      <p className="eyebrow">{eyebrow}</p>
      <h3 className="mt-3 text-2xl font-semibold md:text-3xl">{title}</h3>
      <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">{children}</p>
    </div>
  );
}
function Note({ children }: { children: ReactNode }) {
  return (
    <p className="mt-5 rounded-xl border border-emerald/20 bg-accent/20 p-4 text-xs leading-relaxed text-muted-foreground">
      {children}
    </p>
  );
}

function GuidanceDemo() {
  const [crop, setCrop] = useState("Cotton");
  const [show, setShow] = useState(false);
  return (
    <>
      <Heading eyebrow="Choose with context" title="Start with crop & soil.">
        Bring crop planning, soil-test information and practical checklists into the same view.
      </Heading>
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="text-xs text-muted-foreground">
          Example crop
          <select
            value={crop}
            onChange={(e) => {
              setCrop(e.target.value);
              setShow(false);
            }}
            className={selectClass}
          >
            {["Cotton", "Groundnut", "Wheat"].map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
        <div className="rounded-xl border bg-card/40 p-4">
          <p className="text-xs text-muted-foreground">Example soil-test record</p>
          <p className="mt-2 font-mono text-xl text-emerald-glow">pH 6.8</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Illustrative value / lab result required
          </p>
        </div>
      </div>
      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {[
          { label: "Crop context", value: crop },
          { label: "Water availability", value: "Record locally" },
          { label: "Nutrient planning", value: "Use a soil test" },
        ].map((item) => (
          <div key={item.label} className="rounded-xl border p-4">
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="mt-2 text-sm font-medium">{item.value}</p>
          </div>
        ))}
      </div>
      <button className={`${actionClass} mt-6`} aria-expanded={show} onClick={() => setShow(!show)}>
        <ClipboardList className="size-4" />
        {show ? "Hide planning checklist" : "Preview planning checklist"}
      </button>
      {show && (
        <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
          {[
            "Compare the crop's needs with local season, soil and water availability.",
            "Record the latest laboratory soil results before planning nutrients.",
            "Discuss variety and sowing choices with a local agricultural adviser.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-emerald-glow" />
              {item}
            </li>
          ))}
        </ul>
      )}
      <Note>
        This is a planning-interface example, not a crop recommendation for your field. Agrivion
        aims to make locally relevant agricultural information easier to find.
      </Note>
    </>
  );
}

function MonitoringDemo() {
  const [flagged, setFlagged] = useState(false);
  return (
    <>
      <Heading eyebrow="Observe before you act" title="A clearer view of field health.">
        The monitoring vision combines rover observations, crop records and satellite context to
        highlight where a closer look may help.
      </Heading>
      <div className="rounded-2xl border bg-card/40 p-5">
        <div className="flex items-center justify-between gap-3">
          <p className="text-sm font-medium">Illustrative vegetation trend</p>
          <span className="font-mono text-[10px] text-muted-foreground">8 DEMO OBSERVATIONS</span>
        </div>
        <svg
          viewBox="0 0 520 150"
          role="img"
          aria-label="Illustrative vegetation trend, not actual measurements"
          className="mt-5 h-36 w-full"
        >
          <defs>
            <linearGradient id="concept-health-fill" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0" stopColor="var(--emerald)" stopOpacity="0.3" />
              <stop offset="1" stopColor="var(--emerald)" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[35, 75, 115].map((y) => (
            <line
              key={y}
              x1="8"
              x2="512"
              y1={y}
              y2={y}
              stroke="var(--border)"
              strokeDasharray="4 6"
            />
          ))}
          <path
            d="M10 120 L80 102 L150 108 L220 70 L290 82 L360 45 L430 50 L510 25 L510 145 L10 145Z"
            fill="url(#concept-health-fill)"
          />
          <path
            d="M10 120 L80 102 L150 108 L220 70 L290 82 L360 45 L430 50 L510 25"
            fill="none"
            stroke="var(--emerald-glow)"
            strokeWidth="3"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="mt-4 flex flex-col justify-between gap-4 rounded-xl border p-5 sm:flex-row sm:items-center">
        <div>
          <p className="text-sm font-medium">East strip / Example observation</p>
          <p className="mt-1 text-xs text-muted-foreground">
            Lower vegetation vigour shown in sample data
          </p>
        </div>
        <button onClick={() => setFlagged(!flagged)} aria-pressed={flagged} className={quietClass}>
          {flagged ? <Check className="size-4 text-emerald-glow" /> : <Plus className="size-4" />}
          {flagged ? "Added to demo inspection list" : "Flag for inspection"}
        </button>
      </div>
      <Note>
        Illustrative monitoring data. Vegetation patterns alone do not identify a disease or its
        cause. Future maps and sensor observations will need field verification.
      </Note>
    </>
  );
}

function DiseaseDemo() {
  const [sample, setSample] = useState("Leaf spots");
  const [photo, setPhoto] = useState("");
  useEffect(
    () => () => {
      if (photo) URL.revokeObjectURL(photo);
    },
    [photo],
  );
  return (
    <>
      <Heading eyebrow="Planned AI assistance" title="Spot a concern. Find a next step.">
        A future crop-support flow could help farmers document visible symptoms, recognise possible
        concerns and seek suitable advice.
      </Heading>
      <div className="grid gap-5 sm:grid-cols-[160px_1fr]">
        <div className="grid aspect-square place-items-center overflow-hidden rounded-2xl border bg-forest">
          {photo ? (
            <img
              src={photo}
              alt="Your selected leaf photo, preview only"
              className="size-full object-cover"
            />
          ) : (
            <svg viewBox="0 0 120 120" aria-label="Illustrative leaf" className="h-36 w-36">
              <path
                d="M28 90C15 43 52 18 100 20C104 67 85 104 39 98"
                fill="var(--emerald)"
                opacity="0.75"
              />
              <path
                d="M27 105L85 35M43 83L40 50M57 67L83 68"
                fill="none"
                stroke="var(--emerald-glow)"
                strokeWidth="2"
              />
              {sample === "Leaf spots" && (
                <g fill="var(--warning)">
                  <circle cx="61" cy="43" r="5" />
                  <circle cx="77" cy="71" r="4" />
                  <circle cx="43" cy="67" r="3" />
                </g>
              )}
              {sample === "Yellowing" && (
                <path d="M30 86C26 52 52 30 78 28L42 91Z" fill="var(--warning)" opacity="0.65" />
              )}
              {sample === "Chewed edges" && (
                <g fill="var(--forest)">
                  <circle cx="97" cy="47" r="9" />
                  <circle cx="88" cy="74" r="8" />
                  <circle cx="24" cy="68" r="7" />
                </g>
              )}
            </svg>
          )}
        </div>
        <div>
          <label className="block text-xs text-muted-foreground">
            Illustrative symptom
            <select
              value={sample}
              onChange={(e) => setSample(e.target.value)}
              className={selectClass}
            >
              {["Leaf spots", "Yellowing", "Chewed edges"].map((name) => (
                <option key={name}>{name}</option>
              ))}
            </select>
          </label>
          <label className="mt-4 block text-xs text-muted-foreground">
            Or select a photo for a local preview
            <input
              type="file"
              accept="image/*"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setPhoto(URL.createObjectURL(file));
              }}
              className="mt-2 block w-full text-xs file:mr-3 file:rounded-lg file:border-0 file:bg-accent file:px-3 file:py-2 file:text-emerald-glow"
            />
          </label>
          <p className="mt-3 text-xs leading-relaxed text-muted-foreground">
            Photo stays in your browser. It is not uploaded or analysed.
          </p>
        </div>
      </div>
      <div className="mt-5 rounded-xl border p-5">
        <p className="text-sm font-medium">Example observation checklist / {sample}</p>
        <ul className="mt-3 space-y-2 text-sm text-muted-foreground">
          {[
            "Record crop, growth stage and when symptoms first appeared.",
            "Photograph affected areas and inspect nearby plants.",
            "Ask a local agricultural expert to confirm the cause and appropriate response.",
          ].map((item) => (
            <li key={item} className="flex gap-2">
              <Check className="mt-0.5 size-4 shrink-0 text-emerald-glow" />
              {item}
            </li>
          ))}
        </ul>
      </div>
      <Note>
        This preview does not diagnose diseases, identify pests or recommend pesticide treatments.
        AI-supported recognition and preventive/control guidance are development goals requiring
        validation and expert review.
      </Note>
    </>
  );
}

const MARKET_DATA: Record<string, { name: string; price: number }[]> = {
  Cotton: [
    { name: "Anand", price: 7200 },
    { name: "Rajkot", price: 7350 },
    { name: "Ahmedabad", price: 7100 },
  ],
  Groundnut: [
    { name: "Anand", price: 5900 },
    { name: "Rajkot", price: 6100 },
    { name: "Ahmedabad", price: 6000 },
  ],
  Wheat: [
    { name: "Anand", price: 2500 },
    { name: "Rajkot", price: 2450 },
    { name: "Ahmedabad", price: 2550 },
  ],
};
const rupees = (amount: number) =>
  new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);

function MarketDemo() {
  const [crop, setCrop] = useState("Cotton");
  const rows = MARKET_DATA[crop]!;
  return (
    <>
      <Heading eyebrow="Visibility before the sale" title="Compare markets with context.">
        The planned market view will help farmers explore available prices across markets before
        deciding when and where to sell.
      </Heading>
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
        <label className="flex-1 text-xs text-muted-foreground">
          Example commodity
          <select value={crop} onChange={(e) => setCrop(e.target.value)} className={selectClass}>
            {Object.keys(MARKET_DATA).map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
        </label>
        <span className="rounded-xl border border-warning/30 bg-warning/5 px-4 py-3 text-xs text-warning">
          Invented demo prices / INR per quintal
        </span>
      </div>
      <div className="mt-5 overflow-hidden rounded-xl border">
        <div className="grid grid-cols-[1fr_auto] gap-4 border-b bg-card/50 px-4 py-3 text-xs text-muted-foreground">
          <span>Example Gujarat market</span>
          <span>Sample price</span>
        </div>
        {rows.map((row) => (
          <div
            key={row.name}
            className="grid grid-cols-[1fr_auto] items-center gap-4 border-b px-4 py-5 last:border-b-0"
          >
            <span className="text-sm">{row.name}</span>
            <span className="font-mono text-lg text-emerald-glow">{rupees(row.price)}</span>
          </div>
        ))}
      </div>
      <a
        href="https://agmarknet.gov.in/"
        target="_blank"
        rel="noopener noreferrer"
        className={`${quietClass} mt-5`}
      >
        Visit official Agmarknet <ArrowUpRight className="size-4" />
      </a>
      <Note>
        All prices above are fictional examples, not a live feed or selling recommendation. Actual
        prices depend on date, grade, fees, location and the relevant trading unit. Verify current
        information on official sources.
      </Note>
    </>
  );
}

function SchemesDemo() {
  const [need, setNeed] = useState("Equipment & mechanisation");
  return (
    <>
      <Heading
        eyebrow="Make support easier to discover"
        title="Find a route to official information."
      >
        Agrivion aims to bring scheme details, eligibility requirements, document checklists and
        official application links into a simpler discovery experience.
      </Heading>
      <label className="block text-xs text-muted-foreground">
        Example area of interest
        <select value={need} onChange={(e) => setNeed(e.target.value)} className={selectClass}>
          {["Equipment & mechanisation", "Farmer income support", "Water & irrigation"].map(
            (name) => (
              <option key={name}>{name}</option>
            ),
          )}
        </select>
      </label>
      <div className="mt-5 grid gap-3 sm:grid-cols-2">
        {[
          {
            n: "01",
            title: "Discover",
            text: `Explore official programmes relevant to ${need.toLowerCase()}.`,
          },
          {
            n: "02",
            title: "Check eligibility",
            text: "Read current state, landholding and applicant requirements on the official page.",
          },
          {
            n: "03",
            title: "Prepare documents",
            text: "Use the scheme's current checklist; requirements differ between programmes.",
          },
          {
            n: "04",
            title: "Apply officially",
            text: "Continue only through the responsible department's official application link.",
          },
        ].map((item) => (
          <div key={item.n} className="rounded-xl border p-4">
            <span className="font-mono text-xs text-emerald-glow">{item.n}</span>
            <p className="mt-2 text-sm font-medium">{item.title}</p>
            <p className="mt-2 text-xs leading-relaxed text-muted-foreground">{item.text}</p>
          </div>
        ))}
      </div>
      <div className="mt-5 flex flex-wrap gap-3">
        <a
          href="https://www.myscheme.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className={actionClass}
        >
          Explore official myScheme <ArrowUpRight className="size-4" />
        </a>
        <a
          href="https://pmkisan.gov.in/"
          target="_blank"
          rel="noopener noreferrer"
          className={quietClass}
        >
          PM-KISAN official portal <ArrowUpRight className="size-4" />
        </a>
      </div>
      <Note>
        This example does not determine eligibility, promise a subsidy or submit an application.
        Check current official rules, availability and application windows.
      </Note>
    </>
  );
}

function ExpertsDemo() {
  const [topic, setTopic] = useState("Crop concerns");
  const [question, setQuestion] = useState("");
  const [preview, setPreview] = useState(false);
  return (
    <>
      <Heading
        eyebrow="Human knowledge, close at hand"
        title="Make the next question easier to ask."
      >
        The expert-support vision connects farmers with agricultural guidance on crops, soil, pests
        and field decisions.
      </Heading>
      <div className="flex flex-wrap gap-2">
        {["Crop concerns", "Soil health", "Pest management", "Field operations"].map((item) => (
          <button
            key={item}
            onClick={() => {
              setTopic(item);
              setPreview(false);
            }}
            aria-pressed={topic === item}
            className={`rounded-full border px-3 py-2 text-xs transition ${topic === item ? "border-emerald/50 bg-accent text-emerald-glow" : "text-muted-foreground hover:bg-accent/30"}`}
          >
            {item}
          </button>
        ))}
      </div>
      <label className="mt-5 block text-xs text-muted-foreground">
        Draft an example question
        <textarea
          value={question}
          maxLength={500}
          onChange={(e) => {
            setQuestion(e.target.value);
            setPreview(false);
          }}
          rows={4}
          placeholder="For example: What information should I collect before discussing a crop problem?"
          className={`${selectClass} resize-y`}
        />
      </label>
      <button
        disabled={!question.trim()}
        onClick={() => setPreview(true)}
        className={`${actionClass} mt-4`}
      >
        <MessageCircle className="size-4" /> Preview consultation request
      </button>
      {preview && (
        <div role="status" className="mt-4 rounded-xl border bg-card/50 p-4">
          <p className="text-xs text-emerald-glow">Example request / {topic}</p>
          <p className="mt-2 break-words text-sm">{question}</p>
          <p className="mt-3 text-xs text-muted-foreground">
            Preview only. No expert has been contacted.
          </p>
        </div>
      )}
      <Note>
        The expert network, chat and consultation workflow are planned services. No bookings,
        messages or real expert responses are available in this concept preview.
      </Note>
    </>
  );
}

function CommunityDemo() {
  const [saved, setSaved] = useState<string[]>([]);
  const topics = [
    {
      title: "Making every drop count",
      category: "Water & soil",
      body: "A future discussion space for local irrigation experiences and practical observations.",
    },
    {
      title: "What are you seeing in the field?",
      category: "Crop observations",
      body: "Share symptoms and context with other growers, while seeking expert confirmation for crop problems.",
    },
    {
      title: "Tools that work for smaller farms",
      category: "Equipment & learning",
      body: "Exchange repair tips, field-operation experiences and ideas for accessible farming technology.",
    },
  ];
  return (
    <>
      <Heading
        eyebrow="Practical knowledge grows when shared"
        title="A community rooted in experience."
      >
        A planned farmer space to share observations, discuss challenges and learn from one another.
      </Heading>
      <div className="space-y-3">
        {topics.map((item) => (
          <article key={item.title} className="rounded-xl border bg-card/35 p-5">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-wider text-emerald-glow">
                  {item.category} / Example topic
                </p>
                <h4 className="mt-2 text-base font-medium">{item.title}</h4>
              </div>
              <button
                aria-label={
                  saved.includes(item.title) ? `Unsave ${item.title}` : `Save ${item.title}`
                }
                aria-pressed={saved.includes(item.title)}
                onClick={() =>
                  setSaved((items) =>
                    items.includes(item.title)
                      ? items.filter((name) => name !== item.title)
                      : [...items, item.title],
                  )
                }
                className="rounded-lg border p-2 text-emerald-glow transition hover:bg-accent"
              >
                <Bookmark
                  className="size-4"
                  fill={saved.includes(item.title) ? "currentColor" : "none"}
                />
              </button>
            </div>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{item.body}</p>
          </article>
        ))}
      </div>
      <Note>
        These are sample discussion topics, not posts from an existing community. Saved topics stay
        in this demo session only. Community participation and moderation are part of the
        development vision.
      </Note>
    </>
  );
}

type LedgerEntry = { id: number; label: string; kind: "income" | "expense"; amount: number };
const INITIAL_ENTRIES: LedgerEntry[] = [
  { id: 1, label: "Demo produce sale", kind: "income", amount: 14500 },
  { id: 2, label: "Demo seed purchase", kind: "expense", amount: 2800 },
  { id: 3, label: "Demo field labour", kind: "expense", amount: 1800 },
];

function AccountsDemo() {
  const [entries, setEntries] = useState<LedgerEntry[]>(INITIAL_ENTRIES);
  const [kind, setKind] = useState<"income" | "expense">("expense");
  const income = entries
    .filter((entry) => entry.kind === "income")
    .reduce((sum, entry) => sum + entry.amount, 0);
  const expense = entries
    .filter((entry) => entry.kind === "expense")
    .reduce((sum, entry) => sum + entry.amount, 0);
  function addEntry(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const amount = Number(data.get("amount"));
    const label = String(data.get("label") || "").trim();
    if (!label || !Number.isFinite(amount) || amount <= 0) return;
    setEntries((current) => [...current, { id: Date.now(), label, kind, amount }]);
    form.reset();
  }
  return (
    <>
      <Heading
        eyebrow="Keep the everyday details together"
        title="A simple picture of farm accounts."
      >
        The farm-records concept helps organise income and expenses alongside crop and operation
        records.
      </Heading>
      <div className="grid grid-cols-3 gap-2 sm:gap-3">
        {[
          { title: "Demo income", value: income },
          { title: "Demo expenses", value: expense },
          { title: "Demo balance", value: income - expense },
        ].map((item) => (
          <div key={item.title} className="min-w-0 rounded-xl border bg-card/40 p-3 sm:p-4">
            <p className="text-[10px] text-muted-foreground sm:text-xs">{item.title}</p>
            <p className="mt-2 break-words font-mono text-sm text-emerald-glow sm:text-xl">
              {rupees(item.value)}
            </p>
          </div>
        ))}
      </div>
      <div className="mt-4 max-h-44 overflow-auto rounded-xl border">
        {entries.map((entry) => (
          <div
            key={entry.id}
            className="flex items-center justify-between gap-3 border-b px-4 py-3 text-sm last:border-b-0"
          >
            <span className="min-w-0 break-words">{entry.label}</span>
            <span
              className={`shrink-0 font-mono text-xs ${entry.kind === "income" ? "text-emerald-glow" : "text-muted-foreground"}`}
            >
              {entry.kind === "income" ? "+" : "−"}
              {rupees(entry.amount)}
            </span>
          </div>
        ))}
      </div>
      <form onSubmit={addEntry} className="mt-5">
        <div className="grid gap-3 sm:grid-cols-[1fr_1.4fr_1fr]">
          <label className="text-xs text-muted-foreground">
            Type
            <select
              value={kind}
              onChange={(e) => setKind(e.target.value as "income" | "expense")}
              className={selectClass}
            >
              <option value="expense">Expense</option>
              <option value="income">Income</option>
            </select>
          </label>
          <label className="text-xs text-muted-foreground">
            Description
            <input
              name="label"
              required
              maxLength={45}
              placeholder="Example entry"
              className={selectClass}
            />
          </label>
          <label className="text-xs text-muted-foreground">
            Amount / INR
            <input
              name="amount"
              type="number"
              min="1"
              max="99999999"
              step="1"
              required
              placeholder="500"
              className={selectClass}
            />
          </label>
        </div>
        <div className="mt-4 flex flex-wrap gap-3">
          <button type="submit" className={actionClass}>
            <Plus className="size-4" />
            Add demo entry
          </button>
          <button type="button" onClick={() => setEntries(INITIAL_ENTRIES)} className={quietClass}>
            Reset examples
          </button>
        </div>
      </form>
      <Note>
        Sample bookkeeping interface, not financial advice or a profitability claim. Entries exist
        only while this preview is open and are not saved to a farm account.
      </Note>
    </>
  );
}
