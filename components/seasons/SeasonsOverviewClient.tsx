"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Trophy, ArrowRight, ArrowUpRight, Shield, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import { seasons, UPCOMING_SEASON_PREVIEW } from "@/data/seasons";
import { ROUTE_SEASON_DETAIL, ROUTE_REGISTER } from "@/utils/routes";

export default function SeasonsOverviewClient() {
  const [activeTab, setActiveTab] = useState<"all" | "completed" | "upcoming">("all");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredSeasons = useMemo(() => {
    return seasons.filter((s) => {
      const matchesSearch =
        s.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.subtitle.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.shortDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
        s.winners.some((w) => w.team.toLowerCase().includes(searchTerm.toLowerCase()));

      if (activeTab === "completed") return matchesSearch && s.status === "completed";
      if (activeTab === "upcoming") return false;
      return matchesSearch;
    });
  }, [activeTab, searchTerm]);

  return (
    <div className="min-h-screen py-14 lg:py-16 bg-[#0A0C0F] tactical-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="Tournament Archive"
          title="All Seasons (1–5)"
          subtitle="A complete catalogue of every PAAV Esports tournament cycle — historical records, winning squads, and formats."
        />

        {/* Filters and Search Bar */}
        <div className="mt-6 mb-10 flex flex-col md:flex-row items-center justify-between gap-3 p-1.5 rounded-sm bg-[#11141A] border border-white/10">
          <div className="flex items-center gap-1 w-full md:w-auto overflow-x-auto">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-sm text-[11px] font-bold font-mono uppercase tracking-wider transition-colors ${
                activeTab === "all"
                  ? "bg-[#FF4655] text-white"
                  : "text-zinc-400 hover:text-[#F4F5F7] hover:bg-white/5"
              }`}
            >
              All Seasons (5)
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-4 py-2 rounded-sm text-[11px] font-bold font-mono uppercase tracking-wider transition-colors ${
                activeTab === "completed"
                  ? "bg-[#FF4655] text-white"
                  : "text-zinc-400 hover:text-[#F4F5F7] hover:bg-white/5"
              }`}
            >
              Completed (1–5)
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 py-2 rounded-sm text-[11px] font-bold font-mono uppercase tracking-wider transition-colors ${
                activeTab === "upcoming"
                  ? "bg-[#FF4655] text-white"
                  : "text-zinc-400 hover:text-[#F4F5F7] hover:bg-white/5"
              }`}
            >
              Upcoming (S6)
            </button>
          </div>

          <div className="relative w-full md:w-72">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search seasons or champions..."
              className="w-full rounded-sm bg-[#0A0C0F] border border-white/10 pl-9 pr-4 py-2 text-xs text-[#F4F5F7] placeholder-zinc-500 focus:outline-none focus:border-[#FF4655] transition-colors font-mono"
            />
          </div>
        </div>

        {/* Season Cards Grid */}
        {activeTab !== "upcoming" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSeasons.map((season) => {
              const isLatest = season.number === 5;

              return (
                <article
                  key={season.slug}
                  className={`group flex flex-col justify-between rounded-sm border transition-colors bg-[#11141A] ${
                    isLatest
                      ? "border-[#FF4655]/50 hover:border-[#FF4655]"
                      : "border-white/10 hover:border-white/25"
                  }`}
                >
                  {/* Card Header */}
                  <div className="p-5 border-b border-white/8 bg-[#161A22] flex flex-col justify-between gap-4">
                    <div className="flex items-center justify-between">
                      <Badge variant={isLatest ? "red" : "zinc"} size="sm">
                        {season.statusLabel}
                      </Badge>
                      <span className="text-lg font-mono font-black text-zinc-600 group-hover:text-[#FF4655] transition-colors">
                        0{season.number}
                      </span>
                    </div>

                    <div>
                      <span className="text-[10px] font-mono font-semibold text-zinc-400 uppercase tracking-[0.16em]">
                        {season.gameTitle} • {season.datesText}
                      </span>
                      <h2 className="mt-1 text-lg font-black text-[#F4F5F7] uppercase tracking-tight font-sans">
                        {season.title}
                      </h2>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
                    <div className="space-y-2.5">
                      <p className="text-xs font-mono text-zinc-400">{season.subtitle}</p>
                      <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                        {season.shortDescription}
                      </p>
                    </div>

                    {/* Stats Row */}
                    <div className="grid grid-cols-2 gap-2 pt-3 border-t border-white/8">
                      <div className="rounded-sm bg-[#0A0C0F] border border-white/8 p-2.5 text-center">
                        <span className="block text-[10px] font-mono text-zinc-500 uppercase">
                          Teams
                        </span>
                        <span className="text-xs font-bold text-[#F4F5F7]">
                          {season.teams.length} Squads
                        </span>
                      </div>
                      <div className="rounded-sm bg-[#0A0C0F] border border-white/8 p-2.5 text-center">
                        <span className="block text-[10px] font-mono text-zinc-500 uppercase">
                          Format
                        </span>
                        <span className="text-xs font-bold text-[#F4F5F7] truncate block px-1">
                          {season.format.split(" ")[0]}
                        </span>
                      </div>
                    </div>

                    {/* Champion Highlight */}
                    {season.winners.length > 0 && (
                      <div className="rounded-sm border border-white/8 bg-[#0A0C0F] px-3.5 py-2.5 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Trophy className="h-4 w-4 text-[#FF4655] shrink-0" />
                          <div>
                            <span className="block text-[10px] font-mono uppercase text-zinc-500">
                              {season.winners[0].place}
                            </span>
                            <span className="text-xs font-bold text-[#F4F5F7]">
                              {season.winners[0].team}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono text-zinc-500 uppercase">
                          {season.winners[0].isConfirmed ? "Verified" : "Archived"}
                        </span>
                      </div>
                    )}

                    {/* Explore Link */}
                    <Link
                      href={ROUTE_SEASON_DETAIL(season.slug)}
                      className="w-full inline-flex items-center justify-between rounded-sm border border-white/12 bg-[#161A22] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F4F5F7] hover:border-[#FF4655] hover:bg-[#FF4655] hover:text-white transition-colors"
                    >
                      <span>View Season Records</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Empty Search State */}
        {activeTab !== "upcoming" && filteredSeasons.length === 0 && (
          <div className="text-center py-16 rounded-sm border border-white/10 bg-[#11141A] p-8">
            <Trophy className="mx-auto h-10 w-10 text-zinc-600 mb-3" />
            <h3 className="text-base font-bold uppercase text-[#F4F5F7]">No Seasons Found</h3>
            <p className="text-xs text-zinc-400 mt-1.5">
              No archived season records matched your search query &quot;{searchTerm}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveTab("all");
              }}
              className="mt-5 inline-flex items-center gap-2 rounded-sm bg-[#FF4655] px-4 py-2 text-xs font-mono font-bold uppercase text-white hover:bg-[#E03846] transition-colors"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Upcoming Season Promo Box */}
        <div className="mt-12 rounded-sm border border-[#FF4655]/40 bg-[#11141A] p-6 sm:p-10">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-3.5 max-w-2xl text-center lg:text-left">
              <Badge variant="red" dot>
                Upcoming // Registration Open
              </Badge>
              <h3 className="text-2xl sm:text-3xl font-black uppercase text-[#F4F5F7] font-sans">
                {UPCOMING_SEASON_PREVIEW.title}
              </h3>
              <p className="text-sm text-zinc-300 leading-relaxed">
                {UPCOMING_SEASON_PREVIEW.shortDescription}
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-[11px] font-mono text-zinc-400 pt-1">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-3.5 w-3.5 text-[#FF4655]" />
                  16 Squad Slots
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Shield className="h-3.5 w-3.5 text-[#FF4655]" />
                  Fair-Play Monitored
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Trophy className="h-3.5 w-3.5 text-[#FF4655]" />
                  Balanced Brackets
                </span>
              </div>
            </div>

            <Link
              href={ROUTE_REGISTER}
              className="inline-flex items-center gap-2 rounded-sm bg-[#FF4655] hover:bg-[#E03846] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors shrink-0"
            >
              <span>Register Your Squad</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
