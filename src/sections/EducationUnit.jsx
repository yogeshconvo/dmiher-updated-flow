import React from "react";
// import PlaceholderBg from "../../assets/JNMC/MOE.jpeg"; 
// import ViewMoreButton from "../../components/UI/ViewMore";
import { Link } from "react-router";

function EducationUnit({ data }) {
  const {
    section_id,
    heading,
    paragraphs = [],
    cta_label,
    cta_url,
    background_image,
  } = data || {};

  // use JSON image if present, else fallback to placeholder
  const bgImage = background_image;

  return (
    <section
      id={section_id}
      className="relative bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${bgImage})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-l from-black/70 via-black/50 to-black/30 z-0" />

      <div className="relative z-10">
        <div className="font-[Arial] py-16 container">
          <div className="mb-8">
            <h2 className="text-3xl font-oswald-medium sm:text-4xl font-[500] text-white mb-4 uppercase relative">
              <span className="block border-t-4 border-[#F04E30] w-16 mb-4"></span>
              {heading}
            </h2>

            {paragraphs.map((text, index) => (
              <p
                key={index}
                className="text-white text-base max-w-5xl tracking-normal leading-relaxed mb-6"
              >
                {text}
              </p>
            ))}

            {cta_label && cta_url && (
              <Link to={cta_url}>
                {/* <ViewMoreButton label={cta_label} /> */}
                <button>{cta_label}</button>
              </Link>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default EducationUnit;
