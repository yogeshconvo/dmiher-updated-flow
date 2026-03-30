"use client";

import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "swiper/css";
import "swiper/css/pagination";

/* ================= CARD ================= */
const DepartmentCard = ({ title, url, image }) => {
  const navigate = useNavigate();

  return (
    <div
      className="department-card-wrapper cursor-pointer"
      onClick={() => navigate(url)}
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

/* ================= MAIN ================= */
const Departments = ({ data, pageSlug = "jnmc" }) => {
  const swiperRef = useRef(null);
  const [departments, setDepartments] = useState([]);
  const [slides, setSlides] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const chunkConfig = {
    desktop: 8,
    tablet: 6,
    mobile: 4,
  };

  /* ================= DATA SET ================= */
  useEffect(() => {
    if (!data?.grids?.length) return;

    const deptList =
      data.grids[0]?.departments?.map((item) => ({
        title: item.title,
        image: item.image,
        url: `/department/${pageSlug}/${item.page_slug}`,
      })) || [];

    setDepartments(deptList);
  }, [data, pageSlug]);

  /* ================= SLIDER ================= */
  useEffect(() => {
    if (!departments.length) return;

    const calculateSlides = () => {
      let chunkSize = chunkConfig.desktop;

      if (window.innerWidth < 640) chunkSize = chunkConfig.mobile;
      else if (window.innerWidth < 1024)
        chunkSize = chunkConfig.tablet;

      const chunks = [];
      for (let i = 0; i < departments.length; i += chunkSize) {
        chunks.push(departments.slice(i, i + chunkSize));
      }

      setSlides(chunks);
      setCurrentSlide(0);
    };

    calculateSlides();
    window.addEventListener("resize", calculateSlides);

    return () =>
      window.removeEventListener("resize", calculateSlides);
  }, [departments]);

  if (!departments.length) return <p>Loading...</p>;

  return (
    <div className="departments-section">
      <div className="container">
        <h2 className="heading">
          <hr className="heading-line" />
          Departments
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
            onSlideChange={(swiper) =>
              setCurrentSlide(swiper.activeIndex)
            }
          >
            {slides.map((slide, index) => (
              <SwiperSlide key={index}>
                <div className="departments-grid">
                  {slide.map((item, idx) => (
                    <DepartmentCard
                      key={idx}
                      title={item.title}
                      url={item.url}
                      image={item.image}
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