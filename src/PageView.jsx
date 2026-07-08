import { Suspense, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { usePages } from "./hooks/usePages";
import { useIndependentPages } from "./hooks/useIndependentPages";
import { useSubpage } from "./hooks/useSubpages";

import { SECTION_COMPONENTS as MainPageSections } from "./sections/MainPageSections";
import { SECTION_COMPONENTS as InstituteSections } from "./sections/Institute";
import { SECTION_COMPONENTS as SubpagesSections } from "./sections/Subpages";
import { SECTION_COMPONENTS as MicropageSections } from "./sections/Micropages";
import { SECTION_COMPONENTS as SELSCSections } from "./sections/SELSC";
import { SECTION_COMPONENTS as MuseumSections } from "./sections/Museum";
import { SECTION_COMPONENTS as CadWetLabSections } from "./sections/CadWetLab";

import ErrorBoundary from "./components/ErrorBoundary";
import PageSkeleton from "./components/Skeletons/PageSkeleton";

const SECTION_COMPONENTS = {
  ...MainPageSections,
  ...InstituteSections,
  ...SubpagesSections,
  ...MicropageSections,
  ...SELSCSections,
  ...MuseumSections,
  ...CadWetLabSections,
};

function PageView() {
  const params = useParams();

  /* ================= ROUTE FLAGS ================= */
  const isMicropage = params.college && params.page;

  /* ================= SLUG LOGIC ================= */
  // Lowercase the URL params so /SHER, /Sher, /sher all resolve to the same
  // DB row. Backend slugs are stored lowercase, so matching is case-sensitive
  // without this normalisation.
  const lc = (v) => (typeof v === "string" ? v.toLowerCase() : v);
  const slug = lc(params.slug) || lc(params.page) || "home";
  const microSlug = isMicropage ? lc(params.page) : null;
  const collegeSlug = lc(params.college) || null;

  /* ================= QUERIES ================= */
  const pageQuery = usePages(!isMicropage ? slug : null);

  // Section-dependent subpages load from /micropage/{college}/{page}.
  const subpageQuery = useSubpage(
    isMicropage ? collegeSlug : null,
    isMicropage ? microSlug : null
  );

  // Independent-pages is ONLY a fallback for genuine independent pages on this
  // route. It is enabled solely after the micropage query has settled with no
  // data — so section-dependent subpages resolve from /micropage/ and never
  // trigger an /independent-pages/ request.
  const subpageHasNoData =
    isMicropage &&
    !subpageQuery?.isLoading &&
    !(subpageQuery?.data?.sections?.length > 0);

  // Independent-page slugs preserve their original case (e.g.
  // "Chancellor-message", "Autonomous-Cells") and the API lookup is
  // case-sensitive — so fall back with the un-lowercased param, otherwise the
  // lowercased form 404s and the page shows "Page not found". Regular pages /
  // micropages stay lowercase (handled by their own queries above).
  const micropageQuery = useIndependentPages(
    subpageHasNoData ? params.page : null
  );

  /* ================= RESOLVE ================= */
  let resolvedPage = null;

  if (isMicropage) {
    // College-scoped micropage wins; independent-pages is fallback only.
    if (subpageQuery?.data?.sections?.length > 0) {
      resolvedPage = subpageQuery.data;
    } else if (micropageQuery?.data?.sections?.length > 0) {
      resolvedPage = micropageQuery.data;
    }
  } else {
    resolvedPage = pageQuery?.data;
  }

  /* ================= SECTION DEEP-LINK SCROLL =================
     Honours a "#<section-id>" hash in the URL or a pending cross-page
     scroll set by a menu/topbar Section link (see Navbar). Sections are
     lazy-loaded, so we poll briefly until the target element mounts. */
  useEffect(() => {
    if (typeof window === "undefined") return;

    const pending = sessionStorage.getItem("dm_pending_scroll");
    const hashId = window.location.hash
      ? decodeURIComponent(window.location.hash.slice(1))
      : null;
    const targetId = pending || hashId;
    if (!targetId) return;

    let tries = 0;
    let timer;
    const tick = () => {
      const el = document.getElementById(targetId);
      if (el) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
        sessionStorage.removeItem("dm_pending_scroll");
        return;
      }
      if (tries++ < 40) timer = setTimeout(tick, 100); // wait up to ~4s for lazy sections
    };
    tick();

    return () => clearTimeout(timer);
  }, [resolvedPage]);

  /* ================= LOADING ================= */
  // Keep skeleton until we have data OR both queries have settled.
  // Using && before meant: if micropageQuery finished with 404 (fast)
  // while subpageQuery was still loading, isLoading became false too
  // early and the page flashed "No data available".
  const isLoading = isMicropage
    ? !resolvedPage && (micropageQuery?.isLoading || subpageQuery?.isLoading)
    : pageQuery?.isLoading;

  if (isLoading) return <PageSkeleton />;

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

        // Sections beyond the first are almost always off-screen at first
        // paint. `content-visibility: auto` (applied via .page-section-defer)
        // tells the browser to skip layout/paint for them until they scroll
        // near — biggest single perf win for long pages that isn't a rewrite.
        // First section (hero) stays fully rendered so LCP isn't deferred.
        const deferPaint = index > 0;
        return (
          <ErrorBoundary key={`${sec.section_id}-${index}`}>
            {/* page_section_id is the section's unique anchor id — lets menu /
                topbar "Section" links scroll directly here. */}
            <section
              id={sec.page_section_id || undefined}
              className={deferPaint ? "page-section-defer" : undefined}
            >
              {/* Sections are code-split (React.lazy) — Suspense lets each one
                  stream in as its chunk arrives without blocking the rest. */}
              <Suspense fallback={null}>
                <SectionComponent
                  data={sec.data}
                  college={params.college || params.slug}
                  pageSlug={params.college || params.slug}
                />
              </Suspense>
            </section>
          </ErrorBoundary>
        );
      })}
    </main>
  );
}

export default PageView;
