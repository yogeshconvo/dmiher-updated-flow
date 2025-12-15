import { Link } from "react-router-dom";

const MegaMenu = ({ sections, hoveredItem, setHoveredItem }) => {
  return (
    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-4 bg-white shadow-lg p-6 grid grid-cols-3 gap-6 w-[1000px] z-50">
      <div className="col-span-2 grid grid-cols-2 gap-6">
        {sections.map((section) => (
          <div key={section.campus}>
            <h4 className="font-semibold underline mb-2">{section.campus}</h4>

            <ul className="space-y-1">
              {section.items.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.slug}
                    onMouseEnter={() => setHoveredItem(item)}
                    className="text-sm text-gray-600 hover:text-[#ff4f37]"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      {/* RIGHT PREVIEW */}
      <div>
        {hoveredItem ? (
          <>
            <img
              src={hoveredItem.image}
              alt={hoveredItem.title}
              className="w-full h-[180px] object-cover mb-2"
            />
            <h5 className="text-[#ff4f37] font-bold text-sm">
              {hoveredItem.title}
            </h5>
            <p className="text-sm text-gray-600">{hoveredItem.description}</p>
          </>
        ) : (
          <p className="text-sm text-gray-400">Hover on institute to preview</p>
        )}
      </div>
    </div>
  );
};

export default MegaMenu;
