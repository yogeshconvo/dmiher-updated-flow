import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";

export default function Logos({ data }) {
  const {
    header = {},
    buttons = [],
    logos = [],
    slider_settings = {},
  } = data || {};

  const { heading } = header;

  const {
    autoplay_delay = 2000,
    mobile_slides = 2,
    tablet_slides = 3,
    desktop_slides = 4,
  } = slider_settings;

  return (
    <section className="mx-auto py-10 bg-gray-100">
      <div className="container">

        {/* HEADING */}
        {heading && (
          <h2 className="text-center text-2xl font-bold mb-6">
            {heading}
          </h2>
        )}

        {/* BUTTONS */}
        {buttons.length > 0 && (
          <div className="flex flex-wrap justify-center gap-6 mb-10">
            {buttons.map((btn, idx) => (
              <Link key={idx} to={btn.url || "#"}>
                <button className="bg-[#F04E30] hover:bg-[#122E5E] text-white text-lg px-6 py-3 rounded-md shadow-md transition">
                  {btn.label}
                </button>
              </Link>
            ))}
          </div>
        )}

        {/* MOBILE (Slider) */}
        <div className="block md:hidden px-4">
          <Swiper
            spaceBetween={16}
            slidesPerView={mobile_slides}
            loop={true}
            autoplay={{
              delay: autoplay_delay,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: mobile_slides },
              481: { slidesPerView: tablet_slides },
              769: { slidesPerView: desktop_slides },
            }}
            modules={[Autoplay]}
          >
            {logos.map((logo, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex items-center justify-center h-24 border border-gray-200 rounded">
                  <img
                    src={logo.src}
                    alt={logo.alt || "logo"}
                    className="h-20 object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* TABLET (Slider) */}
        <div className="hidden md:block lg:hidden mt-6 px-6">
          <Swiper
            spaceBetween={20}
            slidesPerView={tablet_slides}
            loop={true}
            autoplay={{
              delay: autoplay_delay,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {logos.map((logo, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex justify-center">
                  <img
                    src={logo.src}
                    alt={logo.alt || "logo"}
                    className="h-20 object-contain"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* DESKTOP (Grid) */}
        <div className="hidden lg:flex flex-wrap justify-center items-center mt-6">
          {logos.map((logo, index, arr) => (
            <div
              key={index}
              className={`px-4 h-24 flex items-center justify-center ${
                index !== arr.length - 1 ? "border-r border-gray-400" : ""
              }`}
            >
              <img
                src={logo.src}
                alt={logo.alt || "logo"}
                className="h-20 w-45 object-contain"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}