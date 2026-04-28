import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import { usePages } from "../hooks/usePages";
import { SECTION_COMPONENTS as INSTITUTE_SECTIONS } from "../sections/Institute";
import { SECTION_COMPONENTS as MAIN_SECTIONS } from "../sections/MainPageSections";

const SECTION_COMPONENTS = {
  ...INSTITUTE_SECTIONS,
  ...MAIN_SECTIONS,
};

function InstitutePage() {
  const { slug } = useParams();
  const { data: institute, isLoading, error } = usePages(slug);

  if (isLoading) {
    return (
      <div className="page-loading">
        <p>Loading...</p>
      </div>
    );
  }

  if (error || !institute) {
    return (
      <>
        <Helmet>
          <title>Page Not Found</title>
          <meta name="robots" content="noindex" />
        </Helmet>
        <div className="error-boundary-fallback">
          <p className="error-boundary-text">Page Not Found</p>
        </div>
      </>
    );
  }

  const meta = institute.meta || {};
  const title = meta.title || institute.name || "Institute Page";
  const description = meta.description || "";
  const keywords = meta.keywords || "";

  return (
    <>
      <Helmet>
        <title>{title}</title>
        {description && <meta name="description" content={description} />}
        {keywords && <meta name="keywords" content={keywords} />}
        <meta property="og:title" content={title} />
        {description && <meta property="og:description" content={description} />}
        <meta property="og:type" content="website" />
      </Helmet>

      <div>
        {institute.sections?.map((sec, idx) => {
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
