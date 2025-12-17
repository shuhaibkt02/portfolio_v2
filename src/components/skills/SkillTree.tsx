"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Simple node data structure for the tree
const skills = [
    { id: "core", x: 50, y: 55, label: "Core", level: "Expert" },
    { id: "mobile", x: 30, y: 38, label: "Mobile", parent: "core" },
    { id: "web", x: 70, y: 38, label: "Web", parent: "core" },
    { id: "backend", x: 50, y: 72, label: "Backend", parent: "core" },

    { id: "flutter", x: 20, y: 20, label: "Flutter", parent: "mobile" },
    { id: "kotlin", x: 40, y: 20, label: "Kotlin", parent: "mobile" },

    { id: "react", x: 60, y: 20, label: "React", parent: "web" },
    { id: "nextjs", x: 80, y: 20, label: "Next.js", parent: "web" },

    { id: "node", x: 40, y: 87, label: "Node.js", parent: "backend" },
    { id: "firebase", x: 60, y: 87, label: "Firebase", parent: "backend" },
];

export const SkillTree = () => {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    return (
        <section id="skills" className="bg-zinc-950 py-24 text-white relative overflow-hidden">

            <div className="mx-auto max-w-7xl px-6 sm:px-12 text-center relative z-10">
                <h2 className="mb-12 text-3xl font-bold font-heading sm:text-4xl text-white">Skills Lab</h2>

                <div className="relative min-h-[600px] w-full md:aspect-square max-w-2xl mx-auto rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl p-8">
                    {/* SVG Connections */}
                    <svg className="absolute inset-0 h-full w-full pointer-events-none">
                        {skills.map((skill) => {
                            if (!skill.parent) return null;
                            const parent = skills.find(s => s.id === skill.parent);
                            if (!parent) return null;

                            return (
                                <motion.line
                                    key={`${skill.id}-link`}
                                    x1={`${parent.x}%`}
                                    y1={`${parent.y}%`}
                                    x2={`${skill.x}%`}
                                    y2={`${skill.y}%`}
                                    stroke="#333"
                                    strokeWidth="2"
                                    initial={{ pathLength: 0 }}
                                    whileInView={{ pathLength: 1 }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                />
                            );
                        })}
                    </svg>

                    {/* Nodes */}
                    {skills.map((skill, index) => (
                        <motion.div
                            key={skill.id}
                            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer"
                            style={{ left: `${skill.x}%`, top: `${skill.y}%` }}
                            initial={{ scale: 0, opacity: 0 }}
                            whileInView={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.1, type: "spring" }}
                            onMouseEnter={() => setHoveredSkill(skill.id)}
                            onMouseLeave={() => setHoveredSkill(null)}
                        >
                            <div className={`relative flex h-16 w-16 items-center justify-center rounded-full border-2 bg-zinc-950 transition-colors ${hoveredSkill === skill.id ? "border-flutter-blue shadow-[0_0_20px_rgba(4,104,215,0.5)]" : "border-zinc-700 hover:border-zinc-500"}`}>
                                <span className="text-xs font-bold">{skill.label}</span>

                                {/* Pulse Effect for Core */}
                                {skill.id === "core" && (
                                    <div className="absolute inset-0 -z-10 animate-ping rounded-full bg-flutter-blue/20" />
                                )}
                            </div>
                        </motion.div>
                    ))}
                </div>

                <p className="mt-8 text-zinc-400">Interact with the nodes to explore proficiency.</p>
            </div>
        </section>
    );
};
