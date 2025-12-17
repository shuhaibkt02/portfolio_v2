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
  title: "Shuhaib - Flutter Developer Portfolio",
  description: "Interactive portfolio of a Flutter Specialist & Mobile App Developer.",
};

import { CustomCursor } from "@/components/ui/CustomCursor";
import { NavBar } from "@/components/layout/NavBar";
import { ExperienceProvider } from "@/context/ExperienceContext";
import { SmoothScroll } from "@/components/ui/SmoothScroll";
import { SoundManager } from "@/components/ui/SoundManager";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
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
        </ExperienceProvider>
      </body>
    </html>
  );
}
