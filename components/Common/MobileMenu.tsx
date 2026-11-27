"use client";

import React, { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { X, Trophy, Shield, ChevronRight, ArrowUpRight } from "lucide-react";
import {
  ROUTE_HOME,
  ROUTE_SEASONS,
  ROUTE_ABOUT,
  ROUTE_REGISTER,
  ROUTE_SEASON_DETAIL,
} from "@/utils/routes";
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
      className="fixed inset-0 z-50 flex flex-col justify-between bg-[#0A0C0F] p-6 overflow-y-auto"
    >
      {/* Top Bar */}
      <div className="flex items-center justify-between border-b border-white/10 pb-4">
        <Link href={ROUTE_HOME} onClick={onClose} className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-sm bg-[#FF4655] font-mono font-black text-white text-sm">
            PV
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-sans text-base font-black tracking-wider text-[#F4F5F7] uppercase">
              {SITE_CONFIG.name}
            </span>
            <span className="mt-0.5 text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
              Valorant Circuit
            </span>
          </div>
        </Link>
        <button
          onClick={onClose}
          aria-label="Close navigation menu"
          className="rounded-sm border border-white/12 p-2 text-zinc-400 hover:bg-white/5 hover:text-white transition-colors"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Navigation Links */}
      <nav className="my-8 flex flex-col gap-2">
        <span className="text-[10px] font-mono font-bold uppercase tracking-[0.2em] text-zinc-500 mb-1">
          Navigation
        </span>
        <Link
          href={ROUTE_HOME}
          onClick={onClose}
          className={`flex items-center justify-between rounded-sm px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors border ${
            pathname === ROUTE_HOME
              ? "bg-[#FF4655]/10 text-[#FF4655] border-[#FF4655]/35"
              : "text-zinc-200 border-transparent hover:bg-white/5"
          }`}
        >
          <span>Home</span>
          <ChevronRight className="h-4 w-4 text-zinc-500" />
        </Link>

        <Link
          href={ROUTE_SEASONS}
          onClick={onClose}
          className={`flex items-center justify-between rounded-sm px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors border ${
            pathname.startsWith(ROUTE_SEASONS)
              ? "bg-[#FF4655]/10 text-[#FF4655] border-[#FF4655]/35"
              : "text-zinc-200 border-transparent hover:bg-white/5"
          }`}
        >
          <span className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-[#FF4655]" />
            Seasons Archive (1–5)
          </span>
          <ChevronRight className="h-4 w-4 text-zinc-500" />
        </Link>

        <div className="grid grid-cols-1 gap-1.5 pl-4 py-1">
          {seasons.map((s) => (
            <Link
              key={s.slug}
              href={ROUTE_SEASON_DETAIL(s.slug)}
              onClick={onClose}
              className="flex items-center justify-between text-xs font-mono text-zinc-400 hover:text-[#F4F5F7] py-2 px-3 rounded-sm bg-[#11141A] border border-white/8 transition-colors"
            >
              <span className="truncate pr-2">{s.title}</span>
              <span className="text-[10px] text-[#FF4655]">S0{s.number}</span>
            </Link>
          ))}
        </div>

        <Link
          href={ROUTE_ABOUT}
          onClick={onClose}
          className={`flex items-center justify-between rounded-sm px-4 py-3 text-sm font-bold uppercase tracking-wider transition-colors border ${
            pathname === ROUTE_ABOUT
              ? "bg-[#FF4655]/10 text-[#FF4655] border-[#FF4655]/35"
              : "text-zinc-200 border-transparent hover:bg-white/5"
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
            className="flex items-center justify-center gap-2 w-full rounded-sm bg-[#FF4655] hover:bg-[#E03846] py-3.5 font-sans text-xs font-bold tracking-wider uppercase text-white transition-colors"
          >
            <span>Register for Season 6</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
          <p className="text-[11px] font-mono text-center text-zinc-500 mt-2">
            Season 6 // Limited Slots Available
          </p>
        </div>
      </nav>

      {/* Footer Info */}
      <div className="border-t border-white/10 pt-4 text-center">
        <p className="text-xs text-zinc-500 font-mono">
          © 2026 {SITE_CONFIG.name}. All rights reserved.
        </p>
      </div>
    </div>
  );
}
