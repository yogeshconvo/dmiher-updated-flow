import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import RichTextRenderer from "../RichTextRenderer";
import SafeImage from "../SafeImage";

const ResearchSectionMobileSlider = ({
  data,
  autoplayDelay = 3000,
  speed = 500,
  children,
}) => {
  if (children) {
    return (
      <Swiper
        modules={[Pagination, Autoplay]}
        slidesPerView={1}
        loop={true}
        speed={speed}
        autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
        pagination={{ clickable: true }}
      >
        {children}
      </Swiper>
    );
  }

  return (
    <Swiper
      modules={[Pagination, Autoplay]}
      slidesPerView={1}
      loop={true}
      speed={speed}
      autoplay={{ delay: autoplayDelay, disableOnInteraction: false }}
      pagination={{ clickable: true }}
    >
      {data.map((item, index) => (
        <SwiperSlide key={index}>
          <div className="mslider-cell">
            <div className="mslider-content">
              <SafeImage
                src={item.icon}
                alt=""
                className="mslider-icon"
              />
              <RichTextRenderer
                className="mslider-value"
                html={item.value}
              />
              {item.label && (
                <RichTextRenderer
                  className="mslider-label"
                  html={item.label}
                />
              )}
            </div>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default ResearchSectionMobileSlider;
