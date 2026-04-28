import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet-async";

import ErrorBoundary from "../components/ErrorBoundary";
import PageSkeleton from "../components/Skeletons/PageSkeleton";

import {
  MandatoryDisclosureSection,
  useMandatoryDisclosure,
} from "../instituteSections/mandatoryDisclosure";

/**
 * Standalone route page for `/:college/mandatory-disclosure`.
 *
 * Per requirement #6, this route does NOT render the UI component
 * independently — it routes through the InstituteSections module
 * (MandatoryDisclosureSection), which centralizes the mapping layer
 * and guarantees the same render path used by PageView's dynamic
 * SECTION_COMPONENTS lookup.
 */
function MandatoryDisclosurePage() {
  const { college, nestedPage } = useParams();

  const { data, isLoading, isError } = useMandatoryDisclosure(
    college,
    nestedPage
  );

  if (!college) {
    return (
      <div className="error-boundary-fallback">
        <p className="error-boundary-text">Page not found</p>
      </div>
    );
  }

  if (isLoading) return <PageSkeleton />;

  if (isError) {
    return (
      <div className="error-boundary-fallback">
        <p className="error-boundary-text">Page not found</p>
      </div>
    );
  }

  if (!data || !data.items?.length) {
    return (
      <div className="error-boundary-fallback">
        <p className="error-boundary-text">No data available</p>
      </div>
    );
  }

  return (
    <main className="fade-in">
      <Helmet>
        <title>{data.title || "Mandatory Disclosures"}</title>
        <meta
          property="og:title"
          content={data.title || "Mandatory Disclosures"}
        />
      </Helmet>

      <ErrorBoundary>
        <section>
          <MandatoryDisclosureSection data={data} college={college} />
        </section>
      </ErrorBoundary>
    </main>
  );
}

export default MandatoryDisclosurePage;
