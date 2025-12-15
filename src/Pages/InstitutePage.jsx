// src/pages/InstitutePage.jsx
import { useParams } from "react-router-dom";
import { SECTION_COMPONENTS } from "../sections";

function InstitutePage({ institutes }) {
  const { slug } = useParams();

  const institute = institutes.find((inst) => inst.slug === slug);

  if (!institute) return <div>Institute not found</div>;

  return (
    <div>
      {institute.sections.map((sec, idx) => {
        const Comp = SECTION_COMPONENTS[sec.section_id];
        if (!Comp) return null;

        return (
          <Comp
            key={sec.section_id + "-" + idx}
            data={sec.data}
            instituteSlug={institute.slug}
          />
        );
      })}
    </div>
  );
}

export default InstitutePage;
