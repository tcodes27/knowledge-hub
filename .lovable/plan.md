I found two issues with the environment configuration that explain what happened to `.env.example`:

1. **`.env.example` contains a hardcoded real URL** — line 2 currently has a live Google Apps Script deployment URL (`https://script.google.com/macros/s/AKfycbxpmOIPCyU1GwLdVdBx9fAWcDTS_dQbuO2zLnBfYaxp55bmOc_QA6rOt1WrAH9SOZZUrQ/exec`). Per the earlier requirement, this file should be a clean template with empty values only.

2. **`.gitignore` lists `.env.example`** — line 20 of `.gitignore` ignores `.env.example`, so it will not be committed even though the requirement was to commit only `.env.example` and keep `.env`/`.env.local` ignored.

There is no `.env.local` file present yet, so the real URL is currently sitting in the example file where it should not be.

## Plan

1. **Sanitize `.env.example`**
   - Replace the hardcoded `VITE_GOOGLE_APPS_SCRIPT_URL` value with an empty placeholder.
   - Keep `VITE_GOOGLE_SHEET_ID` and `VITE_GOOGLE_DRIVE_FOLDER_ID` empty.
   - Add brief inline comments explaining each variable.

2. **Fix `.gitignore`**
   - Remove `.env.example` from `.gitignore` so the template is committed.
   - Keep `.env` and `*.local` ignored.

3. **Verify dev guidance still works**
   - Confirm the dev-only banner in `src/routes/__root.tsx` still instructs users to copy `.env.example` to `.env.local` and set the URL.
   - Confirm `src/services/googleAppsScript.ts` still reads from `import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL` and warns in dev when missing.

4. **Update README environment section (if needed)**
   - Ensure the README clearly tells users to copy `.env.example` to `.env.local` and populate the real URL there, not in `.env.example`.

## Out of scope
- No changes to Google Apps Script code.
- No changes to route logic, API behavior, or UI beyond the existing dev banner.
- No new dependencies.

After this change, `.env.example` will be a safe, commit-ready template and the real deployment URL will live only in `.env.local` (which remains git-ignored).