import React from 'react'
import BlogPage from './BlogPage';
import { getAllBlogs } from '@/lib/blog';
import ViewTransition from "@/components/ViewTransition";

export const metadata = {
  title: "Blog — Beyond AI",
  description: "Insights on AI, automation, and the future of business.",
};

export default function Page() {
    const blogs = getAllBlogs();
  const [featured, ...rest] = blogs;
  return (
    <ViewTransition name="blog-page">
        <BlogPage featured={featured} rest={rest}/>
    </ViewTransition>
  )
}
