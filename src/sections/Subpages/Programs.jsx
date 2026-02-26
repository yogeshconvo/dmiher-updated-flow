import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { GraduationCap, Search, X } from "lucide-react";

const SubPrograms = ({ apiBaseUrl }) => {
  const { slug } = useParams();

  const [data, setData] = useState(null);
  const [activeTab, setActiveTab] = useState("");
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  /* ---------------- Fetch Data ---------------- */
  useEffect(() => {
    if (!slug) return;

    fetch(`${apiBaseUrl}/${slug}`)
      .then((res) => res.json())
      .then((res) => {
        const programsSection = res?.sections?.find(
          (sec) => sec.section_id === "programs_subpage"
        );

        const sectionData = programsSection?.data;
        if (!sectionData) return;

        setData(sectionData);

        if (sectionData.tabs?.length) {
          setActiveTab(sectionData.tabs[0].tab_id);
          setActiveTabIndex(0);
        }
      })
      .catch((err) => console.error("API Error:", err));
  }, [slug, apiBaseUrl]);

  if (!data || !data.tabs) return <div>Loading...</div>;

  const { tabs = [], programs = [], settings = {} } = data;

  /* ---------------- Handlers ---------------- */
  const handleTabChange = (tabId, index) => {
    setActiveTab(tabId);
    setActiveTabIndex(index);
  };

  const filteredPrograms = programs.filter(
    (p) =>
      p.tab_id === activeTab &&
      p.title?.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <section className="streams-wrapper">
      <div className="container py-8">

        {/* Search Bar (Same UI) */}
        <div className="mb-6 max-w-2xl mx-auto">
          <div className="relative">
            <Search
              size={20}
              className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder={settings.search_placeholder || "Search programs..."}
              className="w-full pl-10 pr-10 py-3 rounded-xl border border-gray-200 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm bg-white"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
              >
                <X size={20} />
              </button>
            )}
          </div>
        </div>

        {/* ---------------- Tabs (UNCHANGED DESIGN) ---------------- */}

        <div className="mb-6  mx-auto">
          <div className="relative bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-1 sm:p-2">

            {/* Desktop View */}
            <div className="hidden sm:block">
         <div
  className="grid gap-2 relative"
  style={{
    gridTemplateColumns: `repeat(${tabs.length}, minmax(0, 1fr))`,
  }}
>

                <div
                  className="absolute top-0 bottom-0 bg-[#122E5E] rounded-lg sm:rounded-xl transition-all duration-300 ease-in-out shadow-md z-0"
                  style={{
                    left: `calc(${activeTabIndex * (100 / tabs.length)}%)`,
                    width: `${100 / tabs.length}%`,
                  }}
                />

                {tabs.map((tab, index) => {
                  const isActive = activeTab === tab.tab_id;

                  return (
                    <button
                      key={tab.tab_id}
                      onClick={() => handleTabChange(tab.tab_id, index)}
                      className={`relative z-10 flex flex-col items-center justify-center gap-1 sm:gap-2 px-2 sm:px-3 py-2 sm:py-3 lg:py-4 rounded-lg sm:rounded-xl font-medium min-h-[50px] sm:min-h-[60px] lg:min-h-[70px] transition-all duration-300 w-full ${
                        isActive
                          ? "text-white"
                          : "text-gray-600 hover:text-white hover:bg-[#F04E30]"
                      }`}
                    >
                      <span
                        className={`text-sm text-center font-medium ${
                          isActive ? "text-white" : ""
                        }`}
                      >
                        {tab.tab_label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

          </div>
        </div>

        {/* ---------------- Programs Grid (Same) ---------------- */}

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {filteredPrograms.map((program, index) => (
            <div
              key={index}
              className="group bg-white rounded-xl sm:rounded-2xl shadow-sm border border-gray-100 p-4 sm:p-5 lg:p-6 hover:shadow-xl hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex flex-col h-full">

                <div className="mb-3">
                  <div className="flex justify-between mb-2">
                    <h3 className="text-lg font-semibold text-gray-800">
                      {program.title}
                    </h3>
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1 rounded-full">
                      {program.duration || "N/A"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500">
                    {program.description || "Program details not available."}
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 mb-3">
                  <p className="text-sm font-medium text-blue-800">
                    {program.college_name}
                  </p>
                </div>

                <div className="bg-gray-50 rounded-lg p-3 mb-4">
                  <p className="text-xs font-medium text-gray-700 mb-1">
                    Eligibility
                  </p>
                  <p className="text-sm text-gray-600">
                    {program.eligibility ||
                      "Contact the college for eligibility details."}
                  </p>
                </div>

                <button className="w-full bg-[#F04E30] text-white py-2.5 rounded-lg hover:bg-[#122E5E] transition-all duration-300">
                  {settings.apply_label || "Apply Now"}
                </button>

              </div>
            </div>
          ))}
        </div>

        {filteredPrograms.length === 0 && (
          <div className="text-center py-12">
            <GraduationCap size={60} className="mx-auto text-gray-300 mb-4" />
            <h3 className="text-xl font-semibold text-gray-600">
              No Programs Available
            </h3>
          </div>
        )}

      </div>
    </section>
  );
};

export default SubPrograms;