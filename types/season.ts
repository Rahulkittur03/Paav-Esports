export type SeasonStatus = "completed" | "upcoming" | "in-progress";

export interface TournamentWinner {
  place: string;
  team: string;
  player?: string;
  note?: string;
  isConfirmed: boolean;
}

export interface TournamentTeam {
  name: string;
  tag: string;
  seed?: number;
  standing?: string;
  isPlaceholder?: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: "Match Action" | "Award Ceremony" | "Team Portrait" | "Behind the Scenes" | "Community Edit";
  caption?: string;
  aspectRatio?: string;
  placeholderColor?: string;
  imageUrl?: string;
  videoUrl?: string;
}

export interface SeasonStat {
  label: string;
  value: string;
}

export interface OfficialArchiveLinks {
  googleFormUrl?: string;
  youtubePlaylistUrl?: string;
  googleDocUrl?: string;
  driveEditUrl?: string;
}

export interface Season {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  shortDescription: string;
  description: string;
  status: SeasonStatus;
  statusLabel: string;
  bannerGradient: string;
  accentColor: string;
  bannerImage?: string;
  format: string;
  gameTitle: string;
  datesText: string;
  prizePoolText: string;
  highlights: string[];
  winners: TournamentWinner[];
  teams: TournamentTeam[];
  gallery: GalleryItem[];
  stats: SeasonStat[];
  rulebookSummary?: string[];
  officialLinks?: OfficialArchiveLinks;
  eligibilityRequirements?: string[];
}
