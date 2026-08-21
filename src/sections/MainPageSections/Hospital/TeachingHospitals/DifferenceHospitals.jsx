import React, { useRef, useEffect } from "react";
import { Navigation } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  // Custom circular chevron arrows (same style as the SRMMCON Global
  // Opportunity slider). Bind the buttons to Swiper navigation after mount.
  const prevRef = useRef(null);
  const nextRef = useRef(null);
  const swiperRef = useRef(null);
  useEffect(() => {
    const s = swiperRef.current;
    if (s && s.params && s.params.navigation) {
      s.params.navigation.prevEl = prevRef.current;
      s.params.navigation.nextEl = nextRef.current;
      s.navigation.destroy();
      s.navigation.init();
      s.navigation.update();
    }
  }, [images.length]);

  if (!title && !subTitle && !points.length && !images.length) return null;

  return (
    <div className="diff-hospitals-section">
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

      {/* Right side Swiper — `relative` on the flex container itself so the
          absolute arrows anchor here without adding a wrapper div (an extra
          div broke the flex width and collapsed the slider). */}
      {images.length > 0 && (
        <div className="diff-hospitals-right relative">
          <Swiper
            modules={[Navigation]}
            onSwiper={(s) => (swiperRef.current = s)}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            spaceBetween={24}
            loop={images.length > 1}
            className="difference-swiper w-full"
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

          {images.length > 1 && (
            <>
              <button
                ref={prevRef}
                aria-label="Previous"
                className="absolute top-1/2 left-2 z-10 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100"
              >
                <ChevronLeft size={18} />
              </button>
              <button
                ref={nextRef}
                aria-label="Next"
                className="absolute top-1/2 right-2 z-10 -translate-y-1/2 bg-white border border-gray-300 rounded-full p-1 shadow hover:bg-gray-100"
              >
                <ChevronRight size={18} />
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default DifferenceHospitals;
