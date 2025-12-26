import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaFacebookF,
  FaLinkedinIn,
  FaYoutube,
} from "react-icons/fa";
import "../styles/components/footer.css";
// import VisitorCounter from "../Services/VisitorCounter";

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


  if (!footer) {
    return (
      <div className="bg-[#132F5C] text-white text-center p-6">
        Loading footer...
      </div>
    );
  }
  const sectionPairs = [];
  for (let i = 0; i < footer.sections.length; i += 2) {
    sectionPairs.push(footer.sections.slice(i, i + 2));
  }

  const mobileOrder = [
   "quick-links",
  "programs",
  "colleges",
  "important-links",
  "terms",
  ]
  const mobileSections = mobileOrder.map((id) => footer.sections.find((s) => s.id === id)).filter(Boolean);
  
  
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

            <p className="footer-address-title font-oswald-medium">CONTACT</p>
            <p>{footer.address?.contact}</p>

            <p className="footer-address-title font-oswald-medium">E MAIL</p>
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

          {/* COLUMNS 2+ (same sections as mobile) */}
{sectionPairs.map((pair, colIndex) => (
  <div key={colIndex} className="space-y-6">
    {pair.map((section) => (
      <div key={section.id}>
        <h3 className="footer-title font-oswald-medium">
          {section.title}
        </h3>

        {/* GROUPS */}
        {section.groups?.length ? (
          section.groups.map((g) => (
            <div key={g.groupTitle} className="footer-group">
              <p className="footer-group-title">{g.groupTitle}</p>
              
              <ul className="footer-list-group">
                {g.links.map((link) => (
                  <li key={link.text} className="links">
                    
                    {link.url.startsWith("/") ? (
                      <Link to={link.url}>{link.text}</Link>
                    ) : (
                      <a href={link.url} target="_blank" rel="noreferrer">
                        {link.text}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))
        ) : (
          <>
            {/* NORMAL LINKS */}
            {section.type !== "quickLinks" && (
              <ul className="footer-list">
                {section.links?.map((link) => (
                  <li key={link.text} className="links">
                    {link.url.startsWith("/") ? (
                      <Link to={link.url}>{link.text}</Link>
                    ) : (
                      <a href={link.url} target="_blank" rel="noreferrer">
                        {link.text}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            )}

            {/* QUICK LINKS */}
            {section.type === "quickLinks" && (
              <div className="footer-quick-links font-oswald-medium">
                {section.links?.map((link) => (
                  <Link key={link.text} to={link.url}>
                    {link.text}
                  </Link>
                ))}
              </div>
            )}
          </>
        )}
      </div>
    ))}
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


    {/* ================= MOBILE FOOTER SECTIONS ================= */}
<div className="mt-6">
  {/* FIRST 2 SECTIONS SIDE BY SIDE */}
  <div className="flex gap-4">
    {mobileSections.slice(0, 2).map((section,idx) => (
      <div key={section.id} className="w-1/2">
        {
          idx=== 1 && (  <h3 className="footer-title-mobile font-oswald-medium">{section.title}</h3>)

        }
     
        {section.type === "quickLinks" ? (
          <div className="footer-quick-links font-oswald-medium">
            {section.links?.map((link) => (
              <Link key={link.text} to={link.url}>
                {link.text}
              </Link>
            ))}
          </div>
        ) : (
          section.links?.map((link) =>
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
          )
        )}
      </div>
    ))}
  </div>

  {/* REMAINING SECTIONS NORMAL STACK */}
 {mobileSections.slice(2).map((section) => (
  <div key={section.id} className="mt-6">
    <h3 className="footer-title-mobile font-oswald-medium">{section.title}</h3>

    {/* GROUPS */}
    {section.groups?.length ? (
      section.groups.map((g) => (
        <div key={g.groupTitle} className="footer-group">
          <p className="footer-group-title">{g.groupTitle}</p>

          <ul className="footer-list-group">
            {g.links.map((link) => (
              <li key={link.text} className="links">
                {link.url.startsWith("/") ? (
                  <Link to={link.url}>{link.text}</Link>
                ) : (
                  <a href={link.url} target="_blank" rel="noreferrer">
                    {link.text}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))
    ) : (
      /* NORMAL LINKS */
      section.links?.map((link) =>
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
      )
    )}
  </div>
))}

</div>



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
</footer>

    </>
  );
};

export default Footer;
