import { createContext, useContext } from "react";

const NonceContext = createContext("");
const PLACEHOLDER = "__CSP_NONCE__";

// Module-level cache so synchronous getNonce() calls from useScript /
// FloatingButtons / NpfInlineCard / EnquiryGlobal resolve without a hook.
let cachedNonce = "";

function readMetaNonce() {
  if (typeof document === "undefined") return "";
  const meta = document.querySelector('meta[name="csp-nonce"]');
  const v = meta?.getAttribute("content") || "";
  return v && v !== PLACEHOLDER ? v : "";
}

/**
 * Reads the per-request CSP nonce.
 *
 * The nonce is generated and applied entirely by the frontend SSR server
 * (server.js): it stamps the value into <meta name="csp-nonce"> and the entry
 * <script> tag, and sets the matching Content-Security-Policy header. There is
 * NO backend round-trip — the React runtime only reads what the frontend
 * already put on the page.
 *
 * Priority:
 *   1. Module cache
 *   2. <meta name="csp-nonce"> stamped by server.js
 *   3. "" — plain Vite dev (`npm run dev`), where the dev CSP uses
 *      'unsafe-inline' so runtime-injected scripts need no nonce attribute.
 */
export function getNonce() {
  if (cachedNonce) return cachedNonce;
  const fromMeta = readMetaNonce();
  if (fromMeta) cachedNonce = fromMeta;
  return cachedNonce;
}

export function NonceProvider({ children }) {
  const nonce = getNonce();
  return (
    <NonceContext.Provider value={nonce}>{children}</NonceContext.Provider>
  );
}

export function useNonce() {
  return useContext(NonceContext);
}

export default NonceContext;
