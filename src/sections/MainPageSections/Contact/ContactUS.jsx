import React, { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as Fa6Icons from "react-icons/fa6";

/* =========================================================
   FA ICON RESOLVER
   Converts an API icon string (e.g. "map-pin") into a
   react-icons Font Awesome component (e.g. FaMapPin).
   Falls back between fa6 → fa, then to a provided default.
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

  /* =========================================================
     API ADAPTER
     Maps the latest API payload into the shape this component
     was originally written against. Keeps UI / JSX untouched.
     API shape:
       {
         tabs: [{ tab_type, contact[], admission[], map_url }],
         important_contacts: [{ name, email }],
         hospitals: [{ tab_type, heading, address }]
       }
  ========================================================= */
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

  // Top "admission" block pulled from main tab's admission[0]
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

  // Tab-keyed contact info consumed by the existing JSX
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

  // Small helper to detect/render HTML strings coming from the API
  const renderHtml = (value) => ({ __html: value || "" });
  const isHtml = (value) =>
    typeof value === "string" && /<\/?[a-z][\s\S]*>/i.test(value);

  // Extracts a clean URL from whatever the API ships in `map_url`.
  // Handles: plain URL, full <iframe> HTML, and HTML-entity-encoded strings.
  const extractMapUrl = (raw) => {
    if (!raw || typeof raw !== "string") return "";
    let value = raw.trim();

    // Decode HTML entities FIRST so the regex sees real quotes.
    value = value
      .replace(/&amp;/g, "&")
      .replace(/&quot;/g, '"')
      .replace(/&#39;/g, "'")
      .replace(/&lt;/g, "<")
      .replace(/&gt;/g, ">")
      .trim();

    // If it's an <iframe ...> HTML snippet, pull out the src attribute.
    if (value.toLowerCase().includes("<iframe")) {
      const quoted = value.match(/src\s*=\s*["']([^"']+)["']/i);
      if (quoted && quoted[1]) {
        value = quoted[1].trim();
      } else {
        // Fallback: grab any URL that looks like a Google Maps link
        const urlMatch = value.match(
          /https?:\/\/[^\s"'<>]*google\.[^/\s]*\/maps[^\s"'<>]*/i,
        );
        if (urlMatch) value = urlMatch[0];
      }
    }

    // Safety: if extraction failed and we still have an HTML blob,
    // return empty so we never feed garbage into an href / iframe src.
    if (value.startsWith("<")) return "";
    return value;
  };

  // Returns a URL safe to use as an <iframe src>. Embed URLs pass through;
  // anything else (shortlink / place / search) is wrapped so Google's
  // server resolves it into an embeddable tile.
  const toMapEmbedUrl = (raw) => {
    const value = extractMapUrl(raw);
    if (!value) return "";
    if (value.includes("google.") && value.includes("/maps/embed")) {
      return value;
    }
    return `https://maps.google.com/maps?q=${encodeURIComponent(value)}&output=embed`;
  };

  // Shared section heading — matches the admission heading style so all
  // headings across the page look identical.
  const SectionHeading = ({ children }) => (
    <h2 className="text-3xl md:text-4xl uppercase font-[500] text-[#707070] pt-20 mb-4 tracking-wider font-oswald-medium">
      <hr className="w-16 sm:w-20 border-[#F04E30] mb-4 border-t-4" />
      {children}
    </h2>
  );

  return (
    <>
      {/* ================= 1. CONTACT TABS ================= */}
      <div className="w-full container bg-white px-6 md:px-40 py-16">
        <div className="flex max-w-4xl mx-auto justify-center mb-10">
          <div className="w-[90%] border-b border-gray-400 flex justify-center">
            <button
              onClick={() => setActiveTab("main")}
              className={`px-6 py-2 font-semibold ${
                activeTab === "main"
                  ? "border-b-4 border-red-500 text-red-600"
                  : "text-gray-600"
              }`}
            >
              Main Campus
            </button>
            <button
              onClick={() => setActiveTab("off")}
              className={`px-6 py-2 font-semibold ${
                activeTab === "off"
                  ? "border-b-4 border-red-500 text-red-600"
                  : "text-gray-600"
              }`}
            >
              Off Campus
            </button>
          </div>
        </div>

        {["main", "off"].map(
          (tab) =>
            activeTab === tab && (
              <div key={tab} className="flex flex-col items-center">
                <div className="grid max-w-4xl md:grid-cols-3 gap-6 text-center mb-10 w-full">
                  <div className="flex flex-col items-center">
                    <DynamicIcon
                      name={contact_tabs[tab].address_icon}
                      fallback={Fa6Icons.FaMapPin}
                      className="w-10 h-10 text-gray-700 mb-2"
                    />

                    {isHtml(contact_tabs[tab].address) ? (
                      <div
                        className="text-gray-600 mt-1"
                        dangerouslySetInnerHTML={renderHtml(
                          contact_tabs[tab].address,
                        )}
                      />
                    ) : (
                      <p className="text-gray-600 mt-1">
                        {contact_tabs[tab].address}
                      </p>
                    )}
                  </div>

                  <div className="flex flex-col items-center border-l border-r px-4">
                    <DynamicIcon
                      name={contact_tabs[tab].email_icon}
                      fallback={Fa6Icons.FaEnvelope}
                      className="w-10 h-10 text-gray-700 mb-2"
                    />

                    <p className="text-gray-600 mt-1">
                      {contact_tabs[tab].email}
                    </p>
                  </div>

                  <div className="flex flex-col items-center">
                    <DynamicIcon
                      name={contact_tabs[tab].phone_icon}
                      fallback={Fa6Icons.FaPhone}
                      className="w-10 h-10 text-gray-700 mb-2"
                    />

                    <p className="text-gray-600 mt-1">
                      {contact_tabs[tab].phone}
                    </p>
                  </div>
                </div>

                {(() => {
                  const embedSrc = toMapEmbedUrl(contact_tabs[tab].map);
                  if (!embedSrc) return null;
                  return (
                    <div className="w-full h-[400px]">
                      <iframe
                        src={embedSrc}
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        className="shadow"
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
      <div className="bg-[#f4f4f4] pb-10">
        <div className="container pb-10">
          <div className="mb-10">
            <SectionHeading>{admission_section.title}</SectionHeading>
          </div>

          <div className="grid md:grid-cols-3 gap-6 text-center md:text-left items-stretch">
            <div className="flex flex-col items-center md:items-start border-b pb-5 md:border-b-0 px-6 md:border-r border-gray-400 h-full">
              <DynamicIcon
                name={admission_section.address_icon}
                fallback={Fa6Icons.FaMapPin}
                className="text-gray-700 mb-2 w-10 h-10"
              />

              {isHtml(admission_section.address) ? (
                <div
                  className="text-gray-600 mt-1"
                  dangerouslySetInnerHTML={renderHtml(
                    admission_section.address,
                  )}
                />
              ) : (
                <p className="text-gray-600 mt-1">
                  {admission_section.address}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center md:items-start px-6 border-b pb-5 md:border-b-0 md:border-r border-gray-400 h-full">
              <DynamicIcon
                name={admission_section.email_icon}
                fallback={Fa6Icons.FaEnvelope}
                className="text-gray-700 mb-2 w-10 h-10"
              />

              <a
                href={`mailto:${admission_section.email}`}
                className="text-gray-600 mt-1 hover:underline"
              >
                {admission_section.email}
              </a>
            </div>

            <div className="flex flex-col items-center md:items-start px-6 h-full">
              <DynamicIcon
                name={admission_section.phone_icon}
                fallback={Fa6Icons.FaPhone}
                className="text-gray-700 mb-2 w-10 h-10"
              />

              <a
                href={`tel:${admission_section.phone}`}
                className="text-gray-600 mt-1"
              >
                {admission_section.phone}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* ================= 3. IMPORTANT CONTACTS ================= */}
      <div className="container pb-16">
        <SectionHeading>IMPORTANT CONTACTS</SectionHeading>

        {/* Desktop: two columns — names | emails */}
        <div className="hidden md:grid md:grid-cols-2 gap-4">
          <div className="space-y-2 text-sm leading-relaxed">
            {importantContacts.map((item, i) => (
              <p key={i}>{item.name}</p>
            ))}
          </div>

          <div className="space-y-3 text-sm text-blue-600 underline">
            {importantContacts.map((item, i) => (
              <p key={i}>{item.email}</p>
            ))}
          </div>
        </div>

        {/* Mobile: stacked name-then-email pairs */}
        <div className="md:hidden grid gap-4 text-sm leading-relaxed">
          {importantContacts.map((person, idx) => (
            <div key={idx} className="space-y-1">
              <p>{person.name}</p>
              <p className="text-blue-600 underline break-all">
                {person.email}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* ================= 4. HOSPITALS ================= */}
      <div className="container pb-20">
        <SectionHeading>
          {hospitals[activeTab].name || "HOSPITALS"}
        </SectionHeading>

        <div>
          {isHtml(hospitals[activeTab].address) ? (
            <div
              className="text-gray-600 mt-2"
              dangerouslySetInnerHTML={renderHtml(hospitals[activeTab].address)}
            />
          ) : (
            <p className="text-gray-600 mt-2">
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
