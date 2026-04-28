import React, { useState, useMemo } from "react";
import HospitalDetails from "./HospitalDetails";
import OurHospitals from "./OurHospitals";
import DifferenceHospitals from "./DifferenceHospitals";

function TabsSahs({ tabs, activeIndex, setActiveIndex }) {
  if (!tabs?.length) return null;
  return (
    <ul className="w-[590px] m-auto  flex items-center font-oswald-medium justify-center gap-[10%] border-b my-8 max-sm:flex-col">
      {tabs.map((tab, idx) => (
        <li
          key={idx}
          onClick={() => setActiveIndex(idx)}
          className={`cursor-pointer text-center py-4 max-w-[1000px] text-2xl
            ${
              activeIndex === idx
                ? "font-bold text-[#122E5E] border-b-4 border-[#F04E30]"
                : "text-[#58595B]"
            }`}
        >
          {tab.tab_name || tab.label}
        </li>
      ))}
    </ul>
  );
}

function TeachingHospitals({ data }) {
  const campusTabs = useMemo(
    () => (Array.isArray(data?.campus_tabs) ? data.campus_tabs : []),
    [data],
  );
  const [activeIndex, setActiveIndex] = useState(0);

  if (!campusTabs.length) return null;

  const activeCampus = campusTabs[activeIndex] || campusTabs[0];

  return (
    <>
      <div className="pt-16 mt-16">
        <div className="container">
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-[#707070] mb-2 font-oswald-medium font-[500] tracking-tight leading-tight">
            <span className="block border-t-4 border-[#F04E30] w-20 sm:w-24 mb-2 mr-4"></span>
            TEACHING HOSPITALS
          </h2>

          <TabsSahs
            tabs={campusTabs}
            activeIndex={activeIndex}
            setActiveIndex={setActiveIndex}
          />
        </div>
      </div>

      <section className="py-16">
        <HospitalDetails campus={activeCampus} />
        <OurHospitals campus={activeCampus} />
        <DifferenceHospitals campus={activeCampus} />
      </section>
    </>
  );
}

export default TeachingHospitals;
