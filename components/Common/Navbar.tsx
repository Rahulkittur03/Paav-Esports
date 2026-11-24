"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, Flame } from "lucide-react";
import { ROUTE_HOME, ROUTE_SEASONS, ROUTE_ABOUT, ROUTE_REGISTER, ROUTE_SEASON_DETAIL } from "@/utils/routes";
import { SITE_CONFIG } from "@/utils/config";
import { seasons } from "@/data/seasons";
import MobileMenu from "./MobileMenu";

export default function Navbar() {
  const pathname = usePathname();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [seasonsDropdownOpen, setSeasonsDropdownOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-all duration-300 ${
          isScrolled
            ? "bg-[#080808]/90 backdrop-blur-md border-b border-white/10 shadow-lg shadow-black/50 py-3"
            : "bg-transparent border-b border-white/5 py-4"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            {/* Brand Logo */}
            <Link
              href={ROUTE_HOME}
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="PAAV Esports Home"
            >
              <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-red-500 to-red-700 font-mono font-black text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] group-hover:shadow-[0_0_22px_rgba(239,68,68,0.7)] transition-all">
                P
                <div className="absolute inset-0 rounded-xl border border-white/20" />
              </div>
              <div className="flex flex-col">
                <span className="font-sans text-xl font-extrabold tracking-wider text-white uppercase group-hover:text-red-400 transition-colors">
                  {SITE_CONFIG.name}
                </span>
                <span className="text-[10px] font-mono tracking-widest text-zinc-400 uppercase">
                  Competitive Circuit
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1.5" aria-label="Main Navigation">
              {/* Home */}
              <Link
                href={ROUTE_HOME}
                className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                  pathname === ROUTE_HOME
                    ? "text-white bg-white/10"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                }`}
              >
                Home
              </Link>

              {/* Seasons Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setSeasonsDropdownOpen(true)}
                onMouseLeave={() => setSeasonsDropdownOpen(false)}
              >
                <Link
                  href={ROUTE_SEASONS}
                  className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                    pathname.startsWith(ROUTE_SEASONS)
                      ? "text-white bg-white/10"
                      : "text-zinc-300 hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span>Seasons</span>
                  <ChevronDown className="h-4 w-4 text-zinc-400 transition-transform group-hover:rotate-180" />
                </Link>

                {/* Dropdown Menu */}
                {seasonsDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 pt-2 z-50">
                    <div className="rounded-xl border border-white/10 bg-[#0c0c0e]/95 backdrop-blur-xl p-2 shadow-2xl shadow-black/80">
                      <div className="px-3 py-1.5 text-[10px] font-mono uppercase tracking-widest text-zinc-500 border-b border-white/5 mb-1">
                        Historical Archives
                      </div>
                      <Link
                        href={ROUTE_SEASONS}
                        className="flex items-center justify-between px-3 py-2 text-xs font-bold text-zinc-200 hover:text-white hover:bg-white/5 rounded-lg transition-colors"
                      >
                        <span>All Seasons (1–5)</span>
                        <span className="text-[10px] font-mono text-zinc-500">5 Archives</span>
                      </Link>
                      <div className="my-1 border-t border-white/5" />
                      {seasons.map((season) => (
                        <Link
                          key={season.slug}
                          href={ROUTE_SEASON_DETAIL(season.slug)}
                          className="flex items-center justify-between px-3 py-1.5 text-xs text-zinc-400 hover:text-red-400 hover:bg-white/5 rounded-lg transition-colors"
                        >
                          <span>{season.title}</span>
                          <span className="text-[10px] font-mono text-zinc-500">
                            S{season.number}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* About */}
              <Link
                href={ROUTE_ABOUT}
                className={`px-4 py-2 rounded-lg text-sm font-semibold tracking-wide transition-all ${
                  pathname === ROUTE_ABOUT
                    ? "text-white bg-white/10"
                    : "text-zinc-300 hover:text-white hover:bg-white/5"
                }`}
              >
                About PAAV
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href={ROUTE_REGISTER}
                className="group relative inline-flex items-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-5 py-2.5 text-xs font-bold tracking-wider uppercase text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:shadow-[0_0_25px_rgba(239,68,68,0.7)] hover:brightness-110 transition-all active:scale-95"
              >
                <Flame className="h-4 w-4 text-amber-300 group-hover:scale-110 transition-transform" />
                <span>Register for Season 6</span>
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="rounded-lg border border-white/10 p-2 text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="h-6 w-6" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Accessible Mobile Drawer */}
      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
