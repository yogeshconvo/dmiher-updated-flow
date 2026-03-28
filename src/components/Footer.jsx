
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/components/footer.css";

const API_BASE = "https://demos.convomax.com/dmiher_backend";

const Footer = () => {
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/menus/Footer`)
      .then((res) => res.json())
      .then((res) => {
        const data = res?.data || {};

        /* ================= COL 1 ================= */
        const col1 = data.Footer?.COL1 || {};

        const logo = col1.items?.[0]?.image || null;
        const address = col1.items?.[0]?.description?.split("\n") || [];

        const contactTitle = col1.contact?.title || "";
        const contactValue = col1.contact?.items?.[0]?.description || "";

        const emailTitle = col1.email?.title || "";
        const emailValue =
          col1.email?.items?.find((i) => i.description)?.description?.trim() ||
          "";

        const socials =
          col1.email?.items?.filter((i) => i.icon && i.slug) || [];

        /* ================= COL 2 ================= */
        const programs = data.Footer?.COL2?.programs || {};
        const terms = data.Footer?.COL2?.["T&C"] || {};

        /* ================= COL 3 ================= */
        const col3 = data.Footer?.COL3 || {};
        const colleges = col3.college || {};
        const otherLinks = col3.items || [];

        /* ================= COL 4 ================= */
        const importantLinks = data.Footer?.COL4?.important_links || {};

        /* ================= BOTTOM ================= */
        const copyright = data.Bottom?.Bottom?.items?.[0]?.description || "";

        setFooter({
          logo,
          address,
          contactTitle,
          contactValue,
          emailTitle,
          emailValue,
          socials,
          programs,
          terms,
          colleges,
          otherLinks,
          importantLinks,
          copyright,
        });
      })
      .catch(console.error);
  }, []);

  if (!footer) return null;

  const SafeLink = ({ to, children }) =>
    to && to !== "#" ? (
      <Link to={to}>{children}</Link>
    ) : (
      <span className="cursor-default">{children}</span>
    );

  return (
    <>
      {/* ================= DESKTOP FOOTER ================= */}
      <footer className="footer footer-desktop">
        <div className="footer-grid footer-grid-4">
          
          {/* ===== COL 1 ===== */}
          <div className="footer-col">
            {footer.logo && (
              <img src={footer.logo} alt="Logo" className="footer-logo" />
            )}

            {footer.address.length > 0 && (
              <p className="footer-address">
                {footer.address.map((line, i) => (
                  <span key={`addr-${i}`}>
                    {line}
                    <br />
                  </span>
                ))}
              </p>
            )}

            {footer.contactValue && (
              <>
                <h3 className="footer-subtitle">{footer.contactTitle}</h3>
                <p>{footer.contactValue}</p>
              </>
            )}

            {footer.emailValue && (
              <>
                <h3 className="footer-subtitle">{footer.emailTitle}</h3>
                <p>{footer.emailValue}</p>
              </>
            )}

            {footer.socials.length > 0 && (
              <div className="footer-socials">
                {footer.socials.map((item, index) => (
                  <a
                    key={`social-${item.id || index}`}
                    href={item.slug}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      className="footer-icons"
                      src={`${API_BASE}/storage/${item.icon}`}
                      alt={item.title}
                    />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* ===== COL 2 ===== */}
          <div className="footer-col">
            <h3 className="footer-title">{footer.programs?.title}</h3>
            <ul className="mb-2">
              {footer.programs?.items?.map((item, index) => (
                <li className="mt-1" key={`program-${item.id}-${index}`}>
                  <SafeLink to={item.slug}>{item.title}</SafeLink>
                </li>
              ))}
            </ul>

            <h3 className="footer-title">{footer.terms?.title}</h3>
            <ul>
              {footer.terms?.items?.map((item, index) => (
                <li className="mt-1" key={`term-${item.id}-${index}`}>
                  <SafeLink to={item.slug}>{item.title}</SafeLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== COL 3 ===== */}
          <div className="footer-col">
            <h3 className="footer-title">{footer.colleges?.title}</h3>

            {Object.entries(footer.colleges?.campus || {}).map(
              ([campus, list], campusIndex) => (
                <div key={`campus-${campusIndex}`} className="footer-campus">
                  <strong className="mt-2">{campus}</strong>
                  <ul className="list-disc ml-5">
                    {list
                      ?.sort((a, b) => a.sort_order - b.sort_order)
                      .map((item, index) => (
                        <li
                          className="mt-1"
                          key={`college-${item.id}-${index}`}
                        >
                          <SafeLink to={item.slug}>{item.title}</SafeLink>
                        </li>
                      ))}
                  </ul>
                </div>
              ),
            )}

            {footer.otherLinks.length > 0 && (
              <ul className="footer-subtitle font-oswald-medium grid grid-cols-2 gap-3 mt-4">
                {footer.otherLinks.map((item, index) => (
                  <li key={`other-${item.id}-${index}`}>
                    <SafeLink to={item.slug}>{item.title}</SafeLink>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ===== COL 4 ===== */}
          <div className="footer-col">
            <h3 className="footer-title">{footer.importantLinks?.title}</h3>
            <ul>
              {footer.importantLinks?.items?.map((item, index) => (
                <li key={`important-${item.id}-${index}`}>
                  <SafeLink to={item.slug}>{item.title}</SafeLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="footer-bottom">{footer.copyright}</p>
      </footer>

      {/* ================= MOBILE FOOTER ================= */}
      <footer className="footer footer-mobile">
        <div className="footer-mobile-grid">
          <div className="footer-col">
            {footer.logo && (
              <img
                src={footer.logo}
                alt="Logo"
                className="footer-logo-mobile"
              />
            )}

            {footer.address.length > 0 && (
              <div className="footer-address-mobile">
                <p className="text-yellow-400">ADDRESS</p>
                {footer.address.map((line, i) => (
                  <p key={`m-addr-${i}`}>{line}</p>
                ))}
              </div>
            )}

            {footer.contactValue && (
              <div className="footer-contact-mobile">
                <p className="text-yellow-400">{footer.contactTitle}</p>
                <p>{footer.contactValue}</p>
              </div>
            )}

            {footer.emailValue && (
              <div className="footer-email-mobile">
                <p className="text-yellow-400">{footer.emailTitle}</p>
                <p>{footer.emailValue}</p>
              </div>
            )}

            {footer.socials.length > 0 && (
              <div className="footer-socials-mobile">
                {footer.socials.map((item, index) => (
                  <a
                    key={`m-social-${item.id || index}`}
                    href={item.slug}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img
                      src={`${API_BASE}/storage/${item.icon}`}
                      alt={item.title}
                      width="20"
                    />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* ===== COL 2 ===== */}
          <div className="footer-col">
            <h3 className="footer-title">{footer.programs?.title}</h3>
            <ul className="mb-2">
              {footer.programs?.items?.map((item, index) => (
                <li className="mt-1" key={`program-${item.id}-${index}`}>
                  <SafeLink to={item.slug}>{item.title}</SafeLink>
                </li>
              ))}
            </ul>

            <h3 className="footer-title">{footer.terms?.title}</h3>
            <ul>
              {footer.terms?.items?.map((item, index) => (
                <li className="mt-1" key={`term-${item.id}-${index}`}>
                  <SafeLink to={item.slug}>{item.title}</SafeLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== COL 3 ===== */}
          <div className="footer-col">
            <h3 className="footer-title">{footer.colleges?.title}</h3>

            {Object.entries(footer.colleges?.campus || {}).map(
              ([campus, list], campusIndex) => (
                <div key={`campus-${campusIndex}`} className="footer-campus">
                  <strong className="mt-2">{campus}</strong>
                  <ul className="list-disc ml-5">
                    {list
                      ?.sort((a, b) => a.sort_order - b.sort_order)
                      .map((item, index) => (
                        <li
                          className="mt-1"
                          key={`college-${item.id}-${index}`}
                        >
                          <SafeLink to={item.slug}>{item.title}</SafeLink>
                        </li>
                      ))}
                  </ul>
                </div>
              ),
            )}

            {footer.otherLinks.length > 0 && (
              <ul className="footer-subtitle font-oswald-medium grid grid-cols-2 gap-3 mt-4">
                {footer.otherLinks.map((item, index) => (
                  <li key={`other-${item.id}-${index}`}>
                    <SafeLink to={item.slug}>{item.title}</SafeLink>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ===== COL 4 ===== */}
          <div className="footer-col">
            <h3 className="footer-title">{footer.importantLinks?.title}</h3>
            <ul>
              {footer.importantLinks?.items?.map((item, index) => (
                <li key={`important-${item.id}-${index}`}>
                  <SafeLink to={item.slug}>{item.title}</SafeLink>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <p className="footer-bottom">{footer.copyright}</p>
      </footer>
    </>
  );
};

export default Footer;
