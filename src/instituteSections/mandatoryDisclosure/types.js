/**
 * @file types.js
 * JSDoc typedefs for the Mandatory Disclosure module.
 * Ambient-only — re-exports nothing at runtime.
 */

/**
 * @typedef {"card_page"|"direct_pdf"|"url"|"popup_pdf"} MandatoryDisclosureTabType
 */

/**
 * @typedef {Object} MandatoryDisclosureCta
 * @property {string} [label]
 * @property {string} [cta_key]
 * @property {boolean} [has_micro_page]
 */

/**
 * @typedef {Object} MandatoryDisclosurePopupPdfEntry
 * @property {string} label
 * @property {string} pdf
 */

/**
 * Raw API card payload.
 * @typedef {Object} MandatoryDisclosureApiCard
 * @property {string} title
 * @property {MandatoryDisclosureTabType} tab_type
 * @property {MandatoryDisclosureCta} [cta]
 * @property {string | MandatoryDisclosurePopupPdfEntry[]} [pdf]
 * @property {string} [url]
 */

/**
 * @typedef {Object} MandatoryDisclosureApiData
 * @property {number} [level]
 * @property {{ heading: string }} header
 * @property {MandatoryDisclosureApiCard[]} cards
 */

/**
 * Raw section envelope (matches PageView `sections[]` entries).
 * @typedef {Object} MandatoryDisclosureApiSection
 * @property {string} section_id
 * @property {number} [status]
 * @property {MandatoryDisclosureApiData} data
 */

/**
 * Transformed item ready for the UI card.
 * @typedef {"internal"|"external"|"file"|"popup"} MandatoryDisclosureItemType
 */

/**
 * @typedef {Object} MandatoryDisclosurePopupItem
 * @property {string} name
 * @property {string} link
 */

/**
 * @typedef {Object} MandatoryDisclosureItem
 * @property {string} name
 * @property {string} link
 * @property {MandatoryDisclosureItemType} type
 * @property {MandatoryDisclosurePopupItem[]} [popopContent]
 */

/**
 * UI view model produced by the mapper / consumed by the component.
 * @typedef {Object} MandatoryDisclosureViewModel
 * @property {string} title
 * @property {MandatoryDisclosureItem[]} items
 */

export {};
