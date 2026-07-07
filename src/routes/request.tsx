import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Loader2, Send } from "lucide-react";
import { PageShell } from "@/components/page-shell";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { RequestForm } from "@/components/request-form";
import { Section } from "@/components/knowledge-capture/section";
import { MethodCards, type MethodId } from "@/components/knowledge-capture/method-cards";
import { FileUploader } from "@/components/knowledge-capture/file-uploader";
import { ImportIntegrations } from "@/components/knowledge-capture/import-integrations";
import { AiAssisted } from "@/components/knowledge-capture/ai-assisted";

const FORM_ID = "knowledge-capture-form";

export const Route = createFileRoute("/request")({
  head: () => ({
    meta: [
      { title: "Knowledge Capture — Knowledge Hub" },
      {
        name: "description",
        content:
          "Submit organizational knowledge via manual entry, file upload, existing integrations, or AI-assisted capture.",
      },
      { property: "og:title", content: "Knowledge Capture — Knowledge Hub" },
      {
        property: "og:description",
        content:
          "Submit organizational knowledge via manual entry, file upload, existing integrations, or AI-assisted capture.",
      },
    ],
  }),
  component: RequestPage,
});

function RequestPage() {
  const [method, setMethod] = useState<MethodId>("manual");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  return (
    <PageShell>
      <section className="mx-auto max-w-4xl px-6 pt-10 pb-24">
        <Breadcrumbs items={[{ label: "Knowledge Capture" }]} />
        <p className="text-sm font-medium uppercase tracking-wider text-primary">Knowledge Capture</p>
        <h1 className="mt-2 text-4xl font-extrabold tracking-tight md:text-5xl">
          Capture organizational knowledge.
        </h1>
        <p className="mt-3 text-lg text-muted-foreground">
          Write it, upload it, import it, or paste raw notes for AI to structure. Every path lands in the
          same review queue.
        </p>

        <div className="mt-10 space-y-6">
          <Section
            number="01 — Documentation Details"
            title="Documentation details"
            description="Tell us what the article is about. These fields are required."
            accent={method === "manual"}
          >
            <RequestForm hideSubmit formId={FORM_ID} onStatusChange={setStatus} />
          </Section>

          <Section
            number="02 — Submission Method"
            title="How do you want to submit?"
            description="Pick a method — you can combine several before submitting."
          >
            <MethodCards value={method} onChange={setMethod} />
          </Section>

          <Section
            number="03 — Upload Files"
            title="Upload supporting files"
            description="Drop in the raw material — we'll turn it into an article."
            badge={{ label: "Phase 2", tone: "phase2" }}
            accent={method === "upload"}
          >
            <FileUploader />
          </Section>

          <Section
            number="04 — Import Existing Knowledge"
            title="Import from existing sources"
            description="Pull content from the tools your team already uses."
            badge={{ label: "Planned", tone: "planned" }}
            accent={method === "import"}
          >
            <ImportIntegrations />
          </Section>

          <Section
            number="05 — AI Assisted Capture"
            title="AI assisted capture"
            description="Paste raw content and let AI shape it into a publishable article."
            badge={{ label: "AI Coming Soon", tone: "ai" }}
            accent={method === "ai"}
          >
            <AiAssisted />
          </Section>

          <Section number="06 — Submit" title="Submit for review">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Uploaded files and integrations show{" "}
                <span className="font-medium text-foreground/80">"Available in Phase 2"</span> — only the
                manual form submits today.
              </p>
              <button
                type="submit"
                form={FORM_ID}
                disabled={status === "loading"}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground shadow-card transition-all duration-300 ease-out hover:-translate-y-0.5 hover:scale-[1.02] hover:bg-primary/90 hover:shadow-card-hover focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/30 disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0 disabled:hover:scale-100"
              >
                {status === "loading" ? (
                  <>
                    Submitting… <Loader2 className="h-4 w-4 animate-spin" />
                  </>
                ) : (
                  <>
                    Submit request <Send className="h-4 w-4" />
                  </>
                )}
              </button>
            </div>
          </Section>
        </div>
      </section>
    </PageShell>
  );
}
