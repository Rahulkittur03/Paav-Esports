import React from "react";

interface SectionHeaderProps {
  tag?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  className?: string;
}

export default function SectionHeader({
  tag,
  title,
  subtitle,
  align = "left",
  className = "",
}: SectionHeaderProps) {
  const isCenter = align === "center";
  const cleanTag = tag ? tag.replace(/^\/\/\s*/, "") : undefined;

  return (
    <div
      className={`relative mb-10 ${isCenter ? "text-center mx-auto max-w-3xl" : "max-w-2xl"} ${className}`}
    >
      {cleanTag && (
        <div
          className={`inline-flex items-center gap-2.5 mb-2.5 text-[11px] font-mono font-semibold tracking-[0.18em] text-[#FF4655] uppercase ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="h-px w-5 bg-[#FF4655]" />
          <span>{cleanTag}</span>
        </div>
      )}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black uppercase tracking-tight text-[#F4F5F7] font-sans leading-tight">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-3 text-sm sm:text-base text-zinc-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
    </div>
  );
}
