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
      <div className="bg-[#F04E30]/10 text-[#F04E30] rounded-full p-3">
        <div className="w-6 h-6">{icon}</div>
      </div>
      <div className="text-gray-800 font-medium text-[20px] mt-1 leading-snug">
        {name}
      </div>
    </>
  );

  const isFile =
    link?.endsWith(".pdf") ||
    link?.endsWith(".docx") ||
    link?.endsWith(".xlsx") ||
    link?.startsWith("http");
    
  // Use conditional (ternary) operator to conditionally render JSX elements based on the value of `link`
  return isFile ? (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:bg-[#fef7f6] w-full md:w-[45%]"
    >
      {content}
    </a>
  ) : link === "popup" ? (
    <>
      <div
        onClick={() => setShow(true)}
        className="cursor-pointer flex items-start gap-4 p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:bg-[#fef7f6] w-full md:w-[45%]"
      >
        {content}
      </div>

      <PopupModal show={show} onClose={() => setShow(false)} title={name}>
        <div
          className={`grid ${
            popopContent?.length > 1 ? "grid-cols-2" : "grid-cols-1"
          } gap-4`}
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
                    className={`w-full rounded-lg overflow-hidden shadow flex flex-col items-center p-3 ${isLastItemSingle ? "col-span-2 mx-auto max-w-[300px]" : ""}`}
                  >
                    <SafeImage
                      src={item.image || item.link}
                      alt={item.name}
                      className="w-full max-h-[100px] object-contain"
                    />
                    {item.name && (
                      <p className="mt-2 text-sm text-gray-700 text-center">
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
                  className={`flex items-center justify-center gap-2 w-full h-[60px] text-base font-medium text-white bg-[#122E5E] rounded hover:bg-[#F04E30] transition
    ${isLastItemSingle ? "col-span-2 mx-auto max-w-[300px]" : ""}
  `}
                >
                  {item.icon && <span className="w-5 h-5">{item.icon}</span>}
                  <span className="truncate capitalize">{item.name}</span>
                </a>
              );
            })
          ) : (
            <p className="text-gray-600 col-span-full text-center">
              No content available.
            </p>
          )}
        </div>
      </PopupModal>
    </>
  ) : (
    <Link
      to={link}
      className="flex items-start gap-4 p-6 rounded-2xl bg-white shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200 hover:bg-[#fef7f6] w-full md:w-[45%]"
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
      className="fixed mt-[100px] inset-0 bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50"
      role="dialog"
      aria-modal="true"
      onClick={onClose}
    >
      <div
        ref={modalRef}
        className="bg-white p-6 m-4 rounded-lg shadow-lg w-full max-w-2xl relative"
        tabIndex="-1"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-black text-2xl"
          aria-label="Close popup"
        >
          &times;
        </button>

        {title && (
          <h2 className="text-xl text-red-500 text-center font-semibold mb-4">
            {title}
          </h2>
        )}
        <div>{children}</div>
      </div>
    </div>
  );
}
