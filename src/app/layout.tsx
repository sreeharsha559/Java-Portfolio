import type { Metadata, Viewport } from "next";
import { Inter, JetBrains_Mono, Space_Grotesk } from "next/font/google";
import { PROFILE, SITE_URL } from "@/lib/data";
import Navbar from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import CustomCursor from "@/components/CustomCursor";
import MusicPlayer from "@/components/MusicPlayer";
import CommandPalette from "@/components/CommandPalette";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const jetbrains = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-jetbrains-mono",
  display: "swap",
});

const description = `${PROFILE.role} — ${PROFILE.tagline} B.Tech CSE student building real-world products with Java, Spring Boot, React and Kotlin.`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${PROFILE.name} — Java Full Stack Developer`,
    template: `%s — ${PROFILE.name}`,
  },
  description,
  keywords: [
    "K Sree Harsha",
    "Java Full Stack Developer",
    "Spring Boot Developer",
    "React Developer",
    "Kotlin Developer",
    "Android Developer",
    "Portfolio",
    "Kuppam Engineering College",
  ],
  authors: [{ name: PROFILE.name }],
  creator: PROFILE.name,
  publisher: PROFILE.name,
  alternates: { canonical: "/" },
  robots: { index: true, follow: true },
  openGraph: {
    type: "website",
    url: SITE_URL,
    siteName: `${PROFILE.name} — Portfolio`,
    title: `${PROFILE.name} — Java Full Stack Developer`,
    description,
    locale: "en_US",
    images: [
      {
        url: `/og.png`,
        width: 1200,
        height: 630,
        alt: `${PROFILE.name} — Java Full Stack Developer`,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: `${PROFILE.name} — Java Full Stack Developer`,
    description,
    images: [`/og.png`],
  },
  icons: {
    icon: [{ url: "/favicon.svg", type: "image/svg+xml" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#050816",
  width: "device-width",
  initialScale: 1,
  colorScheme: "dark",
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: PROFILE.name,
      jobTitle: PROFILE.role,
      description: PROFILE.tagline,
      url: SITE_URL,
      alumniOf: "Kuppam Engineering College",
      knowsAbout: ["Java", "Spring Boot", "React", "Kotlin", "MySQL", "REST APIs"],
      sameAs: [`https://${PROFILE.linkedin}`, `https://github.com/${PROFILE.githubUsername}`],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: `${PROFILE.name} — Portfolio`,
      inLanguage: "en",
    },
  ],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} ${jetbrains.variable}`}>
      <body>
        <a href="#main" className="skip-link">
          Skip to content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navbar />
        {children}
        <Footer />
        <CustomCursor />
        <MusicPlayer />
        <CommandPalette />
      </body>
    </html>
  );
}