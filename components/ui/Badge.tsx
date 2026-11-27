import React from "react";

interface BadgeProps {
  children: React.ReactNode;
  variant?: "red" | "emerald" | "amber" | "blue" | "purple" | "zinc";
  size?: "sm" | "md";
  dot?: boolean;
  className?: string;
}

export default function Badge({
  children,
  variant = "red",
  size = "md",
  dot = false,
  className = "",
}: BadgeProps) {
  // Unified esports palette: crimson primary or clean neutral slate
  const variantStyles = {
    red: "bg-[#FF4655]/12 text-[#FF4655] border-[#FF4655]/35",
    emerald: "bg-[#FF4655]/12 text-[#FF4655] border-[#FF4655]/35",
    amber: "bg-white/5 text-[#F4F5F7] border-white/15",
    blue: "bg-white/5 text-zinc-300 border-white/15",
    purple: "bg-white/5 text-zinc-300 border-white/15",
    zinc: "bg-white/5 text-zinc-300 border-white/12",
  };

  const dotColors = {
    red: "bg-[#FF4655]",
    emerald: "bg-[#FF4655]",
    amber: "bg-[#F4F5F7]",
    blue: "bg-zinc-400",
    purple: "bg-zinc-400",
    zinc: "bg-zinc-400",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-[11px]",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-sm border font-mono font-semibold tracking-[0.12em] uppercase ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
}
