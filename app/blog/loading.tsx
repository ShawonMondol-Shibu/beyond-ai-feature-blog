export default function Loading() {
  return (
    <div className="min-h-screen bg-[var(--bg)]">
      <header className="grid-bg pt-36 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <div className="h-3 w-24 bg-[var(--surface)] rounded mb-4 animate-pulse" />
          <div className="h-12 w-3/4 bg-[var(--surface)] rounded mb-4 animate-pulse" />
          <div className="h-5 w-2/3 bg-[var(--surface)] rounded animate-pulse" />
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-28">
        {/* Featured post skeleton */}
        <div className="surface-card overflow-hidden mb-14">
          <div className="grid md:grid-cols-2">
            <div className="w-full aspect-[16/10] md:aspect-auto bg-[var(--surface)] animate-pulse" />
            <div className="p-8 md:p-10 flex flex-col justify-center gap-4">
              <div className="h-3 w-32 bg-[var(--surface)] rounded animate-pulse" />
              <div className="h-7 w-full bg-[var(--surface)] rounded animate-pulse" />
              <div className="h-7 w-2/3 bg-[var(--surface)] rounded animate-pulse" />
              <div className="h-4 w-full bg-[var(--surface)] rounded animate-pulse" />
              <div className="h-4 w-5/6 bg-[var(--surface)] rounded animate-pulse" />
            </div>
          </div>
        </div>

        {/* Post grid skeleton */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {[1, 2].map((i) => (
            <div key={i} className="surface-card overflow-hidden">
              <div className="w-full aspect-video bg-[var(--surface)] animate-pulse" />
              <div className="p-7 flex flex-col gap-3">
                <div className="h-3 w-20 bg-[var(--surface)] rounded animate-pulse" />
                <div className="h-5 w-4/5 bg-[var(--surface)] rounded animate-pulse" />
                <div className="h-4 w-full bg-[var(--surface)] rounded animate-pulse" />
                <div className="h-4 w-3/4 bg-[var(--surface)] rounded animate-pulse" />
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
