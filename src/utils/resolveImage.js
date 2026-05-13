import { API_BASE } from "../config/api";

/**
 * Normalize an image URL coming from the CMS.
 *
 * Handles every shape the backend has been seen to return — both the
 * post-refactor "assets/..." paths and the legacy "storage/..." paths
 * so the frontend keeps rendering old records until the migration
 * script has run end-to-end:
 *
 *   1. Already-absolute https URLs                  → returned as-is
 *   2. Stale localhost URLs (127.0.0.1 / localhost) → host rewritten
 *                                                    to API_BASE
 *      (these come from records authored against a local backend; in
 *      production they'd be blocked as mixed content / DNS-fail)
 *   3. Paths starting with `assets/`                → API_BASE prepended
 *                                                    (NEW — post-refactor)
 *   4. Paths starting with `/storage/` or `storage/` → API_BASE prepended
 *                                                    (LEGACY)
 *   5. Bare relative paths                          → assumed to be
 *                                                    new-style and
 *                                                    prefixed with
 *                                                    API_BASE/assets/<path>
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

  // 3 + 4 + 5) prefix relative paths with API_BASE
  const clean = trimmed.replace(/^\/+/, "");

  // New post-refactor paths already carry their root segment — just
  // hang them off API_BASE.
  if (clean.startsWith("assets/")) return `${API_BASE}/${clean}`;

  // Legacy records still in the DB use the old "storage/" prefix.
  if (clean.startsWith("storage/")) return `${API_BASE}/${clean}`;

  // Bare path with no recognisable root — assume new layout and put
  // it under assets/. Old bare paths (which used to resolve via the
  // public/storage symlink) will need the migration script to run
  // to keep working.
  return `${API_BASE}/assets/${clean}`;
}

export default resolveImage;
