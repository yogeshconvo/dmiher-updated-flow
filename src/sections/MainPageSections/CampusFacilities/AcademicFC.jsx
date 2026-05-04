import React, { useEffect, useState } from "react";
import { Library } from "lucide-react";
import RichTextRenderer from "../../../components/RichTextRenderer";
import SafeImage from "../../../components/SafeImage";

const AcademicFC = ({ data }) => {
  const [activeTab, setActiveTab] = useState(null);

  // ✅ Set default active tab
  useEffect(() => {
    if (data?.tabs?.length) {
      setActiveTab(data.tabs[0]?.key);
    }
  }, [data]);

  const activeData = data?.tabs?.find((t) => t.key === activeTab);

  return (
    <section
      className="py-12"
      style={{
        backgroundColor: data?.basic?.bg_color || "#122E5E",
        color: data?.basic?.text_color || "#ffffff",
      }}
    >
      <div className="container">
        <div className="flex flex-col lg:flex-row gap-10">

          {/* ================= LEFT ================= */}
          <div className="lg:basis-[40%]">

            {/* Heading */}
            <div className="mb-6">
              <h2 className="text-3xl md:text-4xl font-oswald-medium font-medium uppercase">
                
                {/* Accent Line */}
                <hr
                  className="w-16 sm:w-20 mb-4 border-t-4"
                  style={{
                    borderColor:
                      data?.basic?.accent_color || "#F04E30",
                  }}
                />

                {data?.basic?.title}
              </h2>

              {/* Description */}
              <p className="text-base mt-2 opacity-90">
                {data?.basic?.description}
              </p>
            </div>

            {/* ================= TABS ================= */}
            <div className="space-y-0">
              {data?.tabs?.map((tab) => (
                <div key={tab.key} className="border-t border-gray-300/30">

                  <button
                    onClick={() =>
                      setActiveTab((prev) =>
                        prev === tab.key ? null : tab.key
                      )
                    }
                    className="w-full text-left py-3 flex justify-between items-center transition"
                    style={{
                      color:
                        activeTab === tab.key
                          ? data?.basic?.text_color
                          : data?.basic?.text_color + "CC",
                    }}
                  >
                    <span
                      className={`${
                        activeTab === tab.key ? "font-bold" : ""
                      }`}
                    >
                      {tab.title}
                    </span>

                    <span className="text-lg">
                      {activeTab === tab.key ? "-" : "+"}
                    </span>
                  </button>

                  {/* Items */}
                  {activeTab === tab.key && (
                    <div className="pl-4 text-sm space-y-2 pb-2 animate-in slide-in-from-top duration-300">

                    {activeTab === tab.key && tab.description && (
  <div className="pl-4 text-sm  animate-in slide-in-from-top duration-300">
    <RichTextRenderer html={tab.description} />
  </div>
)}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* ================= RIGHT ================= */}
          <div className="lg:basis-[60%] md:mt-10 w-full h-[520px] rounded-xl overflow-hidden shadow-md border border-gray-200">

            {activeData ? (
              <SafeImage
                src={activeData.image}
                alt={activeData.title}
                className="w-full h-full object-cover transition-all duration-300"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <div className="text-center">
                  <Library
                    className="w-16 h-16 mx-auto mb-4"
                    style={{
                      color:
                        data?.basic?.accent_color || "#F04E30",
                    }}
                  />
                  <span className="text-lg font-medium">
                    Select a section to view details
                  </span>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
    </section>
  );
};

export default AcademicFC;