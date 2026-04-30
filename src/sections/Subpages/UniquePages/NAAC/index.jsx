import React, { useMemo, useState } from "react";

import Banner from "./components/Banner";
import Tabs from "./components/Tabs";
import CriterionContent from "./components/CriterionContent";
import { mapNaacSectionData } from "./mappers/naacMapper";
import { useIndependentPages } from "../../../../hooks/useIndependentPages";

/**
 * NAAC SSR section component.
 *
 * Two render modes:
 *  1. Driven by `data` prop (the standard PageView flow — recommended).
 *  2. Standalone fallback that fetches `/independent-pages/{slug}` itself
 *     via the shared `useIndependentPages` hook, kept for backward
 *     compatibility with any direct route mounts.
 */
const NaacSSR = ({ data: rawData, slug = "naac" }) => {
  const hasInjectedData =
    rawData && typeof rawData === "object" && Object.keys(rawData).length > 0;

  const {
    data: fetchedPage,
    isLoading,
    isError,
  } = useIndependentPages(hasInjectedData ? null : slug);

  const fallbackSection = useMemo(() => {
    if (hasInjectedData || !fetchedPage) return null;
    const sections = Array.isArray(fetchedPage.sections)
      ? fetchedPage.sections
      : [];
    const naacSection = sections.find(
      (sec) => sec?.section_id === "naac_ssr_micropage"
    );
    return naacSection?.data || null;
  }, [hasInjectedData, fetchedPage]);

  const sourceData = hasInjectedData ? rawData : fallbackSection;
  const mapped = useMemo(() => mapNaacSectionData(sourceData || {}), [sourceData]);

  const { banner, criteria } = mapped;

  const [activeTab, setActiveTab] = useState(null);

  const activeKey = useMemo(() => {
    if (!criteria.length) return null;
    if (activeTab && criteria.some((c) => c.tabKey === activeTab)) {
      return activeTab;
    }
    return criteria[0].tabKey;
  }, [activeTab, criteria]);

  const activeCriterion = useMemo(
    () => criteria.find((c) => c.tabKey === activeKey) || null,
    [criteria, activeKey]
  );

  if (!hasInjectedData && isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-gray-500">
        Loading NAAC data...
      </div>
    );
  }

  if (!hasInjectedData && isError) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-red-500">
        Unable to load NAAC information. Please try again later.
      </div>
    );
  }

  if (!sourceData || (!banner.image && !banner.html && !criteria.length)) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-gray-500">
        No NAAC content is available right now.
      </div>
    );
  }

  return (
    <>
      <Banner image={banner.image} html={banner.html} />

      <Tabs
        tabs={criteria}
        activeKey={activeKey}
        onChange={setActiveTab}
      />

      <div className="max-w-7xl mx-auto md:px-6 mt-5">
        <CriterionContent criterion={activeCriterion} />
      </div>
    </>
  );
};

export default NaacSSR;
