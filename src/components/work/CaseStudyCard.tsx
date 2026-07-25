"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink, ShieldCheck, Sparkles, Smartphone, Code } from "lucide-react";
import Link from "next/link";
import { CaseStudy } from "@/lib/data";

interface CaseStudyCardProps {
    study: CaseStudy;
    index: number;
    isFeatured?: boolean;
}

export const CaseStudyCard = ({ study, index, isFeatured = false }: CaseStudyCardProps) => {
    const isExternal = study.webUrl || study.githubUrl || study.playStoreUrl;

    if (isFeatured) {
        return (
            <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group relative w-full col-span-1 md:col-span-2 rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-8 sm:p-10 backdrop-blur-md hover:border-zinc-700 transition-all duration-300 overflow-hidden shadow-2xl"
            >
                {/* Ambient Glow */}
                <div
                    className="absolute -right-20 -top-20 h-72 w-72 rounded-full blur-3xl opacity-20 transition-opacity group-hover:opacity-35 pointer-events-none"
                    style={{ backgroundColor: study.color }}
                />

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
                    <div className="lg:col-span-7 flex flex-col justify-between h-full">
                        <div>
                            <div className="flex flex-wrap items-center gap-3 mb-4">
                                <span className="inline-flex items-center gap-1.5 rounded-full bg-flutter-blue/15 px-3 py-1 text-xs font-semibold text-flutter-blue border border-flutter-blue/30">
                                    <Sparkles size={12} />
                                    Featured Flagship
                                </span>
                                <span className="rounded-full bg-zinc-800/80 px-3 py-1 text-xs font-mono text-zinc-400 border border-zinc-700/50">
                                    {study.category}
                                </span>
                            </div>

                            <h3 className="text-3xl sm:text-4xl font-bold font-heading text-white group-hover:text-flutter-blue transition-colors">
                                {study.title}
                            </h3>

                            <p className="mt-4 text-base text-zinc-300 leading-relaxed font-light">
                                {study.description}
                            </p>

                            {/* Metrics Highlights */}
                            <div className="mt-6 flex flex-wrap gap-2">
                                {study.metrics.map((m) => (
                                    <span
                                        key={m}
                                        className="inline-flex items-center gap-1.5 text-xs font-mono font-medium text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg border border-emerald-500/20"
                                    >
                                        <ShieldCheck size={13} />
                                        {m}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Tech & CTA */}
                        <div className="mt-8 pt-6 border-t border-zinc-800/80 flex flex-wrap items-center justify-between gap-4">
                            <div className="flex flex-wrap gap-2">
                                {study.techStack.map((tech) => (
                                    <span key={tech} className="text-xs font-mono text-zinc-400 bg-zinc-800/60 px-2.5 py-1 rounded-md">
                                        {tech}
                                    </span>
                                ))}
                            </div>

                            <Link
                                href={`/work/${study.id}`}
                                className="inline-flex items-center gap-2 text-sm font-semibold text-white group-hover:text-flutter-blue transition-colors"
                            >
                                <span>Read Case Study</span>
                                <ArrowUpRight size={18} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                            </Link>
                        </div>
                    </div>

                    {/* Visual Card Graphic / Architecture Box */}
                    <div className="lg:col-span-5 rounded-2xl bg-zinc-950/80 border border-zinc-800/80 p-6 flex flex-col justify-between h-full min-h-[220px]">
                        <div>
                            <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-widest block mb-2">Technical Problem & Solution</span>
                            <p className="text-xs text-zinc-300 leading-relaxed font-mono">
                                &quot;{study.structuredNarrative?.problem || study.description}&quot;
                            </p>
                        </div>
                        <div className="mt-6 pt-4 border-t border-zinc-900 flex items-center justify-between">
                            <span className="text-xs font-mono text-flutter-blue font-semibold">Production Ready</span>
                            <Link
                                href={`/work/${study.id}`}
                                className="p-2.5 rounded-full bg-flutter-blue text-white group-hover:bg-blue-600 transition-colors"
                            >
                                <ArrowUpRight size={16} />
                            </Link>
                        </div>
                    </div>
                </div>
            </motion.div>
        );
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.08 }}
            viewport={{ once: true }}
            className="group relative flex flex-col justify-between rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-7 hover:border-zinc-700 transition-all duration-300 overflow-hidden shadow-xl"
        >
            {/* Ambient Background Glow */}
            <div
                className="absolute -right-12 -top-12 h-44 w-44 rounded-full blur-2xl opacity-15 transition-opacity group-hover:opacity-30 pointer-events-none"
                style={{ backgroundColor: study.color }}
            />

            <div>
                <div className="flex items-center justify-between mb-4">
                    <span className="rounded-full bg-zinc-800/80 px-3 py-1 text-xs font-mono text-zinc-400 border border-zinc-700/40">
                        {study.category}
                    </span>
                    <Link
                        href={`/work/${study.id}`}
                        className="p-2 rounded-full bg-zinc-800/60 text-zinc-400 hover:text-white hover:bg-flutter-blue transition-all"
                    >
                        <ArrowUpRight size={16} />
                    </Link>
                </div>

                <h3 className="text-2xl font-bold font-heading text-white group-hover:text-flutter-blue transition-colors">
                    {study.title}
                </h3>

                <p className="mt-3 text-sm text-zinc-400 font-light leading-relaxed line-clamp-2">
                    {study.description}
                </p>

                {/* Metrics */}
                {study.metrics.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-1.5">
                        {study.metrics.slice(0, 2).map((m) => (
                            <span key={m} className="text-[11px] font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-md border border-emerald-500/20">
                                ✓ {m}
                            </span>
                        ))}
                    </div>
                )}
            </div>

            {/* Footer Tech Stack */}
            <div className="mt-6 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <div className="flex flex-wrap gap-1.5">
                    {study.techStack.slice(0, 3).map((tech) => (
                        <span key={tech} className="text-[11px] font-mono text-zinc-400">
                            #{tech}
                        </span>
                    ))}
                </div>
                <Link
                    href={`/work/${study.id}`}
                    className="text-xs font-semibold text-flutter-blue hover:underline"
                >
                    Details →
                </Link>
            </div>
        </motion.div>
    );
};
