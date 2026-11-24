import HeroSection from "@/components/home/HeroSection";
import Marquee from "@/components/ui/Marquee";
import AboutPreview from "@/components/home/AboutPreview";
import SeasonArchiveSection from "@/components/home/SeasonArchiveSection";
import UpcomingSeasonBanner from "@/components/home/UpcomingSeasonBanner";

export default function HomePage() {
  const tickerItems = [
    "SEASON 6 REGISTRATIONS LIVE",
    "5 MONUMENTAL SEASONS ARCHIVED",
    "120+ COMPETITIVE PLAYERS FIELDED",
    "TACTICAL FPS EXCELLENCE",
    "VERIFIED TOURNAMENT INTEGRITY",
    "HALL OF CHAMPIONS ESTABLISHED",
    "GRASSROOTS ESPORTS CIRCUIT",
  ];

  return (
    <>
      {/* Hero Section */}
      <HeroSection />

      {/* Infinite Accolades Marquee */}
      <Marquee items={tickerItems} />

      {/* About PAAV Preview */}
      <AboutPreview />

      {/* Seasons 1-5 Archive Grid */}
      <SeasonArchiveSection />

      {/* Upcoming Season 6 Promotional Banner */}
      <UpcomingSeasonBanner />
    </>
  );
}
