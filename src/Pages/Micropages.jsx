import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { SECTION_COMPONENTS as Micropages } from "../sections/Micropages"

const SECTION_COMPONENTS = {
  ...Micropages
};

function Micropages({ institutes }) {
  const { slug } = useParams();

  const institute = institutes.find((inst) => inst.slug === slug);

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

  const { meta = {}, name } = institute;

  const metaTitle = meta.title || `${name} | Official Website`;

  const metaDescription = meta.description || `Official website of ${name}`;

  const metaKeywords = meta.keywords || "";

  return (
    <>
      <Helmet>
        <title>{metaTitle}</title>

        <meta name="description" content={metaDescription} />
        {metaKeywords && <meta name="keywords" content={metaKeywords} />}

        <meta property="og:title" content={metaTitle} />
        <meta property="og:description" content={metaDescription} />
        <meta property="og:type" content="website" />

        <link
          rel="canonical"
          href={`${window.location.origin}/institute/${slug}`}
        />
      </Helmet>

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

export default Subpages;
