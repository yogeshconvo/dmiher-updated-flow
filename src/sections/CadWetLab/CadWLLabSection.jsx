import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import SafeImage from "../../components/SafeImage";
import RichTextRenderer from "../../components/RichTextRenderer";
import { resolveImage } from "../../utils/resolveImage";
import "swiper/css";
import "swiper/css/pagination";

/**
 * Cadaveric & Wet Lab — reusable lab section.
 * Used twice on /cadaveric-wet-lab (once for the Cadaveric Surgical Skill Lab,
 * once for the Wet Lab). Each instance carries:
 *   • a section heading (e.g. "CADAVERIC SURGICAL SKILL LAB")
 *   • a custom background color (sand for cadaveric, light blue for wet)
 *   • Main-Campus / Off-Campus tabs, each with description, image, officials,
 *     and a "HOLISTIC LEARNING INFRASTRUCTURE" highlight bar.
 *
 * Data shape (section_key: cadwl_lab_section)
 *   {
 *     heading:    "CADAVERIC SURGICAL SKILL LAB",
 *     bg_color:   "#fef6ec",
 *     tabs: [
 *       {
 *         tab_label:   "MAIN CAMPUS – WARDHA",
 *         location:    "Wardha",
 *         description: "<p>...</p>",
 *         images:      ["assets/.../wardha.jpg", ...],
 *         officials: [
 *           { role: "Cadaveric Lab Incharge", image, name, details (HTML) }
 *         ],
 *         infra_heading: "HOLISTIC LEARNING\nINFRASTRUCTURE",
 *         infra: [
 *           { title: "Dedicated well-ventilated space", description: "for cadaveric skill lab" },
 *           ...
 *         ]
 *       }, ...
 *     ]
 *   }
 */
export default function CadWLLabSection({ data }) {
  if (!data) return null;
  const { heading, bg_color, tabs = [] } = data;
  const [active, setActive] = useState(0);

  if (!tabs.length) return null;
  const current = tabs[active] || tabs[0];

  return (
    <section className="cadwl-lab">
      {/* Campus tab pills */}
      <ul className="cadwl-lab-tabs">
        {tabs.map((t, idx) => (
          <li
            key={idx}
            onClick={() => setActive(idx)}
            className={
              "cadwl-lab-tab" +
              (active === idx ? " cadwl-lab-tab-active" : " cadwl-lab-tab-inactive")
            }
          >
            {t.tab_label}
          </li>
        ))}
      </ul>

      {/* Body */}
      <div
        className="cadwl-lab-body"
        style={bg_color ? { backgroundColor: bg_color } : undefined}
      >
        <div className="container">
          {/* Heading */}
          {heading && (
            <h2 className="cadwl-lab-heading">
              <span className="cadwl-lab-heading-line" />
              <span className="cadwl-lab-heading-text">{heading}</span>
            </h2>
          )}

          {/* Description + image carousel */}
          <div className="cadwl-lab-grid">
            <div className="cadwl-lab-text">
              {current.location && (
                <h3 className="cadwl-lab-location">{current.location}</h3>
              )}
              {current.description && (
                <div className="cadwl-lab-desc">
                  <RichTextRenderer html={current.description} />
                </div>
              )}
            </div>

            {Array.isArray(current.images) && current.images.length > 0 && (
              <div className="cadwl-lab-imgwrap">
                <Swiper
                  modules={[Pagination]}
                  pagination={{ clickable: true }}
                  slidesPerView={1}
                  loop={current.images.length > 1}
                  className="cadwl-lab-swiper"
                  style={{ paddingBottom: "3rem" }}
                >
                  {current.images.map((img, i) => (
                    <SwiperSlide key={i}>
                      <div className="cadwl-lab-slide">
                        <SafeImage
                          src={resolveImage(img)}
                          alt={`${current.location || "Lab"} ${i + 1}`}
                          className="cadwl-lab-img"
                        />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>

          {/* Key Officials */}
          {Array.isArray(current.officials) && current.officials.length > 0 && (
            <div className="cadwl-lab-officials-wrap">
              <h3 className="cadwl-lab-officials-heading">Key Officials</h3>
              <div className="cadwl-lab-officials-grid">
                {current.officials.map((o, idx) => (
                  <div key={idx} className="cadwl-lab-official-card">
                    {o.image && (
                      <SafeImage
                        src={resolveImage(o.image)}
                        alt={o.name || "official"}
                        className="cadwl-lab-official-img"
                      />
                    )}
                    <div className="cadwl-lab-official-body">
                      {o.role && (
                        <div className="cadwl-lab-official-role">{o.role}</div>
                      )}
                      <hr className="cadwl-lab-official-rule" />
                      {o.name && (
                        <div className="cadwl-lab-official-name">{o.name}</div>
                      )}
                      {o.details && (
                        <div className="cadwl-lab-official-details">
                          <RichTextRenderer html={o.details} />
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

        </div>
      </div>

      {/* Holistic Learning Infrastructure boxes — sits OUTSIDE the colored
         body so its background is always white regardless of bg_color. */}
      {Array.isArray(current.infra) && current.infra.length > 0 && (
        <div className="cadwl-lab-infra-section">
          <div className="container">
            <div className="cadwl-lab-infra-wrap">
              {current.infra_heading && (
                <h3 className="cadwl-lab-infra-heading">
                  <span className="cadwl-lab-heading-line" />
                  <span style={{ whiteSpace: "pre-line" }}>
                    {current.infra_heading}
                  </span>
                </h3>
              )}
              <ul className="cadwl-lab-infra-grid">
                {current.infra.map((item, idx) => (
                  <li
                    key={idx}
                    className={
                      "cadwl-lab-infra-item" +
                      (idx < current.infra.length - 1
                        ? " cadwl-lab-infra-item-divider"
                        : "")
                    }
                  >
                    {item.title && <b>{item.title}</b>}
                    {item.description && (
                      <span> {item.description}</span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
