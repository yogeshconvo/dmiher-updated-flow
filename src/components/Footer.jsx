import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import "../styles/footer.css";
// import VisitorCounter from "../Services/VisitorCounter"; // ✅ IMPORTANT

const iconMap = {
  instagram: FaInstagram,
  facebook: FaFacebookF,
  linkedin: FaLinkedinIn,
  youtube: FaYoutube,
};

const Footer = () => {
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    fetch("http://localhost:3000/footer")
      .then((res) => res.json())
      .then((data) => {
        console.log("FOOTER API =>", data);
        setFooter(data.footer || data);
      })
      .catch((err) => console.error("Footer API Error:", err));
  }, []);

  // LOADING STATE (VERY IMPORTANT)
  if (!footer) {
    return (
      <div className="bg-[#132F5C] text-white text-center p-6">
        Loading footer...
      </div>
    );
  }

  return (
    <>
      {/* ================= DESKTOP FOOTER ================= */}
      <footer className="footer footer-desktop">
        <div className="footer-grid">
          {/* COLUMN 1 */}
          <div>
            <img
              src={footer.logo}
              alt="Logo"
              className="footer-logo"
              onError={(e) => (e.target.style.display = "none")}
            />

            <p className="mb-4">
              {footer.address?.title}
              <br />
              {footer.address?.lines?.map((line, i) => (
                <span key={i}>
                  {line}
                  <br />
                </span>
              ))}
            </p>

            <p className="footer-address-title">CONTACT</p>
            <p>{footer.address?.contact}</p>

            <p className="footer-address-title">E MAIL</p>
            <p>{footer.address?.email}</p>

            <div className="footer-socials">
              {footer.socials?.map((s) => {
                const Icon = iconMap[s.icon];
                return (
                  <a key={s.icon} href={s.url} target="_blank" rel="noreferrer">
                    <Icon size={22} />
                  </a>
                );
              })}
            </div>
          </div>

          {/* SECTIONS */}
          {footer.sections?.map((section) => (
            <div key={section.id}>
              <h3 className="footer-title">{section.title}</h3>

              {section.links?.map((link) =>
                link.url.startsWith("/") ? (
                  <p key={link.text}>
                    <Link to={link.url}>{link.text}</Link>
                  </p>
                ) : (
                  <p key={link.text}>
                    <a href={link.url} target="_blank" rel="noreferrer">
                      {link.text}
                    </a>
                  </p>
                )
              )}
            </div>
          ))}
        </div>

        <p className="footer-bottom">{footer.copyright}</p>

        <div className="footer-visitor">
          <span className="text-gray-400 mr-2">Visitor Counter :</span>
        </div>
      </footer>

      {/* ================= MOBILE FOOTER ================= */}
      <footer className="footer footer-mobile">
        <img
          src={footer.logo}
          alt="Logo"
          className="footer-logo-mobile"
          onError={(e) => (e.target.style.display = "none")}
        />

        <div className="footer-quick-links">
          {footer.quickLinks?.map((link) => (
            <Link key={link.text} to={link.url}>
              {link.text}
            </Link>
          ))}
        </div>

        {footer.sections?.map((section) => (
          <div key={section.id} className="mt-6">
            <h3 className="footer-title-mobile">{section.title}</h3>

            {section.links?.map((link) =>
              link.url.startsWith("/") ? (
                <p key={link.text}>
                  <Link to={link.url}>{link.text}</Link>
                </p>
              ) : (
                <p key={link.text}>
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.text}
                  </a>
                </p>
              )
            )}
          </div>
        ))}

        <div className="footer-socials-mobile">
          {footer.socials?.map((s) => {
            const Icon = iconMap[s.icon];
            return (
              <a key={s.icon} href={s.url} target="_blank" rel="noreferrer">
                <Icon />
              </a>
            );
          })}
        </div>

        <div className="footer-address-mobile">
          <p className="text-yellow-400">ADDRESS</p>
          {footer.address?.lines?.map((line, i) => (
            <p key={i}>{line}</p>
          ))}
        </div>

        <p className="footer-bottom mt-8">{footer.copyright}</p>

        <div className="footer-visitor">
          <span className="text-gray-400 mr-2">Visitor Counter :</span>
        </div>
      </footer>
    </>
  );
};

export default Footer;
