import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";

/* =========================================================
   FA ICON RESOLVER
========================================================= */
const toFaName = (name) => {
  if (!name || typeof name !== "string") return null;
  return (
    "Fa" +
    name
      .split(/[-_\s]+/)
      .filter(Boolean)
      .map((s) => s.charAt(0).toUpperCase() + s.slice(1).toLowerCase())
      .join("")
  );
};

const resolveFaIcon = (name) => {
  const key = toFaName(name);
  if (!key) return null;
  return Fa6Icons[key] || FaIcons[key] || null;
};

const DynamicIcon = ({ name, fallback: Fallback, className }) => {
  const IconCmp = resolveFaIcon(name);
  if (IconCmp) return <IconCmp className={className} />;
  if (Fallback) return <Fallback className={className} />;
  return null;
};

export default function CombinedSection({ data }) {
  const [activeTab, setActiveTab] = useState("main");

  const tabsArray = Array.isArray(data?.tabs) ? data.tabs : [];
  const mainTab =
    tabsArray.find((t) => t?.tab_type === "main") || tabsArray[0] || {};
  const offTab =
    tabsArray.find((t) => t?.tab_type === "off") || tabsArray[1] || {};

  const hospitalsArray = Array.isArray(data?.hospitals) ? data.hospitals : [];
  const mainHospital =
    hospitalsArray.find((h) => h?.tab_type === "main") ||
    hospitalsArray[0] ||
    {};
  const offHospital =
    hospitalsArray.find((h) => h?.tab_type === "off") ||
    hospitalsArray[1] ||
    {};

  const importantContacts = Array.isArray(data?.important_contacts)
    ? data.important_contacts
    : [];

  const admission_section = {
    title: data?.admission_section?.title || "ADMISSIONS",
    address:
      mainTab?.admission?.[0]?.address ||
      data?.admission_section?.address ||
      "",
    email:
      mainTab?.admission?.[0]?.email || data?.admission_section?.email || "",
    phone:
      mainTab?.admission?.[0]?.phone || data?.admission_section?.phone || "",
    address_icon: mainTab?.admission?.[0]?.icon,
    email_icon: mainTab?.admission?.[0]?.email_icon,
    phone_icon: mainTab?.admission?.[0]?.phone_icon,
  };

  const contact_tabs = {
    main: {
      address: mainTab?.contact?.[0]?.address || "",
      email: mainTab?.contact?.[0]?.email || "",
      phone: mainTab?.contact?.[0]?.phone || "",
      map: mainTab?.map_url || "",
      address_icon: mainTab?.contact?.[0]?.icon,
      email_icon: mainTab?.contact?.[0]?.email_icon,
      phone_icon: mainTab?.contact?.[0]?.phone_icon,
    },
    off: {
      address: offTab?.contact?.[0]?.address || "",
      email: offTab?.contact?.[0]?.email || "",
      phone: offTab?.contact?.[0]?.phone || "",
      map: offTab?.map_url || "",
      address_icon: offTab?.contact?.[0]?.icon,
      email_icon: offTab?.contact?.[0]?.email_icon,
      phone_icon: offTab?.contact?.[0]?.phone_icon,
    },
  };

  const hospitals = {
    main: {
      name: mainHospital?.heading || "",
      address: mainHospital?.address || "",
      contact: mainHospital?.contact || "",
    },
    off: {
      name: offHospital?.heading || "",
      address: offHospital?.address || "",
      contact: offHospital?.contact || "",
    },
  };

  const renderHtml = (value) => ({ __html: value || "" });
  const isHtml = (value) =>
    typeof value === "string" && /<\/?[a-z][\s\S]*>/i.test(value);

  const extractMapUrl = (raw) => {
    if (!raw || typeof raw !== "string") return "";
    let value = raw.trim();

    value = value
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim();

    if (value.toLowerCase().includes("<iframe")) {
      const quoted = value.match(/src\s*=\s*["']([^"']+)["']/i);
      if (quoted && quoted[1]) {
        value = quoted[1].trim();
      } else {
        const urlMatch = value.match(
          /https?:\/\/[^\s"'<>]*google\.[^/\s]*\/maps[^\s"'<>]*/i,
        );
        if (urlMatch) value = urlMatch[0];
      }
    }

    if (value.startsWith("<")) return "";
    return value;
  };

  const toMapEmbedUrl = (raw) => {
    const value = extractMapUrl(raw);
    if (!value) return "";
    if (value.includes("google.") && value.includes("/maps/embed")) {
      return value;
    }
    return `https://maps.google.com/maps?q=${encodeURIComponent(value)}&output=embed`;
  };

  const SectionHeading = ({ children }) => (
    <h2 className="contact-section-heading">
      <hr className="contact-section-heading-line" />
      {children}
    </h2>
  );

  return (
    <>
      {/* ================= 1. CONTACT TABS ================= */}
      <div className="contact-tabs-wrapper">
        <div className="contact-tabs-row">
          <div className="contact-tabs-inner">
            <button
              onClick={() => setActiveTab("main")}
              className={`contact-tab-btn ${
                activeTab === "main"
                  ? "contact-tab-active"
                  : "contact-tab-inactive"
              }`}
            >
              Main Campus
            </button>
            <button
              onClick={() => setActiveTab("off")}
              className={`contact-tab-btn ${
                activeTab === "off"
                  ? "contact-tab-active"
                  : "contact-tab-inactive"
              }`}
            >
              Off Campus
            </button>
          </div>
        </div>

        {["main", "off"].map(
          (tab) =>
            activeTab === tab && (
              <div key={tab} className="contact-tab-content">
                <div className="contact-info-grid">
                  <div className="contact-info-item">
                    <DynamicIcon
                      name={contact_tabs[tab].address_icon}
                      fallback={Fa6Icons.FaMapPin}
                      className="contact-info-icon"
                    />

                    {isHtml(contact_tabs[tab].address) ? (
                      <div
                        className="contact-info-text"
                        dangerouslySetInnerHTML={renderHtml(
                          contact_tabs[tab].address,
                        )}
                      />
                    ) : (
                      <p className="contact-info-text">
                        {contact_tabs[tab].address}
                      </p>
                    )}
                  </div>

                  <div className="contact-info-item-bordered">
                    <DynamicIcon
                      name={contact_tabs[tab].email_icon}
                      fallback={Fa6Icons.FaEnvelope}
                      className="contact-info-icon"
                    />

                    <p className="contact-info-text">
                      {contact_tabs[tab].email}
                    </p>
                  </div>

                  <div className="contact-info-item">
                    <DynamicIcon
                      name={contact_tabs[tab].phone_icon}
                      fallback={Fa6Icons.FaPhone}
                      className="contact-info-icon"
                    />

                    <p className="contact-info-text">
                      {contact_tabs[tab].phone}
                    </p>
                  </div>
                </div>

                {(() => {
                  const embedSrc = toMapEmbedUrl(contact_tabs[tab].map);
                  if (!embedSrc) return null;
                  return (
                    <div className="contact-map-wrap">
                      <iframe
                        src={embedSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        className="contact-map-iframe"
                        loading="lazy"
                        referrerPolicy="no-referrer-when-downgrade"
                        allowFullScreen
                        title={`map-${tab}`}
                      />
                    </div>
                  );
                })()}
              </div>
            ),
        )}
      </div>

      {/* ================= 2. ADMISSION ================= */}
      <div className="contact-admission-section">
        <div className="contact-admission-inner">
          <div className="contact-admission-heading-wrap">
            <SectionHeading>{admission_section.title}</SectionHeading>
          </div>

          <div className="contact-admission-grid">
            <div className="contact-admission-item-first">
              <DynamicIcon
                name={admission_section.address_icon}
                fallback={Fa6Icons.FaMapPin}
                className="contact-admission-icon"
              />

              {isHtml(admission_section.address) ? (
                <div
                  className="contact-admission-link-plain"
                  dangerouslySetInnerHTML={renderHtml(
                    admission_section.address,
                  )}
                />
              ) : (
                <p className="contact-admission-link-plain">
                  {admission_section.address}
                </p>
              )}
            </div>

            <div className="contact-admission-item-mid">
              <DynamicIcon
                name={admission_section.email_icon}
                fallback={Fa6Icons.FaEnvelope}
                className="contact-admission-icon"
              />

              <a
                href={`mailto:${admission_section.email}`}
                className="contact-admission-link"
              >
                {admission_section.email}
              </a>
            </div>

            <div className="contact-admission-item-last">
              <DynamicIcon
                name={admission_section.phone_icon}
                fallback={Fa6Icons.FaPhone}
                className="contact-admission-icon"
              />

              <a
                href={`tel:${admission_section.phone}`}
                className="contact-admission-link-plain"
              >
                {admission_section.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3. IMPORTANT CONTACTS ================= */}
      <div className="contact-important-section">
        <SectionHeading>IMPORTANT CONTACTS</SectionHeading>

        {/* Desktop: two columns */}
        <div className="contact-important-grid-desktop">
          <div className="contact-important-names">
            {importantContacts.map((item, i) => (
              <p key={i}>{item.name}</p>
            ))}
          </div>

          <div className="contact-important-emails">
            {importantContacts.map((item, i) => (
              <p key={i}>{item.email}</p>
            ))}
          </div>
        </div>

        {/* Mobile */}
        <div className="contact-important-grid-mobile">
          {importantContacts.map((person, idx) => (
            <div key={idx} className="contact-important-mobile-item">
              <p>{person.name}</p>
              <p className="contact-important-mobile-email">
                {person.email}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= 4. HOSPITALS ================= */}
      <div className="contact-hospital-section">
        <SectionHeading>
          {hospitals[activeTab].name || "HOSPITALS"}
        </SectionHeading>

        <div>
          {isHtml(hospitals[activeTab].address) ? (
            <div
              className="contact-hospital-text"
              dangerouslySetInnerHTML={renderHtml(hospitals[activeTab].address)}
            />
          ) : (
            <p className="contact-hospital-text">
              {hospitals[activeTab].contact && (
                <>
                  Contact: {hospitals[activeTab].contact}
                  <br />
                </>
              )}
              Address: {hospitals[activeTab].address}
            </p>
          )}
        </div>
      </div>
    </>
  );
}
