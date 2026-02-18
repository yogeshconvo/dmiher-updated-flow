import React, { useState } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import "./CampusLife.css";
import dataFile from "./campusLife.json";

export default function CampusLife() {
  const { title, tabs, view_all_link, important_details } =
    dataFile.data;

  const [activeTab, setActiveTab] = useState(tabs[0].key);
  const [popupIndex, setPopupIndex] = useState(null);

  const currentTab = tabs.find((t) => t.key === activeTab);
  const images = currentTab.images;

  const prevImage = () => {
    setPopupIndex((prev) =>
      (prev - 1 + images.length) % images.length
    );
  };

  const nextImage = () => {
    setPopupIndex((prev) =>
      (prev + 1) % images.length
    );
  };

  return (
    <section id="campus_life" className="campus-section">
      <div className="campus-container">

        {/* Header */}
        <div className="campus-header">
          <div>
            <hr className="campus-line" />
            <h2 className="campus-title">{title}</h2>
          </div>

          <div className="campus-controls">
            <button onClick={() => setActiveTab(tabs[0].key)}>
              <ArrowLeft size={18} />
            </button>
            <button onClick={() => setActiveTab(tabs[1].key)}>
              <ArrowRight size={18} />
            </button>
            <a
              href={view_all_link}
              target="_blank"
              rel="noopener noreferrer"
              className="campus-viewall"
            >
              VIEW ALL
            </a>
          </div>
        </div>

        {/* Tabs */}
        <div className="campus-tabs">
          {tabs.map((tab, index) => (
            <React.Fragment key={tab.key}>
              <button
                className={`campus-tab ${
                  activeTab === tab.key ? "active-tab" : ""
                }`}
                onClick={() => setActiveTab(tab.key)}
              >
                {tab.label}
              </button>
              {index !== tabs.length - 1 && <span>|</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Grid */}
        <div className="campus-grid">
          {images.map((img, index) => (
            <img
              key={index}
              src={img}
              alt="Gallery"
              className="campus-img"
              onClick={() => setPopupIndex(index)}
            />
          ))}
        </div>

        {/* Popup */}
        {popupIndex !== null && (
          <div
            className="campus-popup"
            onClick={() => setPopupIndex(null)}
          >
            <div
              className="campus-popup-inner"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={prevImage}>
                <ArrowLeft size={40} />
              </button>

              <img
                src={images[popupIndex]}
                alt="Popup"
                className="campus-popup-img"
              />

              <button onClick={nextImage}>
                <ArrowRight size={40} />
              </button>

              <button
                className="campus-close"
                onClick={() => setPopupIndex(null)}
              >
                <X size={30} />
              </button>
            </div>
          </div>
        )}

        {/* Important Details */}
        <div className="campus-important">
          <h2 className="campus-important-title">
            <hr className="campus-line" />
            {important_details.title}
          </h2>

          <div className="campus-important-grid">
            <div>
              <h3>{important_details.address.heading}</h3>
              <p>{important_details.address.content}</p>
            </div>

            <div>
              <h3>{important_details.off_campus.heading}</h3>
              <p>{important_details.off_campus.content}</p>
            </div>

            <div>
              <h3>{important_details.contact.heading}</h3>
              <p>
                Email:{" "}
                <a href={`mailto:${important_details.contact.email}`}>
                  {important_details.contact.email}
                </a>
                <br />
                Mob:{" "}
                <a href={`tel:${important_details.contact.phone}`}>
                  {important_details.contact.phone}
                </a>
              </p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
