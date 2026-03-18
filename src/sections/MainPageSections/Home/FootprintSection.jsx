import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";

const FootprintSection = ({ data }) => {
  const tabs = data?.tabs || [];
  const [activeTab, setActiveTab] = useState("");
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const currentTab = tabs.find((tab) => tab.id === activeTab);

  if (tabs.length === 0) return null;

  return (
    <div className="container">
      
      {/* Tabs */}
      {tabs.length === 1 ? (
        <div className="pb-2">
          <div className="tab-indicator tab-indicator-active" />

          <h2 className="tab-title tab-title-active">
            {tabs[0].title || tabs[0].id.replaceAll("_", " ")}
          </h2>
        </div>
      ) : (
        <div className="tab-wrapper">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              className="tab-button"
              onClick={() => setActiveTab(tab.id)}
            >
              <div
                className={`tab-indicator ${
                  activeTab === tab.id ? "tab-indicator-active" : ""
                }`}
              />

              <h2
                className={`tab-title ${
                  activeTab === tab.id
                    ? "tab-title-active"
                    : "tab-title-inactive"
                }`}
              >
                {tab.title || tab.id.replaceAll("_", " ")}
              </h2>
            </button>
          ))}
        </div>
      )}

      {/* Content */}
      {currentTab && (
        <>
          {/* Image + Points */}
          {currentTab.image && (
            <div
              className="image-container"
              style={{
                backgroundColor: currentTab.bg_color || "#122E5E",
              }}
            >
              <div className="image-inner">
                <img
                  src={currentTab.image}
                  alt={currentTab.id}
                  className="tab-image"
                />

                {currentTab.points?.length > 0 &&
                  (isMobile ? (
                    <Swiper
                      modules={[Autoplay, Pagination]}
                      pagination={{ clickable: true }}
                      autoplay={{ delay: 3000 }}
                      slidesPerView={1}
                      loop
                      className="w-full mb-4"
                    >
                      {currentTab.points.map((point, index) => (
                        <SwiperSlide key={index}>
                          <div className="point-mobile">
                            {point.text}
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                    <div className="points-grid">
                      {currentTab.points.map((point, index) => (
                        <div key={index} className="point-item">
                          {point.text}
                        </div>
                      ))}
                    </div>
                  ))}
              </div>
            </div>
          )}

          {/* Logos */}
          {currentTab.logos?.length > 0 && (
            <div className="logos-container">
              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 4000 }}
                pagination={{ clickable: true }}
                loop
                slidesPerView={1}
              >
                {[0, 20].map((startIndex, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="logo-grid">
                      {currentTab.logos
                        .slice(startIndex, startIndex + 20)
                        .filter((logoObj) => logoObj?.logo)
                        .map((logoObj, index) => (
                          <div key={index} className="logo-item">
                            <img
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