import { createContext, useContext, useEffect, useState } from "react";
import api from "../config/api";

const NonceContext = createContext("");
const PLACEHOLDER = "__CSP_NONCE__";

// Module-level cache so synchronous getNonce() calls from useScript /
// FloatingButtons / EnquiryGlobal can see the backend-fetched nonce
// after NonceProvider has resolved it.
let cachedNonce = "";

function readMetaNonce() {
  if (typeof document === "undefined") return "";
  const meta = document.querySelector('meta[name="csp-nonce"]');
  const v = meta?.getAttribute("content") || "";
  return v && v !== PLACEHOLDER ? v : "";
}

function stampMetaNonce(n) {
  if (typeof document === "undefined" || !n) return;
  let meta = document.querySelector('meta[name="csp-nonce"]');
  if (!meta) {
    meta = document.createElement("meta");
    meta.setAttribute("name", "csp-nonce");
    document.head.appendChild(meta);
  }
  meta.setAttribute("content", n);
}

/**
 * Reads the CSP nonce. Priority:
 *   1. Module cache (set by NonceProvider after backend fetch)
 *   2. <meta name="csp-nonce"> stamped by Laravel's FrontendController
 *   3. Empty string (dev fallback — Vite leaves the placeholder unresolved)
 */
export function getNonce() {
  if (cachedNonce) return cachedNonce;
  const fromMeta = readMetaNonce();
  if (fromMeta) {
    cachedNonce = fromMeta;
    return fromMeta;
  }
  return "";
}

export function NonceProvider({ children }) {
  const [nonce, setNonce] = useState(() => getNonce());

  useEffect(() => {
    if (nonce) return;

    // Meta tag had no real nonce (Vite dev, or HTML wasn't stamped).
    // Pull a fresh per-request nonce from the backend so runtime-injected
    // scripts (NoPaperForms widget, etc.) carry a valid nonce attribute.
    let cancelled = false;
    api
      .get("/csp-nonce")
      .then((res) => {
        const n = res?.data?.nonce;
        if (!cancelled && n) {
          cachedNonce = n;
          stampMetaNonce(n);
          setNonce(n);
        }
      })
      .catch(() => {});

    return () => {
      cancelled = true;
    };
  }, [nonce]);

  return (
    <NonceContext.Provider value={nonce}>{children}</NonceContext.Provider>
  );
}

export function useNonce() {
  return useContext(NonceContext);
}

export default NonceContext;
