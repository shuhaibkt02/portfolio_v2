"use client";

import { motion } from "framer-motion";
import { CaseStudy } from "@/lib/data";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

interface CaseStudyHeroProps {
    study: CaseStudy;
}

export const CaseStudyHero = ({ study }: CaseStudyHeroProps) => {
    return (
        <section className="relative h-screen w-full overflow-hidden bg-zinc-900">
            {/* Background with Color/Image */}
            <div
                className="absolute inset-0 z-0 opacity-30"
                style={{ backgroundColor: study.color }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />

            {/* Content */}
            <div className="relative z-10 flex h-full w-full flex-col justify-end px-6 pb-24 sm:px-12 lg:px-24">
                <Link href="/#work" className="absolute left-6 top-8 flex items-center gap-2 text-white/60 hover:text-white transition-colors sm:left-12 sm:top-12">
                    <ArrowLeft size={20} />
                    Back to Work
                </Link>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="mb-4 flex flex-wrap items-center gap-4">
                        <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                            {study.category}
                        </span>
                        <span className="text-zinc-400">Feb 2025 - Present</span>
                    </div>

                    <h1 className="max-w-4xl text-5xl font-bold leading-tight font-heading text-white sm:text-6xl md:text-7xl">
                        {study.title}
                    </h1>

                    <p className="mt-6 max-w-2xl text-xl text-zinc-300">
                        Lead Mobile Developer & UI/UX Designer
                    </p>

                    {study.playStoreUrl && (
                        <div className="mt-8">
                            <a
                                href={study.playStoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-1.61-.77V2.583a.996.996 0 0 1 1.61-.77zM15.208 13.414L19.378 17.584l-4.17-4.17zM14.5 12l4.878 4.878 2.536-1.427a1 1 0 0 0 .001-1.742l-2.537-1.427L14.5 12zM3.609 1.814a.996.996 0 0 0-.609.919v1.077l10.884 10.884-10.275-12.88z" />
                                </svg>
                                Get it on Google Play
                            </a>
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};
