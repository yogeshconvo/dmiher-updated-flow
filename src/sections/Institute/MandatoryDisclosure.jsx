import React, { useState } from 'react'
import { createPortal } from 'react-dom'
import { Link } from 'react-router-dom'
import { mandatoryDisclosureConfig } from '../../instituteSections/mandatoryDisclosure'
import resolveImage from '../../utils/resolveImage'
import LucideIcons from '../../utils/lucideIcons'

// Resolve a kebab-case CMS icon name (e.g. "file-text") against the shared
// lucide catalog; fall back to FileText.
const toPascal = (s) =>
  String(s || '')
    .split('-')
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join('')
const BoxIcon = ({ name, className }) => {
  const C = LucideIcons[toPascal(name)] || LucideIcons.FileText
  return C ? <C className={className} /> : null
}

function MandatoryDisclosure({ data, college, instituteSlug, pageSlug }) {
  const [popup, setPopup] = useState(null) // the active popup box (e.g. CIQA)

  if (!data) return null

  const header = data.header || {}
  const slug = college || instituteSlug || pageSlug

  /* ================= BOXES DISPLAY (e.g. CDOE) =================
     A dedicated layout with a heading + a row of buttons. Each button is one
     of: `url` (internal micro-page / the MD subpage, or an external link),
     `pdf` (opens a file), or `popup` (opens a modal listing year-wise PDFs —
     e.g. the CIQA reports). This is opt-in via header.display_type === "boxes"
     so the normal single-link flow below is untouched for every other page. */
  if (header.display_type === 'boxes' && Array.isArray(data?.boxes?.items)) {
    const items = data.boxes.items
    const btnClass =
      'flex items-center gap-2 bg-sky-200 text-[#F04E30] hover:bg-[#F04E30] hover:text-white px-6 py-3 rounded-md shadow-md transition font-oswald-medium'

    const urlFor = (u = '') => {
      if (/^https?:\/\//i.test(u)) return { external: true, href: u }
      if (!u || u === 'mandatory-disclosure') {
        return { external: false, href: mandatoryDisclosureConfig.buildRoutePath(slug) }
      }
      return { external: false, href: `/${slug}/${u}` }
    }

    const modal =
      popup &&
      typeof document !== 'undefined' &&
      createPortal(
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          onClick={() => setPopup(null)}
        >
          <div
            className="bg-white rounded-lg max-w-2xl w-full p-6 max-h-[85vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-semibold text-[#122E5E]">{popup.label}</h3>
              <button
                onClick={() => setPopup(null)}
                aria-label="Close"
                className="text-gray-500 hover:text-black text-3xl leading-none"
              >
                &times;
              </button>
            </div>
            <div
              className={`grid ${
                (popup.popup_pdfs || []).length > 1 ? 'grid-cols-1 sm:grid-cols-2' : 'grid-cols-1'
              } gap-3`}
            >
              {(popup.popup_pdfs || []).length > 0 ? (
                popup.popup_pdfs.map((p, j) => (
                  <a
                    key={j}
                    href={resolveImage(p.file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full min-h-[60px] text-base font-medium text-white bg-[#122E5E] rounded hover:bg-[#F04E30] transition px-3 text-center"
                  >
                    <BoxIcon name="file-text" className="w-5 h-5 shrink-0" />
                    <span className="capitalize">{p.label}</span>
                  </a>
                ))
              ) : (
                <p className="text-gray-600">No documents available.</p>
              )}
            </div>
          </div>
        </div>,
        document.body
      )

    return (
      <div>
        <div className="container py-10">
          <h2 className="heading">
            <hr className="heading-line" />
            {header.heading}
          </h2>

          <div className="flex flex-wrap gap-4">
            {items.map((it, i) => {
              const icon = <BoxIcon name={it.icon} className="w-5 h-5 text-[#0B2A6D]" />

              if (it.link_type === 'popup') {
                return (
                  <button key={i} type="button" onClick={() => setPopup(it)} className={btnClass}>
                    {icon}
                    {it.label}
                  </button>
                )
              }

              if (it.link_type === 'pdf') {
                return (
                  <a
                    key={i}
                    href={resolveImage(it.pdf_file)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={btnClass}
                  >
                    {icon}
                    {it.label}
                  </a>
                )
              }

              // link_type === 'url' (internal micro-page / MD subpage / external)
              const { external, href } = urlFor(it.external_url)
              return external ? (
                <a key={i} href={href} target="_blank" rel="noopener noreferrer" className={btnClass}>
                  {icon}
                  {it.label}
                </a>
              ) : (
                <Link key={i} to={href} className={btnClass}>
                  {icon}
                  {it.label}
                </Link>
              )
            })}
          </div>
        </div>

        {modal}
      </div>
    )
  }

  /* ================= NORMAL FLOW (unchanged) ================= */
  const content = data.content || {}
  const ctaKey =
    header.cta_key && header.cta_key !== 'mandatory-disclosure' ? header.cta_key : undefined
  const targetUrl =
    content.url ||
    (ctaKey
      ? mandatoryDisclosureConfig.buildRoutePath(slug, ctaKey)
      : mandatoryDisclosureConfig.buildRoutePath(slug))
  const linkText = content.link_text || header.label || 'View All Disclosures'
  const ctaText = content.cta_text || ''

  return (
    <div className="">
      <div className="container">
        <h2 className="heading">
          <hr className="heading-line" />
          {header?.heading}
        </h2>
        <div className="inst-md-row">
          <div className="inst-md-cell">
            <Link
              to={targetUrl}
              className="text-base md:text-xl tracking-wide font-oswald-medium text-gray-600 rounded-md font-[400] hover:bg-blue-100 transition text-center py-2"
            >
              {linkText}
              {ctaText && (
                <>
                  {' '}
                  <span className="font-[400] underline">{ctaText}</span>
                </>
              )}
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default MandatoryDisclosure
