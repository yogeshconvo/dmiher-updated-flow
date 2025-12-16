import { useState } from "react";
import { ArrowLeft, ArrowRight } from "lucide-react";

function HomeANNOUNCEMENTS({ data }) {
  const {
    title,
    categories = [],
    announcements = {},
    items_per_page = 4,
  } = data || {};

  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const currentItems = announcements[activeCategory] || [];

  const visibleItems = currentItems.slice(
    currentIndex,
    currentIndex + items_per_page
  );

  const handlePrev = () => {
    setCurrentIndex((prev) => Math.max(0, prev - items_per_page));
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev + items_per_page >= currentItems.length
        ? 0
        : prev + items_per_page
    );
  };

  return (
    <div className="py-8 pb-10 bg-white text-gray-500">
      <div className="container">
        {/* Title */}
        <h2
          className="text-2xl sm:text-3xl lg:text-4xl font-medium"
          style={{ fontFamily: "Oswald, sans-serif" }}
        >
          <span className="inline-block w-12 h-1 bg-red-500 mb-2" />
          <br />
          {title}
        </h2>

        {/* Categories */}
        <div className="flex flex-wrap gap-6 mt-6 justify-center">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setActiveCategory(cat);
                setCurrentIndex(0);
              }}
              className={`text-base md:text-xl ${
                activeCategory === cat ? "underline" : "hover:text-gray-400"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Announcements */}
        <div className="grid lg:grid-cols-4 gap-4 mt-8">
          {visibleItems.map((item, index) => (
            <div
              key={index}
              className="md:border-r md:pr-3 last:border-0"
            >
              {item.url ? (
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-base md:text-xl text-[#707070] hover:underline block"
                >
                  {item.title}
                </a>
              ) : (
                <h3 className="text-base md:text-xl text-[#707070]">
                  {item.title}
                </h3>
              )}

              {item.date && (
                <p className="text-sm text-[#269BFF] mt-1">
                  {item.date}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Arrows (mostly hidden because only 2 items) */}
        {currentItems.length > items_per_page && (
          <div className="flex justify-end gap-3 mt-6">
            <button onClick={handlePrev}>
              <ArrowLeft size={20} />
            </button>
            <button onClick={handleNext}>
              <ArrowRight size={20} />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default HomeANNOUNCEMENTS;
