## Goal

Remove em dashes (—) and en dashes (–) used as sentence separators across the entire project. Rewrite each sentence for natural punctuation (commas, periods, parentheses, colons, or restructure). Do not do blind character replacement.

## Scope

158 dash occurrences across 25 files. Every file gets a pass; each sentence is rewritten in context.

### User-facing UI copy
- `src/routes/index.tsx`, `__root.tsx`, `admin.tsx`, `admin-preview.tsx`, `topics.tsx`, `topics.$slug.tsx`, `articles.$slug.tsx`, `request.tsx`
- `src/components/site-nav.tsx`, `search-panel.tsx`, `article-sections.tsx`, `home/testimonial.tsx`, `knowledge-capture/file-uploader.tsx`
- Includes headings, subheadings, buttons, nav labels, tooltips, empty states, toasts, form labels, placeholders, help text, error/success messages, page titles, meta descriptions.

### Content / data
- `src/data/articles.ts` (58 occurrences), `src/data/sample-imported-article.ts` (article body copy)

### Dev-facing / docs / comments
- `README.md`, `AGENTS.md`, `QA_TEST_PLAN.md`, `docs/developer/environment.md`, `src/routes/README.md`
- Code comments in `src/server.ts`, `src/services/googleAppsScript.ts`, `vite.config.ts`, `bunfig.toml`, `src/styles.css`

## Rewrite rules

- `"A — B."` where B extends A → `"A. B."` or `"A, B."`
- `"Title — Subtitle"` → `"Title | Subtitle"` (per user example) or `"Title: Subtitle"` where the colon reads more naturally
- Parenthetical em-dash asides (`"X — note — Y"`) → parentheses `"X (note) Y"` or split into two sentences
- En dashes used as ranges (e.g. `"9–5"`, `"2020–2024"`) → replace with the word "to" or a hyphen, whichever reads best per case (this counts as a sentence-flow rewrite, not blind swap)
- Keep meaning, tone, and length roughly the same; keep it professional

## Not changing

- Functionality, routes, business logic, API calls, styling, component structure
- ASCII hyphens (`-`) used inside identifiers, CSS class names, file paths, code, kebab-case, or compound modifiers ("real-time", "user-friendly"). Only rewrite ASCII hyphens if they are clearly acting as sentence separators in prose.
- The user's own Apps Script URL and env values

## Verification

- `rg '[—–]' .` (excluding `node_modules`, `*.gen.ts`, `dist`, `.lovable`, lockfiles) returns zero matches
- `bun run build` passes
- Spot-check preview: home, admin, request, topics, article pages read naturally
