import { useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import SafeImage from "../../../components/SafeImage";
import resolveImage from "../../../utils/resolveImage";

const ALL_KEY = "__all__";

/* Pick the image to display in the card thumbnail. Priority:
     1. explicit `thumbnail`  (unless `_disabled.thumbnail === true`)
     2. `certificate_images`  (used as image AND as the "view" target for
        link_type === "img")
     3. nothing → SafeImage shows its placeholder                        */
const pickThumbnail = (cert) => {
  const thumbnailDisabled = cert?._disabled?.thumbnail === true;
  if (!thumbnailDisabled && cert?.thumbnail) return cert.thumbnail;
  if (cert?.certificate_images) return cert.certificate_images;
  return "";
};

function CertificateGallery({ data }) {
  const tabs = Array.isArray(data?.tabs) ? data.tabs : [];
  const [activeKey, setActiveKey] = useState(ALL_KEY);

  const navigate = useNavigate();
  // The gallery lives on a micropage (e.g. /iqac/accreditations-recognitions).
  // `params.college` is the parent slug we need to route into the target
  // micropage — /{college}/{cta_key}. Falls back to `slug` for pages that use
  // a single-param route.
  const params = useParams();
  const collegeSlug = params?.college || params?.slug || "";

  // Flatten every tab's certificates for the "All" view.
  const allCertificates = useMemo(
    () =>
      tabs.flatMap((tab) =>
        Array.isArray(tab?.certificates) ? tab.certificates : []
      ),
    [tabs]
  );

  const activeCertificates = useMemo(() => {
    if (activeKey === ALL_KEY) return allCertificates;
    const tab = tabs.find((t) => t?.key === activeKey);
    return Array.isArray(tab?.certificates) ? tab.certificates : [];
  }, [activeKey, tabs, allCertificates]);

  if (!tabs.length) return null;

  const handleView = (cert) => {
    const linkType = cert?.link_type || "img";

    // Micropage — navigate to /{college}/{cta_key}. If we somehow lost the
    // parent slug, still fire a root-relative fallback so the user isn't stuck.
    if (linkType === "page") {
      const ctaKey = cert?.cta?.cta_key || cert?.cta?.key;
      if (!ctaKey) return;
      const path = collegeSlug ? `/${collegeSlug}/${ctaKey}` : `/${ctaKey}`;
      navigate(path);
      return;
    }

    // PDF — open the resolved file URL in a new tab.
    if (linkType === "pdf") {
      const url = resolveImage(cert?.certificate_pdf);
      if (url) window.open(url, "_blank", "noopener,noreferrer");
      return;
    }

    // Default (image) — open the certificate image in a new tab.
    const url = resolveImage(cert?.certificate_images);
    if (url) window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <section className="cert-gallery-section">
      <div className="cert-gallery-container">
        <div className="cert-gallery-tabs" role="tablist">
          <button
            type="button"
            role="tab"
            aria-selected={activeKey === ALL_KEY}
            className={`cert-gallery-tab ${
              activeKey === ALL_KEY ? "cert-gallery-tab-active" : ""
            }`}
            onClick={() => setActiveKey(ALL_KEY)}
          >
            All
          </button>
          {tabs.map((tab, i) => {
            const key = tab?.key || tab?.title || `tab-${i}`;
            const isActive = activeKey === key;
            return (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={`cert-gallery-tab ${
                  isActive ? "cert-gallery-tab-active" : ""
                }`}
                onClick={() => setActiveKey(key)}
              >
                {tab?.title || tab?.key}
              </button>
            );
          })}
        </div>

        {activeCertificates.length > 0 ? (
          <div className="cert-gallery-grid">
            {activeCertificates.map((cert, i) => (
              <article key={i} className="cert-card">
                <div className="cert-card-media">
                  {cert?.badge && (
                    <span
                      className="cert-card-badge"
                      style={{
                        backgroundColor: cert?.badge_color || "#15b720",
                      }}
                    >
                      {cert.badge}
                    </span>
                  )}
                  <SafeImage
                    src={resolveImage(pickThumbnail(cert))}
                    alt={cert?.title || "Certificate"}
                    className="cert-card-image"
                  />
                </div>

                <div className="cert-card-body">
                  <div className="cert-card-title-row">
                    <h3 className="cert-card-title">{cert?.title}</h3>
                    {cert?.year && (
                      <span className="cert-card-year">{cert.year}</span>
                    )}
                  </div>
                  {cert?.description && (
                    <p className="cert-card-desc">{cert.description}</p>
                  )}
                </div>

                <div className="cert-card-actions">
                  <button
                    type="button"
                    className="cert-card-view-btn"
                    onClick={() => handleView(cert)}
                  >
                    View Certificate
                  </button>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <p className="cert-gallery-empty">No certificates available.</p>
        )}
      </div>
    </section>
  );
}

export default CertificateGallery;
