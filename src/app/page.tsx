import { HeroSection } from "@/components/home/HeroSection";
import { QuickStats } from "@/components/home/QuickStats";
import { CaseStudiesHub } from "@/components/work/CaseStudiesHub";
import { EngineeringExpertise } from "@/components/skills/EngineeringExpertise";
import { BlogPreviewSection } from "@/components/home/BlogPreviewSection";
import { StoryTimeline } from "@/components/about/StoryTimeline";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col justify-between pb-24">
      <HeroSection />
      <QuickStats />
      <CaseStudiesHub />
      <EngineeringExpertise />
      <BlogPreviewSection />
      <StoryTimeline />
      <ContactSection />
    </main>
  );
}
