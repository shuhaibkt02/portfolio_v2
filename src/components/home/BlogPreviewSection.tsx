"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BookOpen, Clock, Calendar } from "lucide-react";
import { getAllBlogs } from "@/lib/blogData";

export const BlogPreviewSection = () => {
    const blogs = getAllBlogs().slice(0, 2);

    return (
        <section id="blog" className="bg-zinc-950 py-24 text-white relative overflow-hidden">
            {/* Ambient Lighting */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-1/3 left-1/3 w-96 h-96 bg-flutter-blue/5 rounded-full blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl px-6 sm:px-12 relative z-10">
                {/* Section Header */}
                <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-flutter-blue/10 border border-flutter-blue/20 text-flutter-blue text-xs font-mono mb-3">
                            <BookOpen size={14} />
                            <span>Engineering Writing & Insights</span>
                        </div>
                        <h2 className="text-3xl font-bold font-heading sm:text-4xl text-white">
                            Latest Technical Articles
                        </h2>
                        <p className="mt-3 text-zinc-400 max-w-xl text-sm leading-relaxed">
                            Practical guides on Flutter security, performance optimizations, and enterprise cloud architecture.
                        </p>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5 }}
                    >
                        <Link
                            href="/blog"
                            className="inline-flex items-center gap-2 px-5 py-3 rounded-2xl bg-zinc-900 border border-zinc-800 hover:border-flutter-blue/50 text-sm font-semibold text-white hover:text-flutter-blue transition-colors group"
                        >
                            <span>Explore All Posts</span>
                            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                        </Link>
                    </motion.div>
                </div>

                {/* Blog Cards Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {blogs.map((post, index) => (
                        <motion.div
                            key={post.id}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: index * 0.1 }}
                        >
                            <Link
                                href={`/blog/${post.slug}`}
                                className="group flex flex-col justify-between h-full rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-8 hover:border-flutter-blue/40 transition-all duration-300 hover:bg-zinc-900/60"
                            >
                                <div>
                                    <div className="flex items-center justify-between gap-2 mb-4">
                                        <span className="px-3 py-1 rounded-full bg-flutter-blue/10 border border-flutter-blue/20 text-flutter-blue text-xs font-semibold">
                                            {post.category}
                                        </span>
                                        <div className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                                            <Clock size={13} />
                                            <span>{post.readTime}</span>
                                        </div>
                                    </div>

                                    <h3 className="text-xl font-bold font-heading text-white group-hover:text-flutter-blue transition-colors mb-3 leading-snug">
                                        {post.title}
                                    </h3>

                                    <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                        {post.excerpt}
                                    </p>
                                </div>

                                <div className="flex items-center justify-between border-t border-zinc-800/60 pt-5 mt-4">
                                    <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                                        <Calendar size={12} />
                                        {post.publishedAt}
                                    </span>

                                    <div className="flex items-center gap-1.5 text-xs font-semibold text-flutter-blue group-hover:translate-x-1 transition-transform">
                                        <span>Read Article</span>
                                        <ArrowRight size={14} />
                                    </div>
                                </div>
                            </Link>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
