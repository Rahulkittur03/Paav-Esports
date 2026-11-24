import React from "react";
import Link from "next/link";
import { Flame, ShieldAlert, ArrowRight, CheckCircle2, Users, Trophy } from "lucide-react";
import { ROUTE_REGISTER } from "@/utils/routes";
import { UPCOMING_SEASON_PREVIEW } from "@/data/seasons";

export default function UpcomingSeasonBanner() {
  return (
    <section className="py-20 border-t border-white/5 bg-[#060608] relative overflow-hidden">
      {/* Background radial accent */}
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-red-600/10 blur-[140px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="rounded-3xl border border-red-500/30 bg-gradient-to-r from-red-950/40 via-zinc-950 to-zinc-950 p-8 sm:p-12 lg:p-16 relative overflow-hidden shadow-2xl shadow-red-950/20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-red-500/40 bg-red-500/10 px-3.5 py-1 text-xs font-mono font-bold tracking-widest text-red-400 uppercase">
                <Flame className="h-3.5 w-3.5 text-amber-400" />
                <span>Next Championship Phase</span>
              </div>

              <h2 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans leading-tight">
                {UPCOMING_SEASON_PREVIEW.title}
              </h2>

              <p className="text-base sm:text-lg text-zinc-300 leading-relaxed max-w-2xl">
                {UPCOMING_SEASON_PREVIEW.shortDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
                <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3.5">
                  <Trophy className="h-5 w-5 text-red-500 shrink-0" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-zinc-500">
                      Format
                    </span>
                    <span className="text-xs font-bold text-white">Balanced Teams</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3.5">
                  <Users className="h-5 w-5 text-red-500 shrink-0" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-zinc-500">
                      Eligibility
                    </span>
                    <span className="text-xs font-bold text-white">Paav Gang (Silver)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-xl bg-white/5 border border-white/10 p-3.5">
                  <CheckCircle2 className="h-5 w-5 text-emerald-400 shrink-0" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-zinc-500">
                      Schedule
                    </span>
                    <span className="text-xs font-bold text-white">Weekend Evenings</span>
                  </div>
                </div>
              </div>

              {/* Demo Notice per brief section 5.5 */}
              <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/10 p-4 text-xs text-amber-200">
                <ShieldAlert className="h-4 w-4 text-amber-400 shrink-0 mt-0.5" />
                <p>
                  <strong>Frontend Demo Notice:</strong> {UPCOMING_SEASON_PREVIEW.disclaimer}
                </p>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-4 flex flex-col items-center lg:items-end justify-center">
              <div className="w-full max-w-sm rounded-2xl border border-white/10 bg-[#0d0d10] p-6 space-y-5 text-center">
                <div className="space-y-1">
                  <span className="text-xs font-mono uppercase tracking-widest text-zinc-400">
                    Registration Portal
                  </span>
                  <h3 className="text-xl font-bold text-white">Enter Your Roster</h3>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-2xl font-black text-white font-mono">16</span>
                  <span className="block text-xs font-mono text-zinc-400 uppercase">
                    Available Tournament Slots
                  </span>
                </div>

                <Link
                  href={ROUTE_REGISTER}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 py-4 text-sm font-bold tracking-wider uppercase text-white shadow-[0_0_20px_rgba(239,68,68,0.5)] hover:shadow-[0_0_30px_rgba(239,68,68,0.8)] hover:brightness-110 transition-all active:scale-95"
                >
                  <span>Register Squad Now</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <p className="text-[11px] font-mono text-zinc-500">
                  Instant client validation • Zero registration fee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
