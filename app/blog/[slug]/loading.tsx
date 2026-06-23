export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        {/* Back link skeleton */}
        <div className="h-4 w-32 bg-[var(--surface)] rounded mb-10 animate-pulse" />

        {/* Article header skeleton */}
        <div className="mb-10 max-w-[44rem]">
          <div className="h-3 w-48 bg-[var(--surface)] rounded mb-5 animate-pulse" />
          <div className="h-10 w-full bg-[var(--surface)] rounded mb-3 animate-pulse" />
          <div className="h-10 w-4/5 bg-[var(--surface)] rounded mb-6 animate-pulse" />
          <div className="h-5 w-full bg-[var(--surface)] rounded mb-2 animate-pulse" />
          <div className="h-5 w-3/4 bg-[var(--surface)] rounded animate-pulse" />
        </div>

        {/* Hero image skeleton */}
        <div className="w-full aspect-[21/9] bg-[var(--surface)] rounded-2xl mb-14 animate-pulse" />

        {/* Content skeleton */}
        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16">
          <article className="min-w-0 flex-1 max-w-[68ch] space-y-5">
            {[1, 2, 3, 4, 5].map((i) => (
              <div key={i} className="space-y-2">
                <div className="h-4 w-full bg-[var(--surface)] rounded animate-pulse" />
                <div className="h-4 w-full bg-[var(--surface)] rounded animate-pulse" />
                <div className="h-4 w-5/6 bg-[var(--surface)] rounded animate-pulse" />
              </div>
            ))}
          </article>

          {/* Sidebar skeleton */}
          <div className="w-full lg:w-60 shrink-0">
            <div className="h-3 w-20 bg-[var(--surface)] rounded mb-5 animate-pulse" />
            <div className="space-y-3">
              {[1, 2, 3].map((i) => (
                <div key={i} className="h-4 w-full bg-[var(--surface)] rounded animate-pulse" />
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
