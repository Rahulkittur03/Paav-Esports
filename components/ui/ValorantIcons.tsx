import React from "react";

interface IconProps {
  className?: string;
}

/** Sharp Valorant-inspired geometric V emblem */
export function ValorantSparkIcon({ className = "h-5 w-5" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M2.5 4.5L10.8 15.2C11.1 15.6 10.8 16.2 10.3 16.2H6.4C6 16.2 5.6 16 5.4 15.7L2.2 11.6C2 11.4 2 11.1 2 10.8V4.8C2 4.3 2.2 4.1 2.5 4.5Z" />
      <path d="M21.5 4.5L13.2 15.2C12.9 15.6 13.2 16.2 13.7 16.2H17.6C18 16.2 18.4 16 18.6 15.7L21.8 11.6C22 11.4 22 11.1 22 10.8V4.8C22 4.3 21.8 4.1 21.5 4.5Z" />
      <path d="M12 18.2L9.5 21.5H14.5L12 18.2Z" />
    </svg>
  );
}

/** Jett Tailwind Dash / Kunai wind-blade emblem */
export function JettDashIcon({ className = "h-8 w-8" }: IconProps) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={className} aria-hidden="true">
      {/* Wind speedlines */}
      <path
        d="M4 22H26M10 32H22M6 42H28"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="square"
        className="opacity-70"
      />
      {/* Aerodynamic Jett Kunai */}
      <path
        d="M24 32L42 20L60 32L42 44L24 32Z"
        fill="currentColor"
      />
      <path
        d="M34 32L42 26.5L51 32L42 37.5L34 32Z"
        fill="#0A0C0F"
      />
      <path
        d="M16 32H26"
        stroke="#FF4655"
        strokeWidth="3"
        strokeLinecap="square"
      />
    </svg>
  );
}

/** Tactical Spike silhouette */
export function SpikeIcon({ className = "h-6 w-6" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" className={className} aria-hidden="true">
      <path d="M12 2L15 7H9L12 2Z" fill="currentColor" stroke="none" />
      <path d="M7 9H17L19 15H5L7 9Z" />
      <path d="M9 15V21M15 15V21M12 15V22" />
      <circle cx="12" cy="12" r="1.5" fill="#FF4655" stroke="none" />
    </svg>
  );
}

/** Valorant Agent Role Icons */
export function DuelistIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      <path d="M12 2L15.5 8.5L22 12L15.5 15.5L12 22L8.5 15.5L2 12L8.5 8.5L12 2Z" />
    </svg>
  );
}

export function InitiatorIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M13 3L4 14H12L11 21L20 10H12L13 3Z" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function ControllerIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="7" />
      <circle cx="12" cy="12" r="2.5" fill="currentColor" stroke="none" />
    </svg>
  );
}

export function SentinelIcon({ className = "h-4 w-4" }: IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className={className} aria-hidden="true">
      <path d="M12 3L4 6.5V12C4 16.8 7.4 20.6 12 22C16.6 20.6 20 16.8 20 12V6.5L12 3Z" />
      <path d="M9 12L11 14L15 10" />
    </svg>
  );
}

export function RoleIcon({ role, className = "h-4 w-4" }: { role: string; className?: string }) {
  switch (role) {
    case "Duelist":
      return <DuelistIcon className={className} />;
    case "Initiator":
      return <InitiatorIcon className={className} />;
    case "Controller":
      return <ControllerIcon className={className} />;
    case "Sentinel":
      return <SentinelIcon className={className} />;
    default:
      return <ValorantSparkIcon className={className} />;
  }
}
