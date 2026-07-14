import React, { useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaEye, FaTimes } from "react-icons/fa";
import SafeImage from "../../components/SafeImage";

/* ================= CERTIFICATE GALLERY (section_id: certificate_gallery) =====
   Backend-driven port of the live-site "Accreditations & Recognitions" page
   (/iqac/accreditations-recognitions). The CMS emits:

     data.tabs[] = { title: "International (4)", key, certificates: [ … ] }

   and each certificate:
     { badge, badge_color, year, title, description, link_type,
       thumbnail?, certificate_images?, certificate_pdf?, cta? }

   The live page also exposed an "All" filter (frontend-computed) alongside the
   International / National tabs, so we prepend it here. Each card links via
   link_type:
     - "page" → internal micro-page route  /{college}/{cta.cta_key}
     - "pdf"  → certificate_pdf   (new tab)
     - "img"  → certificate_images (new tab)                                    */

/* Card thumbnail: an explicit `thumbnail` when the CMS provides one (page
   links), otherwise the certificate image itself (image links). Falsy → the
   SafeImage placeholder. */
const displayImage = (cert) => cert?.thumbnail || cert?.certificate_images || "";

/* Resolve the "View Certificate" target + whether it opens in a new tab. */
const resolveLink = (cert, base) => {
  if (cert?.link_type === "page") {
    const ctaKey = cert?.cta?.cta_key;
    if (!ctaKey) return null;
    return { href: base ? `/${base}/${ctaKey}` : `/${ctaKey}`, external: false };
  }
  if (cert?.link_type === "pdf" && cert?.certificate_pdf) {
    return { href: cert.certificate_pdf, external: true };
  }
  const img = cert?.certificate_images || cert?.thumbnail;
  if (img) return { href: img, external: true };
  return null;
};

/* Shared "View Certificate" button — an <a> for external assets, a <Link> for
   internal micro-pages. `variant` swaps the card vs. modal colour treatment. */
const ViewCertificateButton = ({ cert, base, variant = "card" }) => {
  const link = resolveLink(cert, base);
  if (!link) return null;

  const cls =
    variant === "modal"
      ? "w-full hover:bg-gray-100 bg-[#F04E30] hover:text-gray-700 text-white py-2 px-4 rounded-lg transition-all duration-300 font-medium block text-center"
      : "w-full bg-gray-100 hover:bg-[#F04E30] text-gray-700 hover:text-white py-2 px-4 rounded-lg transition-all duration-300 font-medium block text-center";

  return link.external ? (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={cls}>
      View Certificate
    </a>
  ) : (
    <Link to={link.href} className={cls}>
      View Certificate
    </Link>
  );
};

const CertificateGallery = ({ data, college }) => {
  const params = useParams();
  const base = college || params.college || params.slug || "";

  const tabs = Array.isArray(data?.tabs) ? data.tabs : [];

  /* "All" + each backend tab. Backend tab titles already carry their count
     (e.g. "International (4)"), so we use them verbatim as the button label. */
  const filters = useMemo(() => {
    const all = tabs.flatMap((t) => (Array.isArray(t?.certificates) ? t.certificates : []));
    return [
      { key: "__all__", label: "All", certificates: all },
      ...tabs.map((t, i) => ({
        key: t?.key || `tab-${i}`,
        label: t?.title || t?.key || `Tab ${i + 1}`,
        certificates: Array.isArray(t?.certificates) ? t.certificates : [],
      })),
    ];
  }, [tabs]);

  const [activeKey, setActiveKey] = useState("__all__");
  const [selected, setSelected] = useState(null);

  if (!tabs.length) return null;

  const activeFilter =
    filters.find((f) => f.key === activeKey) || filters[0];
  const certificates = activeFilter?.certificates || [];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Filter Tabs */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setActiveKey(f.key)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeKey === f.key
                  ? "bg-[#F04E30] text-white shadow-lg transform scale-105"
                  : "bg-white text-gray-700 hover:bg-[#122E5E] hover:text-white shadow-md"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Certificates Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {certificates.map((cert, index) => (
            <div
              key={`${activeFilter.key}-${index}`}
              className="bg-white rounded-xl shadow-md hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden group flex flex-col"
            >
              {/* Image Section */}
              <div className="relative overflow-hidden">
                <SafeImage
                  src={displayImage(cert)}
                  alt={cert?.title || ""}
                  className="w-full h-48 object-contain transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 right-4">
                    <button
                      onClick={() => setSelected(cert)}
                      className="bg-[#F04E30] hover:bg-[#122E5E] text-white p-2 rounded-full transition-colors duration-300"
                      aria-label="Preview certificate"
                    >
                      <FaEye className="w-5 h-5" />
                    </button>
                  </div>
                </div>
                {cert?.badge && (
                  <div className="absolute top-4 left-4">
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold text-white"
                      style={{ backgroundColor: cert.badge_color || "#122E5E" }}
                    >
                      {cert.badge}
                    </span>
                  </div>
                )}
              </div>

              {/* Content Section */}
              <div className="p-6 flex flex-col h-[260px]">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-bold text-lg text-gray-900 leading-tight">
                    {cert?.title}
                  </h3>
                  {cert?.year && (
                    <span className="text-[#F04E30] font-bold text-sm bg-[#F04E30]/10 px-2 py-1 rounded whitespace-nowrap ml-2">
                      {cert.year}
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">
                  {cert?.description}
                </p>

                {/* Button fixed at bottom */}
                <div className="mt-auto">
                  <ViewCertificateButton cert={cert} base={base} variant="card" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Modal */}
      {selected && (
        <div
          className="fixed inset-0 mt-0 md:mt-25 bg-black/50 flex items-center justify-center p-4 z-50"
          onClick={(e) => {
            if (e.target === e.currentTarget) setSelected(null);
          }}
        >
          <div className="bg-white rounded-xl max-w-xl w-full max-h-[75vh] overflow-y-auto">
            <div className="relative">
              <SafeImage
                src={displayImage(selected)}
                alt={selected?.title || ""}
                className="w-full h-64 object-contain rounded-t-2xl"
              />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 bg-white/90 hover:bg-white p-2 rounded-full transition-colors duration-200"
                aria-label="Close"
              >
                <FaTimes className="w-4 h-4" />
              </button>
            </div>
            <div className="p-4">
              <div className="flex items-center gap-2 mb-2">
                {selected?.badge && (
                  <span
                    className="px-3 py-1 rounded-full text-sm font-semibold text-white"
                    style={{ backgroundColor: selected.badge_color || "#122E5E" }}
                  >
                    {selected.badge}
                  </span>
                )}
                {selected?.year && (
                  <span className="text-[#F04E30] font-bold bg-[#F04E30]/10 px-3 py-1 rounded-full">
                    {selected.year}
                  </span>
                )}
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selected?.title}
              </h2>
              <p className="text-gray-600 mb-2">{selected?.description}</p>
              <div className="flex justify-end items-center border-t pt-2">
                <div className="mt-auto">
                  <ViewCertificateButton
                    cert={selected}
                    base={base}
                    variant="modal"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default CertificateGallery;
