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
          <div className="flex justify-center">
            <div className="flex flex-col items-center text-center px-4 min-h-[200px]">
              <SafeImage
                src={item.icon}
                alt=""
                className="w-25 h-25 mb-2"
              />
              <RichTextRenderer
                className="text-orange-600 text-xl font-semibold"
                html={item.value}
              />
              {item.label && (
                <RichTextRenderer
                  className="text-[#58595B] text-lg font-semibold"
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
