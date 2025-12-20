import { SwiperSlide } from "swiper/react";
import "../styles/InstituteSections/global_opportunities.css";

export default function GlobalOpportunities({ data }) {
  const { heading, description, image, logos = [] } = data || {};

  return (
    <section className="global-section">
      <div className="container font-[Arial]">
        {/* HEADER */}
        <div className="global-header">
          <h2 className="global-heading">
            <span className="global-heading-line"></span>
            {heading}
          </h2>
          <p className="global-description">{description}</p>
        </div>

        {/* DESKTOP VIEW */}
        <div className="global-desktop">
          <div className="global-image-wrapper">
            <img src={image} alt="" className="global-image" />
          </div>

          <div className="global-logos">
            {logos.map((logo, idx) => (
              <div
                key={idx}
                className={`global-logo-cell ${
                  idx !== 2 && idx !== 5 ? "global-logo-cell-border" : ""
                }`}
              >
                <div className="global-logo-box">
                  <img
                    src={logo.src}
                    alt={logo.alt}
                    className="global-logo"
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* MOBILE VIEW */}
        <div className="global-mobile">
          <div className="global-mobile-image">
            <img src={image} alt="" className="global-image" />
          </div>

          <div className="global-mobile-logos">
            {logos.map((logo, idx) => (
              <SwiperSlide key={idx} className="global-mobile-logo">
                <img
                  src={logo.src}
                  alt={logo.alt}
                  className="global-mobile-logo-img"
                />
              </SwiperSlide>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
