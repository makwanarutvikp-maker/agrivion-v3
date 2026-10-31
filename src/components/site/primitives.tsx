import { type ReactNode } from "react";
import { Link } from "@tanstack/react-router";
import { cn } from "@/lib/utils";
export type Status = "prototype" | "proposed" | "roadmap" | "simulated";
const statusMap = {
  prototype: { label: "In development", cls: "border-emerald/25 bg-emerald/5 text-emerald-glow" },
  proposed: { label: "Planned feature", cls: "border-proposed/25 bg-proposed/5 text-proposed" },
  roadmap: { label: "Planned development", cls: "border-warning/25 bg-warning/5 text-warning" },
  simulated: { label: "Sample data", cls: "border-warning/25 bg-warning/5 text-warning" },
};
export function StatusTag({ status, className }: { status: Status; className?: string }) {
  const item = statusMap[status];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-3 py-1.5 text-xs font-medium",
        item.cls,
        className,
      )}
    >
      <span aria-hidden className="size-1.5 rounded-full bg-current" />
      {item.label}
    </span>
  );
}
export function Magnetic({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
  strength?: number;
}) {
  return <span className={cn("inline-flex", className)}>{children}</span>;
}
export function CtaLink({
  to,
  children,
  variant = "primary",
}: {
  to: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
}) {
  return (
    <Link
      to={to}
      preload="intent"
      className={cn(
        "pro-button",
        variant === "ghost" ? "pro-button-secondary" : "pro-button-primary",
      )}
    >
      {children}
    </Link>
  );
}
export function SplitHeadline({
  text,
  className,
  as: Tag = "h1",
}: {
  text: string;
  className?: string;
  as?: "h1" | "h2";
  delay?: number;
  onScroll?: boolean;
}) {
  return <Tag className={className}>{text}</Tag>;
}
export function Reveal({
  children,
  className,
  id,
  as: Tag = "section",
}: {
  children: ReactNode;
  className?: string;
  id?: string;
  as?: "section" | "div";
}) {
  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  );
}
export function PageHero({
  eyebrow,
  title,
  intro,
  children,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  children?: ReactNode;
}) {
  return (
    <header className="pro-page-hero">
      <div className="pro-container">
        <p className="eyebrow">{eyebrow.replace(/^\d+\s*\/\s*/, "")}</p>
        <h1>{title}</h1>
        <p className="pro-page-intro">{intro}</p>
        {children && <div className="mt-6">{children}</div>}
      </div>
    </header>
  );
}
export function SectionTitle({
  eyebrow,
  title,
  body,
}: {
  eyebrow: string;
  title: string;
  body?: string;
}) {
  return (
    <div className="pro-section-title">
      <p className="eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
      {body && <p>{body}</p>}
    </div>
  );
}
