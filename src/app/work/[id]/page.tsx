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
import { ArchitectureDiagram } from "@/components/case-study/ArchitectureDiagram";
import { EngineeringChallenges } from "@/components/case-study/EngineeringChallenges";

export default async function CaseStudyPage({ params }: { params: Promise<{ id: string }> }) {
    const { id } = await params;
    const study = caseStudies.find((s) => s.id === id);

    if (!study) {
        notFound();
    }

    return (
        <main className="min-h-screen bg-black text-white pb-24">
            <CaseStudyHero study={study} />
            
            {/* Structured Narrative Section */}
            {study.structuredNarrative && (
                <section className="bg-zinc-900/40 py-24 border-t border-zinc-900">
                    <div className="mx-auto max-w-7xl px-6 sm:px-12">
                        <div className="text-center mb-16">
                            <h2 className="text-3xl font-bold font-heading sm:text-4xl">Case Study Narrative</h2>
                            <p className="mt-2 text-zinc-400">The business context and technical outcomes of this project.</p>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
                            <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800/80 hover:border-zinc-700 transition-colors duration-300">
                                <span className="text-xs font-bold text-red-500 uppercase tracking-widest block mb-2 font-mono">01. The Problem</span>
                                <p className="text-zinc-300 leading-relaxed text-base">{study.structuredNarrative.problem}</p>
                            </div>
                            <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800/80 hover:border-zinc-700 transition-colors duration-300">
                                <span className="text-xs font-bold text-orange-500 uppercase tracking-widest block mb-2 font-mono">02. The Challenge</span>
                                <p className="text-zinc-300 leading-relaxed text-base">{study.structuredNarrative.challenge}</p>
                            </div>
                            <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800/80 hover:border-zinc-700 transition-colors duration-300">
                                <span className="text-xs font-bold text-flutter-blue uppercase tracking-widest block mb-2 font-mono">03. The Solution</span>
                                <p className="text-zinc-300 leading-relaxed text-base">{study.structuredNarrative.solution}</p>
                            </div>
                            <div className="bg-zinc-950 p-8 rounded-3xl border border-zinc-800/80 hover:border-zinc-700 transition-colors duration-300">
                                <span className="text-xs font-bold text-green-500 uppercase tracking-widest block mb-2 font-mono">04. The Result</span>
                                <p className="text-zinc-300 leading-relaxed text-base">{study.structuredNarrative.result}</p>
                            </div>
                        </div>
                    </div>
                </section>
            )}

            {study.architectureDiagramId && (
                <ArchitectureDiagram diagramId={study.architectureDiagramId} />
            )}

            <EngineeringChallenges challenges={study.engineeringChallenges || []} />

            <ChallengeSection
                description={study.challenge?.description || "Description unavailable."}
                painPoints={study.challenge?.painPoints || []}
            />
            <ResearchTimeline research={study.research || []} />
            <DesignProcess designProcess={study.designProcess} />
            <KeyFeatures features={study.features || []} />
            <TechStackGallery
                techStack={study.techStack || []}
                galleryImages={study.gallery || []}
            />
        </main>
    );
}
