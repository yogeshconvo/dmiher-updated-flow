import { useEffect, useRef, useState } from "react";
import { Link } from "react-router";
import "../../styles/CardMandatoryDisclosure.css";

export const CardMandatoryDisclosure = ({
  icon,
  name,
  link,
  popopContent,
}) => {
  const [show, setShow] = useState(false);

  const isFile =
    link?.endsWith(".pdf") ||
    link?.endsWith(".docx") ||
    link?.endsWith(".xlsx") ||
    link?.startsWith("http");

  const CardContent = (
    <>
      <div className="mandatory-icon-wrap">
        <div className="mandatory-icon">{icon}</div>
      </div>
      <div className="mandatory-title">{name}</div>
    </>
  );

  /* ========= FILE LINK ========= */
  if (isFile) {
    return (
      <a
        href={link}
        target="_blank"
        rel="noopener noreferrer"
        className="mandatory-card"
      >
        {CardContent}
      </a>
    );
  }

  /* ========= POPUP ========= */
  if (link === "popup") {
    return (
      <>
        <div
          onClick={() => setShow(true)}
          className="mandatory-card cursor-pointer"
        >
          {CardContent}
        </div>

        <PopupModal show={show} onClose={() => setShow(false)} title={name}>
          <PopupGrid items={popopContent} />
        </PopupModal>
      </>
    );
  }

  /* ========= ROUTE LINK ========= */
  return (
    <Link to={link} className="mandatory-card">
      {CardContent}
    </Link>
  );
};

/* ================= POPUP GRID ================= */
function PopupGrid({ items = [] }) {
  if (!items.length) {
    return (
      <p className="text-gray-600 col-span-full text-center">
        No content available.
      </p>
    );
  }

  return (
    <div
      className={`popup-grid ${
        items.length > 1 ? "popup-grid-2" : ""
      }`}
    >
      {items.map((item, index) => {
        const isImage =
          item.image ||
          /\.(jpg|jpeg|png|webp|svg)$/i.test(item.link || "");

        const isSingle =
          items.length > 1 &&
          items.length % 2 === 1 &&
          index === items.length - 1;

        /* IMAGE */
        if (isImage) {
          return (
            <a
              key={index}
              href={item.link}
              target="_blank"
              rel="noopener noreferrer"
              className={`popup-image-card ${
                isSingle ? "popup-single" : ""
              }`}
            >
              <img
                src={item.image || item.link}
                alt={item.name}
                className="popup-image"
              />
              {item.name && (
                <p className="popup-image-label">{item.name}</p>
              )}
            </a>
          );
        }

        /* FILE */
        return (
          <a
            key={index}
            href={item.link}
            target="_blank"
            rel="noopener noreferrer"
            className={`popup-file ${
              isSingle ? "popup-single" : ""
            }`}
          >
            {item.icon && <span className="w-5 h-5">{item.icon}</span>}
            <span>{item.name}</span>
          </a>
        );
      })}
    </div>
  );
}

/* ================= MODAL ================= */
export function PopupModal({ show, onClose, title, children }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const onEsc = (e) => e.key === "Escape" && onClose?.();

    if (show) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", onEsc);
      modalRef.current?.focus();
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onEsc);
    };
  }, [show, onClose]);

  if (!show) return null;

  return (
    <div
      className="popup-backdrop"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="popup-modal"
        tabIndex="-1"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          className="popup-close"
          onClick={onClose}
          aria-label="Close popup"
        >
          &times;
        </button>

        {title && <h2 className="popup-title">{title}</h2>}
        {children}
      </div>
    </div>
  );
}
