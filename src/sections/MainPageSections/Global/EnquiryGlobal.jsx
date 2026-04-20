import React, { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { Link } from "react-router";
import { getNonce } from "../../../context/NonceContext";

// import "../../styles/enquiry-global-main.css";
// import "../../styles/enquiry-global-responsive.css";

/* ================= NoPaperForm ================= */
const NoPaperFormWidget = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://widgets.in6.nopaperforms.com/emwgts.js";

    // Attach CSP nonce so the browser allows this script
    const nonce = getNonce();
    if (nonce) script.setAttribute("nonce", nonce);

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

const EnquiryGlobal = ({ data }) => {
  const [showModal, setShowModal] = useState(false);
  const links = data?.links ?? [];

  return (
    <section className="enquiry-section">
      <div className="container">
        <h2 className="heading">
          <hr className="heading-line" />
          {data?.basic?.title}
        </h2>

        <div className="enquiry-grid">
          {links.map((link, idx) => {
            const target = link.page_slug ?? link.path;
            const isExternal =
              target?.startsWith?.("http") || target?.endsWith?.(".pdf");

            if (target === "popup") {
              return (
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
              );
            }

            const to = target?.startsWith?.("/") ? target : `/${target || ""}`;

            return isExternal ? (
              <a
                key={idx}
                href={target}
                target="_blank"
                rel="noopener noreferrer"
                className="enquiry-card"
              >
                <div className="enquiry-icon-wrap">
                  <FileText className="enquiry-icon" />
                </div>
                <div className="enquiry-text">{link.title}</div>
              </a>
            ) : (
              <Link key={idx} to={to} className="enquiry-card">
                <div className="enquiry-icon-wrap">
                  <FileText className="enquiry-icon" />
                </div>
                <div className="enquiry-text">{link.title}</div>
              </Link>
            );
          })}
        </div>
      </div>

      {showModal && (
        <div
          className="enquiry-modal-overlay"
          onClick={() => setShowModal(false)}
        >
          <div
            className="enquiry-modal"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="enquiry-modal-close"
              onClick={() => setShowModal(false)}
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
