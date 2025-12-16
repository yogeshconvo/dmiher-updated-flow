import React, { useState, useEffect } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";

function Gallery({ data }) {
  const {
    title,
    tabs_order = [],
    tabs_labels = {},
    images = {},
  } = data || {};

  const [activeSection, setActiveSection] = useState(tabs_order[0]);
  const [fadeClass, setFadeClass] = useState("opacity-0");
  const [popupIndex, setPopupIndex] = useState(null);

  useEffect(() => {
    setFadeClass("opacity-0");
    const t = setTimeout(() => setFadeClass("opacity-100"), 50);
    return () => clearTimeout(t);
  }, [activeSection]);

  const visibleImages = images[activeSection] || [];

  const openPopup = (index) => setPopupIndex(index);
  const closePopup = () => setPopupIndex(null);

  const nextImage = () =>
    setPopupIndex((prev) => (prev + 1) % visibleImages.length);

  const prevImage = () =>
    setPopupIndex(
      (prev) => (prev - 1 + visibleImages.length) % visibleImages.length
    );

  const getImagePath = (img) =>
    `/assets/About/Gallery/AboutGallery/${img}`;

  return (
    <div className="bg-white py-10 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-4">
          <hr className="w-16 sm:w-20 border-[#F04E30] mb-2 border-t-4" />
          <h2 className="text-4xl font-[500] font-oswald-medium tracking-wider text-[#707070]">
            {title}
          </h2>
        </div>

        {/* Tabs */}
        <div className="flex justify-center items-center space-x-6 text-sm mb-6">
          {tabs_order.map((section, idx) => (
            <React.Fragment key={section}>
              <button
                onClick={() => setActiveSection(section)}
                className={
                  activeSection === section
                    ? "text-red-500 font-semibold underline"
                    : "text-gray-500"
                }
              >
                {tabs_labels[section]}
              </button>
              {idx < tabs_order.length - 1 && (
                <span className="text-gray-500">|</span>
              )}
            </React.Fragment>
          ))}
        </div>

        {/* Gallery Grid */}
        <div
          className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 transition-opacity duration-500 ${fadeClass}`}
        >
          {visibleImages.slice(0, 9).map((img, index) => (
            <img
              key={index}
              src={getImagePath(img)}
              alt={`Gallery ${index + 1}`}
              className="w-full h-60 object-cover rounded cursor-pointer hover:scale-105 transition-transform duration-200"
              onClick={() => openPopup(index)}
            />
          ))}
        </div>
      </div>

      {/* Popup */}
      {popupIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center px-6"
          onClick={closePopup}
        >
          <div
            className="relative max-w-5xl w-full flex items-center justify-between gap-6"
            onClick={(e) => e.stopPropagation()}
          >
            <button onClick={prevImage} className="text-white">
              <ArrowLeft size={40} />
            </button>

            <div className="flex-1 flex justify-center">
              <img
                src={getImagePath(visibleImages[popupIndex])}
                alt="Gallery"
                className="max-h-[80vh] object-contain rounded"
              />
            </div>

            <button onClick={nextImage} className="text-white">
              <ArrowRight size={40} />
            </button>

            <button
              className="absolute top-2 right-2 text-white"
              onClick={closePopup}
            >
              <X size={30} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Gallery;
