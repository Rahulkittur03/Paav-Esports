import React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Video, MessageSquare } from "lucide-react";
import { ROUTE_HOME, ROUTE_SEASONS, ROUTE_ABOUT, ROUTE_REGISTER, ROUTE_SEASON_DETAIL } from "@/utils/routes";
import { SITE_CONFIG } from "@/utils/config";
import { seasons } from "@/data/seasons";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#060607] text-zinc-400 text-sm">
      {/* Top Banner Accent */}
      <div className="h-1 w-full bg-gradient-to-r from-transparent via-red-600 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={ROUTE_HOME} className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-red-600 font-mono font-black text-white shadow-[0_0_15px_rgba(239,68,68,0.4)]">
                P
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xl font-extrabold tracking-wider text-white uppercase">
                  {SITE_CONFIG.name}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase">
                  Competitive Circuit
                </span>
              </div>
            </Link>

            <p className="text-zinc-400 text-sm leading-relaxed max-w-sm">
              {SITE_CONFIG.description}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 pt-2">
              <ShieldCheck className="h-4 w-4 text-emerald-400" />
              <span>Verified Rulebook & Fair Play Standards</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href={ROUTE_HOME} className="hover:text-white transition-colors">
                  Home Portal
                </Link>
              </li>
              <li>
                <Link href={ROUTE_SEASONS} className="hover:text-white transition-colors">
                  All Seasons (1–5)
                </Link>
              </li>
              <li>
                <Link href={ROUTE_ABOUT} className="hover:text-white transition-colors">
                  About Organization
                </Link>
              </li>
              <li>
                <Link href={ROUTE_REGISTER} className="hover:text-red-400 transition-colors">
                  Register for S6
                </Link>
              </li>
            </ul>
          </div>

          {/* Seasons Archive Shortcuts */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              Season Archives
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              {seasons.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={ROUTE_SEASON_DETAIL(s.slug)}
                    className="hover:text-red-400 transition-colors flex items-center justify-between"
                  >
                    <span>{s.title}</span>
                    <span className="text-[10px] text-zinc-600">Archived</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Season & Social Hub */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono font-bold uppercase tracking-widest text-white">
              Upcoming Season
            </h3>
            <div className="rounded-xl border border-red-500/30 bg-red-950/20 p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-white">Season 6</span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-red-500/20 text-red-400 border border-red-500/30">
                  Open
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-tight">
                Squad roster registrations currently open for the next competitive bracket.
              </p>
              <Link
                href={ROUTE_REGISTER}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-red-400 hover:text-red-300 transition-colors"
              >
                <span>Register Squad</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="pt-2 text-xs text-zinc-500 flex flex-col gap-2">
              <a
                href={SITE_CONFIG.socials.youtubePlaylistS4}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-red-400 flex items-center gap-2 transition-colors"
              >
                <Video className="h-4 w-4 text-red-500" />
                <span>YouTube Match Archive</span>
              </a>
              <div className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4 text-indigo-400" />
                <span>Discord Paav VC Lobbies</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-zinc-500">
          <div>
            © 2026 {SITE_CONFIG.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Frontend Preview Release</span>
            <span>•</span>
            <span>Backend Integration Pending</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
