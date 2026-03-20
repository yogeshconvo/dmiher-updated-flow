import React from "react";
import RichTextRenderer from "../../components/RichTextRenderer";

const MainMicropage = ({ data }) => {
  if (!data) return null;

  const contentFlow =data?.sections?.[0]?.content_flow || [];

  if (!contentFlow.length) {
    return <div>No content available</div>;
  }

  /* ================= RENDER ================= */

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
                  {item.value?.value}
                </h2>
              );

            /* ================= PARAGRAPH ================= */
            case "paragraph":
              return (
                <RichTextRenderer
                  key={key}
                  className="mb-4"
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
              const name = item.value?.[0].name;

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
}          /* ================= DEAN SECTION ================= */
            case "dean_section": {
              const dean = item.value?.dean || {};
              const message = dean.value || "";

              return (
                <div key={key} className="knowmore-dean-layout">

                  <div className="knowmore-dean-profile">
                    <img
                      src={dean.image}
                      alt={dean.name}
                      className="knowmore-dean-image"
                    />

                    <div className="knowmore-dean-info">
                      <p className="knowmore-dean-name">
                        {dean.name}
                      </p>
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
            }case "management_team_box": {
  const team = item.value || [];

  if (!team.length) return null;

  return (
    
    <div key={key} className="management-team-wrapper">
      {team.map((member, i) => (
        <div key={i} className="management-team-card">

          <img
            src={(member.image)}
            alt={member.name}
            className="management-team-image"
          />

          <div className="management-team-info">
            <p className="management-team-name">
              {member.name}
            </p>

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

            /* ================= DEFAULT (SAFE FALLBACK) ================= */
            default:
              return null;
          }
        })}

      </div>
    </section>
  );
};

export default MainMicropage;