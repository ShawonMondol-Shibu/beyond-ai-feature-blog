import Link from "next/link";
import Image from "next/image";
import { getAllBlogs } from "@/lib/blog";

export default function BlogPreview() {
  const blogs = getAllBlogs().slice(0, 3);

  if (blogs.length === 0) return null;

  return (
    <section className="section-pad container-page">
      <div className="flex items-end justify-between mb-14">
        <div>
          <span className="eyebrow block mb-4">From the Blog</span>
          <h2 className="display text-[clamp(2rem,4vw,3.25rem)] text-[var(--text-primary)]">
            Latest insights
          </h2>
        </div>
        <Link
          href="/blog"
          className="hidden md:inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--text-secondary)] hover:text-brand transition-colors group"
        >
          View all
          <span aria-hidden className="transition-transform group-hover:translate-x-0.5">→</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {blogs.map((blog) => (
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
              <h3 className="font-display text-lg text-[var(--text-primary)] group-hover:text-brand transition-colors duration-200 leading-snug mb-3 flex-1">
                {blog.title}
              </h3>
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

      <div className="mt-10 text-center md:hidden">
        <Link
          href="/blog"
          className="text-sm font-semibold text-[var(--text-secondary)] hover:text-brand transition-colors"
        >
          View all posts →
        </Link>
      </div>
    </section>
  );
}
