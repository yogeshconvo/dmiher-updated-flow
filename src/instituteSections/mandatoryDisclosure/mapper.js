import { API_BASE } from "../../config/api";

/**
 * @file mapper.js
 * Pure transformation layer: API payload -> UI-ready view model.
 * Keep this file free of React / JSX so it can be reused in tests,
 * SSG prerender, and any non-React consumer.
 */

const MEDIA_BASE = import.meta.env.VITE_MEDIA_BASE || API_BASE || "";

const FILE_RE = /\.(pdf|docx?|xlsx?|pptx?|jpe?g|png|webp|svg|gif)(\?.*)?$/i;
const HTTP_RE = /^https?:\/\//i;

const isHttp = (url = "") => HTTP_RE.test(url);
const isFile = (url = "") => FILE_RE.test(url);
const isPopupToken = (value) => value === "popup";

const toAbsoluteUrl = (url) => {
  if (!url || typeof url !== "string") return "";
  if (isHttp(url)) return url;
  const base = String(MEDIA_BASE).replace(/\/$/, "");
  const path = url.replace(/^\//, "");
  return base ? `${base}/${path}` : `/${path}`;
};

/**
 * Detects the semantic type of a link.
 * @param {string} link
 * @returns {"internal"|"external"|"file"|"popup"}
 */
export const detectLinkType = (link) => {
  if (!link) return "internal";
  if (isPopupToken(link)) return "popup";
  if (isFile(link)) return "file";
  if (isHttp(link)) return "external";
  return "internal";
};

const buildInternalLink = (cta = {}, college) => {
  const key = cta?.cta_key || cta?.slug || "";
  if (!key) return "";
  const cleanKey = String(key).replace(/^\//, "");
  // has_micro_page cards always drop into the college-scoped MD nested route.
  if (college) return `/${college}/mandatory-disclosure/${cleanKey}`;
  return `/${cleanKey}`;
};

const isAlreadyMappedItem = (item) =>
  item &&
  typeof item === "object" &&
  "name" in item &&
  "link" in item;

const isAlreadyMappedViewModel = (value) =>
  value &&
  typeof value === "object" &&
  Array.isArray(value.items) &&
  (value.items.length === 0 || value.items.every(isAlreadyMappedItem));

const normalizePopupContent = (pdfArr = []) =>
  (Array.isArray(pdfArr) ? pdfArr : [])
    .map((entry) => {
      if (!entry) return null;
      const name = entry.label || entry.name || entry.title || "";
      const rawLink = entry.pdf || entry.link || entry.url || "";
      const link = toAbsoluteUrl(rawLink);
      if (!name && !link) return null;
      return { name, link };
    })
    .filter(Boolean);

/**
 * Normalize a single card from the API into a UI item.
 * Safely tolerates null/undefined and unknown tab_type values.
 *
 * @param {object} card
 * @param {{ college?: string }} [ctx]
 */
const normalizeCard = (card, ctx = {}) => {
  if (!card || typeof card !== "object") return null;

  const tabType = card.tab_type || card.type || "card_page";
  const name = card.title || card.name || card.label || "";

  switch (tabType) {
    case "direct_pdf": {
      const rawPdf = typeof card.pdf === "string" ? card.pdf : "";
      const link = toAbsoluteUrl(rawPdf);
      return { name, link, type: "file" };
    }

    case "url": {
      const rawUrl = card.url || card.link || "";
      const link = isHttp(rawUrl) ? rawUrl : toAbsoluteUrl(rawUrl);
      return { name, link, type: isFile(link) ? "file" : "external" };
    }

    case "popup_pdf": {
      const popopContent = normalizePopupContent(card.pdf);
      return {
        name,
        link: "popup",
        type: "popup",
        popopContent,
      };
    }

    case "card_page":
    default: {
      const link =
        buildInternalLink(card.cta, ctx.college) ||
        card.link ||
        card.url ||
        "";
      return { name, link, type: detectLinkType(link) };
    }
  }
};

/**
 * Unwraps common API envelopes to get the section data node:
 *  - { data: { sections: [{ section_id, data }] } }
 *  - { sections: [...] }
 *  - { section_id, data }
 *  - { header, cards }
 */
const unwrapSectionData = (raw) => {
  if (!raw || typeof raw !== "object") return {};

  const candidates = [];

  if (Array.isArray(raw?.sections)) candidates.push(...raw.sections);
  if (Array.isArray(raw?.data?.sections)) candidates.push(...raw.data.sections);

  if (candidates.length > 0) {
    const match =
      candidates.find((s) =>
        String(s?.section_id || "").toLowerCase().includes("mandatory")
      ) || candidates[0];
    return match?.data || {};
  }

  if (raw?.section_id && raw?.data) return raw.data;
  if (raw?.data && (raw.data.header || raw.data.cards)) return raw.data;

  return raw;
};

/**
 * Transform API response into UI view model.
 * Idempotent: if `raw` already has shape `{title, items}`, returns it unchanged.
 *
 * @param {unknown} raw
 * @param {{ college?: string }} [ctx]
 *   Context used to build nested card_page links as
 *   `/{college}/mandatory-disclosure/{cta_key}`.
 * @returns {{ title: string, items: Array<{name: string, link: string, type: string, popopContent?: Array}> }}
 */
export const mapMandatoryDisclosureData = (raw, ctx = {}) => {
  if (!raw) return { title: "", items: [] };

  if (isAlreadyMappedViewModel(raw)) {
    return { title: raw.title || "", items: raw.items };
  }

  const inner = unwrapSectionData(raw);

  if (isAlreadyMappedViewModel(inner)) {
    return { title: inner.title || "", items: inner.items };
  }

  const title =
    inner?.header?.heading ||
    inner?.title ||
    "Mandatory Disclosures";

  const cards = Array.isArray(inner?.cards) ? inner.cards : [];

  const items = cards
    .map((card) => normalizeCard(card, ctx))
    .filter((it) => it && (it.name || it.link));

  return { title, items };
};

export default mapMandatoryDisclosureData;
