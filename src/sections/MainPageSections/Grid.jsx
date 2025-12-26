import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

/* ================= CARD ================= */
const GridCard = ({ image, title, url }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    if (!url) return;

    // External links / PDFs
    if (url.startsWith("http")) {
      window.open(url, "_blank");
    } else {
      navigate(url);
    }
  };

  return (
    <div className="department-card-wrapper" onClick={handleClick}>
      <div
        className="department-card department-card-hover department-card-height"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="department-card-overlay">
          <h3 className="department-card-title">{title}</h3>
        </div>
      </div>
    </div>
  );
};

/* ================= SECTION ================= */
const Grid = ({ data }) => {
  const swiperRef = useRef(null);

  /* 🔥 IMPORTANT: research key */
  const items = data?.research || [];

  const chunkConfig = data?.chunk_config || {
    desktop: 8,
    tablet: 6,
    mobile: 6,
  };

  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  /* ================= SLIDE CHUNKING ================= */
  useEffect(() => {
    if (!items.length) return;

    const calculateSlides = () => {
      let chunkSize = chunkConfig.desktop;

      if (window.innerWidth < 640) chunkSize = chunkConfig.mobile;
      else if (window.innerWidth < 1024) chunkSize = chunkConfig.tablet;

      const chunks = [];
      for (let i = 0; i < items.length; i += chunkSize) {
        chunks.push(items.slice(i, i + chunkSize));
      }

      setSlides(chunks);
    };

    calculateSlides();
    window.addEventListener("resize", calculateSlides);
    return () => window.removeEventListener("resize", calculateSlides);
  }, [items.length, chunkConfig]);

  /* ================= SAFETY ================= */
  if (!items.length) {
    return (
      <div className="departments-section">
        <div className="container py-10 text-center text-gray-400">
          No data available
        </div>
      </div>
    );
  }

  return (
    <div className="departments-section">
      <div className="container">
        {/* HEADING */}
        <h2 className="heading">
          <hr className="heading-line" />
          {data?.heading}
        </h2>

        <div className="relative">
          {/* NAVIGATION */}
          <div className="departments-nav">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={currentSlide === 0}
              className={`departments-nav-btn ${
                currentSlide === 0
                  ? "departments-nav-btn-disabled"
                  : "departments-nav-btn-active"
              }`}
            >
              <ArrowLeft size={20} />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={currentSlide === slides.length - 1}
              className={`departments-nav-btn ${
                currentSlide === slides.length - 1
                  ? "departments-nav-btn-disabled"
                  : "departments-nav-btn-active"
              }`}
            >
              <ArrowRight size={20} />
            </button>
          </div>

          {/* SWIPER */}
          <Swiper
            modules={[Pagination]}
            slidesPerView={1}
            speed={500}
            pagination={{ clickable: true }}
            onSwiper={(swiper) => (swiperRef.current = swiper)}
            onSlideChange={(swiper) => setCurrentSlide(swiper.activeIndex)}
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="departments-grid">
                  {slide.map((item) => (
                    <GridCard
                      key={item.id}
                      image={item.image}   // MUST be real URL
                      title={item.title}
                      url={item.url}
                    />
                  ))}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Grid;
