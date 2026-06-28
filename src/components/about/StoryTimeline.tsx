"use client";

import { motion } from "framer-motion";

const milestones = [
    {
        year: "Pre-2019",
        title: "Cybersecurity Foundations",
        desc: "Built foundational knowledge in networking, system security, and defensive cybersecurity concepts before formal degree studies."
    },
    {
        year: "2019 – 2022",
        title: "Bachelor of Computer Applications",
        desc: "Completed BCA while building technical foundations and exploring software development independently."
    },
    {
        year: "2022 – 2023",
        title: "Junior Android Developer",
        desc: "Joined Nizzcorp and worked on employee and sales management systems using Flutter, React, Node.js, and PostgreSQL."
    },
    {
        year: "2023 – 2025",
        title: "Independent Engineering & Technical Research",
        desc: "Built production-grade Flutter architectures, native Android plugins, offline synchronization systems, trading automation tools, and explored blockchain infrastructure while preparing for enterprise mobile development."
    },
    {
        year: "2025 – 2026",
        title: "Flutter Developer",
        desc: "Worked at SpiralCode Innovates LLP on enterprise-grade Flutter applications, offline-first systems, and high-precision location tracking."
    },
    {
        year: "2026",
        title: "Full-Stack Freelance Engineer",
        desc: "Built a custom e-commerce web platform (CakeNook) using Next.js, React, Tailwind, and Razorpay payment integration with geocoded delivery bounds."
    },
    {
        year: "Present",
        title: "Open to Opportunities",
        desc: "Seeking senior mobile developer or cross-platform engineering roles in high-performance product teams."
    }
];


export const StoryTimeline = () => {
    return (
        <section id="about" className="bg-zinc-950 py-24 text-white">
            <div className="mx-auto max-w-7xl px-6 sm:px-12">
                <h2 className="mb-12 text-3xl font-bold font-heading">My Journey</h2>

                {/* Vertical/Horizontal Container */}
                <div className="relative">

                    {/* Progress Line */}
                    <div className="absolute left-4 top-0 h-full w-0.5 bg-zinc-800 md:left-0 md:top-8 md:h-0.5 md:w-full" />

                    <div className="flex flex-col gap-8 pb-12 pt-4 md:flex-row md:overflow-x-auto">
                        {milestones.map((milestone, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, x: 50 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.2 }}
                                className="relative md:min-w-[300px] shrink-0 pt-4 md:pt-4 pl-12 md:pl-0"
                            >
                                {/* Dot */}
                                <div className="absolute left-2 top-8 h-4 w-4 -translate-y-1/2 rounded-full border-4 border-zinc-950 bg-flutter-blue md:left-0 md:top-0 md:translate-y-0" />

                                <div className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 backdrop-blur-sm transition-all hover:bg-zinc-900 md:ml-2 md:mt-4">
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
