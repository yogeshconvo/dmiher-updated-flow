// import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import {
//   FaInstagram,
//   FaFacebookF,
//   FaLinkedinIn,
//   FaYoutube,
// } from "react-icons/fa";
// import "../styles/components/footer.css";
// // import VisitorCounter from "../Services/VisitorCounter";

// const iconMap = {
//   instagram: FaInstagram,
//   facebook: FaFacebookF,
//   linkedin: FaLinkedinIn,
//   youtube: FaYoutube,
// };

// const Footer = () => {
//   const [footer, setFooter] = useState(null);

//   useEffect(() => {
//     fetch("http://localhost:3000/footer")
//       // fetch("https://json-new-sever.onrender.com/footer")
//       .then((res) => res.json())
//       .then((data) => {
//         console.log("FOOTER API =>", data);
//         setFooter(data.footer || data);
//       })
//       .catch((err) => console.error("Footer API Error:", err));
//   }, []);

//   if (!footer) {
//     return (
//       <div className="bg-[#132F5C] text-white text-center p-6">
//         Loading footer...
//       </div>
//     );
//   }
//   const sectionPairs = [];
//   for (let i = 0; i < footer.sections.length; i += 2) {
//     sectionPairs.push(footer.sections.slice(i, i + 2));
//   }

//   const mobileOrder = [
//     "quick-links",
//     "programs",
//     "colleges",
//     "important-links",
//     "terms",
//   ];
//   const mobileSections = mobileOrder
//     .map((id) => footer.sections.find((s) => s.id === id))
//     .filter(Boolean);

//   return (
//     <>
//       {/* ================= DESKTOP FOOTER ================= */}
//       <footer className="footer footer-desktop">
//         <div className="footer-grid">
//           {/* COLUMN 1 */}
//           <div>
//             <img
//               src={footer.logo}
//               alt="Logo"
//               className="footer-logo"
//               onError={(e) => (e.target.style.display = "none")}
//             />

//             <p className="mb-4">
//               {footer.address?.title}
//               <br />
//               {footer.address?.lines?.map((line, i) => (
//                 <span key={i}>
//                   {line}
//                   <br />
//                 </span>
//               ))}
//             </p>

//             <p className="footer-address-title font-oswald-medium">CONTACT</p>
//             <p>{footer.address?.contact}</p>

//             <p className="footer-address-title font-oswald-medium">E MAIL</p>
//             <p>{footer.address?.email}</p>

//             <div className="footer-socials">
//               {footer.socials?.map((s) => {
//                 const Icon = iconMap[s.icon];
//                 return (
//                   <a key={s.icon} href={s.url} target="_blank" rel="noreferrer">
//                     <Icon size={22} />
//                   </a>
//                 );
//               })}
//             </div>
//           </div>

//           {/* COLUMNS 2+ (same sections as mobile) */}
//           {sectionPairs.map((pair, colIndex) => (
//             <div key={colIndex} className="space-y-6">
//               {pair.map((section) => (
//                 <div key={section.id}>
//                   <h3 className="footer-title font-oswald-medium">
//                     {section.title}
//                   </h3>

//                   {/* GROUPS */}
//                   {section.groups?.length ? (
//                     section.groups.map((g) => (
//                       <div key={g.groupTitle} className="footer-group">
//                         <p className="footer-group-title">{g.groupTitle}</p>

//                         <ul className="footer-list-group">
//                           {g.links.map((link) => (
//                             <li key={link.text} className="links">
//                               {link.url.startsWith("/") ? (
//                                 <Link to={link.url}>{link.text}</Link>
//                               ) : (
//                                 <a
//                                   href={link.url}
//                                   target="_blank"
//                                   rel="noreferrer"
//                                 >
//                                   {link.text}
//                                 </a>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       </div>
//                     ))
//                   ) : (
//                     <>
//                       {/* NORMAL LINKS */}
//                       {section.type !== "quickLinks" && (
//                         <ul className="footer-list">
//                           {section.links?.map((link) => (
//                             <li key={link.text} className="links">
//                               {link.url.startsWith("/") ? (
//                                 <Link to={link.url}>{link.text}</Link>
//                               ) : (
//                                 <a
//                                   href={link.url}
//                                   target="_blank"
//                                   rel="noreferrer"
//                                 >
//                                   {link.text}
//                                 </a>
//                               )}
//                             </li>
//                           ))}
//                         </ul>
//                       )}

//                       {/* QUICK LINKS */}
//                       {section.type === "quickLinks" && (
//                         <div className="footer-quick-links font-oswald-medium">
//                           {section.links?.map((link) => (
//                             <Link key={link.text} to={link.url}>
//                               {link.text}
//                             </Link>
//                           ))}
//                         </div>
//                       )}
//                     </>
//                   )}
//                 </div>
//               ))}
//             </div>
//           ))}
//         </div>

//         <p className="footer-bottom">{footer.copyright}</p>

//         <div className="footer-visitor">
//           <span className="text-gray-400 mr-2">Visitor Counter :</span>
//         </div>
//       </footer>

//       {/* ================= MOBILE FOOTER ================= */}
//       <footer className="footer footer-mobile">
//         <img
//           src={footer.logo}
//           alt="Logo"
//           className="footer-logo-mobile"
//           onError={(e) => (e.target.style.display = "none")}
//         />

//         {/* ================= MOBILE FOOTER SECTIONS ================= */}
//         <div className="mt-6">
//           {/* FIRST 2 SECTIONS SIDE BY SIDE */}
//           <div className="flex gap-4">
//             {mobileSections.slice(0, 2).map((section, idx) => (
//               <div key={section.id} className="w-1/2">
//                 {idx === 1 && (
//                   <h3 className="footer-title-mobile font-oswald-medium">
//                     {section.title}
//                   </h3>
//                 )}

//                 {section.type === "quickLinks" ? (
//                   <div className="footer-quick-links font-oswald-medium">
//                     {section.links?.map((link) => (
//                       <Link key={link.text} to={link.url}>
//                         {link.text}
//                       </Link>
//                     ))}
//                   </div>
//                 ) : (
//                   section.links?.map((link) =>
//                     link.url.startsWith("/") ? (
//                       <p key={link.text}>
//                         <Link to={link.url}>{link.text}</Link>
//                       </p>
//                     ) : (
//                       <p key={link.text}>
//                         <a href={link.url} target="_blank" rel="noreferrer">
//                           {link.text}
//                         </a>
//                       </p>
//                     )
//                   )
//                 )}
//               </div>
//             ))}
//           </div>

//           {/* REMAINING SECTIONS NORMAL STACK */}
//           {mobileSections.slice(2).map((section) => (
//             <div key={section.id} className="mt-6">
//               <h3 className="footer-title-mobile font-oswald-medium">
//                 {section.title}
//               </h3>

//               {/* GROUPS */}
//               {section.groups?.length
//                 ? section.groups.map((g) => (
//                     <div key={g.groupTitle} className="footer-group">
//                       <p className="footer-group-title">{g.groupTitle}</p>

//                       <ul className="footer-list-group">
//                         {g.links.map((link) => (
//                           <li key={link.text} className="links">
//                             {link.url.startsWith("/") ? (
//                               <Link to={link.url}>{link.text}</Link>
//                             ) : (
//                               <a
//                                 href={link.url}
//                                 target="_blank"
//                                 rel="noreferrer"
//                               >
//                                 {link.text}
//                               </a>
//                             )}
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                   ))
//                 : /* NORMAL LINKS */
//                   section.links?.map((link) =>
//                     link.url.startsWith("/") ? (
//                       <p key={link.text}>
//                         <Link to={link.url}>{link.text}</Link>
//                       </p>
//                     ) : (
//                       <p key={link.text}>
//                         <a href={link.url} target="_blank" rel="noreferrer">
//                           {link.text}
//                         </a>
//                       </p>
//                     )
//                   )}
//             </div>
//           ))}
//         </div>

//         <div className="footer-socials-mobile">
//           {footer.socials?.map((s) => {
//             const Icon = iconMap[s.icon];
//             return (
//               <a key={s.icon} href={s.url} target="_blank" rel="noreferrer">
//                 <Icon />
//               </a>
//             );
//           })}
//         </div>

//         <div className="footer-address-mobile">
//           <p className="text-yellow-400">ADDRESS</p>
//           {footer.address?.lines?.map((line, i) => (
//             <p key={i}>{line}</p>
//           ))}
//         </div>

//         <p className="footer-bottom mt-8">{footer.copyright}</p>
//       </footer>
//     </>
//   );
// };

// export default Footer;

import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "../styles/components/footer.css";

const API_BASE = "https://convomax.com/admin_dmiher";

const Footer = () => {
  const [footer, setFooter] = useState(null);

  useEffect(() => {
    fetch(`${API_BASE}/api/menus/Footer`)
      .then(res => res.json())
      .then(res => {
        const data = res?.data || {};

        /* ================= COL 1 ================= */
        const col1 = data.Footer?.COL1 || {};

        const logo = col1.items?.[0]?.image || null;
        const address =
          col1.items?.[0]?.description?.split("\n") || [];

        const contactTitle = col1.contact?.title || "";
        const contactValue =
          col1.contact?.items?.[0]?.description || "";

        const emailTitle = col1.email?.title || "";
        const emailValue =
          col1.email?.items?.find(i => i.description)
            ?.description?.trim() || "";

        const socials =
          col1.email?.items?.filter(i => i.icon && i.slug) || [];

        /* ================= COL 2 ================= */
        const programs = data.Footer?.COL2?.programs || {};
        const terms = data.Footer?.COL2?.["T&C"] || {};

        /* ================= COL 3 ================= */
        const col3 = data.Footer?.COL3 || {};
        const colleges = col3.college || {};
        const otherLinks = col3.items || [];

        /* ================= COL 4 ================= */
        const importantLinks =
          data.Footer?.COL4?.important_links || {};

        /* ================= BOTTOM ================= */
        const copyright =
          data.Bottom?.Bottom?.items?.[0]?.description || "";

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
              <img
                src={footer.logo}
                alt="Logo"
                className="footer-logo"
              />
            )}

            <p className="footer-address">
              {footer.address.map((line, i) => (
                <span key={i}>
                  {line}<br />
                </span>
              ))}
            </p>

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
                {footer.socials.map(item => (
                  <a
                    key={item.id}
                    href={item.slug}
                    target="_blank"
                    rel="noreferrer"
                  >
                    <img className="footer-icons" src={`${API_BASE}/storage/${item.icon}`} alt={item.title} />
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* ===== COL 2 ===== */}
          <div className="footer-col">
            <h3 className="footer-title">{footer.programs.title}</h3>
            <ul className="mb-2">
              {footer.programs.items?.map(item => (
                <li className="mt-1" key={item.id}>
                  <SafeLink to={item.slug}>{item.title}</SafeLink>
                </li>
              ))}
            </ul>

            <h3 className="footer-title">{footer.terms.title}</h3>
            <ul>
              {footer.terms.items?.map(item => (
                <li className="mt-1" key={item.id}>
                  <SafeLink to={item.slug}>{item.title}</SafeLink>
                </li>
              ))}
            </ul>
          </div>

          {/* ===== COL 3 ===== */}
          <div className="footer-col">
            <h3 className="footer-title">{footer.colleges.title}</h3>

            {Object.entries(footer.colleges.campus || {}).map(
              ([campus, list]) => (
                <div key={campus} className="footer-campus">
                  <strong className="mt-2">{campus}</strong>
                  <ul className="list-disc ml-5">
                    {list
                      .sort((a, b) => a.sort_order - b.sort_order)
                      .map(item => (
                        <li className="mt-1" key={item.id}>
                          <SafeLink to={item.slug}>{item.title}</SafeLink>
                        </li>
                      ))}
                  </ul>
                </div>
              )
            )}

            {footer.otherLinks.length > 0 && (
              <ul className="footer-subtitle font-oswald-medium grid grid-cols-2 gap-3 mt-4">
                {footer.otherLinks.map(item => (
                  <li key={item.id}>
                    <SafeLink to={item.slug}>{item.title}</SafeLink>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {/* ===== COL 4 ===== */}
          <div className="footer-col">
            <h3 className="footer-title">{footer.importantLinks.title}</h3>
            <ul>
              {footer.importantLinks.items?.map(item => (
                <li key={item.id}>
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
        <p className="footer-bottom">{footer.copyright}</p>
      </footer>
    </>
  );
};

export default Footer;
