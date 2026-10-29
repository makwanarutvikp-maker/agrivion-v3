import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  Check,
  Copy,
  Download,
  GraduationCap,
  Leaf,
  Mail,
  MapPin,
  Phone,
  Send,
  Sprout,
  Users,
} from "lucide-react";
import { PageHero } from "@/components/site/primitives";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & Collaborate | Agrivion" },
      {
        name: "description",
        content:
          "Connect with Agrivion project proposer Bhavesh Makwana about farmer needs, research, pilot testing and the smart-farming ecosystem.",
      },
    ],
  }),
  component: Contact,
});

const EMAIL = "makwanabhaveshp@gmail.com";
const TYPES = [
  "Farmer / FPO",
  "Pilot partner",
  "University / researcher",
  "Investor",
  "Student / collaborator",
];

function Contact() {
  const [type, setType] = useState(TYPES[0]!);
  const [draftOpened, setDraftOpened] = useState(false);
  const [copied, setCopied] = useState(false);

  function prepareDraft(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const body = [
      "Hello Bhavesh,",
      "",
      String(data.get("message") || ""),
      "",
      `Name: ${String(data.get("name") || "")}`,
      `Email: ${String(data.get("email") || "")}`,
      `Organisation / location: ${String(data.get("org") || "Not provided")}`,
      `Interested as: ${type}`,
    ].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Agrivion collaboration — ${type}`)}&body=${encodeURIComponent(body)}`;
    setDraftOpened(true);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  const field =
    "mt-2 w-full rounded-xl border bg-background/70 px-4 py-3 text-sm font-normal outline-none transition focus:border-emerald focus:ring-2 focus:ring-ring/20";

  return (
    <>
      <PageHero
        eyebrow="The next chapter starts with a conversation"
        title="Let's build better farming, together."
        intro="A field to test in. A problem worth solving. An idea to explore. Help shape Agrivion around what farmers actually need."
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-24 md:px-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-16">
        <div>
          <div className="rounded-[2rem] border bg-card/50 p-7 md:p-9">
            <div className="flex items-center gap-4">
              <span className="grid size-16 shrink-0 place-items-center rounded-2xl bg-emerald-gradient font-display text-xl text-primary-foreground">
                BM
              </span>
              <div>
                <p className="eyebrow">Project proposer</p>
                <h2 className="mt-2 text-xl font-semibold">Bhavesh Makwana</h2>
              </div>
            </div>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              B.Sc. (Hons.) Agriculture
              <br />
              B.A. College of Agriculture, Anand Agricultural University
            </p>
            <div className="mt-7 space-y-4 border-t pt-6">
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="size-4 shrink-0 text-emerald-glow" />
                <span>Anand, Gujarat, India</span>
              </div>
              <a
                href="tel:+917801834560"
                className="flex items-center gap-3 text-sm transition hover:text-emerald-glow"
              >
                <Phone className="size-4 shrink-0 text-emerald-glow" />
                +91 78018 34560
              </a>
              <div className="flex items-start gap-3">
                <Mail className="mt-2 size-4 shrink-0 text-emerald-glow" />
                <div className="min-w-0 flex-1">
                  <label htmlFor="project-email" className="sr-only">
                    Project email address
                  </label>
                  <input
                    id="project-email"
                    readOnly
                    value={EMAIL}
                    onFocus={(e) => e.currentTarget.select()}
                    className="w-full min-w-0 border-0 bg-transparent py-1.5 text-sm outline-none selection:bg-emerald"
                  />
                  <button
                    onClick={copyEmail}
                    className="mt-1 inline-flex items-center gap-1.5 text-xs text-emerald-glow hover:underline"
                  >
                    {copied ? <Check className="size-3" /> : <Copy className="size-3" />}
                    {copied ? "Copied" : "Copy email"}
                  </button>
                </div>
              </div>
            </div>
            <a
              href={`mailto:${EMAIL}`}
              className="mt-7 flex items-center justify-between rounded-xl border px-4 py-3 text-sm font-medium transition hover:border-emerald/50 hover:bg-accent/40"
            >
              Email Bhavesh directly <ArrowUpRight className="size-4" />
            </a>
          </div>
          <div className="mt-6 rounded-2xl border p-6">
            <p className="eyebrow">Explore the idea</p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Read the engineering approach, development plan and proposed business model before we
              talk.
            </p>
            <a
              href="/Agrivion-Synopsis.pdf"
              download
              className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-emerald-glow hover:underline"
            >
              <Download className="size-4" /> Download project synopsis
            </a>
          </div>
        </div>
        <div className="rounded-[2rem] border bg-card/40 p-6 md:p-9">
          <p className="eyebrow">Start a conversation</p>
          <h2 className="mt-3 text-2xl font-semibold md:text-3xl">Bring your perspective.</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            This form prepares an email in your own email app. You review it and choose when to
            send.
          </p>
          <form onSubmit={prepareDraft} className="mt-8 space-y-5">
            <fieldset>
              <legend className="text-sm font-medium">I'm connecting as</legend>
              <div className="mt-3 flex flex-wrap gap-2">
                {TYPES.map((item) => (
                  <button
                    key={item}
                    type="button"
                    aria-pressed={type === item}
                    onClick={() => setType(item)}
                    className={`rounded-full border px-3.5 py-2 text-xs transition ${type === item ? "border-emerald/60 bg-accent text-emerald-glow" : "text-muted-foreground hover:bg-accent/40"}`}
                  >
                    {item}
                  </button>
                ))}
              </div>
            </fieldset>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Your name
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  className={field}
                  placeholder="Full name"
                />
              </label>
              <label className="block text-sm font-medium">
                Your email
                <input
                  name="email"
                  required
                  type="email"
                  maxLength={254}
                  autoComplete="email"
                  className={field}
                  placeholder="you@example.com"
                />
              </label>
            </div>
            <label className="block text-sm font-medium">
              Organisation or location{" "}
              <span className="font-normal text-muted-foreground">(optional)</span>
              <input
                name="org"
                maxLength={150}
                autoComplete="organization"
                className={field}
                placeholder="Farm, FPO, university or company"
              />
            </label>
            <label className="block text-sm font-medium">
              What would you like to explore?
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={1800}
                rows={5}
                className={`${field} resize-y`}
                placeholder="Tell us about your farming challenge, research idea or interest in collaborating…"
              />
            </label>
            <button
              type="submit"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-emerald-gradient px-6 py-4 text-sm font-semibold text-primary-foreground transition hover:brightness-110"
            >
              <Send className="size-4" /> Open email draft <ArrowUpRight className="size-4" />
            </button>
            {draftOpened && (
              <p
                role="status"
                className="rounded-xl border border-emerald/30 bg-accent/40 p-4 text-sm leading-relaxed"
              >
                Your email app may now show a draft. Review and send it there. Nothing has been sent
                or saved by this website. If no email app opens, copy the address on this page.
              </p>
            )}
            <p className="text-xs leading-relaxed text-muted-foreground">
              Your details are used only to fill the email draft. This website does not collect this
              form's contents.
            </p>
          </form>
        </div>
      </section>
      <section className="border-t bg-charcoal">
        <div className="mx-auto grid max-w-7xl gap-8 px-5 py-16 sm:grid-cols-2 md:px-8 lg:grid-cols-4">
          {[
            {
              icon: Sprout,
              title: "Farmers & FPOs",
              copy: "Tell us which field tasks and information gaps matter most.",
            },
            {
              icon: Leaf,
              title: "Pilot partners",
              copy: "Explore supervised trials in suitable crop and soil conditions.",
            },
            {
              icon: GraduationCap,
              title: "Research & learning",
              copy: "Bring agricultural, mechanical, embedded or AI expertise.",
            },
            {
              icon: Users,
              title: "Ecosystem builders",
              copy: "Explore mentoring, investment and practical collaboration.",
            },
          ].map((item) => (
            <div key={item.title}>
              <item.icon className="size-6 text-emerald-glow" />
              <h3 className="mt-4 text-base font-medium">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.copy}</p>
            </div>
          ))}
        </div>
      </section>
    </>
  );
}

