import React from "react";
// import ViewMoreButton from "../../components/UI/ViewMore";

function SDGSection({ data }) {
  const {
    heading,
    sdg_wheel_image,
    sdg_logo,
    sdg_cards = [],
    footer_left,
    rating_boxes = [],
    footer_note,
    view_more_link,
    view_more_label,
  } = data || {};

  const colorMap = {
    green: "text-green-600 border-green-600",
    red: "text-[#F04E30] border-[#F04E30]",
    blue: "text-blue-900 border-blue-900",
  };

  return (
    <div className="bg-[#f0f2f5] relative py-10 md:py-16 font-[Arial]">
      <div className="container">
        {/* Heading */}
        <div className="font-oswald-medium">
          <hr className="w-16 sm:w-20 border-[#F04E30] mb-2 border-t-4" />
          <h2 className="text-4xl font-[500] text-[#707070]">
            {heading}
          </h2>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row items-center">
          {/* SDG Wheel */}
          <div className="flex justify-center">
            <img
              src={sdg_wheel_image}
              alt="SDG Wheel"
              className="w-[250px] sm:w-[280px] md:w-[360px] lg:w-[450px]"
            />
          </div>

          {/* Right content */}
          <div className="max-w-3xl mx-auto flex flex-col">
            {/* Logo */}
            <div className="flex justify-center lg:justify-start mb-2">
              <img src={sdg_logo} alt="SDG Logo" className="h-12 w-auto" />
            </div>

            {/* SDG Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-20 p-5">
              {sdg_cards.map((item, index) => (
                <div key={index}>
                  <h3
                    className={`font-bold text-xl ${colorMap[item.color]?.split(" ")[0]}`}
                  >
                    {item.title}:{" "}
                    <span className="font-normal">{item.subtitle}</span>
                  </h3>
                  <hr
                    className={`w-full border-2 my-2 ${colorMap[item.color]?.split(" ")[1]}`}
                  />
                  <p className="text-[#707070] text-sm">{item.rank}</p>
                </div>
              ))}
            </div>

            {/* Footer info (desktop only) */}
            <div className="hidden md:flex items-center mt-10">
              <div className="flex items-center gap-5 mr-6">
                <div className="font-bold text-[18px] text-gray-700">
                  {footer_left?.score}
                </div>
                <div className="text-[13px] text-gray-600 leading-snug">
                  {footer_left?.text}
                </div>
              </div>

              <div className="flex items-center gap-2">
                {rating_boxes.map((box, i) => (
                  <div
                    key={i}
                    className="relative w-[85px] h-9 bg-white shadow flex items-center justify-center text-[12px] font-semibold text-gray-700 pl-5"
                    style={{
                      clipPath:
                        "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)",
                    }}
                  >
                    <div
                      className="absolute w-[24px] h-[24px] flex items-center justify-center text-white text-[11px] font-bold"
                      style={{
                        clipPath:
                          "polygon(25% 0%, 75% 0%, 100% 50%, 75% 100%, 25% 100%, 0% 50%)",
                        backgroundColor: box.color,
                        left: "-1px",
                      }}
                    >
                      {box.number}
                    </div>
                    {box.value}
                  </div>
                ))}

                <div className="text-[12px] text-gray-700">{footer_note}</div>
              </div>
            </div>

            {/* <div className="mt-6">
              <ViewMoreButton href={view_more_link} label={view_more_label} />
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SDGSection;
