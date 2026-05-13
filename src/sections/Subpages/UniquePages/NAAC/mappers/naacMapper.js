/**
 * Transforms the raw NAAC API payload into the shape consumed by the UI layer.
 *
 * API → UI mapping:
 *   banner.image  → banner.image
 *   banner.text   → banner.html  (rich-text HTML; rendered with dangerouslySetInnerHTML)
 *   criteria[]    → tabs[]       (tab_label is the key; criterion_title is the heading)
 *
 * Each criterion is normalized into:
 *   {
 *     tabKey:        unique key used to switch tabs
 *     tabLabel:      label shown on the tab button
 *     title:         full criterion heading
 *     keyIndicators: [{ title, subSections: [{ id, rows: [{ text, href, isPdf }] }] }]
 *   }
 *
 * The mapper is defensive: missing fields default to safe empty values so the
 * UI never crashes on a partially-populated payload.
 */

import resolveImage from "../../../../../utils/resolveImage";

const safeString = (value) => (typeof value === "string" ? value : "");
const safeArray = (value) => (Array.isArray(value) ? value : []);

const mapRow = (row = {}) => {
  const linkType = safeString(row.link_type).toLowerCase();
  const isPdf = linkType === "pdf";
  // PDF rows store a relative path (e.g. "assets/naac/foo.pdf"); pass
  // it through resolveImage so the table renders an openable URL.
  // External `url` rows are already absolute — resolveImage returns
  // them unchanged.
  const rawHref = isPdf ? safeString(row.pdf) : safeString(row.url);
  const href = rawHref ? resolveImage(rawHref) : "";
  const text = safeString(row.text).trim();

  return {
    text,
    href,
    isPdf,
    linkType: linkType || (href ? "url" : ""),
  };
};

const mapSubSection = (subSection = {}) => ({
  id: safeString(subSection.section_id).trim(),
  rows: safeArray(subSection.rows).map(mapRow),
});

const mapKeyIndicator = (indicator = {}) => ({
  title: safeString(indicator.title),
  subSections: safeArray(indicator.sub_sections).map(mapSubSection),
});

const mapCriterion = (criterion = {}, index) => {
  const tabLabel = safeString(criterion.tab_label) || `Criteria ${index + 1}`;
  return {
    tabKey: tabLabel,
    tabLabel,
    title: safeString(criterion.criterion_title),
    keyIndicators: safeArray(criterion.key_indicators).map(mapKeyIndicator),
  };
};

const mapBanner = (banner = {}) => ({
  image: safeString(banner.image),
  html: safeString(banner.text),
});

export const mapNaacSectionData = (data = {}) => ({
  banner: mapBanner(data.banner),
  criteria: safeArray(data.criteria).map(mapCriterion),
});

export const mapNaacIndependentPage = (page) => {
  if (!page || typeof page !== "object") return null;

  const sections = safeArray(page.sections);
  const naacSection = sections.find(
    (sec) => sec?.section_id === "naac_ssr_micropage"
  );

  if (!naacSection) return null;

  return {
    slug: safeString(page.slug),
    title: safeString(page.title),
    meta: page.meta || {},
    ...mapNaacSectionData(naacSection.data || {}),
  };
};
