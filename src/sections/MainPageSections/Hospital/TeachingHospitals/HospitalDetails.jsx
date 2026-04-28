import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import RichTextRenderer from "../../../../components/RichTextRenderer";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function HospitalDetails({ campus }) {
  const images = (campus?.intro?.into_img || [])
    .map((i) => i?.image)
    .filter(Boolean);
  const about = campus?.intro?.["0"] || {};

  if (!images.length && !about?.heading && !about?.description) return null;

  return (
    <div className="container grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-16 items-start">
      <style>
        {`
          .custom-swiper-nav .swiper-button-next,
          .custom-swiper-nav .swiper-button-prev {
            width: 35px;
            height: 35px;
            background-color: rgba(0, 0, 0, 0.3);
            border-radius: 50%;
          }

          .custom-swiper-nav .swiper-button-next::after,
          .custom-swiper-nav .swiper-button-prev::after {
            font-size: 15px;
            color: white;
          }
        `}
      </style>

      {images.length > 0 && (
        <div className="relative h-full">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation={true}
            loop={images.length > 1}
            className="rounded-lg overflow-hidden custom-swiper-nav"
            style={{ height: "100%" }}
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="w-full h-[500px] rounded-xl overflow-hidden">
                  <img
                    src={img}
                    alt={`Hospital ${idx + 1}`}
                    className="w-full h-full object-cover"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div className="text-white space-y-6">
        {about?.heading && (
          <h2 className="text-2xl max-w-[500px] font-bold text-[#122E5E] mb-6">
            {about.heading}
          </h2>
        )}
        {about?.description && (
          <div className="text-sm leading-relaxed text-[#58595B]">
            <RichTextRenderer html={about.description} />
          </div>
        )}
      </div>
    </div>
  );
}

export default HospitalDetails;
