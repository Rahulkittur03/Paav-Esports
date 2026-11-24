import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
import CursorGlow from "@/components/ui/CursorGlow";
import { Toaster } from "sonner";
import { SITE_CONFIG } from "@/utils/config";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  themeColor: "#080808",
};

export const metadata: Metadata = {
  title: {
    default: `${SITE_CONFIG.name} | ${SITE_CONFIG.tagline}`,
    template: `%s | ${SITE_CONFIG.name}`,
  },
  description: SITE_CONFIG.description,
  keywords: [
    "PAAV Esports",
    "Esports Tournament",
    "Gaming League",
    "Competitive Gaming",
    "Season 1",
    "Season 2",
    "Season 3",
    "Season 4",
    "Season 5",
    "Season 6 Registration",
  ],
  authors: [{ name: SITE_CONFIG.name }],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased dark`}
    >
      <body className="min-h-full flex flex-col bg-[#080808] text-zinc-100 selection:bg-red-600 selection:text-white">
        <ReduxProvider>
          {/* Subtle cursor ambient glow */}
          <CursorGlow />

          {/* Navigation */}
          <Navbar />

          {/* Main page content */}
          <main className="flex-1 flex flex-col">{children}</main>

          {/* Footer */}
          <Footer />

          {/* Modern toast notifications */}
          <Toaster
            position="top-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "#0f0f11",
                border: "1px solid rgba(255, 255, 255, 0.15)",
                color: "#ffffff",
              },
            }}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
