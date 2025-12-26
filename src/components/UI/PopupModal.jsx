import React, { useEffect, useRef } from "react";
// import "../../styles/popup-modal.css";
// import "../../styles/popup-modal-responsive.css";

export default function PopupModal({ show, onClose, title, children }) {
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

        <div className="popup-content">{children}</div>
      </div>
    </div>
  );
}
