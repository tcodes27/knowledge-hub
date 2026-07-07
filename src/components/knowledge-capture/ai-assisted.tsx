import { useState } from "react";
import { Sparkles, Wand2, ListChecks, FolderTree, Tags, type LucideIcon } from "lucide-react";

const ACTIONS: { label: string; icon: LucideIcon }[] = [
  { label: "Generate Draft", icon: Wand2 },
  { label: "Extract Procedures", icon: ListChecks },
  { label: "Summarize", icon: Sparkles },
  { label: "Categorize", icon: FolderTree },
  { label: "Tag Suggestions", icon: Tags },
];

export function AiAssisted() {
  const [text, setText] = useState("");

  return (
    <div className="space-y-4">
      <textarea
        value={text}
        onChange={(e) => setText(e.target.value)}
        rows={8}
        placeholder="Paste documentation, SOPs, meeting notes, transcripts, or AI-generated content."
        className="w-full rounded-xl border border-border bg-background p-4 outline-none transition focus:border-primary focus:ring-4 focus:ring-primary/20"
      />
      <div className="flex flex-wrap gap-2">
        {ACTIONS.map((a) => {
          const Icon = a.icon;
          return (
            <button
              key={a.label}
              type="button"
              disabled
              className="inline-flex cursor-not-allowed items-center gap-2 rounded-full border border-border bg-muted/40 px-4 py-2 text-sm font-medium text-foreground/60"
            >
              <Icon className="h-4 w-4" />
              {a.label}
            </button>
          );
        })}
      </div>
      <p className="text-xs text-muted-foreground">
        Processing is disabled while AI capture is being built.
      </p>
    </div>
  );
}