import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { FileText } from "lucide-react";
// import "../../styles/iqac-main.css";
// import "../../styles/iqac-responsive.css";

export default function IQACSection({data}) {
  const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetch("/api/iqac")
//       .then((res) => res.json())
//       .then((res) => {
//         setData(res);
//         setLoading(false);
//       })
//       .catch(() => setLoading(false));
//   }, []);

//   if (loading) {
//     return (
//       <section className="iqac-section">
//         <div className="container">Loading...</div>
//       </section>
//     );
//   }

  if (!data) return null;

  const renderButton = (btn, idx) => {
    const isExternal =
      btn.link?.endsWith(".pdf") || btn.link?.startsWith("http");

    const props = {
      key: idx,
      className: "iqac-btn",
    };

    return isExternal ? (
      <a {...props} href={btn.link} target="_blank" rel="noopener noreferrer">
        {btn.label}
      </a>
    ) : (
      <Link {...props} to={btn.link}>
        {btn.label}
      </Link>
    );
  };

  return (
    <section className="iqac-section">
      <div className="container">
        {/* Heading */}
        <div className="mb-10">
          <h2 className="heading">
            <hr className="heading-line" />
            {data.heading}
          </h2>
        </div>

        {/* Buttons */}
        <div className="iqac-buttons-wrapper">
          <div className="iqac-btn-row">
            {data.buttons.slice(0, 3).map(renderButton)}
          </div>
          <div className="iqac-btn-row">
            {data.buttons.slice(3, 6).map(renderButton)}
          </div>
          <div className="iqac-btn-row">
            {data.buttons.slice(6).map(renderButton)}
          </div>
        </div>

        {/* Annual Reports */}
        <div className="iqac-reports">
          <h3 className="iqac-reports-title">Annual Reports</h3>
          <hr />

          <div className="iqac-report-list">
            {data.annualReports.map((item, idx) =>
              item.link.startsWith("http") ? (
                <a
                  key={idx}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="iqac-report-item"
                >
                  <FileText className="w-5 h-5 text-[#0B2A6D]" />
                  {item.label}
                </a>
              ) : (
                <Link
                  key={idx}
                  to={item.link}
                  className="iqac-report-item"
                >
                  <FileText className="w-5 h-5 text-[#0B2A6D]" />
                  {item.label}
                </Link>
              )
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
