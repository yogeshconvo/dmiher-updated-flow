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
    <div className="sdg-bg">
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
            <div className="sdg-footer-desktop">

              {/* LEFT */}
              <div className="sdg-footer-left">
                <div className="sdg-footer-score">
                  {footer_left?.score}
                </div>
                <div className="sdg-footer-text">
                  {footer_left?.text}
                </div>
              </div>

              {/* RIGHT */}
              <div className="sdg-footer-right">

                {rating_boxes.map((box, i) => (
                  <div
                    key={i}
                    className="sdg-rating-box"
                    style={{
                      clipPath:
                        "polygon(10% 0%, 90% 0%, 100% 50%, 90% 100%, 10% 100%, 0% 50%)",
                    }}
                  >
                    {/* LEFT HEX ICON */}
                    <div
                      className="sdg-rating-icon"
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

                <div className="sdg-footer-note">
                  {footer_note?.footer_note}
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* ================= VIEW MORE ================= */}
        {view_more?.page_slug && (
          <div className="sdg-view-more">
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