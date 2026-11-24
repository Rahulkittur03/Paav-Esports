import type { Metadata } from "next";
import AboutClient from "@/components/about/AboutClient";
import { SITE_CONFIG } from "@/utils/config";

export const metadata: Metadata = {
  title: "About PAAV Esports",
  description:
    "Learn about PAAV Esports: our competitive gaming mission, core pillars, historical journey across five seasons, and future circuit vision.",
  openGraph: {
    title: `About PAAV Esports | ${SITE_CONFIG.name}`,
    description: "Learn about the mission, values, and story behind PAAV Esports.",
  },
};

export default function AboutPage() {
  return <AboutClient />;
}
