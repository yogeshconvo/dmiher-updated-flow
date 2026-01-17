import React from "react";
import RichTextRenderer from "../../components/RichTextRenderer";

const MainMicropage = ({ data }) => {

  const pageData = Array.isArray(data) ? data[0] : data;
  const title = pageData?.title;
  const contentFlow = pageData?.content_flow || [];

  return (
    <section className="micropage-wrapper">
      <div className="micropage-container">

        {title && (
          <h2 className="micropage-title">
            <hr className="micropage-title-line" />
            {title}
          </h2>
        )}


        {contentFlow.map((item, index) => {
          const key = `${item.type}-${index}`;

          switch (item.type) {
            case "heading":
              return (
                <h3 key={key} className="micropage-heading">
                  {item.value}
                </h3>
              );

            case "paragraph":
              return (
                <RichTextRenderer
                  key={key}
                  className="micropage-paragraph"
                  html={item.value}
                />
              );

            case "image":
              return (
                <div key={key} className="micropage-image-wrapper">
                  <img
                    src={item.value}
                    alt=""
                    className="micropage-image"
                  />
                </div>
              );

            case "table":
              return (
                <div key={key} className="micropage-table-wrapper">
                  <table className="micropage-table">
                    <thead>
                      <tr>
                        {item.value.thead.map((header, hIdx) => (
                          <th key={hIdx} className="micropage-th">
                            {header}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {item.value.tbody.map((row, rIdx) => (
                        <tr key={rIdx} className="micropage-tr">
                          {row.map((cell, cIdx) => (
                            <td key={cIdx} className="micropage-td">
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

export default MainMicropage;
