## Fix: favicon and Apps Script updates not appearing

Two separate issues — both are cache / deployment problems, not code bugs. Small, targeted changes.

### 1. Favicon not updating across the platform

The new `public/favicon.png` exists and `__root.tsx` references `/favicon.png`, but browsers cache favicons very aggressively (often for weeks) and won't re-fetch on a normal reload. Nothing in the code is broken.

**Change:** cache-bust the favicon by appending a version query string so every browser/tab is forced to fetch the new file.

- `src/routes/__root.tsx` — update the icon link:
  - from `{ rel: "icon", type: "image/png", href: "/favicon.png" }`
  - to `{ rel: "icon", type: "image/png", href: "/favicon.png?v=2" }`
- Also add `{ rel: "shortcut icon", type: "image/png", href: "/favicon.png?v=2" }` so older browsers and the legacy `/favicon.ico` lookup pick up the PNG.

After deploy, users may still need one hard refresh (Cmd/Ctrl+Shift+R) in tabs already open — but new tabs, previews, and social crawlers will get the new icon immediately.

### 2. Apps Script changes not reflected on `/admin`

The frontend calls whatever URL is in `.env.local` → `VITE_GOOGLE_APPS_SCRIPT_URL`. That URL is unchanged and correct. If the admin page still shows no requests after you pasted the new script, one of these is true (all outside the code):

1. The new Apps Script code was saved but **not redeployed as a new version** — Apps Script `/exec` URLs keep serving the old code until you run **Deploy → Manage deployments → Edit (pencil) → Version: New version → Deploy**.
2. It was deployed as a **new deployment** instead, which produces a different `/exec` URL — in that case `.env.local` needs the new URL.
3. Browser is caching the `GET /exec?action=get_requests` response.

**Change (frontend only, presentation-safe):** add a `cache: "no-store"` and a cache-busting timestamp to the `get_requests` fetch so the browser and any intermediary never serve a stale response. This is a one-line addition in `src/services/googleAppsScript.ts` inside the existing GET call — no change to actions, payload shape, or the admin UI.

### What this plan does NOT change

- No changes to the Apps Script itself, the Google Sheet, the API contract, `.env.local`, admin page layout, filtering logic, or any other route.
- No favicon regeneration — the current PNG stays.

### Verification after build

1. Open `/admin` in a fresh tab → tab icon shows the new "K" mark.
2. Click **Refresh** on the Documentation Requests panel → network tab shows a new `get_requests` call with a `?_=<timestamp>` param and status 200.
3. If requests still don't appear, the issue is on the Apps Script deployment side (item 1 or 2 above), not the frontend — I'll give exact redeploy steps.
