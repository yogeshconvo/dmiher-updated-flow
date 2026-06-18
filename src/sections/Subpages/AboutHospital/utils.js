/**
 * Livewire's form-builder occasionally serialises non-repeatable groups as
 * `{ "2": { ...fields } }` (numeric-keyed assoc) instead of the expected
 * flat `{ ...fields }`. The server-side `normalizeArray()` then coerces
 * those numeric-keyed objects into single-item lists like `[{ ...fields }]`.
 *
 * This helper accepts BOTH shapes (and the already-flat shape) and returns
 * the underlying flat object so the rest of the renderer can read field
 * paths normally. Pass-through for anything that's already shaped correctly.
 */
export function flattenNumericKeys(obj) {
  if (!obj || typeof obj !== "object") return obj;

  // Single-item array (post-normalizeArray shape) → unwrap to the inner object.
  if (Array.isArray(obj)) {
    if (
      obj.length === 1 &&
      obj[0] &&
      typeof obj[0] === "object" &&
      !Array.isArray(obj[0])
    ) {
      return obj[0];
    }
    return obj;
  }

  // Numeric-keyed assoc (pre-normalizeArray shape) → merge values into one object.
  const keys = Object.keys(obj);
  if (keys.length === 0) return obj;
  const allNumeric = keys.every((k) => /^\d+$/.test(k));
  if (!allNumeric) return obj;
  return Object.values(obj).reduce(
    (acc, v) => (v && typeof v === "object" ? { ...acc, ...v } : acc),
    {}
  );
}
