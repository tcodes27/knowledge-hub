import { PenLine, Upload, Database, Sparkles, type LucideIcon } from "lucide-react";

export type MethodId = "manual" | "upload" | "import" | "ai";

const METHODS: {
  id: MethodId;
  title: string;
  description: string;
  icon: LucideIcon;
}[] = [
  {
    id: "manual",
    title: "Manual Entry",
    description: "Write the article yourself using the form above.",
    icon: PenLine,
  },
  {
    id: "upload",
    title: "Upload Files",
    description: "Drop documents, spreadsheets, decks, or images.",
    icon: Upload,
  },
  {
    id: "import",
    title: "Import Existing Knowledge",
    description: "Pull from Google, Zendesk, Jira, Confluence, Slack, and more.",
    icon: Database,
  },
  {
    id: "ai",
    title: "AI Assisted",
    description: "Paste raw notes and let AI structure them into an article.",
    icon: Sparkles,
  },
];

export function MethodCards({
  value,
  onChange,
}: {
  value: MethodId;
  onChange: (id: MethodId) => void;
}) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-4">
      {METHODS.map((m) => {
        const Icon = m.icon;
        const selected = value === m.id;
        return (
          <button
            key={m.id}
            type="button"
            aria-pressed={selected}
            onClick={() => onChange(m.id)}
            className={`group relative flex h-full flex-col rounded-2xl border p-5 text-left transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 ${
              selected
                ? "border-primary bg-primary/5 shadow-card-hover"
                : "border-border bg-background hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card"
            }`}
          >
            <span
              className={`grid h-11 w-11 place-items-center rounded-xl transition ${
                selected
                  ? "bg-primary text-primary-foreground"
                  : "bg-muted text-foreground/70 group-hover:bg-primary/10 group-hover:text-primary"
              }`}
            >
              <Icon className="h-5 w-5" />
            </span>
            <h3 className="mt-4 text-base font-semibold">{m.title}</h3>
            <p className="mt-1 text-sm text-muted-foreground">{m.description}</p>
          </button>
        );
      })}
    </div>
  );
}