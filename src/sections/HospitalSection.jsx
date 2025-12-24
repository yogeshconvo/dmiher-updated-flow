import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/navigation";

// import ViewMoreButton from "../../components/UI/ViewMore";
// import "../../styles/hospital-highlight.css";

const HospitalHighlight = ({ data }) => {
  if (!data) return null;

  const {
    heading,
    subtitle,
    description,
    stats = [],
    images = [],
    cta_url,
    cta_label,
  } = data;

  return (
    <section className="hospital-section">
      <div className="container hospital-layout">
        {/* LEFT CONTENT */}
        <div className="hospital-content">
           <h2 className="heading">
              <hr className="heading-line" />
            {heading}
          </h2>

          {subtitle && (
            <h4 className="hospital-subtitle">{subtitle}</h4>
          )}

          <p className="hospital-description">{description}</p>

          <ul className="hospital-list">
            {stats.map((item, idx) => (
              <li key={idx} className="hospital-list-item">
                {item}
              </li>
            ))}
          </ul>

          {cta_url && (
            <div className="cta">
              {/* <ViewMoreButton href={cta_url} label={cta_label} /> */}
              <p>{cta_label}</p>
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
                  src={img}
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
