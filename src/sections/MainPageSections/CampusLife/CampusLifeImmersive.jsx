import React, { useState } from "react";
import { Link } from "react-router-dom";
import SafeImage from "../../../components/SafeImage";
import resolveImage from "../../../utils/resolveImage";
import RichTextRenderer from "../../../components/RichTextRenderer";

/**
 * CampusLifeImmersive — left: title + description + accordion tabs; right: the
 * image of the currently-open tab.
 *
 * Data shape:
 *   basic: { title, description }
 *   tabs:  [{ title, image, desc (HTML), cta_label, cta_link }]
 */
const CampusLifeImmersive = ({ data }) => {
  const basic = data?.basic || {};
  const title = basic.title || data?.title;
  const description = basic.description || data?.description;
  const tabs = Array.isArray(data?.tabs) ? data.tabs : [];

  // First tab open by default; -1 = all collapsed.
  const [activeIdx, setActiveIdx] = useState(0);

  if (!tabs.length) return null;

  // Right-side image follows the open tab; falls back to the first tab's image.
  const openTab = activeIdx >= 0 ? tabs[activeIdx] : tabs[0];
  const activeImage = openTab?.image;

  return (
    <section className="cli-immersive container">
      <div className="cli-immersive-row">
        <div className="cli-immersive-left">
          <div className="cli-immersive-head">
            <h2 className="heading">
              <hr className="heading-line" />
              {title}
            </h2>
            {description && <p className="cli-immersive-desc">{description}</p>}
          </div>

          {tabs.map((tab, idx) => {
            const isOpen = activeIdx === idx;
            return (
              <div key={idx} className="cli-immersive-tab">
                <button
                  onClick={() => setActiveIdx((p) => (p === idx ? -1 : idx))}
                  className={`cli-immersive-btn ${isOpen ? "active" : ""}`}
                >
                  {tab.title}
                  <span>{isOpen ? "−" : "+"}</span>
                </button>

                {isOpen && (
                  <>
                    {tab.desc && (
                      <div className="cli-immersive-items">
                        <RichTextRenderer html={tab.desc} />
                      </div>
                    )}
                    {tab.cta_link && tab.cta_label && (
                      <Link
                        to={`/${String(tab.cta_link).replace(/^\/+/, "")}`}
                        className="cli-immersive-cta"
                      >
                        {tab.cta_label}
                      </Link>
                    )}
                  </>
                )}
              </div>
            );
          })}
        </div>

        <div className="cli-immersive-right">
          {activeImage ? (
            <SafeImage
              src={resolveImage(activeImage)}
              alt={openTab?.title || "Immersive learning"}
              className="cli-immersive-img"
            />
          ) : (
            <div className="cli-immersive-empty">No image available</div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CampusLifeImmersive;
