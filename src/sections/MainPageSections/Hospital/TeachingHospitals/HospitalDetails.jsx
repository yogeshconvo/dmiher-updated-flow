import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import RichTextRenderer from "../../../../components/RichTextRenderer";
import { resolveImage } from "../../../../utils/resolveImage";
import { pickIndexedBlock } from "./helpers";
import SafeImage from "../../../../components/SafeImage";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

function HospitalDetails({ campus }) {
  const images = (campus?.intro?.into_img || [])
    .map((i) => resolveImage(i?.image))
    .filter(Boolean);
  const about = pickIndexedBlock(campus?.intro);

  if (!images.length && !about?.heading && !about?.description) return null;

  return (
    <div className="hd-section">
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
        <div className="hd-swiper-wrap">
          <Swiper
            modules={[Autoplay, Navigation]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            navigation={true}
            loop={images.length > 1}
            className="hd-swiper custom-swiper-nav"
            style={{ height: "100%" }}
          >
            {images.map((img, idx) => (
              <SwiperSlide key={idx}>
                <div className="hd-slide">
                  <SafeImage
                    src={img}
                    alt={`Hospital ${idx + 1}`}
                    className="hd-slide-img"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}

      <div className="hd-text-col">
        {about?.heading && (
          <h2 className="hd-heading">
            {about.heading}
          </h2>
        )}
        {about?.description && (
          <div className="hd-desc">
            <RichTextRenderer html={about.description} />
          </div>
        )}
      </div>
    </div>
  );
}

export default HospitalDetails;
