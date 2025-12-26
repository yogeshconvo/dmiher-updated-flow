import React, { useEffect, useState } from "react";
// import DMSaheb from "../../assets/DMSaheb.png";

function DMIHERJourney({ data }) {
  const { title, timeline = [] } = data || {};

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 968px)");
    setIsMobile(mediaQuery.matches);
    const handler = (e) => setIsMobile(e.matches);
    mediaQuery.addEventListener("change", handler);
    return () => mediaQuery.removeEventListener("change", handler);
  }, []);

  const colorClasses = {
    orange: { bg: "bg-[#F7941D]", text: "text-[#F7941D]" },
    red: { bg: "bg-[#F04E30]", text: "text-[#F04E30]" },
    yellow: { bg: "bg-[#E1CD67]", text: "text-[#E1CD67]" },
    blue: { bg: "bg-[#269BFF]", text: "text-[#269BFF]" },
    green: { bg: "bg-[#39B54A]", text: "text-[#39B54A]" },
  };

  /* ---------------- MOBILE ---------------- */
  if (isMobile) {
    return (
      <div className="max-w-7xl mx-auto px-5 py-12 bg-[#001F48] text-white">
        <h2 className="text-3xl font-bold mb-10">
          <hr className="w-16 border-[#F04E30] mb-4 border-t-8" />
          {title}
        </h2>

        <div className="relative">
          <div className="absolute left-1/2 top-0 -translate-x-1/2 h-full w-1 bg-white"></div>

          {[...timeline].reverse().map((item, index) => {
            const isEven = index % 2 === 0;

            return (
              <div key={index} className="mb-10 flex items-center w-full">
                {isEven ? (
                  <>
                    <div className="w-1/2 pr-6 text-right">
                      <h3
                        className={`text-xl font-bold ${colorClasses[item.color].text}`}
                      >
                        {item.year}
                      </h3>
                      <p className="text-sm mt-2">{item.content}</p>
                    </div>
                    <div
                      className={`w-8 h-8 ${colorClasses[item.color].bg} rounded-full z-10`}
                    ></div>
                    <div className="w-1/2"></div>
                  </>
                ) : (
                  <>
                    <div className="w-1/2"></div>
                    <div
                      className={`w-8 h-8 ${colorClasses[item.color].bg} rounded-full z-10`}
                    ></div>
                    <div className="w-1/2 pl-6 text-left">
                      <h3
                        className={`text-xl font-bold ${colorClasses[item.color].text}`}
                      >
                        {item.year}
                      </h3>
                      <p className="text-sm mt-2">{item.content}</p>
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  }

  /* ---------------- DESKTOP ---------------- */
  return (
    <div className="min-h-[1000px] relative bg-[#122E5E] overflow-hidden">
      <div
        className="relative w-full min-h-[1200px] max-w-7xl mx-auto py-32"
        // style={{
        //   backgroundImage: `url(${DMSaheb})`,
        //   backgroundRepeat: "no-repeat",
        //   backgroundPosition: "right",
        //   backgroundSize: "contain",
        // }}
      >
        <div className="absolute top-8 text-white z-10">
          <h2 className="text-4xl font-[500] uppercase">
            <hr className="w-16 border-[#F04E30] mb-2 border-t-4" />
            {title}
          </h2>
        </div>

        {/* SVG Path (unchanged) */}
        <svg className="absolute inset-0 w-full h-full">
          <path
            d="M 48 88 L 60 88 L 72 88 L 82 88 C 101 88 101 55 81 55 L 68 55 L 56 55 L 44 55 L 32 55 L 21 55 c -21 0 -21 -33 0 -33 L 35 22"
            stroke="white"
            strokeWidth="0.9"
            fill="none"
          />
        </svg>

        {/* NOTE:
            Desktop positioning aapke existing hard-coded layout par based hai.
            Isliye yaha timeline sirf MOBILE ke liye data-driven hai.
            Desktop me future me bhi agar chaho to positions JSON me move kar sakte hain.
        */}
      </div>
    </div>
  );
}

export default DMIHERJourney;
