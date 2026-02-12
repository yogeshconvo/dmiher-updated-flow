import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import { PlayCircle } from "lucide-react";

const Outcome = ({ data }) => {
  const [playVideo, setPlayVideo] = useState(false);

  if (!data) return null; // safety check

  return (
    <>
      <div className="outcome-wrapper">
        <div className="outcome-inner">
          <Swiper
            modules={[Autoplay, Pagination]}
            autoplay={{ delay: 4000 }}
            pagination={{
              el: ".custom-swiper-pagination",
              clickable: true,
            }}
            loop
            className="outcome-swiper"
          >
            {data?.slider?.map((slide, index) => (
              <SwiperSlide key={index}>
                {slide.type === "image" && (
                  <div className="slide-image">
                    <img
                      src={`/assets/${slide.image}`}
                      alt={slide.title}
                      className="slide-img"
                    />
                    <div className="slide-overlay" />
                    <div className="slide-content">
                      <h1>{slide.title}</h1>
                    </div>
                  </div>
                )}

                {slide.type === "icons" && (
                  <div className="slide-icons">
                    <div className="icons-grid">
                      {data?.icons?.map((icon, i) => (
                        <img
                          key={i}
                          src={`/assets/Outcome/${icon}`}
                          alt="icon"
                          className="icon-img"
                        />
                      ))}
                      <div className="icons-text">
                        <p>{slide.text}</p>
                      </div>
                    </div>
                  </div>
                )}
              </SwiperSlide>
            ))}
          </Swiper>

          <div className="custom-swiper-pagination" />
        </div>
      </div>

      {/* Video Section */}
      <div className="video-section">
        <h3 className="video-heading">
          LIFE AT DMIHER (DU)
        </h3>

        {!playVideo ? (
          <div className="video-thumbnail-wrapper">
            <img
              src={`/assets/${data?.video?.thumbnail}`}
              alt="Video Thumbnail"
              className="video-thumbnail"
            />
            <button
              onClick={() => setPlayVideo(true)}
              className="video-play-btn"
            >
              <PlayCircle size={72} />
            </button>
          </div>
        ) : (
          <div className="video-wrapper">
            <iframe
              src={`https://www.youtube.com/embed/${data?.video?.youtube_id}?autoplay=1`}
              allowFullScreen
              title="Life at DMIHER"
            />
          </div>
        )}
      </div>
    </>
  );
};

export default Outcome;
