import React from "react";
import RichTextRenderer from "../../components/RichTextRenderer";

/* Read the renderable items from a fetched page JSON.
   Supports both the new (block[]) and legacy (content_flow[]) shapes. */
const getRenderItems = (data) => {
  const micro = data?.sections?.find((s) => s.section_id === "micro_page");
  if (!micro) return [];
  return (
    micro.data?.block ||
    micro.data?.sections?.[0]?.content_flow ||
    []
  );
};

/* ================= TABLE BLOCK ================= */
const TableBlock = ({ block }) => {
  // block.excel is an array of { title, "excel-file": { rows } }
  const tables = Array.isArray(block?.excel) ? block.excel : [];
  if (!tables.length) return null;

  return (
    <>
      {tables.map((t, ti) => {
        const rows = t?.["excel-file"]?.rows || [];
        if (!rows.length) return null;
        const [thead, ...tbody] = rows;
        const name = t?.title || t?.name;

        return (
          <div key={ti} className="micropage-table-wrapper">
            {name && <h2 className="sub-heading">{name}</h2>}

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
      })}
    </>
  );
};

/* ================= MAIN ================= */
const HelperTabwisePage = ({ data }) => {
  if (!data) return null;

  const items = getRenderItems(data);
  if (!items.length) return <div>No content available</div>;

  return (
    <section className="micropage-wrapper">
      <div className="micropage-container">
        {items.map((item, index) => {
          // New shape: dispatch on `tab_type`
          if (item?.tab_type) {
            const key = `${item.tab_type}-${index}`;

            switch (item.tab_type) {
              case "title":
              case "heading":
                return (
                  <h2 key={key} className="heading">
                    <hr className="heading-line" />
                    {item.heading || item.value?.value || item.value || ""}
                  </h2>
                );

              case "paragraph":
                return (
                  <RichTextRenderer
                    key={key}
                    html={item.value || item.paragraph || item.text || ""}
                  />
                );

              case "image":
                return (
                  <img
                    key={key}
                    src={item.value || item.image}
                    alt=""
                    className="mb-4 rounded"
                  />
                );

              case "table":
                return <TableBlock key={key} block={item} />;

              default:
                return null;
            }
          }

          // Legacy shape: dispatch on `type`
          const key = `${item.type}-${index}`;
          switch (item.type) {
            case "heading":
              return (
                <h2 key={key} className="heading">
                  <hr className="heading-line" />
                  {item.value?.value || item.value || ""}
                </h2>
              );

            case "paragraph":
              return <RichTextRenderer key={key} html={item.value} />;

            case "image":
              return (
                <img
                  key={key}
                  src={item.value}
                  alt=""
                  className="mb-4 rounded"
                />
              );

            case "table": {
              const excel = item.value?.[0]?.["excel-file"];
              const rows = excel?.rows || [];
              const name = item.value?.[0]?.name;
              if (!rows.length) return null;
              const [thead, ...tbody] = rows;

              return (
                <div key={key} className="micropage-table-wrapper">
                  {name && <h2 className="sub-heading">{name}</h2>}
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

            default:
              return null;
          }
        })}
      </div>
    </section>
  );
};

export default HelperTabwisePage;
