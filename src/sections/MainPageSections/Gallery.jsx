import React, { useState, useEffect, useMemo } from "react";
import { createPortal } from "react-dom";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import CampusFacilities from "./Home/CampusFacilities";
import RichTextRenderer from "../../components/RichTextRenderer";
import SafeImage from "../../components/SafeImage";

function Gallery({ data }) {
  const section = Array.isArray(data) ? data[0] : data;

  const layoutType = section?.layout?.layout_type;
  const basic = section?.basic || {};
  const tabs = section?.tabs || [];

  /* =============================
      🟢 CAMPUS LAYOUT
  ============================== */
  if (layoutType === "campus") {
    return <CampusFacilities data={section} />;
  }

  /* =============================
      🔴 TAB GALLERY
  ============================== */

  const { tabs_order, tabs_labels, images } = useMemo(() => {
    const order = [];
    const labels = {};
    const imgs = {};

    tabs.forEach((tab) => {
      if (!tab?.tab_key) return;

      order.push(tab.tab_key);
      labels[tab.tab_key] = tab.tab_label;

      imgs[tab.tab_key] =
        tab.images?.map((i) => i.image) || [];
    });

    return {
      tabs_order: order,
      tabs_labels: labels,
      images: imgs,
    };
  }, [tabs]);

  const [activeSection, setActiveSection] = useState(null);
  const [popupIndex, setPopupIndex] = useState(null);

  useEffect(() => {
    if (tabs_order.length > 0) {
      setActiveSection(tabs_order[0]);
    }
  }, [tabs_order]);

  const visibleImages =
    activeSection ? images[activeSection] || [] : [];

  const nextImage = () =>
    setPopupIndex((prev) =>
      (prev + 1) % visibleImages.length
    );

  const prevImage = () =>
    setPopupIndex((prev) =>
      (prev - 1 + visibleImages.length) %
      visibleImages.length
    );

  useEffect(() => {
    if (popupIndex === null) return;

    const handleKeyDown = (e) => {
      if (e.key === "Escape") setPopupIndex(null);
      else if (e.key === "ArrowRight") nextImage();
      else if (e.key === "ArrowLeft") prevImage();
    };
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [popupIndex, visibleImages.length]);

  /* =============================
      🟡 IMPORTANT DETAILS (FIXED)
  ============================== */

  // ✅ FIX: define properly (this was causing your error)
  const addressArr = section?.address || [];

  return (
    <div className="bg-white py-10 px-5">
      <div className="max-w-7xl mx-auto">

        {/* Heading */}
     {basic.title &&   <h2 className="heading">
          <hr className="heading-line" />
          {basic.title}
        </h2>}

        {/* Tabs */}
        <div className="flex justify-center items-center  text-sm mb-6">
          {tabs_order.map((key) => (
            <button
              key={key}
              onClick={() => setActiveSection(key)}
              className={`transition-all duration-300 border-r-1 border-gray-300 px-3 last:border-r-0
              ${
                activeSection === key
                  ? "text-red-500 font-semibold underline "
                  : "text-gray-500"
              }`}
            >
              {tabs_labels[key]}
            </button>
          ))}
        </div>

        {/* Image Grid */}
        {visibleImages.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {visibleImages.map((img, index) => (
              <SafeImage
                key={index}
                src={img}
                alt="gallery"
                className="w-full h-60 object-cover rounded cursor-pointer hover:scale-105 transition"
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
        {popupIndex !== null &&
          typeof document !== "undefined" &&
          createPortal(
            <div
              className="fixed inset-0 bg-black/85 backdrop-blur-sm flex items-center justify-center p-4 sm:p-8 z-[10000]"
              role="dialog"
              aria-modal="true"
              onClick={() => setPopupIndex(null)}
            >
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  prevImage();
                }}
                className="absolute left-3 sm:left-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white transition z-10"
                aria-label="Previous"
              >
                <ArrowLeft size={24} />
              </button>

              <div
                className="relative flex items-center justify-center max-w-[min(800px,80vw)] max-h-[70vh]"
                onClick={(e) => e.stopPropagation()}
              >
                <SafeImage
                  src={visibleImages[popupIndex]}
                  className="block max-w-full max-h-[70vh] w-auto h-auto object-contain rounded-xl shadow-2xl"
                  alt="preview"
                />
              </div>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  nextImage();
                }}
                className="absolute right-3 sm:right-6 top-1/2 -translate-y-1/2 w-11 h-11 flex items-center justify-center rounded-full bg-white/15 hover:bg-white/30 text-white transition z-10"
                aria-label="Next"
              >
                <ArrowRight size={24} />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setPopupIndex(null);
                }}
                className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center rounded-full bg-white text-black shadow-lg hover:bg-red-500 hover:text-white transition z-10"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>,
            document.body,
          )}
      </div>

      {/* =============================
          IMPORTANT DETAILS (DYNAMIC)
      ============================== */}

      {addressArr.length > 0 && (
        <section className="mt-16">
          <div className="max-w-7xl mx-auto">

            <h2 className="heading">
              <hr className="heading-line" />
              Important Details
            </h2>

            <div className="grid md:grid-cols-3 gap-6">

              {addressArr.map((item, index) => (
                <div
                  key={index}
                  className={`border-r-2 border-gray-300 last:border-r-0 ${index === 0 ? "border-r-0 pl-0" : ""}`}
                >
                  <h3 className="">
                    {item.heading}
                  </h3>

                  <RichTextRenderer html={item.desc} />
                </div>
              ))}

            </div>
          </div>
        </section>
      )}
    </div>
  );
}

export default Gallery;