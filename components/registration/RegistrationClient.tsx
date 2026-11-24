"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Flame,
  ShieldAlert,
  Users,
  CheckCircle2,
  AlertCircle,
  Plus,
  Trash2,
  Trophy,
  RotateCcw,
  Sparkles,
  User,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  updateField,
  updateRosterPlayer,
  addSubstitute,
  removeSubstitute,
  setErrors,
  submitDemoStart,
  submitDemoSuccess,
  resetRegistration,
} from "@/features/registration/registrationSlice";
import { RegistrationErrors, DemoSubmissionReceipt, ValorantRank, AgentRole } from "@/types/registration";
import { toast } from "sonner";
import { ROUTE_HOME } from "@/utils/routes";

const VALORANT_RANKS: ValorantRank[] = [
  "Iron",
  "Bronze",
  "Silver",
  "Gold",
  "Platinum",
  "Diamond",
  "Ascendant",
  "Immortal",
  "Radiant",
];

const AGENT_ROLES: AgentRole[] = [
  "Duelist",
  "Initiator",
  "Controller",
  "Sentinel",
  "Substitute",
];

export default function RegistrationClient() {
  const dispatch = useAppDispatch();
  const { formData, errors, status, receipt } = useAppSelector((state) => state.registration);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const isSolo = formData.entryType === "solo";

  const validateForm = (): boolean => {
    const errs: RegistrationErrors = {};

    if (!isSolo) {
      if (!formData.teamName.trim()) {
        errs.teamName = "Team name is required.";
      } else if (formData.teamName.length < 3) {
        errs.teamName = "Team name must be at least 3 characters.";
      }

      if (!formData.teamTag.trim()) {
        errs.teamTag = "Team tag is required.";
      } else if (formData.teamTag.length < 2 || formData.teamTag.length > 5) {
        errs.teamTag = "Tag must be 2–5 characters.";
      }
    }

    if (!formData.teamLeaderName.trim()) {
      errs.teamLeaderName = isSolo ? "Player full name is required." : "Captain name is required.";
    }

    if (!formData.email.trim()) {
      errs.email = "Email address is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = "Please enter a valid email address.";
    }

    if (!formData.contactNumber.trim()) {
      errs.contactNumber = "Contact phone number is required.";
    } else if (formData.contactNumber.replace(/\D/g, "").length < 7) {
      errs.contactNumber = "Please enter a valid phone number (at least 7 digits).";
    }

    if (!formData.discordId.trim()) {
      errs.discordId = "Discord username is required for Paav VC match lobbies.";
    }

    if (isSolo) {
      // Validate primary solo player in slot 0
      const soloPlayer = formData.roster[0];
      if (!soloPlayer?.fullName.trim()) {
        errs["roster_0_fullName"] = "Full name is required.";
      }
      if (!soloPlayer?.inGameId.trim()) {
        errs["roster_0_inGameId"] = "Valorant Riot ID & Tag (e.g. Agent#PAAV) is required.";
      }
    } else {
      // Validate all 5 starters
      formData.roster.slice(0, 5).forEach((player, idx) => {
        if (!player.fullName.trim()) {
          errs[`roster_${idx}_fullName`] = `Player ${idx + 1} name is required.`;
        }
        if (!player.inGameId.trim()) {
          errs[`roster_${idx}_inGameId`] = `Player ${idx + 1} Riot ID & Tag is required.`;
        }
      });
    }

    if (!formData.agreedToRules) {
      errs.agreedToRules = "You must agree to the Paav Esports Tournament Regulations.";
    }

    if (Object.keys(errs).length > 0) {
      dispatch(setErrors(errs));
      toast.error("Please fill in all required fields accurately.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(submitDemoStart());

    setTimeout(() => {
      const demoReceipt: DemoSubmissionReceipt = {
        registrationCode: `PAAV-S6-${Math.floor(100000 + Math.random() * 900000)}`,
        submittedAt: new Date().toLocaleString(),
        entryType: formData.entryType,
        membershipType: formData.membershipType,
        teamName: isSolo ? `Solo Queue (${formData.teamLeaderName})` : formData.teamName,
        teamTag: isSolo ? "SOLO" : formData.teamTag.toUpperCase(),
        teamLeaderName: formData.teamLeaderName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        discordId: formData.discordId,
        gameDiscipline: formData.gameDiscipline,
        roster: isSolo ? [formData.roster[0]] : formData.roster,
        status: "DEMO_VERIFIED",
        disclaimer:
          "Frontend Demo Only: Your registration schema has been validated. Official database persistence and match lobby assignments will open upon tournament kickoff in Discord Paav VC.",
      };

      dispatch(submitDemoSuccess(demoReceipt));
      setShowReceiptModal(true);
      toast.success("Registration validated successfully! Check your receipt.");
    }, 600);
  };

  const handleReset = () => {
    dispatch(resetRegistration());
    setShowReceiptModal(false);
    toast.info("Registration form reset.");
  };

  return (
    <div className="min-h-screen py-16 cyber-grid">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center">
          <Badge variant="red" size="md">
            Paav ESports FaceOff - Season 6 // Valorant
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
            Register for Season 6
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Exclusively for <strong className="text-white">Paav Gang (Silver)</strong> &{" "}
            <strong className="text-white">YouTube Channel Members</strong>. Enter as a Solo Queue
            agent (random-n-balanced teams) or register a full 5-player squad.
          </p>
        </div>

        {/* Demo Notice Banner */}
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 flex items-start gap-4 text-amber-200">
          <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <strong className="block font-bold text-amber-300 uppercase tracking-wide">
              Frontend Demo Notice
            </strong>
            <p className="text-amber-200/90 leading-relaxed">
              This form verifies your Valorant Riot ID, rank, and Paav Gang membership criteria on
              the client. Official tournament brackets, lobby pings, and scheduling are managed
              directly in Discord Paav VC.
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Section 0: Format & Membership Selectors */}
          <div className="rounded-2xl border border-white/10 bg-[#0e0e12] p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <Sparkles className="h-5 w-5 text-red-500" />
              <h2 className="text-lg font-bold uppercase text-white font-sans tracking-wide">
                1. Entry Type & Membership
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Entry Format */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Participation Format
                </label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => dispatch(updateField({ field: "entryType", value: "solo" }))}
                    className={`p-3.5 rounded-xl border text-xs font-bold font-mono uppercase transition-all flex flex-col items-center gap-1 ${
                      isSolo
                        ? "bg-red-600/20 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                        : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <User className="h-4 w-4" />
                    <span>Solo Queue</span>
                    <span className="text-[10px] text-zinc-400 font-normal">Balanced Team</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => dispatch(updateField({ field: "entryType", value: "team" }))}
                    className={`p-3.5 rounded-xl border text-xs font-bold font-mono uppercase transition-all flex flex-col items-center gap-1 ${
                      !isSolo
                        ? "bg-red-600/20 border-red-500 text-white shadow-[0_0_15px_rgba(239,68,68,0.3)]"
                        : "bg-white/5 border-white/10 text-zinc-400 hover:text-white"
                    }`}
                  >
                    <Users className="h-4 w-4" />
                    <span>Full Squad</span>
                    <span className="text-[10px] text-zinc-400 font-normal">5 Players</span>
                  </button>
                </div>
              </div>

              {/* Membership Type */}
              <div className="space-y-2">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Eligibility Verification
                </label>
                <select
                  value={formData.membershipType}
                  onChange={(e) =>
                    dispatch(
                      updateField({
                        field: "membershipType",
                        value: e.target.value as "paav_gang_silver" | "youtube_member",
                      })
                    )
                  }
                  className="w-full rounded-xl bg-[#121217] border border-white/10 px-4 py-3.5 text-xs text-white focus:outline-none focus:border-red-500/60"
                >
                  <option value="paav_gang_silver">Paav Gang Member (Silver Role on Discord)</option>
                  <option value="youtube_member">YouTube Channel Member</option>
                </select>
                <span className="text-[10px] font-mono text-zinc-400 block">
                  * Must be verified in Discord server prior to match day.
                </span>
              </div>
            </div>
          </div>

          {/* Section 1: Team / Player Profile */}
          {!isSolo && (
            <div className="rounded-2xl border border-white/10 bg-[#0e0e12] p-6 sm:p-8 space-y-6">
              <div className="flex items-center gap-2 border-b border-white/5 pb-4">
                <Trophy className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-bold uppercase text-white font-sans tracking-wide">
                  2. Squad Profile
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                <div className="sm:col-span-2 space-y-1.5">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                    Team Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.teamName}
                    onChange={(e) =>
                      dispatch(updateField({ field: "teamName", value: e.target.value }))
                    }
                    placeholder="e.g. Pallu ke Lallu or Team OG Irons"
                    className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none ${
                      errors.teamName ? "border-red-500" : "border-white/10 focus:border-red-500/60"
                    }`}
                  />
                  {errors.teamName && (
                    <p className="text-xs text-red-400 font-mono mt-1">{errors.teamName}</p>
                  )}
                </div>

                <div className="space-y-1.5">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                    Tag (2–5 Chars) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    maxLength={5}
                    value={formData.teamTag}
                    onChange={(e) =>
                      dispatch(
                        updateField({ field: "teamTag", value: e.target.value.toUpperCase() })
                      )
                    }
                    placeholder="e.g. PKL"
                    className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none uppercase font-mono ${
                      errors.teamTag ? "border-red-500" : "border-white/10 focus:border-red-500/60"
                    }`}
                  />
                  {errors.teamTag && (
                    <p className="text-xs text-red-400 font-mono mt-1">{errors.teamTag}</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Section 2: Contact Information */}
          <div className="rounded-2xl border border-white/10 bg-[#0e0e12] p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <Users className="h-5 w-5 text-red-500" />
              <h2 className="text-lg font-bold uppercase text-white font-sans tracking-wide">
                {isSolo ? "2. Player Contact Info" : "3. Captain / Contact Info"}
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                  {isSolo ? "Player Full Name" : "Team Captain Name"} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.teamLeaderName}
                  onChange={(e) =>
                    dispatch(updateField({ field: "teamLeaderName", value: e.target.value }))
                  }
                  placeholder="e.g. Ayush or Agent Name"
                  className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none ${
                    errors.teamLeaderName ? "border-red-500" : "border-white/10 focus:border-red-500/60"
                  }`}
                />
                {errors.teamLeaderName && (
                  <p className="text-xs text-red-400 font-mono mt-1">{errors.teamLeaderName}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Discord Username <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.discordId}
                  onChange={(e) =>
                    dispatch(updateField({ field: "discordId", value: e.target.value }))
                  }
                  placeholder="e.g. elitex_kd or ayush#0000"
                  className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none ${
                    errors.discordId ? "border-red-500" : "border-white/10 focus:border-red-500/60"
                  }`}
                />
                {errors.discordId && (
                  <p className="text-xs text-red-400 font-mono mt-1">{errors.discordId}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    dispatch(updateField({ field: "email", value: e.target.value }))
                  }
                  placeholder="agent@example.com"
                  className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none ${
                    errors.email ? "border-red-500" : "border-white/10 focus:border-red-500/60"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-red-400 font-mono mt-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                  WhatsApp / Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) =>
                    dispatch(updateField({ field: "contactNumber", value: e.target.value }))
                  }
                  placeholder="+91 98765 43210"
                  className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none ${
                    errors.contactNumber ? "border-red-500" : "border-white/10 focus:border-red-500/60"
                  }`}
                />
                {errors.contactNumber && (
                  <p className="text-xs text-red-400 font-mono mt-1">{errors.contactNumber}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Valorant Roster / Solo Profile */}
          <div className="rounded-2xl border border-white/10 bg-[#0e0e12] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-bold uppercase text-white font-sans tracking-wide">
                  {isSolo ? "3. Valorant Agent Profile" : "4. Team Lineup (5 Starters Mandatory)"}
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                {isSolo ? "Solo Queue Entry" : `${formData.roster.length} Players Listed`}
              </span>
            </div>

            <div className="space-y-4">
              {(isSolo ? [formData.roster[0]] : formData.roster).map((player, idx) => {
                const isStarter = idx < 5;
                const nameErr = errors[`roster_${idx}_fullName`];
                const ignErr = errors[`roster_${idx}_inGameId`];

                return (
                  <div
                    key={player.id}
                    className="p-4 rounded-xl border border-white/5 bg-white/[0.02] space-y-3"
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="h-6 w-6 rounded-full bg-white/5 flex items-center justify-center text-[11px] font-mono font-bold text-zinc-300">
                          {idx + 1}
                        </span>
                        <span className="text-xs font-bold uppercase tracking-wider text-white">
                          {isSolo
                            ? "Solo Participant"
                            : isStarter
                            ? `Starter Slot ${idx + 1}`
                            : "Substitute Slot"}
                        </span>
                        {!isSolo && player.isCaptain && (
                          <Badge variant="amber" size="sm">
                            Captain
                          </Badge>
                        )}
                      </div>

                      {!isSolo && !isStarter && (
                        <button
                          type="button"
                          onClick={() => dispatch(removeSubstitute(idx))}
                          className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1"
                        >
                          <Trash2 className="h-3.5 w-3.5" />
                          <span>Remove</span>
                        </button>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
                      {/* Full Name */}
                      <div>
                        <input
                          type="text"
                          value={player.fullName}
                          onChange={(e) =>
                            dispatch(
                              updateRosterPlayer({
                                index: idx,
                                field: "fullName",
                                value: e.target.value,
                              })
                            )
                          }
                          placeholder="Player Name *"
                          className={`w-full rounded-lg bg-white/5 border px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none ${
                            nameErr ? "border-red-500" : "border-white/10 focus:border-red-500/60"
                          }`}
                        />
                        {nameErr && (
                          <span className="text-[10px] text-red-400 font-mono mt-1 block">
                            {nameErr}
                          </span>
                        )}
                      </div>

                      {/* Riot ID & Tag */}
                      <div>
                        <input
                          type="text"
                          value={player.inGameId}
                          onChange={(e) =>
                            dispatch(
                              updateRosterPlayer({
                                index: idx,
                                field: "inGameId",
                                value: e.target.value,
                              })
                            )
                          }
                          placeholder="Riot ID#Tag (e.g. Agent#PAAV) *"
                          className={`w-full rounded-lg bg-white/5 border px-3 py-2 text-xs text-white placeholder-zinc-500 focus:outline-none font-mono ${
                            ignErr ? "border-red-500" : "border-white/10 focus:border-red-500/60"
                          }`}
                        />
                        {ignErr && (
                          <span className="text-[10px] text-red-400 font-mono mt-1 block">
                            {ignErr}
                          </span>
                        )}
                      </div>

                      {/* Rank Selector */}
                      <div>
                        <select
                          value={player.currentRank}
                          onChange={(e) =>
                            dispatch(
                              updateRosterPlayer({
                                index: idx,
                                field: "currentRank",
                                value: e.target.value,
                              })
                            )
                          }
                          className="w-full rounded-lg bg-[#121217] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/60 font-mono"
                        >
                          {VALORANT_RANKS.map((r) => (
                            <option key={r} value={r}>
                              Rank: {r}
                            </option>
                          ))}
                        </select>
                      </div>

                      {/* Agent Role */}
                      <div>
                        <select
                          value={player.role}
                          onChange={(e) =>
                            dispatch(
                              updateRosterPlayer({
                                index: idx,
                                field: "role",
                                value: e.target.value,
                              })
                            )
                          }
                          className="w-full rounded-lg bg-[#121217] border border-white/10 px-3 py-2 text-xs text-white focus:outline-none focus:border-red-500/60"
                        >
                          {AGENT_ROLES.map((role) => (
                            <option key={role} value={role}>
                              Role: {role}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {!isSolo && formData.roster.length < 7 && (
              <button
                type="button"
                onClick={() => dispatch(addSubstitute())}
                className="w-full py-2.5 rounded-xl border border-dashed border-white/15 hover:border-red-500/40 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white flex items-center justify-center gap-2 transition-colors"
              >
                <Plus className="h-4 w-4" />
                <span>Add Extra Substitute</span>
              </button>
            )}
          </div>

          {/* Section 4: Rules Agreement */}
          <div className="rounded-2xl border border-white/10 bg-[#0e0e12] p-6 space-y-4">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreedToRules}
                onChange={(e) =>
                  dispatch(updateField({ field: "agreedToRules", value: e.target.checked }))
                }
                className="mt-1 h-4 w-4 rounded border-white/20 bg-white/5 text-red-600 focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <div className="space-y-1">
                <span className="text-xs font-bold text-white block">
                  I agree to the Paav Esports Valorant Tournament Regulations & Chill Mindset Code <span className="text-red-500">*</span>
                </span>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  I confirm that I am an active Paav Gang (Silver) or YouTube member, will join Discord Paav VC for matches, and will maintain good sportsmanship throughout the tournament.
                </p>
              </div>
            </label>
            {errors.agreedToRules && (
              <p className="flex items-center gap-1.5 text-xs text-red-400 font-mono">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{errors.agreedToRules}</span>
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-white/10 px-6 py-3.5 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-white/5 transition-all"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset Form</span>
            </button>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-600 to-red-700 px-8 py-4 text-sm font-bold uppercase tracking-wider text-white shadow-[0_0_25px_rgba(239,68,68,0.5)] hover:brightness-110 transition-all active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                <>
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Validating Roster...</span>
                </>
              ) : (
                <>
                  <Flame className="h-4 w-4" />
                  <span>Submit Demo Registration</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* Demo Submission Receipt Modal */}
      {showReceiptModal && receipt && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md p-4 overflow-y-auto"
        >
          <div className="relative max-w-xl w-full rounded-2xl border border-emerald-500/40 bg-[#0e120f] p-6 sm:p-8 space-y-6 shadow-2xl my-8">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.3)]">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <Badge variant="emerald" size="md">
                Demo Verification Successful
              </Badge>
              <h3 className="text-2xl font-black uppercase text-white font-sans">
                Roster Receipt Generated
              </h3>
              <p className="text-xs text-zinc-400">
                Your registration has passed all frontend validation checks.
              </p>
            </div>

            {/* Receipt Details Card */}
            <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-zinc-500 uppercase">Verification Code:</span>
                <span className="text-emerald-400 font-bold">{receipt.registrationCode}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Format:</span>
                <span className="text-white font-bold uppercase">{receipt.entryType} Entry</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Eligibility:</span>
                <span className="text-amber-400">
                  {receipt.membershipType === "paav_gang_silver"
                    ? "Paav Gang (Silver)"
                    : "YouTube Member"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">{receipt.entryType === "solo" ? "Player:" : "Team:"}</span>
                <span className="text-white font-bold">
                  {receipt.teamName} {receipt.teamTag ? `[${receipt.teamTag}]` : ""}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Discord ID:</span>
                <span className="text-white">{receipt.discordId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Riot ID / Ign:</span>
                <span className="text-red-400">{receipt.roster[0]?.inGameId}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-zinc-500">Valorant Rank:</span>
                <span className="text-emerald-400">{receipt.roster[0]?.currentRank}</span>
              </div>
            </div>

            {/* Prominent Demo Notice */}
            <div className="rounded-xl border border-amber-500/30 bg-amber-500/10 p-3.5 text-xs text-amber-200 space-y-1">
              <strong className="block font-bold text-amber-300">
                Backend Integration Status: Pending
              </strong>
              <p className="text-[11px] leading-relaxed">
                {receipt.disclaimer}
              </p>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <Link
                href={ROUTE_HOME}
                onClick={() => setShowReceiptModal(false)}
                className="w-full sm:w-1/2 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 text-xs font-mono font-bold text-center text-white transition-colors"
              >
                Return to Home
              </Link>
              <button
                type="button"
                onClick={() => setShowReceiptModal(false)}
                className="w-full sm:w-1/2 py-3 rounded-xl bg-gradient-to-r from-emerald-600 to-emerald-700 hover:brightness-110 text-xs font-mono font-bold text-white transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
              >
                Done / Review Roster
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
