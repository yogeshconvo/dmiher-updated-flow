import React from "react";

const Tabs = ({ tabs = [], activeKey, onChange }) => {
  if (!tabs.length) return null;

  return (
    <div className="naac-tabs-wrap">
      <div className="naac-tabs-row">
        {tabs.map((tab) => {
          const isActive = activeKey === tab.tabKey;
          return (
            <button
              key={tab.tabKey}
              type="button"
              onClick={() => onChange?.(tab.tabKey)}
              className={`naac-tab ${
                isActive ? "naac-tab-active" : "naac-tab-inactive"
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
