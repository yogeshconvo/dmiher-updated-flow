import React from "react";
import SafeImage from "../../components/SafeImage";
import resolveImage from "../../utils/resolveImage";

/**
 * NursingCollegeBrief — unique per-college brief shown between the campus
 * tabs and the Dean's Message on every Nursing page.
 *
 * Section key: nursing_college_brief
 * Data shape:
 *   {
 *     title_line1: "Smt. Radhikabai Meghe Memorial",
 *     title_line2: "College of Nursing, Wardha",
 *     para:        "Established in 2002, SRMMCON pioneered ...",
 *     image:       "assets/.../1.png",
 *     reverse:     false   // optional — true reverses (image left, text right)
 *   }
 *
 * Mirrors `D:\UpdatedProjectDM\live site\sections\Nursing\CollegeNursing\CollegeBrief.jsx`.
 */
export default function NursingCollegeBrief({ data }) {
  if (!data) return null;

  const {
    title_line1 = "",
    title_line2 = "",
    para = "",
    image = "",
    reverse = false,
  } = data;

  return (
    <div
      className={
        "container px-4 py-10 flex flex-col md:flex-row items-center justify-center gap-8 transition " +
        (reverse ? "md:flex-row-reverse" : "")
      }
    >
      {/* Text */}
      <div className="w-full md:w-1/2">
        <h3 className="text-[#122E5E] font-oswald-medium text-2xl font-bold mb-4">
          {title_line1}
          {title_line2 && (
            <>
              <br />
              {title_line2}
            </>
          )}
        </h3>
        <p className="text-[#58595B] text-base mb-6">{para}</p>
      </div>

      {/* Image */}
      {image && (
        <div className="w-full md:w-1/2 rounded-md overflow-hidden shadow-lg">
          <SafeImage
            src={resolveImage(image)}
            alt={title_line2 || title_line1 || "College"}
            className="w-full h-auto object-cover"
          />
        </div>
      )}
    </div>
  );
}
