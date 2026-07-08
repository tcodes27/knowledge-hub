## Goal

Rewrite `README.md` as a polished portfolio case study for Knowledge Hub, and embed the six screenshots the user just uploaded so the README visually walks through the product.

## Scope

- Rewrite `README.md` only.
- Copy the six uploaded screenshots from `/mnt/user-uploads/` into `images/` in the repo (git-tracked, so they render on GitHub) with descriptive filenames.
- No app code, styles, or route changes.

## Screenshots to add

Copy from `user-uploads://` → `images/`:

| Source upload | New file | Used in README section |
| --- | --- | --- |
| `Screenshot_2026-07-08_at_1.06.55_PM.png` | `images/hero-light.png` | Hero / Overview |
| `Screenshot_2026-07-08_at_1.07.11_PM.png` | `images/browse-topics-light.png` | Knowledge Library |
| `Screenshot_2026-07-08_at_1.07.25_PM.png` | `images/category-modal.png` | Category deep-dive |
| `Screenshot_2026-07-08_at_1.07.34_PM.png` | `images/article-overview.png` | Article / Request Details |
| `Screenshot_2026-07-08_at_1.07.45_PM.png` | `images/article-step-light.png` | Interactive walkthrough (light) |
| `Screenshot_2026-07-08_at_1.08.13_PM.png` | `images/article-step-dark.png` | Interactive walkthrough (dark) — shows theme system |

Existing `images/admin-dashboard.png` (already referenced in the current README) stays and powers the Dashboard section. For the Google Sheets backend, Google Apps Script backend, Analytics, and Workflow sections — the user did not upload screenshots for these, so use markdown placeholder image links (`images/google-sheets-backend.png`, etc.) with a short italic caption noting the placeholder, so the user can drop real images in later without editing the README.

## README structure (final)

1. **Hero** — Title, one-sentence pitch, badge row (React, TypeScript, Tailwind CSS, Supabase, Google Apps Script, Google Sheets, Google Docs, Google Drive, Gmail, Cloudflare Pages).
2. **Overview** — Centralizes knowledge, automates documentation, single source of truth. Embed `hero-light.png` under the intro.
3. **Key Features** — Markdown table covering all 12 requested capabilities.
4. **Screenshots** — Sections: Dashboard, Documentation Requests, Knowledge Library, Analytics, Request Details, Google Sheets backend, Google Apps Script backend, Workflow. Each has an image (real or placeholder) + 1–2 sentence explanation. Also add a "Light & Dark Mode" mini-section pairing `article-step-light.png` and `article-step-dark.png`.
5. **Architecture** — Mermaid `flowchart TD`: Frontend → Supabase → Apps Script → Sheets → Docs → Drive → Gmail.
6. **Workflow** — Mermaid `flowchart TD` for the request lifecycle.
7. **Technology Stack** — Grouped tables (Frontend, Backend, Google Workspace, Deployment, Version Control).
8. **Google Workspace Integration** — Subsections per service.
9. **Documentation Workflow** — Status lifecycle: New → In Review → Drafting → Approved.
10. **Dashboard Features** — Bulleted capability list.
11. **UI Design** — Design system callout (enterprise SaaS, editorial typography, dark theme, accessibility).
12. **Engineering Highlights** — Technical accomplishments.
13. **Future Enhancements** — Roadmap table.
14. **Project Structure** — Directory tree matching current `src/`.
15. **Installation** — `npm install` / `dev` / `build` / `preview`.
16. **Environment Variables** — Table: `SUPABASE_URL`, `SUPABASE_ANON_KEY`, `GOOGLE_SCRIPT_URL`, `GOOGLE_DRIVE_FOLDER`.
17. **Author** — Tierra Barrow, AI Support Operations Manager / AI Automation Consultant, GitHub link, live site `https://knowledge-hub.tierrabcodes.workers.dev/`.

## Style rules

- Concise, technical, professional tone.
- Length target: ~350–450 lines.
- Tables, Mermaid diagrams, blockquote callouts, shields.io badges.
- No emojis in Mermaid syntax.
- Descriptions stay accurate to the actual codebase (TanStack Start, Vite, Tailwind v4, shadcn/ui, Google Apps Script service layer already in `src/services/googleAppsScript.ts`).

## Out of scope

- App code, routes, or styles.
- Actually wiring Supabase (README describes the intended architecture, matching the current README's phased notes).
- Generating fake screenshots for the backend/analytics/workflow slots — those stay as clearly-labeled placeholder paths.
