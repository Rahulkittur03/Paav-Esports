export interface RosterPlayer {
  id: string;
  fullName: string;
  inGameId: string;
  role: "Duelist / Fragger" | "Controller / Support" | "Initiator / Flex" | "Sentinel / Anchor" | "Substitute";
  isCaptain?: boolean;
}

export interface RegistrationFormData {
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
