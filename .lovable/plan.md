## Goal

Restore working Google Apps Script integration by providing the real deployment URL via an env file the app actually reads at runtime, while keeping `.env.example` as a clean, commit-safe template.

## Changes

1. **Create `.env.local`** (gitignored via `*.local`) with the real values so the app works:
   ```
   VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxpmOIPCyU1GwLdVdBx9fAWcDTS_dQbuO2zLnBfYaxp55bmOc_QA6rOt1WrAH9SOZZUrQ/exec
   VITE_GOOGLE_SHEET_ID=
   VITE_GOOGLE_DRIVE_FOLDER_ID=
   ```
   Vite auto-loads `.env.local` on dev/build, so `import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL` in `src/services/googleAppsScript.ts` will resolve to the real endpoint and the app will function.

2. **Leave `.env.example` unchanged** — keys present with empty values, comments explaining to copy to `.env.local`. Safe to commit.

3. **Confirm `.gitignore`** already has `*.local` and `.env`, so `.env.local` will never be committed. No change needed.

4. **Verify** with `bun run build` and check that the dev warning banner disappears (URL is now defined).

## Not changing

- `src/services/googleAppsScript.ts` logic
- Routing, API behavior, Apps Script code
- README / dev banner text
