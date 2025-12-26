import { useState } from "react";
// import YouTube from "react-youtube";
import { PlayCircle } from "lucide-react";

function HomeTestimonial({ data }) {
  const { title, tabs = [], testimonials = {} } = data || {};

  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const current = testimonials[activeTab]?.[0];

  const opts = {
    width: "100%",
    height: "100%",
    playerVars: { autoplay: 1 },
  };

  if (!current) return null;

  return (
    <div className="py-12 bg-[#f4f4f4]">
      <div className="container">
        {/* Title */}
        <h2 className="text-4xl font-medium text-gray-500 font-oswald-medium mb-4">
          <hr className="border-red-500 border-2 w-12 mb-2" />
          {title}
        </h2>

        {/* Tabs */}
        <div className="flex justify-center pb-8 gap-4 flex-wrap">
          {tabs.map((tab, index) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                setIsPlaying(false);
              }}
              className={`px-3 py-1 text-base ${
                activeTab === tab
                  ? "underline text-black"
                  : "text-gray-500 hover:text-gray-700"
              } ${index < tabs.length - 1 ? "border-r border-gray-300 pr-4" : ""}`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Video */}
        <div className="flex flex-col items-center px-10">
          <div className="relative w-[320px] h-[220px] md:w-[470px] md:h-[280px] bg-gray-300 rounded-xl overflow-hidden shadow-lg mb-4">
            {!isPlaying ? (
              <>
                <img
                  src={current.thumbnail}
                  alt={current.name}
                  className="w-full h-full object-cover"
                />
                <div
                  className="absolute inset-0 flex items-center justify-center cursor-pointer"
                  onClick={() => setIsPlaying(true)}
                >
                  <PlayCircle
                    size={60}
                    className="text-white hover:scale-110 transition-transform"
                  />
                </div>
              </>
            ) : (
              <YouTube
                videoId={current.videoId}
                opts={opts}
                className="w-full h-full"
              />
            )}
          </div>

          {/* Text */}
          <div className="w-[320px] md:w-[460px] text-left">
            <p className="text-lg font-semibold text-gray-800">
              {current.name}
            </p>
            <p className="text-sm text-gray-600">
              {current.designation}
            </p>
            {current.institute && (
              <p className="text-sm text-gray-600">{current.institute}</p>
            )}
            {current.extra && (
              <p className="text-sm text-gray-600 font-medium">
                {current.extra}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeTestimonial;
