import type { Metadata } from "next";
import RegistrationClient from "@/components/registration/RegistrationClient";
import { SITE_CONFIG } from "@/utils/config";

export const metadata: Metadata = {
  title: "Register for Season 6 | Roster Submissions",
  description:
    "Register your team roster for Season 6 of PAAV Esports. Submit team information, captain credentials, and player lineup.",
  openGraph: {
    title: `Season 6 Registration | ${SITE_CONFIG.name}`,
    description: "Submit your team roster for Season 6 of the PAAV Esports competitive circuit.",
  },
};

export default function RegisterPage() {
  return <RegistrationClient />;
}
