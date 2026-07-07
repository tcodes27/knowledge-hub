## Problem

The `/admin` page shows no requests. The Apps Script call succeeds (HTTP 200), but the response payload looks like this:

```json
{"success": true, "requests": [
  {"Documentation Requests": "This is the intake queue...", "": ""},
  {"Documentation Requests": "", "": ""},
  {"Documentation Requests": "request_id", "": "notes"},
  {"Documentation Requests": "REQ-1001", "": ""},
  ...
]}
```

Root cause: the `Documentation_Requests` sheet has a **banner title in row 1**, a **blank row 2**, and the **real header row** (`request_id`, `title`, `category`, …, `notes`) in **row 3**. The current `getDocumentationRequests()` treats row 1 as headers, so every object comes back with keys like `"Documentation Requests"` and `""` instead of `request_id`, `status`, `priority`, etc. The frontend filter (New / In Review / Drafting / Approved) then matches nothing and renders an empty list.

`updateRequestStatus()` has the same assumption and will also fail (it can't find the `request_id` / `status` / `updated_at` columns in row 1).

## Fix (Apps Script only — no frontend, no sheet, no data-model changes)

Add a small helper that scans the top of the sheet for the real header row (the first row that contains `request_id`), and use it in both read/update functions.

### 1. New helper

```js
// Finds the header row (1-indexed) and returns { headerRow, headers, dataStartRow }
function findHeaderRow_(values) {
  for (var i = 0; i < Math.min(values.length, 20); i++) {
    var row = values[i].map(function (v) { return String(v || "").trim().toLowerCase(); });
    if (row.indexOf("request_id") !== -1) {
      return { headerRow: i + 1, headers: values[i], dataStartRow: i + 2 };
    }
  }
  throw new Error("Header row with 'request_id' not found.");
}
```

### 2. Update `getDocumentationRequests()`

- Read all values.
- Call `findHeaderRow_(values)` to locate the real headers.
- Map only rows **after** the header row into objects using those headers.
- Skip empty rows (rows where `request_id` is blank).

### 3. Update `updateRequestStatus()`

- Read all values.
- Call `findHeaderRow_(values)` to get `headers` and `dataStartRow`.
- Compute `idCol`, `statusCol`, `updatedCol` from those headers.
- Iterate from `dataStartRow` (not row 2) when searching for the matching `request_id`.
- Use `sheet.getRange(rowIndex, statusCol + 1)` / `updatedCol + 1` where `rowIndex` is the actual 1-indexed sheet row.

### 4. Optional but recommended: `submitDocumentationRequest()`

Right now `appendRow` assumes column order matches the hard-coded array. Once we know `headers`, we can build the row from a `{ column: value }` map so the append is resilient if the sheet columns are ever reordered. (Order-preserving append; no schema change.)

## Deployment note (for you to do after pasting the script)

In Apps Script: **Deploy → Manage deployments → edit the existing Web App deployment → New version → Deploy**. Reusing the same deployment keeps the current `/exec` URL, so no frontend `.env` change is needed.

## Out of scope

- No changes to `src/services/googleAppsScript.ts` or `src/routes/admin.tsx`.
- No changes to the Google Sheet structure (banner row stays where it is).
- No changes to API shape, actions, auth, or the `.env` URL.
