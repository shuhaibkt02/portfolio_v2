"use client";

import { motion } from "framer-motion";
import { Mail, Github, Linkedin, ArrowRight, Download, BookOpen } from "lucide-react";

export const ContactSection = () => {
    return (
        <section id="contact" className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-background py-20">
            {/* Background Elements */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 left-0 h-full w-full bg-[radial-gradient(circle_at_50%_50%,_rgba(4,104,215,0.15),transparent_70%)]" />
            </div>

            <div className="relative z-10 w-full max-w-5xl px-4">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    className="overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-8 shadow-2xl backdrop-blur-xl sm:p-14"
                >
                    <div className="grid gap-12 lg:grid-cols-2">

                        {/* Text Content */}
                        <div className="flex flex-col justify-center">
                            <h2 className="mb-4 text-3xl font-bold font-heading text-white sm:text-5xl">Let&apos;s Build Something Amazing</h2>
                            <p className="mb-8 text-base text-zinc-400 leading-relaxed">
                                I&apos;m currently open to Flutter Developer roles and mobile engineering opportunities. Whether you have a question, project proposal, or just want to say hi, feel free to reach out!
                            </p>

                            <div className="flex flex-col gap-4 sm:flex-row">
                                <a
                                    href="mailto:shuhaibkt02@gmail.com"
                                    className="flex items-center justify-center gap-2 rounded-full bg-flutter-blue px-6 py-3 font-medium text-white transition-transform hover:scale-105 shadow-lg shadow-flutter-blue/20"
                                >
                                    <Mail size={20} />
                                    <span>Send Email</span>
                                </a>
                                <a
                                    href="/SHUHAIB-KT.pdf"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center justify-center gap-2 rounded-full border border-zinc-700 bg-transparent px-6 py-3 font-medium text-white transition-colors hover:bg-white/5"
                                >
                                    <Download size={20} />
                                    <span>Download Resume</span>
                                </a>
                            </div>
                        </div>

                        {/* Social Links & Info */}
                        <div className="flex flex-col justify-center gap-8 rounded-2xl bg-white/5 p-8 border border-white/5">
                            <div>
                                <h3 className="mb-4 text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono">Connect & Links</h3>
                                <div className="flex flex-col gap-4">
                                    <a href="mailto:shuhaibkt02@gmail.com" className="flex items-center gap-3 text-zinc-300 hover:text-white group">
                                        <Mail size={20} className="group-hover:text-flutter-blue transition-colors text-zinc-400" />
                                        <span className="text-sm font-medium">shuhaibkt02@gmail.com</span>
                                        <ArrowRight size={16} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 ml-auto" />
                                    </a>
                                    <a href="https://github.com/shuhaibkt02" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-white group">
                                        <Github size={20} className="group-hover:text-flutter-blue transition-colors text-zinc-400" />
                                        <span className="text-sm font-medium">github.com/shuhaibkt02</span>
                                        <ArrowRight size={16} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 ml-auto" />
                                    </a>
                                    <a href="https://www.linkedin.com/in/shuhaibkt/" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-white group">
                                        <Linkedin size={20} className="group-hover:text-flutter-blue transition-colors text-zinc-400" />
                                        <span className="text-sm font-medium">linkedin.com/in/shuhaibkt</span>
                                        <ArrowRight size={16} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 ml-auto" />
                                    </a>
                                    <a href="https://medium.com/@shuhaibkt02" target="_blank" rel="noopener noreferrer" className="flex items-center gap-3 text-zinc-300 hover:text-white group">
                                        <BookOpen size={20} className="group-hover:text-flutter-blue transition-colors text-zinc-400" />
                                        <span className="text-sm font-medium">medium.com/@shuhaibkt02</span>
                                        <ArrowRight size={16} className="opacity-0 -translate-x-2 transition-all group-hover:opacity-100 group-hover:translate-x-0 ml-auto" />
                                    </a>
                                </div>
                            </div>

                            <div>
                                <h3 className="mb-3 text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono">Current Status</h3>
                                <div className="flex items-center gap-2.5 rounded-full bg-green-500/10 border border-green-500/20 px-4 py-2 text-green-400 text-sm font-medium w-fit">
                                    <span className="relative flex h-2.5 w-2.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                                        <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                                    </span>
                                    Open to Opportunities
                                </div>
                            </div>
                        </div>

                    </div>
                </motion.div>

                <footer className="mt-12 text-center text-sm text-zinc-600 font-mono">
                    <p>© 2026 Shuhaib KT. Built with Flutter passion, Next.js & Tailwind CSS.</p>
                </footer>
            </div>
        </section>
    );
};
