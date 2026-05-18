import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import SafeImage from "../../components/SafeImage";

import "swiper/css";
import "swiper/css/pagination";

function ArrowButton({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      className="hlp-arrow-btn"
    >
      {direction === "next" ? (
        <ArrowRight size={20} />
      ) : (
        <ArrowLeft size={20} />
      )}
    </button>
  );
}

function HolisticLearningPage({ data }) {
  const { title, subtitle, dimensions = [] } = data || {};

  const swiperRef = useRef(null);
  const [windowWidth, setWindowWidth] = useState(0);
  const [showDots, setShowDots] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      setWindowWidth(width);
      setShowDots(width < 1024);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const getSlidesPerView = () => {
    if (windowWidth < 640) return 1;
    if (windowWidth < 1024) return 2;
    return 4;
  };

  const swiperSettings = {
    modules: [Pagination],
    pagination: showDots ? { clickable: true } : false,
    loop: true,
    speed: 300,
    slidesPerView: getSlidesPerView(),
    spaceBetween: 16,
    onSwiper: (swiper) => (swiperRef.current = swiper),
  };

  return (
    <div className="hlp-section">
      <div className="hlp-container">
        {/* Heading */}
        <div className="hlp-heading-row">
          <h1 className="hlp-title">
            <hr className="hlp-title-line" />
            {title}
          </h1>
        </div>

        {/* Sub heading + arrows */}
        <div className="hlp-sub-row">
          <h2 className="hlp-subtitle">
            {subtitle}
          </h2>

          <div className="hlp-arrows">
            <ArrowButton
              direction="prev"
              onClick={() => swiperRef.current?.slidePrev()}
            />
            <ArrowButton
              direction="next"
              onClick={() => swiperRef.current?.slideNext()}
            />
          </div>
        </div>

        {/* Slider */}
        <div className="hlp-slider-wrap">
          <Swiper {...swiperSettings}>
            {dimensions.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="hlp-slide">
                  <SafeImage
                    src={item.image}
                    alt={item.title}
                    className="hlp-slide-img"
                  />

                  <div className="hlp-slide-row">
                    <div className="hlp-num-bubble">
                      <span className="hlp-num-bubble-bg"></span>
                      <span className="hlp-num-bubble-text">
                        {item.id}
                      </span>
                    </div>

                    <div className="hlp-slide-text-wrap">
                      <h3 className="hlp-slide-title">
                        {item.title}
                      </h3>
                      <p
                        className="hlp-slide-desc"
                        style={{ fontFamily: "Arial, sans-serif" }}
                      >
                        {item.desc}
                      </p>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}

export default HolisticLearningPage;
