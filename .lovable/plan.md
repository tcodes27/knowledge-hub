## Goal

Expand `/request` from a single-form page into a full **Knowledge Capture** intake experience with 6 sections, while keeping the existing form and its Google Apps Script submission exactly as-is.

## Page structure (src/routes/request.tsx)

Widen container from `max-w-2xl` to `max-w-4xl`. Update page hero:
- Eyebrow: "Knowledge Capture"
- H1: "Capture organizational knowledge."
- Sub: describes multiple intake paths (manual, files, imports, AI).

Update head title/description to reflect Knowledge Capture.

Render sections sequentially, each in its own `rounded-2xl bg-card p-8 shadow-card` container matching the current design language, with numbered section headers ("01 — Documentation Details", etc.).

## Sections

**1. Documentation Details** — Renders existing `<RequestForm />` unchanged, minus its submit button (see below). All fields preserved (title, category, description, priority, email).

**2. Submission Method** — 4 large selectable cards in a responsive grid (`grid-cols-1 md:grid-cols-2 lg:grid-cols-4`): Manual Entry, Upload Files, Import Existing Knowledge, AI Assisted. Each has an icon (lucide: `PenLine`, `Upload`, `Database`, `Sparkles`), title, one-line description. Selected card gets primary ring + subtle scale. Selection controls which of sections 3/4/5 is highlighted/expanded (they all remain visible but the chosen one gets a primary accent border; Manual Entry just scrolls back to section 1).

**3. Upload Files** — Drag-and-drop zone (`border-dashed`, hover state, `onDragOver`/`onDrop`). Shows:
- Supported formats row of chips: PDF, DOCX, XLSX, PPTX, CSV, TXT, MD, Images, ZIP (each chip with file-type color).
- "Max 25 MB per file · Multiple files supported".
- File preview cards list (icon by extension, name, size, fake progress bar at 100%, remove button).
- **"Phase 2"** badge in the section header.
- No upload happens; files stay in local state only.

**4. Import Existing Knowledge** — Grid of integration cards (`grid-cols-2 md:grid-cols-3 lg:grid-cols-4`) for: Google Docs, Google Sheets, Google Slides, Zendesk Export, ServiceNow Export, Jira Export, Confluence, Slack Export, Email Thread, Meeting Notes, Transcript. Each card shows icon + name + "Planned". Click opens a modal (reuses the existing modal styling from request-form) explaining the future import workflow for that source. **"Planned"** badge in the section header.

**5. AI Assisted Capture** — Large textarea with the specified placeholder. Row of disabled action buttons: Generate Draft, Extract Procedures, Summarize, Categorize, Tag Suggestions (with `Sparkles`/`Wand2`/`ListChecks`/`Tags` icons). Small helper text "Processing is disabled while AI capture is being built." **"AI Coming Soon"** badge in the section header.

**6. Submit** — Sticky-feel footer card containing:
- The existing Submit Request button (moved out of RequestForm and wired to the same submission flow).
- Below: a subtle notice line: "Uploaded files and integrations show 'Available in Phase 2' — only the manual form submits today."

## Component changes

- **`src/components/request-form.tsx`**: Add optional `hideSubmit?: boolean` and expose an imperative submit via a `ref` OR (simpler) split into `RequestFormFields` + `useRequestFormSubmit` — but to keep scope minimal: add a `hideSubmit` prop and a `formId` prop; the external submit button uses `form="knowledge-capture-form"`. Modal + Google Apps Script call remain inside `RequestForm` untouched.
- **New file `src/components/knowledge-capture/method-cards.tsx`** — 4-card selector.
- **New file `src/components/knowledge-capture/file-uploader.tsx`** — drag-drop + chips + preview list.
- **New file `src/components/knowledge-capture/import-integrations.tsx`** — grid + per-integration modal.
- **New file `src/components/knowledge-capture/ai-assisted.tsx`** — textarea + disabled action buttons.
- **New file `src/components/knowledge-capture/section.tsx`** — reusable numbered section wrapper with title + optional status badge.

All new components use existing tokens (`bg-card`, `text-primary`, `shadow-card`, `rounded-2xl`, focus rings) — no new colors, no new deps.

## Preserved behavior

- Google Apps Script call, payload shape, success/error modals: unchanged.
- Existing field labels, validation, priority pill styling: unchanged.
- Responsive behavior + animations reuse existing `animate-fade-in` / `animate-scale-in` / hover translate patterns.
- Accessibility: cards are `<button>` elements with `aria-pressed`; drop zone has `aria-label`; modals keep `role="dialog" aria-modal="true"`.

## Out of scope

No backend, no real uploads, no real integrations, no AI calls, no new dependencies.
