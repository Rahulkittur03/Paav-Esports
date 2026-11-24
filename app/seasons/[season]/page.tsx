import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { seasons } from "@/data/seasons";
import SeasonDetailClient from "@/components/seasons/SeasonDetailClient";
import { SITE_CONFIG } from "@/utils/config";

interface PageProps {
  params: Promise<{
    season: string;
  }>;
}

export async function generateStaticParams() {
  return seasons.map((season) => ({
    season: season.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { season: slug } = await params;
  const season = seasons.find((s) => s.slug === slug);

  if (!season) {
    return {
      title: "Season Not Found",
    };
  }

  return {
    title: `${season.title} | ${SITE_CONFIG.name}`,
    description: season.shortDescription,
    openGraph: {
      title: `${season.title} - ${season.subtitle} | ${SITE_CONFIG.name}`,
      description: season.shortDescription,
    },
  };
}

export default async function SeasonDetailPage({ params }: PageProps) {
  const { season: slug } = await params;
  const season = seasons.find((s) => s.slug === slug);

  if (!season) {
    notFound();
  }

  return <SeasonDetailClient season={season} />;
}
