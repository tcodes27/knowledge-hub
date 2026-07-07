# Redesign to Cloudbeds-style "Knowledge Hub"

Pure UI/branding pass. All routes, forms, Google Apps Script integration, admin logic, article data, and component behavior stay exactly as they are today.

## 1. Rebrand to Knowledge Hub

Global find/replace of "Sprinter IT Hub" → **Knowledge Hub** in:
- `src/components/site-nav.tsx` (navbar wordmark + footer)
- `src/routes/__root.tsx` head (title, description, og:title, og:description, og:site_name)
- Per-route `head()` titles in `index.tsx`, `topics.tsx`, `topics.$slug.tsx`, `articles.$slug.tsx`, `request.tsx`, `admin.tsx`, `admin-preview.tsx`
- `README.md`, `AGENTS.md` (brand mentions only)
- Any hero copy referencing the old name

Logo mark: replace the purple `Activity` lucite icon with a minimal editorial wordmark — a thin square glyph + "Knowledge Hub" set in the display font. Rebuild inside `site-nav.tsx` (no new asset needed; SVG inline). Favicon: generate a small dark-brown square glyph, upload via `lovable-assets`, drop into `public/favicon.png`, delete default `public/favicon.ico`, wire in root `head().links`.

## 2. Design system rewrite (`src/styles.css`)

Replace the current purple/lavender token set with the Cloudbeds palette. This is the whole redesign — every component already consumes these tokens, so restyle propagates globally.

Tokens (light mode):

```text
--background        #FAFAF5   (warm off-white)
--card / popover    #FFFFFF
--surface           #FAFAF5
--surface-2         #F4F0E6
--foreground        #221A12   (primary text)
--muted-foreground  #8C8A84
--secondary-foreground #4E4B46
--border / input    #E8E4DA
--grid-line         #ECE8DE   (new token, used by bg grid utility)
--primary           #24190F   (dark brown CTA)
--primary-foreground #FFFFFF
--primary-hover     #3A2B1E
--ring              #24190F
--accent            #FFF76D   (highlight yellow)
--success           #8FD28A
--info              #DCEEFF / #99CAFF
--coral             #FF9671
--sage              #A7D79C
--radius            0.75rem   (12px, subtle)
```

Dark mode: invert to warm near-black `#1A150F` bg, cream text, keep accents. Same token names so no component edits needed.

Typography: load **Inter Tight** (display) + **Inter** (body) via `<link>` in `__root.tsx` head (per Tailwind v4 rules — no CSS URL import). Update `--font-display` / `--font-sans`. Refine the base `h1/h2/h3` weights to 400/500 with tighter tracking; set body to 18px.

New utilities in `styles.css`:
- `bg-grid` — thin `#ECE8DE` 1px lines on `#FAFAF5` via layered `linear-gradient` (barely visible architectural grid, used behind hero + section backgrounds)
- `shadow-soft` → `0 10px 30px rgba(0,0,0,.04)`
- `highlight-yellow` — inline text highlight span with `#FFF76D` background block for editorial hero words
- Replace `bg-gradient-primary` / `bg-gradient-hero` with flat brown/cream equivalents (kept as tokens so existing usages don't break)

## 3. Component restyle (no logic changes)

- **`site-nav.tsx`** — 80px height, white bg, thin `--border` bottom, wordmark left, minimal link row center, dark-brown CTA right. Footer: cream bg, three-column editorial layout with fine rules.
- **`page-shell.tsx`** — wider max width (1440px), larger vertical rhythm (`py-24 md:py-40`), grid background on hero sections.
- **Buttons** — update any `bg-primary` CTAs to use the new brown token (already automatic via tokens); ensure `rounded-xl`, `px-7 py-4`. Secondary variant: white + 1px `#2A2018` border.
- **Cards** (`article-card`, `category-tile`, request confirmation, knowledge-capture `section.tsx` + `method-cards.tsx`) — swap to `bg-card` with `border border-border`, `rounded-xl`, `shadow-soft`, generous internal padding (`p-8`).
- **Hero (`routes/index.tsx`)** — restructure to split layout: left column large editorial headline with 2–3 words wrapped in `highlight-yellow` spans + primary CTA; right column supporting paragraph + secondary CTA. Keep existing search panel below the fold, restyled.
- **Logos strip** — add a "Trusted by teams at" grayscale/opacity-40 logo row on home (placeholder SVG wordmarks; static, no data).
- **Testimonial section** — new static section on home matching reference: cream card, large pull-quote, avatar, right-side metrics panel, prev/next chevrons (decorative only).
- **Topics / category modal / article pages** — restyle only: swap purple accents to brown, cream surfaces, thin dividers, editorial type scale. Keep all navigation, search, walkthrough, and modal behavior.
- **Request form + knowledge capture sections** — keep every field, priority pill, "Phase 2" and "AI Coming Soon" badges, and Google Apps Script submit path. Restyle inputs to large minimal style (48px height, 1px border, no shadow, `rounded-lg`, generous label spacing).
- **Admin dashboard** — off-white bg, restyled KPI cards, thin-bordered tables, minimal chart colors from new palette. Data, quick actions, and modals unchanged.
- **Back-to-top, breadcrumbs, theme toggle** — token-driven, will restyle automatically; verify contrast.

## 4. Metadata + social

- Root `head()`: title "Knowledge Hub — IT knowledge, organized", matching description, `og:site_name`, `og:type: website`, twitter card.
- Per-route titles updated to `<Page> — Knowledge Hub`.
- Add leaf-route `og:image` only on home once a hero cover exists; skip elsewhere (per head-meta rules).

## 5. Animations

Keep existing fade/slide/scale keyframes but retune durations to 250–350ms and easing to a calmer curve. Remove `pulse-glow` usage from CTAs; keep hover `scale(1.02)` on cards only.

## 6. Explicitly NOT touched

- `src/services/googleAppsScript.ts`, `.env.local`, `src/routes/api/*`
- `src/data/articles.ts` content
- Route file names, params, loaders
- `request-form.tsx` field logic, validation, submit handler
- Admin data fetching + Quick Action modals
- `routeTree.gen.ts` (auto-generated)

## Files to change

Create: `public/favicon.png` (+ pointer), possibly `src/components/home/logos-strip.tsx`, `src/components/home/testimonial.tsx`.
Edit: `src/styles.css`, `src/routes/__root.tsx`, `src/components/site-nav.tsx`, `src/components/page-shell.tsx`, `src/components/article-card.tsx`, `src/components/category-tile.tsx`, `src/components/category-modal.tsx`, `src/components/breadcrumbs.tsx`, `src/components/back-to-top.tsx`, `src/components/request-form.tsx`, `src/components/knowledge-capture/*`, `src/routes/index.tsx`, `src/routes/topics.tsx`, `src/routes/topics.$slug.tsx`, `src/routes/articles.$slug.tsx`, `src/routes/request.tsx`, `src/routes/admin.tsx`, `src/routes/admin-preview.tsx`, `README.md`.
Delete: `public/favicon.ico`.

Result: same app, same features, dressed as a calm, editorial, brown-and-cream enterprise SaaS site branded Knowledge Hub.