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

// export default MainMicropage;import React, { useEffect, useState } from "react";

const SampleOfficialPage = ({ data }) => {
  console.log("🔥 Component rendered, prop data =", data);

  const [pageData, setPageData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log("⚡ useEffect triggered");

    if (!data) {
      setError("❌ data prop is undefined or null");
      setLoading(false);
      return;
    }

    setPageData(data);
    setLoading(false);
  }, [data]);

  if (loading) return <p className="text-blue-600">⏳ Loading...</p>;

  if (error)
    return (
      <p className="text-red-600 font-semibold">
        {error}
      </p>
    );

  if (!pageData)
    return (
      <p className="text-red-600">
        ❌ pageData is null even after loading
      </p>
    );

  const { title, content } = pageData;
  const { leader, description, officials } = content || {};

  return (
    <section className="p-6 max-w-5xl mx-auto border">
      <h2 className="text-2xl font-bold mb-6">
        {title || "❌ Title missing"}
      </h2>

      {leader ? (
        <div className="border p-4 mb-4">
          <p><b>Name:</b> {leader.name}</p>
          <p><b>Designation:</b> {leader.designation}</p>
          <p><b>Email:</b> {leader.email}</p>
        </div>
      ) : (
        <p className="text-orange-600">⚠️ leader object missing</p>
      )}

      {description?.length ? (
        description.map((d, i) => <p key={i}>{d.text}</p>)
      ) : (
        <p className="text-orange-600">⚠️ description missing</p>
      )}

      {officials?.length ? (
        officials.map((o, i) => (
          <p key={i}>
            {o.name} – {o.designation}
          </p>
        ))
      ) : (
        <p className="text-orange-600">⚠️ officials missing</p>
      )}
    </section>
  );
};

export default SampleOfficialPage;
