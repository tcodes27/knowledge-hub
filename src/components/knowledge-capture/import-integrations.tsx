import { useState } from "react";
import {
  FileText,
  FileSpreadsheet,
  Presentation,
  LifeBuoy,
  Workflow,
  Kanban,
  BookOpen,
  MessagesSquare,
  Mail,
  ClipboardList,
  Mic,
  X,
  type LucideIcon,
} from "lucide-react";

type Integration = {
  id: string;
  name: string;
  icon: LucideIcon;
  blurb: string;
  workflow: string;
};

const INTEGRATIONS: Integration[] = [
  {
    id: "gdocs",
    name: "Google Docs",
    icon: FileText,
    blurb: "Import an existing Google Doc as a draft article.",
    workflow:
      "You'll authorize Google Workspace, pick a Doc, and its formatted content will be pulled into a new draft with headings, images, and links preserved.",
  },
  {
    id: "gsheets",
    name: "Google Sheets",
    icon: FileSpreadsheet,
    blurb: "Turn a sheet into a structured reference table.",
    workflow:
      "Pick a sheet and tab. Rows become entries and columns become fields, ready to be published as a searchable table or FAQ.",
  },
  {
    id: "gslides",
    name: "Google Slides",
    icon: Presentation,
    blurb: "Convert slides into a walkthrough article.",
    workflow:
      "Each slide is captured as a step with title, image, and speaker notes so a deck becomes a linear how-to guide.",
  },
  {
    id: "zendesk",
    name: "Zendesk Export",
    icon: LifeBuoy,
    blurb: "Migrate help center articles.",
    workflow:
      "Upload a Zendesk export or connect the API. Articles, sections, and categories are mapped into the knowledge base with authorship preserved.",
  },
  {
    id: "servicenow",
    name: "ServiceNow Export",
    icon: Workflow,
    blurb: "Bring in ServiceNow KB entries.",
    workflow:
      "Import a ServiceNow knowledge base export. Articles are reclassified into local categories and their metadata is retained.",
  },
  {
    id: "jira",
    name: "Jira Export",
    icon: Kanban,
    blurb: "Pull tickets or epics into runbooks.",
    workflow:
      "Select a project or filter. Resolved tickets become root-cause articles; epics become procedure summaries with linked evidence.",
  },
  {
    id: "confluence",
    name: "Confluence",
    icon: BookOpen,
    blurb: "Sync from a Confluence space.",
    workflow:
      "Pick a space and pages. Content is imported with headings, callouts, and attachments, and can stay one-way synced.",
  },
  {
    id: "slack",
    name: "Slack Export",
    icon: MessagesSquare,
    blurb: "Distill useful threads into articles.",
    workflow:
      "Point to a channel export. Long-lived threads are grouped by topic and offered as draft articles you can accept or discard.",
  },
  {
    id: "email",
    name: "Email Thread",
    icon: Mail,
    blurb: "Turn a forwarded thread into a Q&A.",
    workflow:
      "Forward an email chain to a dedicated address. The exchange is cleaned up and structured as question, answer, and follow-ups.",
  },
  {
    id: "meeting",
    name: "Meeting Notes",
    icon: ClipboardList,
    blurb: "Convert notes into decisions and procedures.",
    workflow:
      "Paste or upload meeting notes. Decisions, action items, and procedures are separated and each becomes its own linked article.",
  },
  {
    id: "transcript",
    name: "Transcript",
    icon: Mic,
    blurb: "Structure a call or interview transcript.",
    workflow:
      "Provide a Zoom, Meet, or Otter transcript. Speakers are identified, filler is removed, and the content is grouped into topic-based sections.",
  },
];

export function ImportIntegrations() {
  const [active, setActive] = useState<Integration | null>(null);

  return (
    <>
      <div className="grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {INTEGRATIONS.map((i) => {
          const Icon = i.icon;
          return (
            <button
              key={i.id}
              type="button"
              onClick={() => setActive(i)}
              className="group flex h-full flex-col items-start gap-3 rounded-2xl border border-border bg-background p-4 text-left transition-all duration-300 ease-out hover:-translate-y-0.5 hover:border-primary/40 hover:shadow-card focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30"
            >
              <span className="grid h-10 w-10 place-items-center rounded-lg bg-muted text-foreground/70 transition group-hover:bg-primary/10 group-hover:text-primary">
                <Icon className="h-5 w-5" />
              </span>
              <div className="min-w-0">
                <p className="truncate text-sm font-semibold">{i.name}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">Planned</p>
              </div>
            </button>
          );
        })}
      </div>

      {active && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={`${active.name} integration`}
          className="fixed inset-0 z-50 grid place-items-center bg-black/60 p-4 animate-fade-in"
          onClick={() => setActive(null)}
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative w-full max-w-md animate-scale-in rounded-2xl bg-card p-8 shadow-card-hover"
          >
            <button
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-4 top-4 rounded-full p-1.5 text-muted-foreground transition hover:bg-muted hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              <X className="h-4 w-4" />
            </button>
            <div className="grid h-12 w-12 place-items-center rounded-full bg-primary/10 text-primary">
              <active.icon className="h-6 w-6" />
            </div>
            <div className="mt-5 flex items-center gap-2">
              <h2 className="font-serif text-2xl">{active.name}</h2>
              <span className="inline-flex items-center rounded-full bg-sky-100 px-2.5 py-0.5 text-xs font-semibold text-sky-900 dark:bg-sky-500/15 dark:text-sky-200">
                Planned
              </span>
            </div>
            <p className="mt-2 text-sm text-muted-foreground">{active.blurb}</p>
            <div className="mt-4 rounded-xl bg-muted/50 p-4 text-sm text-foreground/80">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                How it will work
              </p>
              {active.workflow}
            </div>
            <button
              onClick={() => setActive(null)}
              className="mt-6 rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground transition hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary/40"
            >
              Got it
            </button>
          </div>
        </div>
      )}
    </>
  );
}