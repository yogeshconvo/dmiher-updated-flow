import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "../styles/InstituteSections/Departments.css";

/* ================= CARD ================= */
const DepartmentCard = ({ image, title, tabId }) => {
  const navigate = useNavigate();
  const { slug } = useParams();

  const handleClick = () => {
    if (tabId) {
      navigate(`/${slug}/departments/${tabId}`);
    }
  };

  return (
    <div
      className="department-card-wrapper"
      onClick={handleClick}
    >
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
const Departments = ({ data }) => {
  const swiperRef = useRef(null);

  const departments = data?.departments || [];
  const chunkConfig = data?.chunk_config || {
    desktop: 8,
    tablet: 6,
    mobile: 6,
  };

  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  /* ================= SLIDE CHUNKING ================= */
  useEffect(() => {
    if (!departments.length) return;

    const calculateSlides = () => {
      let chunkSize = chunkConfig.desktop;

      if (window.innerWidth < 640) chunkSize = chunkConfig.mobile;
      else if (window.innerWidth < 1024) chunkSize = chunkConfig.tablet;

      const chunks = [];
      for (let i = 0; i < departments.length; i += chunkSize) {
        chunks.push(departments.slice(i, i + chunkSize));
      }
      setSlides(chunks);
    };

    calculateSlides();
    window.addEventListener("resize", calculateSlides);
    return () => window.removeEventListener("resize", calculateSlides);
  }, [departments, chunkConfig]);

  if (!departments.length) return null;

  return (
    <div className="departments-section">
      <div className="container">
        <h2 className="departments-heading">
          <hr className="departments-heading-line" />
          {data.heading || "OUR DEPARTMENTS"}
        </h2>

        <div className="relative">
          {/* NAV */}
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
                    <DepartmentCard
                      key={item.id}
                      image={item.image}
                      title={item.title}
                      tabId={item.tabId}
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

export default Departments;
