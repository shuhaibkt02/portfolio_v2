"use client";

import { useRef, useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Link from "next/link";

// ─── Data ─────────────────────────────────────────────────────────────────────

interface Milestone {
    year: string;
    title: string;
    desc: string;
    tagLabel?: string;
    tagHref?: string;
}

const milestones: Milestone[] = [
    {
        year: "Pre-2019",
        title: "Cybersecurity Foundations",
        desc: "Built foundational knowledge in networking, system security, and defensive cybersecurity concepts before formal degree studies.",
    },
    {
        year: "2019 – 2022",
        title: "Bachelor of Computer Applications",
        desc: "Completed BCA at Jaipur National University while building technical foundations and exploring software development independently.",
    },
    {
        year: "2022 – 2023",
        title: "Junior Software Developer",
        desc: "Joined Nizzcorp. Developed employee/sales management apps (Flutter, React.js, Node.js, PostgreSQL) and engineered a custom drag-and-drop ERP page builder.",
    },
    {
        year: "2024 – 2025",
        title: "Freelance Frontend Developer",
        desc: "Developed responsive business websites using React.js and designed a sales tracking web application for managing sales workflows.",
    },
    {
        year: "2025",
        title: "Flutter Developer",
        desc: "Worked at SpiralCode Innovates LLP on enterprise-grade Flutter applications, building offline-first systems, Clean Architecture, and native Android integrations.",
        tagLabel: "WAVES Project",
        tagHref: "/work/waves",
    },
    {
        year: "2026",
        title: "Freelance Flutter Developer",
        desc: "Joined Inquisyx (Contract). Redesigned core UI/UX flows and implemented Google Maps real-time navigation, geofencing validations, and offer workflows.",
    },
    {
        year: "2026",
        title: "Freelance Frontend Developer",
        desc: "Built a custom multi-vendor hyperlocal e-commerce web platform (CakeNook) using Next.js, React, Tailwind, Razorpay, and geocoded delivery bounds.",
        tagLabel: "CakeNook",
        tagHref: "/work/cakenook",
    },
    {
        year: "Present",
        title: "Open to Opportunities",
        desc: "Seeking senior mobile developer or cross-platform engineering roles in high-performance product teams.",
    },
];

// ─── Component ────────────────────────────────────────────────────────────────

export const StoryTimeline = () => {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);

    // Track which card is closest to the center of the scroll container
    const onScroll = useCallback(() => {
        const container = scrollRef.current;
        if (!container) return;

        const containerCenter = container.scrollLeft + container.clientWidth / 2;
        const cards = container.querySelectorAll<HTMLElement>("[data-card]");
        let nearest = 0;
        let minDist = Infinity;

        cards.forEach((card, i) => {
            const cardCenter = card.offsetLeft + card.offsetWidth / 2;
            const dist = Math.abs(containerCenter - cardCenter);
            if (dist < minDist) {
                minDist = dist;
                nearest = i;
            }
        });

        setActiveIndex(nearest);
    }, []);

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;
        el.addEventListener("scroll", onScroll, { passive: true });
        return () => el.removeEventListener("scroll", onScroll);
    }, [onScroll]);

    // Programmatic snap-scroll to a card index
    const scrollTo = (index: number) => {
        const container = scrollRef.current;
        if (!container) return;
        const cards = container.querySelectorAll<HTMLElement>("[data-card]");
        const card = cards[index];
        if (!card) return;
        const offset = card.offsetLeft - container.clientWidth / 2 + card.offsetWidth / 2;
        container.scrollTo({ left: offset, behavior: "smooth" });
    };

    return (
        <section id="about" className="bg-zinc-950 py-24 text-white overflow-hidden">
            <div className="mx-auto max-w-7xl px-6 sm:px-12">

                {/* Section Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.5 }}
                    className="mb-16"
                >
                    <p className="text-xs font-mono text-flutter-blue uppercase tracking-widest mb-2">Career Path</p>
                    <h2 className="text-3xl font-bold font-heading">My Journey</h2>
                </motion.div>

                {/* Dot navigation */}
                <div className="mb-8 flex items-center gap-2">
                    {milestones.map((_, i) => (
                        <button
                            key={i}
                            onClick={() => scrollTo(i)}
                            aria-label={`Go to milestone ${i + 1}`}
                            className={`transition-all duration-300 rounded-full ${
                                i === activeIndex
                                    ? "w-6 h-2 bg-flutter-blue"
                                    : "w-2 h-2 bg-zinc-700 hover:bg-zinc-500"
                            }`}
                        />
                    ))}
                    <span className="ml-auto text-xs font-mono text-zinc-600">
                        {activeIndex + 1} / {milestones.length}
                    </span>
                </div>
            </div>

            {/* ── Scrollable Timeline Track ─────────────────────────────────────── */}
            {/*
                Both the axis line and the cards live inside this container.
                They scroll together so the line and dots can never desync.
            */}
            <div
                ref={scrollRef}
                className="flex gap-0 overflow-x-auto pb-10 pt-14"
                style={{
                    scrollSnapType: "x mandatory",
                    WebkitOverflowScrolling: "touch",
                    msOverflowStyle: "none",
                    scrollbarWidth: "none",
                }}
            >
                {/* Left spacer so first card can center */}
                <div className="shrink-0 w-[calc(50vw-160px)]" aria-hidden="true" />

                {milestones.map((milestone, index) => {
                    const isActive = index === activeIndex;
                    const isAdjacent = Math.abs(index - activeIndex) === 1;

                    return (
                        <div
                            key={index}
                            data-card
                            style={{ scrollSnapAlign: "center" }}
                            className="relative shrink-0 w-[320px] px-3 flex flex-col"
                        >
                            {/* ── Timeline axis: line + dot ── */}
                            {/* Line spans full card width; dots align center */}
                            <div className="relative flex items-center justify-center h-8 mb-4">
                                {/* Left half-line */}
                                <div className="absolute top-1/2 -translate-y-1/2 left-0 right-1/2 h-px bg-zinc-800" />
                                {/* Right half-line */}
                                <div className="absolute top-1/2 -translate-y-1/2 left-1/2 right-0 h-px bg-zinc-800" />

                                {/* Active line highlight (left → right of active card) */}
                                {isActive && (
                                    <motion.div
                                        layoutId="active-line"
                                        className="absolute top-1/2 -translate-y-1/2 left-0 right-0 h-px bg-flutter-blue/50"
                                    />
                                )}

                                {/* Dot */}
                                <motion.div
                                    animate={{
                                        scale: isActive ? 1.4 : 1,
                                        backgroundColor: isActive ? "#0468D7" : "#3f3f46",
                                        boxShadow: isActive
                                            ? "0 0 0 4px rgba(4,104,215,0.2), 0 0 14px rgba(4,104,215,0.45)"
                                            : "none",
                                    }}
                                    transition={{ type: "spring", stiffness: 300, damping: 25 }}
                                    className="relative z-10 h-3.5 w-3.5 rounded-full"
                                />
                            </div>

                            {/* ── Card ── */}
                            <motion.div
                                animate={{
                                    scale: isActive ? 1 : isAdjacent ? 0.95 : 0.88,
                                    opacity: isActive ? 1 : isAdjacent ? 0.55 : 0.3,
                                }}
                                transition={{ type: "spring", stiffness: 280, damping: 28 }}
                                className={`
                                    flex-1 rounded-2xl border p-6 backdrop-blur-sm
                                    transition-colors duration-300
                                    ${isActive
                                        ? "border-flutter-blue/40 bg-zinc-900 shadow-[0_0_32px_rgba(4,104,215,0.12)]"
                                        : "border-zinc-800 bg-zinc-900/40"
                                    }
                                `}
                            >
                                {/* Year badge */}
                                <span
                                    className={`
                                        inline-block text-[10px] font-bold tracking-widest uppercase px-2.5 py-1 rounded-full mb-3
                                        transition-colors duration-300
                                        ${isActive
                                            ? "bg-flutter-blue/15 text-flutter-blue"
                                            : "bg-zinc-800 text-zinc-500"
                                        }
                                    `}
                                >
                                    {milestone.year}
                                </span>

                                <h3 className="text-base font-bold leading-snug mb-2 text-white">{milestone.title}</h3>
                                <p className="text-sm text-zinc-400 leading-relaxed">{milestone.desc}</p>

                                {/* Project evidence chip — anchored to its parent milestone */}
                                {milestone.tagHref && milestone.tagLabel && (
                                    <Link
                                        href={milestone.tagHref}
                                        className={`
                                            mt-4 inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold
                                            border transition-all duration-200
                                            ${isActive
                                                ? "border-flutter-blue/40 text-flutter-blue bg-flutter-blue/10 hover:bg-flutter-blue/20"
                                                : "border-zinc-700 text-zinc-500 bg-zinc-800/50 hover:border-zinc-600 hover:text-zinc-300"
                                            }
                                        `}
                                    >
                                        <ExternalLink size={11} />
                                        {milestone.tagLabel}
                                    </Link>
                                )}
                            </motion.div>

                            {/* "Now viewing" label under active card */}
                            <div className="h-6 mt-2 flex items-center justify-center">
                                {isActive && (
                                    <motion.span
                                        initial={{ opacity: 0, y: 4 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0 }}
                                        className="text-[10px] font-mono text-flutter-blue/50 uppercase tracking-widest"
                                    >
                                        ● Now viewing
                                    </motion.span>
                                )}
                            </div>
                        </div>
                    );
                })}

                {/* Right spacer */}
                <div className="shrink-0 w-[calc(50vw-160px)]" aria-hidden="true" />
            </div>

            {/* Prev / Next controls */}
            <div className="mx-auto max-w-7xl px-6 sm:px-12 mt-2 flex items-center justify-end gap-4">
                <button
                    onClick={() => scrollTo(Math.max(0, activeIndex - 1))}
                    disabled={activeIndex === 0}
                    className="text-xs font-mono text-zinc-600 hover:text-white disabled:opacity-25 transition-colors"
                >
                    ← prev
                </button>
                <button
                    onClick={() => scrollTo(Math.min(milestones.length - 1, activeIndex + 1))}
                    disabled={activeIndex === milestones.length - 1}
                    className="text-xs font-mono text-zinc-600 hover:text-white disabled:opacity-25 transition-colors"
                >
                    next →
                </button>
            </div>
        </section>
    );
};
