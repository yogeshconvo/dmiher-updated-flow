import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { SECTION_COMPONENTS as INSTITUTE_SECTIONS } from "../sections/Institute";
import { SECTION_COMPONENTS as MAIN_SECTIONS } from "../sections/MainPageSections";
import { useState } from "react";
const SECTION_COMPONENTS = {
  ...INSTITUTE_SECTIONS,
  ...MAIN_SECTIONS,
};

function InstitutePage({ institutes }) {
  const { slug } = useParams();

  const institute = institutes.find((inst) => inst.slug === slug);
  

  if (!institute) {
    return (
      <>
        <Helmet>
          <title>{metaTitle}</title>
          <meta name="robots" content="noindex" />
          <meta name="description" content={metaDescription} />
          <meta name="keywords" content={metaKeywords} />
          <meta property="og:title" content={metaTitle} />
          <meta property="og:description" content={metaDescription} />
          <meta property="og:type" content="website" />
        </Helmet>
        {/* <div>Institute not found</div> */}
      </>
    );
  }

  const { meta = {} } = institute;

  const {
    title = institute.name || "Institute Page",
    keywords = "",
    description = "",
  } = meta;

  return (
    <>
      <Helmet>
        <title>{title}</title>

        {description && <meta name="description" content={description} />}

        {keywords && <meta name="keywords" content={keywords} />}

        <meta property="og:title" content={title} />
        <meta property="og:description" content={description} />
        <meta property="og:type" content="website" />
      </Helmet>

      <div>
        {institute.sections.map((sec, idx) => {
          const Comp = SECTION_COMPONENTS[sec.section_id];
          if (!Comp) return null;

          return (
            <Comp
              key={sec.section_id + "-" + idx}
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
