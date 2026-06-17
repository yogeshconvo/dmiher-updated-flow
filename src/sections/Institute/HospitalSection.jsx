import React from "react";
import { Link, useParams } from "react-router-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import RichTextRenderer from "../../components/RichTextRenderer";
import SafeImage from "../../components/SafeImage";

// import ViewMoreButton from "../../components/UI/ViewMore";
// import "../../styles/hospital-highlight.css";

const HospitalHighlight = ({ data }) => {
  const params = useParams();
  if (!data) return null;

  const {
    header = {},
    content = {},
    images = [],
    cta,
    buttons = [],
  } = data;

  // Normalize CTAs: support legacy single `cta` object and new `buttons[]` array
  const ctaList = Array.isArray(buttons) && buttons.length > 0
    ? buttons.filter((b) => b?._section_enabled !== false)
    : cta
      ? [cta]
      : [];

  // The institute slug from the route — used to build /<college>/<cta_key>
  // URLs when a CTA uses the section-dependent micropage pattern instead
  // of a hard-coded link.
  const collegeSlug = params.college || params.slug || "";

  // Dynamic section background from the backend (section_style.bg_color).
  const bgColor = data?.section_style?.bg_color;

  return (
    <section
      className="hospital-section"
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      <div className="container hospital-layout">
        {/* LEFT CONTENT */}
        <div className="hospital-content">
           <h2 className="heading">
              <hr className="heading-line" />
            {header.heading}
          </h2>

          {header.subtitle && (
            <h4 className="hospital-subtitle">{header.subtitle}</h4>
          )}

          {content.description && (
            <RichTextRenderer html={content.description} />
          )}

          {ctaList.length > 0 && (
            <div className="cta">
              {ctaList.map((item, idx) => {
                const label = item.label || item.cta_label;
                if (!label) return null;

                // Section-dependent micropage CTA — admin marked the button
                // as having a micropage and provided a cta_key. Build the
                // SPA route off the current institute slug.
                let to = item.link || item.cta_url || "";
                if (!to && item.has_micro_page && item.cta_key) {
                  to = collegeSlug ? `/${collegeSlug}/${item.cta_key}` : `/${item.cta_key}`;
                }
                if (!to) return null;

                const isExternal =
                  item.tab_type === "url" ||
                  (typeof to === "string" && /^https?:\/\//i.test(to));

                if (isExternal) {
                  return (
                    <a
                      key={idx}
                      href={to}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {label}
                    </a>
                  );
                }
                return (
                  <Link key={idx} to={to}>
                    {label}
                  </Link>
                );
              })}
            </div>
          )}
        </div>

        {/* RIGHT SLIDER */}
        <div className="hospital-slider custom-swiper-nav">
          <Swiper
            spaceBetween={30}
            slidesPerView={1}
            loop
            autoplay={{ delay: 3000, disableOnInteraction: false }}
            navigation
            modules={[Autoplay, Navigation]}
          >
            {images.map((img, index) => (
              <SwiperSlide key={index}>
                <SafeImage
                  src={img.image}
                  alt={`Hospital ${index + 1}`}
                  className="hospital-slide-image"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </section>
  );
};

export default HospitalHighlight;
