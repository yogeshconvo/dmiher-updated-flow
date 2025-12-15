import React, { useRef, useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";

/* ================= CARD ================= */
const DepartmentCard = ({ image, title, tabId }) => {
  const navigate = useNavigate();
  const { slug } = useParams(); // 🔥 page slug from App router

  const handleClick = () => {
    if (tabId) {
      navigate(`/${slug}/departments/${tabId}`);
    }
  };

  return (
    <div onClick={handleClick} className="p-1 cursor-pointer">
      <div
        className="relative h-28 md:h-40 rounded-lg overflow-hidden shadow-md hover:scale-105 transition"
        style={{
          backgroundImage: `url(${image})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 flex items-center justify-center bg-black/30 px-2">
          <h3 className="text-white text-sm md:text-xl text-center">{title}</h3>
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

  /* ================= UI ================= */
  return (
    <div className="py-20 bg-white">
      <div className="container">
        <h2 className="text-3xl sm:text-4xl font-oswald-medium mb-10 text-[#707070]">
          <hr className="w-20 border-[#F04E30] mb-2 border-t-4" />
          {data.heading || "OUR DEPARTMENTS"}
        </h2>

        <div className="relative">
          {/* NAV */}
          <div className="flex gap-2 justify-end mb-4">
            <button
              onClick={() => swiperRef.current?.slidePrev()}
              disabled={currentSlide === 0}
              className={`border p-2 rounded-full ${
                currentSlide === 0
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
              }`}
            >
              <ArrowLeft size={20} />
            </button>

            <button
              onClick={() => swiperRef.current?.slideNext()}
              disabled={currentSlide === slides.length - 1}
              className={`border p-2 rounded-full ${
                currentSlide === slides.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : "hover:bg-gray-100"
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
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:p-5">
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
