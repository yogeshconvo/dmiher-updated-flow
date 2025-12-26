import { useState, useRef, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper/modules";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

import "swiper/css";
import "swiper/css/navigation";
import "../styles/components/gallery.css";

export function GalleryWithPopup({ data }) {
  const { title, description, images = [] } = data || {};
  const [popupIndex, setPopupIndex] = useState(null);
  const [chunkSize, setChunkSize] = useState(9);
  const prevRef = useRef(null);
  const nextRef = useRef(null);

  useEffect(() => {
    const updateChunkSize = () => {
      if (window.innerWidth < 1024) setChunkSize(6);
      else setChunkSize(9);
    };
    updateChunkSize();
    window.addEventListener("resize", updateChunkSize);
    return () => window.removeEventListener("resize", updateChunkSize);
  }, []);

  const slides = [];
  for (let i = 0; i < images.length; i += chunkSize) {
    slides.push(images.slice(i, i + chunkSize));
  }

  return (
    <section className="gallery-section">
      <div className="container">
        <div className="gallery-heading-line"></div>
        <h2 className="gallery-heading">{title}</h2>

        <p className="gallery-description">{description}</p>

        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          navigation={{
            prevEl: prevRef.current,
            nextEl: nextRef.current,
          }}
        >
          {slides.map((group, i) => (
            <SwiperSlide key={i}>
              <div className="gallery-grid">
                {group.map((img, idx) => (
                  <div
                    key={idx}
                    className="gallery-card"
                    onClick={() => setPopupIndex(idx)}
                  >
                    <img src={img.image} alt={img.title} className="gallery-image" />
                    <p className="gallery-image-title">{img.title}</p>
                  </div>
                ))}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>

        {popupIndex !== null && (
          <ImagePopup
            images={images}
            index={popupIndex}
            onClose={() => setPopupIndex(null)}
          />
        )}
      </div>
    </section>
  );
}

export function ImagePopup({ images, index, onClose }) {
  return (
    <div className="gallery-popup" onClick={onClose}>
      <div className="gallery-popup-inner" onClick={(e) => e.stopPropagation()}>
        <div className="gallery-popup-image">
          <img src={images[index].image} alt="" />
        </div>
        <button className="gallery-popup-close" onClick={onClose}>
          <X size={30} />
        </button>
      </div>
    </div>
  );
}
