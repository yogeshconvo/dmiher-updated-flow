import React, { useState, useEffect } from "react";
import { FileText } from "lucide-react";
import { Link } from "react-router";
import { getNonce } from "../../../context/NonceContext";

// import "../../styles/enquiry-global-main.css";
// import "../../styles/enquiry-global-responsive.css";

/* ================= NoPaperForm (external admission enquiry) ================= */
const NoPaperFormWidget = ({ widgetId, height = "360px" }) => {
  useEffect(() => {
    if (!widgetId) return;
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://widgets.in6.nopaperforms.com/emwgts.js";

    // Attach CSP nonce so the browser allows this script
    const nonce = getNonce();
    if (nonce) script.setAttribute("nonce", nonce);

    document.body.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [widgetId]);

  if (!widgetId) return null;

  return (
    <div
      className="npf_wgts npf-container"
      data-height={height}
      data-width="full"
      data-w={widgetId}
    />
  );
};

const EnquiryGlobal = ({ data, pageSlug }) => {
  // Holds the enquiry_form object of the NPF card that's currently open.
  const [modal, setModal] = useState(null);
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
            const card = (
              <>
                <div className="enquiry-icon-wrap">
                  <FileText className="enquiry-icon" />
                </div>
                <div className="enquiry-text">{link.title}</div>
              </>
            );

            // 1) Dynamic form → rendered via the section-dependent micropage
            //    flow. Links to /{pageSlug}/{cta_key}; MicroPageApiController
            //    returns the `dynamic_application_form` section which renders
            //    the referenced dashboard form. (No /forms URL.)
            const cta = link.cta;
            if (cta?.has_micro_page && cta?.cta_key && pageSlug) {
              return (
                <Link
                  key={idx}
                  to={`/${pageSlug}/${cta.cta_key}`}
                  className="enquiry-card"
                >
                  {card}
                </Link>
              );
            }

            // 2) NoPaperForms popup (external admission enquiry) — opens a modal.
            if (link.enquiry_form?.widget_id || link.design_type === "form") {
              return (
                <div
                  key={idx}
                  className="enquiry-card"
                  onClick={() => setModal(link.enquiry_form || {})}
                >
                  {card}
                </div>
              );
            }

            // 3) Backward-compat: legacy page_slug / path / popup links.
            const target = link.page_slug ?? link.path;
            if (target === "popup") {
              return (
                <div
                  key={idx}
                  className="enquiry-card"
                  onClick={() =>
                    setModal({
                      widget_id: "e07589d3e4cb30c4c23ee47924975ec8",
                      title: "Admission Enquiry Form",
                    })
                  }
                >
                  {card}
                </div>
              );
            }
            const isExternal =
              target?.startsWith?.("http") || target?.endsWith?.(".pdf");
            const to = target?.startsWith?.("/") ? target : `/${target || ""}`;
            return isExternal ? (
              <a
                key={idx}
                href={target}
                target="_blank"
                rel="noopener noreferrer"
                className="enquiry-card"
              >
                {card}
              </a>
            ) : (
              <Link key={idx} to={to} className="enquiry-card">
                {card}
              </Link>
            );
          })}
        </div>
      </div>

      {modal && (
        <div className="enquiry-modal-overlay" onClick={() => setModal(null)}>
          <div className="enquiry-modal" onClick={(e) => e.stopPropagation()}>
            <button
              className="enquiry-modal-close"
              onClick={() => setModal(null)}
            >
              &times;
            </button>

            <h3 className="enquiry-modal-title">
              {modal.title || "Admission Enquiry Form"}
            </h3>

            <NoPaperFormWidget
              widgetId={modal.widget_id}
              height={modal.data_height ? `${modal.data_height}px` : "360px"}
            />
          </div>
        </div>
      )}
    </section>
  );
};

export default EnquiryGlobal;
