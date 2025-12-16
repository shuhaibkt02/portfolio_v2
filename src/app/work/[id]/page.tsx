import { caseStudies } from "@/lib/data";
import { notFound } from "next/navigation";
import { Metadata } from "next";

// This is necessary for static export or just optimization
export async function generateStaticParams() {
    return caseStudies.map((study) => ({
        id: study.id,
    }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }): Promise<Metadata> {
    const { id } = await params;
    const study = caseStudies.find((s) => s.id === id);

    if (!study) {
        return { title: "Case Study Not Found" };
    }

    return {
        title: `${study.title} | Shuhaib's Portfolio`,
        description: study.description,
    };
}

import { CaseStudyHero } from "@/components/case-study/CaseStudyHero";
import { ChallengeSection } from "@/components/case-study/ChallengeSection";
import { ResearchTimeline } from "@/components/case-study/ResearchTimeline";
import { DesignProcess } from "@/components/case-study/DesignProcess";
import { KeyFeatures } from "@/components/case-study/KeyFeatures";
import { TechStackGallery } from "@/components/case-study/TechStackGallery";

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const study = caseStudies.find((s) => s.id === id);

    if (!study) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white pb-24">
            <CaseStudyHero study={study} />
            <ChallengeSection />
            <ResearchTimeline />
            <DesignProcess />
            <KeyFeatures />
            <TechStackGallery />
        </main>
    );
}
