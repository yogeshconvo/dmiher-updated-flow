// src/pages/InstitutePage.jsx
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { SECTION_COMPONENTS as INSTITUTE_SECTIONS } from "../sections/Institute";
import { SECTION_COMPONENTS as MAIN_SECTIONS } from "../sections/MainPageSections";

// merge both section maps
const SECTION_COMPONENTS = {
  ...INSTITUTE_SECTIONS,
  ...MAIN_SECTIONS,
};

function InstitutePage({ institutes }) {
  const { slug } = useParams();

  const institute = institutes.find((inst) => inst.slug === slug);

  /* ================= NOT FOUND ================= */
  if (!institute) {
    return (
      <>
        <Helmet>
          <title>No Page Found</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div>No Page Found</div>
      </>
    );
  }

  /* ================= META DATA ================= */
  const {
    meta = {},
    name,
  } = institute;

  const metaTitle =
    meta.title || `${name} | Official Website`;

  const metaDescription =
    meta.description || `Official website of ${name}`;

  const metaKeywords =
    meta.keywords || "";

  return (
    <>
      {/* ================= SEO ================= */}
      <Helmet>
        <title>{metaTitle}</title>

        <meta name="description" content={metaDescription} />
        {metaKeywords && (
          <meta name="keywords" content={metaKeywords} />
        )}

        {/* Open Graph (recommended) */}
        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />

        {/* Optional but good */}
        <link
          rel="canonical"
          href={`${window.location.origin}/institute/${slug}`}
        />
      </Helmet>

      {/* ================= PAGE CONTENT ================= */}
      <div>
        {institute.sections.map((sec, idx) => {
          const Comp = SECTION_COMPONENTS[sec.section_id];
          if (!Comp) return null;

          return (
            <Comp
              key={`${sec.section_id}-${idx}`}
              data={sec.data}
              institute={institute}
              instituteSlug={institute.slug}
            />
          );
        })}
      </div>
    </>
  );
}

export default InstitutePage;
