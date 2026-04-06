import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { usePages } from "./hooks/usePages";
import { useIndependentPages } from "./hooks/useIndependentPages";
import { useSubpage } from "./hooks/useSubpages";

import { SECTION_COMPONENTS as MainPageSections } from "./sections/MainPageSections";
import { SECTION_COMPONENTS as InstituteSections } from "./sections/Institute";
import { SECTION_COMPONENTS as SubpagesSections } from "./sections/Subpages";
import { SECTION_COMPONENTS as MicropageSections } from "./sections/Micropages";

import ErrorBoundary from "./components/ErrorBoundary";
import PageSkeleton from "./components/Skeletons/PageSkeleton";

const SECTION_COMPONENTS = {
  ...MainPageSections,
  ...InstituteSections,
  ...SubpagesSections,
  ...MicropageSections,
};

function PageView() {
  const params = useParams();

  /* ================= ROUTE FLAGS ================= */
  const isMicropage = params.college && params.page;

  /* ================= SLUG LOGIC ================= */
  const slug = params.slug || params.page || "home";
  const microSlug = isMicropage ? params.page : null;
  const collegeSlug = params.college || null;

  /* ================= QUERIES ================= */
  const pageQuery = usePages(!isMicropage ? slug : null);

  const micropageQuery = useIndependentPages(
    isMicropage ? microSlug : null
  );

  const subpageQuery = useSubpage(
    isMicropage ? collegeSlug : null,
    isMicropage ? microSlug : null
  );

  /* ================= LOADING ================= */
  const isLoading = isMicropage
    ? micropageQuery?.isLoading && subpageQuery?.isLoading
    : pageQuery?.isLoading;

  if (isLoading) return <PageSkeleton />;

  /* ================= RESOLVE ================= */
  let resolvedPage = null;

  if (isMicropage) {
    if (micropageQuery?.data?.sections?.length > 0) {
      resolvedPage = micropageQuery.data;
    } else if (subpageQuery?.data?.sections?.length > 0) {
      resolvedPage = subpageQuery.data;
    }
  } else {
    resolvedPage = pageQuery?.data;
  }

  /* ================= ERROR / EMPTY ================= */
  const hasError = isMicropage
    ? micropageQuery?.error && subpageQuery?.error
    : pageQuery?.error;

  if (hasError) {
    return (
      <div className="error-boundary-fallback">
        <p className="error-boundary-text">Page not found</p>
      </div>
    );
  }

  if (!resolvedPage) {
    return (
      <div className="error-boundary-fallback">
        <p className="error-boundary-text">No data available</p>
      </div>
    );
  }

  /* ================= SEO META ================= */
  const clean = (val) => (val && val !== "null" ? val : "");
  const meta = resolvedPage.meta || {};
  const pageTitle = clean(meta.title) || clean(resolvedPage.title) || "DMIHER";
  const pageDescription = clean(meta.description);

  /* ================= RENDER ================= */
  return (
    <main className="fade-in">
      <Helmet>
        <title>{pageTitle}</title>
        {pageDescription && (
          <meta name="description" content={pageDescription} />
        )}
        {clean(meta.keywords) && (
          <meta name="keywords" content={clean(meta.keywords)} />
        )}
        <meta property="og:title" content={pageTitle} />
        {pageDescription && (
          <meta property="og:description" content={pageDescription} />
        )}
      </Helmet>

      {resolvedPage.sections?.map((sec, index) => {
        const SectionComponent = SECTION_COMPONENTS[sec.section_id];
        if (!SectionComponent) return null;

        return (
          <ErrorBoundary key={`${sec.section_id}-${index}`}>
            <section>
              <SectionComponent
                data={sec.data}
                college={params.college || params.slug}
                pageSlug={params.college || params.slug}
              />
            </section>
          </ErrorBoundary>
        );
      })}
    </main>
  );
}

export default PageView;
