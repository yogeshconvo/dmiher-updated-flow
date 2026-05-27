import React from "react";
import RichTextRenderer from "../../components/RichTextRenderer";
import SafeImage from "../../components/SafeImage";
import resolveImage from "../../utils/resolveImage";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

/**
 * Generic institute Placements section.
 *
 * Renders:
 *   - heading + description
 *   - highlights list (supports both flat `highlights[]` and the older
 *     `optinal_content[]._section_enabled + .highlights[]` shape)
 *   - OPTIONAL: "Our Prominent Recruiters" label + logo carousel
 *     when `data.logos[]` (or an `optinal_content` block with tab_type='logos')
 *     is present. Used by DMCP.
 */
export default function Placements({ data }) {
  const { header = {} } = data || {};

  // Highlights (legacy + new shape)
  const highlights = Array.isArray(data?.highlights)
    ? data.highlights
    : (data?.optinal_content || [])
        .filter((block) => block?._section_enabled !== false)
        .flatMap((block) => block?.highlights || []);

  // Logos — accept either top-level `logos[]` or optinal_content blocks with tab_type='logos'
  const logos = Array.isArray(data?.logos)
    ? data.logos
    : (data?.optinal_content || [])
        .filter((block) => block?._section_enabled !== false && block?.tab_type === "logos")
        .flatMap((block) => block?.logos || []);

  const recruitersLabel = data?.recruiters_label || "Our Prominent Recruiters :";

  return (
    <section className="placements-section">
      <div className="container">
        <h2 className="heading">
          <hr className="heading-line" />
          {header.heading}
        </h2>
        <p>{header.description}</p>
      </div>

      {/* Highlights grid */}
      {highlights.length > 0 && (
        <div className="placements-grid">
          {highlights.map((item, index) => (
            <div key={index} className="placements-item">
              <RichTextRenderer html={item.description} />
            </div>
          ))}
        </div>
      )}

      {/* Recruiter logo carousel */}
      {logos.length > 0 && (
        <div className="container placements-logos-wrapper">
          <p className="placements-logos-label">{recruitersLabel}</p>
          <Swiper
            modules={[Autoplay, Pagination]}
            loop={true}
            autoplay={{ delay: 2000, disableOnInteraction: false, pauseOnMouseEnter: false }}
            pagination={{ clickable: true }}
            breakpoints={{
              320:  { slidesPerView: 2, slidesPerGroup: 2 },
              640:  { slidesPerView: 3, slidesPerGroup: 2 },
              1024: { slidesPerView: 5, slidesPerGroup: 2 },
              1280: { slidesPerView: 6, slidesPerGroup: 2 },
            }}
            spaceBetween={20}
          >
            {logos.map((logo, idx) => (
              <SwiperSlide key={idx}>
                <div className="placements-logo-slide">
                  <SafeImage
                    src={resolveImage(logo.image || logo.src)}
                    alt={logo.alt || `Recruiter ${idx + 1}`}
                    className="placements-logo-img"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </section>
  );
}
