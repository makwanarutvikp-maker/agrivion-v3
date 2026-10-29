import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { ArrowRight, Camera, MapPin, Satellite, ScanLine, RotateCcw } from "lucide-react";
import satellite from "@/assets/satellite-field.jpg";
import { CtaLink, PageHero, Reveal, SectionTitle, StatusTag } from "@/components/site/primitives";

export const Route = createFileRoute("/intelligence")({
  head: () => ({ meta: [{ title: "Agrivion Intelligence | Ground observations, wider perspective" }, { name: "description", content: "Explore Agrivion's planned computer vision, satellite imagery and geospatial monitoring through clearly labelled interactive concepts." }] }), component: Intelligence,
});
const PLANTS = [
  { x: 12, y: 18, w: 16, h: 14, label: "Crop" }, { x: 40, y: 22, w: 14, h: 12, label: "Crop" },
  { x: 66, y: 16, w: 18, h: 15, label: "Crop" }, { x: 22, y: 55, w: 12, h: 12, label: "Weed" },
  { x: 52, y: 58, w: 17, h: 16, label: "Crop" }, { x: 78, y: 62, w: 11, h: 10, label: "Weed" },
];
function Detection() {
  const [scanned, setScanned] = useState(false);
  const reduce = useReducedMotion();
  return <div className="overflow-hidden rounded-3xl border bg-card">
    <div className="relative aspect-[4/3] overflow-hidden bg-forest">
      <svg viewBox="0 0 100 80" className="absolute inset-0 size-full" aria-hidden>
        {[20,48,76].map(x=><path key={x} d={`M${x} 0 V80`} stroke="var(--emerald)" strokeOpacity=".13" strokeWidth="18" />)}
        {Array.from({ length: 40 }).map((_, i) => <circle key={i} cx={(i * 37) % 100} cy={(i * 23) % 80} r="0.4" fill="var(--muted-foreground)" opacity="0.4" />)}
        {PLANTS.map((plant, i) => <g key={i} transform={`translate(${plant.x + plant.w/2} ${plant.y + plant.h/2})`} fill={plant.label === 'Crop' ? 'var(--emerald)' : 'var(--warning)'} opacity=".8"><ellipse rx="2.5" ry="5.5" transform="rotate(35)" /><ellipse rx="2.5" ry="5.5" transform="rotate(-35)" /><ellipse rx="2" ry="4" transform="rotate(90)" /></g>)}
      </svg>
      {scanned && PLANTS.map((plant, i) => <motion.div key={i} initial={reduce ? false : { opacity: 0, scale: 1.12 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: reduce ? 0 : i*.12, duration: reduce ? 0 : .35 }} className={`absolute rounded-md border ${plant.label === 'Crop' ? 'border-emerald-glow' : 'border-warning'}`} style={{ left: `${plant.x}%`, top: `${plant.y/80*100}%`, width: `${plant.w}%`, height: `${plant.h/80*100}%` }}><span className={`absolute -top-5 left-0 whitespace-nowrap rounded px-1.5 py-0.5 font-mono text-[9px] ${plant.label==='Crop' ? 'bg-emerald-glow text-primary-foreground' : 'bg-warning text-primary-foreground'}`}>{plant.label}</span></motion.div>)}
      <span className="absolute left-4 top-4 rounded-full border border-white/20 bg-black/30 px-3 py-1.5 font-mono text-[10px] tracking-widest text-white">ILLUSTRATIVE CAMERA VIEW</span>
    </div>
    <div className="flex flex-wrap items-center justify-between gap-4 p-5"><p className="max-w-xs text-xs leading-relaxed text-muted-foreground" aria-live="polite">{scanned ? 'Prewritten labels revealed. No AI model or crop diagnosis is running.' : 'Explore the idea of identifying crops and weeds in an image.'}</p><button onClick={() => setScanned(!scanned)} className="inline-flex min-h-11 items-center gap-2 rounded-full bg-emerald-gradient px-5 py-2.5 text-sm font-semibold text-primary-foreground">{scanned ? <RotateCcw className="size-4" /> : <ScanLine className="size-4" />}{scanned ? 'Reset preview' : 'Preview detection'}</button></div>
  </div>;
}
function VegetationPreview() {
  const [mix, setMix] = useState(50);
  return <div>
    <div className="relative aspect-square overflow-hidden rounded-3xl border">
      <img src={satellite} alt="Illustrative aerial view of agricultural fields" width={1280} height={1280} loading="lazy" className="absolute inset-0 size-full object-cover" />
      <div className="absolute inset-0" style={{ clipPath: `inset(0 ${100-mix}% 0 0)` }}><img src={satellite} alt="" width={1280} height={1280} loading="lazy" className="absolute inset-0 size-full object-cover" style={{ filter: 'grayscale(1) contrast(1.6)' }} /><div className="absolute inset-0 mix-blend-color" style={{ background: 'linear-gradient(135deg, var(--destructive), var(--warning) 35%, var(--emerald) 65%, var(--emerald-glow))' }} /></div>
      <div className="pointer-events-none absolute inset-y-0 w-px bg-white" style={{ left: `${mix}%` }}><span className="absolute left-1/2 top-1/2 grid size-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white bg-background/80 text-white">↔</span></div>
      <span className="absolute left-4 top-4 rounded-full bg-black/70 px-3 py-2 font-mono text-[10px] text-white">COLOUR OVERLAY</span><span className="absolute right-4 top-4 rounded-full bg-black/70 px-3 py-2 font-mono text-[10px] text-white">RGB VIEW</span>
    </div>
    <label htmlFor="vegetation-compare" className="mt-5 flex items-center justify-between text-sm"><span>Compare the visual layers</span><span className="font-mono text-xs text-emerald-glow">{mix}% overlay</span></label>
    <input id="vegetation-compare" type="range" min={0} max={100} value={mix} onChange={(e)=>setMix(Number(e.target.value))} className="mt-3 h-8 w-full accent-[var(--emerald-glow)]" />
    <p className="mt-2 text-xs leading-relaxed text-muted-foreground">Illustrative colour overlay only. This image is not calculated NDVI or a measurement of crop health.</p>
  </div>;
}
const ZONES = [
  { name: 'Demo zone A', index: .71, note: 'Example: comparatively uniform vegetation' },
  { name: 'Demo zone B', index: .52, note: 'Example: schedule a field observation' },
  { name: 'Demo zone C', index: .66, note: 'Example: compare with previous observations' },
  { name: 'Demo zone D', index: .38, note: 'Example: inspect lower-vigour patterns' },
];
function Intelligence() {
  const reduce = useReducedMotion();
  return <>
    <PageHero eyebrow="04 / Intelligence in development" title="A closer look. A wider perspective." intro="Agrivion's second phase aims to connect observations on the ground with patterns seen from above, helping farmers identify where a closer look may be useful."><StatusTag status="roadmap" /></PageHero>
    <Reveal className="mx-auto grid max-w-7xl items-center gap-12 px-5 pb-24 md:px-8 lg:grid-cols-2"><div><SectionTitle eyebrow="On the ground" title="Make observations more useful." body="A proposed camera and sensing pipeline will explore crop rows, weeds and crop-health patterns. Preliminary disease-symptom recognition would support further inspection and expert guidance." /><ul data-reveal className="mt-8 space-y-4">{['Recognise crop-row patterns', 'Investigate weed identification', 'Record crop observations with locations'].map((item,i)=><li key={item} className="flex items-center gap-4 border-b pb-4"><span className="font-mono text-xs text-emerald-glow">0{i+1}</span><span className="text-sm">{item}</span></li>)}</ul></div><div data-reveal><Detection /></div></Reveal>
    <Reveal className="border-y bg-charcoal"><div className="mx-auto grid max-w-7xl items-center gap-12 px-5 py-24 md:px-8 lg:grid-cols-2"><div data-reveal><VegetationPreview /></div><div><SectionTitle eyebrow="From above" title="See field variability in context." body="Suitable multispectral imagery, such as Sentinel-2, could support vegetation-index maps including NDVI. Those patterns can help identify areas for follow-up field inspection." /><div data-reveal className="mt-7 rounded-2xl border p-6"><p className="font-semibold">A measurement needs a data pipeline.</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">Image suitability, processing, geospatial alignment and field validation are part of the planned work. Weather, image availability and crop conditions affect how useful the observations can be.</p></div></div></div></Reveal>
    <Reveal className="mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-32"><SectionTitle eyebrow="The planned connection" title="One field. Multiple perspectives." body="The longer-term goal is to combine observations into a dashboard that supports location-specific decisions." /><div className="mt-12 grid gap-4 lg:grid-cols-3">{[{ icon: Satellite, title: 'Map the pattern', copy: 'Satellite imagery highlights variation across a field.' },{ icon: MapPin, title: 'Locate the observation', copy: 'GPS/GNSS coordinates link areas of interest with rover routes.' },{ icon: Camera, title: 'Inspect on the ground', copy: 'Rover imagery and farmer observations help evaluate the pattern.' }].map((item,i)=><article key={item.title} data-reveal className="relative rounded-3xl border bg-card/50 p-8"><div className="flex items-center justify-between"><item.icon className="size-8 text-emerald-glow" /><span className="font-mono text-xs text-muted-foreground">0{i+1}</span></div><h3 className="mt-8 text-xl font-semibold">{item.title}</h3><p className="mt-3 leading-relaxed text-muted-foreground">{item.copy}</p></article>)}</div></Reveal>
    <Reveal className="border-y bg-charcoal"><div className="mx-auto max-w-7xl px-5 py-24 md:px-8"><div className="flex flex-wrap items-end justify-between gap-5"><SectionTitle eyebrow="Dashboard concept" title="Turn observations into a next step." /><StatusTag status="simulated" /></div><p data-reveal className="mt-5 max-w-2xl text-muted-foreground">Fictional index values below illustrate a future report layout. They are not measured crop conditions or diagnosis.</p><div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{ZONES.map(zone=><article data-reveal key={zone.name} className="rounded-3xl border bg-background p-6"><p className="text-sm text-muted-foreground">{zone.name}</p><p className="mt-4 font-display text-4xl font-semibold">{zone.index.toFixed(2)}</p><p className="mt-2 text-[10px] uppercase tracking-widest text-muted-foreground">Sample vegetation index</p><div className="mt-5 h-1.5 overflow-hidden rounded-full bg-muted"><motion.div initial={reduce ? false : { width: 0 }} whileInView={{ width: `${zone.index*100}%` }} viewport={{ once: true }} transition={{ duration: reduce ? 0 : 1 }} className="h-full rounded-full" style={{ background: zone.index < .45 ? 'var(--warning)' : 'var(--emerald-glow)', width: reduce ? `${zone.index*100}%` : undefined }} /></div><p className="mt-5 text-sm leading-relaxed text-muted-foreground">{zone.note}</p></article>)}</div><div data-reveal className="mt-10 flex flex-wrap gap-3"><CtaLink to="/dashboard">Open the interactive demo <ArrowRight className="size-4" /></CtaLink><CtaLink to="/technology" variant="ghost">How we will validate it</CtaLink></div></div></Reveal>
  </>;
}
