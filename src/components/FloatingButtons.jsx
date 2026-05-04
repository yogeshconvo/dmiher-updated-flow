import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import PopupModal from "./UI/PopupModal";
import { getNonce } from "../context/NonceContext";

const NoPaperFormWidget = ({ widgetId }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.async = true;
    script.src = "https://widgets.in6.nopaperforms.com/emwgts.js";

    const nonce = getNonce?.();
    if (nonce) script.setAttribute("nonce", nonce);

    document.body.appendChild(script);
    return () => {
      if (script.parentNode) script.parentNode.removeChild(script);
    };
  }, [widgetId]);

  if (!widgetId) return null;

  return (
    <div
      className="npf_wgts w-[500px]"
      data-height="420px"
      data-width="full"
      data-w={widgetId}
      style={{ width: "400px", minHeight: "420px" }}
    />
  );
};

const FloatingButtons = ({ data }) => {
  const [activeButton, setActiveButton] = useState(null);

  const enabled = data?.config?.enabled ?? true;
  const buttons = Array.isArray(data?.buttons) ? data.buttons : [];

  if (!enabled || buttons.length === 0) return null;

  const isExternal = (url) =>
    typeof url === "string" && /^https?:\/\//i.test(url);

  return (
    <>
      <div className="flex flex-col gap-2 fixed top-1/2 -translate-y-1/2 right-0 font-[500] pointer-events-none z-50">
        {buttons.map((btn, idx) => {
          const bgColor = btn.bg_color || "#122E5E";
          const baseClass =
            "pointer-events-auto inline-block text-white text-sm px-6 py-2 [writing-mode:vertical-rl] rotate-180";

          if (btn.action_type === "modal") {
            return (
              <button
                key={idx}
                type="button"
                onClick={() => setActiveButton(idx)}
                className={baseClass}
                style={{ backgroundColor: bgColor }}
              >
                {btn.label}
              </button>
            );
          }

          const link = btn.link || "#";

          return isExternal(link) ? (
            <a
              key={idx}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className={baseClass}
              style={{ backgroundColor: bgColor }}
            >
              {btn.label}
            </a>
          ) : (
            <Link
              key={idx}
              to={link}
              className={baseClass}
              style={{ backgroundColor: bgColor }}
            >
              {btn.label}
            </Link>
          );
        })}
      </div>

      {buttons.map((btn, idx) =>
        btn.action_type === "modal" ? (
          <PopupModal
            key={idx}
            show={activeButton === idx}
            onClose={() => setActiveButton(null)}
            title={btn.label}
          >
            <div className="flex-grow p-0 m-0 overflow-auto">
              <NoPaperFormWidget widgetId={btn.widget_id} />
            </div>
          </PopupModal>
        ) : null
      )}
    </>
  );
};

export default FloatingButtons;
