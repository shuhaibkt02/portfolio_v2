"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const allSkills = [
    { name: "Flutter", category: "Frameworks", level: 98 },
    { name: "Dart", category: "Languages", level: 95 },
    { name: "Kotlin", category: "Languages", level: 90 },
    { name: "TypeScript", category: "Languages", level: 90 },
    { name: "Next.js", category: "Frameworks", level: 85 },
    { name: "BLoC", category: "Architecture", level: 95 },
    { name: "Riverpod", category: "Architecture", level: 95 },
    { name: "Clean Arch", category: "Architecture", level: 92 },
    { name: "Node.js", category: "Backend", level: 80 },
    { name: "PostgreSQL", category: "Backend", level: 75 },
    { name: "Firebase", category: "Backend", level: 90 },
    { name: "Supabase", category: "Backend", level: 85 },
    { name: "Docker", category: "Backend", level: 80 },
    { name: "Figma", category: "Tools", level: 75 },

    // Soft Skills
    { name: "Leadership", category: "Soft Skills", level: 90 },
    { name: "Problem Solving", category: "Soft Skills", level: 98 },
    { name: "Communication", category: "Soft Skills", level: 92 },
    { name: "Adaptability", category: "Soft Skills", level: 95 },
];

const categories = ["All", "Languages", "Frameworks", "Architecture", "Backend", "Tools", "Soft Skills"];

export const TechGrid = () => {
    const [filter, setFilter] = useState("All");

    const filteredSkills = filter === "All"
        ? allSkills
        : allSkills.filter(s => s.category === filter);

    return (
        <section className="bg-zinc-950 py-12 text-white border-t border-zinc-900">
            <div className="mx-auto max-w-7xl px-6 sm:px-12">
                <div className="flex flex-wrap justify-center gap-4 mb-12">
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setFilter(cat)}
                            className={`rounded-full px-6 py-2 text-sm font-medium transition-all ${filter === cat
                                ? "bg-flutter-blue text-white"
                                : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
                                }`}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                <motion.div layout className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    <AnimatePresence>
                        {filteredSkills.map((skill) => (
                            <motion.div
                                layout
                                key={skill.name}
                                initial={{ opacity: 0, scale: 0.8 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.8 }}
                                className="flex flex-col items-center justify-center gap-3 rounded-2xl border border-zinc-800 bg-zinc-900/50 p-6 hover:border-zinc-700 transition-colors"
                            >
                                <div className="h-12 w-12 rounded-lg bg-zinc-800 flex items-center justify-center">
                                    {/* Icon Placeholder */}
                                    <span className="text-xs">{skill.name[0]}</span>
                                </div>
                                <div className="text-center">
                                    <h3 className="font-bold text-sm">{skill.name}</h3>
                                    <div className="mt-2 h-1.5 w-16 overflow-hidden rounded-full bg-zinc-800">
                                        <motion.div
                                            className="h-full bg-flutter-blue"
                                            initial={{ width: 0 }}
                                            animate={{ width: `${skill.level}%` }}
                                            transition={{ duration: 1, delay: 0.2 }}
                                        />
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </AnimatePresence>
                </motion.div>
            </div>
        </section>
    );
};
