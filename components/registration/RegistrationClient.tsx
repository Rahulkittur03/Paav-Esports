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
import { RegistrationErrors, DemoSubmissionReceipt } from "@/types/registration";
import { toast } from "sonner";
import { ROUTE_HOME } from "@/utils/routes";

export default function RegistrationClient() {
  const dispatch = useAppDispatch();
  const { formData, errors, status, receipt } = useAppSelector((state) => state.registration);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const validateForm = (): boolean => {
    const errs: RegistrationErrors = {};

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

    if (!formData.teamLeaderName.trim()) {
      errs.teamLeaderName = "Team leader name is required.";
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

    // Validate 5 starters
    formData.roster.slice(0, 5).forEach((player, idx) => {
      if (!player.fullName.trim()) {
        errs[`roster_${idx}_fullName`] = `Player ${idx + 1} name is required.`;
      }
      if (!player.inGameId.trim()) {
        errs[`roster_${idx}_inGameId`] = `Player ${idx + 1} IGN is required.`;
      }
    });

    if (!formData.agreedToRules) {
      errs.agreedToRules = "You must accept the tournament regulations.";
    }

    if (Object.keys(errs).length > 0) {
      dispatch(setErrors(errs));
      toast.error("Please correct the validation errors in the form.");
      return false;
    }

    return true;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    dispatch(submitDemoStart());

    // Simulate brief client-side processing
    setTimeout(() => {
      const demoReceipt: DemoSubmissionReceipt = {
        registrationCode: `PAAV-S6-${Math.floor(100000 + Math.random() * 900000)}`,
        submittedAt: new Date().toLocaleString(),
        teamName: formData.teamName,
        teamTag: formData.teamTag.toUpperCase(),
        teamLeaderName: formData.teamLeaderName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        discordId: formData.discordId || "Not Provided",
        gameDiscipline: formData.gameDiscipline,
        roster: formData.roster,
        status: "DEMO_VERIFIED",
        disclaimer:
          "Frontend Demo Only: This simulation confirms client-side data schema validation. Official backend database synchronization will open prior to tournament kickoff.",
      };

      dispatch(submitDemoSuccess(demoReceipt));
      setShowReceiptModal(true);
      toast.success("Roster validated successfully! Check your demo receipt.");
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
            Season 6 // Roster Recruitment
          </Badge>
          <h1 className="text-4xl sm:text-5xl font-black uppercase tracking-tight text-white font-sans">
            Register for Season 6
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-xl mx-auto">
            Submit your squad for Season 6: The Next Vanguard. Provide your organization
            credentials, team captain contact, and active competitive roster.
          </p>
        </div>

        {/* Demo Notice Banner (Mandatory per Project Brief Section 5.5) */}
        <div className="rounded-2xl border border-amber-500/40 bg-amber-500/10 p-5 flex items-start gap-4 text-amber-200">
          <ShieldAlert className="h-5 w-5 text-amber-400 shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <strong className="block font-bold text-amber-300 uppercase tracking-wide">
              Frontend-Only Demo Notice
            </strong>
            <p className="text-amber-200/90 leading-relaxed">
              This tournament portal is currently in its frontend preview release. Submitted team
              and roster data undergoes full client-side schema validation and generates a
              demo confirmation ticket. No backend, database, or live tournament API is connected.
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-10">
          {/* Section 1: Team Credentials */}
          <div className="rounded-2xl border border-white/10 bg-[#0e0e12] p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <Trophy className="h-5 w-5 text-red-500" />
              <h2 className="text-lg font-bold uppercase text-white font-sans tracking-wide">
                1. Team Profile
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {/* Team Name */}
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
                  placeholder="e.g. Apex Protocol"
                  className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                    errors.teamName
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-white/10 focus:border-red-500/60"
                  }`}
                />
                {errors.teamName && (
                  <p className="flex items-center gap-1.5 text-xs text-red-400 font-mono">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>{errors.teamName}</span>
                  </p>
                )}
              </div>

              {/* Team Tag */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Tag (2–5 Chars) <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  maxLength={5}
                  value={formData.teamTag}
                  onChange={(e) =>
                    dispatch(updateField({ field: "teamTag", value: e.target.value.toUpperCase() }))
                  }
                  placeholder="e.g. APX"
                  className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none uppercase font-mono transition-colors ${
                    errors.teamTag
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-white/10 focus:border-red-500/60"
                  }`}
                />
                {errors.teamTag && (
                  <p className="flex items-center gap-1.5 text-xs text-red-400 font-mono">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>{errors.teamTag}</span>
                  </p>
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Game Discipline */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Tournament Discipline
                </label>
                <select
                  value={formData.gameDiscipline}
                  onChange={(e) =>
                    dispatch(updateField({ field: "gameDiscipline", value: e.target.value }))
                  }
                  className="w-full rounded-xl bg-[#121217] border border-white/10 px-4 py-3 text-sm text-white focus:outline-none focus:border-red-500/60"
                >
                  <option value="Tactical FPS League">Tactical FPS Championship League</option>
                  <option value="Challenger Open Division">Challenger Open Division</option>
                </select>
              </div>

              {/* Region */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Region
                </label>
                <input
                  type="text"
                  disabled
                  value={formData.region}
                  className="w-full rounded-xl bg-white/5 border border-white/5 px-4 py-3 text-sm text-zinc-400 cursor-not-allowed font-mono"
                />
              </div>
            </div>
          </div>

          {/* Section 2: Team Leader Contact */}
          <div className="rounded-2xl border border-white/10 bg-[#0e0e12] p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 border-b border-white/5 pb-4">
              <Users className="h-5 w-5 text-red-500" />
              <h2 className="text-lg font-bold uppercase text-white font-sans tracking-wide">
                2. Team Leader & Contact
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {/* Leader Full Name */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Team Leader / Captain Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  value={formData.teamLeaderName}
                  onChange={(e) =>
                    dispatch(updateField({ field: "teamLeaderName", value: e.target.value }))
                  }
                  placeholder="e.g. Alex Mercer"
                  className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                    errors.teamLeaderName
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-white/10 focus:border-red-500/60"
                  }`}
                />
                {errors.teamLeaderName && (
                  <p className="flex items-center gap-1.5 text-xs text-red-400 font-mono">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>{errors.teamLeaderName}</span>
                  </p>
                )}
              </div>

              {/* Email Address */}
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
                  placeholder="captain@example.com"
                  className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                    errors.email
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-white/10 focus:border-red-500/60"
                  }`}
                />
                {errors.email && (
                  <p className="flex items-center gap-1.5 text-xs text-red-400 font-mono">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>{errors.email}</span>
                  </p>
                )}
              </div>

              {/* Contact Number */}
              <div className="space-y-1.5">
                <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Contact Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) =>
                    dispatch(updateField({ field: "contactNumber", value: e.target.value }))
                  }
                  placeholder="+91 98765 43210"
                  className={`w-full rounded-xl bg-white/5 border px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none transition-colors ${
                    errors.contactNumber
                      ? "border-red-500 focus:ring-1 focus:ring-red-500"
                      : "border-white/10 focus:border-red-500/60"
                  }`}
                />
                {errors.contactNumber && (
                  <p className="flex items-center gap-1.5 text-xs text-red-400 font-mono">
                    <AlertCircle className="h-3.5 w-3.5" />
                    <span>{errors.contactNumber}</span>
                  </p>
                )}
              </div>

              {/* Discord ID (Optional) */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-mono font-bold uppercase tracking-wider text-zinc-300">
                    Discord Username
                  </label>
                  <span className="text-[10px] font-mono text-zinc-500 uppercase">Optional</span>
                </div>
                <input
                  type="text"
                  value={formData.discordId}
                  onChange={(e) =>
                    dispatch(updateField({ field: "discordId", value: e.target.value }))
                  }
                  placeholder="username#0000 or @username"
                  className="w-full rounded-xl bg-white/5 border border-white/10 px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-red-500/60"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Player Roster */}
          <div className="rounded-2xl border border-white/10 bg-[#0e0e12] p-6 sm:p-8 space-y-6">
            <div className="flex items-center justify-between border-b border-white/5 pb-4">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-red-500" />
                <h2 className="text-lg font-bold uppercase text-white font-sans tracking-wide">
                  3. Team Roster (5 Starters Mandatory)
                </h2>
              </div>
              <span className="text-xs font-mono text-zinc-400">
                {formData.roster.length} Players Listed
              </span>
            </div>

            <div className="space-y-4">
              {formData.roster.map((player, idx) => {
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
                          {isStarter ? `Starter Slot ${idx + 1}` : "Substitute Slot"}
                        </span>
                        {player.isCaptain && (
                          <Badge variant="amber" size="sm">
                            Captain
                          </Badge>
                        )}
                      </div>

                      {!isStarter && (
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

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                          placeholder="Player Full Name *"
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

                      {/* In-Game Name / ID */}
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
                          placeholder="In-Game Tag / Riot ID *"
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

                      {/* Role Selector */}
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
                          <option value="Duelist / Fragger">Duelist / Fragger</option>
                          <option value="Initiator / Flex">Initiator / Flex</option>
                          <option value="Controller / Support">Controller / Support</option>
                          <option value="Sentinel / Anchor">Sentinel / Anchor</option>
                          <option value="Substitute">Substitute</option>
                        </select>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {formData.roster.length < 7 && (
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
                  I agree to the PAAV Esports Tournament Regulations & Anti-Cheat Code <span className="text-red-500">*</span>
                </span>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  Our team confirms that all roster members will abide by fair-play standards,
                  referee rulings, and mandatory server screen capture verification when requested.
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
                Your roster has passed all frontend validation checks.
              </p>
            </div>

            {/* Receipt Details Card */}
            <div className="rounded-xl border border-white/10 bg-black/40 p-4 space-y-3 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-zinc-500 uppercase">Verification Code:</span>
                <span className="text-emerald-400 font-bold">{receipt.registrationCode}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Team:</span>
                <span className="text-white font-bold">
                  {receipt.teamName} [{receipt.teamTag}]
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Captain:</span>
                <span className="text-white">{receipt.teamLeaderName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Contact Email:</span>
                <span className="text-white">{receipt.email}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Discipline:</span>
                <span className="text-white">{receipt.gameDiscipline}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-zinc-500">Roster Strength:</span>
                <span className="text-white">{receipt.roster.filter(r => r.fullName).length} Players</span>
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
