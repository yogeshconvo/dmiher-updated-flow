import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import MegaMenu from "./NavbarMegaMenu";
import "../styles/components/navbar.css";
// import logo from "../../assets/nav-logo.png";

const Navbar = () => {
  const [menuData, setMenuData] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(null);
  const [openSection, setOpenSection] = useState(null);
  const [openSubSection, setOpenSubSection] = useState(null);

  // Fetch Menu
  useEffect(() => {
    fetch("https://json-new-sever.onrender.com/menu")
      .then((res) => res.json())
      .then((data) => setMenuData(data))
      .catch(console.error);
  }, []);

  const topLinks = menuData.filter((item) => item.type === "topLinks");

  return (

    <div className="navbar">
      <div className="navbar-inner">
        {/* LOGO */}
        <Link to="/">
          <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQuXZdE9ghv5B13jBGysqw_Lfw6x2YquReHJA&s" alt="logo" className="navbar-logo" />
        </Link>

        {/* DESKTOP */}
        <div className="navbar-desktop">
          <div className="navbar-top-links">
            {topLinks.map((link) => (
              <Link key={link.id} to={link.slug} className=" top-links">
                {link.title}
              </Link>
            ))}
          </div>

          <div className="navbar-main">
            {menuData
              .filter((item) => item.type !== "topLinks")
              .map((item) => {
                if (item.type === "normal") {
                  return (
                    <NavLink
                      key={item.id}
                      to={item.slug}
                      className={({ isActive }) =>
                        `nav-link ${isActive ? "nav-link-active" : ""}`
                      }
                    >
                      {item.title}
                    </NavLink>
                  );
                }

                if (item.type === "megaMenu") {
                  return (
                    <div
                      key={item.id}
                      className=""
                      onMouseEnter={() => setShowMegaMenu(item.id)}
                      onMouseLeave={() => setShowMegaMenu(null)}
                    >
                      <button className="nav-link">{item.title}</button>

                      {showMegaMenu === item.id && (
                        <MegaMenu sections={item.children} />
                      )}
                    </div>
                  );
                }

                return null;
              })}
          </div>
        </div>

        {/* MOBILE BUTTON */}
        <button
          className="mobile-btn"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          {mobileMenuOpen ? <X /> : <Menu />}
        </button>

        {/* MOBILE MENU */}
        {mobileMenuOpen && (
          <div className="mobile-menu-full ">
            {/* CLOSE */}
            <button
              className="mobile-close-btn "
              onClick={() => setMobileMenuOpen(false)}
            >
              <X size={28} />
            </button>
            <div className="mobile-content-container">
              {menuData
                .filter((item) => item.type !== "topLinks")
                .map((item) => {
                  const isMega = item.type === "megaMenu";

                  return (
                    <div key={item.id} className="mobile-section">
                      {/* MAIN HEADING */}
                      {isMega ? (
                        <button
                          className="mobile-heading-btn-mega font-oswald-medium"
                          onClick={() => {
                            setOpenSection(
                              openSection === item.id ? null : item.id
                            );
                            setOpenSubSection(null);
                          }}
                        >
                          {item.title}
                        </button>
                      ) : (
                        <Link
                          to={item.slug}
                          className="mobile-heading-btn font-oswald-medium"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.title}
                        </Link>
                      )}
                      {/* MEGA MENU CONTENT */}
                      {isMega && openSection === item.id && (
                        <div className="pl-4 mt-3 space-y-3">
                          {item.children?.map((campusObj, index) => (
                            <div key={index}>
                              {/* CAMPUS */}
                              <button
                                className="mobile-sub-heading"
                                onClick={() =>
                                  setOpenSubSection(
                                    openSubSection === campusObj.campus
                                      ? null
                                      : campusObj.campus
                                  )
                                }
                              >
                                {campusObj.campus}
                              </button>

                              {/* COLLEGES */}
                              {openSubSection === campusObj.campus && (
                                <div className="pl-4 mt-2 space-y-1">
                                  {campusObj.items?.map((college) => (
                                    <Link
                                      key={college.id}
                                      to={college.slug}
                                      className="mobile-link"
                                      onClick={() => setMobileMenuOpen(false)}
                                    >
                                      {college.title}
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
            </div>
            {/* TOP LINKS (MOBILE) */}
            <div className="mobile-bottom-links">
              {topLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.slug}
                  onClick={() => setMobileMenuOpen(false)}
                  className="mobile-link"
                >
                  {link.title}
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
