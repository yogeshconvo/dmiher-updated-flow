import React from "react";
import DynamicTable from "./DynamicTable";

const ContentRenderer = ({ flow = [] }) => {
  if (!Array.isArray(flow)) return null;

  return (
    <>
      {flow.map((block, index) => {
        const key = `${block.type}-${index}`;

        switch (block.type) {
          case "heading":
            return (
              <h3 key={key} className="micropage-heading">
                {block.value}
              </h3>
            );

          case "paragraph":
            return (
              <div
                key={key}
                dangerouslySetInnerHTML={{ __html: block.value }}
              />
            );

          case "table":
            return (
              <DynamicTable
                key={key}
                table={block.value}
              />
            );

          case "image":
            return (
              <img
                key={key}
                src={block.value}
                alt=""
                className="micropage-image"
              />
            );

          default:
            return null;
        }
      })}
    </>
  );
};

export default ContentRenderer;
