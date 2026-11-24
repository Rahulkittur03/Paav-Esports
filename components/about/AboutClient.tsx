import React from "react";
import Link from "next/link";
import {
  ShieldCheck,
  Users,
  Tv,
  Trophy,
  Flame,
  ExternalLink,
  MessageSquare,
  Video,
  Share2,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import { ABOUT_PAAV } from "@/data/about";
import { SITE_CONFIG } from "@/utils/config";
import { ROUTE_SEASONS, ROUTE_REGISTER } from "@/utils/routes";

export default function AboutClient() {
  const pillarIcons: Record<string, React.ReactNode> = {
    ShieldCheck: <ShieldCheck className="h-6 w-6 text-red-500" />,
    Users: <Users className="h-6 w-6 text-red-500" />,
    Tv: <Tv className="h-6 w-6 text-red-500" />,
    Trophy: <Trophy className="h-6 w-6 text-red-500" />,
  };

  return (
    <div className="min-h-screen py-16 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-24">
        {/* Hero Section */}
        <div className="relative text-center max-w-4xl mx-auto space-y-6">
          <Badge variant="red" size="md">
            The PAAV Story // Esports Organization
          </Badge>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black uppercase tracking-tight text-white font-sans">
            Forged in Competition. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-400">
              Powered by Community.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-zinc-300 leading-relaxed font-normal">
            {ABOUT_PAAV.intro}
          </p>

          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href={ROUTE_SEASONS}
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:brightness-110 transition-all"
            >
              <Trophy className="h-4 w-4" />
              <span>Explore Tournament History</span>
            </Link>

            <Link
              href={ROUTE_REGISTER}
              className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 px-6 py-3.5 text-xs font-bold uppercase tracking-wider text-zinc-200 transition-all"
            >
              <Flame className="h-4 w-4 text-red-500" />
              <span>Register for Season 6</span>
            </Link>
          </div>
        </div>

        {/* Mission Statement Box */}
        <div className="rounded-3xl border border-white/10 bg-[#0e0e12] p-8 sm:p-12 relative overflow-hidden">
          <div className="max-w-3xl space-y-4">
            <span className="text-xs font-mono font-bold tracking-widest text-red-500 uppercase">
              {"// OUR CORE MISSION"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white font-sans">
              Building the Premier Stage for Grassroots Contenders
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {ABOUT_PAAV.mission}
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="space-y-12">
          <SectionHeader
            tag="// FOUNDATIONAL PILLARS"
            title="What Drives PAAV Esports"
            subtitle="Our four pillars guarantee that every tournament is conducted with professional rigor, sporting integrity, and genuine community engagement."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ABOUT_PAAV.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-6 rounded-2xl border border-white/10 bg-[#0c0c0f] hover:border-red-500/40 hover:bg-white/[0.03] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl space-y-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20">
                  {pillarIcons[pillar.icon] || <ShieldCheck className="h-6 w-6 text-red-500" />}
                </div>
                <h3 className="text-base font-bold text-white uppercase tracking-wide">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed font-normal">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="space-y-12">
          <SectionHeader
            tag="// HISTORICAL TIMELINE"
            title="The Tournament Journey"
            subtitle="A chronological retrospective of how PAAV Esports grew from an 8-team trial into a hallmark 16-squad competitive league."
          />

          <div className="relative border-l-2 border-white/10 pl-6 sm:pl-10 space-y-10 ml-4">
            {ABOUT_PAAV.milestones.map((m, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline node */}
                <span className="absolute -left-[31px] sm:-left-[47px] top-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-red-600 ring-4 ring-[#080808] group-hover:scale-125 transition-transform" />

                <div className="rounded-2xl border border-white/10 bg-[#0d0d10] p-6 space-y-2 hover:border-red-500/30 transition-colors">
                  <div className="flex items-center gap-3">
                    <Badge variant={idx === 5 ? "red" : "zinc"} size="sm">
                      {m.season}
                    </Badge>
                    <h3 className="text-base sm:text-lg font-bold text-white">
                      {m.milestone}
                    </h3>
                  </div>
                  <p className="text-xs sm:text-sm text-zinc-400 leading-relaxed">
                    {m.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Community Hub & Social Links */}
        <div className="rounded-3xl border border-white/10 bg-[#0b0b0e] p-8 sm:p-12 space-y-8">
          <div className="space-y-3">
            <span className="text-xs font-mono font-bold uppercase tracking-widest text-red-500">
              {"// COMMUNITY CHANNELS"}
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-white font-sans">
              Connect with PAAV Esports
            </h2>
            <p className="text-sm text-zinc-400 max-w-2xl">
              Join our community hub for tournament announcements, match schedules, scrim lobbies,
              and rulebook discussions.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <a
              href={SITE_CONFIG.socials.discord}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-red-500/40 hover:bg-white/10 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-5 w-5 text-red-400" />
                <div>
                  <span className="block text-xs font-bold text-white">Discord Hub</span>
                  <span className="text-[10px] font-mono text-zinc-500">Scrims & Announcements</span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
            </a>

            <a
              href={SITE_CONFIG.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-red-500/40 hover:bg-white/10 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Video className="h-5 w-5 text-red-400" />
                <div>
                  <span className="block text-xs font-bold text-white">Broadcast Stream</span>
                  <span className="text-[10px] font-mono text-zinc-500">Match VODs & Highlights</span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
            </a>

            <a
              href={SITE_CONFIG.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-5 rounded-2xl border border-white/10 bg-white/5 hover:border-red-500/40 hover:bg-white/10 transition-all flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Share2 className="h-5 w-5 text-red-400" />
                <div>
                  <span className="block text-xs font-bold text-white">Official X (Twitter)</span>
                  <span className="text-[10px] font-mono text-zinc-500">Live Bracket Updates</span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
            </a>
          </div>

          <p className="text-[11px] font-mono text-zinc-500">
            * Note: Official social handles will be wired upon tournament launch.
          </p>
        </div>
      </div>
    </div>
  );
}
