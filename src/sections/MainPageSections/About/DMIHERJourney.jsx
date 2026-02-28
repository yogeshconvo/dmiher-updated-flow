import React, { useEffect, useState } from "react";

const DMHRSTimeline = ({ data }) => {
  const [isMobile, setIsMobile] = useState(false);

  const heading = data?.heading;
  const journeyData = data?.journey || [];

  /* ================= RESPONSIVE ================= */

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 968px)");
    setIsMobile(mediaQuery.matches);

    const handleResize = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handleResize);

    return () =>
      mediaQuery.removeEventListener("change", handleResize);
  }, []);

  if (!journeyData.length) return null;

  /* ================= POSITION MAP (Same As Old Design) ================= */

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
      <div className="min-h-[1000px] overflow-x-hidden relative bg-[#122E5E]">
        <div
          className="relative w-full h-screen min-h-[1200px] max-h-[1500px] max-w-7xl mx-auto py-32"
          style={{
            backgroundImage: `url(${heading?.image})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "right",
          }}
        >
          {/* Title */}
          <div className="absolute top-8 text-white z-10">
            <h2
              className="text-4xl font-[500] uppercase mb-5 tracking-wide"
             
            >
              <hr className="w-16 sm:w-20 border-[#F04E30] mb-2 border-t-4" />
              {heading?.title}
            </h2>
          </div>

          {/* SVG Path (Same Curve) */}
          <svg
            className="absolute top-0 left-0 w-full h-full z-0"
            viewBox="0 0 100 100"
            preserveAspectRatio="none"
          >
            <path
              d="M 48 88 L 60 88 L 72 88 L 82 88 C 101 88 101 55 81 55 L 68 55 L 56 55 L 44 55 L 32 55 L 21 55 c -21 0 -21 -33 0 -33 L 35 22"
              stroke="white"
              strokeWidth="0.9"
              fill="none"
              className="drop-shadow-[0_0_5px_rgba(255,255,255,0.3)]"
            />
          </svg>

          {/* Timeline Items */}
          {journeyData.map((item, index) => {
            const left = leftPositions[index] || "50%";
            const top = topPositions[index] || "50%";

            return (
              <div
                key={index}
                className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2 group"
                style={{ left, top }}
              >
                {/* Dot */}
                <div
                  className="w-6 h-6 rounded-full shadow-md cursor-pointer transition-all duration-300 group-hover:scale-125 group-hover:shadow-lg"
                  style={{ backgroundColor: item.color }}
                ></div>

                {/* Year */}
                <div
                  className="absolute font-bold text-lg whitespace-nowrap drop-shadow-md"
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
                  className="absolute w-[150px] -translate-x-1/2 text-white"
                  style={{
                    top: "3rem",
                    left: "50%",
                  }}
                >
                  <p className="text-xs leading-snug">
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
    <div className="max-w-7xl mx-auto px-5 pl-4 pr-10 py-12 bg-[#001F48] text-white relative">
      <h2
        className="text-3xl font-bold mb-10"
        style={{ color: heading?.color }}
      >
        <hr className="w-16 sm:w-20 border-[#F04E30] mb-4 border-t-8" />
        {heading?.title}
      </h2>

      <div className="relative">
        <div className="absolute left-1/2 top-0 transform -translate-x-1/2 h-full w-1 bg-white"></div>

        {[...journeyData].reverse().map((item, index) => {
          const isEven = index % 2 === 0;

          return (
            <div
              key={index}
              className="mb-10 flex items-center justify-between relative w-full"
            >
              {isEven ? (
                <>
                  <div className="w-1/2 pr-6 text-right">
                    <h3
                      className="text-2xl font-bold"
                      style={{ color: item.color }}
                    >
                      {item.number}
                    </h3>
                    <p className="mt-2 text-white text-sm">
                      {item.desc}
                    </p>
                  </div>
                  <div
                    className="w-8 h-8 rounded-full z-10"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="w-1/2"></div>
                </>
              ) : (
                <>
                  <div className="w-1/2"></div>
                  <div
                    className="w-8 h-8 rounded-full z-10"
                    style={{ backgroundColor: item.color }}
                  ></div>
                  <div className="w-1/2 pl-6 text-left">
                    <h3
                      className="text-2xl font-bold"
                      style={{ color: item.color }}
                    >
                      {item.number}
                    </h3>
                    <p className="mt-2 text-white text-sm">
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