import fs from "fs";
import path from "path";
import matter from "gray-matter";

const blogsDirectory = path.join(process.cwd(), "content/blogs");

export type BlogMeta = {
  title: string;
  slug: string;
  date: string;
  description: string;
  author: string;
  heroImage?: string;
};

export type Blog = BlogMeta & {
  content: string;
};

export function getAllBlogs(): BlogMeta[] {
  const files = fs.readdirSync(blogsDirectory);

  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => {
      const slug = file.replace(".mdx", "");
      const fullPath = path.join(blogsDirectory, file);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data } = matter(fileContents);

      return {
        title: data.title,
        slug: data.slug || slug,
        date: data.date,
        description: data.description,
        author: data.author,
        heroImage: data.heroImage || null,
      };
    })
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getBlogBySlug(slug: string): Blog | null {
  const fullPath = path.join(blogsDirectory, `${slug}.mdx`);

  if (!fs.existsSync(fullPath)) return null;

  const fileContents = fs.readFileSync(fullPath, "utf8");
  const { data, content } = matter(fileContents);

  return {
    title: data.title,
    slug: data.slug || slug,
    date: data.date,
    description: data.description,
    author: data.author,
    heroImage: data.heroImage || null,
    content,
  };
}

export function extractHeadings(content: string): { id: string; text: string }[] {
  const lines = content.split("\n");
  return lines
    .filter((line) => line.startsWith("## "))
    .map((line) => {
      const text = line.replace("## ", "").trim();
      const id = text.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      return { id, text };
    });
}
