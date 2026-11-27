import React from "react";
import Link from "next/link";
import { ShieldAlert, ArrowRight, CheckCircle2, Users, Trophy } from "lucide-react";
import { ROUTE_REGISTER } from "@/utils/routes";
import { UPCOMING_SEASON_PREVIEW } from "@/data/seasons";

export default function UpcomingSeasonBanner() {
  return (
    <section className="py-16 lg:py-20 bg-[#0A0C0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="rounded-sm border border-[#FF4655]/35 bg-[#11141A] p-6 sm:p-10 lg:p-12">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left Content */}
            <div className="lg:col-span-8 space-y-5">
              <div className="inline-flex items-center gap-2 rounded-sm border border-[#FF4655]/35 bg-[#FF4655]/10 px-3 py-1 text-[10px] font-mono font-bold tracking-[0.18em] text-[#FF4655] uppercase">
                <span className="h-1.5 w-1.5 bg-[#FF4655]" />
                <span>Next Championship Phase</span>
              </div>

              <h2 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-[#F4F5F7] font-sans leading-tight">
                {UPCOMING_SEASON_PREVIEW.title}
              </h2>

              <p className="text-sm sm:text-base text-zinc-300 leading-relaxed max-w-2xl">
                {UPCOMING_SEASON_PREVIEW.shortDescription}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-1">
                <div className="flex items-center gap-3 rounded-sm bg-[#0A0C0F] border border-white/10 p-3.5">
                  <Trophy className="h-4 w-4 text-[#FF4655] shrink-0" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-zinc-500">
                      Format
                    </span>
                    <span className="text-xs font-bold text-[#F4F5F7]">Balanced Teams</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-sm bg-[#0A0C0F] border border-white/10 p-3.5">
                  <Users className="h-4 w-4 text-[#FF4655] shrink-0" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-zinc-500">
                      Eligibility
                    </span>
                    <span className="text-xs font-bold text-[#F4F5F7]">Paav Gang (Silver)</span>
                  </div>
                </div>

                <div className="flex items-center gap-3 rounded-sm bg-[#0A0C0F] border border-white/10 p-3.5">
                  <CheckCircle2 className="h-4 w-4 text-[#FF4655] shrink-0" />
                  <div>
                    <span className="block text-[10px] font-mono uppercase text-zinc-500">
                      Schedule
                    </span>
                    <span className="text-xs font-bold text-[#F4F5F7]">Weekend Evenings</span>
                  </div>
                </div>
              </div>

              <div className="flex items-start gap-2.5 rounded-sm border border-white/10 bg-[#0A0C0F] p-3.5 text-xs text-zinc-400">
                <ShieldAlert className="h-4 w-4 text-[#FF4655] shrink-0 mt-0.5" />
                <p>
                  <strong className="text-[#F4F5F7]">Frontend Demo Notice:</strong>{" "}
                  {UPCOMING_SEASON_PREVIEW.disclaimer}
                </p>
              </div>
            </div>

            {/* Right Action Box */}
            <div className="lg:col-span-4 flex flex-col items-stretch lg:items-end justify-center">
              <div className="w-full max-w-sm rounded-sm border border-white/12 bg-[#161A22] p-6 space-y-5 text-center">
                <div className="space-y-1">
                  <span className="text-[10px] font-mono uppercase tracking-[0.18em] text-zinc-400">
                    Registration Portal
                  </span>
                  <h3 className="text-lg font-black uppercase text-[#F4F5F7]">
                    Enter Your Roster
                  </h3>
                </div>

                <div className="p-4 rounded-sm bg-[#0A0C0F] border border-white/8 space-y-1">
                  <span className="text-2xl font-black text-[#F4F5F7] font-mono tabular-nums">
                    16
                  </span>
                  <span className="block text-[10px] font-mono text-zinc-400 uppercase tracking-wider">
                    Available Tournament Slots
                  </span>
                </div>

                <Link
                  href={ROUTE_REGISTER}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-sm bg-[#FF4655] hover:bg-[#E03846] py-3.5 text-xs font-bold tracking-[0.14em] uppercase text-white transition-colors"
                >
                  <span>Register Squad Now</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>

                <p className="text-[11px] font-mono text-zinc-500">
                  Instant validation • Zero entry fee
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
