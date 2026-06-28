"use client";

import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

type EngineeringChallengesProps = {
    challenges: string[];
};

export const EngineeringChallenges = ({ challenges }: EngineeringChallengesProps) => {
    if (!challenges || challenges.length === 0) return null;

    return (
        <section className="bg-black py-24 text-white border-t border-zinc-900">
            <div className="mx-auto max-w-7xl px-6 sm:px-12">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold font-heading sm:text-4xl">Engineering Challenges Resolved</h2>
                    <p className="mt-4 text-zinc-400 max-w-xl mx-auto">
                        A detailed breakdown of low-level infrastructure and systems problems successfully solved during implementation.
                    </p>
                </div>

                <div className="mx-auto max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-6">
                    {challenges.map((challenge, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 15 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.05, duration: 0.4 }}
                            className="flex items-start gap-4 p-5 rounded-2xl border border-zinc-800 bg-zinc-900/40 backdrop-blur-sm hover:border-zinc-700 hover:bg-zinc-900/60 transition-all duration-300 group"
                        >
                            <span className="text-green-500 shrink-0 mt-0.5 group-hover:scale-110 transition-transform duration-300">
                                <CheckCircle2 size={22} className="shadow-lg shadow-green-500/20" />
                            </span>
                            <span className="text-zinc-200 font-medium text-base group-hover:text-white transition-colors duration-300">
                                {challenge}
                            </span>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
