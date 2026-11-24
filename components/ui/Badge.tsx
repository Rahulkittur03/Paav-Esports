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
  dot = true,
  className = "",
}: BadgeProps) {
  const variantStyles = {
    red: "bg-red-500/10 text-red-400 border-red-500/30",
    emerald: "bg-emerald-500/10 text-emerald-400 border-emerald-500/30",
    amber: "bg-amber-500/10 text-amber-400 border-amber-500/30",
    blue: "bg-blue-500/10 text-blue-400 border-blue-500/30",
    purple: "bg-purple-500/10 text-purple-400 border-purple-500/30",
    zinc: "bg-white/5 text-zinc-300 border-white/10",
  };

  const dotColors = {
    red: "bg-red-400 shadow-[0_0_8px_#ef4444]",
    emerald: "bg-emerald-400 shadow-[0_0_8px_#10b981]",
    amber: "bg-amber-400 shadow-[0_0_8px_#f59e0b]",
    blue: "bg-blue-400 shadow-[0_0_8px_#3b82f6]",
    purple: "bg-purple-400 shadow-[0_0_8px_#a855f7]",
    zinc: "bg-zinc-400",
  };

  const sizeStyles = {
    sm: "px-2 py-0.5 text-[10px]",
    md: "px-2.5 py-1 text-xs",
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border font-mono font-semibold tracking-wider uppercase backdrop-blur-sm ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {dot && <span className={`h-1.5 w-1.5 rounded-full ${dotColors[variant]}`} />}
      {children}
    </span>
  );
}
