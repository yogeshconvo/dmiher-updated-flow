import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import { Link } from "react-router";
import "swiper/css";
import "swiper/css/pagination";
import SafeImage from "../../../components/SafeImage";

/**
 * CampusLifeImmersive — left text + accordion tabs (Skill Labs / Museums),
 * right side swiper of images that swaps based on active tab.
 */
const CampusLifeImmersive = ({ data }) => {
  const tabs = data?.tabs || [];
  const [activeKey, setActiveKey] = useState(tabs[0]?.key || null);

  useEffect(() => {
    if (tabs.length && !tabs.find((t) => t.key === activeKey)) {
      setActiveKey(tabs[0].key);
    }
  }, [tabs, activeKey]);

  const activeTab = tabs.find((t) => t.key === activeKey);
  const images = activeTab?.images || [];

  return (
    <section className="cli-immersive container">
      <div className="cli-immersive-row">
        <div className="cli-immersive-left">
          <div className="cli-immersive-head">
            <h2 className="heading">
              <hr className="heading-line" />
              {data?.title}
            </h2>
            <p className="cli-immersive-desc">{data?.description}</p>
          </div>

          {tabs.map((tab) => (
            <div key={tab.key} className="cli-immersive-tab">
              <button
                onClick={() => setActiveKey((p) => (p === tab.key ? null : tab.key))}
                className={`cli-immersive-btn ${activeKey === tab.key ? "active" : ""}`}
              >
                {tab.title}
                <span>{activeKey === tab.key ? "-" : "+"}</span>
              </button>
              {activeKey === tab.key && (
                <>
                  <div className="cli-immersive-items">
                    {(tab.items || []).map((it, i) => (
                      <div key={i}>• {it.text}</div>
                    ))}
                  </div>
                  {tab.cta_link && tab.cta_label && (
                    <Link to={tab.cta_link} className="cli-immersive-cta">
                      {tab.cta_label}
                    </Link>
                  )}
                </>
              )}
            </div>
          ))}
        </div>

        <div className="cli-immersive-right">
          {images.length ? (
            <Swiper
              modules={[Autoplay, Pagination]}
              autoplay={{ delay: 3000 }}
              pagination={{ clickable: true }}
              loop
              className="cli-immersive-swiper"
            >
              {images.map((img, idx) => (
                <SwiperSlide key={idx}>
                  <SafeImage src={img.image} alt={img.alt || `Slide ${idx + 1}`} className="cli-immersive-img" />
                </SwiperSlide>
              ))}
            </Swiper>
          ) : (
            <div className="cli-immersive-empty">No image available</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CampusLifeImmersive;
