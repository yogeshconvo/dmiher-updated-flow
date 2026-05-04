import React from "react";
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

  return (
    <section className="hospital-section">
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
                const href = item.link || item.cta_url;
                const label = item.label || item.cta_label;
                if (!href || !label) return null;
                const isExternal =
                  item.tab_type === "url" ||
                  (typeof href === "string" && href.startsWith("http"));
                return isExternal ? (
                  <a
                    key={idx}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {label}
                  </a>
                ) : (
                  <p key={idx}>{label}</p>
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
