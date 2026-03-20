import React from "react";
import RichTextRenderer from "../../components/RichTextRenderer";

const HelperTabwisePage = ({ data }) => {
  if (!data) return null;

  const contentFlow =
    data?.sections?.find((s) => s.section_id === "micro_page")
      ?.data?.sections?.[0]?.content_flow || [];

  if (!contentFlow.length) {
    return <div>No content available</div>;
  }

  return (
    <section className="micropage-wrapper">
      <div className="micropage-container">
        {contentFlow.map((item, index) => {
          const key = `${item.type}-${index}`;

          switch (item.type) {

            /* ================= HEADING ================= */
            case "heading":
              return (
                <h2 key={key} className="heading">
                  <hr className="heading-line" />
                  {item.value.value}
                </h2>
              );

            /* ================= PARAGRAPH ================= */
            case "paragraph":
              return (
                <RichTextRenderer
                  key={key}
                  html={item.value}
                />
              );

            /* ================= IMAGE ================= */
            case "image":
              return (
                <img
                  key={key}
                  src={item.value}
                  alt=""
                  className="mb-4 rounded"
                />
              );

            /* ================= TABLE ================= */
            case "table": {
              const excel = item.value?.[0]?.["excel-file"];
              const rows = excel?.rows || [];
              const name = item.value?.[0]?.name;

              if (!rows.length) return null;

              const thead = rows[0];
              const tbody = rows.slice(1);

              return (
                <div key={key} className="micropage-table-wrapper">
      <h2 className="sub-heading">
   
        {name}
      </h2>
      <table className="micropage-table">

        <thead>
          <tr>
            {thead.map((h, i) => (
              <th key={i} className="micropage-th">
                {h}
              </th>
            ))}
          </tr>
        </thead>

        <tbody>
          {tbody.map((row, r) => (
            <tr key={r} className="micropage-tr">
              {row.map((cell, c) => (
                <td key={c} className="micropage-td">
                  {cell ?? ""}
                </td>
              ))}
            </tr>
          ))}
        </tbody>

      </table>
    </div>
              );
            }

            /* ================= DEFAULT ================= */
            default:
              return null;
          }
        })}

      </div>
    </section>
  );
};

export default HelperTabwisePage;