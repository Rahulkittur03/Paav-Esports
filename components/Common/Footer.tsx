import React from "react";
import Link from "next/link";
import { ArrowUpRight, ShieldCheck, Video, MessageSquare } from "lucide-react";
import {
  ROUTE_HOME,
  ROUTE_SEASONS,
  ROUTE_ABOUT,
  ROUTE_REGISTER,
  ROUTE_SEASON_DETAIL,
} from "@/utils/routes";
import { SITE_CONFIG } from "@/utils/config";
import { seasons } from "@/data/seasons";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-[#080A0D] text-zinc-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Link href={ROUTE_HOME} className="inline-flex items-center gap-3">
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#FF4655] font-mono font-black text-white text-sm">
                PV
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-sans text-lg font-black tracking-wider text-[#F4F5F7] uppercase">
                  {SITE_CONFIG.name}
                </span>
                <span className="mt-0.5 text-[10px] font-mono tracking-[0.2em] text-[#FF4655] uppercase">
                  Valorant Circuit
                </span>
              </div>
            </Link>

            <p className="text-zinc-400 text-xs sm:text-sm leading-relaxed max-w-sm">
              {SITE_CONFIG.description}
            </p>

            <div className="flex items-center gap-2 text-xs font-mono text-zinc-500 pt-1">
              <ShieldCheck className="h-4 w-4 text-[#FF4655]" />
              <span>Verified Rulebook & Fair-Play Standards</span>
            </div>
          </div>

          {/* Quick Navigation */}
          <div className="space-y-3">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#F4F5F7]">
              Navigation
            </h3>
            <ul className="space-y-2 text-xs font-medium">
              <li>
                <Link href={ROUTE_HOME} className="hover:text-[#F4F5F7] transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href={ROUTE_SEASONS} className="hover:text-[#F4F5F7] transition-colors">
                  All Seasons (1–5)
                </Link>
              </li>
              <li>
                <Link href={ROUTE_ABOUT} className="hover:text-[#F4F5F7] transition-colors">
                  About PAAV
                </Link>
              </li>
              <li>
                <Link href={ROUTE_REGISTER} className="hover:text-[#FF4655] transition-colors">
                  Register for Season 6
                </Link>
              </li>
            </ul>
          </div>

          {/* Seasons Archive Shortcuts */}
          <div className="space-y-3">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#F4F5F7]">
              Season Archives
            </h3>
            <ul className="space-y-2 text-xs font-mono">
              {seasons.map((s) => (
                <li key={s.slug}>
                  <Link
                    href={ROUTE_SEASON_DETAIL(s.slug)}
                    className="hover:text-[#FF4655] transition-colors flex items-center justify-between gap-2"
                  >
                    <span className="truncate">{s.title}</span>
                    <span className="text-[10px] text-zinc-600 shrink-0">S0{s.number}</span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Upcoming Season & Social Hub */}
          <div className="space-y-3">
            <h3 className="text-[11px] font-mono font-bold uppercase tracking-[0.18em] text-[#F4F5F7]">
              Next Showdown
            </h3>
            <div className="rounded-sm border border-[#FF4655]/30 bg-[#11141A] p-3.5 space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[#F4F5F7] uppercase tracking-wide">
                  Season 6
                </span>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#FF4655]/15 text-[#FF4655] border border-[#FF4655]/30 uppercase">
                  Open
                </span>
              </div>
              <p className="text-[11px] text-zinc-400 leading-snug">
                Squad & solo roster submissions open for the next competitive bracket.
              </p>
              <Link
                href={ROUTE_REGISTER}
                className="inline-flex items-center gap-1 text-xs font-bold text-[#FF4655] hover:text-white transition-colors uppercase tracking-wider"
              >
                <span>Register Now</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            <div className="pt-1 text-xs text-zinc-400 flex flex-col gap-2">
              <a
                href={SITE_CONFIG.socials.youtubePlaylistS4}
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-[#F4F5F7] flex items-center gap-2 transition-colors"
              >
                <Video className="h-3.5 w-3.5 text-[#FF4655]" />
                <span>YouTube Match Archive</span>
              </a>
              <div className="flex items-center gap-2 text-zinc-500">
                <MessageSquare className="h-3.5 w-3.5 text-zinc-400" />
                <span>Discord Paav VC Lobbies</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-6 border-t border-white/8 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] font-mono text-zinc-500">
          <div>© 2026 {SITE_CONFIG.name}. All rights reserved.</div>
          <div className="flex items-center gap-4">
            <span>Frontend Preview</span>
            <span>•</span>
            <span>Paav Gang Community Circuit</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
