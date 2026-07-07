import type { ReactNode } from "react";
import { SiteFooter, SiteNav } from "./site-nav";
import { BackToTop } from "./back-to-top";

export function PageShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh flex-col bg-background bg-grid">
      <SiteNav />
      <main className="flex-1">{children}</main>
      <SiteFooter />
      <BackToTop />
    </div>
  );
}
