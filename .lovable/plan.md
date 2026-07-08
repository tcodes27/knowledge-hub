## Goal

Standardize Google Apps Script integration on Vite env vars, add a friendly startup warning when unconfigured, and refresh docs. No business logic, routing, or API behavior changes.

## Files

### Create `.env.example` (committed)
```env
# Google Apps Script Web App deployment URL (required)
VITE_GOOGLE_APPS_SCRIPT_URL=

# Google Spreadsheet ID used by Apps Script (optional)
VITE_GOOGLE_SHEET_ID=

# Google Drive folder used for generated documentation (optional)
VITE_GOOGLE_DRIVE_FOLDER_ID=
```

### Update `.gitignore`
- Keep `.env` and `*.local` ignored (already covered).
- Remove the `.env.example` line so the example file can be committed.

### Update `src/services/googleAppsScript.ts`
- Continue reading `import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL` (already the only source — no hardcoded URLs exist in the codebase).
- Add module-level, dev-only `console.warn` when the var is missing:
  > `[Knowledge Hub] Google Apps Script endpoint is not configured. Please set VITE_GOOGLE_APPS_SCRIPT_URL in your environment (see .env.example).`
- Optionally expose the two new optional vars as typed constants (`SHEET_ID`, `DRIVE_FOLDER_ID`) for future use, without changing existing request behavior.
- Existing `ApiResult` short-circuit on missing URL stays — no crashes.

### Update `src/routes/__root.tsx` (dev-only banner)
- On mount in dev (`import.meta.env.DEV`), if `VITE_GOOGLE_APPS_SCRIPT_URL` is missing, render a small dismissible dev-only banner at the top: "Google Apps Script endpoint is not configured. Copy `.env.example` to `.env.local` and set `VITE_GOOGLE_APPS_SCRIPT_URL`."
- Hidden in production builds. No layout impact when var is set.

### Update `README.md`
Replace the current "Environment Variables" section with:

```md
## Environment Variables

Copy `.env.example` to `.env.local` and populate the values before running the project:

| Variable | Required | Description |
|----------|----------|-------------|
| VITE_GOOGLE_APPS_SCRIPT_URL | Yes | Google Apps Script Web App deployment URL |
| VITE_GOOGLE_SHEET_ID | Optional | Google Spreadsheet ID used by Apps Script |
| VITE_GOOGLE_DRIVE_FOLDER_ID | Optional | Google Drive folder used for documentation |

```bash
cp .env.example .env.local
# then edit .env.local with your values
bun install && bun dev
```

`.env` and `.env.local` are git-ignored — only `.env.example` is committed.
```

## Out of scope
- No changes to routes, Apps Script code, request/response shape, or UI beyond the dev-only warning banner.
- No new dependencies.
