import React, { useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import { ChevronLeft, ChevronRight } from "lucide-react";
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

  // Custom circular chevron arrows (same style as the SRMMCON Global
  // Opportunity slider). Bind the buttons to Swiper's navigation after mount
  // so the refs are attached first, and re-init when the image set changes.
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

  if (!images.length && !about?.heading && !about?.description) return null;

  return (
    <div className="hd-section">
      {images.length > 0 && (
        <div className="hd-swiper-wrap relative">
          <Swiper
            modules={[Autoplay, Navigation, Pagination]}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            onSwiper={(s) => (swiperRef.current = s)}
            navigation={{ prevEl: prevRef.current, nextEl: nextRef.current }}
            loop={images.length > 1}
            className="hd-swiper"
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
