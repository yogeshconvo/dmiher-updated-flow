import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";

function DifferenceHospitals({ campus }) {
  const diff = campus?.difference || {};
  const title = diff?.["0"]?.heading || "";
  const subTitle = diff?.["0"]?.subheading || "";
  const points = Array.isArray(diff?.points) ? diff.points : [];
  const images = (diff?.images || []).map((i) => i?.image).filter(Boolean);

  if (!title && !subTitle && !points.length && !images.length) return null;

  return (
    <div className="container py-10 flex flex-col md:flex-row gap-8">
      <style>
        {`
          .difference-swiper .swiper-button-next,
          .difference-swiper .swiper-button-prev {
            width: 35px;
            height: 35px;
            margin-top:10px;
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 50%;
          }

          .difference-swiper .swiper-button-next::after,
          .difference-swiper .swiper-button-prev::after {
            font-size: 15px;
            color: white;
          }
        `}
      </style>

      {/* Left side content */}
      <div className="flex-1 text-[#58595B]">
        {title && (
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#707070] mb-2 font-oswald-medium font-[500] tracking-tight leading-tight">
            <span className="block border-t-4 border-[#F04E30] w-20 sm:w-24 mb-2 mr-4"></span>
            {title}
          </h2>
        )}
        {subTitle && (
          <p className="text-[#122E5E] text-xl mb-4">{subTitle}</p>
        )}

        {points.length > 0 && (
          <div className="max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
            <ul className="space-y-3 text-base">
              {points.map((p, i) => (
                <li key={i} className="leading-relaxed">
                  {p.title && (
                    <span className="font-semibold text-[#122E5E]">
                      {p.title}
                    </span>
                  )}
                  {p.title && p.description ? " — " : ""}
                  {p.description && <span>{p.description}</span>}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Right side Swiper */}
      {images.length > 0 && (
        <div className="flex-1 max-w-xl flex justify-center items-center">
          <Swiper
            modules={[Navigation]}
            navigation
            spaceBetween={24}
            loop={images.length > 1}
            className="difference-swiper"
            style={{ paddingBottom: "3rem" }}
          >
            {images.map((src, idx) => (
              <SwiperSlide key={idx}>
                <img
                  src={src}
                  alt=""
                  className="object-cover rounded-xl w-full md:mt-20 h-[450px]"
                />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
}

export default DifferenceHospitals;
