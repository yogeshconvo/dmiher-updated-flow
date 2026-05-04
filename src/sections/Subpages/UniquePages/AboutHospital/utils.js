/**
 * Livewire's form-builder occasionally serialises non-repeatable groups as
 * `{ "2": { ...fields } }` (numeric-keyed assoc) instead of the expected
 * flat `{ ...fields }`. Same thing happens after a remove-and-resave cycle.
 *
 * This helper merges those numeric-keyed wrappers back into a flat object
 * so the rest of the renderer can read field paths normally. Pass-through
 * for anything that's already shaped correctly.
 */
export function flattenNumericKeys(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return obj;
  const keys = Object.keys(obj);
  if (keys.length === 0) return obj;
  const allNumeric = keys.every((k) => /^\d+$/.test(k));
  if (!allNumeric) return obj;
  return Object.values(obj).reduce(
    (acc, v) => (v && typeof v === "object" ? { ...acc, ...v } : acc),
    {}
  );
}
