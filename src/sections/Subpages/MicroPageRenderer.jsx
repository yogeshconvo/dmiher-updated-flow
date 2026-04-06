/**
 * MicroPageRenderer is NOT needed.
 *
 * Micro-page sections are rendered by PageView using the same
 * SECTION_COMPONENTS registry from index.js — no custom renderer required.
 *
 * See: src/hooks/useMicroPage.js   ← fetches + caches micro-page data
 *      src/PageView.jsx            ← reads cache, injects sections into normal flow
 *      src/sections/*/index.js     ← where section_id → component is defined
 */
export {};
