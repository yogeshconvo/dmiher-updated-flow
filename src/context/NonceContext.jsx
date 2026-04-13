import { createContext, useContext } from "react";

const NonceContext = createContext("");

/**
 * Reads the CSP nonce injected by Laravel into <meta name="csp-nonce">.
 * Falls back to empty string in dev (where CSP is relaxed).
 */
export function getNonce() {
  if (typeof document === "undefined") return "";
  const meta = document.querySelector('meta[name="csp-nonce"]');
  return meta?.getAttribute("content") || "";
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
