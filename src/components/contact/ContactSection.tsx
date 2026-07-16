"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowRight, Download } from "lucide-react";

export const ContactSection = () => {
    return (
        <section id="contact" className="relative h-screen w-full flex items-center justify-center overflow-hidden bg-background">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_50%_50%,_rgba(4,104,215,0.15),transparent_70%)]" />
            </div>

            <div className="relative z-10 w-full max-w-4xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-xl sm:p-16"
                >
                    <div className="grid gap-12 lg:grid-cols-2">

                        {/* Text Content */}
                        <div className="flex flex-col justify-center">
                            <h2 className="mb-6 text-4xl font-bold font-heading text-white sm:text-5xl">Let&apos;s Build Something Amazing</h2>
                            <p className="mb-8 text-lg text-zinc-400">
                                I&apos;m currently open to new opportunities. Whether you have a question or just want to say hi, I&apos;ll try my best to get back to you!
                            </p>

                            <div className="flex flex-col gap-4 sm:flex-row">
                                <a
                                    href="mailto:shuhaibkt02@gmail.com"
                                    className="flex items-center justify-center gap-2 rounded-full bg-flutter-blue px-6 py-3 font-medium text-white transition-transform hover:scale-105"
                                >
                                    <Mail size={20} />
                                    Say Hello
                                </a>
                                <a
                                    href="/SHUHAIB-KT.pdf"
                                    className="flex items-center justify-center gap-2 rounded-full border border-zinc-700 bg-transparent px-6 py-3 font-medium text-white transition-colors hover:bg-white/5"
                                >
                                    <Download size={20} />
                                    Resume
                                </a>
                            </div>
                        </div>

                        {/* Social Links & Info */}
                        <div className="flex flex-col justify-center gap-8 rounded-2xl bg-white/5 p-8">
                            <div>
                                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500">Connect</h3>
                                <div className="flex flex-col gap-4">
                                    <a href="https://github.com/shuhaibkt02" target="_blank" className="flex items-center gap-3 text-zinc-300 hover:text-white group">
                                        <Github size={24} className="group-hover:text-flutter-blue transition-colors" />
                                        <span>github.com/shuhaibkt02</span>
                                        <ArrowRight size={16} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/shuhaibkt/" target="_blank" className="flex items-center gap-3 text-zinc-300 hover:text-white group">
                                        <Linkedin size={24} className="group-hover:text-flutter-blue transition-colors" />
                                        <span>linkedin.com/in/shuhaibkt</span>
                                        <ArrowRight size={16} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-4 text-sm font-bold uppercase tracking-widest text-zinc-500">Status</h3>
                                <div className="flex items-center gap-2 rounded-full bg-green-500/10 px-4 py-2 text-green-400 w-fit">
                                    <span className="relative flex h-3 w-3">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
                                    </span>
                                    Open to Opportunities
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>

                <footer className="mt-16 text-center text-sm text-zinc-600">
                    <p>© 2025 Shuhaib. Built with Flutter ❤️ (and Next.js).</p>
                </footer>
            </div>
        </section>
    );
};
