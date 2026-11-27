import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/store/ReduxProvider";
import Navbar from "@/components/Common/Navbar";
import Footer from "@/components/Common/Footer";
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
  themeColor: "#0A0C0F",
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
      <body className="min-h-full flex flex-col bg-[#0A0C0F] text-[#F4F5F7] selection:bg-[#FF4655] selection:text-white">
        <ReduxProvider>
          <Navbar />

          <main className="flex-1 flex flex-col">{children}</main>

          <Footer />

          <Toaster
            position="top-right"
            theme="dark"
            toastOptions={{
              style: {
                background: "#11141A",
                border: "1px solid rgba(255, 255, 255, 0.14)",
                borderRadius: "4px",
                color: "#F4F5F7",
              },
            }}
          />
        </ReduxProvider>
      </body>
    </html>
  );
}
