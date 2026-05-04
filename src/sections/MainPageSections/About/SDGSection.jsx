import React from "react";
import ViewMoreButton from "../../../components/UI/ViewMore";
import SafeImage from "../../../components/SafeImage";

function SDGSection({ data }) {
  if (!data) return null;

  const {
    header = {},
    sdg_cards = [],
    footer_left = {},
    rating_boxes = [],
    footer_note = {},
    view_more = {},
  } = data;

  return (
    <div className="bg-[#F0F2F5]">
      <div className="container">

        {/* ================= HEADING ================= */}
        {header?.heading && (
          <div className="heading">
            <hr className="heading-line" />
            <h2 className="heading-text">
              {header.heading}
            </h2>
          </div>
        )}

        <div className="sdg-container">

          {/* ================= SDG WHEEL ================= */}
          <div className="sdg-wheel">
            <SafeImage
              src={header?.image}
              alt="SDG Wheel"
              className="sdg-wheel-image"
            />
          </div>

          {/* ================= RIGHT CONTENT ================= */}
          <div className="sdg-right-content">

            {/* LOGO */}
            <SafeImage
              src={header?.logo}
              alt="SDG Logo"
              className="sdg-logo"
            />

            {/* ================= SDG CARDS ================= */}
            <div className="sdg-cards">
              {sdg_cards.map((item, index) => (
                <div key={index}>
                  <h3
                    className="sdg-card-title"
                    style={{ color: item.color }}
                  >
                    {item.title}{" "}
                    <span className="sdg-card-subtitle">
                      {item.subtitle}
                    </span>
                  </h3>

                  <hr
                    className="sdg-card-divider"
                    style={{ borderColor: item.color }}
                  />

                  <p className="sdg-card-rank">
                    {item.rank}
                  </p>
                </div>
              ))}
            </div>

            {/* ================= FOOTER (DESKTOP) ================= */}
            <div className="hidden md:flex items-center mt-10">

              {/* LEFT */}
              <div className="flex items-center gap-5 mr-6">
                <div className="font-bold text-[18px] text-gray-700">
                  {footer_left?.score}
                </div>
                <div className="text-[13px] text-gray-600 leading-snug">
                  {footer_left?.text}
                </div>
              </div>

              {/* RIGHT */}
              <div className="flex items-center gap-2">

                {rating_boxes.map((box, i) => (
                  <div
                    key={i}
                    className="relative w-[85px] h-9 bg-white  shadow flex items-center justify-center font-semibold text-[12px] text-gray-700 pl-5"
                    style={{
                      clipPath:
                        "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)",
                    }}
                  >
                    {/* LEFT HEX ICON */}
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

                <div className="text-[12px] text-gray-700 ml-2">
                  {footer_note?.footer_note}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ================= VIEW MORE ================= */}
        {view_more?.page_slug && (
          <div className="mt-6 text-center md:text-right">
            <ViewMoreButton
              href={`/${view_more.page_slug}`}
              label={view_more?.view_more_label || "View More"}
            />
          </div>
        )}

      </div>
    </div>
  );
}

export default SDGSection;