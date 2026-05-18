import React, { useEffect, useState } from "react";
import SafeImage from "../../../components/SafeImage";

const DMHRSTimeline = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  const heading = data?.heading;
  const journeyData = data?.journey || [];
  const bgImage = heading?.image;
  const bgColor = heading?.color;

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 968px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () =>
      mediaQuery.removeEventListener("change", handleResize);
  }, []);

  if (!journeyData.length) return null;

  const leftPositions = [
    "48%", "66%", "85%", "95%", "93%",
    "79%", "64%", "47%", "32%", "15%",
    "7%", "10%", "30%"
  ];

  const topPositions = [
    "88%", "88%", "88%", "78%", "61%",
    "55%", "55%", "55%", "55%", "54%",
    "46%", "26.2%", "22%"
  ];

  /* ================= DESKTOP ================= */

  if (!isMobile) {
    return (
      <div
        className="dmiher-journey-wrapper"
        style={bgColor ? { backgroundColor: bgColor } : undefined}
      >
        <div className="dmiher-journey-container">
          {/* Background image saved in the CMS — sits behind the SVG
              path and timeline dots (z-0). SafeImage normalises every
              path shape the API may return. */}
          {bgImage && (
            <SafeImage
              src={bgImage}
              alt=""
              className="dmiher-journey-bg absolute top-0 left-0 w-full h-full z-0"
              style={{ objectFit: "cover", pointerEvents: "none" }}
            />
          )}

          {/* Title */}
          <div className="">
            <h2
              className="heading"

            >
              <hr className="heading-line" />
              {heading?.title}
            </h2>
          </div>

          {/* SVG Path */}
          <svg
            className="djourney-svg"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 48 88 L 60 88 L 72 88 L 82 88 C 101 88 101 55 81 55 L 68 55 L 56 55 L 44 55 L 32 55 L 21 55 c -21 0 -21 -33 0 -33 L 35 22"
              stroke="white"
              strokeWidth="0.9"
              fill="none"
              className="djourney-svg-path"
            />
          </svg>

          {/* Timeline Items */}
          {journeyData.map((item, index) => {
            const left = leftPositions[index] || "50%";
            const top = topPositions[index] || "50%";

            return (
              <div
                key={index}
                className="djourney-item group"
                style={{ left, top }}
              >
                {/* Dot */}
                <div
                  className="djourney-dot"
                  style={{ backgroundColor: item.color }}
                ></div>

                {/* Year */}
                <div
                  className="djourney-year"
                  style={{
                    top: "24px",
                    left: "50%",
                    transform: "translateX(-50%)",
                    color: item.color,
                  }}
                >
                  {item.number}
                </div>

                {/* Description */}
                <div
                  className="djourney-desc-wrap"
                  style={{
                    top: "3rem",
                    left: "50%",
                  }}
                >
                  <p className="djourney-desc">
                    {item.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ================= MOBILE ================= */

  return (
    <div
      className="max-w-7xl mx-auto px-5 pl-4 pr-10 py-12 bg-[#001F48] text-white relative overflow-hidden"
      style={bgColor ? { backgroundColor: bgColor } : undefined}
    >
      {/* Background image — kept behind the rail and content */}
      {bgImage && (
        <SafeImage
          src={bgImage}
          alt=""
          className="absolute inset-0 w-full h-full"
          style={{ objectFit: "cover", opacity: 0.25, pointerEvents: "none", zIndex: 0 }}
        />
      )}

      <h2
        className="text-3xl font-bold mb-10 relative z-10"
        style={{ color: heading?.color }}
      >
        <hr className="djourney-mobile-heading-line" />
        {heading?.title}
      </h2>

      <div className="relative">
        <div className="djourney-mobile-track"></div>

        {[...journeyData].reverse().map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className="djourney-mobile-row"
            >
              {isEven ? (
                <>
                  <div className="djourney-mobile-text-right">
                    <h3
                      className="djourney-mobile-year"
                      style={{ color: item.color }}
                    >
                      {item.number}
                    </h3>
                    <p className="djourney-mobile-desc">
                      {item.desc}
                    </p>
                  </div>
                  <div
                    className="djourney-mobile-dot"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="djourney-mobile-half"></div>
                </>
              ) : (
                <>
                  <div className="djourney-mobile-half"></div>
                  <div
                    className="djourney-mobile-dot"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="djourney-mobile-text-left">
                    <h3
                      className="djourney-mobile-year"
                      style={{ color: item.color }}
                    >
                      {item.number}
                    </h3>
                    <p className="djourney-mobile-desc">
                      {item.desc}
                    </p>
                  </div>
                </>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default DMHRSTimeline;
