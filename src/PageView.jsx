import { useParams } from "react-router-dom";
import { usePages } from "./hooks/usePages";

import { SECTION_COMPONENTS as InstituteSections } from "./sections/Institute";
import { SECTION_COMPONENTS as MainPageSections } from "./sections/MainPageSections";
import { SECTION_COMPONENTS as SubpagesSections } from "./sections/Subpages";

const SECTION_COMPONENTS = {
  ...InstituteSections,
  ...MainPageSections,
  ...SubpagesSections,
};

function PageView({ subpages = [] }) {
  const { slug, college, page } = useParams();

  const resolvedSlug =
    page || slug || "home";

  const {
    data: pageData,
    isLoading,
    error,
  } = usePages(resolvedSlug);

  if (isLoading) return <div>Loading...</div>;
  if (error || !pageData) return <div>Page not found</div>;

  let resolvedPage = pageData;

  if (college && page) {
    const fullSlug = `/${college}/${page}`;
    resolvedPage =
      subpages.find((p) => p.slug === fullSlug) || null;
  }

  if (!resolvedPage) return <div>Page not found</div>;

  return (
    <main>
      {resolvedPage.sections?.map((sec, index) => {
        const SectionComponent =
          SECTION_COMPONENTS[sec.section_id];

        if (!SectionComponent) {
          console.warn(`No component for ${sec.section_id}`);
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
