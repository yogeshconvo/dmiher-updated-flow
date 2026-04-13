import { useEffect } from "react";
import { getNonce } from "../context/NonceContext";

/**
 * Dynamically loads an external script with CSP nonce support.
 *
 * Usage:
 *   useScript("https://widgets.in6.nopaperforms.com/emwgts.js");
 *   useScript("https://static.getaai.com/chatbot.js", { async: true });
 */
export default function useScript(src, options = {}) {
  useEffect(() => {
    if (!src) return;

    // Avoid loading the same script twice
    const existing = document.querySelector(`script[src="${src}"]`);
    if (existing) return;

    const script = document.createElement("script");
    script.src = src;
    script.async = options.async ?? true;
    if (options.type) script.type = options.type;

    // Attach CSP nonce
    const nonce = getNonce();
    if (nonce) script.setAttribute("nonce", nonce);

    document.body.appendChild(script);

    return () => {
      if (options.cleanup !== false) {
        document.body.removeChild(script);
      }
    };
  }, [src]);
}
