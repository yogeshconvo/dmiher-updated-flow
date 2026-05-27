import { Link } from "react-router-dom";
import { resolveImage } from "../../../utils/resolveImage";

const ProgramsGrid = ({ data }) => {
  const cards = data?.cards || [];
  if (!cards.length) return null;

  const handleAnchor = (anchor) => {
    if (!anchor) return;
    const yOffset = -110;
    const el = document.querySelector(anchor);
    if (el) {
      const y = el.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="flex max-w-7xl mx-auto justify-center m-20 max-md:my-10 items-center bg-white px-4 py-10 sm:px-8 md:px-12">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-2">
        {cards.map((card, index) => {
          const url = card.url || "";
          const isExternal = url.startsWith("http");
          const isAnchor = url.startsWith("#");

          const Inner = (
            <div className="relative group w-full aspect-[3/2] sm:aspect-[4/3] md:aspect-[5/3] rounded-lg overflow-hidden shadow-lg cursor-pointer transition-all duration-300 hover:shadow-xl hover:scale-105 h-full">
              <img
                src={resolveImage(card.image || "#")}
                alt={card.title}
                className="w-full h-full object-cover group-hover:brightness-75 transition-all duration-300"
              />
              <div className="absolute inset-0 group-hover:bg-opacity-50 transition-all duration-300 flex items-center justify-center">
                <h2 className="text-white text-lg sm:text-xl font-semibold text-center px-2">
                  {card.title}
                </h2>
              </div>
            </div>
          );

          if (isExternal) {
            return (
              <a key={index} href={url} target="_blank" rel="noopener noreferrer">
                {Inner}
              </a>
            );
          }
          if (isAnchor) {
            return (
              <button key={index} onClick={() => handleAnchor(url)} className="w-full">
                {Inner}
              </button>
            );
          }
          return (
            <Link key={index} to={url}>
              {Inner}
            </Link>
          );
        })}
      </div>
    </div>
  );
};

export default ProgramsGrid;
