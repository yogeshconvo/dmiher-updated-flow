import { useState } from "react";
import { PlayCircle } from "../../../components/icons";
import RichTextRenderer from "../../../components/RichTextRenderer";
import SafeImage from "../../../components/SafeImage";

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
    <div className="testimonial-section">
      <div className="home-testimonial-container">

        {/* ===== Title ===== */}
        <h2 className="heading">
          <hr className="heading-line" />
          {title}
        </h2>

        {/* ===== Tabs ===== */}
        <div className="home-testimonial-tabs">
          {tabs.map((tab, index) => (
            <button
              key={index}
              onClick={() => {
                setActiveTabIndex(index);
                setActiveVideoIndex(0);
                setIsPlaying(false);
              }}
              className={`home-testimonial-tab ${
                activeTabIndex === index
                  ? "home-testimonial-tab-active"
                  : "home-testimonial-tab-inactive"
              }`}
            >
              {tab.tab_name}
            </button>
          ))}
        </div>

        {/* ===== Video Section ===== */}
        <div className="testimonial-content">

          <div className="home-testimonial-video-wrap">

            {!isPlaying ? (
              <>
                <SafeImage
                  src={current.thumbnail}
                  alt={current.name}
                  className="home-testimonial-thumbnail"
                />

                <div
                  className="home-testimonial-play"
                  onClick={() => setIsPlaying(true)}
                >
                  <PlayCircle
                    size={60}
                    className="home-testimonial-play-icon"
                  />
                </div>
              </>
            ) : (
              embedUrl && (
                <iframe
                  src={embedUrl}
                  title={current.name}
                  className="home-testimonial-iframe"
                  frameBorder="0"
                  allow="autoplay; encrypted-media; fullscreen"
                  allowFullScreen
                />
              )
            )}
          </div>

          {/* ===== Text Section ===== */}
          <div className="home-testimonial-text">
            <RichTextRenderer html={current.paragraph} />
          </div>

          {/* ===== Multiple Testimonials Selector */}
          {testimonials.length > 1 && (
            <div className="home-testimonial-dots">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setActiveVideoIndex(i);
                    setIsPlaying(false);
                  }}
                  className={`home-testimonial-dot ${
                    activeVideoIndex === i
                      ? "home-testimonial-dot-active"
                      : "home-testimonial-dot-inactive"
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
