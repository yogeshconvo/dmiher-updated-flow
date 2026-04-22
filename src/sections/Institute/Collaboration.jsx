import React, { useState } from "react";
import { Link } from "react-router-dom";
import ViewMoreButton from "../../components/UI/Buttons";
import RichTextRenderer from "../../components/RichTextRenderer";

const Collabaration = ({ data }) => {
  if (!data) return null;

  const [showModal, setShowModal] = useState(false);

  const { stats = [], popup_items = [] } = data;
  // Support both legacy `left_content` and new `paragraphs` key
  const left_content = data.left_content || data.paragraphs || {};

  // Content is a SEPARATE section (array of CTA-like blocks).
  // Hide only when explicitly disabled via `_section_disabled: true`.
  const rawContent = data?.Content;
  const contentDisabled =
    rawContent && !Array.isArray(rawContent) && rawContent._section_disabled === true;
  const contentItems = Array.isArray(rawContent) ? rawContent : [];

  return (
    <div className="collab-section">
      <div className="container collab-layout">
        {/* ================= LEFT CONTENT ================= */}
        <div>
          <hr className="heading-line" />
          <h2 className="heading">{left_content?.heading}</h2>

          {/* HTML DESCRIPTION */}
          {left_content?.desc && (
            <div
              className="collab-text"
              // dangerouslySetInnerHTML={{
              //   __html: left_content.desc,
              // }}
            >
              <RichTextRenderer html={left_content?.desc} />
            </div>
          )}

          {left_content?.cta_text && (
            <ViewMoreButton
              label={left_content.cta_text}
              onClick={() => setShowModal(true)}
            />
          )}
        </div>

        {/* ================= STATS ================= */}
        {stats.length > 0 && (
          <div className="collab-stats-grid">
            {stats.map((item, index) => {
              const iconSrc = item.img || item.icon;
              const iconHidden = item?._disabled?.img === true;

              return (
                <div key={index} className="collab-stat">
                  {/* icon optional */}
                  {!iconHidden && iconSrc && (
                    <img
                      src={iconSrc}
                      alt=""
                      className="w-28 h-28 mb-2"
                    />
                  )}

                  {item.description ? (
                    <div
                      className="collab-stat-desc w-full"
                      style={{ textAlign: "center" }}
                    >
                      <RichTextRenderer
                        html={item.description}
                        className="[&_*]:!text-center"
                      />
                    </div>
                  ) : (
                    <>
                      <p className="collab-stat-value">{item.value}</p>
                      <span className="collab-stat-label">{item.label}</span>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ================= CONTENT (separate CTA blocks) ================= */}
      {!contentDisabled && contentItems.length > 0 && (
        <div className="container collab-content">
          {contentItems.map((item, idx) => {
            const label = item.label || item.cta_text || item.title;

            if (item.tab_type === "button" && (item.link || item.page_slug)) {
              const isExternal = item.link?.startsWith("http");
              const href = item.link || `/${item.page_slug}`;

              return isExternal ? (
                <a
                  key={idx}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="collab-content-btn"
                >
                  {label || "Learn More"}
                </a>
              ) : (
                <Link
                  key={idx}
                  to={href}
                  className="collab-content-btn"
                >
                  {label || "Learn More"}
                </Link>
              );
            }

            if (item.description) {
              return (
                <div key={idx} className="collab-content-item">
                  <RichTextRenderer html={item.description} />
                </div>
              );
            }

            return null;
          })}
        </div>
      )}

      {/* ================= MODAL ================= */}
      {showModal && (
        <div
          className="collab-modal-backdrop"
          onClick={() => setShowModal(false)}
        >
          <div
            className="collab-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="collab-modal-header">
              <button
                className="collab-close"
                onClick={() => setShowModal(false)}
              >
                &times;
              </button>
            </div>

            <div className="p-10">
              <h2 className="collab-heading">
                {left_content?.heading}
              </h2>

              {popup_items.length > 0 ? (
                popup_items.map((item, idx) => (
                  <div key={idx} className="py-2">
                    {item.title}
                  </div>
                ))
              ) : (
                <p>No data available</p>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collabaration;
