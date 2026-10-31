import { useEffect, useRef, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { Menu, X, ArrowRight, ArrowUp, Mail, Phone, MapPin } from "lucide-react";
import { cn } from "@/lib/utils";

export const NAV = [
  { to: "/", label: "Home" },
  { to: "/rover", label: "Agrivion Rover" },
  { to: "/ecosystem", label: "Farmer App" },
  { to: "/dashboard", label: "Rover Demo" },
  { to: "/about", label: "About Us" },
] as const;
const resources = [
  { to: "/technology", label: "Technology" },
  { to: "/intelligence", label: "Crop monitoring" },
  { to: "/applications", label: "Field applications" },
] as const;
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cn("pro-logo", className)}>
      <img src="/media/logo.webp" alt="" width={44} height={44} />
      <span>
        AGRIVION<small>From sowing to selling</small>
      </span>
    </span>
  );
}
export function Nav() {
  const [open, setOpen] = useState(false);
  const path = useRouterState({ select: (s) => s.location.pathname });
  const toggle = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    setOpen(false);
  }, [path]);
  useEffect(() => {
    if (!open) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpen(false);
        toggle.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);
  return (
    <header className="pro-header">
      <nav className="pro-nav" aria-label="Main navigation">
        <Link to="/" aria-label="Agrivion home">
          <Logo />
        </Link>
        <div className="pro-desktop-nav">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              preload="intent"
              activeOptions={{ exact: true }}
              aria-current={path === item.to ? "page" : undefined}
              className={cn("pro-nav-link", path === item.to && "is-active")}
            >
              {item.label}
            </Link>
          ))}
        </div>
        <div className="pro-nav-actions">
          <Link to="/contact" className="pro-contact-link">
            Contact us <ArrowRight size={16} />
          </Link>
          <button
            ref={toggle}
            type="button"
            className="pro-menu-toggle"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            aria-controls="mobile-nav"
            onClick={() => setOpen(!open)}
          >
            {open ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>
      {open && (
        <nav id="mobile-nav" aria-label="Mobile navigation" className="pro-mobile-nav">
          {NAV.map((item) => (
            <Link
              key={item.to}
              to={item.to}
              activeOptions={{ exact: true }}
              aria-current={path === item.to ? "page" : undefined}
              className={path === item.to ? "is-active" : ""}
            >
              {item.label}
            </Link>
          ))}
          <Link to="/contact">Contact us</Link>
          <div className="pro-mobile-resources">Learn more</div>
          {resources.map((item) => (
            <Link key={item.to} to={item.to}>
              {item.label}
            </Link>
          ))}
        </nav>
      )}
    </header>
  );
}
export function Footer() {
  return (
    <footer className="pro-footer">
      <div className="pro-footer-grid">
        <div>
          <Link to="/" aria-label="Agrivion home">
            <Logo />
          </Link>
          <p className="pro-footer-intro">
            Agricultural robotics, useful guidance and a connected farming community.
          </p>
          <p className="pro-footer-tagline">
            Smarter Fields. Better Decisions.
            <br />
            Stronger Farmers.
          </p>
        </div>
        <div>
          <h2>Explore</h2>
          <ul>
            {NAV.filter((item) => item.to !== "/").map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h2>Resources</h2>
          <ul>
            {resources.map((item) => (
              <li key={item.to}>
                <Link to={item.to}>{item.label}</Link>
              </li>
            ))}
            <li>
              <a href="/Agrivion-Synopsis.pdf" target="_blank" rel="noreferrer">
                Project synopsis (PDF)
              </a>
            </li>
          </ul>
        </div>
        <div>
          <h2>Get in touch</h2>
          <ul className="pro-footer-contact">
            <li>
              <Mail size={16} />
              <a href="mailto:makwanabhaveshp@gmail.com">makwanabhaveshp@gmail.com</a>
            </li>
            <li>
              <Phone size={16} />
              <a href="tel:+917801834560">+91 78018 34560</a>
            </li>
            <li>
              <MapPin size={16} />
              <span>Anand, Gujarat, India</span>
            </li>
          </ul>
        </div>
      </div>
      <div className="pro-footer-bottom">
        <p>© 2026 Agrivion. Products in development. Demos use sample data.</p>
        <button
          type="button"
          onClick={() =>
            window.scrollTo({
              top: 0,
              behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
                ? "instant"
                : "smooth",
            })
          }
        >
          Back to top <ArrowUp size={15} />
        </button>
      </div>
    </footer>
  );
}
