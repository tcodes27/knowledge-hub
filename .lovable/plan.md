## Problem

The `/admin` page shows "Couldn't load requests — Apps Script URL not configured." This happens because the remixed project lost its local `.env.local` file, which contained `VITE_GOOGLE_APPS_SCRIPT_URL`. The frontend service short-circuits when that variable is undefined.

## Root cause

- `src/services/googleAppsScript.ts` reads `import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL`.
- When undefined, it returns `{ success: false, message: "Apps Script URL not configured." }`.
- `.env.local` is git-ignored, so remixing does not carry it over.

## Fix

1. Create/update `.env.local` in the project root with the URL you pasted:

```env
VITE_GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/AKfycbxOBh7ZTl0taF_B7hCQ8OYqHM8JmH7oVQl1Z3RfhQOZn27YSOKQ0gXupA_ubtYVkw5u4A/exec
```

2. Restart the dev server so Vite picks up the new variable.
3. Verify the `/admin` page loads requests successfully.

## What will not change

- No application code edits.
- No new dependencies.
- Existing form, admin UI, and Google Apps Script integration remain exactly as implemented.

## Verification

- `/admin` should no longer show the red "Apps Script URL not configured" error.
- The request list should populate from the Documentation_Requests sheet.
- `/request` submissions should reach the same Apps Script endpoint.