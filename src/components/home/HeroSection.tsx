"use client";

import { motion } from "framer-motion";
import { Download } from "lucide-react";
import { ParticleBackground } from "./ParticleBackground";

export const HeroSection = () => {
    return (
        <section id="home" className="relative flex h-screen w-full items-center justify-center overflow-hidden bg-background">
            <ParticleBackground />

            <div className="z-10 flex flex-col items-center px-4 text-center sm:px-8 max-w-4xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <span className="mb-4 inline-block rounded-full bg-flutter-blue/10 px-4 py-1.5 text-sm font-medium text-flutter-blue backdrop-blur-sm border border-flutter-blue/20">
                        Available for freelance & full-time roles
                    </span>
                </motion.div>

                <motion.h1
                    className="mt-6 text-5xl font-bold tracking-tight font-heading sm:text-6xl md:text-7xl lg:text-8xl text-white"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    Hi, I&apos;m <span className="text-flutter-blue">Shuhaib KT</span>
                </motion.h1>

                <motion.div
                    className="mt-6 text-2xl font-semibold text-zinc-300 sm:text-3xl md:text-4xl"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                >
                    <span className="font-mono text-white">
                        Flutter Developer
                    </span>
                </motion.div>

                <motion.p
                    className="mt-6 max-w-xl text-base text-zinc-400 sm:text-lg md:text-xl font-light leading-relaxed"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                >
                    I build cross-platform mobile applications using Flutter and Dart with a strong focus on performance, maintainability, and user experience.
                </motion.p>

                <motion.div
                    className="mt-10 flex flex-col gap-4 sm:flex-row"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                >
                    <a
                        href="#work"
                        className="group relative flex items-center justify-center gap-2 overflow-hidden rounded-full bg-flutter-blue px-8 py-3.5 text-lg font-medium text-white transition-all hover:bg-blue-600 shadow-lg shadow-flutter-blue/25"
                    >
                        <span className="relative z-10">Explore My Work</span>
                        <div className="absolute inset-0 -z-0 translate-y-full transform bg-white/20 transition-transform duration-300 group-hover:translate-y-0" />
                    </a>

                    <a
                        href="/SHUHAIB-KT.pdf"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center justify-center gap-2 rounded-full border border-zinc-700 bg-transparent px-8 py-3.5 text-lg font-medium text-zinc-300 transition-all hover:border-zinc-500 hover:text-white"
                    >
                        <Download size={20} />
                        <span>Download Resume</span>
                    </a>
                </motion.div>
            </div>
        </section>
    );
};
