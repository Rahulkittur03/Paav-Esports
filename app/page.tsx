import HeroSection from "@/components/home/HeroSection";
import Marquee from "@/components/ui/Marquee";
import AboutPreview from "@/components/home/AboutPreview";
import SeasonArchiveSection from "@/components/home/SeasonArchiveSection";
import UpcomingSeasonBanner from "@/components/home/UpcomingSeasonBanner";

export default function HomePage() {
  const tickerItems = [
    "PAAV ESPORTS FACEOFF: VALORANT SHOWDOWN",
    "PAAV GANG (SILVER) EXCLUSIVE LEAGUE",
    "TEAM D (SEASON 1 CHAMPIONS)",
    "PALLU KE LALLU (SEASON 2 CHAMPIONS)",
    "TEAM OG IRONS 18-20 MARATHON OVERTIME (S3)",
    "TEAM NINNI BOYZ LOWER BRACKET RUN (S4)",
    "95% MATCHES ARCHIVED ON YOUTUBE",
    "RANDOM-N-BALANCED TEAMS ALGORITHM",
    "STREAMED LIVE IN DISCORD PAAV VC",
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
