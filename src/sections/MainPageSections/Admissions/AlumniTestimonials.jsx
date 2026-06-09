import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import SafeImage from "../../../components/SafeImage";
import RichTextRenderer from "../../../components/RichTextRenderer";

/**
 * AlumniTestimonials — heading + auto-rotating testimonial carousel.
 *
 * Data shape:
 *   basic: { heading }
 *   tabs:  [{ label?, testimonials: [{ name, info, text (HTML), image? }] }]
 *
 * Tab buttons only show when there are 2+ labelled tabs; otherwise all
 * testimonials are flattened into a single carousel.
 */
const AlumniTestimonials = ({ data }) => {
  const heading = data?.basic?.heading || data?.heading || "TESTIMONIALS";
  const tabs = Array.isArray(data?.tabs) ? data.tabs : [];

  const labeledTabs = tabs.filter((t) => t?.label);
  const showTabs = labeledTabs.length > 1;

  const [active, setActive] = useState(labeledTabs[0]?.label || "");

  // Labelled tabs → active tab's testimonials. Otherwise flatten all.
  const testimonials = showTabs
    ? (tabs.find((t) => t.label === active) || tabs[0])?.testimonials || []
    : tabs.flatMap((t) => (Array.isArray(t?.testimonials) ? t.testimonials : []));

  if (!testimonials.length) return null;

  return (
    <div className="pt-16 pb-10 flex justify-center" style={{ backgroundColor: "#f4f4f4" }}>
      <div className="mx-auto max-w-7xl w-full px-4">
        <h2 className="text-3xl sm:text-4xl ml-4 md:ml-0 font-[500] font-oswald-medium tracking-wider mb-10 text-[#707070]">
          <hr className="w-12 sm:w-20 border-[#F04E30] mb-2 border-t-4" />
          {heading}
        </h2>

        {showTabs && (
          <div className="flex justify-center flex-wrap gap-4 pb-10 text-center">
            {labeledTabs.map((t, i) => (
              <button
                key={t.label}
                onClick={() => setActive(t.label)}
                className={`px-4 py-2 text-sm sm:text-base font-medium transition-all duration-200 ${
                  active === t.label
                    ? "underline text-gray-600"
                    : "text-gray-500 hover:text-gray-700"
                } ${i < labeledTabs.length - 1 ? "border-r border-gray-300 pr-4" : ""}`}
              >
                {t.label}
              </button>
            ))}
          </div>
        )}

        <div className="my-6">
          <Swiper
            style={{ paddingBottom: 60 }}
            slidesPerView={1}
            spaceBetween={30}
            loop={testimonials.length > 1}
            autoplay={{ delay: 6000, disableOnInteraction: false }}
            pagination={{ clickable: true }}
            modules={[Pagination, Autoplay]}
            className="mySwiper"
          >
            {testimonials.map((t, idx) => (
              <SwiperSlide key={idx}>
                <div
                  className={`flex justify-center items-center gap-10 flex-wrap px-4 ${
                    t.image ? "" : "flex-col"
                  }`}
                >
                  {t.image && (
                    <SafeImage
                      src={t.image}
                      alt={t.name || ""}
                      className="w-52 h-52 object-cover rounded-full"
                    />
                  )}

                  <div
                    className={`text-[16px] text-[#707070] ${
                      t.image ? "max-w-2xl text-left" : "max-w-3xl text-center mx-auto"
                    }`}
                  >
                    {t.text && (
                      <div className="leading-relaxed mb-6">
                        <RichTextRenderer html={t.text} />
                      </div>
                    )}
                    {t.name && (
                      <p className="font-bold text-lg text-[#333] font-oswald-medium">
                        {t.name}
                      </p>
                    )}
                    {t.info && (
                      <p className="text-sm text-[#707070] italic mt-1">
                        {t.info}
                      </p>
                    )}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default AlumniTestimonials;
