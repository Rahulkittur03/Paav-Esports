"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Trophy, Shield, ChevronRight } from "lucide-react";
import { ROUTE_HOME, ROUTE_SEASONS, ROUTE_ABOUT, ROUTE_REGISTER, ROUTE_SEASON_DETAIL } from "@/utils/routes";
import { seasons } from "@/data/seasons";
import { SITE_CONFIG } from "@/utils/config";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const pathname = usePathname();

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };

    if (isOpen) {
      document.body.style.overflow = "hidden";
      window.addEventListener("keydown", handleKeyDown);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Mobile Navigation Menu"
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#080808]/98 backdrop-blur-2xl p-6 overflow-y-auto"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-5">
        <Link href={ROUTE_HOME} onClick={onClose} className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-600 font-mono font-black text-white shadow-[0_0_15px_rgba(239,68,68,0.5)]">
            P
          </div>
          <div className="flex flex-col">
            <span className="font-sans text-lg font-black tracking-wider text-white">
              {SITE_CONFIG.name}
            </span>
            <span className="text-[10px] font-mono tracking-widest text-red-400 uppercase">
              Circuit Portal
            </span>
          </div>
        </Link>
        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          className="rounded-lg border border-white/10 p-2 text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <X className="h-6 w-6" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="my-8 flex flex-col gap-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-widest text-zinc-500 mb-2">
          Navigation
        </span>
        <Link
          href={ROUTE_HOME}
          onClick={onClose}
          className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-bold transition-all ${
            pathname === ROUTE_HOME
              ? "bg-red-500/10 text-red-400 border border-red-500/30"
              : "text-zinc-200 hover:bg-white/5"
          }`}
        >
          <span>Home</span>
          <ChevronRight className="h-4 w-4 text-zinc-500" />
        </Link>

        <Link
          href={ROUTE_SEASONS}
          onClick={onClose}
          className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-bold transition-all ${
            pathname.startsWith(ROUTE_SEASONS)
              ? "bg-red-500/10 text-red-400 border border-red-500/30"
              : "text-zinc-200 hover:bg-white/5"
          }`}
        >
          <span className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-red-500" />
            Seasons Archive (1–5)
          </span>
          <ChevronRight className="h-4 w-4 text-zinc-500" />
        </Link>

        {/* Season Quick Links */}
        <div className="grid grid-cols-2 gap-2 pl-4 py-2">
          {seasons.map((s) => (
            <Link
              key={s.slug}
              href={ROUTE_SEASON_DETAIL(s.slug)}
              onClick={onClose}
              className="text-xs font-mono text-zinc-400 hover:text-red-400 py-1.5 px-3 rounded-lg bg-white/5 hover:bg-white/10 border border-white/5 transition-colors"
            >
              {s.title}
            </Link>
          ))}
        </div>

        <Link
          href={ROUTE_ABOUT}
          onClick={onClose}
          className={`flex items-center justify-between rounded-xl px-4 py-3.5 text-base font-bold transition-all ${
            pathname === ROUTE_ABOUT
              ? "bg-red-500/10 text-red-400 border border-red-500/30"
              : "text-zinc-200 hover:bg-white/5"
          }`}
        >
          <span className="flex items-center gap-2">
            <Shield className="h-4 w-4 text-zinc-400" />
            About PAAV
          </span>
          <ChevronRight className="h-4 w-4 text-zinc-500" />
        </Link>

        <div className="mt-4 pt-4 border-t border-white/10">
          <Link
            href={ROUTE_REGISTER}
            onClick={onClose}
            className="flex items-center justify-center gap-2 w-full rounded-xl bg-gradient-to-r from-red-600 to-red-700 py-4 font-sans text-sm font-bold tracking-wider uppercase text-white shadow-[0_0_20px_rgba(239,68,68,0.4)] hover:brightness-110 transition-all"
          >
            <span>Register for Season 6</span>
            <ChevronRight className="h-4 w-4" />
          </Link>
          <p className="text-[11px] font-mono text-center text-zinc-500 mt-2">
            Upcoming Tournament // 16 Roster Slots Available
          </p>
        </div>
      </nav>

      {/* Footer Info */}
      <div className="border-t border-white/10 pt-5 text-center">
        <p className="text-xs text-zinc-500 font-mono">
          © 2026 {SITE_CONFIG.name}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
