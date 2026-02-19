import { useState } from "react";
import { PlayCircle } from "lucide-react";
// import { getImageSrc } from "../../../components/Services/FetchImages";

function HomeTestimonial({ data }) {
  const title = data?.header?.title;
  const tabs = data?.tabs || [];

  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [activeVideoIndex, setActiveVideoIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  if (!tabs.length) return null;

  const activeTab = tabs[activeTabIndex];
  const testimonials = activeTab?.testimonials || [];
  const current = testimonials[activeVideoIndex];

  if (!current) return null;

  // ✅ Extract YouTube Video ID from URL
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";

    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|embed\/)|youtu\.be\/)([^&?/]+)/;
    const match = url.match(regExp);

    const videoId = match ? match[1] : "";

    return `https://www.youtube.com/embed/${videoId}?autoplay=1`;
  };

  return (
    <div className="testimonial-section py-12 bg-[#f4f4f4]">
      <div className="container mx-auto px-4">

        {/* ===== Title ===== */}
        <h2 className="heading">
          <hr className="heading-line" />
          {title}
        </h2>

        {/* ===== Tabs ===== */}
        <div className="flex justify-center gap-4 flex-wrap mb-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTabIndex(index);
                setActiveVideoIndex(0);
                setIsPlaying(false);
              }}
              className={`px-3 py-1 text-base ${
                activeTabIndex === index
                  ? "underline text-black"
                  : "text-gray-500 hover:text-gray-700"
              }`}
            >
              {tab.tab_name}
            </button>
          ))}
        </div>

        {/* ===== Video Section ===== */}
        <div className="flex flex-col items-center">

          <div className="relative w-[320px] h-[220px] md:w-[470px] md:h-[280px] bg-gray-300 rounded-xl overflow-hidden shadow-lg mb-4">

            {!isPlaying ? (
              <>
                <img
                  src={current.thumbnail}
                  alt={current.name}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.src = "/fallback.jpg";
                  }}
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
              <iframe
                width="100%"
                height="100%"
                src={getYoutubeEmbedUrl(current.videoId)}
                title="YouTube video player"
                frameBorder="0"
                allow="autoplay; encrypted-media"
                allowFullScreen
                className="w-full h-full"
              />
            )}
          </div>

          {/* ===== Text Section ===== */}
          <div className="w-[320px] md:w-[460px] text-left">
            <p className="text-lg font-semibold text-gray-800">
              {current.name}
            </p>
            <p className="text-sm text-gray-600">
              {current.designation}
            </p>
            {current.extra && (
              <p className="text-sm text-gray-600 font-medium">
                {current.extra}
              </p>
            )}
          </div>

          {/* ===== Multiple Testimonials Selector */}
          {testimonials.length > 1 && (
            <div className="flex gap-3 mt-4">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveVideoIndex(i);
                    setIsPlaying(false);
                  }}
                  className={`w-3 h-3 rounded-full ${
                    activeVideoIndex === i
                      ? "bg-black"
                      : "bg-gray-400"
                  }`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default HomeTestimonial;
