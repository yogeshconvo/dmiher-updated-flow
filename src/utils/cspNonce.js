/**
 * CSP nonce helpers.
 *
 * Two sources, in priority order:
 *   1. The <meta name="csp-nonce"> tag stamped by Laravel's FrontendController
 *      when it served this HTML. This nonce matches the CSP header on the
 *      page-load response and is the ONE you want for any <script> /
 *      <style> you append to the current document.
 *   2. GET /api/csp-nonce. The nonce returned is for the API request
 *      itself — useful only if a runtime injector hands the nonce back to
 *      the server for a subsequent navigation/HTML render.
 *
 * In Vite dev the meta tag's content is the literal string "__CSP_NONCE__"
 * because Vite doesn't process it; this helper treats that as "no nonce".
 */

const PLACEHOLDER = "__CSP_NONCE__";

/**
 * Read the nonce from the <meta> tag synchronously. Returns null when
 * no real nonce is present (dev, or production HTML that wasn't stamped).
 */
export function getCspNonce() {
  if (typeof document === "undefined") return null;
  const el = document.querySelector('meta[name="csp-nonce"]');
  const v = el?.getAttribute("content");
  if (!v || v === PLACEHOLDER) return null;
  return v;
}

/**
 * Fetch a fresh per-request nonce from the backend. Use this only when
 * you need a nonce to forward to a backend-rendered HTML response (rare).
 * Returns { nonce, enforce } or null on failure.
 */
export async function fetchCspNonce(apiBase = "") {
  try {
    const res = await fetch(`${apiBase}/api/csp-nonce`, {
      headers: { Accept: "application/json" },
      credentials: "same-origin",
      cache: "no-store",
    });
    if (!res.ok) return null;
    return await res.json();
  } catch {
    return null;
  }
}

/**
 * Attach the current document's nonce to an Element before insertion.
 * Convenience for runtime-injected <script>/<style> tags.
 *   const s = document.createElement("script");
 *   s.src = "https://example.com/widget.js";
 *   withNonce(s);
 *   document.head.appendChild(s);
 */
export function withNonce(el) {
  const n = getCspNonce();
  if (n && el) el.setAttribute("nonce", n);
  return el;
}
