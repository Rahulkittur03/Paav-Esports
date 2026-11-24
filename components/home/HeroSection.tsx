import React from "react";
import Link from "next/link";
import { ChevronRight, Flame, Trophy, Users, ShieldCheck, Crosshair } from "lucide-react";
import { ROUTE_SEASONS, ROUTE_REGISTER } from "@/utils/routes";
import { SITE_CONFIG } from "@/utils/config";

export default function HeroSection() {
  return (
    <section className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-32 cyber-grid">
      {/* Background radial gradients */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[500px] bg-red-600/10 blur-[130px] rounded-full pointer-events-none" />
      <div className="absolute top-1/3 left-1/4 w-[400px] h-[400px] bg-red-900/10 blur-[100px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center text-center">
          {/* Status Pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-red-500/30 bg-red-500/10 px-4 py-1.5 backdrop-blur-md mb-8">
            <span className="flex h-2 w-2 rounded-full bg-red-500 animate-pulse" />
            <span className="text-xs font-mono font-bold tracking-widest text-red-400 uppercase">
              Season 6 Roster Submissions Live
            </span>
          </div>

          {/* Main Headline */}
          <h1 className="max-w-5xl text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-black uppercase tracking-tight text-white font-sans leading-[1.05]">
            Every Season. <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-red-400 to-amber-400">
              Every Battle.
            </span>{" "}
            <br />
            One Legacy.
          </h1>

          {/* Subtitle */}
          <p className="mt-8 max-w-2xl text-base sm:text-xl text-zinc-300 font-normal leading-relaxed">
            Welcome to <strong className="text-white font-semibold">{SITE_CONFIG.name}</strong>, the
            epicenter of grassroots competitive gaming. Relive five monumental seasons of tournament
            history and forge your squad&apos;s legacy in our upcoming season.
          </p>

          {/* Action CTAs */}
          <div className="mt-10 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
            <Link
              href={ROUTE_SEASONS}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 text-sm font-bold tracking-wider uppercase text-white shadow-[0_0_25px_rgba(239,68,68,0.4)] hover:shadow-[0_0_35px_rgba(239,68,68,0.7)] hover:brightness-110 transition-all active:scale-95"
            >
              <Trophy className="h-4 w-4" />
              <span>Explore Seasons 1–5</span>
            </Link>

            <Link
              href={ROUTE_REGISTER}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/5 hover:bg-white/10 px-8 py-4 text-sm font-bold tracking-wider uppercase text-zinc-200 hover:text-white transition-all backdrop-blur-sm"
            >
              <Flame className="h-4 w-4 text-red-500" />
              <span>Register for Season 6</span>
              <ChevronRight className="h-4 w-4 text-zinc-400" />
            </Link>
          </div>

          {/* Quick Metrics Bar */}
          <div className="mt-20 w-full max-w-4xl grid grid-cols-2 md:grid-cols-4 gap-4 p-4 rounded-2xl border border-white/10 bg-[#0e0e11]/70 backdrop-blur-xl">
            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/[0.02]">
              <div className="flex items-center gap-1.5 text-red-400 mb-1">
                <Trophy className="h-4 w-4" />
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-sans">5</span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                Completed Seasons
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/[0.02]">
              <div className="flex items-center gap-1.5 text-red-400 mb-1">
                <Users className="h-4 w-4" />
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-sans">120+</span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                Competitors Fielded
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/[0.02]">
              <div className="flex items-center gap-1.5 text-red-400 mb-1">
                <Crosshair className="h-4 w-4" />
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-sans">135+</span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                Matches Played
              </span>
            </div>

            <div className="flex flex-col items-center justify-center p-4 rounded-xl bg-white/[0.02]">
              <div className="flex items-center gap-1.5 text-emerald-400 mb-1">
                <ShieldCheck className="h-4 w-4" />
                <span className="text-2xl sm:text-3xl font-extrabold text-white font-sans">100%</span>
              </div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-zinc-400">
                Fair-Play Verified
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
