import React, { useState } from "react";
import ViewMoreButton from "../../components/UI/Buttons";
import RichTextRenderer from "../../components/RichTextRenderer";

const Collabaration = ({ data }) => {
  if (!data) return null;

  const [showModal, setShowModal] = useState(false);

  const { left_content, stats = [], popup_items = [] } = data;

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
        <div className="collab-stats-grid">
          {stats.map((item, index) => (
            <div key={index} className="collab-stat">
              {/* icon optional */}
              {item.icon && item.icon.length > 0 && (
                <img
                  src={item.icon}
                  alt=""
                  className="w-28 h-28 mb-2"
                />
              )}

              <p className="collab-stat-value">{item.value}</p>
              <span className="collab-stat-label">{item.label}</span>
            </div>
          ))}
        </div>
      </div>

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
