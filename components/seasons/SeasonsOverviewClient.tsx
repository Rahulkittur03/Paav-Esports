"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { Search, Trophy, ArrowRight, Flame, Shield, CheckCircle2 } from "lucide-react";
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
      if (activeTab === "upcoming") return false; // Handled separately in UI
      return matchesSearch;
    });
  }, [activeTab, searchTerm]);

  return (
    <div className="min-h-screen py-16 cyber-grid">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="// TOURNAMENT ARCHIVE"
          title="All Seasons (1–5)"
          subtitle="A comprehensive catalogue of every PAAV Esports tournament cycle. Browse historical records, winning squads, and tournament formats."
        />

        {/* Filters and Search Bar */}
        <div className="mt-8 mb-12 flex flex-col md:flex-row items-center justify-between gap-4 p-2 rounded-2xl bg-[#0f0f13] border border-white/10">
          {/* Filter Tabs */}
          <div className="flex items-center gap-1.5 w-full md:w-auto overflow-x-auto p-1">
            <button
              onClick={() => setActiveTab("all")}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all ${
                activeTab === "all"
                  ? "bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              All Seasons (5)
            </button>
            <button
              onClick={() => setActiveTab("completed")}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all ${
                activeTab === "completed"
                  ? "bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Completed (1–5)
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`px-4 py-2 rounded-xl text-xs font-bold font-mono uppercase tracking-wider transition-all ${
                activeTab === "upcoming"
                  ? "bg-red-600 text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]"
                  : "text-zinc-400 hover:text-white hover:bg-white/5"
              }`}
            >
              Upcoming (S6)
            </button>
          </div>

          {/* Search Box */}
          <div className="relative w-full md:w-72">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-zinc-500" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search seasons or champions..."
              className="w-full rounded-xl bg-white/5 border border-white/10 pl-10 pr-4 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/60 focus:ring-1 focus:ring-red-500/60 transition-all font-mono"
            />
          </div>
        </div>

        {/* Season Cards Grid */}
        {activeTab !== "upcoming" && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredSeasons.map((season) => {
              const isLatest = season.number === 5;

              return (
                <article
                  key={season.slug}
                  className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 bg-gradient-to-b ${
                    isLatest
                      ? "border-emerald-500/40 bg-[#0e1411]/90 hover:border-emerald-500/80"
                      : "border-white/10 bg-[#0d0d10]/90 hover:border-red-500/40 hover:bg-white/[0.04]"
                  }`}
                >
                  {/* Card Banner Header */}
                  <div
                    className={`h-36 rounded-t-2xl p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-r ${season.bannerGradient}`}
                  >
                    <div className="flex items-center justify-between">
                      <Badge variant={isLatest ? "emerald" : "zinc"} size="sm">
                        {season.statusLabel}
                      </Badge>
                      <span className="text-2xl font-mono font-black text-white/40 tracking-wider">
                        #0{season.number}
                      </span>
                    </div>

                    <div>
                      <span className="text-[11px] font-mono font-semibold text-zinc-300 uppercase tracking-widest">
                        {season.gameTitle}
                      </span>
                      <h2 className="text-xl font-black text-white uppercase tracking-wide font-sans">
                        {season.title}
                      </h2>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <p className="text-xs font-mono font-bold text-zinc-400">
                        {season.subtitle}
                      </p>
                      <p className="text-sm text-zinc-300 leading-relaxed">
                        {season.shortDescription}
                      </p>
                    </div>

                    {/* Stats Pill Row */}
                    <div className="grid grid-cols-2 gap-2 pt-2 border-t border-white/5">
                      <div className="rounded-lg bg-white/5 p-2 text-center">
                        <span className="block text-[10px] font-mono text-zinc-500 uppercase">
                          Teams
                        </span>
                        <span className="text-xs font-bold text-white">
                          {season.teams.length} Squads
                        </span>
                      </div>
                      <div className="rounded-lg bg-white/5 p-2 text-center">
                        <span className="block text-[10px] font-mono text-zinc-500 uppercase">
                          Format
                        </span>
                        <span className="text-xs font-bold text-white truncate block px-1">
                          {season.format.split(" ")[0]}
                        </span>
                      </div>
                    </div>

                    {/* Champion Highlight */}
                    {season.winners.length > 0 && (
                      <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 flex items-center justify-between">
                        <div className="flex items-center gap-2.5">
                          <Trophy className="h-4 w-4 text-amber-400 shrink-0" />
                          <div>
                            <span className="block text-[10px] font-mono uppercase text-zinc-500">
                              Champions
                            </span>
                            <span className="text-xs font-bold text-white">
                              {season.winners[0].team}
                            </span>
                          </div>
                        </div>
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/5 text-zinc-400">
                          {season.winners[0].isConfirmed ? "Verified" : "Archived"}
                        </span>
                      </div>
                    )}

                    {/* Explore Link */}
                    <Link
                      href={ROUTE_SEASON_DETAIL(season.slug)}
                      className="w-full inline-flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 hover:border-red-500/50 transition-all"
                    >
                      <span>View Season Records</span>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:translate-x-1 group-hover:text-red-400 transition-all" />
                    </Link>
                  </div>
                </article>
              );
            })}
          </div>
        )}

        {/* Empty Search State */}
        {activeTab !== "upcoming" && filteredSeasons.length === 0 && (
          <div className="text-center py-20 rounded-2xl border border-white/10 bg-white/5 p-8">
            <Trophy className="mx-auto h-12 w-12 text-zinc-600 mb-4" />
            <h3 className="text-lg font-bold text-white">No Seasons Found</h3>
            <p className="text-sm text-zinc-400 mt-2">
              No archived season records matched your search query &quot;{searchTerm}&quot;.
            </p>
            <button
              onClick={() => {
                setSearchTerm("");
                setActiveTab("all");
              }}
              className="mt-6 inline-flex items-center gap-2 rounded-xl bg-white/10 px-4 py-2 text-xs font-mono font-bold text-white hover:bg-white/20 transition-all"
            >
              Reset Filters
            </button>
          </div>
        )}

        {/* Upcoming Season Promo Box (Shown on "upcoming" or always at bottom of overview) */}
        <div className="mt-16 rounded-3xl border border-red-500/30 bg-gradient-to-r from-red-950/40 via-zinc-950 to-zinc-950 p-8 sm:p-12 relative overflow-hidden shadow-2xl">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="space-y-4 max-w-2xl text-center lg:text-left">
              <Badge variant="red">
                Upcoming // Registration Open
              </Badge>
              <h3 className="text-3xl sm:text-4xl font-black uppercase text-white font-sans">
                {UPCOMING_SEASON_PREVIEW.title}
              </h3>
              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed">
                {UPCOMING_SEASON_PREVIEW.shortDescription}
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 text-xs font-mono text-zinc-400 pt-2">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 className="h-4 w-4 text-red-500" />
                  16 Squad Slots
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Shield className="h-4 w-4 text-emerald-400" />
                  Anti-Cheat Monitored
                </span>
                <span>•</span>
                <span className="flex items-center gap-1.5">
                  <Trophy className="h-4 w-4 text-amber-400" />
                  Masters Championship Rules
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4">
              <Link
                href={ROUTE_REGISTER}
                className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:brightness-110 transition-all active:scale-95"
              >
                <Flame className="h-4 w-4" />
                <span>Register Your Squad</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
