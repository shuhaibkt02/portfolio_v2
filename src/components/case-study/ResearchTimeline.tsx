"use client";

import { motion } from "framer-motion";
import { Search, Users, Layout } from "lucide-react";

export const ResearchTimeline = () => {
    const phases = [
        { title: "Discovery", icon: Search, description: "Stakeholder interviews revealed that 40% of field data was lost due to sync errors." },
        { title: "Personas", icon: Users, description: "Created 'Field Officer Arjun' and 'Manager Priya' to guide the UX decisions." },
        { title: "Wireframing", icon: Layout, description: "Iterated on 3 versions of the offline queue mechanism before finalizing." },
    ];

    return (
        <section className="bg-zinc-950 py-24 text-white">
            <div className="mx-auto max-w-7xl px-6 sm:px-12">
                <h2 className="mb-16 text-center text-3xl font-bold font-heading sm:text-4xl">Research & Discovery</h2>

                <div className="relative">
                    {/* Connecting Line */}
                    <div className="absolute left-8 top-0 h-full w-px bg-zinc-800 md:left-1/2 md:-translate-x-1/2" />

                    <div className="flex flex-col gap-12 md:gap-24">
                        {phases.map((phase, index) => {
                            const isEven = index % 2 === 0;
                            return (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 50 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5 }}
                                    className={`flex flex-col items-start gap-8 md:flex-row md:items-center ${isEven ? 'md:flex-row-reverse' : ''}`}
                                >
                                    <div className="flex-1 md:text-right">
                                        <div className={`hidden md:block ${!isEven ? 'md:text-left' : ''}`}>
                                            <h3 className="text-2xl font-bold text-flutter-blue">{phase.title}</h3>
                                            <p className="mt-2 text-zinc-400">{phase.description}</p>
                                        </div>
                                    </div>

                                    <div className="relative z-10 flex h-16 w-16 shrink-0 items-center justify-center rounded-full border-4 border-zinc-950 bg-zinc-900 text-flutter-blue shadow-xl">
                                        <phase.icon size={24} />
                                    </div>

                                    <div className="flex-1">
                                        <div className={`md:hidden`}>
                                            <h3 className="text-2xl font-bold text-flutter-blue">{phase.title}</h3>
                                            <p className="mt-2 text-zinc-400">{phase.description}</p>
                                        </div>
                                        <div className={`hidden md:block ${isEven ? 'md:text-left' : 'md:text-right'}`}>
                                            {/* Placeholder for optional image or detail */}
                                        </div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </section>
    );
};
