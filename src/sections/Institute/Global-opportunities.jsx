import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import RichTextRenderer from "../../components/RichTextRenderer";

export default function GlobalOpportunities({ data }) {
  const {
    header = {},
    image_section = {},
    logos = [],
    layout = {},
  } = data || {};

  const { heading, description } = header;
  const { image } = image_section;
  const { layout_type = "image_logo" } = layout;

  // Layout logic
  const showImage =
    layout_type === "image_logo" || layout_type === "only_image";

  const showLogos =
    layout_type === "image_logo" || layout_type === "only_logo";

  // Auto slider logic
  const isOnlyLogo = layout_type === "only_logo";
  const useSlider = isOnlyLogo && logos.length > 6;

  return (
    <section className="global-section">
      <div className="container font-[Arial]">
        
        {/* HEADER */}
        <div className="global-header">
          {heading && (
            <h2 className="heading">
              <hr className="heading-line" />
              {heading}
            </h2>
          )}
          {description && <RichTextRenderer html={description} />}
        </div>

        {/* DESKTOP VIEW */}
        <div className="global-desktop">

          {/* IMAGE */}
          {showImage && image && (
            <div className="global-image-wrapper">
              <img src={image} alt="global" className="global-image" />
            </div>
          )}

          {/* LOGOS */}
          {showLogos && logos.length > 0 && (
            <>
              {/* GRID */}
              {!useSlider && (
                <div className="global-logos">
                  {logos.map((logo, idx) => (
                    <div
                      key={idx}
                      className={`global-logo-cell ${
                        idx !== 2 && idx !== 5
                          ? "global-logo-cell-border"
                          : ""
                      }`}
                    >
                      <div className="global-logo-box">
                        <img
                          src={logo.src}
                          alt={logo.alt || "logo"}
                          className="global-logo"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* SLIDER */}
              {useSlider && (
                <Swiper
                  spaceBetween={20}
                  slidesPerView={4}
                  breakpoints={{
                    1024: { slidesPerView: 4 },
                    768: { slidesPerView: 3 },
                    480: { slidesPerView: 2 },
                  }}
                  className="global-logos-slider"
                >
                  {logos.map((logo, idx) => (
                    <SwiperSlide key={idx}>
                      <div className="global-logo-box">
                        <img
                          src={logo.src}
                          alt={logo.alt || "logo"}
                          className="global-logo"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              )}
            </>
          )}
        </div>

        {/* MOBILE VIEW */}
        <div className="global-mobile">

          {/* IMAGE */}
          {showImage && image && (
            <div className="global-mobile-image">
              <img src={image} alt="global" className="global-image" />
            </div>
          )}

          {/* LOGOS */}
          {showLogos && logos.length > 0 && (
            <Swiper
              spaceBetween={15}
              slidesPerView={2}
              breakpoints={{
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
              }}
              className="global-mobile-logos"
            >
              {logos.map((logo, idx) => (
                <SwiperSlide key={idx}>
                  <img
                    src={logo.src}
                    alt={logo.alt || "logo"}
                    className="global-mobile-logo-img"
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>
    </section>
  );
}