"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, Tag, BookOpen, ShieldCheck, Cpu } from "lucide-react";
import { getAllBlogs, BlogPost } from "@/lib/blogData";

export default function BlogListPage() {
    const allPosts = getAllBlogs();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    // Extract all unique tags
    const allTags = Array.from(
        new Set(allPosts.flatMap((post) => post.tags))
    );

    // Filter posts based on search query & selected tag
    const filteredPosts = allPosts.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;

        return matchesSearch && matchesTag;
    });

    const featuredPost = allPosts.find((p) => p.featured) || allPosts[0];

    return (
        <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-24 px-6 sm:px-12 relative overflow-hidden">
            {/* Ambient Lighting background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-20 left-1/3 w-96 h-96 bg-flutter-blue/10 rounded-full blur-3xl" />
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
            </div>

            <div className="mx-auto max-w-7xl relative z-10">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="text-center max-w-3xl mx-auto mb-14"
                >
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-flutter-blue/10 border border-flutter-blue/20 text-flutter-blue text-xs font-mono mb-4">
                        <BookOpen size={14} />
                        <span>Engineering Insights & Articles</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white tracking-tight">
                        Engineering Blog
                    </h1>
                    <p className="mt-4 text-zinc-400 text-base leading-relaxed">
                        Practical articles on Flutter security, native Android integrations, offline-first architectures, and REST API engineering.
                    </p>
                </motion.div>

                {/* Search & Tag Filter Bar */}
                <div className="mb-12 space-y-6">
                    <div className="relative max-w-xl mx-auto">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" size={18} />
                        <input
                            type="text"
                            placeholder="Search articles, topics, or technologies..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-zinc-900/60 border border-zinc-800 rounded-2xl pl-12 pr-4 py-3.5 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-flutter-blue/50 focus:ring-1 focus:ring-flutter-blue/30 transition-colors"
                        />
                    </div>

                    {/* Tag Pills */}
                    <div className="flex flex-wrap justify-center gap-2">
                        <button
                            onClick={() => setSelectedTag(null)}
                            className={`px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                                selectedTag === null
                                    ? "bg-flutter-blue text-white"
                                    : "bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white"
                            }`}
                        >
                            All Articles
                        </button>
                        {allTags.map((tag) => (
                            <button
                                key={tag}
                                onClick={() => setSelectedTag(selectedTag === tag ? null : tag)}
                                className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                                    selectedTag === tag
                                        ? "bg-flutter-blue text-white"
                                        : "bg-zinc-900/80 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700"
                                }`}
                            >
                                <Tag size={12} />
                                {tag}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Featured Hero Article */}
                {!searchQuery && !selectedTag && featuredPost && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                        className="mb-16"
                    >
                        <Link href={`/blog/${featuredPost.slug}`} className="group block">
                            <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 hover:border-flutter-blue/40 p-6 sm:p-8 transition-all duration-300 hover:bg-zinc-900/70 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                <div className="lg:col-span-7 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 rounded-full bg-flutter-blue/10 border border-flutter-blue/20 text-flutter-blue text-xs font-semibold">
                                            Featured Article
                                        </span>
                                        <span className="text-xs font-mono text-zinc-500">{featuredPost.category}</span>
                                    </div>

                                    <h2 className="text-2xl sm:text-3xl font-bold font-heading text-white group-hover:text-flutter-blue transition-colors">
                                        {featuredPost.title}
                                    </h2>

                                    <p className="text-zinc-400 text-sm leading-relaxed line-clamp-3">
                                        {featuredPost.excerpt}
                                    </p>

                                    <div className="flex flex-wrap items-center gap-4 text-xs text-zinc-500 pt-2">
                                        <div className="flex items-center gap-1.5">
                                            <Calendar size={14} />
                                            <span>{featuredPost.publishedAt}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5">
                                            <Clock size={14} />
                                            <span>{featuredPost.readTime}</span>
                                        </div>
                                    </div>

                                    <div className="inline-flex items-center gap-2 text-sm font-semibold text-flutter-blue pt-2 group-hover:translate-x-1 transition-transform">
                                        <span>Read Full Article</span>
                                        <ArrowRight size={16} />
                                    </div>
                                </div>

                                {/* Tech Gradient Graphic Banner */}
                                <div className={`lg:col-span-5 relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br ${featuredPost.coverGradient} border border-white/10 p-6 flex flex-col justify-between group-hover:scale-[1.02] transition-transform duration-500`}>
                                    <div className="flex items-center justify-between text-white/60">
                                        <ShieldCheck size={28} className="text-flutter-blue" />
                                        <span className="text-[10px] font-mono tracking-widest uppercase bg-black/40 px-2.5 py-1 rounded-md border border-white/10">
                                            SECURITY GUIDE
                                        </span>
                                    </div>
                                    <div className="space-y-1 font-mono text-xs text-zinc-300 bg-black/50 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                                        <div className="text-flutter-blue font-semibold">$ flutter build apk \</div>
                                        <div className="pl-4 text-emerald-400">--obfuscate \</div>
                                        <div className="pl-4 text-purple-300">--split-debug-info=symbols</div>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    </motion.div>
                )}

                {/* Articles Grid */}
                <div>
                    <h2 className="text-xl font-bold font-heading text-white mb-6">
                        {selectedTag ? `Articles tagged "${selectedTag}"` : searchQuery ? `Search Results (${filteredPosts.length})` : "All Articles"}
                    </h2>

                    {filteredPosts.length === 0 ? (
                        <div className="text-center py-16 rounded-3xl border border-zinc-800/80 bg-zinc-900/30">
                            <p className="text-zinc-400 text-sm">No articles found matching your criteria.</p>
                            <button
                                onClick={() => {
                                    setSearchQuery("");
                                    setSelectedTag(null);
                                }}
                                className="mt-4 text-xs font-semibold text-flutter-blue hover:underline"
                            >
                                Reset filters
                            </button>
                        </div>
                    ) : (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            {filteredPosts.map((post, idx) => (
                                <motion.div
                                    key={post.id}
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.4, delay: idx * 0.08 }}
                                >
                                    <Link href={`/blog/${post.slug}`} className="group flex flex-col justify-between h-full rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 hover:border-zinc-700 transition-all hover:bg-zinc-900/60">
                                        <div>
                                            {/* Graphic header pill */}
                                            <div className={`aspect-[2/1] w-full rounded-2xl mb-6 bg-gradient-to-br ${post.coverGradient} border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden`}>
                                                <div className="flex items-center justify-between">
                                                    <span className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-mono">
                                                        {post.category}
                                                    </span>
                                                    <Cpu size={20} className="text-flutter-blue/80" />
                                                </div>
                                                <div className="text-xs font-mono text-zinc-300 font-medium truncate">
                                                    {post.tags.map(t => `#${t}`).join(" ")}
                                                </div>
                                            </div>

                                            <div className="flex items-center justify-between gap-2 mb-3">
                                                <span className="text-xs text-zinc-500 font-mono flex items-center gap-1">
                                                    <Calendar size={12} />
                                                    {post.publishedAt}
                                                </span>
                                                <div className="flex items-center gap-1 text-xs text-zinc-500 font-mono">
                                                    <Clock size={12} />
                                                    <span>{post.readTime}</span>
                                                </div>
                                            </div>

                                            <h3 className="text-xl font-bold font-heading text-white group-hover:text-flutter-blue transition-colors mb-3">
                                                {post.title}
                                            </h3>

                                            <p className="text-zinc-400 text-sm leading-relaxed mb-6 line-clamp-3">
                                                {post.excerpt}
                                            </p>
                                        </div>

                                        <div>
                                            <div className="flex items-center justify-between border-t border-zinc-800/60 pt-4">
                                                <span className="text-xs font-semibold text-flutter-blue group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                                                    Read Article
                                                    <ArrowRight size={14} />
                                                </span>
                                            </div>
                                        </div>
                                    </Link>
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </main>
    );
}
