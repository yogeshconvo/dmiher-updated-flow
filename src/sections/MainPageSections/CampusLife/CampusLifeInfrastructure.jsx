import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SafeImage from "../../../components/SafeImage";

/**
 * CampusLifeInfrastructure — 2 cards side-by-side, each with a swiper
 * of images plus bottom-left caption overlays.
 */
const CampusLifeInfrastructure = ({ data }) => {
  if (!data) return null;
  const items = data.items || [];
  return (
    <section className="clinf-section container">
      <div className="clinf-grid">
        {items.map((item, idx) => (
          <div key={idx} className="clinf-card">
            <h2 className="clinf-title">{item.title}</h2>
            <div className="clinf-swiper-wrap">
              <Swiper
                modules={[Pagination, Autoplay]}
                slidesPerView={1}
                loop
                autoplay={{ delay: 4000 }}
                pagination={{ clickable: true }}
                className="clinf-swiper"
              >
                {(item.images || []).map((img, i) => (
                  <SwiperSlide key={i}>
                    <div className="clinf-slide">
                      <SafeImage src={img.image} alt={img.caption || ""} className="clinf-img" />
                      {img.caption && <div className="clinf-caption">{img.caption}</div>}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default CampusLifeInfrastructure;
