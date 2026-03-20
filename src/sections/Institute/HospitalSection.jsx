import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";
import RichTextRenderer from "../../components/RichTextRenderer";

// import ViewMoreButton from "../../components/UI/ViewMore";
// import "../../styles/hospital-highlight.css";

const HospitalHighlight = ({ data }) => {
  if (!data) return null;

  const {
    header,
    content,
    images = [],
    cta
  } = data;

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

          <RichTextRenderer html={content.description} />

          {/* <ul className="hospital-list">
            {content.stats.map((item, idx) => (
              <li key={idx} className="hospital-list-item">
                {item}
              </li>
            ))}
          </ul> */}

          {cta.cta_url && (
            <div className="cta">
              {/* <ViewMoreButton href={cta_url} label={cta_label} /> */}
              <p>{cta.cta_label}</p>
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
                <img
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
