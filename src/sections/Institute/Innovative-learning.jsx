import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
// import "../styles/InstituteSections/innovative-learning.css";

export default function InnovativeLearning({ data }) {
  const { heading, subheading, cards = [] } = data || {};
  const [slidesToShow, setSlidesToShow] = useState(3);
  const swiperRef = useRef(null);

  useEffect(() => {
    const checkWidth = () => {
      if (window.innerWidth < 768) setSlidesToShow(1);
      else if (window.innerWidth < 1024) setSlidesToShow(2);
      else setSlidesToShow(3);
    };

    checkWidth();
    window.addEventListener("resize", checkWidth);
    return () => window.removeEventListener("resize", checkWidth);
  }, []);

  return (
    <div className="innovative-section container">
      <h2 className="innovative-heading">{heading}</h2>
      <p className="innovative-subheading">{subheading}</p>

      <div className="relative">
        <button
          className="innovative-nav-btn innovative-nav-prev"
          onClick={() => swiperRef.current?.slidePrev()}
        >
          <ChevronLeft size={18} />
        </button>

        <button
          className="innovative-nav-btn innovative-nav-next"
          onClick={() => swiperRef.current?.slideNext()}
        >
          <ChevronRight size={18} />
        </button>

        <Swiper
          modules={[Navigation]}
          slidesPerView={slidesToShow}
          spaceBetween={16}
          speed={400}
          onSwiper={(swiper) => (swiperRef.current = swiper)}
        >
          {cards.map((card, idx) => (
            <SwiperSlide key={idx}>
              <div className="innovative-card-wrapper">
                <InnovativeCard card={card} />
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}

/* ================= CARD ================= */
function InnovativeCard({ card }) {
  return (
    <div className="innovative-card">
      <img
        src={card.image}
        alt=""
        className="innovative-card-image"
      />

      <div className="innovative-card-overlay">
        <p className="innovative-card-text">
          {card.description}
        </p>
      </div>
    </div>
  );
}
