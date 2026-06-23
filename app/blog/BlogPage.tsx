import Link from "next/link";
import Image from "next/image";
import { BlogMeta } from "@/lib/blog";

type BlogPageProps = {
  featured: BlogMeta | null;
  rest: BlogMeta[];
};

export default function BlogPage({ featured, rest }: BlogPageProps) {

  return (
    <div className="min-h-screen bg-[var(--bg)]">
      {/* Header */}
      <header className="grid-bg pt-36 pb-16">
        <div className="max-w-5xl mx-auto px-6">
          <span className="eyebrow block mb-4">Journal</span>
          <h1 className="display text-[clamp(2.5rem,6vw,4.5rem)] text-[var(--text-primary)] mb-4">
            Insights from{" "}
            <em className="text-brand">the build.</em>
          </h1>
          <p className="text-lg text-[var(--text-secondary)] max-w-xl leading-relaxed">
            Notes on AI systems, automation, and turning models into revenue.
          </p>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 pb-28">
        {/* Featured post */}
        {featured && (
          <Link
            href={`/blog/${featured.slug}`}
            className="group block surface-card overflow-hidden mb-14"
          >
            <div className="grid md:grid-cols-2">
              {featured.heroImage ? (
                <div className="relative w-full aspect-[16/10] md:aspect-auto overflow-hidden">
                  <Image
                    src={featured.heroImage}
                    alt={featured.title}
                    fill
                    priority
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
              ) : (
                <div className="w-full aspect-[16/10] md:aspect-auto bg-[var(--bg-elevated)] flex items-center justify-center min-h-[16rem]">
                  <span className="font-display italic text-3xl text-[var(--text-muted)]">
                    Beyond <span className="text-brand">AI</span>
                  </span>
                </div>
              )}
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <p className="font-mono text-[11px] text-brand tracking-[0.18em] uppercase mb-4">
                  {featured.date} · Latest
                </p>
                <h2 className="font-display text-2xl md:text-3xl text-[var(--text-primary)] group-hover:text-brand transition-colors duration-200 leading-tight mb-3">
                  {featured.title}
                </h2>
                <p className="text-[15px] text-[var(--text-secondary)] leading-relaxed mb-5">
                  {featured.description}
                </p>
                <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-brand">
                  Read article <span aria-hidden>→</span>
                </span>
              </div>
            </div>
          </Link>
        )}

        {/* Rest of posts */}
        {rest.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {rest.map((blog) => (
              <Link
                key={blog.slug}
                href={`/blog/${blog.slug}`}
                className="group flex flex-col surface-card overflow-hidden"
              >
                {blog.heroImage ? (
                  <div className="relative w-full aspect-video overflow-hidden">
                    <Image
                      src={blog.heroImage}
                      alt={blog.title}
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  </div>
                ) : (
                  <div className="w-full aspect-video bg-[var(--bg-elevated)] flex items-center justify-center border-b border-[var(--hairline)]">
                    <span className="font-display italic text-2xl text-[var(--text-muted)]">
                      Beyond <span className="text-brand">AI</span>
                    </span>
                  </div>
                )}
                <div className="p-7 flex flex-col flex-1">
                  <p className="font-mono text-[11px] text-[var(--text-muted)] tracking-wide mb-3">
                    {blog.date}
                  </p>
                  <h2 className="font-display text-xl text-[var(--text-primary)] group-hover:text-brand transition-colors duration-200 leading-snug mb-2.5 flex-1">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-[var(--text-secondary)] leading-relaxed line-clamp-2 mb-5">
                    {blog.description}
                  </p>
                  <span className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-brand">
                    Read more <span aria-hidden>→</span>
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </main>

    </div>
  );
}
