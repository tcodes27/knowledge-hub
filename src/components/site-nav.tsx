import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { ThemeToggle } from "./theme-toggle";

const links = [
  { to: "/", label: "Home" },
  { to: "/topics", label: "Browse Topics" },
  { to: "/admin", label: "Admin" },
];

function Wordmark() {
  return (
    <Link to="/" className="group flex items-center gap-2.5">
      <span className="grid h-9 w-9 place-items-center rounded-md bg-primary text-primary-foreground font-display text-lg font-medium leading-none">
        K
      </span>
      <span className="text-[17px] font-medium tracking-tight text-foreground">
        Knowledge Hub
      </span>
    </Link>
  );
}

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-background/85 backdrop-blur transition-colors duration-300 ${
        scrolled ? "border-border" : "border-transparent"
      }`}
    >
      <div className="mx-auto flex h-20 max-w-[1400px] items-center justify-between gap-8 px-6 md:px-10">
        <Wordmark />
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              className="text-[14px] font-medium text-foreground/70 transition-colors duration-200 hover:text-foreground"
              activeOptions={{ exact: l.to === "/" }}
              activeProps={{ className: "text-[14px] font-medium text-foreground" }}
            >
              {l.label}
            </Link>
          ))}
        </nav>
        <div className="flex items-center gap-3">
          <ThemeToggle />
          <Link
            to="/request"
            className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-[14px] font-medium text-primary-foreground transition-all duration-200 hover:bg-[var(--primary)]/90 hover:-translate-y-px"
          >
            Submit Request
          </Link>
        </div>
      </div>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border bg-surface-2">
      <div className="mx-auto max-w-[1400px] px-6 py-20 md:px-10">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="md:col-span-2">
            <Wordmark />
            <p className="mt-5 max-w-sm text-[15px] leading-relaxed text-muted-foreground">
              A premium home for your organization's operating knowledge —
              editorial, searchable, and calm.
            </p>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Product
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              <li><Link to="/topics" className="text-foreground/75 hover:text-foreground">Topics</Link></li>
              <li><Link to="/request" className="text-foreground/75 hover:text-foreground">Capture Knowledge</Link></li>
              <li><Link to="/admin" className="text-foreground/75 hover:text-foreground">Admin</Link></li>
            </ul>
          </div>
          <div>
            <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
              Company
            </p>
            <ul className="mt-4 space-y-2.5 text-[14px]">
              <li className="text-foreground/75">About</li>
              <li className="text-foreground/75">Security</li>
              <li className="text-foreground/75">Contact</li>
            </ul>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-border pt-8 text-[13px] text-muted-foreground md:flex-row md:items-center">
          <span>© {new Date().getFullYear()} Knowledge Hub. All rights reserved.</span>
          <span className="uppercase tracking-[0.14em]">Editorial · Enterprise · Calm</span>
        </div>
      </div>
    </footer>
  );
}
