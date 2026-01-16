import { useParams } from "react-router-dom";
import { SECTION_COMPONENTS as InstituteSections } from "./sections/Institute";
import { SECTION_COMPONENTS as MainPageSections } from "./sections/MainPageSections";
import { SECTION_COMPONENTS as SubpagesSections } from "./sections/Subpages";

const SECTION_COMPONENTS = {
  ...InstituteSections,
  ...MainPageSections,
  ...SubpagesSections,
};

function PageView({ pages = [], subpages = [] }) {
  const { slug, college, page } = useParams();

  let resolvedPage = null;


if (!slug && !college && !page) {
  resolvedPage = pages[0]; 
}

  console.log(pages)
  console.log(subpages)
  
  if (!resolvedPage && college && page) {
    const fullSlug = `/${college}/${page}`;
    resolvedPage = subpages.find(
      (p) => p.slug === fullSlug
    );
  }


  if (!resolvedPage && slug) {
    resolvedPage = pages.find(
      (p) => p.slug === slug
    );
  }

  if (!resolvedPage) {
    return <div>Page not found</div>;
  }

  return (
    <main>
      {resolvedPage.sections?.map((sec, index) => {
        const SectionComponent =
          SECTION_COMPONENTS[sec.section_id];

        if (!SectionComponent) {
          console.warn(
            `No component for ${sec.section_id}`
          );
          return null;
        }

        return (
          <section
            key={sec.section_id || index}
            id={sec.section_id}
          >
            <SectionComponent data={sec.data} />
          </section>
        );
      })}
    </main>
  );
}

export default PageView;