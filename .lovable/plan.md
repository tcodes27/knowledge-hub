## Fix: stats alignment, default light theme, dark-mode yellow readability

Three scoped changes. Keeps the neon yellow highlights — just makes the text on them readable in dark mode.

### 1. Hero stats alignment + visible divider (`src/routes/index.tsx`)

"AVG. RESOLUTION" wraps to two lines while "ARTICLES" and "SELF-SERVE" stay on one, so `5 min` drops below `50+` / `24/7`. The `border-t` also nearly disappears on cream.

- Each grid item becomes `flex flex-col justify-between` with `min-h-[4.5rem]` so the numbers sit on a shared baseline regardless of label wrap.
- Add `min-h-[2rem]` and `leading-[1.25]` to the `<dt>` so single-line labels reserve two lines of space.
- Change the divider from `border-border` to `border-foreground/15` and bump `pt-8` → `pt-10`.

### 2. Default to light theme on first visit

Currently the theme falls back to the OS `prefers-color-scheme`, so dark-OS visitors land in dark mode. Stored preference should still win.

- `src/hooks/use-theme.ts` — in `getInitialTheme()`, drop the `matchMedia` fallback and return `"light"` when nothing is stored.
- `src/routes/__root.tsx` — update the inline `themeInitScript` the same way: if no stored value, use `"light"`.

### 3. Dark-mode yellow: keep the color, darken the text on it

The neon `#FFF76D` stays. The problem is text sitting on yellow in dark mode is unreadable because the `.highlight-yellow` utility uses `color: var(--foreground)` — which is cream in dark mode, so cream text ends up on cream-yellow.

- `src/styles.css` — in the `@utility highlight-yellow` block, change `color: var(--foreground)` to a fixed dark ink (`color: #1A130A`) so highlighted words always render as very dark brown/black on the yellow, in both themes. The light-mode look stays essentially identical (light `--foreground` was already near-black); dark mode goes from cream-on-yellow (invisible) to ink-on-yellow (crisp).
- Also set `--warning-foreground: #1A130A` inside `.dark` (currently `#17110B` — fine, but confirm consistency) and leave `--accent-foreground` (already `#17110B`) as-is. Warning/accent chip text was already dark, so this is a no-op safeguard.

### Out of scope

- No favicon, Apps Script, admin, or content changes.
- Yellow hue and highlight utility name are unchanged.

### Verification

1. Fresh browser (no storage) on a dark-OS machine → site loads in light mode.
2. Toggle to dark → the yellow highlight bands on the homepage ("operating knowledge", "editorial calm", testimonial phrase) show dark ink text on the yellow, clearly readable.
3. Hero: `5 min`, `50+`, `24/7` share a baseline; divider is clearly visible on cream.
