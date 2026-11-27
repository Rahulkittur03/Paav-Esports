"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Flame,
  ShieldAlert,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  User,
} from "lucide-react";
import Badge from "@/components/ui/Badge";
import { RoleIcon, ValorantSparkIcon } from "@/components/ui/ValorantIcons";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import {
  updateField,
  updateRosterPlayer,
  setErrors,
  submitDemoStart,
  submitDemoSuccess,
  resetRegistration,
} from "@/features/registration/registrationSlice";
import {
  RegistrationErrors,
  DemoSubmissionReceipt,
  ValorantRank,
  AgentRole,
} from "@/types/registration";
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

const AGENT_ROLES: AgentRole[] = ["Duelist", "Initiator", "Controller", "Sentinel"];

export default function RegistrationClient() {
  const dispatch = useAppDispatch();
  const { formData, errors, status, receipt } = useAppSelector((state) => state.registration);
  const [showReceiptModal, setShowReceiptModal] = useState(false);

  const soloPlayer = formData.roster[0];

  const validateForm = (): boolean => {
    const errs: RegistrationErrors = {};

    if (!formData.teamLeaderName.trim()) {
      errs.teamLeaderName = "Player full name is required.";
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

    if (!soloPlayer?.inGameId.trim()) {
      errs["roster_0_inGameId"] = "Valorant Riot ID & Tag (e.g. Agent#PAAV) is required.";
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
        entryType: "solo",
        membershipType: formData.membershipType,
        teamName: `Solo Queue (${formData.teamLeaderName})`,
        teamTag: "SOLO",
        teamLeaderName: formData.teamLeaderName,
        email: formData.email,
        contactNumber: formData.contactNumber,
        discordId: formData.discordId,
        gameDiscipline: formData.gameDiscipline,
        roster: [
          {
            ...soloPlayer,
            fullName: formData.teamLeaderName,
          },
        ],
        status: "DEMO_VERIFIED",
        disclaimer:
          "Frontend Demo Only: Your solo-queue registration has been validated. Random-n-balanced team drafts and lobby assignments will be announced in Discord Paav VC.",
      };

      dispatch(submitDemoSuccess(demoReceipt));
      setShowReceiptModal(true);
      toast.success("Solo Queue registration validated! Check your receipt.");
    }, 550);
  };

  const handleReset = () => {
    dispatch(resetRegistration());
    setShowReceiptModal(false);
    toast.info("Registration form reset.");
  };

  return (
    <div className="min-h-screen py-14 lg:py-16 bg-[#0A0C0F] tactical-grid">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        {/* Header */}
        <div className="space-y-3">
          <Badge variant="red" size="md">
            Season 6 // Solo Queue Only
          </Badge>
          <h1 className="text-3xl sm:text-5xl font-black uppercase tracking-tight text-[#F4F5F7] font-sans">
            Register for Season 6
          </h1>
          <p className="text-zinc-400 text-sm sm:text-base max-w-2xl">
            Season 6 uses <strong className="text-[#F4F5F7]">Solo Queue Only</strong> with our
            random-and-balanced team draft algorithm. Open exclusively to{" "}
            <strong className="text-[#F4F5F7]">Paav Gang (Silver)</strong> &{" "}
            <strong className="text-[#F4F5F7]">YouTube Channel Members</strong>.
          </p>
        </div>

        {/* Demo Notice Banner */}
        <div className="rounded-sm border border-[#FF4655]/35 bg-[#11141A] p-4 flex items-start gap-3.5 text-zinc-300">
          <ShieldAlert className="h-4 w-4 text-[#FF4655] shrink-0 mt-0.5" />
          <div className="space-y-1 text-xs">
            <strong className="block font-bold text-[#F4F5F7] uppercase tracking-wide">
              Solo Queue Draft Notice
            </strong>
            <p className="text-zinc-400 leading-relaxed">
              No pre-made squads are required. Register individually and our balancing algorithm
              will place you into a balanced 5-player roster prior to match weekend in Discord Paav
              VC.
            </p>
          </div>
        </div>

        {/* Registration Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Section 1: Eligibility */}
          <div className="rounded-sm border border-white/10 bg-[#11141A] p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/8 pb-3.5">
              <div className="flex items-center gap-2">
                <ValorantSparkIcon className="h-4 w-4 text-[#FF4655]" />
                <h2 className="text-sm font-mono font-bold uppercase text-[#F4F5F7] tracking-wider">
                  1. Entry Format & Eligibility
                </h2>
              </div>
              <span className="text-[10px] font-mono uppercase tracking-widest px-2 py-0.5 rounded-sm bg-[#FF4655]/15 text-[#FF4655] border border-[#FF4655]/30">
                Solo Queue
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="p-3.5 rounded-sm border border-[#FF4655]/40 bg-[#0A0C0F] flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-sm bg-[#FF4655]/15 text-[#FF4655] shrink-0">
                  <User className="h-4 w-4" />
                </div>
                <div>
                  <span className="block text-xs font-bold uppercase text-[#F4F5F7]">
                    Solo Queue Entry
                  </span>
                  <span className="block text-[11px] font-mono text-zinc-400">
                    Random-n-Balanced Squads
                  </span>
                </div>
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Membership Verification
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
                  className="w-full rounded-sm bg-[#0A0C0F] border border-white/12 px-3.5 py-2.5 text-xs text-[#F4F5F7] focus:outline-none focus:border-[#FF4655] transition-colors"
                >
                  <option value="paav_gang_silver">Paav Gang Member (Silver Role on Discord)</option>
                  <option value="youtube_member">YouTube Channel Member</option>
                </select>
              </div>
            </div>
          </div>

          {/* Section 2: Player Contact Info */}
          <div className="rounded-sm border border-white/10 bg-[#11141A] p-6 space-y-5">
            <div className="flex items-center gap-2 border-b border-white/8 pb-3.5">
              <User className="h-4 w-4 text-[#FF4655]" />
              <h2 className="text-sm font-mono font-bold uppercase text-[#F4F5F7] tracking-wider">
                2. Player Contact Info
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Player Full Name <span className="text-[#FF4655]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.teamLeaderName}
                  onChange={(e) =>
                    dispatch(updateField({ field: "teamLeaderName", value: e.target.value }))
                  }
                  placeholder="e.g. Ayush or Agent Name"
                  className={`w-full rounded-sm bg-[#0A0C0F] border px-3.5 py-2.5 text-sm text-[#F4F5F7] placeholder-zinc-500 focus:outline-none transition-colors ${
                    errors.teamLeaderName
                      ? "border-[#FF4655]"
                      : "border-white/12 focus:border-[#FF4655]"
                  }`}
                />
                {errors.teamLeaderName && (
                  <p className="text-xs text-[#FF4655] font-mono mt-1">{errors.teamLeaderName}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Discord Username <span className="text-[#FF4655]">*</span>
                </label>
                <input
                  type="text"
                  value={formData.discordId}
                  onChange={(e) =>
                    dispatch(updateField({ field: "discordId", value: e.target.value }))
                  }
                  placeholder="e.g. elitex_kd"
                  className={`w-full rounded-sm bg-[#0A0C0F] border px-3.5 py-2.5 text-sm text-[#F4F5F7] placeholder-zinc-500 focus:outline-none transition-colors ${
                    errors.discordId ? "border-[#FF4655]" : "border-white/12 focus:border-[#FF4655]"
                  }`}
                />
                {errors.discordId && (
                  <p className="text-xs text-[#FF4655] font-mono mt-1">{errors.discordId}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Email Address <span className="text-[#FF4655]">*</span>
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) =>
                    dispatch(updateField({ field: "email", value: e.target.value }))
                  }
                  placeholder="agent@example.com"
                  className={`w-full rounded-sm bg-[#0A0C0F] border px-3.5 py-2.5 text-sm text-[#F4F5F7] placeholder-zinc-500 focus:outline-none transition-colors ${
                    errors.email ? "border-[#FF4655]" : "border-white/12 focus:border-[#FF4655]"
                  }`}
                />
                {errors.email && (
                  <p className="text-xs text-[#FF4655] font-mono mt-1">{errors.email}</p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300">
                  WhatsApp / Phone Number <span className="text-[#FF4655]">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.contactNumber}
                  onChange={(e) =>
                    dispatch(updateField({ field: "contactNumber", value: e.target.value }))
                  }
                  placeholder="+91 98765 43210"
                  className={`w-full rounded-sm bg-[#0A0C0F] border px-3.5 py-2.5 text-sm text-[#F4F5F7] placeholder-zinc-500 focus:outline-none transition-colors ${
                    errors.contactNumber
                      ? "border-[#FF4655]"
                      : "border-white/12 focus:border-[#FF4655]"
                  }`}
                />
                {errors.contactNumber && (
                  <p className="text-xs text-[#FF4655] font-mono mt-1">{errors.contactNumber}</p>
                )}
              </div>
            </div>
          </div>

          {/* Section 3: Valorant Agent Profile */}
          <div className="rounded-sm border border-white/10 bg-[#11141A] p-6 space-y-5">
            <div className="flex items-center justify-between border-b border-white/8 pb-3.5">
              <div className="flex items-center gap-2">
                <RoleIcon role={soloPlayer.role} className="h-4 w-4 text-[#FF4655]" />
                <h2 className="text-sm font-mono font-bold uppercase text-[#F4F5F7] tracking-wider">
                  3. Valorant Agent Profile
                </h2>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">Used for Rank Balancing</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Riot ID & Tag <span className="text-[#FF4655]">*</span>
                </label>
                <input
                  type="text"
                  value={soloPlayer.inGameId}
                  onChange={(e) =>
                    dispatch(
                      updateRosterPlayer({
                        index: 0,
                        field: "inGameId",
                        value: e.target.value,
                      })
                    )
                  }
                  placeholder="e.g. JettMain#PAAV"
                  className={`w-full rounded-sm bg-[#0A0C0F] border px-3.5 py-2.5 text-sm text-[#F4F5F7] placeholder-zinc-500 focus:outline-none font-mono transition-colors ${
                    errors["roster_0_inGameId"]
                      ? "border-[#FF4655]"
                      : "border-white/12 focus:border-[#FF4655]"
                  }`}
                />
                {errors["roster_0_inGameId"] && (
                  <p className="text-xs text-[#FF4655] font-mono mt-1">
                    {errors["roster_0_inGameId"]}
                  </p>
                )}
              </div>

              <div className="space-y-1.5">
                <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300">
                  Current Competitive Rank
                </label>
                <select
                  value={soloPlayer.currentRank}
                  onChange={(e) =>
                    dispatch(
                      updateRosterPlayer({
                        index: 0,
                        field: "currentRank",
                        value: e.target.value,
                      })
                    )
                  }
                  className="w-full rounded-sm bg-[#0A0C0F] border border-white/12 px-3.5 py-2.5 text-sm text-[#F4F5F7] focus:outline-none focus:border-[#FF4655] font-mono transition-colors"
                >
                  {VALORANT_RANKS.map((r) => (
                    <option key={r} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Preferred Agent Role Selector with Valorant Icons */}
            <div className="space-y-2">
              <label className="block text-[11px] font-mono font-bold uppercase tracking-wider text-zinc-300">
                Preferred Agent Role
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                {AGENT_ROLES.map((role) => {
                  const selected = soloPlayer.role === role;
                  return (
                    <button
                      key={role}
                      type="button"
                      onClick={() =>
                        dispatch(
                          updateRosterPlayer({
                            index: 0,
                            field: "role",
                            value: role,
                          })
                        )
                      }
                      className={`p-3 rounded-sm border text-xs font-mono font-bold uppercase tracking-wider flex items-center justify-center gap-2 transition-all duration-200 ${
                        selected
                          ? "bg-[#FF4655]/15 border-[#FF4655] text-[#F4F5F7]"
                          : "bg-[#0A0C0F] border-white/10 text-zinc-400 hover:text-white hover:border-white/25"
                      }`}
                    >
                      <RoleIcon
                        role={role}
                        className={`h-4 w-4 ${selected ? "text-[#FF4655]" : "text-zinc-500"}`}
                      />
                      <span>{role}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Section 4: Rules Agreement */}
          <div className="rounded-sm border border-white/10 bg-[#11141A] p-5 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={formData.agreedToRules}
                onChange={(e) =>
                  dispatch(updateField({ field: "agreedToRules", value: e.target.checked }))
                }
                className="mt-1 h-4 w-4 rounded-sm border-white/20 bg-[#0A0C0F] text-[#FF4655] focus:ring-0 focus:ring-offset-0 cursor-pointer"
              />
              <div className="space-y-1">
                <span className="text-xs font-bold text-[#F4F5F7] block">
                  I agree to the Paav Esports Valorant Tournament Regulations & Chill Mindset Code{" "}
                  <span className="text-[#FF4655]">*</span>
                </span>
                <p className="text-[11px] text-zinc-400 leading-relaxed">
                  I confirm that I am an active Paav Gang (Silver) or YouTube member, will join
                  Discord Paav VC for matches, and will maintain good sportsmanship throughout the
                  tournament.
                </p>
              </div>
            </label>
            {errors.agreedToRules && (
              <p className="flex items-center gap-1.5 text-xs text-[#FF4655] font-mono">
                <AlertCircle className="h-3.5 w-3.5" />
                <span>{errors.agreedToRules}</span>
              </p>
            )}
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={handleReset}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-sm border border-white/12 px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-zinc-400 hover:text-white hover:bg-white/5 transition-colors"
            >
              <RotateCcw className="h-4 w-4" />
              <span>Reset Form</span>
            </button>

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-sm bg-[#FF4655] hover:bg-[#E03846] px-7 py-3.5 text-xs font-bold uppercase tracking-[0.14em] text-white transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {status === "submitting" ? (
                <>
                  <span className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Validating Solo Entry...</span>
                </>
              ) : (
                <>
                  <Flame className="h-4 w-4" />
                  <span>Submit Solo Registration</span>
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
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 overflow-y-auto"
        >
          <div className="relative max-w-xl w-full rounded-sm border border-[#FF4655]/50 bg-[#11141A] p-6 sm:p-8 space-y-5 shadow-2xl my-8">
            <div className="text-center space-y-2">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-sm bg-[#FF4655]/15 border border-[#FF4655]/40 text-[#FF4655]">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <Badge variant="red" size="md">
                Solo Queue Verification Successful
              </Badge>
              <h3 className="text-xl font-black uppercase text-[#F4F5F7] font-sans">
                Player Receipt Generated
              </h3>
              <p className="text-xs text-zinc-400">
                Your solo-queue registration has passed all frontend validation checks.
              </p>
            </div>

            {/* Receipt Details Card */}
            <div className="rounded-sm border border-white/10 bg-[#0A0C0F] p-4 space-y-2.5 font-mono text-xs">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <span className="text-zinc-500 uppercase">Verification Code:</span>
                <span className="text-[#FF4655] font-bold">{receipt.registrationCode}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Format:</span>
                <span className="text-[#F4F5F7] font-bold uppercase">Solo Queue</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Eligibility:</span>
                <span className="text-zinc-200">
                  {receipt.membershipType === "paav_gang_silver"
                    ? "Paav Gang (Silver)"
                    : "YouTube Member"}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Player:</span>
                <span className="text-[#F4F5F7] font-bold">{receipt.teamLeaderName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Discord ID:</span>
                <span className="text-[#F4F5F7]">{receipt.discordId}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-zinc-500">Riot ID / IGN:</span>
                <span className="text-[#FF4655]">{receipt.roster[0]?.inGameId}</span>
              </div>
              <div className="flex items-center justify-between pt-2 border-t border-white/10">
                <span className="text-zinc-500">Rank & Role:</span>
                <span className="text-[#F4F5F7] font-bold">
                  {receipt.roster[0]?.currentRank} • {receipt.roster[0]?.role}
                </span>
              </div>
            </div>

            {/* Prominent Demo Notice */}
            <div className="rounded-sm border border-white/10 bg-[#0A0C0F] p-3.5 text-xs text-zinc-300 space-y-1">
              <strong className="block font-bold text-[#F4F5F7]">
                Backend Integration Status: Pending
              </strong>
              <p className="text-[11px] text-zinc-400 leading-relaxed">{receipt.disclaimer}</p>
            </div>

            {/* Modal Actions */}
            <div className="flex flex-col sm:flex-row items-center gap-3 pt-1">
              <Link
                href={ROUTE_HOME}
                onClick={() => setShowReceiptModal(false)}
                className="w-full sm:w-1/2 py-3 rounded-sm border border-white/12 bg-[#0A0C0F] hover:bg-white/5 text-xs font-mono font-bold text-center text-[#F4F5F7] transition-colors"
              >
                Return to Home
              </Link>
              <button
                type="button"
                onClick={() => setShowReceiptModal(false)}
                className="w-full sm:w-1/2 py-3 rounded-sm bg-[#FF4655] hover:bg-[#E03846] text-xs font-mono font-bold text-white transition-colors"
              >
                Done / Review Entry
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
