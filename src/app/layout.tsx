import type { Metadata } from "next";
import { Inter, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  weight: ["300", "400", "500", "600", "700"],
  subsets: ["latin"],
});

const jetbrainsMono = JetBrains_Mono({
  variable: "--font-jetbrains-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://shuhaibkt.vercel.app"),
  title: {
    default: "Shuhaib KT | Flutter Developer Portfolio",
    template: "%s | Shuhaib KT Portfolio",
  },
  description: "Interactive portfolio of Shuhaib KT, a Flutter Specialist & Mobile App Developer building enterprise-grade mobile solutions and technical experiments.",
  keywords: [
    "Shuhaib KT",
    "Flutter Specialist",
    "Flutter Developer",
    "Mobile App Developer",
    "Android Developer",
    "iOS Developer",
    "React",
    "Next.js",
    "Software Engineer Portfolio",
  ],
  authors: [{ name: "Shuhaib KT", url: "https://shuhaibkt.vercel.app" }],
  creator: "Shuhaib KT",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://shuhaibkt.vercel.app",
    title: "Shuhaib KT | Flutter Developer Portfolio",
    description: "Interactive portfolio of Shuhaib KT, a Flutter Specialist & Mobile App Developer building enterprise-grade mobile solutions.",
    siteName: "Shuhaib KT Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Shuhaib KT - Flutter Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Shuhaib KT | Flutter Developer Portfolio",
    description: "Interactive portfolio of Shuhaib KT, a Flutter Specialist & Mobile App Developer.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

import { CustomCursor } from "@/components/ui/CustomCursor";
import { NavBar } from "@/components/layout/NavBar";
import { ExperienceProvider } from "@/context/ExperienceContext";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { SoundManager } from "@/components/ui/SoundManager";

import { Analytics } from "@vercel/analytics/next";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <meta name="google-site-verification" content="Zc3ejKNoBLBInSD2IW-MZzyO3AV6mZsjyF73sZEfZro" />
      <body
        suppressHydrationWarning
        className={`${inter.variable} ${poppins.variable} ${jetbrainsMono.variable} font-sans antialiased`}
      >
        <ExperienceProvider>
          <SmoothScroll />
          <SoundManager />
          <CustomCursor />
          <NavBar />
          {children}
          <Analytics />
        </ExperienceProvider>
      </body>
    </html>
  );
}
