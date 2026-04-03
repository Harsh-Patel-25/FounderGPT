const SkeletonBlock = ({ className = "" }: { className?: string }) => (
  <div className={`animate-pulse rounded-lg bg-muted ${className}`} />
);

const LoadingSkeleton = () => (
  <div className="grid gap-4 sm:grid-cols-2 max-w-5xl mx-auto">
    {Array.from({ length: 4 }).map((_, i) => (
      <div key={i} className="glass rounded-xl p-6 space-y-4">
        <SkeletonBlock className="h-5 w-1/3" />
        <SkeletonBlock className="h-4 w-full" />
        <SkeletonBlock className="h-4 w-4/5" />
        <SkeletonBlock className="h-4 w-2/3" />
      </div>
    ))}
  </div>
);

export default LoadingSkeleton;
