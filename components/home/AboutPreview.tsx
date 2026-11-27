import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/ui/SectionHeader";
import { ROUTE_ABOUT } from "@/utils/routes";
import { ABOUT_PAAV } from "@/data/about";

export default function AboutPreview() {
  return (
    <section className="py-16 lg:py-20 border-b border-white/10 bg-[#0D1015]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Organization Story */}
          <div className="lg:col-span-5 space-y-5">
            <SectionHeader
              tag="About PAAV Esports"
              title="Forged in Competition, Powered by Community"
              subtitle={ABOUT_PAAV.intro}
              className="mb-4"
            />

            <p className="text-zinc-400 text-sm leading-relaxed">
              From our inaugural Season 1 bracket to Season 5, PAAV has stood for fair-play
              balancing, live Discord Paav VC casting, and authentic community rivalries.
            </p>

            <div className="pt-2">
              <Link
                href={ROUTE_ABOUT}
                className="inline-flex items-center gap-2 text-xs font-mono font-bold tracking-[0.14em] uppercase text-[#FF4655] hover:text-white transition-colors group"
              >
                <span>Read Full Organization Story</span>
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>

          {/* Right Column: Structured 2x2 Pillars */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {ABOUT_PAAV.pillars.map((pillar, idx) => (
              <div
                key={idx}
                className="p-5 rounded-sm bg-[#11141A] border border-white/10 hover:border-[#FF4655]/45 transition-colors flex flex-col justify-between gap-3"
              >
                <div className="flex items-center justify-between border-b border-white/8 pb-3">
                  <span className="text-[11px] font-mono font-bold text-[#FF4655]">
                    0{idx + 1}
                  </span>
                  <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-500">
                    Circuit Pillar
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-bold uppercase tracking-wide text-[#F4F5F7] mb-1.5">
                    {pillar.title}
                  </h3>
                  <p className="text-xs text-zinc-400 leading-relaxed">{pillar.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
