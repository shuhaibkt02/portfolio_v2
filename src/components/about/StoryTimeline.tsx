"use client";

import { motion } from "framer-motion";

const milestones = [
    { year: "2019", title: "BCA Graduation", desc: "Graduated with distinction. Discovered passion for mobile dev." },
    { year: "2020", title: "First Freelance App", desc: "Built a grocery delivery app during lockdown. 500+ users." },
    { year: "2021", title: "Joined TechCorp", desc: "Junior Flutter Developer. Worked on fintech solutions." },
    { year: "2023", title: "Lead Developer", desc: "Promoted to Lead. Managed a team of 4 developers." },
    { year: "Present", title: "Full Stack Journey", desc: "Exploring Next.js and advanced architecture patterns." },
];

export const StoryTimeline = () => {
    return (
        <section id="about" className="bg-zinc-950 py-24 text-white">
            <div className="mx-auto max-w-7xl px-6 sm:px-12">
                <h2 className="mb-12 text-3xl font-bold font-heading">My Journey</h2>

                {/* Horizontal Scroll Container */}
                <div className="relative overflow-hidden">

                    {/* Progress Line */}
                    <div className="absolute top-8 left-0 h-0.5 w-full bg-zinc-800" />

                    <div className="flex w-full gap-8 overflow-x-auto pb-12 pt-4 scrollbar-hide">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative min-w-[300px] shrink-0 pt-4"
                            >
                                {/* Dot */}
                                <div className="absolute top-0 left-0 h-4 w-4 rounded-full border-4 border-zinc-950 bg-flutter-blue" />

                                <div className="ml-2 mt-4 rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all hover:bg-zinc-900">
                                    <span className="text-sm font-bold text-flutter-blue">{milestone.year}</span>
                                    <h3 className="mt-2 text-xl font-bold">{milestone.title}</h3>
                                    <p className="mt-2 text-zinc-400">{milestone.desc}</p>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
