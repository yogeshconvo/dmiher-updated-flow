
import { usePages } from "./hooks/usePages";
import { useMicropage } from "./hooks/useMicropage";
// import { useSubpages } from "./hooks/useSubpages";

import { SECTION_COMPONENTS as InstituteSections } from "./sections/Institute";
import { SECTION_COMPONENTS as MainPageSections } from "./sections/MainPageSections";
import { SECTION_COMPONENTS as SubpagesSections } from "./sections/Subpages";
import { SECTION_COMPONENTS as MicropageSections } from "./sections/Micropages";
import { useParams } from "react-router-dom";

const SECTION_COMPONENTS = {
  ...InstituteSections,
  ...MainPageSections,
  ...SubpagesSections,
  ...MicropageSections,
};

function PageView() {
  const params = useParams();

  /* ----------------------------------
     1️⃣ Detect route type SAFELY
  ---------------------------------- */
  const isMicropage =
    params.pageSlug !== undefined &&
    params.microSlug !== undefined;

  /* ----------------------------------
     2️⃣ Resolve slug for normal pages
  ---------------------------------- */
  const resolvedSlug =
    params.page || params.slug || "home";

  /* ----------------------------------
     3️⃣ Fetch data  SAFELY
  ---------------------------------- */
  const pageQuery = usePages(
    !isMicropage ? resolvedSlug : null
  );

  const micropageQuery = useMicropage(
    isMicropage ? params.pageSlug : null,
    isMicropage ? params.microSlug : null
  );

  // console.log("Page slug for redirection", params.pageSlug);
  console.log("Micro slug for redirection", params.microSlug);
  const isSubpage = !isMicropage && params.college && params.page;


  // const subpagesQuery = useSubpages(params.pageSlug);
const isLoading = isMicropage
  ? micropageQuery.isLoading
  : isSubpage
  ? subpagesQuery.isLoading
  : pageQuery.isLoading;

const error = isMicropage
  ? micropageQuery.error
  : isSubpage
  ? subpagesQuery.error
  : pageQuery.error;

  // const isLoading = isMicropage
  //   ? micropageQuery.isLoading
  //   : pageQuery.isLoading;

  // const error = isMicropage
  //   ? micropageQuery.error
  //   : pageQuery.error;

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Page not found</div>;

  /* ----------------------------------
     4️⃣ Resolve final page data
  ---------------------------------- */
  // let resolvedPage = null;

  // if (isMicropage) {
  //   resolvedPage = micropageQuery.data;
  // } else if (params.college && params.page) {
  //     const fullSlug = `/${params.college}/${params.page}`;
  //     resolvedPage =
  //         subpagesQuery.data?.find((p) => p.slug === fullSlug) || null;
  // } else {
  //   resolvedPage = pageQuery.data;
  // }
  let resolvedPage = null;

if (isMicropage) {
  resolvedPage = micropageQuery.data;
} 
else if (isSubpage) {
  const fullSlug = `/${params.college}/${params.page}`;
  resolvedPage =
    subpagesQuery.data?.find((p) => p.slug === fullSlug) || null;
} 
else {
  resolvedPage = pageQuery.data;
}

console.log("micropage data", micropageQuery.data);


  if (!resolvedPage) return <div>Page not found</div>;

  /* ----------------------------------
     5️⃣ Render sections
  ---------------------------------- */
  return (
    <main>
      {resolvedPage.sections?.map((sec, index) => {
        const SectionComponent =
          SECTION_COMPONENTS[sec.section_id];

        if (!SectionComponent) {
          console.log(`No component for ${sec.section_id}`);
          
          return null;
        }

        return (
          <section key={index}>
            <SectionComponent
              
              data={sec.data}
              pageSlug={
                params.pageSlug ||
                params.slug ||
                params.page
              }
            />
          </section>
        );
      })}
    </main>
  );
}

export default PageView;
