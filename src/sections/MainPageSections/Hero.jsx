import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { Link } from "react-router";


function Hero({ data, slug = "Home" }) {
  if (!data) return null;

  const topbar = data.topbar || {};
  const slides = data.slides || [];

  const primarySectionId =
    topbar.primary_cta_section_id || "jnmc-announcements";

  const handleScrollToSection = () => {
    const yOffset = -10;
    const el = document.querySelector(`#${primarySectionId}`);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <>
      {/* Top Bar */}
      <div className="w-full bg-[#E1CD67] text-gray-600 text-[11px] sm:text-sm px-3 py-1 flex flex-col sm:flex-row sm:justify-between sm:items-center z-50 gap-y-2">
        <span className="text-lg hidden md:block sm:ml-20">
          {topbar.admissions_text}
        </span>

        {/* Desktop / large view */}
        <div className="hidden lg:flex items-center gap-x-5">
          {topbar.primary_cta_text && (
            <button
              onClick={handleScrollToSection}
              className="flex items-center text-xl text-white px-3 py-2 space-x-3 font-semibold rounded-[10px] btn-primary"
            >
              <span>{topbar.primary_cta_text}</span>
            </button>
          )}

          {/* APPLY NOW Button */}
          {topbar.apply_now_url && (
            <a
              href={topbar.apply_now_url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center rounded-[10px] text-xl bg-[#F04E30] hover:bg-[#102B64] text-white px-3 py-2 space-x-3 font-semibold"
            >
              <span>APPLY NOW</span>
            </a>
          )}

          {/* Phone Button */}
          {topbar.phone_number && (
            <a href={`tel:${topbar.phone_number}`}>
              <button className="flex items-center uppercase rounded-[10px] font-[500] text-base hover:bg-[#F04E30] bg-[#102B64] text-white px-3 py-2 space-x-3">
                <svg
                  className="w-5 h-5"
                  fill="white"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                >
                  <path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.36 11.36 0 003.55.57 1 1 0 011 1v3.43a1 1 0 01-1 1A17.93 17.93 0 012 6a1 1 0 011-1h3.44a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.27 1.11z" />
                </svg>
                <span className="text-xl ml-1">
                  {topbar.phone_label || topbar.phone_number}
                </span>
              </button>
            </a>
          )}
        </div>

        {/* Mobile View */}
        <div className="flex flex-col items-center gap-y-2 mt-1 lg:hidden">
          {topbar.primary_cta_text && (
            <Link
              to={`/${slug}#${primarySectionId}`}
              rel="noopener noreferrer"
              className="w-full text-center flex justify-center items-center text-base text-white px-3 py-2 font-semibold rounded-[10px] btn-primary"
            >
              <span>{topbar.primary_cta_text}</span>
            </Link>
          )}

          <div className="flex justify-center gap-x-3 w-full">
            {topbar.apply_now_url && (
              <a
                href={topbar.apply_now_url}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full flex justify-center items-center rounded-[10px] text-sm bg-[#F04E30] hover:bg-[#102B64] text-white px-1 py-2 font-semibold"
              >
                APPLY NOW
              </a>
            )}

            {topbar.phone_number && (
              <a
                href={`tel:${topbar.phone_number}`}
                className="w-full flex justify-center"
              >
                <button className="w-full flex justify-center items-center uppercase rounded-[10px] font-[500] text-sm hover:bg-[#F04E30] bg-[#102B64] text-white px-2 py-2">
                  <svg
                    className="w-5 h-5"
                    fill="white"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path d="M6.62 10.79a15.91 15.91 0 006.59 6.59l2.2-2.2a1 1 0 011.11-.27 11.36 11.36 0 003.55.57 1 1 0 011 1v3.43a1 1 0 01-1 1A17.93 17.93 0 012 6a1 1 0 011-1h3.44a1 1 0 011 1 11.36 11.36 0 00.57 3.55 1 1 0 01-.27 1.11z" />
                  </svg>
                  <span className="text-sm">
                    {topbar.phone_label || topbar.phone_number}
                  </span>
                </button>
              </a>
            )}
          </div>
        </div>

        {/* Button Animation CSS */}
        <style>
          {`
            .btn-primary {
              background: linear-gradient(90deg, #005bbb, #0099ff);
              animation: slideIn 1s ease-out, pulseBlue 1.8s infinite;
              box-shadow: 0 0 15px rgba(0, 123, 255, 0.4);
            }

            @keyframes pulseBlue {
              0% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0.6); }
              70% { box-shadow: 0 0 0 18px rgba(0, 123, 255, 0); }
              100% { box-shadow: 0 0 0 0 rgba(0, 123, 255, 0); }
            }

            @keyframes slideIn {
              from { opacity: 0; transform: translateY(-25px); }
              to { opacity: 1; transform: translateY(0); }
            }
          `}
        </style>
      </div>

      {/* Swiper section */}
      <div className="relative w-full h-[100vh] sm:h-[calc(86vh-44px)] overflow-hidden">
        <Swiper
          modules={[Autoplay, Pagination]}
          autoplay={{ delay: 5000, disableOnInteraction: false }}
          className="w-full h-full"
          loop={true}
          pagination={{ clickable: true }}
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx} className="w-full h-full relative">
              {/* background: placeholder or image */}
              {slide.img ? (
                <img
                  src={slide.img}
                  alt="Campus"
                  className="absolute inset-0 w-full h-full object-cover"
                />
              ) : (
                <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-slate-700 to-slate-900" />
              )}

              {/* overlay */}
              {![2, 3].includes(idx) && (
                <div className="absolute inset-0 bg-black/20 z-10" />
              )}

              <div
                className={`absolute z-20 px-4 sm:px-6 
                  sm:top-1/2 top-auto bottom-10 
                  transform sm:-translate-y-1/2 sm:translate-y-0 
                  text-white w-full sm:w-1/2 max-w-2xl 
                  ${
                    slide.textPosition === "right"
                      ? "right-0 sm:text-left text-left sm:mr-10"
                      : "left-0 sm:text-left text-left sm:ml-10"
                  }
                  sm:bottom-auto sm:top-1/2
                `}
              >
                <h1
                  className={`text-3xl md:text-[42px] font-oswald-medium font-medium leading-snug whitespace-pre-line ${
                    idx === 1 ? "mt-[-228px]" : idx === 3 ? "mt-[-70px]" : ""
                  }`}
                >
                  {slide.title}
                </h1>
                {slide.highlight && (
                  <p className="text-base sm:text-xl mt-3 font-[400] whitespace-pre-line">
                    {slide.highlight}
                  </p>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </>
  );
}

export default Hero;
