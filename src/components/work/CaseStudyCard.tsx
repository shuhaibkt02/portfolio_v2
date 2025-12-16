"use client";

import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";
import { CaseStudy } from "@/lib/data";

interface CaseStudyCardProps {
    study: CaseStudy;
    index: number;
}

export const CaseStudyCard = ({ study, index }: CaseStudyCardProps) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="group relative col-span-1 h-[400px] w-full cursor-pointer overflow-hidden rounded-3xl bg-zinc-900"
        >
            <Link href={`/work/${study.id}`} className="block h-full w-full">
                {/* Placeholder for Image - using color for now */}
                <div
                    className="absolute inset-0 h-full w-full bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundColor: study.color, opacity: 0.2 }} // Low opacity to keep text readable
                />

                {/* Content Overlay */}
                <div className="absolute inset-0 flex flex-col justify-end p-8 transition-all duration-300">
                    {/* Hover overlay gradient - made darker for better text contrast */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent opacity-60 transition-opacity duration-300 group-hover:opacity-95" />

                    <div className="relative z-10 transform transition-transform duration-300 group-hover:-translate-y-2">
                        <div className="mb-2 flex items-center gap-2">
                            <span className="rounded-full bg-white/10 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                                {study.category}
                            </span>
                        </div>

                        <h3 className="mb-2 text-3xl font-bold font-heading text-white">{study.title}</h3>
                        <p className="mb-4 line-clamp-2 text-sm text-zinc-300 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                            {study.description}
                        </p>

                        <div className="flex flex-wrap gap-2 opacity-0 transition-opacity duration-300 delay-100 group-hover:opacity-100">
                            {study.techStack.slice(0, 3).map((tech) => (
                                <span key={tech} className="text-xs font-medium text-zinc-400">#{tech}</span>
                            ))}
                        </div>
                    </div>

                    {/* Action Button */}
                    <div className="absolute right-8 top-8 translate-x-10 translate-y--10 opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:translate-y-0 group-hover:opacity-100">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-white text-black">
                            <ArrowUpRight size={24} />
                        </div>
                    </div>
                </div>
            </Link>
        </motion.div>
    );
};
