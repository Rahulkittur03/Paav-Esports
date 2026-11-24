import type { Metadata } from "next";
import SeasonsOverviewClient from "@/components/seasons/SeasonsOverviewClient";
import { SITE_CONFIG } from "@/utils/config";

export const metadata: Metadata = {
  title: "Tournament Seasons Archive (1–5)",
  description:
    "Explore the complete tournament history of PAAV Esports across Seasons 1 to 5. Review championship rosters, formats, and tournament highlights.",
  openGraph: {
    title: `Tournament Seasons Archive | ${SITE_CONFIG.name}`,
    description: "Explore Seasons 1 to 5 of the PAAV Esports competitive circuit.",
  },
};

export default function SeasonsPage() {
  return <SeasonsOverviewClient />;
}
