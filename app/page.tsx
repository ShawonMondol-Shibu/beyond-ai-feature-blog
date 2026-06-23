import Hero from "@/components/Hero";
import About from "@/components/About";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import WhyBeyondAI from "@/components/WhyBeyondAI";
import BlogPreview from "@/components/BlogPreview";
import Contact from "@/components/Contact";

export default function Page() {
  return (
    <main>
      <Hero />
      <About />
      <Services />
      <HowItWorks />
      <WhyBeyondAI />
      <BlogPreview />
      <Contact />
    </main>
  );
}
