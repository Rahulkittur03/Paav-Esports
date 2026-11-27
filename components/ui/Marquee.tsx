import React from "react";

interface MarqueeProps {
  items: string[];
  className?: string;
}

export default function Marquee({ items, className = "" }: MarqueeProps) {
  const displayItems = [...items, ...items];

  return (
    <div
      className={`relative w-full overflow-hidden border-y border-white/10 bg-[#11141A] flex items-center ${className}`}
      aria-label="Tournament Announcement Ticker"
    >
      {/* Static Broadcast Tag */}
      <div className="hidden sm:flex items-center gap-2 px-4 py-2.5 bg-[#FF4655] text-white font-mono text-[10px] font-bold uppercase tracking-[0.18em] shrink-0 z-20">
        <span className="h-1.5 w-1.5 rounded-full bg-white" />
        <span>Circuit Feed</span>
      </div>

      <div className="relative flex-1 overflow-hidden py-2.5">
        <div className="absolute left-0 top-0 bottom-0 w-10 bg-gradient-to-r from-[#11141A] to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-10 bg-gradient-to-l from-[#11141A] to-transparent z-10 pointer-events-none" />

        <div className="animate-marquee flex items-center gap-8 whitespace-nowrap">
          {displayItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-8">
              <span className="flex items-center gap-2.5 text-[11px] font-mono font-semibold uppercase tracking-[0.14em] text-zinc-300">
                <span className="h-1 w-1 bg-[#FF4655]" />
                {item}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
