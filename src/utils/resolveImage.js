import { API_BASE } from "../config/api";

/**
 * Normalize an image URL coming from the CMS.
 *
 * Handles every shape the backend has been seen to return:
 *   1. Already-absolute https URLs                  → returned as-is
 *   2. Stale localhost URLs (127.0.0.1 / localhost) → host rewritten to API_BASE
 *      (these come from records authored against a local backend; in
 *      production they'd be blocked as mixed content / DNS-fail)
 *   3. Paths starting with `/storage/` or `storage/` → API_BASE prepended
 *   4. Bare relative paths                          → API_BASE/storage/<path>
 *
 * Also tolerates non-string inputs (returns "" for null, undefined,
 * objects, numbers, etc.) so component callers don't have to guard.
 */
export function resolveImage(src) {
  if (!src || typeof src !== "string") return "";
  const trimmed = src.trim();
  if (!trimmed) return "";

  // 2) localhost / 127.0.0.1 — keep the path, swap the host
  const localhost = trimmed.match(
    /^https?:\/\/(?:127\.0\.0\.1|localhost)(?::\d+)?(\/.+)$/i
  );
  if (localhost) return `${API_BASE}${localhost[1]}`;

  // 1) already absolute — trust it
  if (/^https?:\/\//i.test(trimmed)) return trimmed;

  // data: URIs and protocol-relative URLs — leave alone
  if (/^data:|^\/\//i.test(trimmed)) return trimmed;

  // 3 + 4) prefix relative paths with API_BASE
  const clean = trimmed.replace(/^\/+/, "");
  if (clean.startsWith("storage/")) return `${API_BASE}/${clean}`;
  return `${API_BASE}/storage/${clean}`;
}

export default resolveImage;
