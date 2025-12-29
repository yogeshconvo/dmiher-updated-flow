import React, { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";

// import "../../styles/the-edge-main.css";
// import "../../styles/the-edge-responsive.css";

const TheEdge = ({ data }) => {
  if (!data) return null;

  const { heading, subheading, tagline, cards = [] } = data;

  const [selectedCard, setSelectedCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const swiperRef = useRef(null);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 640) setSlidesPerView(1);
      else if (window.innerWidth < 1024) setSlidesPerView(2);
      else setSlidesPerView(4);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <section className="edge-section container">
      {/* Header */}
      <div className="edge-header">
        <h2 className="heading">
          <hr className="heading-line" />
          {heading}
        </h2>
        <p className="edge-subtitle">{subheading}</p>
        <p className="edge-tagline">{tagline}</p>
      </div>

      {/* Slider */}
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Autoplay]}
        slidesPerView={slidesPerView}
        spaceBetween={16}
        loop
        navigation
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        onSlideChange={(s) => setCurrentSlide(s.realIndex)}
        className="custom-swiper-nav"
      >
        {cards.map((card, idx) => (
          <SwiperSlide key={idx}>
            <div
              className="edge-card"
              onClick={() => setSelectedCard(card)}
            >
              <img
                src={card.image}
                alt={card.title}
                className="edge-card-image"
              />
              <div className="edge-card-overlay">
                <h3 className="edge-card-title">{card.title}</h3>
                <p className="edge-card-desc">{card.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

      {/* Dots */}
      <div className="edge-dots">
        {cards.map((_, idx) => (
          <button
            key={idx}
            onClick={() => swiperRef.current?.slideToLoop(idx)}
            className={`edge-dot ${
              currentSlide === idx
                ? "edge-dot-active"
                : "edge-dot-inactive"
            }`}
          />
        ))}
      </div>

      {/* Modal */}
      {selectedCard && (
        <div
          className="edge-modal"
          onClick={() => setSelectedCard(null)}
        >
          <div
            className="edge-modal-box"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="edge-close-btn"
              onClick={() => setSelectedCard(null)}
            >
              &times;
            </button>

            <img
              src={selectedCard.image}
              alt={selectedCard.title}
              className="edge-modal-image"
            />

            <div className="edge-modal-overlay">
              <h3 className="edge-modal-title">
                {selectedCard.title}
              </h3>
              <p className="edge-modal-desc">
                {selectedCard.description}
              </p>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TheEdge;
