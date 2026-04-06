import React from "react";
import { useMicroPage } from "../hooks/useMicroPage";

/**
 * MicroPageCTA — CTA button with conditional micro-page trigger.
 *
 * Props:
 *   cta        — CTA object from API data:
 *                  { label, key (or cta_key), has_micro_page, href?, onClick? }
 *   pageslug   — The college/page slug (e.g. "jnmc")
 *   className  — Optional CSS class override
 *   children   — Optional label override
 *
 * Behavior:
 *   has_micro_page === true  → calls useMicroPage mutation → navigates (no reload)
 *   has_micro_page !== true  → falls through to cta.onClick or cta.href (existing behavior)
 *
 * ⚠ Existing CTA flows are NOT affected — this component only intercepts
 *   when has_micro_page is explicitly true.
 */
function MicroPageCTA({ cta = {}, pageslug, className = "", children }) {
  const { mutate, isPending, isError, error } = useMicroPage();

  const ctaKey = cta.key || cta.cta_key;
  const label = children || cta.label || "Learn More";

  const handleClick = () => {
    if (cta.has_micro_page) {
      // ── New micro-page flow ──
      mutate({ pageslug, ctaKey });
    } else if (typeof cta.onClick === "function") {
      // ── Existing callback flow (unchanged) ──
      cta.onClick();
    } else if (cta.href) {
      // ── Existing href flow (unchanged) ──
      window.location.href = cta.href;
    }
  };

  return (
    <>
      <button
        className={className}
        onClick={handleClick}
        disabled={isPending}
        aria-busy={isPending}
      >
        {isPending ? "Loading..." : label}
      </button>

      {/* Inline error feedback — style via .micro-cta-error or override */}
      {isError && (
        <p className="micro-cta-error text-sm text-red-500 mt-1">
          {error?.message || "Failed to load. Please try again."}
        </p>
      )}
    </>
  );
}

export default MicroPageCTA;
