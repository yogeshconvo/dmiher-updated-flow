import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import MegaMenu from "./NavbarMegaMenu";
import { useHeader } from "../hooks/useHeader";
import "../styles/components/navbar.css";

const Navbar = () => {
  /* ================= STATE ================= */
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [openSection, setOpenSection] = useState(null);
  const [hoveredItem, setHoveredItem] = useState(null);

  /* ================= API ================= */
  const { header, isLoading, isError } = useHeader();

  if (isLoading) return null; // or loader
  if (isError || !header) return null;

  const { mainMenu = [], topLinks = [], logo } = header;

  return (
    <div className="navbar">
      <div className="navbar-inner">
        {/* ================= LOGO ================= */}
        <Link to="/">
          {logo?.image && (
            <img
              src={logo.image}
              alt={logo.title || "Logo"}
              className="navbar-logo"
            />
          )}
        </Link>

        {/* ================= DESKTOP ================= */}
        <div className="navbar-desktop">
          {/* ================= TOP LINKS ================= */}
          <div className="navbar-top-links">
            {topLinks.map((item) => {
              const isParentMenu = item.type === "parent_menu";

              if (isParentMenu && item.children?.length) {
                return (
                  <div key={item.id} className="relative group">
                    <span className="top-links cursor-pointer">
                      {item.title}
                    </span>

                    <div className="absolute top-full left-1/2 -translate-x-1/2 mt-3 bg-white border shadow-lg p-4 z-[9999] w-[300px] hidden group-hover:block">
                      {item.children.map((child) =>
                        child.items?.map((subItem) => (
                          <Link
                            key={subItem.id}
                            to={subItem.slug}
                            className="block py-1 text-sm hover:text-[#F04E30]"
                          >
                            {subItem.title}
                          </Link>
                        ))
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <Link key={item.id} to={item.slug} className="top-links">
                  {item.image ? (
                    <div className="flex items-center gap-2">
                      <img src={item.image} alt="" />
                      <span>{item.title}</span>
                    </div>
                  ) : (
                    item.title
                  )}
                </Link>
              );
            })}
          </div>

          {/* ================= MAIN MENU ================= */}
          <div className="navbar-main">
            {mainMenu.map((item) => {
              const isMega = item.type === "parent_menu";

              return (
                <div key={item.id} className="relative group">
                  {isMega ? (
                    <span className="nav-link nav-link-disabled">
                      {item.title}
                    </span>
                  ) : (
                    <NavLink
                      to={item.slug}
                      end
                      className={({ isActive }) =>
                        `nav-link ${isActive ? "nav-link-active" : ""}`
                      }
                    >
                      {item.title}
                    </NavLink>
                  )}

                  {isMega && (
                    <div className="absolute hidden group-hover:flex bg-white shadow-lg z-50">
                      <MegaMenu
                        sections={item.children}
                        hoveredItem={hoveredItem}
                        setHoveredItem={setHoveredItem}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* ================= MOBILE BUTTON ================= */}
        <button
          className="mobile-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* ================= MOBILE MENU ================= */}
        {mobileMenuOpen && (
          <div className="mobile-menu-full">
            <button
              className="mobile-close-btn"
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={28} />
            </button>

            <div className="mobile-content-container">
              {mainMenu.map((item) => {
                const isMega = item.type === "parent_menu";

                return (
                  <div key={item.id} className="mobile-section">
                    {isMega ? (
                      <button
                        className="mobile-heading-btn-mega"
                        onClick={() =>
                          setOpenSection(
                            openSection === item.id ? null : item.id
                          )
                        }
                      >
                        {item.title}
                      </button>
                    ) : (
                      <Link
                        to={item.slug}
                        className="mobile-heading-btn"
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        {item.title}
                      </Link>
                    )}

                    {isMega && openSection === item.id && (
                      <div className="pl-4 mt-3 space-y-3">
                        {item.children?.map((group, i) => (
                          <div key={i}>
                            {group.campus && (
                              <p className="font-semibold text-sm">
                                {group.campus}
                              </p>
                            )}

                            {group.items?.map((child, j) => (
                              <Link
                                key={j}
                                to={child.slug}
                                className="mobile-link"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {child.title}
                              </Link>
                            ))}
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            <div className="mobile-bottom-links">
              {topLinks.map((item) => (
                <Link
                  key={item.id}
                  to={item.slug}
                  className="mobile-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
