import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { PlayCircle } from "lucide-react";
import RichTextRenderer from "../../../components/RichTextRenderer";
const Outcome = ({ data }) => {
  const [playVideo, setPlayVideo] = useState(false);

  if (!data?.slider || data.slider.length === 0) return null;

  const slides = data.slider;
  const hasMultipleSlides = slides.length > 1;
  const enableLoop = slides.length >= 3;

  // ✅ Thumbnail Fix (handle string / array / fallback)
  const thumbnail = Array.isArray(data?.video?.thumbnail)
    ? data.video.thumbnail[0]
    : data?.video?.thumbnail || "";

  // ✅ Extract YouTube ID (supports full URL or ID)
  const getYoutubeId = (url) => {
    if (!url) return "";
    if (url.length === 11) return url;

    const regExp =
      /^.*(youtu.be\/|v\/|embed\/|watch\?v=|\&v=)([^#\&\?]{11}).*/;
    const match = url.match(regExp);
    return match ? match[2] : "";
  };

  const youtubeId = getYoutubeId(data?.video?.youtube_id);

  return (
    <div className="container">
      <div className="outcome-inner">

        <Swiper
          modules={[Autoplay, Pagination]}
          slidesPerView={1}
          loop={enableLoop}
          autoplay={
            hasMultipleSlides
              ? { delay: 4000, disableOnInteraction: false }
              : false
          }
          pagination={hasMultipleSlides ? { clickable: true } : false}
          className="outcome-swiper"
        >
          {slides.map((slide, index) => (
            <SwiperSlide key={index}>

              {/* ✅ IMAGE SLIDE */}
              {slide.tab_type === "image" && (
                <div className="slide-image">
                  <img
                    src={slide.image}
                    alt="slide"
                    className="slide-img"
                  />
                  <div className="slide-overlay" />
                  <div className="slide-content">
                    <RichTextRenderer html={slide.desc} />
                  </div>
                </div>
              )}

              {/* ✅ ICON SLIDE */}
              {slide.tab_type === "icons" && (
                <div
                  className="slide-icons"
                  style={{ backgroundColor: slide.bg_color }}
                >
                  <div className="icons-grid">
                    {slide.icons?.map((item, i) => (
                      <img
                        key={i}
                        src={item.image}
                        alt={`icon-${i}`}
                        className="icon-img"
                      />
                    ))}
                  </div>

                  {slide.title && (
                    <div className="icons-text">
                      <p>{slide.title}</p>
                    </div>
                  )}
                </div>
              )}

            </SwiperSlide>
          ))}
        </Swiper>

        {/* ✅ VIDEO SECTION */}
        {youtubeId && (
          <div className="video-section">
            {!playVideo ? (
              <div
                className="video-thumbnail-wrapper"
                onClick={() => setPlayVideo(true)}
              >
                <img
                  src={
                    thumbnail ||
                    `https://img.youtube.com/vi/${youtubeId}/hqdefault.jpg`
                  }
                  alt="Video Thumbnail"
                  className="video-thumbnail"
                />
                <div className="play-icon">
                  <PlayCircle size={60} />
                </div>
              </div>
            ) : (
              <iframe
                className="video-iframe"
                src={`https://www.youtube.com/embed/${youtubeId}?autoplay=1`}
                title="YouTube Video"
                allow="autoplay; encrypted-media"
                allowFullScreen
              />
            )}
          </div>
        )}

      </div>
    </div>
  );
};
export default Outcome;
 
    
