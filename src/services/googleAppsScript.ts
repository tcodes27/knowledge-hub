/**
 * Google Apps Script service.
 *
 * All communication with the deployed Apps Script Web App flows through this
 * module. The endpoint URL is read from `VITE_GOOGLE_APPS_SCRIPT_URL` so it
 * can be changed without touching application code.
 *
 * Every function returns an `ApiResult<T>` and never throws to the caller —
 * missing configuration and network errors are surfaced as `success: false`
 * so the UI can render a friendly message instead of crashing.
 */

const API_URL = import.meta.env.VITE_GOOGLE_APPS_SCRIPT_URL as string | undefined;

export type ApiResult<T = unknown> = { success: true; data: T } | { success: false; message: string; error?: unknown };

export interface DocumentationRequestInput {
  title: string;
  category?: string;
  description?: string;
  priority?: string;
  submittedBy?: string;
  source?: string;
  owner?: string;
  notes?: string;
  [key: string]: unknown;
}

export interface DocumentationRequest {
  request_id: string;
  title: string;
  category: string;
  description: string;
  priority: string;
  status: string;
  submitted_by: string;
  source: string;
  created_at: string;
  updated_at: string;
  owner?: string;
  notes?: string;
}

export const DOCUMENTATION_REQUEST_STATUSES = [
  "New",
  "In Review",
  "Drafting",
  "Approved",
  "Published",
  "Archived",
] as const;

export type DocumentationRequestStatus = (typeof DOCUMENTATION_REQUEST_STATUSES)[number];

export interface ArticleFeedbackInput {
  article_id?: string;
  article_slug?: string;
  helpful: boolean;
  comment?: string;
}

async function postToAppsScript<T = unknown>(body: Record<string, unknown>): Promise<ApiResult<T>> {
  if (!API_URL) {
    return {
      success: false,
      message: "Apps Script URL not configured.",
    };
  }

  try {
    const url = `${API_URL}${API_URL.includes("?") ? "&" : "?"}_=${Date.now()}`;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "text/plain;charset=utf-8",
      },
      body: JSON.stringify(body),
      cache: "no-store",
    });

    const json = await response.json();

    if (!json.success) {
      return {
        success: false,
        message: json.message ?? "Apps Script returned an error.",
      };
    }

    return {
      success: true,
      data: json,
    };
  } catch (error) {
    return {
      success: false,
      message: "Unable to reach Google Apps Script.",
      error,
    };
  }
}

/* -------------------------------------------------------------------------- */
/* Submit Documentation Request                                                */
/* -------------------------------------------------------------------------- */

export function submitDocumentationRequest(data: DocumentationRequestInput) {
  return postToAppsScript({
    action: "submitDocumentationRequest",

    title: data.title,
    category: data.category,
    description: data.description,
    priority: data.priority ?? "Medium",

    submittedBy: data.submittedBy ?? "Employee",

    source: data.source ?? "Knowledge Capture Hub",

    owner: data.owner ?? "",

    notes: data.notes ?? "",
  });
}

/* -------------------------------------------------------------------------- */
/* Get Requests                                                                */
/* -------------------------------------------------------------------------- */

export function getDocumentationRequests() {
  return postToAppsScript({
    action: "getDocumentationRequests",
  });
}

/* -------------------------------------------------------------------------- */
/* Update Status                                                               */
/* -------------------------------------------------------------------------- */

export function updateDocumentationRequestStatus(requestId: string, status: DocumentationRequestStatus) {
  return postToAppsScript({
    action: "updateDocumentationRequestStatus",

    request_id: requestId,

    status,
  });
}

/* -------------------------------------------------------------------------- */
/* Feedback                                                                    */
/* -------------------------------------------------------------------------- */

export function submitArticleFeedback(data: ArticleFeedbackInput) {
  return postToAppsScript({
    action: "submitArticleFeedback",

    article_id: data.article_id,

    article_slug: data.article_slug,

    helpful: data.helpful,

    comment: data.comment ?? "",
  });
}

export const isAppsScriptConfigured = Boolean(API_URL);
