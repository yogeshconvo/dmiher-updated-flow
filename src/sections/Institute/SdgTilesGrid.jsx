import React from "react";
import { Link, useLocation } from "react-router-dom";
import SafeImage from "../../components/SafeImage";
import resolveImage from "../../utils/resolveImage";

/**
 * SDG tiles grid — section_id `sustainable-development-goals`.
 *
 * `data` is an object whose keys are CMS repeater names, each an array of
 * { image, tab_type, link | cta }. Every entry is an image tile:
 *   - tab_type "url"    → external link (item.link), new tab
 *   - tab_type "button" → internal micro page at {current path}/{cta.cta_key}
 * Renders 6 tiles per row on desktop, mirroring the live SDG page.
 */
export default function SdgTilesGrid({ data = {} }) {
  const { pathname } = useLocation();
  const base = pathname.replace(/\/+$/, "");

  const items = Object.values(data || {})
    .filter(Array.isArray)
    .flat()
    .filter((item) => item && item.image);

  if (!items.length) return null;

  return (
    <div className="py-6 px-4 sm:px-6">
      <div className="micropage-container">
        {/* Wide gutters shrink each tile to ~150px on desktop, matching the
            live-site SDG grid (small tiles, generous breathing room). */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 md:gap-8 lg:gap-x-12 lg:gap-y-5">
          {items.map((item, i) => {
            const tile = (
              <SafeImage
                src={resolveImage(item.image)}
                alt={item?.cta?.label || `SDG ${i + 1}`}
                className="w-26 h-auto hover:scale-105 transition-transform duration-200"
              />
            );

            if (item.tab_type === "url" && item.link) {
              return (
                <a
                  key={i}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block"
                >
                  {tile}
                </a>
              );
            }

            const ctaKey = item?.cta?.cta_key;
            if (ctaKey) {
              return (
                <Link
                  key={i}
                  to={base ? `${base}/${ctaKey}` : `/${ctaKey}`}
                  className="block"
                >
                  {tile}
                </Link>
              );
            }

            return (
              <div key={i} className="block">
                {tile}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
