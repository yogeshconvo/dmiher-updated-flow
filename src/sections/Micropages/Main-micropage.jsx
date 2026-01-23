// import React from "react";
// import RichTextRenderer from "../../components/RichTextRenderer";

// const MainMicropage = ({ data }) => {
//   const pageData = Array.isArray(data) ? data[0] : data;
//   const title = pageData?.title;
//   const contentFlow = pageData?.content_flow || [];

//   return (
//     <section className="micropage-wrapper">
//       <div className="micropage-container">

//         {title && (
//           <h2 className="micropage-title">
//             <hr className="micropage-title-line" />
//             {title}
//           </h2>
//         )}

//         {contentFlow.map((item, index) => {
//           const key = `${item.type}-${index}`;

//           switch (item.type) {
//             case "heading":
//               return (
//                 <h3 key={key} className="micropage-heading">
//                   {item.value}
//                 </h3>
//               );

//             case "paragraph":
//               return (
//                 <RichTextRenderer
//                   key={key}
//                   className="micropage-paragraph"
//                   html={item.value}
//                 />
//               );

//             case "image":
//               return (
//                 <div key={key} className="micropage-image-wrapper">
//                   <img src={item.value} alt="" className="micropage-image" />
//                 </div>
//               );

//             case "table":
//               return (
//                 <div key={key} className="micropage-table-wrapper">
//                   <table className="micropage-table">
//                     <thead>
//                       <tr>
//                         {item.value.thead.map((header, hIdx) => (
//                           <th key={hIdx} className="micropage-th">
//                             {header}
//                           </th>
//                         ))}
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {item.value.tbody.map((row, rIdx) => (
//                         <tr key={rIdx} className="micropage-tr">
//                           {row.map((cell, cIdx) => (
//                             <td key={cIdx} className="micropage-td">
//                               {cell}
//                             </td>
//                           ))}
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 </div>
//               );

//             /* ================= DEAN SECTION ================= */
//             case "dean_section": {
//               const { dean, message } = item.value;

//               return (
//                 <div key={key} className="knowmore-dean-layout">
//                   <div className="knowmore-dean-profile">
//                     <img
//                       src={dean.image}
//                       alt={dean.name}
//                       className="knowmore-dean-image"
//                     />

//                     <div className="knowmore-dean-info">
//                       <p className="knowmore-dean-name">{dean.name}</p>
//                       <p>
//                         {dean.designation}
//                         <br />
//                         {dean.qualifications}
//                       </p>
//                       <p>{dean.email}</p>
//                     </div>
//                   </div>

//                   <div className="knowmore-dean-message">
//                     {message.map((para, idx) => (
//                       <div key={idx}>
//                         <RichTextRenderer html={para} />
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );
//             }

//             /* ================= MANAGEMENT TEAM ================= */
//             case "management_team_box":
//               return (
//                 <div key={key} className="knowmore-team-wrapper">
//                   <div className="knowmore-team-grid">
//                     {item.value.map((member, idx) => (
//                       <div key={idx} className="knowmore-team-card">
//                         <img
//                           src={member.image}
//                           alt={member.name}
//                           className="knowmore-team-image"
//                         />

//                         <h3 className="knowmore-team-name">{member.name}</h3>
//                         <p className="knowmore-team-designation">
//                           {member.designation}
//                         </p>
//                         <p className="knowmore-team-qualification">
//                           {member.qualification}
//                         </p>
//                         <p className="knowmore-team-email">{member.email}</p>
//                       </div>
//                     ))}
//                   </div>
//                 </div>
//               );

//             default:
//               return null;
//           }
//         })}
//       </div>
//     </section>
//   );
// };

// export default MainMicropage;
import React, { useEffect, useState } from "react";
import RichTextRenderer from "../../components/RichTextRenderer";

const API_URL =
  "http://127.0.0.1:8000/api/pages/jnmc/micro-pages/jnmc-key";

const MainMicropage = () => {
  /* ================= STATE ================= */
  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  /* ================= FETCH DATA ================= */
  useEffect(() => {
    const getData = async () => {
      try {
        const response = await fetch(API_URL);
        if (!response.ok) {
          throw new Error("Micropage not found");
        }
        const result = await response.json();
        setPageData(result); // ✅ STORE DATA
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getData();
  }, []);

  /* ================= LOADING / ERROR ================= */
  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  if (!pageData) return null;

  /* ================= NORMALIZE API DATA ================= */
  const contentFlow =
    pageData?.sections?.[0]?.data?.[0]?.content_flow?.sections?.[0]
      ?.content_flow || [];

  console.log("contentFlow", contentFlow);

  /* ================= RENDER ================= */
  return (
    <section className="micropage-wrapper">
      <div className="micropage-container">
        {contentFlow.map((item, index) => {
          const key = `${item.type}-${index}`;

          switch (item.type) {
            /* ===== HEADING ===== */
            case "heading":
              return (
                <h3 key={key} className="micropage-heading">
                  {item.value}
                </h3>
              );

            /* ===== PARAGRAPH ===== */
            case "paragraph":
              return (
                <RichTextRenderer
                  key={key}
                  className="micropage-paragraph"
                  html={item.value}
                />
              );

            /* ===== IMAGE ===== */
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

            /* ===== TABLE ===== */
            case "table": {
              const rows = Array.isArray(item.value)
                ? item.value
                : [];

              return (
                <div key={key} className="micropage-table-wrapper">
                  <table className="micropage-table">
                    <tbody>
                      {rows.map((row, rIdx) => (
                        <tr key={rIdx}>
                          {Object.keys(row)
                            .filter((k) => k !== "value")
                            .map((cellKey, cIdx) => (
                              <td key={cIdx}>
                                {row[cellKey]?.value || ""}
                              </td>
                            ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              );
            }

            /* ===== DEAN SECTION ===== */
            case "dean_section": {
              const dean = item.value?.dean || {};
              const message =
                item.value?.["0"]?.text || "";

              return (
                <div
                  key={key}
                  className="knowmore-dean-layout"
                >
                  <div className="knowmore-dean-profile">
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
            }

            /* ===== MANAGEMENT TEAM ===== */
            case "management_team_box":
              return (
                <div
                  key={key}
                  className="knowmore-team-wrapper"
                >
                  <div className="knowmore-team-grid">
                    {Array.isArray(item.value) &&
                      item.value.map((member, idx) => (
                        <div
                          key={idx}
                          className="knowmore-team-card"
                        >
                          <h3>{member.name}</h3>
                          <p>{member.designation}</p>
                          <p>{member.qualification}</p>
                          <p>{member.email}</p>
                        </div>
                      ))}
                  </div>
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
