"use client";

import { useState } from "react";
import { caseStudies } from "@/lib/data";
import { CaseStudyCard } from "./CaseStudyCard";
import { motion, AnimatePresence } from "framer-motion";
import { Layers, Smartphone, Cpu, Globe } from "lucide-react";

const categories = [
    { id: "all", label: "All Work", icon: Layers },
    { id: "flutter", label: "Flutter & Mobile", icon: Smartphone },
    { id: "native", label: "Android Native", icon: Cpu },
    { id: "web", label: "Web & Marketplaces", icon: Globe },
];

export const CaseStudiesHub = () => {
    const [selectedCategory, setSelectedCategory] = useState("all");

    const filteredStudies = caseStudies.filter((study) => {
        if (selectedCategory === "all") return true;
        if (selectedCategory === "flutter") {
            return study.techStack.includes("Flutter") || study.category.toLowerCase().includes("mobile") || study.category.toLowerCase().includes("workforce");
        }
        if (selectedCategory === "native") {
            return study.techStack.includes("Kotlin") || study.category.toLowerCase().includes("plugin") || study.category.toLowerCase().includes("android");
        }
        if (selectedCategory === "web") {
            return study.techStack.includes("Next.js") || study.techStack.includes("React.js") || study.category.toLowerCase().includes("marketplace") || study.category.toLowerCase().includes("web");
        }
        return true;
    });

    return (
        <section id="work" className="relative w-full py-24 px-4 sm:px-8 bg-zinc-950/60 overflow-hidden">
            <div className="absolute top-1/2 left-10 w-96 h-96 bg-flutter-blue/5 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div className="mx-auto max-w-7xl relative z-10">
                <div className="mb-12 text-center max-w-3xl mx-auto">
                    <p className="text-xs font-mono text-flutter-blue uppercase tracking-widest mb-2">Production Case Studies</p>
                    <h2 className="text-4xl font-bold tracking-tight text-white font-heading sm:text-5xl">
                        Selected Work
                    </h2>
                    <p className="mt-4 text-base text-zinc-400 font-light leading-relaxed">
                        Explore enterprise-grade mobile solutions, offline-first architectures, native Android plugins, and web marketplaces.
                    </p>
                </div>

                <div className="flex flex-wrap items-center justify-center gap-3 mb-12">
                    {categories.map((cat) => {
                        const Icon = cat.icon;
                        const isActive = selectedCategory === cat.id;

                        return (
                            <button
                                key={cat.id}
                                onClick={() => setSelectedCategory(cat.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-full text-xs font-medium font-mono transition-all border ${
                                    isActive
                                        ? "bg-flutter-blue text-white border-flutter-blue shadow-lg shadow-flutter-blue/20"
                                        : "bg-zinc-900/80 text-zinc-400 border-zinc-800 hover:border-zinc-700 hover:text-white"
                                }`}
                            >
                                <Icon size={14} />
                                <span>{cat.label}</span>
                            </button>
                        );
                    })}
                </div>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={selectedCategory}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -15 }}
                        transition={{ duration: 0.3 }}
                        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                    >
                        {filteredStudies.map((study, index) => {
                            const isFeatured = selectedCategory === "all" && index === 0;

                            return (
                                <CaseStudyCard
                                    key={study.id}
                                    study={study}
                                    index={index}
                                    isFeatured={isFeatured}
                                />
                            );
                        })}
                    </motion.div>
                </AnimatePresence>
            </div>
        </section>
    );
};
