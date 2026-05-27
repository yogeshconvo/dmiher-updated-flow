import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SafeImage from "../../../components/SafeImage";

/**
 * CampusLifeWellbeing — heading + description + 2 image cards
 * (Student Wellness & Sports / Safety, Accessibility & Comfort).
 */
const CampusLifeWellbeing = ({ data }) => {
  if (!data) return null;
  const items = data.items || [];
  return (
    <section className="clw-section" style={{ backgroundColor: data.bg_color || "#eaf4ff" }}>
      <div className="container">
        <div className="clw-head">
          <h2 className="clw-heading">
            <hr className="clw-heading-line" />
            {data.title}
          </h2>
          <p className="clw-desc">{data.description}</p>
        </div>
        <div className="clw-grid">
          {items.map((item, idx) => (
            <div key={idx} className="clw-card">
              <h2 className="clw-title">{item.title}</h2>
              <div className="clw-swiper-wrap">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  slidesPerView={1}
                  loop
                  autoplay={{ delay: 4000 }}
                  pagination={{ clickable: true }}
                  className="clw-swiper"
                >
                  {(item.images || []).map((img, i) => (
                    <SwiperSlide key={i}>
                      <div className="clw-slide">
                        <SafeImage src={img.image} alt={img.caption || ""} className="clw-img" />
                        {img.caption && <div className="clw-caption">{img.caption}</div>}
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CampusLifeWellbeing;
