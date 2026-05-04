import React from "react";
import RichTextRenderer from "../../components/RichTextRenderer";
import { API_BASE } from "../../config/api";
import SafeImage from "../../components/SafeImage";

/* Resolve an image path that may be absolute (http…) or storage-relative */
const resolveImage = (src) => {
  if (!src) return "";
  if (/^https?:\/\//i.test(src)) return src;
  // strip leading slashes so we don't double them
  const clean = src.replace(/^\/+/, "");
  return `${API_BASE}/storage/${clean}`;
};

/* Get renderable items from either the new (block) or legacy (content_flow) shape */
const getRenderItems = (data) => {
  if (Array.isArray(data?.block)) return data.block;
  return data?.sections?.[0]?.content_flow || [];
};

/* ================= DEAN BLOCK (new shape) ================= */
const DeanBlock = ({ entries }) => {
  if (!Array.isArray(entries) || !entries.length) return null;
  return (
    <>
      {entries.map((d, i) => (
        <div key={i} className="knowmore-dean-layout">
          {d?.img && (
            <div className="knowmore-dean-profile">
              <SafeImage
                src={resolveImage(d.img)}
                alt={d?.name || "Dean"}
                className="knowmore-dean-image"
              />
              {(d?.name || d?.designation || d?.qualifications || d?.email) && (
                <div className="knowmore-dean-info">
                  {d?.name && <p className="knowmore-dean-name">{d.name}</p>}
                  {(d?.designation || d?.qualifications) && (
                    <p>
                      {d?.designation}
                      {d?.designation && d?.qualifications && <br />}
                      {d?.qualifications}
                    </p>
                  )}
                  {d?.email && <p>{d.email}</p>}
                </div>
              )}
            </div>
          )}
          {d?.desc && (
            <div className="knowmore-dean-message">
              <RichTextRenderer html={d.desc} />
            </div>
          )}
        </div>
      ))}
    </>
  );
};

/* ================= TABLE BLOCK (new shape: block.excel[]) ================= */
const TableBlock = ({ block }) => {
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
                    <th key={i} className="micropage-th">{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tbody.map((row, r) => (
                  <tr key={r} className="micropage-tr">
                    {row.map((cell, c) => (
                      <td key={c} className="micropage-td">{cell ?? ""}</td>
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
const MainMicropage = ({ data }) => {
  if (!data) return null;
  const items = getRenderItems(data);
  if (!items.length) return <div>No content available</div>;

  return (
    <section className="micropage-wrapper">
      <div className="micropage-container">
        {items.map((item, index) => {
          /* ---------- NEW SHAPE: dispatch on tab_type ---------- */
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
                    className="mb-4"
                    html={item.value || item.paragraph || item.text || ""}
                  />
                );

              case "image":
                return (
                  <SafeImage
                    key={key}
                    src={resolveImage(item.value || item.image)}
                    alt=""
                    className="mb-4 rounded"
                  />
                );

              case "table":
                return <TableBlock key={key} block={item} />;

              case "dean":
              case "dean_section":
                return <DeanBlock key={key} entries={item.dean || []} />;

              default:
                return null;
            }
          }

          /* ---------- LEGACY SHAPE: dispatch on type ---------- */
          const key = `${item.type}-${index}`;
          switch (item.type) {
            case "heading":
              return (
                <h2 key={key} className="heading">
                  <hr className="heading-line" />
                  {item.value?.value}
                </h2>
              );

            case "paragraph":
              return (
                <RichTextRenderer
                  key={key}
                  className="mb-4"
                  html={item.value}
                />
              );

            case "image":
              return (
                <SafeImage
                  key={key}
                  src={resolveImage(item.value)}
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
                          <th key={i} className="micropage-th">{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {tbody.map((row, r) => (
                        <tr key={r} className="micropage-tr">
                          {row.map((cell, c) => (
                            <td key={c} className="micropage-td">{cell ?? ""}</td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }

            case "dean_section": {
              const dean = item.value?.dean || {};
              const message = dean.value || "";
              return (
                <div key={key} className="knowmore-dean-layout">
                  <div className="knowmore-dean-profile">
                    <SafeImage
                      src={resolveImage(dean.image)}
                      alt={dean.name}
                      className="knowmore-dean-image"
                    />
                    <div className="knowmore-dean-info">
                      <p className="knowmore-dean-name">{dean.name}</p>
                      <p>
                        {dean.designation}
                        <br />
                        {dean.qualifications}
                      </p>
                      <p>{dean.email}</p>
                    </div>
                  </div>
                  <div className="knowmore-dean-message">
                    <RichTextRenderer html={message} />
                  </div>
                </div>
              );
            }

            case "management_team_box": {
              const team = item.value || [];
              if (!team.length) return null;
              return (
                <div key={key} className="management-team-wrapper">
                  {team.map((member, i) => (
                    <div key={i} className="management-team-card">
                      <SafeImage
                        src={resolveImage(member.image)}
                        alt={member.name}
                        className="management-team-image"
                      />
                      <div className="management-team-info">
                        <p className="management-team-name">{member.name}</p>
                        <p>
                          {member.designation}
                          <br />
                          {member.qualification}
                        </p>
                      </div>
                    </div>
                  ))}
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

export default MainMicropage;
