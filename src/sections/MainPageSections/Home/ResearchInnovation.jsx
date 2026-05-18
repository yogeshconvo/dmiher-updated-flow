import ViewMoreButton from "../../../components/UI/ViewMore";
import ResearchSectionMobileSlider from "../../../components/UI/MobileSlider";
import RichTextRenderer from "../../../components/RichTextRenderer";
import SafeImage from "../../../components/SafeImage";

const ResearchInnovation = ({ data }) => {
  if (!data) return null;

  const heading = data?.header?.heading;
  const image = data?.header?.image;
  const stats = data?.stats || [];
  const button = data?.button;

  return (
    <div className="ri-section">
      <div className="ri-container">

        {/* ================= HEADING ================= */}
        {heading && (
          <h2 className="ri-heading">
            <div className="ri-heading-line"></div>
            {heading}
          </h2>
        )}

        {/* ================= MAIN CONTENT ================= */}
        <div className="ri-main">

          {/* ========== LEFT IMAGE ========== */}
          <div className="ri-image-wrap">
            <SafeImage
              src={typeof image === "string" ? image : ""}
              alt="Research"
              className="ri-image"
            />
          </div>

          {/* ========== DESKTOP GRID (lg+) ========== */}
          <div className="ri-grid">

            {stats.slice(0, 3).map((item, index) => (
              <div
                key={index}
                className={`ri-stat ${index !== 2 ? "ri-stat-divider" : ""}`}
              >
                <SafeImage
                  src={item.icon}
                  alt={item.label}
                  className="ri-stat-icon"
                />
                <RichTextRenderer className="ri-stat-value" html={item.value} />
              </div>
            ))}

            {/* Bottom Two Centered */}
            {stats.length > 3 && (
              <div className="ri-stats-bottom">
                {stats.slice(3, 5).map((item, index) => (
                  <div
                    key={index}
                    className={`ri-stat-bottom ${index === 0 ? "ri-stat-divider" : ""}`}
                  >
                    <SafeImage
                      src={item.icon}
                      alt={item.label}
                      className="ri-stat-icon"
                    />
                    <RichTextRenderer className="ri-stat-value" html={item.value} />
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* ========== MOBILE SLIDER ========== */}
          <div className="ri-mobile">
            <ResearchSectionMobileSlider
              data={stats}
              autoplayDelay={3000}
              speed={500}
            />
          </div>

        </div>

        {/* ================= BUTTON ================= */}
        {button && (
          <div className="ri-button-wrap">
            <ViewMoreButton
              href={button.link}
              label={button.label}
              className="ri-button"
            />
          </div>
        )}

      </div>
    </div>
  );
};

export default ResearchInnovation;
