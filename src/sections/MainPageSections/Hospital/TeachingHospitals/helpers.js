/**
 * The CMS keys the "intro" and "difference" header blocks by the
 * campus tab index, e.g. `"0"` for tab 1 and `"1"` for tab 2.
 * We can't rely on a fixed `"0"` lookup — pick the first numeric
 * key in the object instead so any tab works.
 */
export function pickIndexedBlock(obj) {
  if (!obj || typeof obj !== "object" || Array.isArray(obj)) return {};
  for (const key of Object.keys(obj)) {
    if (/^\d+$/.test(key)) return obj[key] || {};
  }
  return {};
}
