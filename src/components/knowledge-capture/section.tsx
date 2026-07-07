import type { ReactNode } from "react";

export function Section({
  number,
  title,
  description,
  badge,
  accent = false,
  children,
}: {
  number: string;
  title: string;
  description?: string;
  badge?: { label: string; tone?: "phase2" | "planned" | "ai" };
  accent?: boolean;
  children: ReactNode;
}) {
  const badgeClass =
    badge?.tone === "phase2"
      ? "bg-amber-100 text-amber-900 dark:bg-amber-500/15 dark:text-amber-200"
      : badge?.tone === "planned"
      ? "bg-sky-100 text-sky-900 dark:bg-sky-500/15 dark:text-sky-200"
      : "bg-violet-100 text-violet-900 dark:bg-violet-500/15 dark:text-violet-200";

  return (
    <section
      className={`rounded-2xl bg-card p-6 shadow-card transition-all duration-300 md:p-8 ${
        accent ? "ring-2 ring-primary/60" : ""
      }`}
    >
      <header className="mb-6 flex flex-wrap items-start justify-between gap-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-primary">
            {number}
          </p>
          <h2 className="mt-1 text-2xl font-bold tracking-tight md:text-3xl">{title}</h2>
          {description && (
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground md:text-base">
              {description}
            </p>
          )}
        </div>
        {badge && (
          <span
            className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold ${badgeClass}`}
          >
            {badge.label}
          </span>
        )}
      </header>
      {children}
    </section>
  );
}