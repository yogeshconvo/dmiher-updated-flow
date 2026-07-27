import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { FileText } from "lucide-react";
import PopupModal from "../../../components/UI/PopupModal";

export default function IQACMinutesTable({ data }) {
  const { header, years } = data || {};
  const location = useLocation();
  const [popup, setPopup] = useState(null);

  const [firstSegment] = location.pathname.split("/").filter(Boolean);
  const basePath = firstSegment ? `/${firstSegment}` : "";

  const allRows = (years ?? []).flatMap((group) => group.rows ?? []);

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

        <div className="iqac-year-table-wrapper">
          <table className="iqac-year-table">
            <thead>
              <tr>
                <th className="iqac-year-th">Year</th>
              </tr>
            </thead>
            <tbody>
              {allRows.map((row, idx) => {
                const label = row.year || row.page?.[0]?.label || "";
                const isClickable = row.action_type === "popup" && row.popup;
                const hasMicro =
                  row.page?.[0]?.has_micro_page && row.page?.[0]?.label;

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
                      ) : hasMicro ? (
                        <Link
                          to={`${basePath}/${row.page[0].cta_key || label}`}
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
