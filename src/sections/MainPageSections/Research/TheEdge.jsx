import React, { useState, useRef, useEffect } from "react";
import { createPortal } from "react-dom";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import RichTextRenderer from "../../../components/RichTextRenderer";
import SafeImage from "../../../components/SafeImage";

// import "../../styles/the-edge-main.css";
// import "../../styles/the-edge-responsive.css";

const TheEdge = ({ data }) => {
  if (!data) return null;
  const basic = data.basic || {};
  const cards = data.cards || [];

  const { heading, desc } = basic;



  const [selectedCard, setSelectedCard] = useState(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [slidesPerView, setSlidesPerView] = useState(4);
  const swiperRef = useRef(null);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

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

  // Bind the custom circular arrows (same style as the SRMMCON Global
  // Opportunity slider) to Swiper navigation after mount, so the refs exist.
  useEffect(() => {
    const s = swiperRef.current;
    if (s && s.params && s.params.navigation) {
      s.params.navigation.prevEl = prevRef.current;
      s.params.navigation.nextEl = nextRef.current;
      s.navigation.destroy();
      s.navigation.init();
      s.navigation.update();
    }
  }, [slidesPerView]);

  return (
    <section className="edge-section container">
      {/* Header */}
      <div className="edge-header">
        {heading && (
          <h2 className="heading">
            <hr className="heading-line" />
            {heading}
          </h2>
        )}
        {desc && <RichTextRenderer className="edge-desc" html={desc} />}
      </div>

      {/* Slider */}
      <div className="relative">
      <Swiper
        onSwiper={(s) => (swiperRef.current = s)}
        modules={[Navigation, Autoplay]}
        slidesPerView={slidesPerView}
        spaceBetween={16}
        loop
        navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
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
              <SafeImage
                src={card.image}
                alt={card.title}
                className="edge-card-image"
              />
              <div className="edge-card-overlay">
                {/* <h3 className="edge-card-title">{card.title}</h3> */}
<RichTextRenderer
  className="edge-card-title"
  html={card.title}
  bgColor={card.bg_color}
/>
                <p className="edge-card-desc">{card.description}</p>
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>

        <button
          ref={prevRef}
          aria-label="Previous"
          className="absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          ref={nextRef}
          aria-label="Next"
          className="absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100"
        >
          <ChevronRight size={18} />
        </button>
      </div>

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
      {selectedCard && typeof document !== "undefined" &&
        createPortal(
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

            <SafeImage
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
        </div>,
        document.body
      )}
    </section>
  );
};

export default TheEdge;
