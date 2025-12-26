import { Link } from "react-router-dom";
import "../styles/components/navbar.css";

const MegaMenu = ({ sections, hoveredItem, setHoveredItem }) => {
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
                    to={item.slug}
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

      {/* RIGHT PREVIEW */}
      <div className="mega-preview">
        {hoveredItem ? (
          <>
            <img
              src={hoveredItem.image}
              alt={hoveredItem.title}
              className="mega-preview-img"
            />
            <h5 className="mega-preview-title">{hoveredItem.title}</h5>
            <p className="mega-preview-desc">{hoveredItem.description}</p>
          </>
        ) : (
          <p className="mega-preview-placeholder">
            Hover on institute to preview
          </p>
        )}
      </div>
    </div>
  );
};

export default MegaMenu;
