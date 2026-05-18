import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import { FileText } from "lucide-react";
import SafeImage from "../../components/SafeImage";

export const CardMandatoryDisclosure = ({
  icon,
  name,
  link,
  popopContent,
}) => {
  const [show, setShow] = useState(false);

  const content = (
    <>
      <div className="card-icon-wrapper">
        <div className="card-icon">{icon}</div>
      </div>
      <div className="card-title">
        {name}
      </div>
    </>
  );

  const isFile =
    link?.endsWith(".pdf") ||
    link?.endsWith(".docx") ||
    link?.endsWith(".xlsx") ||
    link?.startsWith("http");

  return isFile ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="mandatory-card"
    >
      {content}
    </a>
  ) : link === "popup" ? (
    <>
      <div
        onClick={() => setShow(true)}
        className="mandatory-card clickable"
      >
        {content}
      </div>

      <PopupModal show={show} onClose={() => setShow(false)} title={name}>
        <div
          className={`popup-grid ${
            popopContent?.length > 1 ? "two-cols" : "one-col"
          }`}
        >
          {popopContent && popopContent.length > 0 ? (
            popopContent.map((item, index) => {
              const isImage =
                item.image ||
                /\.(jpg|jpeg|png|webp|svg)$/i.test(item.link || "");
              const isLastItemSingle =
                popopContent.length > 1 &&
                popopContent.length % 2 &&
                index === popopContent.length - 1;

              if (isImage) {
                return (
                  <a
                    key={index}
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`popup-image-card ${isLastItemSingle ? "span-full" : ""}`}
                  >
                    <SafeImage
                      src={item.image || item.link}
                      alt={item.name}
                    />
                    {item.name && (
                      <p className="popup-image-title">
                        {item.name}
                      </p>
                    )}
                  </a>
                );
              }

              return (
                <a
                  key={index}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`popup-link-card ${isLastItemSingle ? "span-full" : ""}`}
                >
                  {item.icon && <span className="popup-link-icon">{item.icon}</span>}
                  <span className="popup-link-text">{item.name}</span>
                </a>
              );
            })
          ) : (
            <p className="popup-empty">
              No content available.
            </p>
          )}
        </div>
      </PopupModal>
    </>
  ) : (
    <Link
      to={link}
      className="mandatory-card"
    >
      {content}
    </Link>
  );
};

export function PopupModal({ show, onClose, title, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose?.();
    };

    if (show) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
      modalRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="popup-overlay"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="popup-container"
        tabIndex="-1"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="popup-close"
          aria-label="Close popup"
        >
          &times;
        </button>

        {title && (
          <h2 className="popup-title">
            {title}
          </h2>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}
