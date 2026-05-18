import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import "swiper/css";
import { Link } from "react-router-dom";
import SafeImage from "../../components/SafeImage";

export default function Logos({ data }) {
  const {
    header = {},
    buttons = [],
    logos = [],
    slider_settings = {},
  } = data || {};

  const { heading } = header;

  const {
    autoplay_delay = 2000,
    mobile_slides = 2,
    tablet_slides = 3,
    desktop_slides = 4,
  } = slider_settings;

  return (
    <section className="inst-logos-section">
      <div className="container">

        {/* HEADING */}
        {heading && (
          <h2 className="inst-logos-heading">
            {heading}
          </h2>
        )}

        {/* BUTTONS */}
        {buttons.length > 0 && (
          <div className="inst-logos-buttons">
            {buttons.map((btn, idx) => (
              <Link key={idx} to={btn.url || "#"}>
                <button className="inst-logos-btn">
                  {btn.label}
                </button>
              </Link>
            ))}
          </div>
        )}

        {/* MOBILE (Slider) */}
        <div className="inst-logos-mobile">
          <Swiper
            spaceBetween={16}
            slidesPerView={mobile_slides}
            loop={true}
            autoplay={{
              delay: autoplay_delay,
              disableOnInteraction: false,
            }}
            breakpoints={{
              320: { slidesPerView: mobile_slides },
              481: { slidesPerView: tablet_slides },
              769: { slidesPerView: desktop_slides },
            }}
            modules={[Autoplay]}
          >
            {logos.map((logo, idx) => (
              <SwiperSlide key={idx}>
                <div className="inst-logos-slide">
                  <SafeImage
                    src={logo.src}
                    alt={logo.alt || "logo"}
                    className="inst-logos-img"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* TABLET (Slider) */}
        <div className="inst-logos-tablet">
          <Swiper
            spaceBetween={20}
            slidesPerView={tablet_slides}
            loop={true}
            autoplay={{
              delay: autoplay_delay,
              disableOnInteraction: false,
            }}
            modules={[Autoplay]}
          >
            {logos.map((logo, idx) => (
              <SwiperSlide key={idx}>
                <div className="inst-logos-slide-tablet">
                  <SafeImage
                    src={logo.src}
                    alt={logo.alt || "logo"}
                    className="inst-logos-img"
                  />
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>

        {/* DESKTOP (Grid) */}
        <div className="inst-logos-desktop">
          {logos.map((logo, index, arr) => (
            <div
              key={index}
              className={`inst-logos-cell ${
                index !== arr.length - 1 ? "inst-logos-cell-divider" : ""
              }`}
            >
              <SafeImage
                src={logo.src}
                alt={logo.alt || "logo"}
                className="inst-logos-img-desktop"
              />
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
