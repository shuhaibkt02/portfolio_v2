"use client";

import { motion } from "framer-motion";

export const ChallengeSection = () => {
    return (
        <section className="bg-black py-24 text-white">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-16 px-6 sm:px-12 lg:grid-cols-2">

                {/* Left: Problem Statement */}
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
                        How do you create an enterprise-grade ERP solution that works offline and tracks field employees in real-time?
                    </motion.h3>

                    <motion.p
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="text-lg leading-relaxed text-zinc-400"
                    >
                        Existing solutions were clunky, required constant internet connectivity, and drained device battery rapidly.
                        The goal was to build a native-performance application that could handle complex data synchronization
                        while providing a delightful user experience.
                    </motion.p>
                </div>

                {/* Right: Illustration/Pain Points */}
                <div className="flex items-center justify-center">
                    <div className="relative w-full max-w-md">
                        {/* Abstract visual representation of chaos/pain points */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.8 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: 0.4 }}
                            className="aspect-square rounded-full border border-zinc-800 bg-zinc-900/50 p-8"
                        >
                            <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-center">
                                <div className="rounded-lg bg-red-500/10 p-4 text-red-500">
                                    Offline Work Environments
                                </div>
                                <div className="rounded-lg bg-orange-500/10 p-4 text-orange-500">
                                    Inaccurate Attendance
                                </div>
                                <div className="rounded-lg bg-yellow-500/10 p-4 text-yellow-500">
                                    Battery Drain
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>

            </div>
        </section>
    );
};
