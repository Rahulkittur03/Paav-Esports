"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowRight, Play, Trophy, Users, Crosshair, Video } from "lucide-react";
import { ValorantSparkIcon, DuelistIcon, InitiatorIcon, ControllerIcon, SentinelIcon } from "@/components/ui/ValorantIcons";
import { ROUTE_SEASONS, ROUTE_REGISTER } from "@/utils/routes";
import { SITE_CONFIG } from "@/utils/config";

export default function HeroSection() {
  const [isPlayingHeroVideo, setIsPlayingHeroVideo] = useState(false);

  return (
    <section className="relative overflow-hidden border-b border-white/10 bg-[#0A0C0F] tactical-grid">
      {/* Subtle top-right vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-[#0A0C0F]/60 to-[#0A0C0F] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12 pb-16 lg:pt-20 lg:pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          {/* Left Column: Editorial Headline & CTAs */}
          <div className="lg:col-span-7 space-y-7">
            <div className="inline-flex items-center gap-2.5 border border-[#FF4655]/40 bg-[#FF4655]/10 px-3 py-1.5 rounded-sm">
              <ValorantSparkIcon className="h-3.5 w-3.5 text-[#FF4655]" />
              <span className="text-[11px] font-mono font-bold tracking-[0.18em] text-[#FF4655] uppercase">
                Valorant • Season 6 Solo Queue Open
              </span>
            </div>

            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-[68px] font-black uppercase tracking-tight text-[#F4F5F7] font-sans leading-[0.98]">
              Every Season.
              <br />
              <span className="text-[#FF4655]">Every Battle.</span>
              <br />
              One Legacy.
            </h1>

            <p className="max-w-xl text-sm sm:text-base text-zinc-400 leading-relaxed">
              The official competitive Valorant circuit of the{" "}
              <strong className="text-[#F4F5F7] font-semibold">Paav Gang</strong> community.
              Explore five completed seasons of rank-balanced brackets, marathon overtimes, and
              register your squad for Season 6.
            </p>

            {/* Primary & Secondary CTAs */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 pt-1">
              <Link
                href={ROUTE_SEASONS}
                className="inline-flex items-center justify-center gap-2.5 rounded-sm bg-[#FF4655] hover:bg-[#E03846] px-7 py-3.5 text-xs font-bold tracking-[0.14em] uppercase text-white transition-colors"
              >
                <Trophy className="h-4 w-4" />
                <span>Explore Seasons 1–5</span>
              </Link>

              <Link
                href={ROUTE_REGISTER}
                className="inline-flex items-center justify-center gap-2.5 rounded-sm border border-white/15 bg-[#11141A] hover:border-[#FF4655]/60 hover:bg-[#161A22] px-7 py-3.5 text-xs font-bold tracking-[0.14em] uppercase text-[#F4F5F7] transition-colors"
              >
                <span>Register for Season 6</span>
                <ArrowRight className="h-4 w-4 text-[#FF4655]" />
              </Link>
            </div>

            {/* Compact Circuit Ledger */}
            <div className="pt-6 border-t border-white/10 grid grid-cols-2 sm:grid-cols-4 gap-6">
              <div>
                <div className="flex items-center gap-1.5 text-[#FF4655] mb-1">
                  <Trophy className="h-3.5 w-3.5" />
                  <span className="text-xl sm:text-2xl font-black text-[#F4F5F7] tabular-nums">
                    05
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-zinc-500">
                  Seasons Completed
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[#FF4655] mb-1">
                  <Users className="h-3.5 w-3.5" />
                  <span className="text-xl sm:text-2xl font-black text-[#F4F5F7] tabular-nums">
                    120+
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-zinc-500">
                  Competitors
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[#FF4655] mb-1">
                  <Crosshair className="h-3.5 w-3.5" />
                  <span className="text-xl sm:text-2xl font-black text-[#F4F5F7] tabular-nums">
                    135+
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-zinc-500">
                  Matches Played
                </span>
              </div>

              <div>
                <div className="flex items-center gap-1.5 text-[#FF4655] mb-1">
                  <Video className="h-3.5 w-3.5" />
                  <span className="text-xl sm:text-2xl font-black text-[#F4F5F7] tabular-nums">
                    95%
                  </span>
                </div>
                <span className="text-[10px] font-mono uppercase tracking-[0.14em] text-zinc-500">
                  Matches Archived
                </span>
              </div>
            </div>
          </div>

          {/* Right Column: Featured Broadcast Video Reel */}
          <div className="lg:col-span-5">
            <div className="rounded-sm border border-white/12 bg-[#11141A] overflow-hidden">
              {/* Top Broadcast Bar */}
              <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/10 bg-[#161A22]">
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 rounded-full bg-[#FF4655]" />
                  <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-[#F4F5F7]">
                    Official Match Archive
                  </span>
                </div>
                <span className="text-[10px] font-mono text-zinc-400 uppercase">
                  YouTube VOD
                </span>
              </div>

              {/* 16:9 Video Frame */}
              <div className="relative aspect-video bg-[#080A0D]">
                {isPlayingHeroVideo ? (
                  <iframe
                    src="https://www.youtube.com/embed/videoseries?list=PLlEbqFFrLm_O1z7rUMBPX9dPShpKg5Eau&autoplay=1"
                    title="PAAV Esports Official Match Archive"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="w-full h-full border-0"
                  />
                ) : (
                  <button
                    type="button"
                    onClick={() => setIsPlayingHeroVideo(true)}
                    className="group relative w-full h-full flex flex-col items-center justify-center p-6 text-center tactical-grid focus:outline-none"
                    aria-label="Play PAAV Esports Match Archive Video"
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0F] via-[#0A0C0F]/40 to-transparent" />

                    {/* Corner Brackets */}
                    <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#FF4655]/60" />
                    <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#FF4655]/60" />
                    <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#FF4655]/60" />
                    <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#FF4655]/60" />

                    <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-sm bg-[#FF4655] text-white transition-transform duration-200 group-hover:scale-105 group-hover:bg-[#E03846]">
                      <Play className="h-6 w-6 fill-current ml-0.5" />
                    </div>

                    <div className="relative z-10 mt-4 space-y-1">
                      <span className="block text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF4655]">
                        Season 4 Playlist • 95% Matches Recorded
                      </span>
                      <span className="block text-sm font-bold uppercase tracking-wide text-[#F4F5F7]">
                        Watch Official PAAV Match VODs
                      </span>
                    </div>
                  </button>
                )}
              </div>

              {/* Bottom Info Strip */}
              <div className="px-4 py-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
                <div className="flex items-center gap-2 text-zinc-400">
                  <DuelistIcon className="h-3.5 w-3.5 text-[#FF4655]" />
                  <InitiatorIcon className="h-3.5 w-3.5 text-zinc-400" />
                  <ControllerIcon className="h-3.5 w-3.5 text-zinc-400" />
                  <SentinelIcon className="h-3.5 w-3.5 text-zinc-400" />
                  <span className="hidden sm:inline pl-1">All Roles • Discord Paav VC</span>
                </div>
                <a
                  href={SITE_CONFIG.socials.youtubePlaylistS4}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-[#FF4655] hover:text-white transition-colors shrink-0 uppercase font-bold"
                >
                  Open Playlist
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
