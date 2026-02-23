import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";


import "swiper/css";
import "swiper/css/pagination";

export default function FeatureCards({data}) {
  const { title, cards } = data;

  const swiperSettings = {
    modules: [Pagination],
    pagination: {
      clickable: true
    },
    loop: true,
    speed: 300,
    slidesPerView: 1
  };

  return (
    <section id="feature_cards" className="feature-section">
      
      <div className="feature-container">
        
        {/* Title */}
        <div className="feature-heading">
          <hr className="feature-line" />
          <h2 className="feature-title">{title}</h2>
        </div>

        {/* Mobile Slider */}
        <div className="feature-mobile">
          <Swiper {...swiperSettings}>
            {cards.map((card, idx) => (
              <SwiperSlide key={idx}>
                <Card card={card} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* Desktop Grid */}
        <div className="feature-desktop">
          {cards.map((card, idx) => (
            <Card key={idx} card={card} />
          ))}
        </div>

      </div>
    </section>
  );
}

// Card Component inside same file
function Card({ card }) {
  return (
    <div className="feature-card">
      <img
        src={card.image}
        alt={card.title}
        className="feature-img"
      />

      <div className="feature-overlay">
        <h3 className="feature-card-title">
          {card.title}
        </h3>
        <p className="feature-card-desc">
          {card.description}
        </p>
      </div>
    </div>
  );
}
