import React, { useState } from "react";
import AboutHospitalTabBody from "./TabBody";
import { flattenNumericKeys } from "./utils";

/**
 * Renders for section_id `about_hospital_subpage`.
 * Single section: main heading + tabs[]. Each tab carries
 * `tab_name` + `tab_type` + content. Active tab is internal state.
 */
const AboutHospital = ({ data }) => {
  const header = flattenNumericKeys(data?.header);
  const mainHeading = header?.main_heading;
  const tabs = Array.isArray(data?.tabs) ? data.tabs : [];
  const [activeIdx, setActiveIdx] = useState(0);

  if (tabs.length === 0) return null;

  const activeTab = tabs[activeIdx] || tabs[0];

  return (
    <div className="px-6 min-h-screen bg-white max-w-7xl mx-auto my-5">
      {mainHeading && (
        <h1 className="text-3xl sm:text-4xl font-bold text-center mb-6 text-[#13305c]">
          {mainHeading}
        </h1>
      )}

      <div className="flex flex-wrap justify-center gap-3 mb-6">
        {tabs.map((tab, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setActiveIdx(idx)}
            className={`px-4 py-2 rounded-lg transition font-medium ${
              activeIdx === idx
                ? "bg-[#F04E30] text-white"
                : "bg-gray-100 text-[#333] hover:bg-[#13305c] hover:text-white"
            }`}
            role="tab"
            aria-selected={activeIdx === idx}
          >
            {tab.tab_name}
          </button>
        ))}
      </div>

      <AboutHospitalTabBody tab={activeTab} />
    </div>
  );
};

export default AboutHospital;
