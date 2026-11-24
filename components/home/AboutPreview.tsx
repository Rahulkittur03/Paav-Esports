import React from "react";
import Link from "next/link";
import { ArrowRight, ShieldCheck, Users, Tv, Trophy } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { ROUTE_ABOUT } from "@/utils/routes";
import { ABOUT_PAAV } from "@/data/about";

export default function AboutPreview() {
  const icons = {
    ShieldCheck: <ShieldCheck className="h-6 w-6 text-red-500" />,
    Users: <Users className="h-6 w-6 text-red-500" />,
    Tv: <Tv className="h-6 w-6 text-red-500" />,
    Trophy: <Trophy className="h-6 w-6 text-red-500" />,
  };

  return (
    <section className="py-20 border-t border-white/5 bg-[#0a0a0d] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left Column: Organization Story */}
          <div className="lg:col-span-6 space-y-6">
            <SectionHeader
              tag="// ABOUT PAAV ESPORTS"
              title="Forged in Competition, Powered by Community"
              subtitle={ABOUT_PAAV.intro}
            />

            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed">
              From our humble beginnings in Season 1 to the grand scale of Season 5, PAAV has stood
              as a beacon for fair-play, high-level competition, and authentic player stories. We
              don&apos;t just host brackets; we craft competitive journeys.
            </p>

            <div className="pt-2">
              <Link
                href={ROUTE_ABOUT}
                className="inline-flex items-center gap-2 text-sm font-bold tracking-wider uppercase text-red-400 hover:text-red-300 transition-colors group"
              >
                <span>Read Full Organization Story</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Key Pillars */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ABOUT_PAAV.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="group p-6 rounded-2xl bg-white/[0.03] border border-white/10 hover:border-red-500/40 hover:bg-white/[0.05] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/50"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10 border border-red-500/20 group-hover:border-red-500/50 group-hover:bg-red-500/20 transition-all">
                  {icons[pillar.icon as keyof typeof icons] || <Trophy className="h-6 w-6 text-red-500" />}
                </div>
                <h3 className="text-base font-bold text-white mb-2 group-hover:text-red-400 transition-colors">
                  {pillar.title}
                </h3>
                <p className="text-xs text-zinc-400 leading-relaxed">
                  {pillar.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
