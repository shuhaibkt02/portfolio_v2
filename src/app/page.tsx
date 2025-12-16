import { HeroSection } from "@/components/home/HeroSection";
import { QuickStats } from "@/components/home/QuickStats";
import { CaseStudiesHub } from "@/components/work/CaseStudiesHub";
import { SkillTree } from "@/components/skills/SkillTree";
import { TechGrid } from "@/components/skills/TechGrid";
import { StoryTimeline } from "@/components/about/StoryTimeline";
import { ContactSection } from "@/components/contact/ContactSection";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between pb-24">
      <HeroSection />
      <QuickStats />
      <CaseStudiesHub />
      <SkillTree />
      <TechGrid />
      <StoryTimeline />
      <ContactSection />
    </main>
  );
}
