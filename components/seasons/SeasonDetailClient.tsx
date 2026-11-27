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
  X,
  Crosshair,
  Award,
  ExternalLink,
  FileText,
  Video,
  ArrowUpRight,
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

  // Extract YouTube playlist ID if available for inline embed
  const playlistMatch = season.officialLinks?.youtubePlaylistUrl?.match(/list=([^&]+)/);
  const youtubePlaylistId = playlistMatch ? playlistMatch[1] : null;

  return (
    <div className="min-h-screen pb-20 bg-[#0A0C0F]">
      {/* Header Banner */}
      <section className="relative border-b border-white/10 bg-[#11141A] tactical-grid pt-10 pb-14">
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav className="flex items-center gap-2 text-[11px] font-mono text-zinc-400 mb-6 uppercase tracking-wider">
            <Link href={ROUTE_SEASONS} className="hover:text-[#F4F5F7] transition-colors">
              Seasons Archive
            </Link>
            <span>/</span>
            <span className="text-[#FF4655]">{season.title}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
            <div className="space-y-3.5 max-w-3xl">
              <div className="flex flex-wrap items-center gap-3">
                <Badge variant={isLatest ? "red" : "zinc"} size="sm">
                  {season.statusLabel}
                </Badge>
                <span className="text-[11px] font-mono font-bold uppercase tracking-widest text-zinc-400">
                  {season.gameTitle}
                </span>
                <span className="text-xs font-mono text-zinc-600">•</span>
                <span className="text-[11px] font-mono text-zinc-400">{season.datesText}</span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#F4F5F7] font-sans">
                {season.title}
              </h1>

              <p className="text-base sm:text-lg font-medium text-zinc-300">{season.subtitle}</p>

              <p className="text-sm text-zinc-400 leading-relaxed max-w-2xl">
                {season.shortDescription}
              </p>
            </div>

            <div className="hidden lg:flex flex-col items-end">
              <span className="text-6xl font-mono font-black text-white/15">
                0{season.number}
              </span>
              <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-500 mt-1">
                Official Circuit Cycle
              </span>
            </div>
          </div>

          {/* Quick Metrics Strip */}
          <div className="mt-10 grid grid-cols-2 sm:grid-cols-4 gap-3">
            {season.stats.map((stat, idx) => (
              <div key={idx} className="p-4 rounded-sm bg-[#0A0C0F] border border-white/10">
                <span className="block text-[10px] font-mono uppercase tracking-wider text-zinc-500">
                  {stat.label}
                </span>
                <span className="text-sm sm:text-base font-bold text-[#F4F5F7] mt-1 block">
                  {stat.value}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content Layout */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Main Column (8 cols) */}
          <div className="lg:col-span-8 space-y-12">
            {/* Embedded YouTube Playlist VODs if available */}
            {youtubePlaylistId && (
              <section className="space-y-4">
                <div className="flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.18em] text-[#FF4655] uppercase">
                  <Video className="h-3.5 w-3.5" />
                  <span>Official Match Broadcasts</span>
                </div>
                <div className="rounded-sm border border-white/12 bg-[#11141A] overflow-hidden">
                  <div className="aspect-video bg-[#080A0D]">
                    <iframe
                      src={`https://www.youtube.com/embed/videoseries?list=${youtubePlaylistId}`}
                      title={`${season.title} YouTube Match Archive`}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  </div>
                  <div className="px-4 py-3 border-t border-white/10 bg-[#161A22] flex items-center justify-between text-xs font-mono">
                    <span className="text-zinc-300">Season {season.number} Match Playlist</span>
                    <a
                      href={season.officialLinks?.youtubePlaylistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#FF4655] hover:text-white inline-flex items-center gap-1 uppercase font-bold"
                    >
                      <span>Open on YouTube</span>
                      <ExternalLink className="h-3 w-3" />
                    </a>
                  </div>
                </div>
              </section>
            )}

            {/* Overview & Format */}
            <section className="space-y-5">
              <div className="flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.18em] text-[#FF4655] uppercase">
                <Crosshair className="h-3.5 w-3.5" />
                <span>Tournament Overview</span>
              </div>
              <h2 className="text-2xl font-black uppercase text-[#F4F5F7] font-sans">
                The Battle for Supremacy
              </h2>
              <p className="text-zinc-300 text-sm sm:text-base leading-relaxed">
                {season.description}
              </p>

              {/* Format & Rules Card */}
              <div className="p-5 rounded-sm border border-white/10 bg-[#11141A] space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-white/8 pb-3">
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F4F5F7]">
                    Format Breakdown
                  </h3>
                  <span className="text-[11px] font-mono text-zinc-400">{season.format}</span>
                </div>

                {season.rulebookSummary && (
                  <ul className="space-y-2">
                    {season.rulebookSummary.map((rule, idx) => (
                      <li key={idx} className="flex items-start gap-2.5 text-xs text-zinc-300">
                        <CheckCircle2 className="h-4 w-4 text-[#FF4655] shrink-0 mt-0.5" />
                        <span>{rule}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </section>

            {/* Tournament Highlights */}
            <section className="space-y-5">
              <div className="flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.18em] text-[#FF4655] uppercase">
                <span>Season Milestones</span>
              </div>
              <h2 className="text-2xl font-black uppercase text-[#F4F5F7] font-sans">
                Key Tournament Highlights
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {season.highlights.map((highlight, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-sm border border-white/10 bg-[#11141A] flex items-start gap-3 hover:border-[#FF4655]/45 transition-colors"
                  >
                    <span className="flex h-6 w-6 items-center justify-center rounded-sm bg-[#FF4655]/15 text-[#FF4655] font-mono text-xs font-bold shrink-0">
                      0{idx + 1}
                    </span>
                    <p className="text-xs sm:text-sm text-zinc-300 leading-relaxed">{highlight}</p>
                  </div>
                ))}
              </div>
            </section>

            {/* Participating Teams Grid */}
            <section className="space-y-5">
              <div className="flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.18em] text-[#FF4655] uppercase">
                <Users className="h-3.5 w-3.5" />
                <span>Fielded Rosters</span>
              </div>
              <h2 className="text-2xl font-black uppercase text-[#F4F5F7] font-sans">
                Competing Squads ({season.teams.length})
              </h2>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {season.teams.map((team, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-sm border border-white/10 bg-[#11141A] hover:border-white/25 transition-colors text-center space-y-1.5"
                  >
                    <div className="mx-auto flex h-9 w-9 items-center justify-center rounded-sm bg-[#161A22] border border-white/10 font-mono font-black text-[#F4F5F7] text-xs">
                      {team.tag}
                    </div>
                    <span className="block text-xs font-bold text-[#F4F5F7] truncate">
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
              <section className="space-y-5">
                <div className="flex items-center gap-2 text-[11px] font-mono font-bold tracking-[0.18em] text-[#FF4655] uppercase">
                  <ImageIcon className="h-3.5 w-3.5" />
                  <span>Media & Snapshots</span>
                </div>
                <h2 className="text-2xl font-black uppercase text-[#F4F5F7] font-sans">
                  Season Gallery
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {season.gallery.map((item) => (
                    <div
                      key={item.id}
                      onClick={() => setSelectedImage(item)}
                      className="group cursor-pointer rounded-sm border border-white/10 bg-[#11141A] overflow-hidden hover:border-[#FF4655]/50 transition-colors"
                    >
                      <div className="h-36 flex items-center justify-center relative overflow-hidden bg-[#161A22] tactical-grid">
                        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0C0F] via-transparent to-transparent" />
                        <ImageIcon className="h-7 w-7 text-white/25 group-hover:text-[#FF4655] transition-colors" />
                        <span className="absolute bottom-2 left-3 text-[10px] font-mono uppercase tracking-wider text-zinc-300">
                          {item.category}
                        </span>
                      </div>
                      <div className="p-4 space-y-1">
                        <h4 className="text-xs font-bold text-[#F4F5F7] group-hover:text-[#FF4655] transition-colors">
                          {item.title}
                        </h4>
                        <p className="text-[11px] text-zinc-400 line-clamp-2">{item.caption}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </div>

          {/* Sidebar Column (4 cols) */}
          <div className="lg:col-span-4 space-y-6">
            {/* Hall of Champions */}
            <div className="rounded-sm border border-[#FF4655]/40 bg-[#11141A] p-5 space-y-5">
              <div className="flex items-center justify-between border-b border-white/10 pb-3.5">
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-[#FF4655]" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F4F5F7]">
                    Hall of Champions
                  </h3>
                </div>
                <span className="text-[10px] font-mono px-2 py-0.5 rounded-sm bg-[#FF4655]/15 text-[#FF4655] border border-[#FF4655]/30 uppercase">
                  Confirmed
                </span>
              </div>

              <div className="space-y-3">
                {season.winners.map((winner, idx) => (
                  <div
                    key={idx}
                    className="p-4 rounded-sm border border-white/8 bg-[#0A0C0F] space-y-1.5"
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-[#FF4655]">
                        {winner.place}
                      </span>
                      <Award className="h-3.5 w-3.5 text-zinc-500" />
                    </div>
                    <span className="text-sm font-extrabold text-[#F4F5F7] block">
                      {winner.team}
                    </span>
                    {winner.player && (
                      <span className="text-xs font-mono text-zinc-300 block">
                        Player / MVP: <strong className="text-[#F4F5F7]">{winner.player}</strong>
                      </span>
                    )}
                    {winner.note && (
                      <span className="text-[11px] text-zinc-400 block pt-1.5 border-t border-white/8">
                        {winner.note}
                      </span>
                    )}
                  </div>
                ))}
              </div>

              <div className="pt-1 text-[11px] font-mono text-zinc-500 flex items-center gap-1.5">
                <ShieldCheck className="h-4 w-4 text-[#FF4655] shrink-0" />
                <span>Verified by PAAV Tournament Committee</span>
              </div>
            </div>

            {/* Eligibility */}
            {season.eligibilityRequirements && (
              <div className="rounded-sm border border-white/10 bg-[#11141A] p-5 space-y-3.5">
                <div className="flex items-center gap-2 border-b border-white/8 pb-3">
                  <ShieldCheck className="h-4 w-4 text-[#FF4655]" />
                  <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F4F5F7]">
                    Eligibility Rules
                  </h3>
                </div>
                <ul className="space-y-2">
                  {season.eligibilityRequirements.map((req, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs text-zinc-300">
                      <CheckCircle2 className="h-3.5 w-3.5 text-[#FF4655] shrink-0 mt-0.5" />
                      <span>{req}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Official Archive Links */}
            {season.officialLinks && (
              <div className="rounded-sm border border-white/10 bg-[#11141A] p-5 space-y-3.5">
                <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F4F5F7] flex items-center justify-between border-b border-white/8 pb-3">
                  <span>Official Links</span>
                  <ExternalLink className="h-3.5 w-3.5 text-zinc-500" />
                </h3>
                <div className="space-y-2">
                  {season.officialLinks.youtubePlaylistUrl && (
                    <a
                      href={season.officialLinks.youtubePlaylistUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-sm bg-[#0A0C0F] border border-white/10 hover:border-[#FF4655]/60 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Video className="h-4 w-4 text-[#FF4655]" />
                        <span className="text-xs font-bold text-[#F4F5F7]">
                          YouTube Match Playlist
                        </span>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white" />
                    </a>
                  )}

                  {season.officialLinks.googleDocUrl && (
                    <a
                      href={season.officialLinks.googleDocUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-sm bg-[#0A0C0F] border border-white/10 hover:border-[#FF4655]/60 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <FileText className="h-4 w-4 text-[#FF4655]" />
                        <span className="text-xs font-bold text-[#F4F5F7]">
                          Tournament Overview Doc
                        </span>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white" />
                    </a>
                  )}

                  {season.officialLinks.driveEditUrl && (
                    <a
                      href={season.officialLinks.driveEditUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-sm bg-[#0A0C0F] border border-white/10 hover:border-[#FF4655]/60 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <Video className="h-4 w-4 text-[#FF4655]" />
                        <span className="text-xs font-bold text-[#F4F5F7]">
                          Cinematic Edit (PIROEDITOR)
                        </span>
                      </div>
                      <ExternalLink className="h-3.5 w-3.5 text-zinc-500 group-hover:text-white" />
                    </a>
                  )}

                  {season.officialLinks.googleFormUrl && (
                    <a
                      href={season.officialLinks.googleFormUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-sm bg-[#0A0C0F] border border-white/10 hover:border-white/25 transition-colors flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5">
                        <ExternalLink className="h-4 w-4 text-zinc-400" />
                        <span className="text-xs font-medium text-zinc-300">
                          Archived Google Form
                        </span>
                      </div>
                      <span className="text-[10px] font-mono text-zinc-500">View</span>
                    </a>
                  )}
                </div>
              </div>
            )}

            {/* Next Season Registration Teaser */}
            <div className="rounded-sm border border-[#FF4655]/40 bg-[#11141A] p-5 space-y-4">
              <h3 className="text-xs font-mono font-bold uppercase tracking-wider text-[#F4F5F7]">
                Join Season 6
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed">
                Think your squad has what it takes to hoist the championship trophy? Registration is
                live for Season 6.
              </p>
              <Link
                href={ROUTE_REGISTER}
                className="w-full inline-flex items-center justify-center gap-2 rounded-sm bg-[#FF4655] hover:bg-[#E03846] py-3 text-xs font-bold uppercase tracking-wider text-white transition-colors"
              >
                <span>Register for Season 6</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Season Navigation Bar */}
        <div className="mt-16 pt-6 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4">
          {prevSlug ? (
            <Link
              href={ROUTE_SEASON_DETAIL(prevSlug)}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-[#F4F5F7] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Previous Season (S0{season.number - 1})</span>
            </Link>
          ) : (
            <div className="text-xs font-mono text-zinc-600">Inaugural Season</div>
          )}

          <Link
            href={ROUTE_SEASONS}
            className="rounded-sm border border-white/12 bg-[#11141A] px-5 py-2 text-xs font-mono font-bold text-[#F4F5F7] hover:border-[#FF4655] transition-colors"
          >
            Back to Seasons Archive
          </Link>

          {nextSlug ? (
            <Link
              href={ROUTE_SEASON_DETAIL(nextSlug)}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-zinc-400 hover:text-[#F4F5F7] transition-colors"
            >
              <span>Next Season (S0{season.number + 1})</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          ) : (
            <Link
              href={ROUTE_REGISTER}
              className="inline-flex items-center gap-2 text-xs font-mono font-bold text-[#FF4655] hover:text-white transition-colors"
            >
              <span>Season 6 Registration</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          )}
        </div>
      </div>

      {/* Lightbox / Modal for Gallery */}
      {selectedImage && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4"
        >
          <div className="relative max-w-2xl w-full rounded-sm border border-white/15 bg-[#11141A] p-6 space-y-4">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 rounded-sm p-1.5 text-zinc-400 hover:text-white hover:bg-white/10 transition-colors"
              aria-label="Close modal"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="h-64 rounded-sm flex items-center justify-center bg-[#0A0C0F] border border-white/10 tactical-grid">
              <ImageIcon className="h-14 w-14 text-white/25" />
            </div>

            <div className="space-y-1">
              <span className="text-[10px] font-mono uppercase tracking-widest text-[#FF4655]">
                {selectedImage.category}
              </span>
              <h3 className="text-lg font-bold text-[#F4F5F7]">{selectedImage.title}</h3>
              <p className="text-xs text-zinc-400">{selectedImage.caption}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
