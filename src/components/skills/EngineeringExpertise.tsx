"use client";

import { motion } from "framer-motion";
import { CheckCircle, Smartphone, Cloud, Database, Wrench, Globe } from "lucide-react";
import {
    FlutterIcon, DartIcon, KotlinIcon, AndroidIcon, NextJsIcon,
    TypeScriptIcon, FirebaseIcon, GitIcon, PostgreSQLIcon,
    HiveIcon, RoomIcon, SentryIcon, ReactIcon, GithubActionsIcon,
    CleanArchIcon, BlocIcon, RiverpodIcon, AndroidStudioIcon, AwsIcon
} from "@/components/icons/TechIcons";

interface SkillCategory {
    title: string;
    icon: React.ComponentType<React.SVGAttributes<SVGElement> & { size?: number }>;
    skills: { name: string; icon?: React.ComponentType<React.SVGAttributes<SVGElement> & { size?: number }>; color?: string }[];
}

const skillCategories: SkillCategory[] = [
    {
        title: "Mobile Development",
        icon: Smartphone,
        skills: [
            { name: "Flutter", icon: FlutterIcon, color: "#54C5F8" },
            { name: "Dart", icon: DartIcon, color: "#0175C2" },
            { name: "Android SDK", icon: AndroidIcon, color: "#3DDC84" },
            { name: "Kotlin", icon: KotlinIcon, color: "#A97BFF" },
            { name: "MethodChannel" },
            { name: "BLoC", icon: BlocIcon, color: "#0468D7" },
            { name: "Riverpod", icon: RiverpodIcon, color: "#4CAF50" },
            { name: "Clean Architecture", icon: CleanArchIcon, color: "#9C27B0" },
        ]
    },
    {
        title: "Cloud & Services",
        icon: Cloud,
        skills: [
            { name: "AWS", icon: AwsIcon, color: "#FF9900" },
            { name: "Firebase", icon: FirebaseIcon, color: "#FFCA28" },
            { name: "Google Maps Platform" },
            { name: "REST APIs" },
            { name: "Sentry", icon: SentryIcon, color: "#FB4226" },
        ]
    },
    {
        title: "Databases",
        icon: Database,
        skills: [
            { name: "Hive", icon: HiveIcon, color: "#FFB74D" },
            { name: "SQLite" },
            { name: "MongoDB" },
            { name: "PostgreSQL", icon: PostgreSQLIcon, color: "#336791" },
        ]
    },
    {
        title: "Tools",
        icon: Wrench,
        skills: [
            { name: "Git", icon: GitIcon, color: "#F05032" },
            { name: "GitHub Actions", icon: GithubActionsIcon, color: "#2088FF" },
            { name: "Fastlane" },
            { name: "Android Studio", icon: AndroidStudioIcon, color: "#3DDC84" },
            { name: "Google Play Console" },
        ]
    },
    {
        title: "Web",
        icon: Globe,
        skills: [
            { name: "React.js", icon: ReactIcon, color: "#61DAFB" },
            { name: "Next.js", icon: NextJsIcon, color: "#FFFFFF" },
            { name: "Tailwind CSS" },
            { name: "TypeScript", icon: TypeScriptIcon, color: "#3178C6" },
        ]
    }
];

const specializations = [
    "Flutter Development",
    "Cross-platform Mobile Apps",
    "Offline-first Architecture",
    "Native Android Integration",
    "AWS Cloud Services",
    "Real-time Location Tracking",
    "Firebase",
    "Google Maps Platform",
    "Clean Architecture",
    "RESTful API Integration"
];

export const EngineeringExpertise = () => {
    return (
        <section id="skills" className="bg-zinc-950 py-24 text-white relative overflow-hidden">
            {/* Ambient background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-flutter-blue/5 rounded-full blur-3xl" />
                <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-6 sm:px-12 relative z-10">
                {/* Section Header */}
                <motion.div
                    className="mb-16 text-center"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="text-xs font-mono text-flutter-blue uppercase tracking-widest mb-3">Categorized Skills & Core Competencies</p>
                    <h2 className="text-3xl font-bold font-heading sm:text-4xl text-white">Skills & Specializations</h2>
                    <p className="mt-3 text-zinc-400 max-w-xl mx-auto text-sm">
                        Production-proven technologies, architectural patterns, and core domain specializations.
                    </p>
                </motion.div>

                {/* Categorized Skills Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
                    {skillCategories.map((category, index) => {
                        const CategoryIcon = category.icon;

                        return (
                            <motion.div
                                key={category.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: index * 0.08 }}
                                className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-7 hover:border-zinc-700 transition-colors flex flex-col justify-between"
                            >
                                <div>
                                    <div className="flex items-center gap-3 mb-6 border-b border-zinc-800/80 pb-4">
                                        <div className="p-2.5 rounded-xl bg-flutter-blue/10 text-flutter-blue border border-flutter-blue/20">
                                            <CategoryIcon size={20} />
                                        </div>
                                        <h3 className="text-xl font-bold font-heading text-white">{category.title}</h3>
                                    </div>

                                    <div className="flex flex-wrap gap-2.5">
                                        {category.skills.map((skill) => {
                                            const TechIcon = skill.icon;

                                            return (
                                                <div
                                                    key={skill.name}
                                                    className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-zinc-800/60 border border-zinc-700/40 text-xs font-medium text-zinc-200"
                                                >
                                                    {TechIcon && (
                                                        <TechIcon size={16} className="shrink-0" style={{ color: skill.color || "#54C5F8" }} />
                                                    )}
                                                    <span>{skill.name}</span>
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>

                {/* What I Specialize In Section */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="rounded-3xl border border-flutter-blue/30 bg-gradient-to-br from-zinc-900/80 via-zinc-900/40 to-zinc-950 p-8 sm:p-12 backdrop-blur-md shadow-2xl"
                >
                    <div className="text-center mb-10">
                        <p className="text-xs font-mono text-flutter-blue uppercase tracking-widest mb-2">Core Engineering Focus</p>
                        <h3 className="text-3xl font-bold font-heading text-white">What I Specialize In</h3>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {specializations.map((item, idx) => (
                            <motion.div
                                key={item}
                                initial={{ opacity: 0, scale: 0.95 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.3, delay: idx * 0.05 }}
                                className="flex items-center gap-3 p-4 rounded-2xl bg-zinc-950/60 border border-zinc-800 hover:border-flutter-blue/40 transition-colors"
                            >
                                <CheckCircle size={20} className="text-flutter-blue shrink-0" />
                                <span className="text-sm font-semibold text-zinc-200">{item}</span>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>
            </div>
        </section>
    );
};
