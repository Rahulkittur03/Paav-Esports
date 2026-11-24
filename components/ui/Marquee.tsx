import React from "react";

interface MarqueeProps {
  items: string[];
  speed?: "normal" | "slow" | "fast";
  className?: string;
}

export default function Marquee({ items, className = "" }: MarqueeProps) {
  // Double items for seamless infinite scroll
  const displayItems = [...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-white/10 bg-zinc-950/80 py-3.5 backdrop-blur-sm ${className}`}
      aria-label="Tournament Announcement Ticker"
    >
      <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-[#080808] to-transparent z-10 pointer-events-none" />
      <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-[#080808] to-transparent z-10 pointer-events-none" />

      <div className="animate-marquee flex items-center gap-10 whitespace-nowrap">
        {displayItems.map((item, idx) => (
          <div key={idx} className="flex items-center gap-6">
            <span className="flex items-center gap-2 text-xs font-mono font-bold uppercase tracking-widest text-zinc-300">
              <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]" />
              {item}
            </span>
            <span className="text-zinc-600 font-mono text-xs">{"///"}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
