/**
 * Centralized route builders — NO hardcoded paths in components.
 */
export const ROUTES = {
  // Normal page
  page: (pageSlug) => `/${pageSlug}`,

  // CTA-based micropage:  /{college}/{ctaKey}
  ctaPage: (pageSlug, ctaKey) =>
    `/${pageSlug}/${ctaKey}`,

  // Programs listing (all):  /{college}/programs
  programs: (college) =>
    `/${college}/programs`,


  // Programs by category:  /{college}/programs/{category}
  programsByCategory: (college, category) =>
    `/${college}/programs/${encodeURIComponent(category)}`,
};
