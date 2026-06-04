import React, { useState, useMemo } from "react";
import HospitalDetails from "./HospitalDetails";
import OurHospitals from "./OurHospitals";
import DifferenceHospitals from "./DifferenceHospitals";

function TabsSahs({ tabs, activeIndex, setActiveIndex }) {
  if (!tabs?.length) return null;
  return (
    <ul className="th-tabs">
      {tabs.map((tab, idx) => (
        <li
          key={idx}
          onClick={() => setActiveIndex(idx)}
          className={`th-tab ${
            activeIndex === idx ? "th-tab-active" : "th-tab-inactive"
          }`}
        >
          {tab.tab_name || tab.label}
        </li>
      ))}
    </ul>
  );
}

function TeachingHospitals({ data }) {
  const campusTabs = useMemo(
    () => (Array.isArray(data?.campus_tabs) ? data.campus_tabs : []),
    [data],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  if (!campusTabs.length) return null;

  const activeCampus = campusTabs[activeIndex] || campusTabs[0];

  // Section background is data-driven from the backend. Falls back to the
  // light-blue used across the site when not provided.
  const sectionBg = data?.bg_color || data?.background_color || "#eaf4ff";

  return (
    <div className="th-section" style={{ backgroundColor: sectionBg }}>
      <div className="th-section-wrap">
        <div className="max-w-7xl mx-auto px-5">
          <h2 className="th-heading">
            <span className="th-heading-line"></span>
            TEACHING HOSPITALS
          </h2>

          <TabsSahs
            tabs={campusTabs}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
      </div>

      <section className="th-content">
        <HospitalDetails campus={activeCampus} />
        <OurHospitals campus={activeCampus} />
        <DifferenceHospitals campus={activeCampus} />
      </section>
    </div>
  );
}

export default TeachingHospitals;
