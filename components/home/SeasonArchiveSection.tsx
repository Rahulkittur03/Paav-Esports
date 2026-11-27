import React from "react";
import Link from "next/link";
import { ArrowRight, Trophy, CheckCircle2, ArrowUpRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import Badge from "@/components/ui/Badge";
import { seasons } from "@/data/seasons";
import { ROUTE_SEASON_DETAIL, ROUTE_REGISTER } from "@/utils/routes";

export default function SeasonArchiveSection() {
  return (
    <section id="seasons-archive" className="py-16 lg:py-20 border-b border-white/10 bg-[#0A0C0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10">
          <SectionHeader
            tag="Historical Timeline"
            title="The Season Archive (1–5)"
            subtitle="Explore every completed PAAV tournament cycle — brackets, rosters, match highlights, and verified champions."
            className="mb-0"
          />
          <Link
            href="/seasons"
            className="inline-flex items-center gap-1.5 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-[#FF4655] transition-colors shrink-0"
          >
            <span>View Full Catalogue</span>
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>

        {/* Season Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {seasons.map((season) => {
            const isLatest = season.number === 5;

            return (
              <div
                key={season.slug}
                className={`group flex flex-col justify-between rounded-sm border transition-colors bg-[#11141A] ${
                  isLatest
                    ? "border-[#FF4655]/45 hover:border-[#FF4655]"
                    : "border-white/10 hover:border-white/25"
                }`}
              >
                {/* Top Header Bar */}
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
                    <h3 className="mt-1 text-lg font-black text-[#F4F5F7] tracking-tight uppercase font-sans">
                      {season.title}
                    </h3>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-5">
                  <div className="space-y-2.5">
                    <p className="text-xs font-mono text-zinc-400">{season.subtitle}</p>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed line-clamp-3">
                      {season.shortDescription}
                    </p>
                  </div>

                  {/* Key Milestones */}
                  <div className="space-y-2 pt-3 border-t border-white/8">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-[0.16em] text-zinc-500">
                      Key Milestones
                    </span>
                    <ul className="space-y-1.5">
                      {season.highlights.slice(0, 2).map((item, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-zinc-400">
                          <CheckCircle2 className="h-3.5 w-3.5 text-[#FF4655] shrink-0 mt-0.5" />
                          <span className="line-clamp-1">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Verified Champions Tag */}
                  {season.winners.length > 0 && (
                    <div className="rounded-sm border border-white/8 bg-[#0A0C0F] px-3.5 py-2.5 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <Trophy className="h-4 w-4 text-[#FF4655] shrink-0" />
                        <div className="flex flex-col">
                          <span className="text-[10px] font-mono uppercase text-zinc-500">
                            {season.winners[0].place}
                          </span>
                          <span className="text-xs font-bold text-[#F4F5F7]">
                            {season.winners[0].team}
                          </span>
                        </div>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500 uppercase">
                        Verified
                      </span>
                    </div>
                  )}

                  {/* Action Link */}
                  <Link
                    href={ROUTE_SEASON_DETAIL(season.slug)}
                    className="w-full inline-flex items-center justify-between rounded-sm border border-white/12 bg-[#161A22] px-4 py-2.5 text-xs font-bold uppercase tracking-wider text-[#F4F5F7] hover:border-[#FF4655] hover:bg-[#FF4655] hover:text-white transition-colors"
                  >
                    <span>Explore Season</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </div>
            );
          })}

          {/* Upcoming Season 6 Card */}
          <div className="flex flex-col justify-between rounded-sm border border-[#FF4655]/50 bg-[#11141A] p-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="red" size="sm" dot>
                  Registrations Open
                </Badge>
                <span className="text-lg font-mono font-black text-[#FF4655]">06</span>
              </div>

              <div>
                <span className="text-[10px] font-mono font-semibold text-[#FF4655] uppercase tracking-[0.18em]">
                  Next Championship Cycle
                </span>
                <h3 className="text-xl font-black text-[#F4F5F7] uppercase tracking-tight font-sans mt-1">
                  Season 6: The Next FaceOff
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">
                Form your squad or enter solo queue. Submit your roster for Season 6 of the PAAV
                Valorant tournament circuit.
              </p>

              <div className="space-y-2 pt-3 border-t border-white/10 text-xs font-mono">
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Capacity:</span>
                  <span className="text-[#F4F5F7] font-bold">16 Squads</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Format:</span>
                  <span className="text-[#F4F5F7] font-bold">Balanced Teams</span>
                </div>
                <div className="flex items-center justify-between text-zinc-400">
                  <span>Status:</span>
                  <span className="text-[#FF4655] font-bold">Active</span>
                </div>
              </div>
            </div>

            <Link
              href={ROUTE_REGISTER}
              className="mt-6 w-full inline-flex items-center justify-center gap-2 rounded-sm bg-[#FF4655] hover:bg-[#E03846] py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors"
            >
              <span>Register for Season 6</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
