import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { PlayCircle } from "lucide-react";

const Outcome = ({ data }) => {
  const [playVideo, setPlayVideo] = useState(false);

  if (!data?.slider) return null;

  const slides = data.slider;
  const hasMultipleSlides = slides.length > 1;
  const enableLoop = slides.length >= 3;

  // ✅ Thumbnail Fix (array handle)
  const thumbnail =
    data?.video?.thumbnail?.[0] ||
    "https://via.placeholder.com/800x450?text=Video+Thumbnail";

  // ✅ Extract YouTube ID from full URL
  const getYoutubeId = (url) => {
    if (!url) return "";
    const regExp =
      /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    const match = url.match(regExp);
    return match && match[2].length === 11 ? match[2] : url;
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

              {/* IMAGE SLIDE */}
              {slide.type === "image" && (
                <div className="slide-image">
                  <img
                    src={slide.image}
                    alt={slide.title}
                    className="slide-img"
                  />
                  <div className="slide-overlay" />
                  <div className="slide-content">
                    <h1>{slide.title}</h1>
                  </div>
                </div>
              )}

              {/* ICON SLIDE */}
              {slide.type === "icons" && (
                <div className="slide-icons">
              

                  <div className="icons-grid">
                    {slide.icons?.map((item, i) => (
                      <img
                        key={i}
                        src={item.image}
                        alt={`icon-${i}`}
                        className="icon-img"
                      />
                    ))}
                     <div className="icons-text">
                    <p>{slide.title}</p>
                  </div>
                  </div>

                 
                </div>
              )}

            </SwiperSlide>
          ))}
        </Swiper>

        {/* VIDEO SECTION */}
        {youtubeId && (
          <div className="video-section">
            {!playVideo ? (
              <div
                className="video-thumbnail-wrapper"
                onClick={() => setPlayVideo(true)}
              >
                <img
                  src={thumbnail}
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
