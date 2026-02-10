import React from "react";
import HolisticInfrastructureSection from "./HoliisticLearning";
import HolisticLearningPage from "../MainPageSections/HolisticLearningPage";


export default function mainHolistic({ data }) {
  const layoutType = data?.layout?.layout_type || "horizontal";

  if (layoutType === "vertical") {
    return <HolisticInfrastructureSection data={data} />;
  }

  return <HolisticLearningPage data={data} />;
}
