import React from "react";
import Link from "next/link";
import {
  Trophy,
  ExternalLink,
  MessageSquare,
  Video,
  Share2,
  ArrowUpRight,
} from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import { ABOUT_PAAV } from "@/data/about";
import { SITE_CONFIG } from "@/utils/config";
import { ROUTE_SEASONS, ROUTE_REGISTER } from "@/utils/routes";

export default function AboutClient() {
  return (
    <div className="min-h-screen py-14 lg:py-16 bg-[#0A0C0F] tactical-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Hero Section */}
        <div className="max-w-4xl space-y-5">
          <Badge variant="red" size="md">
            The PAAV Story // Esports Organization
          </Badge>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black uppercase tracking-tight text-[#F4F5F7] font-sans leading-[1.02]">
            Forged in Competition.
            <br />
            <span className="text-[#FF4655]">Powered by Community.</span>
          </h1>

          <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
            {ABOUT_PAAV.intro}
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <Link
              href={ROUTE_SEASONS}
              className="inline-flex items-center gap-2 rounded-sm bg-[#FF4655] hover:bg-[#E03846] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors"
            >
              <Trophy className="h-4 w-4" />
              <span>Explore Tournament History</span>
            </Link>

            <Link
              href={ROUTE_REGISTER}
              className="inline-flex items-center gap-2 rounded-sm border border-white/15 bg-[#11141A] hover:border-[#FF4655]/60 px-6 py-3 text-xs font-bold uppercase tracking-wider text-[#F4F5F7] transition-colors"
            >
              <span>Register for Season 6</span>
              <ArrowUpRight className="h-4 w-4 text-[#FF4655]" />
            </Link>
          </div>
        </div>

        {/* Mission Statement Box */}
        <div className="rounded-sm border border-white/12 bg-[#11141A] p-6 sm:p-10">
          <div className="max-w-3xl space-y-3">
            <span className="text-[11px] font-mono font-bold tracking-[0.18em] text-[#FF4655] uppercase">
              Our Core Mission
            </span>
            <h2 className="text-2xl sm:text-3xl font-black uppercase text-[#F4F5F7] font-sans">
              Building the Premier Stage for Grassroots Contenders
            </h2>
            <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
              {ABOUT_PAAV.mission}
            </p>
          </div>
        </div>

        {/* Core Pillars */}
        <div className="space-y-8">
          <SectionHeader
            tag="Foundational Pillars"
            title="What Drives PAAV Esports"
            subtitle="Our four pillars guarantee that every tournament is conducted with competitive rigor, sporting integrity, and genuine community engagement."
            className="mb-0"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {ABOUT_PAAV.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-5 rounded-sm border border-white/10 bg-[#11141A] hover:border-[#FF4655]/45 transition-colors flex flex-col justify-between gap-4"
              >
                <div className="flex items-center justify-between border-b border-white/8 pb-3">
                  <span className="text-xs font-mono font-bold text-[#FF4655]">0{idx + 1}</span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    Pillar
                  </span>
                </div>
                <div className="space-y-2">
                  <h3 className="text-sm font-bold text-[#F4F5F7] uppercase tracking-wide">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Journey Timeline */}
        <div className="space-y-8">
          <SectionHeader
            tag="Historical Timeline"
            title="The Tournament Journey"
            subtitle="A chronological retrospective of how PAAV Esports grew across five seasons into a hallmark Valorant community circuit."
            className="mb-0"
          />

          <div className="relative border-l border-white/15 pl-6 sm:pl-8 space-y-6 ml-2">
            {ABOUT_PAAV.milestones.map((m, idx) => (
              <div key={idx} className="relative group">
                <span className="absolute -left-[29px] sm:-left-[37px] top-2 h-2.5 w-2.5 bg-[#FF4655]" />

                <div className="rounded-sm border border-white/10 bg-[#11141A] p-5 space-y-2 hover:border-[#FF4655]/40 transition-colors">
                  <div className="flex flex-wrap items-center gap-3">
                    <Badge variant={idx === 5 ? "red" : "zinc"} size="sm">
                      {m.season}
                    </Badge>
                    <h3 className="text-sm sm:text-base font-bold text-[#F4F5F7]">
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

        {/* Leadership & Key Contributors */}
        <div className="space-y-8">
          <SectionHeader
            tag="Tournament Operations"
            title="The Team Behind PAAV Esports"
            subtitle="Meet the organizers, hosts, admins, and editors who run every PAAV tournament season."
            className="mb-0"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {ABOUT_PAAV.leadership.map((member, idx) => (
              <div
                key={idx}
                className="p-5 rounded-sm border border-white/10 bg-[#11141A] space-y-3 hover:border-[#FF4655]/45 transition-colors"
              >
                <div className="h-9 w-9 rounded-sm bg-[#FF4655]/15 border border-[#FF4655]/35 flex items-center justify-center font-mono font-bold text-[#FF4655] text-xs">
                  {member.name.substring(0, 2).toUpperCase()}
                </div>
                <div>
                  <h3 className="text-sm font-bold text-[#F4F5F7]">{member.name}</h3>
                  <span className="text-[11px] font-mono text-[#FF4655] block mt-0.5">
                    {member.role}
                  </span>
                </div>
                <p className="text-xs text-zinc-400 leading-relaxed">{member.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Community Hub & Social Links */}
        <div className="rounded-sm border border-white/12 bg-[#11141A] p-6 sm:p-10 space-y-6">
          <div className="space-y-2">
            <span className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#FF4655]">
              Community Channels
            </span>
            <h2 className="text-2xl font-black uppercase text-[#F4F5F7] font-sans">
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
              className="p-4 rounded-sm border border-white/10 bg-[#0A0C0F] hover:border-[#FF4655]/50 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <MessageSquare className="h-4 w-4 text-[#FF4655]" />
                <div>
                  <span className="block text-xs font-bold text-[#F4F5F7]">Discord Hub</span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Scrims & Announcements
                  </span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
            </a>

            <a
              href={SITE_CONFIG.socials.youtube}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-sm border border-white/10 bg-[#0A0C0F] hover:border-[#FF4655]/50 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Video className="h-4 w-4 text-[#FF4655]" />
                <div>
                  <span className="block text-xs font-bold text-[#F4F5F7]">Broadcast Archive</span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Match VODs & Highlights
                  </span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
            </a>

            <a
              href={SITE_CONFIG.socials.twitter}
              target="_blank"
              rel="noopener noreferrer"
              className="p-4 rounded-sm border border-white/10 bg-[#0A0C0F] hover:border-[#FF4655]/50 transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3">
                <Share2 className="h-4 w-4 text-[#FF4655]" />
                <div>
                  <span className="block text-xs font-bold text-[#F4F5F7]">
                    Official X (Twitter)
                  </span>
                  <span className="text-[10px] font-mono text-zinc-500">
                    Live Bracket Updates
                  </span>
                </div>
              </div>
              <ExternalLink className="h-4 w-4 text-zinc-500 group-hover:text-white transition-colors" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
