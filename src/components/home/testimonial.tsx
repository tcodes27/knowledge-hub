import { ChevronLeft, ChevronRight } from "lucide-react";

export function Testimonial() {
  return (
    <section className="bg-surface-2">
      <div className="mx-auto max-w-[1400px] px-6 py-32 md:px-10 md:py-40">
        <div className="mb-10 flex items-center justify-between">
          <p className="text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
            What teams say
          </p>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Previous"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground/70 transition hover:text-foreground"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              type="button"
              aria-label="Next"
              className="grid h-11 w-11 place-items-center rounded-full border border-border bg-card text-foreground/70 transition hover:text-foreground"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10 lg:grid-cols-[1.6fr_1fr]">
          <div className="rounded-2xl border border-border bg-card p-10 shadow-card md:p-14">
            <p className="font-display text-3xl leading-[1.15] tracking-tight text-foreground md:text-4xl">
              "We replaced three tools with Knowledge Hub. Our team now finds
              answers in seconds — and the writing experience is
              <span className="highlight-yellow"> genuinely a pleasure</span>."
            </p>
            <div className="mt-10 flex items-center gap-4">
              <div className="grid h-12 w-12 place-items-center rounded-full bg-primary text-primary-foreground font-display text-lg font-medium">
                LR
              </div>
              <div>
                <div className="text-[15px] font-medium text-foreground">Lena Reyes</div>
                <div className="text-[13px] text-muted-foreground">Head of Operations, Meridian Group</div>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-1">
            <Metric value="4.9×" label="Faster answers" />
            <Metric value="82%" label="Ticket deflection" />
            <Metric value="1,240" label="Articles migrated" />
          </div>
        </div>
      </div>
    </section>
  );
}

function Metric({ value, label }: { value: string; label: string }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-8">
      <div className="font-display text-4xl font-medium tracking-tight text-foreground md:text-5xl">
        {value}
      </div>
      <div className="mt-2 text-[11px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
        {label}
      </div>
    </div>
  );
}
