"use client";

import { motion } from "framer-motion";

type ChallengeSectionProps = {
    description: string;
    painPoints: {
        title: string;
        color: string;
    }[];
};

const colorMap: Record<string, string> = {
    red: "bg-red-500/10 text-red-500",
    orange: "bg-orange-500/10 text-orange-500",
    yellow: "bg-yellow-500/10 text-yellow-500",
    blue: "bg-blue-500/10 text-blue-500",
    green: "bg-green-500/10 text-green-500",
    purple: "bg-purple-500/10 text-purple-500",
};

export const ChallengeSection = ({ description, painPoints }: ChallengeSectionProps) => {
    return (
        <section className="bg-black py-24 text-white">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 sm:px-12 lg:grid-cols-2">
                <div className="flex flex-col justify-center">
                    <motion.h2
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="mb-6 text-sm font-bold uppercase tracking-widest text-flutter-blue"
                    >
                        The Challenge
                    </motion.h2>

                    <motion.h3
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="mb-8 text-3xl font-bold leading-snug font-heading sm:text-4xl"
                    >
                        Problem Statement
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-lg leading-relaxed text-zinc-400"
                    >
                        {description}
                    </motion.p>
                </div>

                <div className="flex items-center justify-center">
                    <div className="relative w-full max-w-md">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="aspect-square rounded-full border border-zinc-800 bg-zinc-900/50 p-8"
                        >
                            <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                                {painPoints.map((point, i) => (
                                    <div key={i} className={`rounded-lg p-4 ${colorMap[point.color] || colorMap.red}`}>
                                        {point.title}
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </section>
    );
};
