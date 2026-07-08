## Diagnosis

Your `.env.local` is correct and contains the Apps Script URL. The admin page still shows "Apps Script URL not configured" because **Vite only reads `.env` files at dev-server startup**. Since `.env.local` was created/updated while the dev server was already running, the current process still has `VITE_GOOGLE_APPS_SCRIPT_URL` as `undefined`, so `isAppsScriptConfigured` is `false` and the admin fetch short-circuits with that exact message.

No code is broken. Nothing needs editing.

## Fix

Restart the Vite dev server so it re-reads `.env.local`:

1. Call `code--restart_dev_server` (no code changes).
2. Reload the `/admin` preview.
3. Verify the "Apps Script URL not configured" banner disappears and the request actually hits your `/exec` endpoint.

If after restart the endpoint responds but returns an error (CORS, permissions, sheet not found, etc.), that's a separate Apps Script deployment issue and I'll diagnose from the network response, not from env config.

## Files changed

None.
