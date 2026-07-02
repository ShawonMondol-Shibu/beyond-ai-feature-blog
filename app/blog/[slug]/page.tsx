import { notFound } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import Navbar from "@/components/Navbar";
import Video from "@/components/Video";
import { getBlogBySlug, getAllBlogs, extractHeadings } from "@/lib/blog";
import { CONTACT } from "@/lib/constants";
import TableOfContents from "./TableOfContents";
import ViewTransition from "@/components/ViewTransition";

export async function generateStaticParams() {
  const blogs = getAllBlogs();
  return blogs.map((blog) => ({ slug: blog.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) return {};

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";
  const url = `${BASE_URL}/blog/${blog.slug}`;

  return {
    title: `${blog.title} — Beyond AI`,
    description: blog.description,
    alternates: { canonical: url },
    openGraph: {
      title: blog.title,
      description: blog.description,
      url,
      type: "article",
      publishedTime: blog.date,
      authors: [blog.author],
      ...(blog.heroImage && { images: [{ url: `${BASE_URL}${blog.heroImage}` }] }),
    },
    twitter: {
      card: "summary_large_image",
      title: blog.title,
      description: blog.description,
      ...(blog.heroImage && { images: [`${BASE_URL}${blog.heroImage}`] }),
    },
  };
}

function readTime(content: string) {
  const words = content.split(/\s+/).length;
  return `${Math.ceil(words / 200)} min read`;
}

function toId(text: string) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
}

const components = {
  h2: ({ children }: { children?: React.ReactNode }) => {
    const text =
      typeof children === "string" ? children : String(children ?? "");
    return (
      <h2
        id={toId(text)}
        className="font-display text-3xl text-[var(--text-primary)] mt-16 mb-5 scroll-mt-28 leading-snug"
      >
        {children}
      </h2>
    );
  },
  h3: ({ children }: { children?: React.ReactNode }) => (
    <h3 className="font-display text-2xl text-[var(--text-primary)] mt-10 mb-4 scroll-mt-28">
      {children}
    </h3>
  ),
  p: ({ children }: { children?: React.ReactNode }) => (
    <p className="text-base md:text-lg text-[var(--text-secondary)] leading-[1.8] mb-6">
      {children}
    </p>
  ),
  ul: ({ children }: { children?: React.ReactNode }) => (
    <ul className="mb-6 space-y-2.5">{children}</ul>
  ),
  ol: ({ children }: { children?: React.ReactNode }) => (
    <ol className="mb-6 space-y-2.5 list-decimal pl-5 marker:text-brand marker:font-mono marker:text-sm">
      {children}
    </ol>
  ),
  li: ({ children }: { children?: React.ReactNode }) => (
    <li className="flex gap-3 text-base md:text-lg text-[var(--text-secondary)] leading-[1.8]">
      <span className="text-brand mt-2.5 shrink-0 h-1 w-1 rounded-full bg-brand" aria-hidden />
      <span>{children}</span>
    </li>
  ),
  strong: ({ children }: { children?: React.ReactNode }) => (
    <strong className="font-semibold text-[var(--text-primary)]">{children}</strong>
  ),
  em: ({ children }: { children?: React.ReactNode }) => (
    <em className="italic">{children}</em>
  ),
  a: ({ href, children }: { href?: string; children?: React.ReactNode }) => (
    <a
      href={href}
      target={href?.startsWith("http") ? "_blank" : undefined}
      rel={href?.startsWith("http") ? "noopener noreferrer" : undefined}
      className="text-brand underline decoration-brand/30 underline-offset-4 hover:decoration-brand transition-colors"
    >
      {children}
    </a>
  ),
  code: ({ children }: { children?: React.ReactNode }) => (
    <code className="font-mono text-[0.85em] bg-[var(--surface)] border border-[var(--hairline)] text-brand rounded px-1.5 py-0.5">
      {children}
    </code>
  ),
  pre: ({ children }: { children?: React.ReactNode }) => (
    <pre className="my-7 overflow-x-auto rounded-xl border border-[var(--hairline)] bg-[var(--bg-elevated)] p-5 text-[13.5px] leading-relaxed font-mono [&_code]:border-0 [&_code]:bg-transparent [&_code]:p-0 [&_code]:text-[var(--text-secondary)]">
      {children}
    </pre>
  ),
  blockquote: ({ children }: { children?: React.ReactNode }) => (
    <blockquote className="my-8 border-l-2 border-brand pl-6 font-display text-xl italic text-[var(--text-primary)] leading-relaxed">
      {children}
    </blockquote>
  ),
  hr: () => <hr className="my-12 border-[var(--hairline)]" />,
  img: ({ src, alt }: { src?: string; alt?: string }) => (
    <figure className="my-9">
      <div className="relative w-full aspect-video rounded-xl overflow-hidden border border-[var(--hairline)]">
        <Image
          src={src ?? ""}
          alt={alt ?? ""}
          fill
          className="object-contain"
          sizes="(max-width: 768px) 100vw, 68ch"
        />
      </div>
      {alt && (
        <figcaption className="mt-3 text-center text-xs text-[var(--text-muted)] font-mono">
          {alt}
        </figcaption>
      )}
    </figure>
  ),
  Video,
};

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const blog = getBlogBySlug(slug);
  if (!blog) notFound();

  const headings = extractHeadings(blog.content);
  const time = readTime(blog.content);

  const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: blog.title,
    description: blog.description,
    author: { "@type": "Organization", name: blog.author },
    datePublished: blog.date,
    publisher: { "@type": "Organization", name: "Beyond AI", url: BASE_URL },
    url: `${BASE_URL}/blog/${blog.slug}`,
    ...(blog.heroImage && { image: `${BASE_URL}${blog.heroImage}` }),
  };

  return (
    <ViewTransition name="blog-post">
    <div className="min-h-screen bg-[var(--bg)]">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Navbar />

      <main className="max-w-6xl mx-auto px-6 pt-32 pb-24">
        <Link
          href="/blog"
          className="inline-flex items-center gap-1.5 text-sm text-[var(--text-muted)] hover:text-brand transition-colors mb-10 font-mono"
        >
          <span aria-hidden>←</span> Back to Journal
        </Link>

        {/* Article header */}
        <div className="mb-10 max-w-[44rem]">
          <p className="font-mono text-[11px] text-brand tracking-[0.18em] uppercase mb-5">
            {blog.date} · {time} · {blog.author}
          </p>
          <h1 className="display text-[clamp(2.25rem,5vw,3.75rem)] text-[var(--text-primary)]">
            <ViewTransition name={`blog-title-${slug}`}>{blog.title}</ViewTransition>
          </h1>
          <p className="mt-6 text-lg text-[var(--text-secondary)] leading-relaxed">
            {blog.description}
          </p>
        </div>

        {blog.heroImage && (
          <div className="relative w-full aspect-[21/9] rounded-2xl overflow-hidden border border-[var(--hairline)] mb-14">
            <Image
              src={blog.heroImage}
              alt={blog.title}
              fill
              className="object-cover"
              priority
            />
          </div>
        )}

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-16 items-start">
          <article className="min-w-0 flex-1 max-w-[68ch] order-last lg:order-first">
            <MDXRemote source={blog.content} components={components} />

            <div className="mt-16 surface-card hover:!border-[var(--hairline)] p-9 text-center bg-[var(--surface)]">
              <p className="font-display text-2xl text-[var(--text-primary)] mb-2">
                Ready to bring AI into your business?
              </p>
              <p className="text-sm text-[var(--text-secondary)] mb-7 max-w-md mx-auto leading-relaxed">
                Let&apos;s map your workflows and find where AI creates the
                highest leverage.
              </p>
              <a
                href={CONTACT.calendlyUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Book a Free Call
              </a>
            </div>
          </article>

          <div className="w-full lg:w-auto order-first lg:order-last">
            <TableOfContents headings={headings} />
          </div>
        </div>
      </main>

    </div>
    </ViewTransition>
  );
}
