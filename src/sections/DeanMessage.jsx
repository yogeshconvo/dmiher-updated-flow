import React from "react";
// import DeanImage from "../../assets/JNMC/Sonali.jpeg";
import { Link } from "react-router-dom";

const DeansMessage = ({ data }) => {
  const {
    heading,
    dean_name,
    designation_lines,
    email,
    paragraphs,
    cta_label,
    cta_url,
  } = data || {};

  return (
    <div className="bg-[#0C2C5B] text-white py-10 md:py-20">
      <div className="container">
        <h2 className="text-3xl md:text-4xl font-oswald-medium  mb-10">
          <div className="border-t-4 border-[#EE4B2B] w-20 mb-2"></div>
          {heading}
        </h2>

        <div className="flex flex-col lg:flex-row gap-10 items-center lg:items-start lg:text-left">
          {/* Image + Name */}
          <div className="flex-shrink-0">
            <img
              //   src={DeanImage}
              alt={dean_name}
              className="rounded-lg w-[300px] md:w-[370px] h-[300px] object-cover mb-4 mx-auto lg:mx-0"
            />
            <div className="text-[#E1CD67] leading-relaxed max-sm:mt-4">
              <p className="text-[#E1CD67] font-bold">{dean_name}</p>

              {designation_lines.length > 0 && (
                <p>
                  {designation_lines.map((line, idx) => (
                    <span key={idx}>
                      {line}
                      <br />
                    </span>
                  ))}
                </p>
              )}

              {email && <p>{email}</p>}
            </div>
          </div>

          {/* Message */}
          <div className="text-lg tracking-wide font-sans text-[16px] leading-6 text-[#FFFFFF] pr-5 font-[400]">
            {paragraphs.map((para, idx) => (
              <p key={idx} className="mb-4">
                {para}
              </p>
            ))}

            {cta_label && cta_url && (
              <Link
                to={cta_url}
                className="mb-4 inline-block px-5 py-2 bg-[#F04E30] text-white rounded font-semibold transition hover:bg-[#d13d22]"
              >
                {cta_label}
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeansMessage;
