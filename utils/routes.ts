export const ROUTE_HOME = "/";
export const ROUTE_SEASONS = "/seasons";
export const ROUTE_SEASON_DETAIL = (slug: string) => `/seasons/${slug}`;
export const ROUTE_ABOUT = "/about";
export const ROUTE_REGISTER = "/register";

export const NAV_LINKS = [
  { label: "Home", href: ROUTE_HOME },
  { label: "Seasons", href: ROUTE_SEASONS },
  { label: "About PAAV", href: ROUTE_ABOUT },
  { label: "Register (S6)", href: ROUTE_REGISTER, isCta: true },
] as const;
