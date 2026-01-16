import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/autoplay";

const WhyChoose = ({ data }) => {
  const cards = data?.cards || [];
  const heading = data?.header?.heading;

  if (!cards.length) return null;

  return (
    <div className="feature-section">
      <div className="container">
        {heading && (
          <h2 className="heading">
            <hr className="heading-line" />
            {heading}
          </h2>
        )}

        <div className="feature-slider-wrapper">
          <Swiper
            modules={[Pagination, Autoplay]}
            pagination={{
              clickable: true,
            }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop
            spaceBetween={20}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              640: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 4,
              },
            }}
          >
            {cards.map((card, index) => (
              <SwiperSlide
                key={`${index}-${card.title}`}   
                virtualIndex={index}
              >
                <div
                  className="feature-card"
                  style={{ backgroundColor: card.bg_color }}
                >
                  <h3
                    className="feature-title"
                    style={{ color: card.title_color }}
                  >
                    {card.title}
                  </h3>

                  {card.description || card.desc && (
                    <p
                      className="feature-subtitle"
                      style={{ color: card.desc_color }}
                    >
                      {card.description || card.desc}
                    </p>
                  )}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default WhyChoose;
