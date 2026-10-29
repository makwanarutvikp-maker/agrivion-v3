import { createFileRoute } from "@tanstack/react-router";
import { Droplets, Shovel, ScanEye, FlaskConical, ArrowRight, Wheat } from "lucide-react";
import { CtaLink, PageHero, Reveal, SectionTitle, StatusTag } from "@/components/site/primitives";

export const Route = createFileRoute("/applications")({
  head: () => ({ meta: [{ title: "Agrivion Applications | One platform, practical field work" }, { name: "description", content: "Planned Agrivion applications in spraying, inter-row cultivation, crop scouting and agricultural research, with field validation priorities." }] }), component: Applications,
});
const APPLICATIONS = [
  { icon: Droplets, title: "Spraying", subtitle: "Timely application, with less repetitive manual work.", body: "Develop a modular spraying system for suitable crop rows. The early focus is controlled application and operational reliability; weed-specific or variable-rate application belongs to later, validated precision work.", stage: "Phase I · Implement development", measures: ["Application consistency and coverage", "Flow control and field speed", "Crop suitability and operator safeguards"], number: "01" },
  { icon: Shovel, title: "Inter-row cultivation", subtitle: "Work between the plants, with care for the crop.", body: "Explore a cultivation tool that works with crop-row layouts and the rover's mechanical capabilities. Steering alignment, working depth, traction and clearance will determine where the system is useful.", stage: "Phase I · Implement development", measures: ["Cultivation effectiveness", "Traction and power requirements", "Plant clearance and crop damage"], number: "02" },
  { icon: ScanEye, title: "Crop scouting", subtitle: "Make field observations easier to revisit.", body: "Combine camera observations, suitable sensors and GPS/GNSS locations to help identify areas requiring inspection. Later integration could compare rover observations with satellite-derived field patterns.", stage: "Phase II · Monitoring development", measures: ["Observation and image quality", "Location consistency", "Useful crop-health insights"], number: "03" },
  { icon: FlaskConical, title: "Agricultural research", subtitle: "A platform for learning from real conditions.", body: "Work towards an adaptable platform for agricultural universities, FPOs and service providers to evaluate tools, sensors and field methods. Pilot collaboration and farmer feedback will guide development.", stage: "Development & supervised trials", measures: ["Repeatable testing protocols", "Repair and maintenance needs", "Practical farmer value"], number: "04" },
];

function FieldDiagram({ mode }: { mode: number }) {
  return <svg viewBox="0 0 500 340" role="img" aria-label={['Illustration of row spraying', 'Illustration of inter-row cultivation', 'Illustration of crop scouting', 'Illustration of a research platform'][mode]} className="w-full max-w-lg">
    <defs><linearGradient id={`field-glow-${mode}`} x1="0" y1="0" x2="0" y2="1"><stop stopColor="var(--emerald)" stopOpacity="0.2" /><stop offset="1" stopColor="var(--emerald)" stopOpacity="0" /></linearGradient></defs>
    <rect x="20" y="20" width="460" height="300" rx="22" fill={`url(#field-glow-${mode})`} stroke="var(--border)" />
    {[80,150,220,290,360,430].map(x => <g key={x}><line x1={x} y1="45" x2={x} y2="295" stroke="var(--emerald)" strokeOpacity="0.18" strokeWidth="24" />{[65,110,155,200,245,280].map(y=><path key={y} d={`M${x} ${y+9} q-16 -8 -13 -16 q13 0 13 12 q0 -12 13 -12 q3 8 -13 16`} fill="var(--emerald)" opacity="0.55" />)}</g>)}
    <path d="M255 290 V55" stroke="var(--emerald-glow)" strokeOpacity=".5" strokeWidth="2" strokeDasharray="5 7" />
    {mode === 0 && <g fill="var(--proposed)" opacity=".65">{[0,1,2,3,4].map(i=><g key={i}><circle cx={195+i*30} cy={190+Math.abs(i-2)*12} r="5" /><circle cx={195+i*30} cy={215+Math.abs(i-2)*10} r="3" /></g>)}</g>}
    {mode === 1 && <g stroke="var(--warning)" strokeWidth="5">{[232,247,262,277].map(x=><path key={x} d={`M${x} 170 v42 l-5 12`} fill="none" />)}</g>}
    {mode === 2 && <g fill="none" stroke="var(--emerald-glow)" strokeWidth="1.5">{[[220,110],[290,110],[220,200],[290,200]].map(([x,y])=><rect key={`${x}-${y}`} x={x!-16} y={y!-16} width="32" height="32" rx="5" />)}<path d="M255 170 L200 245 L310 245 Z" opacity=".4" /></g>}
    {mode === 3 && <g fill="var(--warning)"><circle cx="255" cy="145" r="50" opacity=".08" /><circle cx="255" cy="145" r="75" opacity=".05" /><circle cx="255" cy="145" r="100" opacity=".03" /></g>}
    <g><rect x="226" y="118" width="58" height="68" rx="12" fill="var(--charcoal)" stroke="var(--emerald-glow)" strokeWidth="2" /><rect x="218" y="125" width="10" height="22" rx="3" fill="var(--foreground)" /><rect x="282" y="125" width="10" height="22" rx="3" fill="var(--foreground)" /><rect x="218" y="159" width="10" height="22" rx="3" fill="var(--foreground)" /><rect x="282" y="159" width="10" height="22" rx="3" fill="var(--foreground)" /><path d="M245 145 l10 -12 10 12" stroke="var(--emerald-glow)" strokeWidth="3" fill="none" /><circle cx="255" cy="160" r="4" fill="var(--emerald-glow)" /></g>
  </svg>;
}
function Applications() {
  return <>
    <PageHero eyebrow="03 / Practical applications" title="Technology earns its place in the field." intro="Agrivion is being developed around selected tasks with measurable farmer value. Each application will depend on suitable crops, field conditions and supervised validation."><StatusTag status="prototype" /></PageHero>
    <div className="mx-auto max-w-7xl space-y-8 px-5 pb-24 md:px-8">
      {APPLICATIONS.map((app, i) => <Reveal key={app.title} as="div" className="overflow-hidden rounded-[2rem] border bg-card/30">
        <article className="grid lg:grid-cols-2">
          <div className={`relative flex min-h-[300px] items-center justify-center bg-charcoal p-6 sm:p-12 ${i%2 ? 'lg:order-2' : ''}`}><span className="absolute left-7 top-6 font-mono text-xs uppercase tracking-widest text-muted-foreground">Field study / {app.number}</span><div data-reveal className="w-full"><FieldDiagram mode={i} /></div><span className="absolute bottom-5 right-7 font-mono text-[10px] text-muted-foreground">Concept illustration</span></div>
          <div className="p-7 sm:p-10 lg:p-12"><p data-reveal className="eyebrow">{app.stage}</p><h2 data-reveal className="mt-4 text-3xl font-semibold md:text-4xl">{app.title}</h2><p data-reveal className="mt-5 text-lg">{app.subtitle}</p><p data-reveal className="mt-4 leading-relaxed text-muted-foreground">{app.body}</p><div data-reveal className="mt-7 border-t pt-5"><p className="text-xs uppercase tracking-widest text-emerald-glow">What we will evaluate</p><ul className="mt-3 space-y-2">{app.measures.map(item=><li key={item} className="flex items-center gap-3 text-sm text-muted-foreground"><span className="size-1 rounded-full bg-emerald-glow" />{item}</li>)}</ul></div></div>
        </article>
      </Reveal>)}
      <Reveal as="div" className="grid gap-6 rounded-3xl border border-warning/25 bg-warning/5 p-8 md:grid-cols-[auto_1fr] md:p-10"><Wheat data-reveal className="size-10 text-warning" /><div><p data-reveal className="eyebrow text-warning">Future feasibility study</p><h2 data-reveal className="mt-3 text-2xl font-semibold">Crop-specific harvesting</h2><p data-reveal className="mt-4 max-w-3xl leading-relaxed text-muted-foreground">Harvesting mechanisms may be investigated as the platform matures. Development depends on the crop, power, traction, payload and mechanical requirements; harvesting is not an established rover capability.</p></div></Reveal>
    </div>
    <Reveal className="border-t bg-charcoal"><div className="mx-auto max-w-7xl px-5 py-24 text-center md:px-8"><p data-reveal className="eyebrow">Built with farmer feedback</p><h2 data-reveal className="mx-auto mt-4 max-w-3xl text-3xl font-semibold md:text-5xl">The next useful feature starts with a real field need.</h2><p data-reveal className="mx-auto mt-6 max-w-xl text-muted-foreground">Agricultural universities, farmers, FPOs and service providers can help shape suitable pilot conditions and practical development priorities.</p><div data-reveal className="mt-9 flex flex-wrap justify-center gap-3"><CtaLink to="/contact">Discuss a pilot <ArrowRight className="size-4" /></CtaLink><CtaLink to="/dashboard" variant="ghost">Explore the demo</CtaLink></div></div></Reveal>
  </>;
}
