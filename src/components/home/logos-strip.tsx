const LOGOS = ["Northwind", "Meridian", "Halcyon", "Fjord & Co.", "Atlas Labs", "Verano"];

export function LogosStrip() {
  return (
    <section className="border-y border-border bg-background">
      <div className="mx-auto max-w-[1400px] px-6 py-16 md:px-10">
        <p className="text-center text-[11px] font-medium uppercase tracking-[0.18em] text-muted-foreground">
          Trusted by teams that take documentation seriously
        </p>
        <div className="mt-10 grid grid-cols-2 items-center gap-x-8 gap-y-8 sm:grid-cols-3 md:grid-cols-6">
          {LOGOS.map((name) => (
            <div
              key={name}
              className="font-display text-center text-xl font-medium tracking-tight text-foreground/40 opacity-80 transition-opacity hover:opacity-100"
            >
              {name}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
