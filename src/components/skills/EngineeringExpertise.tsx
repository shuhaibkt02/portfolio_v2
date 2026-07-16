"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import {
    FlutterIcon, DartIcon, KotlinIcon, AndroidIcon, NextJsIcon,
    TypeScriptIcon, FirebaseIcon, DockerIcon, GitIcon, PostgreSQLIcon,
    HiveIcon, RoomIcon, SentryIcon, FigmaIcon, ReactIcon, GithubActionsIcon,
    NodeIcon, CleanArchIcon, BlocIcon, RiverpodIcon, AndroidStudioIcon
} from "@/components/icons/TechIcons";
import { ArrowRight, ExternalLink } from "lucide-react";

// ─── Data Model ──────────────────────────────────────────────────────────────

interface TechItem {
    name: string;
    Icon: React.ComponentType<React.SVGAttributes<SVGElement> & { size?: number }>;
    color: string;
}

interface ProjectEvidence {
    title: string;
    href: string;
    highlights: string[];
}

interface DomainNode {
    id: string;
    label: string;
    shortLabel: string;
    tagline: string;
    description: string;
    capabilities: string[];
    tech: TechItem[];
    projectEvidence: ProjectEvidence[];
    // position on the aspect-square canvas [0–100]
    x: number;
    y: number;
    parentId?: string;
}

// ─── Domain Data ─────────────────────────────────────────────────────────────

const DOMAINS: DomainNode[] = [
    {
        id: "core",
        label: "Shuhaib KT",
        shortLabel: "Core",
        tagline: "Software Engineer",
        description: "3+ years of experience developing cross-platform mobile and web applications. Specialized in Flutter, React.js, Next.js, Kotlin, TypeScript, and offline-first systems.",
        capabilities: [
            "Mobile & Web Development",
            "Offline-First Systems",
            "Geofencing & Navigation",
            "SEO & Web Performance",
            "CI/CD & DevOps Automation",
            "Cross-Functional Collaboration",
        ],
        tech: [],
        projectEvidence: [
            { title: "WAVES 2", href: "/work/waves-2", highlights: ["5+ core modules", "20+ screens"] },
            { title: "Ozone Tracker", href: "/work/ozone", highlights: ["Salary-grade GPS", "Anti-tamper audit"] },
            { title: "CakeNook", href: "/work/cakenook", highlights: ["Full-stack freelance", "Production live"] },
            { title: "Inquisyx", href: "#about", highlights: ["Google Maps routing", "Geofence validation"] },
        ],
        x: 50,
        y: 50,
    },
    {
        id: "mobile",
        label: "Mobile Engineering",
        shortLabel: "Mobile",
        tagline: "Flutter · Dart · Kotlin",
        description: "Cross-platform mobile apps with Flutter and Dart, using platform channels to integrate native Android code written in Kotlin.",
        capabilities: [
            "Cross-Platform UI with Flutter",
            "Dart Isolates & Multithreading",
            "Animations & Custom Painters",
            "MethodChannel & EventChannel",
            "App Size Optimization",
            "Play Store Release Management",
            "Closed Beta & Staged Rollouts",
        ],
        tech: [
            { name: "Flutter", Icon: FlutterIcon, color: "#54C5F8" },
            { name: "Dart", Icon: DartIcon, color: "#0175C2" },
            { name: "Kotlin", Icon: KotlinIcon, color: "#A97BFF" },
            { name: "React Native", Icon: ReactIcon, color: "#61DAFB" },
        ],
        projectEvidence: [
            {
                title: "WAVES - Primary Sales ERP",
                href: "/work/waves",
                highlights: ["Custom Kotlin Bluetooth plugin", "Offline invoice generation", "Route-based sales flow"],
            },
            {
                title: "WAVES 2 - Adv. Sales Platform",
                href: "/work/waves-2",
                highlights: ["Forced geofence checkout", "20+ screens with BLoC", "Firebase ecosystem integration"],
            },
            {
                title: "Inquisyx (Contract)",
                href: "#about",
                highlights: ["Real-time Google Maps navigation", "Geofence-based progress tracking", "Redesigned core UI/UX flows"],
            },
            {
                title: "Ozone Activity Tracker",
                href: "/work/ozone",
                highlights: ["Dual dashboard (employee + manager)", "Attendance & visit offline sync"],
            },
        ],
        x: 22,
        y: 28,
        parentId: "core",
    },
    {
        id: "native-android",
        label: "Native Android",
        shortLabel: "Android",
        tagline: "Foreground Services · Room · Coroutines",
        description: "Production-grade native Kotlin code bridged into Flutter via platform channels. Handles background GPS tracking, persistent storage, and processes that survive OS process kills.",
        capabilities: [
            "Android Foreground Services",
            "WorkManager & Coroutines",
            "Room Database Persistence",
            "EventChannel & MethodChannel",
            "Kalman Filtering for GPS",
            "Anti-Tamper Location Logs",
            "OS Process Kill Survival",
        ],
        tech: [
            { name: "Kotlin", Icon: KotlinIcon, color: "#A97BFF" },
            { name: "Android", Icon: AndroidIcon, color: "#3DDC84" },
            { name: "Room DB", Icon: RoomIcon, color: "#4CAF50" },
            { name: "Android Studio", Icon: AndroidStudioIcon, color: "#3DDC84" },
        ],
        projectEvidence: [
            {
                title: "Location Tracker Plugin",
                href: "https://github.com/shuhaibkt02/location_tracker",
                highlights: [
                    "Native Kotlin foreground service",
                    "Kalman filtering for GPS drift",
                    "Room DB FIFO location history",
                    "Firebase error logging",
                ],
            },
            {
                title: "Ozone Activity Tracker",
                href: "/work/ozone",
                highlights: [
                    "15-minute interval GPS via EventChannel",
                    "Background kill resilience",
                    "Salary-grade tracking accuracy",
                ],
            },
        ],
        x: 78,
        y: 28,
        parentId: "core",
    },
    {
        id: "architecture",
        label: "Architecture & State",
        shortLabel: "Arch",
        tagline: "BLoC · Riverpod · Clean Architecture",
        description: "Structures mobile applications using layered Clean Architecture principles. State managed with BLoC for enterprise apps and Riverpod for lighter, reactive flows.",
        capabilities: [
            "Clean Architecture (3-layer)",
            "BLoC Pattern & Feature Modules",
            "Riverpod for Reactive State",
            "Optimized Widget Rebuilds",
            "MVVM on Web Projects",
            "Transactional Data Flows",
            "Offline Queue Architecture",
        ],
        tech: [
            { name: "BLoC", Icon: BlocIcon, color: "#0468D7" },
            { name: "Riverpod", Icon: RiverpodIcon, color: "#4CAF50" },
            { name: "Clean Arch", Icon: CleanArchIcon, color: "#9C27B0" },
        ],
        projectEvidence: [
            {
                title: "WAVES 2 - Adv. Sales Platform",
                href: "/work/waves-2",
                highlights: [
                    "BLoC across 20+ screens",
                    "Atomic Hive queue for offline orders",
                    "3-retry exponential backoff sync",
                    "Fire-and-forget UI pattern",
                ],
            },
            {
                title: "WAVES - Primary Sales ERP",
                href: "/work/waves",
                highlights: ["Riverpod for app-wide state", "Write-through Hive pattern"],
            },
        ],
        x: 22,
        y: 72,
        parentId: "core",
    },
    {
        id: "backend",
        label: "Backend & Cloud",
        shortLabel: "Backend",
        tagline: "Firebase · PostgreSQL · Node.js",
        description: "Integrates mobile apps with cloud backends using Firebase services for real-time data, push notifications, and crash monitoring. Built full-stack web with Node.js and PostgreSQL.",
        capabilities: [
            "Firebase Cloud Messaging (FCM)",
            "Crashlytics & Remote Config",
            "Supabase & PostgreSQL",
            "REST API Integration",
            "Razorpay Payment Gateway",
            "ERPNext / Frappe Backend",
            "Node.js + Express APIs",
        ],
        tech: [
            { name: "Firebase", Icon: FirebaseIcon, color: "#FFCA28" },
            { name: "PostgreSQL", Icon: PostgreSQLIcon, color: "#336791" },
            { name: "Node.js", Icon: NodeIcon, color: "#68A063" },
            { name: "Hive DB", Icon: HiveIcon, color: "#FFB74D" },
            { name: "Room DB", Icon: RoomIcon, color: "#4CAF50" },
            { name: "Sentry", Icon: SentryIcon, color: "#FB4226" },
        ],
        projectEvidence: [
            {
                title: "WAVES 2 - Adv. Sales Platform",
                href: "/work/waves-2",
                highlights: [
                    "FCM transactional payload sync",
                    "Crashlytics + Sentry integration",
                    "Remote Config feature flags",
                ],
            },
            {
                title: "CakeNook Marketplace",
                href: "/work/cakenook",
                highlights: [
                    "Razorpay async payment verification",
                    "Google Maps API geofencing",
                    "Next.js SSR for SEO",
                ],
            },
        ],
        x: 78,
        y: 72,
        parentId: "core",
    },
    {
        id: "devtools",
        label: "Dev Tools & CI/CD",
        shortLabel: "DevOps",
        tagline: "Git · Docker · GitHub Actions",
        description: "Manages the complete app release pipeline, from development tooling and code review to automated CI/CD, Play Store publishing, and production monitoring.",
        capabilities: [
            "Git & GitHub Workflows",
            "GitHub Actions CI/CD",
            "Docker Containerization",
            "Postman API Testing",
            "App Size Optimization",
            "Beta Testing Pools",
            "Staged Rollout Management",
        ],
        tech: [
            { name: "Git", Icon: GitIcon, color: "#F05032" },
            { name: "Docker", Icon: DockerIcon, color: "#2496ED" },
            { name: "GitHub Actions", Icon: GithubActionsIcon, color: "#2088FF" },
            { name: "Next.js", Icon: NextJsIcon, color: "#FFFFFF" },
            { name: "TypeScript", Icon: TypeScriptIcon, color: "#3178C6" },
            { name: "Figma", Icon: FigmaIcon, color: "#F24E1E" },
        ],
        projectEvidence: [
            {
                title: "WAVES 2 - Adv. Sales Platform",
                href: "/work/waves-2",
                highlights: [
                    "Multiple production Play Store releases",
                    "Staged rollout & beta pool management",
                ],
            },
            {
                title: "Personal Portfolio",
                href: "https://shuhaibkt.vercel.app",
                highlights: ["Next.js SSR", "Vercel CI/CD deployment"],
            },
        ],
        x: 50,
        y: 18,
        parentId: "core",
    },
];

const DOMAIN_MAP = new Map(DOMAINS.map(d => [d.id, d]));

// ─── Sub-Components ──────────────────────────────────────────────────────────

const NodeGraph = ({
    activeDomainId,
    onSelect,
}: {
    activeDomainId: string;
    onSelect: (id: string) => void;
}) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const [dims, setDims] = useState({ w: 0, h: 0 });

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const obs = new ResizeObserver(([entry]) => {
            const { width, height } = entry.contentRect;
            setDims({ w: width, h: height });
        });
        obs.observe(el);
        return () => obs.disconnect();
    }, []);

    const px = (pct: number, dim: number) => (pct / 100) * dim;

    return (
        <div
            ref={containerRef}
            className="relative w-full aspect-square max-w-[460px] mx-auto"
        >
            {/* Background glow */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-zinc-900/80 via-zinc-950 to-zinc-900/80 border border-zinc-800/60" />

            {/* SVG lines — render only when we have real dimensions */}
            {dims.w > 0 && (
                <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" viewBox={`0 0 ${dims.w} ${dims.h}`}>
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="2" result="coloredBlur" />
                            <feMerge>
                                <feMergeNode in="coloredBlur" />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    {DOMAINS.map((d) => {
                        if (!d.parentId) return null;
                        const parent = DOMAIN_MAP.get(d.parentId);
                        if (!parent) return null;
                        const isActive = activeDomainId === d.id || activeDomainId === d.parentId;
                        return (
                            <motion.line
                                key={`${d.id}-line`}
                                x1={px(parent.x, dims.w)}
                                y1={px(parent.y, dims.h)}
                                x2={px(d.x, dims.w)}
                                y2={px(d.y, dims.h)}
                                stroke={isActive ? "#0468D7" : "#27272a"}
                                strokeWidth={isActive ? 1.5 : 1}
                                strokeDasharray={isActive ? "none" : "4 4"}
                                filter={isActive ? "url(#glow)" : undefined}
                                initial={{ pathLength: 0, opacity: 0 }}
                                whileInView={{ pathLength: 1, opacity: 1 }}
                                transition={{ duration: 1.2, delay: 0.3 }}
                            />
                        );
                    })}
                </svg>
            )}

            {/* Nodes */}
            {DOMAINS.map((d, i) => {
                const isActive = activeDomainId === d.id;
                const isCore = d.id === "core";

                return (
                    <motion.button
                        key={d.id}
                        onClick={() => onSelect(d.id)}
                        className="absolute -translate-x-1/2 -translate-y-1/2 z-10 focus:outline-none group"
                        style={{ left: `${d.x}%`, top: `${d.y}%` }}
                        initial={{ scale: 0, opacity: 0 }}
                        whileInView={{ scale: 1, opacity: 1 }}
                        transition={{ delay: i * 0.08, type: "spring", stiffness: 200, damping: 20 }}
                        whileHover={{ scale: 1.08 }}
                        aria-label={`Select ${d.label} domain`}
                    >
                        {/* Pulse ring for core */}
                        {isCore && (
                            <span className="absolute inset-0 rounded-full bg-flutter-blue/20 animate-ping" />
                        )}
                        {/* Active ring */}
                        {isActive && (
                            <motion.span
                                layoutId="active-ring"
                                className="absolute -inset-1.5 rounded-full border border-flutter-blue shadow-[0_0_20px_rgba(4,104,215,0.4)]"
                                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                            />
                        )}
                        <div
                            className={`
                                relative flex flex-col items-center justify-center rounded-full border-2 bg-zinc-950 transition-all duration-300
                                ${isCore ? "h-20 w-20 border-flutter-blue" : "h-[60px] w-[60px]"}
                                ${isActive && !isCore ? "border-flutter-blue" : !isActive ? "border-zinc-700 group-hover:border-zinc-500" : ""}
                            `}
                        >
                            <span className={`font-bold leading-tight text-center px-1 ${isCore ? "text-[10px] text-flutter-blue" : "text-[9px] text-zinc-300"}`}>
                                {d.shortLabel}
                            </span>
                        </div>
                    </motion.button>
                );
            })}
        </div>
    );
};

const DetailsPanel = ({ domain }: { domain: DomainNode }) => {
    return (
        <AnimatePresence mode="wait">
            <motion.div
                key={domain.id}
                initial={{ opacity: 0, x: 16 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -16 }}
                transition={{ duration: 0.25 }}
                className="flex flex-col gap-6 h-full"
            >
                {/* Header */}
                <div>
                    <p className="text-xs font-mono text-flutter-blue uppercase tracking-widest mb-1">Engineering Domain</p>
                    <h3 className="text-2xl font-bold font-heading text-white mb-1">{domain.label}</h3>
                    <p className="text-sm text-zinc-400 font-mono">{domain.tagline}</p>
                    <p className="text-sm text-zinc-400 mt-3 leading-relaxed">{domain.description}</p>
                </div>

                {/* Capabilities */}
                <div>
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Capabilities</p>
                    <div className="flex flex-wrap gap-2">
                        {domain.capabilities.map((cap) => (
                            <span
                                key={cap}
                                className="px-2.5 py-1 rounded-full text-xs font-medium bg-zinc-800/80 text-zinc-300 border border-zinc-700/50"
                            >
                                {cap}
                            </span>
                        ))}
                    </div>
                </div>

                {/* Technologies */}
                {domain.tech.length > 0 && (
                    <div>
                        <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Technologies</p>
                        <div className="flex flex-wrap gap-3">
                            {domain.tech.map(({ name, Icon, color }) => (
                                <div
                                    key={name}
                                    className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-medium text-zinc-300"
                                >
                                    <Icon size={14} className="flex-shrink-0" style={{ color }} />
                                    <span>{name}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Project Evidence */}
                <div>
                    <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-3">Project Evidence</p>
                    <div className="flex flex-col gap-3">
                        {domain.projectEvidence.map((proj) => {
                            const isExternal = proj.href.startsWith("http");
                            const content = (
                                <div className="flex flex-col gap-2 p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800 hover:border-zinc-600 transition-colors group/proj cursor-pointer">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm font-semibold text-white">{proj.title}</span>
                                        {isExternal
                                            ? <ExternalLink size={13} className="text-zinc-600 group-hover/proj:text-flutter-blue transition-colors" />
                                            : <ArrowRight size={13} className="text-zinc-600 group-hover/proj:text-flutter-blue transition-colors" />
                                        }
                                    </div>
                                    <ul className="flex flex-col gap-1">
                                        {proj.highlights.map((h) => (
                                            <li key={h} className="flex items-start gap-1.5 text-xs text-zinc-400">
                                                <span className="mt-0.5 h-1.5 w-1.5 rounded-full bg-flutter-blue flex-shrink-0" />
                                                {h}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            );

                            return isExternal ? (
                                <a key={proj.title} href={proj.href} target="_blank" rel="noopener noreferrer">
                                    {content}
                                </a>
                            ) : (
                                <Link key={proj.title} href={proj.href}>
                                    {content}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </motion.div>
        </AnimatePresence>
    );
};

// ─── Main Component ───────────────────────────────────────────────────────────

export const EngineeringExpertise = () => {
    const [activeDomainId, setActiveDomainId] = useState("mobile");
    const activeDomain = DOMAIN_MAP.get(activeDomainId) ?? DOMAINS[0];

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
                    <p className="text-xs font-mono text-flutter-blue uppercase tracking-widest mb-3">What I build with</p>
                    <h2 className="text-3xl font-bold font-heading sm:text-4xl text-white">Engineering Expertise</h2>
                    <p className="mt-3 text-zinc-400 max-w-xl mx-auto text-sm">
                        Select a domain to explore capabilities, technologies, and production proof.
                    </p>
                </motion.div>

                {/* Domain Pill Tabs (mobile-first quick selector) */}
                <div className="flex flex-wrap justify-center gap-2 mb-12 lg:hidden">
                    {DOMAINS.map((d) => (
                        <button
                            key={d.id}
                            onClick={() => setActiveDomainId(d.id)}
                            className={`px-4 py-1.5 rounded-full text-xs font-medium transition-all border ${activeDomainId === d.id
                                ? "bg-flutter-blue border-flutter-blue text-white"
                                : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-600"
                                }`}
                        >
                            {d.shortLabel}
                        </button>
                    ))}
                </div>

                {/* Main layout: graph + panel */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center">
                    {/* Left: Node Graph (hidden on small screens, tabs used instead) */}
                    <div className="hidden lg:flex items-center justify-center">
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.6 }}
                            className="w-full"
                        >
                            <NodeGraph activeDomainId={activeDomainId} onSelect={setActiveDomainId} />
                            <p className="text-center text-xs text-zinc-600 mt-4 font-mono">Click a node to explore</p>
                        </motion.div>
                    </div>

                    {/* Right: Details Panel */}
                    <motion.div
                        className="relative rounded-3xl border border-zinc-800/60 bg-zinc-900/40 backdrop-blur-sm p-7 sm:p-9 min-h-[520px] overflow-y-auto"
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        style={{ maxHeight: "600px" }}
                    >
                        {/* Subtle gradient border top accent */}
                        <div className="absolute top-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-flutter-blue/40 to-transparent" />

                        <DetailsPanel domain={activeDomain} />
                    </motion.div>
                </div>
            </div>
        </section>
    );
};
