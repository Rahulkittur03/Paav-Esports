import React from "react";
import Link from "next/link";
import { ArrowLeft, Trophy, ArrowUpRight } from "lucide-react";
import { SpikeIcon, ValorantSparkIcon } from "@/components/ui/ValorantIcons";
import { ROUTE_HOME, ROUTE_SEASONS, ROUTE_REGISTER } from "@/utils/routes";

export default function NotFound() {
  return (
    <div className="min-h-[78vh] flex items-center justify-center bg-[#0A0C0F] tactical-grid px-4 py-16">
      <div className="max-w-2xl w-full rounded-sm border border-white/12 bg-[#11141A] p-8 sm:p-12 relative overflow-hidden">
        {/* Corner brackets */}
        <div className="absolute top-3 left-3 w-4 h-4 border-t-2 border-l-2 border-[#FF4655]/60" />
        <div className="absolute top-3 right-3 w-4 h-4 border-t-2 border-r-2 border-[#FF4655]/60" />
        <div className="absolute bottom-3 left-3 w-4 h-4 border-b-2 border-l-2 border-[#FF4655]/60" />
        <div className="absolute bottom-3 right-3 w-4 h-4 border-b-2 border-r-2 border-[#FF4655]/60" />

        <div className="space-y-6">
          <div className="flex items-center justify-between border-b border-white/10 pb-4">
            <div className="inline-flex items-center gap-2 text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#FF4655]">
              <SpikeIcon className="h-4 w-4" />
              <span>Error 404 // Off-Site</span>
            </div>
            <ValorantSparkIcon className="h-5 w-5 text-zinc-600" />
          </div>

          <div className="space-y-2">
            <div className="text-6xl sm:text-7xl font-black font-mono tracking-tighter text-[#F4F5F7] leading-none">
              404<span className="text-[#FF4655]">.</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-[#F4F5F7]">
              Sector Not Found
            </h1>
            <p className="text-sm text-zinc-400 leading-relaxed max-w-lg">
              The angle you&apos;re peeking doesn&apos;t exist on this map. The page may have been
              moved or the URL was mistyped. Rotate back to base or jump into the Season Archive.
            </p>
          </div>

          <div className="pt-2 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
            <Link
              href={ROUTE_HOME}
              className="inline-flex items-center justify-center gap-2 rounded-sm bg-[#FF4655] hover:bg-[#E03846] px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Return to Base</span>
            </Link>

            <Link
              href={ROUTE_SEASONS}
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/15 bg-[#0A0C0F] hover:border-[#FF4655]/60 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#F4F5F7] transition-colors"
            >
              <Trophy className="h-4 w-4 text-[#FF4655]" />
              <span>Seasons 1–5</span>
            </Link>

            <Link
              href={ROUTE_REGISTER}
              className="inline-flex items-center justify-center gap-2 rounded-sm border border-white/15 bg-[#0A0C0F] hover:border-[#FF4655]/60 px-6 py-3 text-xs font-bold uppercase tracking-[0.14em] text-[#F4F5F7] transition-colors"
            >
              <span>Solo Queue S6</span>
              <ArrowUpRight className="h-4 w-4 text-[#FF4655]" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
