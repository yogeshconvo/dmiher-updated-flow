import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import RichTextRenderer from "../../../components/RichTextRenderer";
import SafeImage from "../../../components/SafeImage";

const FootprintSection = ({ data }) => {
  const tabs = data?.tabs || [];

  // ✅ index-based state
  const [activeTab, setActiveTab] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  // ✅ default tab
  useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(0); // 👈 this is your "setActiveTab(1)" style logic
    }
  }, [tabs]);

  // ✅ responsive check
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // ✅ current tab
  const currentTab = tabs[activeTab];

  // ✅ dynamic logo chunking
  const chunkSize = 12;
  const logoChunks = [];

  if (currentTab?.logos?.length) {
    for (let i = 0; i < currentTab.logos.length; i += chunkSize) {
      logoChunks.push(currentTab.logos.slice(i, i + chunkSize));
    }
  }

  if (tabs.length === 0) return null;

  return (
    <div className="container">

      {/* ================= TABS ================= */}
      {tabs.length === 1 ? (
        <div className="pb-2">
          <div className="tab-indicator tab-indicator-active" />
          <h2 className="tab-title tab-title-active">
            {tabs[0].title || "Tab"}
          </h2>
        </div>
      ) : (
        <div className="tab-wrapper">
          {tabs.map((tab, index) => (
            <button
              key={index}
              className="tab-button"
              onClick={() => setActiveTab(index)} // ✅ index-based
            >
              <div
                className={`tab-indicator ${
                  activeTab === index ? "tab-indicator-active" : ""
                }`}
              />

              <h2
                className={`tab-title ${
                  activeTab === index
                    ? "tab-title-active"
                    : "tab-title-inactive"
                }`}
              >
                {tab.title || `Tab ${index + 1}`}
              </h2>
            </button>
          ))}
        </div>
      )}

      {/* ================= CONTENT ================= */}
      {currentTab && (
        <>
          {/* IMAGE + POINTS */}
          {currentTab.image && (
            <div
              className="image-container"
              style={{
                backgroundColor: currentTab.bg_color || "#122E5E",
              }}
            >
              <div className="image-inner">

                {/* IMAGE */}
                <SafeImage
                  src={currentTab.image}
                  alt="tab"
                  className="tab-image"
                />

                {/* POINTS */}
                {currentTab.points?.length > 0 &&
                  (isMobile ? (
                    <Swiper
                      modules={[Autoplay, Pagination]}
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 3000 }}
                      slidesPerView={1}
                      loop
                      className="footprint-mobile-swiper"
                    >
                      {currentTab.points.map((point, index) => (
                        <SwiperSlide key={index}>
                          <div className="point-mobile">
                            <RichTextRenderer html={point.text} />
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="points-grid">
                      {currentTab.points.map((point, index) => (
                        <div key={index} className="point-item">
                          <RichTextRenderer html={point.text} />
                        </div>
                      ))}
                    </div>
                  ))}

              </div>
            </div>
          )}

          {/* LOGOS */}
          {currentTab.logos?.length > 0 && (
            <div className="logos-container">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 4000 }}
                pagination={{ clickable: true }}
                loop={logoChunks.length > 1}
                slidesPerView={1}
              >
                {logoChunks.map((chunk, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="logo-grid">
                      {chunk.map((logoObj, index) => (
                        <div key={index} className="logo-item">
                          <SafeImage
                            src={logoObj.logo}
                            alt="logo"
                            className="logo-image"
                          />
                        </div>
                      ))}
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default FootprintSection;