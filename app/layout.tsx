import type { Metadata } from "next";
import { Inter, Fraunces } from "next/font/google";
import localFont from "next/font/local";
import { ThemeProvider } from "next-themes";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ClientThreeBackground from "@/components/ClientThreeBackground";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

// Display serif — the "expensive editorial" lever. Variable, optical sizing.
const fraunces = Fraunces({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-display",
  style: ["normal", "italic"],
  axes: ["opsz", "SOFT", "WONK"],
});

// Refined mono for eyebrows / data labels (bundled locally).
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: "Beyond AI — AI Integration & Revenue Engineering",
  description:
    "Autonomous agents, seamless integrations, and revenue systems that run while you sleep. Two specialists. One mission.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${fraunces.variable} ${geistMono.variable}`}
    >
      <body className="font-sans antialiased">
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          <ClientThreeBackground />
          <div className="relative z-10">
            <Navbar/>
            {children}
            <Footer/>
          </div>
        </ThemeProvider>
      </body>
    </html>
  );
}
