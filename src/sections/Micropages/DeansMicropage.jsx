import { useParams, useLocation } from "react-router-dom";
import { API_BASE } from "../../config/api";
import { useMicropageData } from "../../hooks/useMicropageData";
import RichTextRenderer from "../../components/RichTextRenderer";
import PageSkeleton from "../../components/Skeletons/PageSkeleton";
import SafeImage from "../../components/SafeImage";

/**
 * Resolves dean/team-member image to a full URL.
 * Handles: full URLs, relative storage paths, and missing images.
 */
function resolveImage(imagePath) {
  if (!imagePath) return null;
  if (imagePath.startsWith("http")) return imagePath;
  return `${API_BASE}/storage/${imagePath}`;
}

function DeansMicropage({ data: propData, college: propCollege }) {
  const params = useParams();
  const location = useLocation();
  const pathSegments = location.pathname.split("/").filter(Boolean);

  const pageSlug = params.college || propCollege || pathSegments[0];
  const ctaKey = params.page || pathSegments[1];

  const { sections, loading, error } = useMicropageData(
    pageSlug,
    ctaKey,
    propData
  );

  if (loading) return <PageSkeleton />;

  if (error) {
    return (
      <div className="text-center py-20 text-red-500">{error}</div>
    );
  }

  // When rendered via PageView → propData IS the section data directly
  // When self-fetched → sections[0].data holds the section data
  const sectionData = propData || sections?.[0]?.data || {};

  const dean = sectionData?.dean || {};
  const teamMembers = sectionData?.team_members || [];

  // Dean image: handle both nested "0" key format and flat format
  const rawDeanImage = dean?.["0"]?.image || dean?.image;
  const deanImage = resolveImage(rawDeanImage);

  // Check if there's any dean content to show
  const hasDean = dean.dean_details || dean.desc || deanImage;

  if (!hasDean && teamMembers.length === 0) return null;

  return (
    <section className="knowmore-container container">
      {sectionData?.header?.heading && (
        <h2 className="heading">
          <hr className="heading-line" />
          {sectionData.header.heading}
        </h2>
      )}

      {/* ================= DEAN SECTION ================= */}
      {hasDean && (
        <div className="knowmore-dean-layout">
          <div className="knowmore-dean-profile">
            <SafeImage
              src={deanImage}
              alt="Dean"
              className="knowmore-dean-image"
            />

            {dean.dean_details && (
              <div className="knowmore-dean-info">
                <RichTextRenderer html={dean.dean_details} />
              </div>
            )}
          </div>

          {dean.desc && (
            <div className="knowmore-dean-message">
              <RichTextRenderer html={dean.desc} />
            </div>
          )}
        </div>
      )}

      {/* ================= MANAGEMENT TEAM ================= */}
      {teamMembers.length > 0 && (
        <div className="management-team-wrapper">
          {teamMembers.map((member, i) => {
            const memberImage = resolveImage(member.image);

            return (
              <div key={i} className="management-team-card">
                <SafeImage
                  src={memberImage}
                  alt={member.name || "Team member"}
                  className="management-team-image"
                />

                <div className="management-team-info">
                  <p className="management-team-name">{member.name}</p>
                  <p>
                    {member.designation}
                    {member.qualification && (
                      <>
                        <br />
                        {member.qualification}
                      </>
                    )}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </section>
  );
}

export default DeansMicropage;
