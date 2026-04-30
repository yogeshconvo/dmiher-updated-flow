import React from "react";

const Tabs = ({ tabs = [], activeKey, onChange }) => {
  if (!tabs.length) return null;

  return (
    <div className="max-w-8xl mx-auto py-10 md:px-20">
      <div className="flex flex-wrap md:gap-6 gap-2 justify-center text-lg font-oswald-medium">
        {tabs.map((tab) => {
          const isActive = activeKey === tab.tabKey;
          return (
            <button
              key={tab.tabKey}
              type="button"
              onClick={() => onChange?.(tab.tabKey)}
              className={`px-6 py-2 border-1 ${
                isActive
                  ? "bg-[#132f5c] text-white border-[#132f5c] font-light"
                  : "text-gray-600 hover:bg-[#132f5c] hover:text-white"
              }`}
            >
              {tab.tabLabel}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Tabs;
