"use client";

import dynamic from "next/dynamic";

const ThreeBackground = dynamic(() => import("./ThreeBackground"), {
  ssr: false,
});

export default function ClientThreeBackground() {
  return <ThreeBackground />;
}
