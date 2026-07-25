"use client";

import { motion } from "framer-motion";
import { ExternalLink, CheckCircle2, Briefcase, Calendar } from "lucide-react";
import Link from "next/link";

interface ExperienceCompany {
    company: string;
    role: string;
    period: string;
    description: string;
    highlights: string[];
    technologies: string[];
    tagHref?: string;
    tagLabel?: string;
}

const experiences: ExperienceCompany[] = [
    {
        company: "SpiralCode Innovates LLP",
        role: "Flutter Developer",
        period: "Feb 2025 – Dec 2025",
        description: "Worked on multiple enterprise Flutter applications across ERP and logistics domains.",
        highlights: [
            "Delivered six production Flutter applications.",
            "Implemented Clean Architecture using BLoC and Riverpod.",
            "Built offline-first applications using Hive and background synchronization.",
            "Developed native Android integrations using Kotlin and MethodChannel.",
            "Integrated Firebase, Google Maps Platform, REST APIs, Ola Maps and Sentry.",
            "Automated build pipelines using GitHub Actions and Fastlane."
        ],
        technologies: [
            "Flutter", "Dart", "Kotlin", "Firebase", "Hive",
            "Google Maps Platform", "GitHub Actions", "Fastlane"
        ],
        tagLabel: "WAVES 2 Project",
        tagHref: "/work/waves-2"
    },
    {
        company: "Cake Nook",
        role: "Frontend Developer",
        period: "Freelance Contract",
        description: "Built a multi-vendor hyperlocal marketplace using Next.js and React.js.",
        highlights: [
            "Complete shopping experience with custom checkout workflows",
            "Razorpay payment gateway integration",
            "Geo-boundary delivery validation using Google Maps Platform",
            "Core Web Vitals optimization for instant mobile loading",
            "SEO improvements for local market discoverability"
        ],
        technologies: [
            "React.js", "Next.js", "TypeScript", "Tailwind CSS", "Google Maps Platform"
        ],
        tagLabel: "CakeNook Platform",
        tagHref: "/work/cakenook"
    },
    {
        company: "Nizzcorp",
        role: "Junior Software Developer",
        period: "2022 – 2023",
        description: "Started my professional journey by developing ERP and employee management solutions.",
        highlights: [
            "Employee Management Application development",
            "Field Sales Management application",
            "Drag-and-drop ERP Page Builder engine",
            "REST API Integration across mobile & backend",
            "SVG serialization engine for custom dynamic layouts"
        ],
        technologies: [
            "Flutter", "React", "Node.js", "MongoDB", "PostgreSQL"
        ]
    }
];

export const StoryTimeline = () => {
    return (
        <section id="about" className="bg-zinc-950 py-24 text-white relative overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 sm:px-12 relative z-10">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12 text-center"
                >
                    <p className="text-xs font-mono text-flutter-blue uppercase tracking-widest mb-2">My Story & Background</p>
                    <h2 className="text-3xl font-bold font-heading sm:text-4xl">About Me</h2>
                </motion.div>

                {/* About Me Story Block */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="mb-20 rounded-3xl border border-zinc-800 bg-zinc-900/60 p-8 sm:p-12 backdrop-blur-md shadow-2xl"
                >
                    <div className="space-y-4 text-zinc-300 text-base sm:text-lg font-light leading-relaxed">
                        <p>
                            I&apos;m a <strong className="text-white font-semibold">Flutter Developer from Kerala, India</strong>, with over two years of professional experience building mobile applications for enterprise and consumer products.
                        </p>
                        <p>
                            Throughout my career, I have worked on ERP systems, logistics platforms, employee management applications, field-sales solutions, and hyperlocal marketplaces.
                        </p>
                        <p>
                            My work focuses on developing reliable, scalable, and maintainable applications using modern Flutter architecture. I enjoy solving complex engineering challenges involving offline-first applications, background services, native Android integrations, geofencing, and real-time location tracking.
                        </p>
                        <p>
                            Besides Flutter, I also have experience building responsive web applications using React.js and Next.js, allowing me to contribute across mobile and web platforms when needed.
                        </p>
                        <p>
                            I continuously improve my skills by exploring Flutter internals, Android development with Kotlin, and software architecture while building production-ready applications.
                        </p>
                    </div>
                </motion.div>

                {/* Experience Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <p className="text-xs font-mono text-flutter-blue uppercase tracking-widest mb-2">Professional Journey</p>
                    <h2 className="text-3xl font-bold font-heading sm:text-4xl">Work Experience</h2>
                </motion.div>

                <div className="space-y-8">
                    {experiences.map((exp, index) => (
                        <motion.div
                            key={exp.company}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                            className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-8 hover:border-zinc-700 transition-colors"
                        >
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 border-b border-zinc-800/80 pb-6">
                                <div>
                                    <h3 className="text-2xl font-bold text-white font-heading">{exp.company}</h3>
                                    <div className="flex items-center gap-2 mt-1">
                                        <Briefcase size={16} className="text-flutter-blue" />
                                        <span className="text-base font-medium text-flutter-blue">{exp.role}</span>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2 text-sm font-mono text-zinc-400 bg-zinc-800/60 px-4 py-1.5 rounded-full w-fit">
                                    <Calendar size={14} />
                                    <span>{exp.period}</span>
                                </div>
                            </div>

                            <p className="text-zinc-300 text-base mb-6 leading-relaxed">
                                {exp.description}
                            </p>

                            {/* Highlights */}
                            <div className="mb-6">
                                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">Highlights</h4>
                                <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                    {exp.highlights.map((h) => (
                                        <li key={h} className="flex items-start gap-2.5 text-sm text-zinc-300">
                                            <CheckCircle2 size={16} className="text-flutter-blue shrink-0 mt-0.5" />
                                            <span>{h}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Technologies */}
                            <div>
                                <h4 className="text-xs font-mono text-zinc-400 uppercase tracking-wider mb-3">Technologies</h4>
                                <div className="flex flex-wrap gap-2">
                                    {exp.technologies.map((tech) => (
                                        <span
                                            key={tech}
                                            className="px-3 py-1 rounded-full text-xs font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
                                        >
                                            {tech}
                                        </span>
                                    ))}
                                </div>
                            </div>

                            {exp.tagHref && exp.tagLabel && (
                                <div className="mt-6 pt-4 border-t border-zinc-800/60">
                                    <Link
                                        href={exp.tagHref}
                                        className="inline-flex items-center gap-2 text-sm font-semibold text-flutter-blue hover:text-blue-400 transition-colors"
                                    >
                                        <ExternalLink size={14} />
                                        <span>View {exp.tagLabel} Case Study</span>
                                    </Link>
                                </div>
                            )}
                        </motion.div>
                    ))}
                </div>

            </div>
        </section>
    );
};
