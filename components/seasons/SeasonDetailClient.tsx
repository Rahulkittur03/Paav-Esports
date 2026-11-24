"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Trophy,
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Users,
  Image as ImageIcon,
  Flame,
  X,
  Crosshair,
  Award,
  ExternalLink,
  FileText,
  Video,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { Season, GalleryItem } from "@/types/season";
import { ROUTE_SEASONS, ROUTE_SEASON_DETAIL, ROUTE_REGISTER } from "@/utils/routes";

interface SeasonDetailClientProps {
  season: Season;
}

export default function SeasonDetailClient({ season }: SeasonDetailClientProps) {
  const [selectedImage, setSelectedImage] = useState<GalleryItem | null>(null);

  const prevSlug = season.number > 1 ? `season-${season.number - 1}` : null;
  const nextSlug = season.number < 5 ? `season-${season.number + 1}` : null;
  const isLatest = season.number === 5;

  return (
    <div className="min-h-screen pb-24 cyber-grid">
      {/* Cinematic Banner Header */}
      <section
        className={`relative overflow-hidden border-b border-white/10 bg-gradient-to-b ${season.bannerGradient} pt-12 pb-20`}
      >
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[2px]" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumbs */}
          <nav className="flex items-center gap-2 text-xs font-mono text-zinc-400 mb-8">
            <Link href={ROUTE_SEASONS} className="hover:text-white transition-colors">
              Seasons Archive
            </Link>
            <span>/</span>
            <span className="text-red-400">{season.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8">
            <div className="space-y-4 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant={isLatest ? "emerald" : "red"}>
                  {season.statusLabel}
                </Badge>
                <span className="text-xs font-mono font-bold uppercase tracking-widest text-zinc-400">
                  {season.gameTitle}
                </span>
                <span className="text-xs font-mono text-zinc-500">•</span>
                <span className="text-xs font-mono text-zinc-400">{season.datesText}</span>
              </div>

              <h1 className="text-4xl sm:text-6xl font-black uppercase tracking-tight text-white font-sans">
                {season.title}
              </h1>

              <p className="text-lg sm:text-xl font-medium text-zinc-300">
                {season.subtitle}
              </p>

              <p className="text-sm sm:text-base text-zinc-400 leading-relaxed max-w-2xl">
                {season.shortDescription}
              </p>
            </div>

            {/* Season Big Pill */}
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-7xl font-mono font-black text-white/20">
                #0{season.number}
              </span>
              <span className="text-xs font-mono uppercase tracking-widest text-zinc-400 mt-1">
                Official Circuit Cycle
              </span>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-12 grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 rounded-2xl border border-white/10 bg-black/50 backdrop-blur-md">
            {season.stats.map((stat, idx) => (
              <div key={idx} className="p-3 rounded-xl bg-white/5">
                <span className="block text-[10px] font-mono uppercase text-zinc-400">
                  {stat.label}
                </span>
                <span className="text-base sm:text-lg font-bold text-white mt-0.5 block">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-16">
            {/* Overview & Format */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-red-500 uppercase">
                <Crosshair className="h-4 w-4" />
                <span>Tournament Overview & Narrative</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-sans">
                The Battle for Supremacy
              </h2>
              <div className="prose prose-invert max-w-none text-zinc-300 text-sm sm:text-base leading-relaxed space-y-4">
                <p>{season.description}</p>
              </div>

              {/* Format & Rules Card */}
              <div className="mt-6 p-6 rounded-2xl border border-white/10 bg-[#0e0e12] space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                    Tournament Format Breakdown
                  </h3>
                  <span className="text-xs font-mono text-zinc-400">{season.format}</span>
                </div>

                {season.rulebookSummary && (
                  <ul className="space-y-2 pt-2 border-t border-white/5">
                    {season.rulebookSummary.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                        <CheckCircle2 className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            {/* Tournament Highlights */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-red-500 uppercase">
                <Flame className="h-4 w-4" />
                <span>Season Milestones</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-sans">
                Key Tournament Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {season.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-5 rounded-2xl border border-white/10 bg-[#0d0d11] flex items-start gap-3 hover:border-red-500/40 transition-colors"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-red-500/10 text-red-400 font-mono text-xs font-bold shrink-0">
                      {idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed font-medium">
                      {highlight}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* Participating Teams Grid */}
            <section className="space-y-6">
              <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-red-500 uppercase">
                <Users className="h-4 w-4" />
                <span>Fielded Rosters</span>
              </div>
              <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-sans">
                Competing Squads ({season.teams.length})
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {season.teams.map((team, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-white/10 bg-[#0e0e11] hover:border-white/20 transition-all text-center space-y-1.5"
                  >
                    <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-lg bg-white/5 border border-white/10 font-mono font-black text-white text-xs">
                      {team.tag}
                    </div>
                    <span className="block text-xs font-bold text-white truncate">
                      {team.name}
                    </span>
                    <span className="block text-[10px] font-mono text-zinc-400">
                      {team.standing || "Competitor"}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            {/* Season Gallery */}
            {season.gallery && season.gallery.length > 0 && (
              <section className="space-y-6">
                <div className="flex items-center gap-2 text-xs font-mono font-bold tracking-widest text-red-500 uppercase">
                  <ImageIcon className="h-4 w-4" />
                  <span>Media & Snapshots</span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-extrabold uppercase text-white font-sans">
                  Season Gallery
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {season.gallery.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedImage(item)}
                      className="group cursor-pointer rounded-2xl border border-white/10 bg-[#0e0e12] overflow-hidden hover:border-red-500/50 transition-all hover:-translate-y-1"
                    >
                      {/* Photo Placeholder Container */}
                      <div
                        className={`h-40 flex items-center justify-center relative overflow-hidden ${item.placeholderColor || "bg-zinc-900"}`}
                      >
                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                        <ImageIcon className="h-8 w-8 text-white/30 group-hover:scale-110 transition-transform" />
                        <span className="absolute bottom-2 left-3 text-[10px] font-mono uppercase tracking-wider text-zinc-300">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-4 space-y-1">
                        <h4 className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 line-clamp-2">
                          {item.caption}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Column (4 cols): Winners Podium & Details */}
          <div className="lg:col-span-4 space-y-8">
            {/* Winners & MVP Podium Card */}
            <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-b from-amber-950/20 via-zinc-950 to-zinc-950 p-6 space-y-6 shadow-xl">
              <div className="flex items-center justify-between border-b border-amber-500/20 pb-4">
                <div className="flex items-center gap-2">
                  <Trophy className="h-5 w-5 text-amber-400" />
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                    Hall of Champions
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300 border border-amber-500/30">
                  Confirmed
                </span>
              </div>

              <div className="space-y-4">
                {season.winners.map((winner, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-xl border border-white/5 bg-white/[0.03] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-amber-400">
                        {winner.place}
                      </span>
                      <Award className="h-4 w-4 text-amber-400/60" />
                    </div>
                    <span className="text-base font-extrabold text-white block">
                      {winner.team}
                    </span>
                    {winner.player && (
                      <span className="text-xs font-mono text-zinc-300 block">
                        Player / MVP: <strong className="text-white">{winner.player}</strong>
                      </span>
                    )}
                    {winner.note && (
                      <span className="text-[11px] text-zinc-400 block pt-1 border-t border-white/5">
                        {winner.note}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-2 text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-emerald-400 shrink-0" />
                <span>Verified by PAAV Tournament Committee</span>
              </div>
            </div>

            {/* Eligibility & Lowdown */}
            {season.eligibilityRequirements && (
              <div className="rounded-2xl border border-white/10 bg-[#0d0d11] p-6 space-y-4">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="h-5 w-5 text-red-500" />
                  <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                    The Lowdown // Eligibility
                  </h3>
                </div>
                <ul className="space-y-2">
                  {season.eligibilityRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                      <CheckCircle2 className="h-4 w-4 text-emerald-400 shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Official Archive Links */}
            {season.officialLinks && (
              <div className="rounded-2xl border border-white/10 bg-[#0e0e12] p-6 space-y-4">
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white flex items-center justify-between">
                  <span>Official Archive Links</span>
                  <ExternalLink className="h-4 w-4 text-zinc-500" />
                </h3>
                <div className="space-y-2">
                  {season.officialLinks.youtubePlaylistUrl && (
                    <a
                      href={season.officialLinks.youtubePlaylistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-red-600/10 border border-red-500/20 hover:border-red-500/50 hover:bg-red-600/20 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Video className="h-4 w-4 text-red-500" />
                        <span className="text-xs font-bold text-white">YouTube Match Playlist</span>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-zinc-400 group-hover:text-white" />
                    </a>
                  )}

                  {season.officialLinks.googleDocUrl && (
                    <a
                      href={season.officialLinks.googleDocUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-blue-600/10 border border-blue-500/20 hover:border-blue-500/50 hover:bg-blue-600/20 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="h-4 w-4 text-blue-400" />
                        <span className="text-xs font-bold text-white">Tournament Overview Doc</span>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-zinc-400 group-hover:text-white" />
                    </a>
                  )}

                  {season.officialLinks.driveEditUrl && (
                    <a
                      href={season.officialLinks.driveEditUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-purple-600/10 border border-purple-500/20 hover:border-purple-500/50 hover:bg-purple-600/20 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Video className="h-4 w-4 text-purple-400" />
                        <span className="text-xs font-bold text-white">Cinematic Edit (PIROEDITOR)</span>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-zinc-400 group-hover:text-white" />
                    </a>
                  )}

                  {season.officialLinks.googleFormUrl && (
                    <a
                      href={season.officialLinks.googleFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-xl bg-white/5 border border-white/10 hover:border-white/20 hover:bg-white/10 transition-all flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <ExternalLink className="h-4 w-4 text-zinc-400" />
                        <span className="text-xs font-medium text-zinc-300">Archived Google Form</span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500">View Form</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Next Season Registration Teaser */}
            <div className="rounded-2xl border border-red-500/30 bg-red-950/20 p-6 space-y-4">
              <div className="flex items-center gap-2">
                <Flame className="h-5 w-5 text-red-500" />
                <h3 className="text-sm font-mono font-bold uppercase tracking-wider text-white">
                  Join the Next Season
                </h3>
              </div>
              <p className="text-xs text-zinc-300 leading-relaxed">
                Think your squad has what it takes to hoist the championship trophy? Registration
                is live for Season 6.
              </p>
              <Link
                href={ROUTE_REGISTER}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 py-3 text-xs font-bold uppercase tracking-wider text-white shadow-[0_0_15px_rgba(239,68,68,0.4)] hover:brightness-110 transition-all"
              >
                <span>Register for Season 6</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Season Navigation Bar */}
        <div className="mt-20 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevSlug ? (
            <Link
              href={ROUTE_SEASON_DETAIL(prevSlug)}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous Season (S{season.number - 1})</span>
            </Link>
          ) : (
            <div className="text-xs font-mono text-zinc-600">Inaugural Season</div>
          )}

          <Link
            href={ROUTE_SEASONS}
            className="rounded-xl border border-white/10 bg-white/5 px-6 py-2.5 text-xs font-mono font-bold text-white hover:bg-white/10 transition-colors"
          >
            Back to Seasons Archive
          </Link>

          {nextSlug ? (
            <Link
              href={ROUTE_SEASON_DETAIL(nextSlug)}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-white transition-colors"
            >
              <span>Next Season (S{season.number + 1})</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href={ROUTE_REGISTER}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-red-400 hover:text-red-300 transition-colors"
            >
              <span>Season 6 Registration</span>
              <Flame className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Lightbox / Modal for Gallery */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4"
        >
          <div className="relative max-w-2xl w-full rounded-2xl border border-white/15 bg-[#0e0e12] p-6 space-y-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 rounded-lg p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div
              className={`h-64 rounded-xl flex items-center justify-center ${selectedImage.placeholderColor || "bg-zinc-900"}`}
            >
              <ImageIcon className="h-16 w-16 text-white/30" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-red-400">
                {selectedImage.category}
              </span>
              <h3 className="text-lg font-bold text-white">{selectedImage.title}</h3>
              <p className="text-xs text-zinc-400">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
