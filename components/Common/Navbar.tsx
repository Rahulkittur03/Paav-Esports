"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, ChevronDown, ArrowUpRight } from "lucide-react";
import { ValorantSparkIcon } from "@/components/ui/ValorantIcons";
import {
  ROUTE_HOME,
  ROUTE_SEASONS,
  ROUTE_ABOUT,
  ROUTE_REGISTER,
  ROUTE_SEASON_DETAIL,
} from "@/utils/routes";
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
      setIsScrolled(window.scrollY > 12);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <header
        className={`sticky top-0 z-40 w-full transition-colors duration-200 border-b ${
          isScrolled
            ? "bg-[#0A0C0F]/95 backdrop-blur-md border-white/12"
            : "bg-[#0A0C0F]/85 backdrop-blur-sm border-white/8"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            {/* Brand Mark */}
            <Link
              href={ROUTE_HOME}
              className="flex items-center gap-3 group focus:outline-none"
              aria-label="PAAV Esports Home"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#FF4655] text-white transition-colors duration-300 group-hover:bg-[#E03846]">
                <ValorantSparkIcon className="h-5 w-5" />
              </div>
              <div className="flex flex-col leading-none">
                <span className="font-sans text-lg font-black tracking-wider text-[#F4F5F7] uppercase">
                  {SITE_CONFIG.name}
                </span>
                <span className="mt-0.5 text-[10px] font-mono tracking-[0.2em] text-zinc-400 uppercase">
                  Valorant Circuit
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center gap-1" aria-label="Main Navigation">
              <Link
                href={ROUTE_HOME}
                className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  pathname === ROUTE_HOME
                    ? "text-[#F4F5F7] border-[#FF4655]"
                    : "text-zinc-400 border-transparent hover:text-[#F4F5F7]"
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
                  className={`inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                    pathname.startsWith(ROUTE_SEASONS)
                      ? "text-[#F4F5F7] border-[#FF4655]"
                      : "text-zinc-400 border-transparent hover:text-[#F4F5F7]"
                  }`}
                >
                  <span>Seasons</span>
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      seasonsDropdownOpen ? "rotate-180 text-[#FF4655]" : ""
                    }`}
                  />
                </Link>

                {seasonsDropdownOpen && (
                  <div className="absolute top-full left-0 w-64 pt-1 z-50">
                    <div className="rounded-sm border border-white/12 bg-[#11141A] p-1.5 shadow-2xl shadow-black/80">
                      <Link
                        href={ROUTE_SEASONS}
                        className="flex items-center justify-between px-3 py-2 text-xs font-bold uppercase tracking-wider text-[#F4F5F7] hover:bg-white/5 rounded-sm transition-colors"
                      >
                        <span>All Seasons (1–5)</span>
                        <span className="text-[10px] font-mono text-[#FF4655]">ARCHIVE</span>
                      </Link>
                      <div className="my-1 border-t border-white/8" />
                      {seasons.map((season) => (
                        <Link
                          key={season.slug}
                          href={ROUTE_SEASON_DETAIL(season.slug)}
                          className="flex items-center justify-between px-3 py-2 text-xs text-zinc-300 hover:text-[#F4F5F7] hover:bg-white/5 rounded-sm transition-colors"
                        >
                          <span className="truncate pr-2">{season.title}</span>
                          <span className="text-[10px] font-mono text-zinc-500 shrink-0">
                            S0{season.number}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <Link
                href={ROUTE_ABOUT}
                className={`px-3.5 py-2 text-xs font-bold uppercase tracking-wider transition-colors border-b-2 ${
                  pathname === ROUTE_ABOUT
                    ? "text-[#F4F5F7] border-[#FF4655]"
                    : "text-zinc-400 border-transparent hover:text-[#F4F5F7]"
                }`}
              >
                About
              </Link>
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center gap-3">
              <Link
                href={ROUTE_REGISTER}
                className="inline-flex items-center gap-1.5 rounded-sm bg-[#FF4655] hover:bg-[#E03846] px-4 py-2 text-xs font-bold tracking-wider uppercase text-white transition-colors"
              >
                <span>Register S6</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* Mobile Hamburger Button */}
            <div className="flex md:hidden">
              <button
                type="button"
                onClick={() => setMobileMenuOpen(true)}
                className="rounded-sm border border-white/12 p-2 text-zinc-300 hover:bg-white/5 hover:text-white transition-colors"
                aria-label="Open navigation menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      <MobileMenu isOpen={mobileMenuOpen} onClose={() => setMobileMenuOpen(false)} />
    </>
  );
}
