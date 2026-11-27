"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Play, ExternalLink, Film, ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { SITE_CONFIG } from "@/utils/config";
import { ROUTE_SEASON_DETAIL } from "@/utils/routes";

const FEATURED_MOMENTS = [
  {
    seasonSlug: "season-3",
    seasonLabel: "S03",
    title: "The 18–20 Marathon Overtime",
    detail: "Team OG Irons reverse-swept Team Forza 0–2 down in Map 5 Round 38.",
  },
  {
    seasonSlug: "season-4",
    seasonLabel: "S04",
    title: "Team NinniBoyz Lower Bracket Run",
    detail: "Dethroned undefeated Team Freeze live on stream in the Grand Finals.",
  },
  {
    seasonSlug: "season-2",
    seasonLabel: "S02",
    title: "Pallu ke Lallu BO5 Coronation",
    detail: "₹10,000 prize pool finals with map vetoes & Goateed Brimstone clutches.",
  },
  {
    seasonSlug: "season-1",
    seasonLabel: "S01",
    title: "Inaugural Valorant Showdown",
    detail: "Team D conquered the first Paav Gang bracket on January 12, 2025.",
  },
];

export default function MatchMediaSection() {
  const [activeFeed, setActiveFeed] = useState<"playlist" | "aftermovie">("playlist");

  return (
    <section className="py-16 lg:py-20 border-b border-white/10 bg-[#0A0C0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <SectionHeader
            tag="Broadcast & VODs"
            title="Watch the Circuit in Action"
            subtitle="Streamed live in Discord Paav VC and archived on YouTube. Catch full match replays and official tournament edits."
            className="mb-0"
          />

          {/* Feed Switcher */}
          <div className="inline-flex rounded-sm border border-white/12 bg-[#11141A] p-1 self-start md:self-auto">
            <button
              type="button"
              onClick={() => setActiveFeed("playlist")}
              className={`px-3.5 py-2 text-[11px] font-mono font-bold uppercase tracking-wider rounded-sm transition-colors ${
                activeFeed === "playlist"
                  ? "bg-[#FF4655] text-white"
                  : "text-zinc-400 hover:text-[#F4F5F7]"
              }`}
            >
              Match Playlist (VODs)
            </button>
            <button
              type="button"
              onClick={() => setActiveFeed("aftermovie")}
              className={`px-3.5 py-2 text-[11px] font-mono font-bold uppercase tracking-wider rounded-sm transition-colors ${
                activeFeed === "aftermovie"
                  ? "bg-[#FF4655] text-white"
                  : "text-zinc-400 hover:text-[#F4F5F7]"
              }`}
            >
              S4 Aftermovie Edit
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Main Theater (8 cols) */}
          <div className="lg:col-span-8 rounded-sm border border-white/12 bg-[#11141A] overflow-hidden flex flex-col">
            <div className="relative aspect-video bg-[#080A0D] w-full">
              {activeFeed === "playlist" ? (
                <iframe
                  src="https://www.youtube.com/embed/videoseries?list=PLlEbqFFrLm_O1z7rUMBPX9dPShpKg5Eau"
                  title="PAAV Esports Season 4 YouTube Match Playlist"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="w-full h-full flex flex-col items-center justify-center p-8 text-center tactical-grid relative">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0F] via-[#0A0C0F]/60 to-transparent" />
                  <div className="relative z-10 max-w-md space-y-4">
                    <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm bg-[#FF4655]/15 border border-[#FF4655]/40 text-[#FF4655]">
                      <Film className="h-6 w-6" />
                    </div>
                    <div className="space-y-1.5">
                      <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-[#FF4655]">
                        Edited by PIROEDITOR (2x RunnerUp PE)
                      </span>
                      <h3 className="text-xl font-black uppercase text-[#F4F5F7]">
                        Season 4 Official Aftermovie
                      </h3>
                      <p className="text-xs text-zinc-400 leading-relaxed">
                        The viral Season 4 cinematic tournament edit is hosted on Google Drive. Open
                        the full-quality cut directly below.
                      </p>
                    </div>
                    <a
                      href={SITE_CONFIG.socials.s4EditDrive}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-sm bg-[#FF4655] hover:bg-[#E03846] px-6 py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors"
                    >
                      <Play className="h-3.5 w-3.5 fill-current" />
                      <span>Watch Edit on Google Drive</span>
                      <ExternalLink className="h-3.5 w-3.5" />
                    </a>
                  </div>
                </div>
              )}
            </div>

            <div className="px-5 py-3.5 border-t border-white/10 bg-[#161A22] flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2.5">
                <span className="font-mono text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-sm bg-[#FF4655]/15 text-[#FF4655] border border-[#FF4655]/30">
                  Archive
                </span>
                <span className="text-zinc-300 font-medium">
                  {activeFeed === "playlist"
                    ? "Season 4 Full Match Playlist — ~95% of tournament matches recorded"
                    : "Season 4 Cinematic Tournament Edit by PIROEDITOR"}
                </span>
              </div>
              <a
                href={SITE_CONFIG.socials.youtubePlaylistS4}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[11px] font-bold uppercase text-zinc-400 hover:text-[#FF4655] transition-colors"
              >
                <span>YouTube Channel</span>
                <ExternalLink className="h-3 w-3" />
              </a>
            </div>
          </div>

          {/* Right Column: Iconic Match Lore Queue (4 cols) */}
          <div className="lg:col-span-4 flex flex-col justify-between gap-3">
            <div className="px-1 flex items-center justify-between">
              <span className="text-[11px] font-mono font-bold uppercase tracking-[0.16em] text-zinc-400">
                Iconic Circuit Moments
              </span>
              <span className="text-[10px] font-mono text-zinc-500">S01 – S04</span>
            </div>

            <div className="flex-1 flex flex-col gap-3">
              {FEATURED_MOMENTS.map((moment) => (
                <Link
                  key={moment.seasonSlug}
                  href={ROUTE_SEASON_DETAIL(moment.seasonSlug)}
                  className="group flex-1 rounded-sm border border-white/10 bg-[#11141A] hover:border-[#FF4655]/50 hover:bg-[#161A22] p-4 transition-colors flex flex-col justify-between gap-2"
                >
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-[#FF4655]">
                      {moment.seasonLabel} Highlight
                    </span>
                    <ArrowRight className="h-3.5 w-3.5 text-zinc-500 group-hover:text-[#FF4655] group-hover:translate-x-0.5 transition-all" />
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-[#F4F5F7] group-hover:text-white">
                      {moment.title}
                    </h3>
                    <p className="mt-1 text-xs text-zinc-400 leading-relaxed line-clamp-2">
                      {moment.detail}
                    </p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
