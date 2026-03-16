import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
// import { getImageSrc } from "../../../components/Services/FetchImages";


const FootprintSection = ({ data }) => {
  const tabs = data?.tabs || [];
  const [activeTab, setActiveTab] = useState("");
  const [isMobile, setIsMobile] = useState(false);


  /* ---------- DEFAULT TAB ---------- */
  useEffect(() => {
    if (tabs.length > 0) {
      setActiveTab(tabs[0].id);
    }
  }, [tabs]);

  /* ---------- MOBILE CHECK ---------- */
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);


  const currentTab = tabs.find((tab) => tab.id === activeTab);
  // if (currentTab.id === "" ? "" : "") {
  //   tab.title
  // }

  if (tabs.length === 0) return
    tabs.title;

  return (
    <div className="py-8 sm:py-12 overflow-x-hidden max-w-7xl mx-auto px-5">

      {/* TAB HEADINGS */}
      {/* <div className="flex flex-col sm:flex-row gap-4 lg:gap-10 w-full">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            className="w-full sm:w-auto text-start relative pb-2"
            onClick={() => setActiveTab(tab.id)}
          >
            <div
              className={`h-1 w-20 mt-1 ${
                activeTab === tab.id ? "bg-red-500" : ""
              }`}
            />

            <h2
              className={`text-2xl sm:text-3xl mt-3 uppercase ${
                activeTab === tab.id
                  ? "text-[#707070]"
                  : "text-[rgba(112,112,112,0.30)]"
              }`}
              style={{
                fontFamily: "'Oswald', sans-serif",
                fontWeight: 500,
              }}
            >
              {tab.id.replaceAll("_", " ")}
            </h2>
          </button>
        ))}
      </div> */}
      {/* TAB HEADINGS */}

{tabs.length === 1 ? (
  <div className="pb-2">
    <div className="h-1 w-20 mt-1 bg-red-500" />

    <h2
      className="text-2xl sm:text-3xl mt-3 uppercase text-[#707070]"
      style={{
        fontFamily: "'Oswald', sans-serif",
        fontWeight: 500,
      }}
    >
      {tabs[0].title || tabs[0].id.replaceAll("_", " ")}
    </h2>
  </div>
) : (
  <div className="flex flex-col sm:flex-row gap-4 lg:gap-10 w-full">
    {tabs.map((tab) => (
      <button
        key={tab.id}
        className="w-full sm:w-auto text-start relative pb-2"
        onClick={() => setActiveTab(tab.id)}
      >
        <div
          className={`h-1 w-20 mt-1 ${
            activeTab === tab.id ? "bg-red-500" : ""
          }`}
        />

        <h2
          className={`text-2xl sm:text-3xl mt-3 uppercase ${
            activeTab === tab.id
              ? "text-[#707070]"
              : "text-[rgba(112,112,112,0.30)]"
          }`}
          style={{
            fontFamily: "'Oswald', sans-serif",
            fontWeight: 500,
          }}
        >
          {tab.title || tab.id.replaceAll("_", " ")}
        </h2>
      </button>
    ))}
  </div>
)}

      {/* TAB CONTENT */}
      {currentTab && (
        <>
          {/* IMAGE + POINTS */}
          {currentTab.image && (
            <div
              className="mt-6 sm:mt-8 w-full rounded-xl"
              style={{ backgroundColor: currentTab.bg_color || "#122E5E" }}
            >
              <div className="flex flex-col gap-6 items-center max-w-6xl mx-auto">

                <img
                  src={currentTab.image}
                  alt={currentTab.id}
                  className="w-full object-contain p-4"
                  style={{ maxHeight: "700px" }}
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
                          <div className="px-4 py-6 pb-8 text-white text-center">
                            {point.text}
                          </div>
                        </SwiperSlide>
                      ))}
                    </Swiper>
                  ) : (
                 <div className=" grid grid-cols-2 md:grid-cols-5 mb-10 px-4 md:px-10">
  {currentTab.points.map((point, index) => (
    <div
      key={index}
      className="px-4 py-6 text-white text-sm border-b md:border-b-0 md:border-r last:border-r-0"
    >
      {point.text}
    </div>
  ))}
</div>

                  ))}
              </div>
            </div>
          )}

          {/* LOGOS */}
          {currentTab.logos?.length > 0 && (
            <div className="bg-red-50 mt-6 sm:mt-8 rounded-none sm:rounded-2xl w-full">

              <Swiper
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 4000 }}
                pagination={{ clickable: true }}
                loop
                slidesPerView={1}
              >
                {[0, 20].map((startIndex, idx) => (
                  <SwiperSlide key={idx}>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-0">
                      {currentTab.logos
                        .slice(startIndex, startIndex + 20)
                        .filter((logoObj) => logoObj?.logo)
                        .map((logoObj, index) => (
                          <div
                            key={index}
                            className="p-4 flex items-center justify-center border border-gray-200"
                          >
                            <img
                              src={logoObj.logo}
                              alt="logo"
                              className="max-w-[100px] object-contain hover:scale-105 transition-transform duration-300"
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
