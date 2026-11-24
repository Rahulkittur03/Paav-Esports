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

  return (
    <div
      className={`relative mb-12 ${isCenter ? "text-center mx-auto max-w-3xl" : "max-w-2xl"} ${className}`}
    >
      {tag && (
        <div
          className={`inline-flex items-center gap-2 mb-3 text-xs font-mono font-bold tracking-widest text-red-500 uppercase ${
            isCenter ? "justify-center" : ""
          }`}
        >
          <span className="h-1.5 w-1.5 rounded-full bg-red-500 animate-pulse" />
          <span>{tag}</span>
        </div>
      )}
      <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold uppercase tracking-tight text-white font-sans">
        {title}
      </h2>
      {subtitle && (
        <p className="mt-4 text-base sm:text-lg text-zinc-400 font-normal leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-6 h-0.5 w-16 bg-gradient-to-r from-red-500 to-transparent ${
          isCenter ? "mx-auto" : ""
        }`}
      />
    </div>
  );
}
