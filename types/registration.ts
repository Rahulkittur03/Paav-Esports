export type ValorantRank =
  | "Iron"
  | "Bronze"
  | "Silver"
  | "Gold"
  | "Platinum"
  | "Diamond"
  | "Ascendant"
  | "Immortal"
  | "Radiant";

export type AgentRole =
  | "Duelist"
  | "Initiator"
  | "Controller"
  | "Sentinel"
  | "Substitute";

export interface RosterPlayer {
  id: string;
  fullName: string;
  inGameId: string;
  currentRank: ValorantRank;
  role: AgentRole;
  isCaptain?: boolean;
}

export interface RegistrationFormData {
  entryType: "solo" | "team";
  membershipType: "paav_gang_silver" | "youtube_member";
  teamName: string;
  teamTag: string;
  teamLeaderName: string;
  contactNumber: string;
  email: string;
  discordId: string;
  gameDiscipline: string;
  region: string;
  agreedToRules: boolean;
  roster: RosterPlayer[];
}

export interface RegistrationErrors {
  [key: string]: string | undefined;
}

export interface DemoSubmissionReceipt {
  registrationCode: string;
  submittedAt: string;
  entryType: "solo" | "team";
  membershipType: "paav_gang_silver" | "youtube_member";
  teamName: string;
  teamTag: string;
  teamLeaderName: string;
  email: string;
  contactNumber: string;
  discordId: string;
  gameDiscipline: string;
  roster: RosterPlayer[];
  status: "DEMO_VERIFIED";
  disclaimer: string;
}
