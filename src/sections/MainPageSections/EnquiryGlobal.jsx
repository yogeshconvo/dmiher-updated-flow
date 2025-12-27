import React, { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { Link } from "react-router";

import "../../styles/enquiry-global-main.css";
import "../../styles/enquiry-global-responsive.css";

/* ================= NoPaperForm ================= */
const NoPaperFormWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://widgets.in6.nopaperforms.com/emwgts.js";

    document.body.appendChild(script);
    return () => document.body.removeChild(script);
  }, []);

  return (
    <div
      className="npf_wgts npf-container"
      data-height="360px"
      data-width="full"
      data-w="e07589d3e4cb30c4c23ee47924975ec8"
    />
  );
};

/* ================= Enquiry Global ================= */
const EnquiryGlobal = () => {
  const [showModal, setShowModal] = useState(false);

  const links = [
    {
      title: "Expression of Interest form for international universities",
      path: "/global-connects/expression-of-interest-form",
    },
    {
      title: "Admission enquiry form",
      path: "popup",
    },
    {
      title: "Outward Opportunities application form",
      path: "/global-connects/student-exchange-applicationForm",
    },
    {
      title: "Faculty Opportunities application form",
      path: "/global-connects/faculty-exchange-applicationForm",
    },
  ];

  return (
    <section className="enquiry-section">
      <div className="container">
        <h2 className="enquiry-heading">
          <span className="enquiry-heading-line" />
          ENQUIRY
        </h2>

        <div className="enquiry-grid">
          {links.map((link, idx) =>
            link.path === "popup" ? (
              <div
                key={idx}
                className="enquiry-card"
                onClick={() => setShowModal(true)}
              >
                <div className="enquiry-icon-wrap">
                  <FileText className="enquiry-icon" />
                </div>
                <div className="enquiry-text">{link.title}</div>
              </div>
            ) : (
              <Link key={idx} to={link.path} className="enquiry-card">
                <div className="enquiry-icon-wrap">
                  <FileText className="enquiry-icon" />
                </div>
                <div className="enquiry-text">{link.title}</div>
              </Link>
            )
          )}
        </div>
      </div>

      {showModal && (
        <div
          className="enquiry-modal-overlay"
          role="dialog"
          aria-modal="true"
        >
          <div className="enquiry-modal">
            <button
              className="enquiry-modal-close"
              onClick={() => setShowModal(false)}
              aria-label="Close"
            >
              &times;
            </button>

            <h3 className="enquiry-modal-title">
              Admission Enquiry Form
            </h3>

            <NoPaperFormWidget />
          </div>
        </div>
      )}
    </section>
  );
};

export default EnquiryGlobal;
