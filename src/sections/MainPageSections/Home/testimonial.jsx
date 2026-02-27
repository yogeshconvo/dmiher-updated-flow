import { useState } from "react";
import { PlayCircle } from "lucide-react";
import RichTextRenderer from "../../../components/RichTextRenderer";

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

  // ✅ Robust YouTube ID extractor (works in prod)
  const getYoutubeEmbedUrl = (url) => {
    if (!url) return "";

    const regExp =
      /(?:youtube\.com\/(?:watch\?v=|embed\/|v\/)|youtu\.be\/)([^&\n?#]+)/;
    const match = url.match(regExp);

    if (match && match[1]) {
      return `https://www.youtube.com/embed/${match[1]}?autoplay=1&rel=0`;
    }

    return "";
  };

  const embedUrl = getYoutubeEmbedUrl(current.videoId);

  return (
    <div className="testimonial-section py-12 bg-[#f4f4f4]">
      <div className="container mx-auto px-4">

        {/* ===== Title ===== */}
        <h2 className="heading">
          <hr className="heading-line" />
          {title}
        </h2>

        {/* ===== Tabs ===== */}
        <div className="flex justify-center flex-wrap mb-8">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTabIndex(index);
                setActiveVideoIndex(0);
                setIsPlaying(false);
              }}
              className={`px-3 py-1 text-base border-r last:border-r-0 ${
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
              embedUrl && (
                <iframe
                  src={embedUrl}
                  title={current.name}
                  className="w-full h-full"
                  frameBorder="0"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
              )
            )}
          </div>

          {/* ===== Text Section ===== */}
          <div className="w-[320px] md:w-[460px] text-left">
            {/* <p className="text-lg font-semibold text-gray-800">
              {current.name}
            </p>
            <p className="text-sm text-gray-600">
              {current.designation}
            </p>
            {current.extra && (
              <p className="text-sm text-gray-600 font-medium">
                {current.extra}
              </p>
            )} */}
            <RichTextRenderer html={current.paragraph}/>
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