import "../../styles/components/skeleton.css";

export default function PageSkeleton() {
  return (
    <div className="page-skeleton">
      {/* Hero */}
      <div className="skeleton page-skeleton-hero" />

      {/* Section 1 */}
      <div className="page-skeleton-section">
        <div className="skeleton page-skeleton-heading" />
        <div className="skeleton page-skeleton-text" />
        <div className="skeleton page-skeleton-text" />
        <div className="skeleton page-skeleton-text-short" />
      </div>

      {/* Cards Grid */}
      <div className="page-skeleton-section">
        <div className="skeleton page-skeleton-heading" />
        <div className="page-skeleton-grid">
          <div className="skeleton page-skeleton-card" />
          <div className="skeleton page-skeleton-card" />
          <div className="skeleton page-skeleton-card" />
        </div>
      </div>

      {/* Section 2 */}
      <div className="page-skeleton-section">
        <div className="skeleton page-skeleton-heading" />
        <div className="skeleton page-skeleton-text" />
        <div className="skeleton page-skeleton-text-short" />
      </div>
    </div>
  );
}
