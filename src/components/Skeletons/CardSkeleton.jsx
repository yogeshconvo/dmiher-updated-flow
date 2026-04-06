import "../../styles/components/skeleton.css";

export function CardSkeleton() {
  return (
    <div className="card-skeleton">
      <div className="skeleton card-skeleton-title" />
      <div className="skeleton card-skeleton-badge" />
      <div className="skeleton card-skeleton-body" />
      <div className="skeleton card-skeleton-body" />
      <div className="skeleton card-skeleton-btn" />
    </div>
  );
}

export function CardSkeletonGrid({ count = 6 }) {
  return (
    <div className="card-skeleton-grid">
      {Array.from({ length: count }).map((_, i) => (
        <CardSkeleton key={i} />
      ))}
    </div>
  );
}
