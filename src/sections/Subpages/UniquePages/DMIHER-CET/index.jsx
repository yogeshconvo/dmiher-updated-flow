import React, { useMemo } from "react";
import { useParams } from "react-router-dom";

import HeroSection from "./components/HeroSection";
import TimelineSection from "./components/TimelineSection";
import PatternStatsSection from "./components/PatternStatsSection";
import ProgramSectionsList from "./components/ProgramSectionsList";
import SyllabusSection from "./components/SyllabusSection";
import { mapDmiherCetSectionData } from "./mappers/dmiherCetMapper";
import { useSubpage } from "../../../../hooks/useSubpages";

/**
 * DMIHER CET subpage section component.
 *
 * Two render modes:
 *  1. Driven by `data` prop (the standard PageView flow — recommended).
 *  2. Standalone fallback that fetches `/micropage/{college}/{page}` itself
 *     via the shared `useSubpage` hook for direct mounts.
 */
const DmiherCet = ({ data: rawData, college: collegeProp, pageSlug: pageProp }) => {
  const params = useParams();
  const collegeSlug = collegeProp || params.college || null;
  const pageSlug = pageProp || params.page || null;

  const hasInjectedData =
    rawData && typeof rawData === "object" && Object.keys(rawData).length > 0;

  const {
    data: fetchedPage,
    isLoading,
    isError,
  } = useSubpage(
    hasInjectedData ? null : collegeSlug,
    hasInjectedData ? null : pageSlug
  );

  const fallbackSection = useMemo(() => {
    if (hasInjectedData || !fetchedPage) return null;
    const sections = Array.isArray(fetchedPage.sections)
      ? fetchedPage.sections
      : [];
    const cetSection = sections.find(
      (sec) => sec?.section_id === "dmiher_cet_subpage"
    );
    return cetSection?.data || null;
  }, [hasInjectedData, fetchedPage]);

  const sourceData = hasInjectedData ? rawData : fallbackSection;
  const mapped = useMemo(
    () => mapDmiherCetSectionData(sourceData || {}),
    [sourceData]
  );

  if (!hasInjectedData && isLoading) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-gray-500">
        Loading DMIHER CET data...
      </div>
    );
  }

  if (!hasInjectedData && isError) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-red-500">
        Unable to load DMIHER CET information. Please try again later.
      </div>
    );
  }

  const { hero, timeline, pattern, programs, syllabus } = mapped;

  const isEmpty =
    !hero.heading &&
    !hero.description &&
    !hero.bannerText &&
    !timeline.phases.length &&
    !pattern.stats.length &&
    !programs.sections.length &&
    !syllabus.topics.length;

  if (!sourceData || isEmpty) {
    return (
      <div className="max-w-7xl mx-auto px-6 py-20 text-center text-gray-500">
        No DMIHER CET content is available right now.
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="container py-10">
        <HeroSection
          heading={hero.heading}
          description={hero.description}
          bannerText={hero.bannerText}
        />

        <TimelineSection
          header={timeline.header}
          phases={timeline.phases}
          collegeSlug={collegeSlug}
        />

        <PatternStatsSection header={pattern.header} stats={pattern.stats} />

        <ProgramSectionsList
          header={programs.header}
          sections={programs.sections}
        />

        <SyllabusSection header={syllabus.header} topics={syllabus.topics} />
      </div>
    </div>
  );
};

export default DmiherCet;
