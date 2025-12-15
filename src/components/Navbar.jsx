import React, { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Menu, X } from "lucide-react";
import MegaMenu from "./NavbarMegaMenu";
import "../styles/navbar.css";
// import logo from "../../assets/nav-logo.png";

const Navbar = () => {
  const [menuData, setMenuData] = useState([]);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showMegaMenu, setShowMegaMenu] = useState(null);
  const [activeMegaItem, setActiveMegaItem] = useState(null);

  // Fetch Menu
  useEffect(() => {
    fetch("http://localhost:3000/menu")
      .then((res) => res.json())
      .then((data) => setMenuData(data))
      .catch(console.error);
  }, []);

  const topLinks = menuData.filter((item) => item.type === "topLinks");

  return (
    // <div className="fixed w-full bg-white top-0 z-[999] shadow-sm h-[100px]">
    //   <div className="flex justify-between items-center px-6 h-full">
    //     {/* LOGO */}
    //     <Link to="/">
    //       <img src="#" alt="logo" className="w-[200px]" />
    //     </Link>

    //     {/* DESKTOP */}
    //     <div className="hidden lg:flex flex-col items-end w-full h-full">
    //       {/* TOP LINKS */}
    //       <div className="flex gap-4 text-sm text-gray-600 mb-2 mt-auto">
    //         {topLinks.map((link) => (
    //           <Link key={link.id} to={link.slug} className="hover:underline">
    //             {link.title}
    //           </Link>
    //         ))}
    //       </div>

    //       {/* MAIN NAV */}
    //       <div className="flex gap-10 text-lg text-[#1f3c88] mt-auto">
    //         {menuData
    //           .filter((item) => item.type !== "topLinks")
    //           .map((item) => {
    //             // NORMAL LINK
    //             if (item.type === "normal") {
    //               return (
    //                 <NavLink
    //                   key={item.id}
    //                   to={item.slug}
    //                   className={({ isActive }) =>
    //                     `pb-1 border-b-4 ${
    //                       isActive
    //                         ? "border-[#ff4f37]"
    //                         : "border-transparent hover:border-[#ff4f37]"
    //                     }`
    //                   }
    //                 >
    //                   {item.title}
    //                 </NavLink>
    //               );
    //             }

    //             // MEGA MENU
    //             if (item.type === "megaMenu") {
    //               return (
    //                 <div
    //                   key={item.id}
    //                   className="relative"
    //                   onMouseEnter={() => {
    //                     setShowMegaMenu(item.id);
    //                     setActiveMegaItem(null);
    //                   }}
    //                   onMouseLeave={() => {
    //                     setShowMegaMenu(null);
    //                     setActiveMegaItem(null);
    //                   }}
    //                 >
    //                   <button className="pb-1 border-b-4 border-transparent hover:border-[#ff4f37]">
    //                     {item.title}
    //                   </button>

    //                   {showMegaMenu === item.id && (
    //                     <MegaMenu
    //                       sections={item.children}
    //                       hoveredItem={activeMegaItem}
    //                       setHoveredItem={setActiveMegaItem}
    //                     />
    //                   )}
    //                 </div>
    //               );
    //             }

    //             return null;
    //           })}
    //       </div>
    //     </div>

    //     {/* MOBILE MENU BUTTON */}
    //     <button
    //       className="lg:hidden"
    //       onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
    //     >
    //       {mobileMenuOpen ? <X /> : <Menu />}
    //     </button>
    //   </div>

    //   {/* MOBILE MENU */}
    //   {mobileMenuOpen && (
    //     <div className="lg:hidden bg-[#1f3c88] text-white p-6 space-y-4">
    //       {menuData
    //         .filter((item) => item.type !== "topLinks")
    //         .map((item) => (
    //           <Link
    //             key={item.id}
    //             to={item.slug || "#"}
    //             onClick={() => setMobileMenuOpen(false)}
    //             className="block border-b pb-2"
    //           >
    //             {item.title}
    //           </Link>
    //         ))}

    //       {/* TOP LINKS (MOBILE BOTTOM) */}
    //       <div className="pt-4 border-t border-white/30 space-y-2">
    //         {topLinks.map((link) => (
    //           <Link
    //             key={link.id}
    //             to={link.slug}
    //             className="block text-sm opacity-80"
    //             onClick={() => setMobileMenuOpen(false)}
    //           >
    //             {link.title}
    //           </Link>
    //         ))}
    //       </div>
    //     </div>
    //   )}
    // </div>
    <div className="navbar">
      <div className="navbar-inner">
        {/* LOGO */}
        <Link to="/">
          <img src="#" alt="logo" className="navbar-logo" />
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
                      className="relative"
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
          <div className="mobile-menu">
            {menuData
              .filter((item) => item.type !== "topLinks")
              .map((item) => (
                <Link
                  key={item.id}
                  to={item.slug || "#"}
                  className="mobile-link"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.title}
                </Link>
              ))}

            <div className="mobile-top-links">
              {topLinks.map((link) => (
                <Link
                  key={link.id}
                  to={link.slug}
                  className="block text-sm opacity-80"
                  onClick={() => setMobileMenuOpen(false)}
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
