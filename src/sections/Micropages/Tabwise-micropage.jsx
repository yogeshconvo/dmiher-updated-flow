import React, { useState } from "react";
import RichTextRenderer from "../../components/RichTextRenderer";

const TabwiseMainMicropage = ({ data }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTabIndex, setActiveTabIndex] = useState(0);

  /* ================= REAL API DATA ================= */

  // API se array aa raha hai
  const pageData = Array.isArray(data) ? data[0] : data;

  const tabs = pageData?.tabs || [];

  if (!tabs.length) {
    return (
      <div style={{ padding: 20, color: "red" }}>
        ❌ Tabs not found<br />
        API response:
        <pre style={{ fontSize: 12 }}>
          {JSON.stringify(data, null, 2)}
        </pre>
      </div>
    );
  }

  const activeTab = tabs[activeTabIndex];
  const contentFlow = activeTab?.content_flow || [];

  /* ================= UI ================= */

  return (
    <section className="micropage-wrapper">

      {/* PAGE TITLE */}
    

      {/* ================= TABS ================= */}
      <div className="shadow-sm">
        <div className="max-w-7xl mx-auto py-3 px-4">

          {/* Mobile Dropdown */}
          <div className="block md:hidden relative">
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-full border rounded-md p-2 text-left"
            >
              {activeTab.label}
            </button>

            {menuOpen && (
              <div className="absolute w-full bg-white border rounded-md mt-1 z-50">
                {tabs.map((tab, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      setActiveTabIndex(index);
                      setMenuOpen(false);
                    }}
                    className={`block w-full text-left p-2 text-sm ${
                      index === activeTabIndex
                        ? "bg-[#F04E30] text-white"
                        : "hover:bg-gray-100"
                    }`}
                  >
                    {tab.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Desktop Tabs (DESIGN SAME AS LIVE SITE) */}
          <div className="hidden md:flex flex-wrap gap-3 justify-center">
            {tabs.map((tab, index) => (
              <button
                key={index}
                onClick={() => setActiveTabIndex(index)}
                className={`px-4 py-2 text-sm rounded-md border transition ${
                  index === activeTabIndex
                    ? "bg-[#F04E30] text-white border-[#F04E30]"
                    : "bg-gray-100 hover:bg-[#112a62] hover:text-white"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>

        </div>
      </div>

      {/* ================= CONTENT ================= */}
      <div className="micropage-container px-4 py-6">
  {pageData?.pageTitle && (
        <h2 className="text-2xl font-semibold text-center my-4">
          {pageData.pageTitle}
        </h2>
      )}
        {contentFlow.map((item, index) => {
          switch (item.type) {

            case "heading":
              return (
                  <h2 key={index} className="heading">
                      <hr className="heading-line" />
                  {item.value}
                </h2>
              );

            case "paragraph":
              return (
                <RichTextRenderer
                  key={index}
                  className="mb-4"
                  html={item.value}
                />
              );

            case "image":
              return (
                <img
                  key={index}
                  src={item.value}
                  alt=""
                  className="mb-4 rounded"
                />
              );

             case "table":
              return (
                <div key={index} className="micropage-table-wrapper">
                  <table className="micropage-table">
                    <thead>
                      <tr>
                        {item.value.thead.map((h, i) => (
                          <th key={i} className="micropage-th">
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {item.value.tbody.map((row, r) => (
                        <tr key={r} className="micropage-tr">
                          {row.map((cell, c) => (
                            <td key={c} className="micropage-td">
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                  );
            default:
              return null;
          }
        })}
      </div>
    </section>
  );
};

export default TabwiseMainMicropage;
