import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { resolveImage } from "../../../utils/resolveImage";

const AlumniTestimonials = ({ data }) => {
  const heading = data?.heading || "TESTIMONIALS";
  const tabs = data?.tabs || [];

  const initialTab = tabs[0]?.label || "";
  const [active, setActive] = useState(initialTab);

  if (!tabs.length) return null;

  const activeData = tabs.find((t) => t.label === active) || tabs[0];
  const testimonials = activeData?.testimonials || [];

  return (
    <div className="pt-16 flex justify-center">
      <div className="mx-auto container">
        <h2 className="text-3xl sm:text-4xl ml-4 md:ml-0 font-[500] font-oswald-medium tracking-wider mb-10 text-[#707070]">
          <hr className="w-12 sm:w-20 border-[#F04E30] mb-2 border-t-4" />
          {heading}
        </h2>

        <div className="flex justify-center flex-wrap gap-4 pb-10 text-center">
          {tabs.map((t, i) => (
            <button
              key={t.label}
              onClick={() => setActive(t.label)}
              className={`px-4 py-2 text-sm sm:text-base font-medium transition-all duration-200 ${
                active === t.label
                  ? "underline text-gray-600"
                  : "text-gray-500 hover:text-gray-700"
              } ${i < tabs.length - 1 ? "border-r border-gray-300 pr-4" : ""}`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="my-6">
          <Swiper
            style={{ paddingBottom: 80 }}
            slidesPerView={"auto"}
            centeredSlides={true}
            spaceBetween={30}
            pagination={{ clickable: true }}
            modules={[Pagination]}
            className="mySwiper"
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide key={idx}>
                <div className="flex justify-center items-center gap-10 flex-wrap px-4">
                  {t.image && (
                    <img
                      src={resolveImage(t.image)}
                      alt={t.name || ""}
                      className="w-60 h-60 object-cover rounded-full"
                    />
                  )}
                  <div className="max-w-2xl text-[16px] text-gray-700">
                    <p className="mb-4 leading-relaxed">{t.text}</p>
                    {t.name && (
                      <p className="font-semibold text-sm font-oswald-medium">
                        {t.name}
                      </p>
                    )}
                    {t.info && (
                      <p className="text-sm text-[#707070] whitespace-pre-line mt-2">
                        {t.info}
                      </p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default AlumniTestimonials;
