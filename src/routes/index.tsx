import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, BookOpen, PlusCircle } from "lucide-react";

import { PageShell } from "@/components/page-shell";
import { SearchPanel } from "@/components/search-panel";
import { LogosStrip } from "@/components/home/logos-strip";
import { Testimonial } from "@/components/home/testimonial";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Knowledge Hub | Enterprise knowledge, organized." },
      { name: "description", content: "A premium home for your organization's operating knowledge. Search, capture, and publish enterprise documentation with editorial calm." },
      { property: "og:title", content: "Knowledge Hub" },
      { property: "og:description", content: "A premium home for your organization's operating knowledge." },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <PageShell>
      {/* Hero: editorial split */}
      <section className="relative">
        <div className="mx-auto max-w-[1400px] px-6 pt-24 pb-32 md:px-10 md:pt-36 md:pb-40">
          <div className="grid grid-cols-1 items-end gap-16 lg:grid-cols-12">
            <div className="lg:col-span-8">
              <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Enterprise knowledge platform
              </p>
              <h1 className="mt-8 font-display text-[46px] font-normal leading-[1.02] tracking-[-0.03em] text-foreground sm:text-[64px] md:text-[80px] lg:text-[92px]">
                Your team's{" "}
                <span className="highlight-yellow">operating knowledge</span>,
                <br />
                organized with{" "}
                <span className="highlight-yellow">editorial calm</span>.
              </h1>
              <div className="mt-12 flex flex-wrap items-center gap-4">
                <Link
                  to="/topics"
                  className="inline-flex items-center gap-2 rounded-xl bg-primary px-7 py-4 text-[15px] font-medium text-primary-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-[var(--primary)]/90"
                >
                  Browse the knowledge base
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <Link
                  to="/request"
                  className="inline-flex items-center gap-2 rounded-xl border border-[#2A2018] bg-card px-7 py-4 text-[15px] font-medium text-foreground transition-all duration-200 hover:-translate-y-0.5 hover:bg-surface-2"
                >
                  Capture knowledge
                </Link>
              </div>
            </div>

            <div className="lg:col-span-4">
              <p className="max-w-md text-[19px] leading-[1.55] text-secondary-foreground/80">
                A premium, editorial workspace for enterprise documentation.
                Search across everything your team knows, capture new procedures
                in minutes, and publish with confidence.
              </p>
              <dl className="mt-10 grid grid-cols-3 gap-6 border-t border-foreground/15 pt-10">
                <div className="flex min-h-[4.5rem] flex-col justify-between">
                  <dt className="min-h-[2rem] text-[11px] font-medium uppercase leading-[1.25] tracking-[0.14em] text-muted-foreground">Avg. resolution</dt>
                  <dd className="font-display text-2xl font-medium text-foreground">5 min</dd>
                </div>
                <div className="flex min-h-[4.5rem] flex-col justify-between">
                  <dt className="min-h-[2rem] text-[11px] font-medium uppercase leading-[1.25] tracking-[0.14em] text-muted-foreground">Articles</dt>
                  <dd className="font-display text-2xl font-medium text-foreground">50+</dd>
                </div>
                <div className="flex min-h-[4.5rem] flex-col justify-between">
                  <dt className="min-h-[2rem] text-[11px] font-medium uppercase leading-[1.25] tracking-[0.14em] text-muted-foreground">Self-serve</dt>
                  <dd className="font-display text-2xl font-medium text-foreground">24/7</dd>
                </div>
              </dl>
            </div>
          </div>

          {/* Search band */}
          <div className="mt-24 rounded-2xl border border-border bg-card p-6 shadow-card md:p-10">
            <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Search the knowledge base
            </p>
            <div className="mt-5">
              <SearchPanel />
            </div>
          </div>
        </div>
      </section>

      <LogosStrip />

      {/* Two-up CTAs */}
      <section className="bg-background">
        <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-40">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {[
              {
                to: "/topics",
                eyebrow: "Browse",
                title: "Every topic, one library.",
                body: "Explore all IT documentation and troubleshooting guides, organized by category.",
                cta: "Browse topics",
                icon: BookOpen,
              },
              {
                to: "/request",
                eyebrow: "Capture",
                title: "Turn what you know into an article.",
                body: "Write it, upload it, import it, or paste raw notes for AI to structure. Every path lands in the same review queue.",
                cta: "Submit request",
                icon: PlusCircle,
              },
            ].map((c) => (
              <Link
                key={c.to}
                to={c.to}
                className="group flex h-full flex-col rounded-2xl border border-border bg-card p-10 shadow-card transition-all duration-300 ease-out hover:-translate-y-0.5 hover:shadow-card-hover md:p-12"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-10 w-10 place-items-center rounded-lg bg-primary text-primary-foreground">
                    <c.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
                    {c.eyebrow}
                  </p>
                </div>
                <h3 className="mt-8 font-display text-3xl font-medium leading-[1.1] tracking-tight text-foreground md:text-4xl">
                  {c.title}
                </h3>
                <p className="mt-4 text-[16px] leading-relaxed text-muted-foreground">
                  {c.body}
                </p>
                <span className="mt-10 inline-flex items-center gap-2 text-[14px] font-medium text-foreground transition-all group-hover:gap-3">
                  {c.cta}
                  <ArrowRight className="h-4 w-4" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <Testimonial />
    </PageShell>
  );
}
