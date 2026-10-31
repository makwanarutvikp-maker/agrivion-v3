import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { ArrowUpRight, Check, Copy, Download, Mail, MapPin, Phone } from "lucide-react";
import { PageHero } from "@/components/site/primitives";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Agrivion" },
      {
        name: "description",
        content:
          "Contact Agrivion about the agricultural rover, farmer app, research or farming needs. Based in Anand, Gujarat, India.",
      },
    ],
  }),
  component: Contact,
});

const EMAIL = "makwanabhaveshp@gmail.com";
const TOPICS = [
  "Rover & app information",
  "Farm needs & feedback",
  "Research & testing",
  "General enquiry",
];

function Contact() {
  const [draftOpened, setDraftOpened] = useState(false);
  const [copyStatus, setCopyStatus] = useState<"idle" | "copied" | "unavailable">("idle");

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
    ].join("\n");
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(`Agrivion enquiry: ${String(data.get("topic"))}`)}&body=${encodeURIComponent(body)}`;
    setDraftOpened(true);
  }

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(EMAIL);
      setCopyStatus("copied");
    } catch {
      setCopyStatus("unavailable");
    }
  }

  const field =
    "mt-2 min-h-12 w-full rounded-lg border bg-card px-3.5 py-3 text-sm font-normal outline-none transition-colors focus:border-primary focus:ring-2 focus:ring-ring/20";

  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="How can we help?"
        intro="Get in touch about the Agrivion rover, farmer app or development work. We also welcome feedback from farmers and agricultural organisations."
      />
      <section className="mx-auto grid max-w-7xl gap-8 px-5 pb-16 md:px-8 lg:grid-cols-[0.85fr_1.15fr] lg:gap-10">
        <div className="space-y-5">
          <div className="rounded-xl border bg-card p-6 md:p-8">
            <h2 className="text-xl font-semibold">Contact details</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Bhavesh Makwana · Agrivion project proposer
            </p>
            <div className="mt-6 space-y-5">
              <div>
                <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Mail className="size-4" />
                  Email
                </p>
                <a
                  href={`mailto:${EMAIL}`}
                  className="mt-2 inline-block break-all text-base font-medium text-primary hover:underline"
                >
                  {EMAIL}
                </a>
                <button
                  type="button"
                  onClick={copyEmail}
                  className="mt-1 flex min-h-11 items-center gap-1.5 text-sm text-muted-foreground hover:text-primary"
                >
                  {copyStatus === "copied" ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                  {copyStatus === "copied" ? "Email copied" : "Copy email address"}
                </button>
                {copyStatus === "unavailable" && (
                  <p role="status" className="text-xs text-muted-foreground">
                    Please select and copy the email address above.
                  </p>
                )}
                {copyStatus === "copied" && (
                  <span role="status" className="sr-only">
                    Email address copied to clipboard.
                  </span>
                )}
              </div>
              <div className="border-t pt-5">
                <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <Phone className="size-4" />
                  Phone
                </p>
                <a
                  href="tel:+917801834560"
                  className="mt-2 inline-flex min-h-11 items-center text-base font-medium hover:text-primary"
                >
                  +91 78018 34560
                </a>
              </div>
              <div className="border-t pt-5">
                <p className="flex items-center gap-2 text-xs font-medium text-muted-foreground">
                  <MapPin className="size-4" />
                  Location
                </p>
                <p className="mt-2 text-base">Anand, Gujarat, India</p>
              </div>
            </div>
          </div>
          <div className="rounded-xl border bg-card p-6">
            <h2 className="text-base font-semibold">Project information</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Agrivion is in development and testing. The synopsis includes the engineering
              approach, planned app features and development roadmap.
            </p>
            <a
              href="/Agrivion-Synopsis.pdf"
              download
              className="mt-4 inline-flex min-h-11 items-center gap-2 text-sm font-semibold text-primary hover:underline"
            >
              <Download className="size-4" />
              Download project synopsis
            </a>
          </div>
          <p className="px-1 text-xs leading-relaxed text-muted-foreground">
            B.Sc. (Hons.) Agriculture · B.A. College of Agriculture, Anand Agricultural University.
          </p>
        </div>
        <div className="rounded-xl border bg-card p-6 md:p-8">
          <h2 className="text-xl font-semibold">Write to us</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            Fill in your enquiry to prepare a draft in your email app. You can review it before
            sending.
          </p>
          <form onSubmit={prepareDraft} className="mt-6 space-y-5">
            <label className="block text-sm font-medium">
              Enquiry topic
              <select name="topic" className={field}>
                {TOPICS.map((topic) => (
                  <option key={topic}>{topic}</option>
                ))}
              </select>
            </label>
            <div className="grid gap-5 sm:grid-cols-2">
              <label className="block text-sm font-medium">
                Name
                <input
                  name="name"
                  required
                  minLength={2}
                  maxLength={100}
                  autoComplete="name"
                  className={field}
                  placeholder="Your name"
                />
              </label>
              <label className="block text-sm font-medium">
                Email
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
                placeholder="Farm, organisation or town"
              />
            </label>
            <label className="block text-sm font-medium">
              Message
              <textarea
                name="message"
                required
                minLength={10}
                maxLength={1800}
                rows={5}
                className={`${field} resize-y`}
                placeholder="Tell us what you would like to know."
              />
            </label>
            <button
              type="submit"
              className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-lg bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              <Mail className="size-4" />
              Open email draft
              <ArrowUpRight className="size-4" />
            </button>
            {draftOpened && (
              <p role="status" className="rounded-lg border bg-accent p-4 text-sm leading-relaxed">
                A draft may have opened in your email app. Review and send it there. Nothing has
                been sent by this website. If your email app did not open, use the address on this
                page.
              </p>
            )}
            <p className="text-xs leading-relaxed text-muted-foreground">
              This form only prepares an email. The website does not store or submit your details.
            </p>
          </form>
        </div>
      </section>
    </>
  );
}
