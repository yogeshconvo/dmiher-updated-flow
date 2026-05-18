import React from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { resolveImage } from "../../../../utils/resolveImage";
import { pickIndexedBlock } from "./helpers";
import SafeImage from "../../../../components/SafeImage";
import "swiper/css";
import "swiper/css/navigation";

function DifferenceHospitals({ campus }) {
  const diff = campus?.difference || {};
  const diffHeader = pickIndexedBlock(diff);
  const title = diffHeader.heading || "";
  const subTitle = diffHeader.subheading || "";
  const points = Array.isArray(diff?.points) ? diff.points : [];
  const images = (diff?.images || [])
    .map((i) => resolveImage(i?.image))
    .filter(Boolean);

  if (!title && !subTitle && !points.length && !images.length) return null;

  return (
    <div className="diff-hospitals-section">
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
      <div className="diff-hospitals-left">
        {title && (
          <h2 className="diff-hospitals-title">
            <span className="diff-hospitals-title-line"></span>
            {title}
          </h2>
        )}
        {subTitle && (
          <p className="diff-hospitals-subtitle">{subTitle}</p>
        )}

        {points.length > 0 && (
          <div className="diff-hospitals-points-wrap custom-scrollbar">
            <ul className="diff-hospitals-points">
              {points.map((p, i) => (
                <li key={i} className="diff-hospitals-point">
                  {p.title && (
                    <span className="diff-hospitals-point-title">
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
        <div className="diff-hospitals-right">
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
                <SafeImage
                  src={src}
                  alt=""
                  className="diff-hospitals-img"
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
