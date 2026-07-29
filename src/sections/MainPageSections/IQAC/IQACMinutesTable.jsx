import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText } from "lucide-react";
import PopupModal from "../../../components/UI/PopupModal";
import resolveImage from "../../../utils/resolveImage";

export default function IQACMinutesTable({ data }) {
  const { header, years } = data || {};
  const location = useLocation();
  const [popup, setPopup] = useState(null);

  // Nested pages resolve only via the FULL parent chain
  // (backend: /micropage/{pageSlug}/{microCtaKey}/{nestedCtaKey}), so links
  // are built on the whole current path — on /iqac/iqac-minutes a year row
  // goes to /iqac/iqac-minutes/iqac-minutes-2021.
  const basePath = location.pathname.replace(/\/+$/, "");

  const handleRowClick = (row) => {
    if (row.action_type === "popup" && row.popup) {
      setPopup(row.popup);
    }
  };

  return (
    <section className="iqac-table-section">
      <div className="iqac-container">
        {header?.heading && (
          <div className="iqac-heading">
            <hr className="iqac-line" />
            <h2 className="iqac-title">{header.heading}</h2>
          </div>
        )}

        {/* One table per group ("Minutes" / "Agenda" / "Recommendation" on the
            nested year pages, a single "Year" group on the index page), laid
            out two-up on desktop like the live design. */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {(years ?? []).map((group, gi) => {
            const groupRows = group.rows ?? [];
            if (!groupRows.length) return null;
            const groupLabel = (group.year || "Year").trim() || "Year";
            return (
        <div key={gi} className="iqac-year-table-wrapper">
          <table className="iqac-year-table border border-gray-200">
            <thead>
              <tr>
                <th className="iqac-year-th">{groupLabel}</th>
              </tr>
            </thead>
            <tbody>
              {groupRows.map((row, idx) => {
                // `page` arrives as an object ({ label, cta_key,
                // has_micro_page }); older data wrapped it in an array.
                const pageObj = Array.isArray(row.page)
                  ? row.page[0]
                  : row.page;
                const label = row.year || pageObj?.label || "";
                const isClickable = row.action_type === "popup" && row.popup;
                const isPdf = row.action_type === "pdf" && row.pdf;
                const hasMicro =
                  pageObj?.has_micro_page && (pageObj?.cta_key || pageObj?.label);

                return (
                  <tr
                    key={idx}
                    className="iqac-year-tr"
                    style={isClickable ? { cursor: "pointer" } : undefined}
                    onClick={() => isClickable && handleRowClick(row)}
                  >
                    <td className="iqac-year-td">
                      {isClickable ? (
                        <span className="text-blue-600 hover:underline">
                          {label}
                        </span>
                      ) : isPdf ? (
                        <a
                          href={resolveImage(row.pdf)}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block hover:underline"
                        >
                          {label}
                        </a>
                      ) : hasMicro ? (
                        <Link
                          to={`${basePath}/${pageObj.cta_key || pageObj.label}`}
                          className="text-blue-600 hover:underline"
                        >
                          {label}
                        </Link>
                      ) : (
                        label
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
            );
          })}
        </div>

        <PopupModal
          show={!!popup}
          onClose={() => setPopup(null)}
          title={popup?.title}
        >
          <div className="flex flex-wrap gap-4 justify-center mt-4">
            {popup?.items?.map((item, idx) => (
              <Link
                key={idx}
                to={
                  item.has_micro_page && item.cta_key
                    ? `${basePath}/${item.cta_key}`
                    : "#"
                }
                className="iqac-minutes-popup-btn"
                onClick={() => setPopup(null)}
              >
                <FileText size={18} />
                {item.label}
              </Link>
            ))}
          </div>
        </PopupModal>
      </div>
    </section>
  );
}
