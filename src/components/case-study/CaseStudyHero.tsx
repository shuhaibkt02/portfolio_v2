"use client";

import { motion } from "framer-motion";
import { CaseStudy } from "@/lib/data";
import { ArrowLeft, ExternalLink } from "lucide-react";
import Link from "next/link";

interface CaseStudyHeroProps {
    study: CaseStudy;
}

export const CaseStudyHero = ({ study }: CaseStudyHeroProps) => {
    return (
        <section className="relative min-h-[85vh] md:min-h-screen w-full overflow-hidden bg-zinc-900 flex items-center pt-20 pb-16 sm:pt-24 sm:pb-20">
            <div
                className="absolute inset-0 z-0 opacity-30"
                style={{ backgroundColor: study.color }}
            />
            <div className="absolute inset-0 z-0 bg-gradient-to-b from-black/20 via-black/60 to-black" />

            <div className="relative z-10 w-full max-w-7xl mx-auto px-6 sm:px-12 lg:px-24">
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-6 sm:mb-8"
                >
                    <Link
                        href="/#work"
                        className="inline-flex items-center gap-2 text-white/60 hover:text-white transition-colors text-sm sm:text-base font-medium group"
                    >
                        <ArrowLeft size={18} className="transition-transform group-hover:-translate-x-1" />
                        Back to Work
                    </Link>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                >
                    <div className="mb-4 flex flex-wrap items-center gap-3 sm:gap-4">
                        <span className="rounded-full bg-white/10 px-4 py-1.5 text-sm font-medium text-white backdrop-blur-md">
                            {study.category}
                        </span>
                        {study.isInternal && (
                            <span className="rounded-full bg-amber-500/10 px-4 py-1.5 text-sm font-medium text-amber-400 backdrop-blur-md border border-amber-500/20">
                                Internal Enterprise App
                            </span>
                        )}
                        <span className="text-zinc-400 text-sm">{study.date || "Feb 2025 - Present"}</span>
                    </div>

                    <h1 className="max-w-4xl text-4xl sm:text-6xl md:text-7xl font-bold leading-tight font-heading text-white">
                        {study.title}
                    </h1>

                    <p className="mt-4 sm:mt-6 max-w-2xl text-lg sm:text-xl text-zinc-300">
                        {study.role || "Mobile Developer & UI/UX Designer"}
                        {study.company && <span className="text-zinc-400"> at {study.company}</span>}
                    </p>

                    {study.playStoreUrl && (
                        <div className="mt-8">
                            <a
                                href={study.playStoreUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
                            >
                                <svg className="h-5 w-5" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M3.609 1.814L13.792 12 3.61 22.186a.996.996 0 0 1-1.61-.77V2.583a.996.996 0 0 1 1.61-.77zM15.208 13.414L19.378 17.584l-4.17-4.17zM14.5 12l4.878 4.878 2.536-1.427a1 1 0 0 0 .001-1.742l-2.537-1.427L14.5 12zM3.609 1.814a.996.996 0 0 0-.609.919v1.077l10.884 10.884-10.275-12.88z" />
                                </svg>
                                Get it on Google Play
                            </a>
                        </div>
                    )}

                    {study.webUrl && (
                        <div className="mt-8">
                            <a
                                href={study.webUrl}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-flex items-center gap-2 rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-105 active:scale-95 shadow-lg shadow-white/10"
                            >
                                <ExternalLink className="h-5 w-5" />
                                Visit Website
                            </a>
                        </div>
                    )}

                    {!study.playStoreUrl && !study.webUrl && study.isInternal && (
                        <div className="mt-8 text-zinc-400 text-sm font-mono flex items-center gap-2 bg-zinc-950/40 p-4 rounded-xl border border-zinc-800/80 w-fit backdrop-blur-md">
                            <span className="relative flex h-2 w-2">
                                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
                                <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
                            </span>
                            Proprietary internal system — deployment restricted to closed network.
                        </div>
                    )}
                </motion.div>
            </div>
        </section>
    );
};
