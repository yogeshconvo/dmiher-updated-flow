import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
// import ViewMoreButton from "../../components/UI/ViewMore";

import "swiper/css";
import "swiper/css/pagination";
// import "../styles/InstituteSections/collaboration.css";

const Collabaration = ({ data }) => {
  const {
    heading,
    intro_paragraphs = [],
    highlight_points = [],
    stats = [],
    institutional_metrics,
    research_collaboration = [],
    educational_research = [],
  } = data || {};

  const [showModal, setShowModal] = useState(false);
  const [openIdx, setOpenIdx] = useState(-1);

  return (
    <div className="collab-section">
      <div className="container collab-layout ">
        {/* LEFT */}
        <div>
   <hr className="heading-line" />
          <h2 className="heading">{heading}
          </h2>

          {intro_paragraphs.map((p, i) => (
            <p key={i} className="collab-text">{p}</p>
          ))}

          <p className="collab-highlight">
            {highlight_points.map((n, i) => (
              <span key={i}>{n}<br /></span>
            ))}
          </p>

          {/* <ViewMoreButton onClick={() => setShowModal(true)} /> */}
        </div>

        {/* DESKTOP STATS */}
        <div className="collab-stats-grid">
          {stats.map((s, i) => (
            <div key={i} className="collab-stat">
              <img src={s.icon} alt="" className="w-28 h-28 mb-2" />
              <p className="collab-stat-value">{s.value}</p>
              <span className="collab-stat-label">{s.label}</span>
            </div>
          ))}
        </div>
      </div>

      {/* MODAL */}
      {showModal && (
        <div className="collab-modal-backdrop" onClick={() => setShowModal(false)}>
          <div className="collab-modal" onClick={(e) => e.stopPropagation()}>
            <div className="collab-modal-header">
              <button className="collab-close" onClick={() => setShowModal(false)}>
                &times;
              </button>
            </div>

            <div className="p-10">
              <h2 className="collab-heading">{heading}</h2>

              {research_collaboration.map((item, idx) => (
                <div key={idx}>
                  <button
                    className="w-full text-left py-3 flex justify-between"
                    onClick={() => setOpenIdx(openIdx === idx ? -1 : idx)}
                  >
                    <span>{item.question}</span>
                    <span>{openIdx === idx ? "-" : "+"}</span>
                  </button>
                  {openIdx === idx && <div>{item.answer}</div>}
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Collabaration;
