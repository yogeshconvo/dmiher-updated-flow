
// import React from "react";
// import { Link } from "react-router-dom";
// // import "../styles/InstituteSections/DeanMessage.css";

// const DeansMessage = ({ data }) => {
//   const {
//     heading,
//     dean_name,
//     designation_lines = [],
//     email,
//     dean_image,
//     paragraphs = [],
//     cta_label,
//     cta_url,
//   } = data || {};

//   return (
//     <div className="deans-section">
//       <div className="container">
//         <h2 className="deans-heading">
//           <div className="deans-heading-line"></div>
//           {heading}
//         </h2>

//         <div className="deans-layout">
//           {/* IMAGE + NAME */}
//           <div className="deans-image-wrapper">
//             <img
//               src={dean_image}
//               alt={dean_name}
//               className="deans-image"
//             />

//             <div className="deans-info">
//               <p className="deans-name">{dean_name}</p>

//               {designation_lines.length > 0 && (
//                 <p>
//                   {designation_lines.map((line, idx) => (
//                     <span key={idx}>
//                       {line}
//                       <br />
//                     </span>
//                   ))}
//                 </p>
//               )}

//               {email && <p className="deans-email">{email}</p>}
//             </div>
//           </div>

//           {/* MESSAGE */}
//           <div className="deans-message">
//             {paragraphs.map((para, idx) => (
//               <p key={idx} className="deans-paragraph">
//                 {para}
//               </p>
//             ))}

//             {cta_label && cta_url && (
//               <Link to={cta_url} className="cta">
//                 {cta_label}
//               </Link>
//             )}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DeansMessage;
import React from "react";
import { Link } from "react-router-dom";

const DeansMessage = ({ data }) => {
  if (!data) return null;

  const main = data.main || {};
  const designationLines = Array.isArray(data.designation_lines)
    ? data.designation_lines
    : [];
  const paragraphs = Array.isArray(data.paragraphs)
    ? data.paragraphs
    : [];
  const cta = data.cta || {};

  const {
    heading,
    dean_name,
    img,
    email,
  } = main;

  return (
    <div className="deans-section">
      <div className="container">
        {/* ================= HEADING ================= */}
        {heading && (
          <h2 className="deans-heading">
            <div className="deans-heading-line"></div>
            {heading}
          </h2>
        )}

        <div className="deans-layout">
          {/* ================= IMAGE + INFO ================= */}
          <div className="deans-image-wrapper">
            {img && (
              <img
                src={img}
                alt={dean_name || "Dean"}
                className="deans-image"
              />
            )}

            <div className="deans-info">
              {dean_name && (
                <p className="deans-name">{dean_name}</p>
              )}

              {designationLines.length > 0 && (
                <p className="deans-designation">
                  {designationLines.map((line, idx) =>
                    line?.value ? (
                      <span key={idx}>
                        {line.value}
                        <br />
                      </span>
                    ) : null
                  )}
                </p>
              )}

              {email && (
                <p className="deans-email">{email}</p>
              )}
            </div>
          </div>

          {/* ================= MESSAGE ================= */}
          <div className="deans-message">
            {paragraphs.map((para, idx) =>
              para?.value ? (
                <p key={idx} className="deans-paragraph">
                  {para.value}
                </p>
              ) : null
            )}

            {cta.cta_label && (
              <Link
                to="#"
                className="cta"
              >
                {cta.cta_label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeansMessage;
