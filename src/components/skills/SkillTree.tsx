"use client";

import { motion } from "framer-motion";
import { useState } from "react";

// Simple node data structure for the tree
const skills = [
    { id: "core", x: 50, y: 45, label: "Core", level: "Expert" },

    // Categories
    { id: "mobile", x: 15, y: 45, label: "Mobile", parent: "core" },
    { id: "web", x: 85, y: 45, label: "Web", parent: "core" },
    { id: "backend", x: 35, y: 70, label: "Backend", parent: "core" },
    { id: "arch", x: 65, y: 70, label: "Arch", parent: "core" },
    { id: "tools", x: 50, y: 15, label: "Tools", parent: "core" },

    // Mobile
    { id: "flutter", x: 5, y: 35, label: "Flutter", parent: "mobile" },
    { id: "kotlin", x: 5, y: 55, label: "Kotlin", parent: "mobile" },

    // Web
    { id: "react", x: 95, y: 35, label: "React", parent: "web" },
    { id: "nextjs", x: 95, y: 55, label: "Next.js", parent: "web" },
    { id: "js", x: 85, y: 25, label: "JS", parent: "web" },

    // Backend
    { id: "node", x: 25, y: 85, label: "Node.js", parent: "backend" },
    { id: "firebase", x: 35, y: 95, label: "Firebase", parent: "backend" },
    { id: "python", x: 45, y: 85, label: "Python", parent: "backend" },

    // Architecture
    { id: "bloc", x: 55, y: 85, label: "BLoC", parent: "arch" },
    { id: "riverpod", x: 65, y: 95, label: "Riverpod", parent: "arch" },
    { id: "clean", x: 75, y: 85, label: "Clean Arch", parent: "arch" },
    { id: "xmind", x: 70, y: 55, label: "XMind", parent: "arch" },

    // Tools
    { id: "docker", x: 35, y: 5, label: "Docker", parent: "tools" },
    { id: "postman", x: 65, y: 5, label: "Postman", parent: "tools" },
    { id: "vscode", x: 50, y: 0, label: "VS Code", parent: "tools" },
    { id: "figma", x: 50, y: 30, label: "Figma", parent: "tools" },
];

export const SkillTree = () => {
    const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

    return (
        <section id="skills" className="bg-zinc-950 py-24 text-white relative overflow-hidden">

            <div className="mx-auto max-w-7xl px-6 sm:px-12 text-center relative z-10">
                <h2 className="mb-12 text-3xl font-bold font-heading sm:text-4xl text-white">Skills Lab</h2>

                <div className="relative min-h-[800px] w-full max-w-4xl mx-auto md:aspect-square rounded-3xl bg-zinc-900 border border-zinc-800 shadow-2xl p-8">
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
