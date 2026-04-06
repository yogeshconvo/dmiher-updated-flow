import { useMemo } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { API_BASE } from "../config/api";
import "../styles/components/footer.css";

const fetchFooter = async () => {
  const res = await fetch(`${API_BASE}/api/menus/Footer`);
  if (!res.ok) throw new Error("Failed to fetch footer");
  return res.json();
};

const SafeLink = ({ to, children }) =>
  to && to !== "#" ? (
    <Link to={to}>{children}</Link>
  ) : (
    <span className="cursor-default">{children}</span>
  );

const Footer = () => {
  const { data: rawData } = useQuery({
    queryKey: ["menu", "footer"],
    queryFn: fetchFooter,
  });

  const footer = useMemo(() => {
    if (!rawData?.data) return null;

    const data = rawData.data;
    const col1 = data.Footer?.COL1 || {};

    return {
      logo: col1.items?.[0]?.image || null,
      address: col1.items?.[0]?.description?.split("\n") || [],
      contactTitle: col1.contact?.title || "",
      contactValue: col1.contact?.items?.[0]?.description || "",
      emailTitle: col1.email?.title || "",
      emailValue:
        col1.email?.items?.find((i) => i.description)?.description?.trim() || "",
      socials: col1.email?.items?.filter((i) => i.icon && i.slug) || [],
      programs: data.Footer?.COL2?.programs || {},
      terms: data.Footer?.COL2?.["T&C"] || {},
      colleges: data.Footer?.COL3?.college || {},
      otherLinks: data.Footer?.COL3?.items || [],
      importantLinks: data.Footer?.COL4?.important_links || {},
      copyright: data.Bottom?.Bottom?.items?.[0]?.description || "",
    };
  }, [rawData]);

  if (!footer) return null;

  const renderCol1 = () => (
    <div className="footer-col">
      {footer.logo && (
        <img src={footer.logo} alt="Logo" className="footer-logo footer-logo-mobile" />
      )}

      {footer.address.length > 0 && (
        <div className="footer-address footer-address-mobile">
          {footer.address.map((line, i) => (
            <p key={`addr-${i}`}>{line}</p>
          ))}
        </div>
      )}

      {footer.contactValue && (
        <div className="footer-contact-mobile">
          <h3 className="footer-subtitle">{footer.contactTitle}</h3>
          <p>{footer.contactValue}</p>
        </div>
      )}

      {footer.emailValue && (
        <div className="footer-email-mobile">
          <h3 className="footer-subtitle">{footer.emailTitle}</h3>
          <p>{footer.emailValue}</p>
        </div>
      )}

      {footer.socials.length > 0 && (
        <div className="footer-socials footer-socials-mobile">
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
  );

  const renderCol2 = () => (
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
  );

  const renderCol3 = () => (
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
                  <li className="mt-1" key={`college-${item.id}-${index}`}>
                    <SafeLink to={item.slug}>{item.title}</SafeLink>
                  </li>
                ))}
            </ul>
          </div>
        )
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
  );

  const renderCol4 = () => (
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
  );

  return (
    <>
      {/* ================= DESKTOP FOOTER ================= */}
      <footer className="footer footer-desktop">
        <div className="footer-grid footer-grid-4">
          {renderCol1()}
          {renderCol2()}
          {renderCol3()}
          {renderCol4()}
        </div>
        <p className="footer-bottom">{footer.copyright}</p>
      </footer>

      {/* ================= MOBILE FOOTER ================= */}
      <footer className="footer footer-mobile">
        <div className="footer-mobile-grid">
          {renderCol1()}
          {renderCol2()}
          {renderCol3()}
          {renderCol4()}
        </div>
        <p className="footer-bottom">{footer.copyright}</p>
      </footer>
    </>
  );
};

export default Footer;
