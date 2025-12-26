import React, { useState, useEffect, useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import { ArrowLeft, ArrowRight } from "lucide-react";

import "swiper/css";
import "swiper/css/pagination";

function ArrowButton({ direction, onClick }) {
  return (
    <button
      onClick={onClick}
      className="border border-gray-600 hover:bg-gray-100 p-2 rounded-full"
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
    <div className="bg-[#E4C957] p-10 font-oswald-medium">
      <div className="max-w-7xl mx-auto">
        {/* Heading */}
        <div className="flex items-center justify-between flex-wrap gap-4">
          <h1 className="text-4xl font-medium text-[#58595B] uppercase">
            <hr className="w-16 sm:w-20 border-[#F04E30] mb-2 border-t-4" />
            {title}
          </h1>
        </div>

        {/* Sub heading + arrows */}
        <div className="flex justify-between mt-8">
          <h2 className="text-3xl font-medium text-[#300986]">
            {subtitle}
          </h2>

          <div className="hidden sm:flex gap-2">
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
        <div className="relative mt-6">
          <Swiper {...swiperSettings}>
            {dimensions.map((item) => (
              <SwiperSlide key={item.id}>
                <div className="px-2">
                  <img
                    src={item.image}
                    alt={item.title}
                    className="h-50 object-cover rounded-xl"
                  />

                  <div className="flex pt-4">
                    <div className="h-12 w-12 flex-shrink-0 text-xl font-[300] rounded-full flex items-center justify-center relative overflow-hidden">
                      <span className="absolute inset-0 bg-black opacity-40"></span>
                      <span className="relative z-10 text-2xl text-white">
                        {item.id}
                      </span>
                    </div>

                    <div className="pl-2">
                      <h3 className="text-md font-medium text-[#58595B]">
                        {item.title}
                      </h3>
                      <p
                        className="text-sm text-[#58595B] mt-1"
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
