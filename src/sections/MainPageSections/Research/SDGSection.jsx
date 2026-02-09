import React from "react";

function SDGSection({ data }) {
  const {
    header,
    sdg_cards = [],
    footer_left,
    rating_boxes = [],
    footer_note,
    view_more,
  } = data || {};

  return (
    <div className="bg-[#f0f2f5] relative py-10 md:py-16 font-[Arial]">
      <div className="container">

        {/* Heading */}
        <div className="font-oswald-medium mb-6">
          <h2 className="heading">
          <hr className="heading-line" /> 
            {header?.heading}
          </h2>
        </div>

        <div className="flex flex-col gap-10 lg:flex-row items-center">

          {/* SDG Wheel */}
          <div className="flex justify-center">
            {header?.sdg_wheel_image && (
              <img
                src={header.sdg_wheel_image}
                alt="SDG Wheel"
                className="w-[250px] sm:w-[280px] md:w-[360px] lg:w-[450px]"
              />
            )}
          </div>

          {/* Right content */}
          <div className="max-w-3xl mx-auto flex flex-col">

            {/* SDG Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-20 p-5">
              {sdg_cards.map((item, index) => (
                <div key={index}>
                  <h3
                    className="font-bold text-xl"
                    style={{ color: item.color }}
                  >
                    {item.title}:{" "}
                    <span className="font-normal">{item.subtitle}</span>
                  </h3>

                  <hr
                    className="w-full border-2 my-2"
                    style={{ borderColor: item.color }}
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
                        backgroundColor: box.color || "#999",
                        left: "-1px",
                      }}
                    >
                      {box.number}
                    </div>
                    {box.value}
                  </div>
                ))}

                <div className="text-[12px] text-gray-700">
                  {footer_note?.footer_note}
                </div>
              </div>
            </div>

            {/* View more (optional) */}
            {/* <ViewMoreButton
              href={view_more?.view_more_link}
              label={view_more?.view_more_label}
            /> */}

          </div>
        </div>
      </div>
    </div>
  );
}

export default SDGSection;
