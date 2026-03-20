import React, { useState } from "react";
import { Link } from "react-router-dom";

const MegaMenu = ({ sections }) => {
  const [hoveredItem, setHoveredItem] = useState(null);

  return (
    <div className="mega-menu">
      <div className="mega-menu-left">
        {sections.map((section) => (
          <div key={section.campus}>
            <h4 className="mega-heading">{section.campus}</h4>

            <ul className="mega-list">
              {section.items.map((item) => (
                <li key={item.id}>
                  <Link
                    to={item.slug || "/"}
                    onMouseEnter={() => setHoveredItem(item)}
                    className="mega-link"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="mega-preview">
        {hoveredItem ? (
          <>
            <img
              src={hoveredItem.image}
              alt={hoveredItem.title}
              className="mega-preview-img"
            />
            <p>{hoveredItem.title}</p>
            <p>{hoveredItem.description}</p>
          </>
        ) : (
          <p>Hover on institute to preview</p>
        )}
      </div>
    </div>
  );
};

export default MegaMenu;