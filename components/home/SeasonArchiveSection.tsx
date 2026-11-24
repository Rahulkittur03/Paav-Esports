import React from "react";
import Link from "next/link";
import { ArrowRight, Trophy, Flame, CheckCircle2 } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import { seasons } from "@/data/seasons";
import { ROUTE_SEASON_DETAIL } from "@/utils/routes";

export default function SeasonArchiveSection() {
  return (
    <section id="seasons-archive" className="py-24 border-t border-white/5 bg-[#080808] relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeader
          tag="// HISTORICAL TIMELINE"
          title="The Season Archive (1–5)"
          subtitle="Relive the evolution of PAAV Esports across five complete tournament eras. Explore championship brackets, match highlights, and verified roster achievements."
          align="center"
        />

        {/* Season Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 mt-12">
          {seasons.map((season) => {
            const isLatest = season.number === 5;

            return (
              <div
                key={season.slug}
                className={`group relative flex flex-col justify-between rounded-2xl border transition-all duration-300 hover:-translate-y-1 hover:shadow-2xl hover:shadow-black/60 bg-gradient-to-b ${
                  isLatest
                    ? "border-emerald-500/40 bg-[#0e1411]/80 hover:border-emerald-500/80 shadow-[0_0_20px_rgba(16,185,129,0.15)]"
                    : "border-white/10 bg-[#0e0e11]/80 hover:border-red-500/40 hover:bg-white/[0.04]"
                }`}
              >
                {/* Header Banner Strip */}
                <div
                  className={`relative h-32 rounded-t-2xl p-6 flex flex-col justify-between overflow-hidden bg-gradient-to-r ${season.bannerGradient}`}
                >
                  <div className="absolute inset-0 bg-black/20" />
                  <div className="relative z-10 flex items-center justify-between">
                    <Badge
                      variant={isLatest ? "emerald" : "zinc"}
                      size="sm"
                    >
                      {season.statusLabel}
                    </Badge>
                    <span className="text-xl font-mono font-black text-white/50 tracking-wider">
                      #0{season.number}
                    </span>
                  </div>

                  <div className="relative z-10">
                    <span className="text-xs font-mono font-semibold text-zinc-300 uppercase tracking-widest">
                      {season.gameTitle}
                    </span>
                    <h3 className="text-xl font-extrabold text-white tracking-wide uppercase font-sans">
                      {season.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-3">
                    <p className="text-xs font-mono font-semibold text-zinc-400">
                      {season.subtitle}
                    </p>
                    <p className="text-sm text-zinc-300 leading-relaxed line-clamp-3">
                      {season.shortDescription}
                    </p>
                  </div>

                  {/* Highlights Bullet List */}
                  <div className="space-y-2 pt-2 border-t border-white/5">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500">
                      Key Milestones
                    </span>
                    <ul className="space-y-1.5">
                      {season.highlights.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                          <CheckCircle2 className="h-3.5 w-3.5 text-red-500 shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Verified Champions Tag */}
                  {season.winners.length > 0 && (
                    <div className="rounded-xl border border-white/5 bg-white/[0.02] p-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Trophy className="h-4 w-4 text-amber-400" />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono uppercase text-zinc-500">
                            Champions
                          </span>
                          <span className="text-xs font-bold text-white">
                            {season.winners[0].team}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500">
                        {season.winners[0].note?.includes("Archived") ? "Archived" : "Verified"}
                      </span>
                    </div>
                  )}

                  {/* Action Link */}
                  <div className="pt-2">
                    <Link
                      href={ROUTE_SEASON_DETAIL(season.slug)}
                      className="w-full inline-flex items-center justify-between rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10 hover:border-red-500/50 transition-all group-hover:shadow-[0_0_15px_rgba(239,68,68,0.2)]"
                    >
                      <span>Explore Season Details</span>
                      <ArrowRight className="h-3.5 w-3.5 text-zinc-400 group-hover:translate-x-1 group-hover:text-red-400 transition-all" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}

          {/* Upcoming Season Card Teaser */}
          <div className="group relative flex flex-col justify-between rounded-2xl border border-red-500/30 bg-gradient-to-b from-red-950/30 via-zinc-950 to-zinc-950 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-red-500/60 hover:shadow-2xl hover:shadow-red-950/40">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="red" size="sm">
                  Upcoming Season
                </Badge>
                <span className="text-xl font-mono font-black text-red-500/40 tracking-wider">
                  #06
                </span>
              </div>

              <div>
                <span className="text-xs font-mono font-semibold text-red-400 uppercase tracking-widest">
                  Registrations Open
                </span>
                <h3 className="text-2xl font-black text-white uppercase tracking-wide font-sans mt-1">
                  Season 6: The Next Vanguard
                </h3>
              </div>

              <p className="text-sm text-zinc-300 leading-relaxed">
                The next chapter is calling. Form your roster, choose your division, and submit
                your squad for Season 6 of the PAAV tournament circuit.
              </p>

              <div className="space-y-2 pt-2 border-t border-red-500/20">
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Available Slots:</span>
                  <span className="text-white font-bold">16 Squads</span>
                </div>
                <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
                  <span>Status:</span>
                  <span className="text-red-400 font-bold">Roster Submissions Active</span>
                </div>
              </div>
            </div>

            <div className="pt-6">
              <Link
                href="/register"
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 py-3.5 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:brightness-110 transition-all"
              >
                <Flame className="h-4 w-4" />
                <span>Register Squad for S6</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
