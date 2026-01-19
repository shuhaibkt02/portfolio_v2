"use client";

import { caseStudies } from "@/lib/data";
import { CaseStudyCard } from "./CaseStudyCard";

export const CaseStudiesHub = () => {
    return (
        <section id="work" className="relative w-full py-24 px-4 sm:px-8 bg-zinc-950/50">
            <div className="mx-auto max-w-7xl">
                <div className="mb-16 flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-end">
                    <div>
                        <h2 className="text-4xl font-bold tracking-tight text-white font-heading sm:text-5xl">
                            Selected Work
                        </h2>
                        <p className="mt-4 max-w-xl text-lg text-zinc-400">
                            A collection of enterprise-grade mobile solutions and technical experiments.
                        </p>
                    </div>
                    <a
                        href="/"
                        className="group flex items-center gap-2 text-base font-medium text-flutter-blue hover:text-white transition-colors"
                    >
                        View All Projects
                        <span className="block h-px w-8 bg-flutter-blue transition-all group-hover:w-12 group-hover:bg-white" />
                    </a>
                </div>

                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-12">
                    {caseStudies.map((study, index) => (
                        <CaseStudyCard key={study.id} study={study} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};
