import React from 'react'
import { Link } from 'react-router-dom'
import { mandatoryDisclosureConfig } from '../../instituteSections/mandatoryDisclosure'

function MandatoryDisclosure({ data, college, instituteSlug, pageSlug }) {
    if (!data) return null;

    const header = data.header || {};
    const content = data.content || {};
    const slug = college || instituteSlug || pageSlug;
    const ctaKey = header.cta_key && header.cta_key !== "mandatory-disclosure"
      ? header.cta_key
      : undefined;
    const targetUrl =
      content.url ||
      (ctaKey
        ? mandatoryDisclosureConfig.buildRoutePath(slug, ctaKey)
        : mandatoryDisclosureConfig.buildRoutePath(slug));
    const linkText = content.link_text || header.label || "View All Disclosures";
    const ctaText = content.cta_text || "";

  return (
    <div className=''>
        <div className='container'>
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
                  {" "}
                  <span className="font-[400] underline">
                    {ctaText}
                  </span>
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
