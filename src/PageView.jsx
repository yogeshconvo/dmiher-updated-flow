

// import { useParams } from "react-router-dom";
// import { usePages } from "./hooks/usePages";
// import { useMicropage } from "./hooks/useMicropage";

// import { SECTION_COMPONENTS as MainPageSections } from "./sections/MainPageSections";
// import { SECTION_COMPONENTS as InstituteSections } from "./sections/Institute";
// import { SECTION_COMPONENTS as SubpagesSections } from "./sections/Subpages";
// import { SECTION_COMPONENTS as MicropageSections } from "./sections/Micropages";

// const SECTION_COMPONENTS = {
//   ...MainPageSections,
//   ...InstituteSections,
//   ...SubpagesSections,
//   ...MicropageSections,
// };

// function PageView() {
//   const params = useParams();

//   console.log("PARAMS:", params);

//   const isMicropage = params.college && params.page;

//   const slug = params.slug || "home";

//   const microSlug = isMicropage ? params.page : null;

//   /* ===== Queries ===== */
//   const pageQuery = usePages(!isMicropage ? slug : null);

//   const micropageQuery = useMicropage(microSlug);

//   /* ===== Loading ===== */
//   const isLoading = isMicropage
//     ? micropageQuery.isLoading
//     : pageQuery.isLoading;

//   const error = isMicropage
//     ? micropageQuery.error
//     : pageQuery.error;

//   if (isLoading) return <div>Loading...</div>;
//   if (error) return <div>Page not found</div>;

//   /* ===== Resolve ===== */
//   const resolvedPage = isMicropage
//     ? micropageQuery.data
//     : pageQuery.data;

//   console.log("Resolved Page:", resolvedPage);

//   if (!resolvedPage) return <div>No Data</div>;

//   /* ===== Render ===== */
//   return (
//     <main>
//       {resolvedPage.sections?.map((sec, index) => {
//         const SectionComponent =
//           SECTION_COMPONENTS[sec.section_id];

//         if (!SectionComponent) return null;

//         return (
//           <section key={index}>
//             <SectionComponent data={sec.data} />
//           </section>
//         );
//       })}
//     </main>
//   );
// }

// export default PageView;
import { useParams } from "react-router-dom";
import { usePages } from "./hooks/usePages";
import { useMicropage } from "./hooks/useMicropage";

import { SECTION_COMPONENTS as MainPageSections } from "./sections/MainPageSections";
import { SECTION_COMPONENTS as InstituteSections } from "./sections/Institute";
import { SECTION_COMPONENTS as SubpagesSections } from "./sections/Subpages";
import { SECTION_COMPONENTS as MicropageSections } from "./sections/Micropages";

const SECTION_COMPONENTS = {
  ...MainPageSections,
  ...InstituteSections,
  ...SubpagesSections,
  ...MicropageSections,
};

function PageView() {
  const params = useParams();

  const isMicropage = params.college && params.page;

  const slug = params.slug || params.page || "home";
  const microSlug = isMicropage ? params.page : null;

  /* ===== Queries ===== */
  const pageQuery = usePages(!isMicropage ? slug : null);

  const micropageQuery = useMicropage(
    isMicropage ? microSlug : null
  );

  /* ===== Loading ===== */
  const isLoading = isMicropage
    ? micropageQuery?.isLoading
    : pageQuery?.isLoading;

  const error = isMicropage
    ? micropageQuery?.error
    : pageQuery?.error;

  if (isLoading)
    return <div className="p-10 text-center">Loading...</div>;

  if (error)
    return <div className="p-10 text-center">Page not found</div>;

  /* ===== Resolve ===== */
  const resolvedPage = isMicropage
    ? micropageQuery?.data
    : pageQuery?.data;

  if (!resolvedPage)
    return <div className="p-10 text-center">No Data</div>;

  /* ===== Render ===== */
  return (
    <main>
      {resolvedPage.sections?.map((sec, index) => {
        const SectionComponent =
          SECTION_COMPONENTS[sec.section_id];

        if (!SectionComponent) return null;

        return (
          <section key={index}>
            <SectionComponent data={sec.data} />
          </section>
        );
      })}
    </main>
  );
}

export default PageView;