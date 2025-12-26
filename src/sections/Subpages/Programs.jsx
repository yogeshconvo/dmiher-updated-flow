import React, { useState, useEffect } from "react";
import {
  GraduationCap,
  Book,
  Award,
  Users,
  Search,
  X,
} from "lucide-react";
import PopupModal from "../../components/UI/PopupModal";

// import "../../styles/commerce-streams-main.css";
// import "../../styles/commerce-streams-responsive.css";

const iconMap = {
  GraduationCap,
  Book,
  Users,
  Award,
};

const NoPaperFormWidget = ({ formId }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://widgets.in6.nopaperforms.com/emwgts.js";
    script.async = true;
    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <div
      className="npf_wgts"
      data-height="420px"
      data-width="full"
      data-w={formId}
    />
  );
};

const Programs = ({ data }) => {
  const {
    tabs,
    programs,
    apply_label,
    popup_title,
    nopaperform_id,
    search_placeholder,
  } = data;

  const [activeTab, setActiveTab] = useState(tabs[0].id);
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [showModal, setShowModal] = useState(false);

  const filteredPrograms = programs.filter(
    (p) =>
      p.category === activeTab &&
      p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="streams-wrapper">
      <div className="container">
        {/* SEARCH */}
        <div className="streams-search">
          <Search className="streams-search-icon" />
          <input
            className="streams-search-input"
            placeholder={search_placeholder}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <button
              className="streams-clear-btn"
              onClick={() => setSearchQuery("")}
            >
              <X />
            </button>
          )}
        </div>

        {/* TABS */}
        <div className="streams-tabs">
          <div className="streams-tabs-grid">
            <div
              className="streams-tab-indicator"
              style={{
                left: `${activeTabIndex * 25}%`,
                width: "25%",
              }}
            />
            {tabs.map((tab, index) => {
              const Icon = iconMap[tab.icon];
              const active = tab.id === activeTab;

              return (
                <button
                  key={tab.id}
                  className={`streams-tab ${
                    active
                      ? "streams-tab-active"
                      : "streams-tab-inactive"
                  }`}
                  onClick={() => {
                    setActiveTab(tab.id);
                    setActiveTabIndex(index);
                  }}
                >
                  <Icon size={20} />
                  <span>{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* PROGRAMS */}
        <div className="streams-grid">
          {filteredPrograms.map((p) => (
            <div key={p.id} className="stream-card">
              <div className="flex justify-between mb-2">
                <h3 className="stream-card-title">{p.title}</h3>
                <span className="stream-card-badge">
                  {p.duration}
                </span>
              </div>

              <p className="stream-card-desc">{p.description}</p>

              <button
                className="stream-apply-btn"
                onClick={() => setShowModal(true)}
              >
                {apply_label}
              </button>
            </div>
          ))}
        </div>

        {/* POPUP */}
        <PopupModal
          show={showModal}
          onClose={() => setShowModal(false)}
          title={popup_title}
        >
          <NoPaperFormWidget formId={nopaperform_id} />
        </PopupModal>
      </div>
    </section>
  );
};

export default Programs;
