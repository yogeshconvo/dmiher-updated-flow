import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import {
  Users,
  Box,
  Play,
  Smartphone,
  UserCheck,
  BarChart3,
  UserRound,
  MapPin,
  Star,
} from "lucide-react";

import resolveImage from "../../utils/resolveImage";
import ViewMoreButton from "../../components/UI/Buttons";

/**
 * SAHS Collaborations
 * ----------------------------------------------------------------------
 * Dedicated section for SAHS (Allied Health Sciences) — Wardha & Nagpur.
 * Mirrors the live-site `sections/SAHS/Collaborations.jsx` exactly:
 *   - "Your Gateway to a Global Healthcare Career" title
 *   - "COLLABORATIONS" sub-heading + intro paragraph
 *   - National Developmental Partners (autoplay swiper, 5/view)
 *   - International Developmental Partners (flex-wrap grid w/ name labels)
 *   - "Max Healthcare Education Advantage" panel (Wardha-only via
 *     data.show_max_healthcare = true) — 8 feature cards + right-side blurb
 *
 * Data shape (camel/snake_case both accepted):
 * {
 *   heading, sub_heading, description,
 *   national_partners: [{ name, logo }],
 *   international_partners: [{ name, logo }],
 *   show_max_healthcare: bool,
 *   max_healthcare: {
 *     title, subtitle,
 *     features: [{ icon, title, bg_color }],
 *     partner_label, description, cta_label, cta_link
 *   }
 * }
 */

// Lucide icon-name → component map (icon stored as string in CMS).
const ICON_MAP = {
  users: Users,
  box: Box,
  play: Play,
  smartphone: Smartphone,
  "user-check": UserCheck,
  "bar-chart-3": BarChart3,
  "user-round": UserRound,
  "map-pin": MapPin,
  star: Star,
};

const FeatureCard = ({ icon, title, bg_color }) => {
  const Icon = ICON_MAP[(icon || "star").toLowerCase()] || Star;
  return (
    <div
      className={`${bg_color || "bg-rose-200"} sahs-collab-feature rounded-lg p-6 flex flex-col items-center text-center h-44 justify-center`}
    >
      <div className="sahs-collab-feature-icon bg-white rounded-lg p-4 mb-4 shadow-md">
        <Icon className="w-8 h-8 text-teal-500" />
      </div>
      <h3 className="text-gray-800 font-medium text-base leading-tight">
        {title}
      </h3>
    </div>
  );
};

export default function SAHSCollaborations({ data }) {
  if (!data) return null;

  const heading = data.heading || "Your Gateway to a Global Healthcare Career";
  const subHeading = data.sub_heading || "Collaborations";
  const description = data.description || "";
  const nationalPartners = Array.isArray(data.national_partners)
    ? data.national_partners
    : [];
  const internationalPartners = Array.isArray(data.international_partners)
    ? data.international_partners
    : [];
  const showMax = !!data.show_max_healthcare;
  const max = data.max_healthcare || {};
  const features = Array.isArray(max.features) ? max.features : [];

  return (
    <section className="sahs-collab-section bg-[#f7fafd] py-20">
      <h1 className="sahs-collab-title text-2xl sm:text-3xl md:text-4xl font-[500] font-oswald-medium text-[#58595B] uppercase leading-snug mb-6 text-center">
        {heading}
      </h1>

      <div className="container">
        {/* Sub-heading + intro */}
        <div className="mb-12">
          <h2 className="sahs-collab-heading text-3xl md:text-4xl font-[500] text-[#707070] uppercase font-oswald-medium leading-tight">
            <hr className="w-16 sm:w-20 border-[#F04E30] mb-4 border-t-4" />
            {subHeading}
          </h2>
          {description && (
            <p
              className="sahs-collab-description mt-3 text-base text-[#707070] font-[Arial] max-w-2xl"
              dangerouslySetInnerHTML={{ __html: description }}
            />
          )}
        </div>

        {/* National Partners */}
        {nationalPartners.length > 0 && (
          <div className="mb-14">
            <h3 className="sahs-collab-partners-heading text-xl sm:text-2xl font-bold text-[#122E5E] mb-6 text-center">
              National Developmental Partners
            </h3>
            <Swiper
              modules={[Autoplay, Pagination]}
              style={{ paddingBottom: "3rem", cursor: "grab" }}
              slidesPerView={5}
              loop={nationalPartners.length > 5}
              autoplay={{ delay: 1800, disableOnInteraction: false }}
              pagination={{ clickable: true }}
              breakpoints={{
                0: { slidesPerView: 2 },
                480: { slidesPerView: 2 },
                640: { slidesPerView: 3 },
                1024: { slidesPerView: 5 },
              }}
            >
              {nationalPartners.map((p, idx) => (
                <SwiperSlide key={idx} className="pb-5">
                  <div className="flex flex-col items-center text-center">
                    <div className="rounded-lg flex items-center justify-center mb-2">
                      <img
                        src={resolveImage(p.logo)}
                        alt={p.name || ""}
                        className="sahs-collab-partner-logo h-20 w-auto object-contain"
                      />
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        )}

        {/* International Partners */}
        {internationalPartners.length > 0 && (
          <div className="mb-14">
            <h3 className="sahs-collab-partners-heading text-xl sm:text-2xl font-bold text-[#269BFF] mb-6 text-center">
              International Developmental Partners
            </h3>
            <div className="sahs-collab-intl-partners flex flex-wrap justify-center gap-8">
              {internationalPartners.map((p, idx) => (
                <div
                  key={idx}
                  className="flex flex-col items-center text-center"
                >
                  <div className="sahs-collab-intl-card bg-white rounded-lg shadow p-3 mb-2 flex items-center justify-center">
                    <img
                      src={resolveImage(p.logo)}
                      alt={p.name || ""}
                      className="h-20 object-contain mx-auto"
                    />
                  </div>
                  <span className="text-xs text-[#707070] font-semibold">
                    {p.name}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Max Healthcare Advantage (Wardha-only) */}
        {showMax && (
          <div className="sahs-collab-max bg-white rounded-xl shadow-lg px-4 md:px-8 py-10">
            <div className="text-center mb-10">
              <h1 className="sahs-collab-max-title text-4xl md:text-5xl font-bold text-blue-800 mb-2">
                {max.title || "Max Healthcare Education"}
              </h1>
              <h2 className="sahs-collab-max-subtitle text-3xl md:text-4xl font-bold text-teal-500">
                {max.subtitle || "Advantage"}
              </h2>
            </div>

            <div className="flex flex-col lg:flex-row gap-10 items-start">
              <div className="lg:w-3/5 w-full flex justify-center">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                  {features.map((f, i) => (
                    <FeatureCard
                      key={i}
                      icon={f.icon}
                      title={f.title}
                      bg_color={f.bg_color}
                    />
                  ))}
                </div>
              </div>

              <div className="lg:w-2/5 w-full">
                <h4 className="font-bold text-[#707070] text-lg mb-2">
                  {max.partner_label ||
                    "Skills and Knowledge Partner: Max Healthcare Education"}
                </h4>
                {max.description && (
                  <p
                    className="text-[#707070] text-sm mb-4"
                    dangerouslySetInnerHTML={{ __html: max.description }}
                  />
                )}
                {(max.cta_label || max.cta_link) && (
                  <div className="pt-2 flex justify-center">
                    <ViewMoreButton
                      label={max.cta_label || "Explore Programs"}
                      href={max.cta_link || "/programs"}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
