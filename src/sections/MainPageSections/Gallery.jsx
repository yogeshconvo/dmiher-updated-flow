import React, { useState, useEffect, useMemo } from "react";
import { ArrowLeft, ArrowRight, X } from "lucide-react";
import CampusFacilities from "./Home/CampusFacilities";
import RichTextRenderer from "../../components/RichTextRenderer";

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
              <img
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
        {popupIndex !== null && (
          <div
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
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