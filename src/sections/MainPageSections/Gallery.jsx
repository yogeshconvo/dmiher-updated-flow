import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import CampusFacilities from "./Home/CampusFacilities";

function Gallery({ data }) {
  const section = Array.isArray(data) ? data[0] : data;

  const layoutType = section?.layout?.layout_type;
  const basic = section?.basic || {};
  const tabs = section?.tabs || [];

  /* =============================
      🟢 RENDER CAMPUS LAYOUT
  ============================== */

  if (layoutType === "Compus") {
    return <CampusFacilities data={section} />;
  }

  /* =============================
      🔴 NORMAL TABS GALLERY
  ============================== */

  const { tabs_order, tabs_labels, images } = useMemo(() => {
    const order = [];
    const labels = {};
    const imgs = {};

    tabs.forEach((tab) => {
      if (!tab?.tab_key) return;

      order.push(tab.tab_key);
      labels[tab.tab_key] = tab.tab_label;
      imgs[tab.tab_key] = tab.images.map((i) => i.image);
    });

    return { tabs_order: order, tabs_labels: labels, images: imgs };
  }, [tabs]);

  const [activeSection, setActiveSection] = useState(null);
  const [popupIndex, setPopupIndex] = useState(null);

  useEffect(() => {
    if (tabs_order.length > 0) {
      setActiveSection(tabs_order[0]);
    }
  }, [tabs_order]);

  const visibleImages = activeSection
    ? images[activeSection] || []
    : [];

  const nextImage = () =>
    setPopupIndex((prev) =>
      (prev + 1) % visibleImages.length
    );

  const prevImage = () =>
    setPopupIndex((prev) =>
      (prev - 1 + visibleImages.length) %
      visibleImages.length
    );

  return (
    <div className="bg-white py-10 px-5">
      <div className="max-w-7xl mx-auto">

        <h2 className="heading mb-6">
          <hr className="heading-line" />
          {basic.title}
        </h2>

        {/* Tabs */}
        <div className="flex justify-center mb-6">
          {tabs_order.map((key) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`px-3 border-r last:border-r-0
                ${
                  activeSection === key
                    ? "text-red-500 font-semibold underline"
                    : "text-gray-500"
                }`}
            >
              {tabs_labels[key]}
            </button>
          ))}
        </div>

        {/* Grid */}
        {visibleImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {visibleImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt="gallery"
                className="w-full h-60 object-cover rounded cursor-pointer"
                onClick={() => setPopupIndex(index)}
              />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-400">
            No images available
          </p>
        )}

        {/* Popup */}
        {popupIndex !== null && (
          <div
            className="fixed inset-0 bg-black/70 flex items-center justify-center"
            onClick={() => setPopupIndex(null)}
          >
            <div
              className="relative flex items-center gap-6"
              onClick={(e) => e.stopPropagation()}
            >
              <button onClick={prevImage} className="text-white">
                <ArrowLeft size={40} />
              </button>

              <img
                src={visibleImages[popupIndex]}
                className="max-h-[80vh] rounded"
                alt="preview"
              />

              <button onClick={nextImage} className="text-white">
                <ArrowRight size={40} />
              </button>

              <button
                onClick={() => setPopupIndex(null)}
                className="absolute top-2 right-2 text-white"
              >
                <X />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Gallery;