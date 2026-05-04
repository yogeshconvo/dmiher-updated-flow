import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import RichTextRenderer from "../../../components/RichTextRenderer";
import SafeImage from "../../../components/SafeImage";

const WellbeingComfortFC = ({ data }) => {
  if (!data) return null;

  const basic = data.basic || {};
  const sections = data.sections || [];

  return (
    <section
      className="py-10"
      style={{
        backgroundColor: basic.bg_color || "#eaf4ff",
        color: basic.text_color || "#707070",
      }}
    >
      <div className="container">

        {/* Heading */}
        <div className="mb-10">
                  {basic.title && <h2 className="heading">
            
                      <hr
                          className="heading-line"
            
                      />

                      {basic.title}
                  </h2>
                  }

          <p className="max-w-3xl ">
            <RichTextRenderer
              html={basic.desc}
            />
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col w-full">

              {/* Section Title */}
              <h3
                className="text-lg md:text-2xl mb-3 px-2"
                style={{
                  color: basic.card_title_color || "#223971",
                }}
              >
                {section.title}
              </h3>

              {/* Swiper */}
              <div className="w-full h-[300px] overflow-hidden rounded-xl shadow-md">
                <Swiper
                  modules={[Pagination, Autoplay]}
                  slidesPerView={1}
                  loop
                  autoplay={{ delay: 4000 }}
                  pagination={{
                    clickable: true,
                  }}
                  className="w-full h-full"
                >
                  {section.images?.map((img, i) => (
                    <SwiperSlide key={i}>
                      <div className="relative w-full h-full">

                        <SafeImage
                          src={img.image}
                          alt={img.caption}
                          className="w-full h-full object-cover"
                        />

                        {/* Caption */}
                      {img.caption &&  <div className="absolute bottom-5 left-0 right-0 bg-gradient-to-r from-black to-transparent text-white text-sm py-2 px-4">
                          {img.caption}
                        </div>}

                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>

            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default WellbeingComfortFC;