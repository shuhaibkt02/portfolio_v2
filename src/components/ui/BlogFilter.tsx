"use client";

import { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Search, Calendar, Clock, ArrowRight, Tag, Cpu, Heart } from "lucide-react";
import { BlogPostWithEngagement } from "@/lib/blogData";

interface BlogFilterProps {
    posts: BlogPostWithEngagement[];
    allTags: string[];
}

export function BlogFilter({ posts, allTags }: BlogFilterProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedTag, setSelectedTag] = useState<string | null>(null);

    const filteredPosts = posts.filter((post) => {
        const matchesSearch =
            post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
            post.category.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesTag = selectedTag ? post.tags.includes(selectedTag) : true;
        return matchesSearch && matchesTag;
    });

    return (
        <>
            {/* Search & Tag Filter Bar */}
            <div className="mb-12 space-y-6">
                <div className="relative max-w-xl mx-auto">
                    <Search
                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                        size={18}
                    />
                    <input
                        id="blog-search"
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
                        id="tag-all"
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
                            id={`tag-${tag.toLowerCase().replace(/\s+/g, "-")}`}
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

            {/* Articles Grid */}
            <div>
                <h2 className="text-xl font-bold font-heading text-white mb-6">
                    {selectedTag
                        ? `Articles tagged "${selectedTag}"`
                        : searchQuery
                        ? `Search Results (${filteredPosts.length})`
                        : "All Articles"}
                </h2>

                {filteredPosts.length === 0 ? (
                    <div className="text-center py-16 rounded-3xl border border-zinc-800/80 bg-zinc-900/30">
                        <p className="text-zinc-400 text-sm">
                            No articles found matching your criteria.
                        </p>
                        <button
                            id="reset-filters"
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
                                <Link
                                    href={`/blog/${post.slug}`}
                                    id={`article-card-${post.id}`}
                                    className="group flex flex-col justify-between h-full rounded-3xl border border-zinc-800/80 bg-zinc-900/40 p-6 hover:border-zinc-700 transition-all hover:bg-zinc-900/60"
                                >
                                    <div>
                                        {/* Graphic banner */}
                                        <div
                                            className={`aspect-[2/1] w-full rounded-2xl mb-6 bg-gradient-to-br ${post.coverGradient} border border-white/10 p-5 flex flex-col justify-between relative overflow-hidden`}
                                        >
                                            <div className="flex items-center justify-between">
                                                <span className="px-2.5 py-1 rounded-lg bg-black/50 backdrop-blur-md border border-white/10 text-white text-xs font-mono">
                                                    {post.category}
                                                </span>
                                                <Cpu size={20} className="text-flutter-blue/80" />
                                            </div>
                                            <div className="text-xs font-mono text-zinc-300 font-medium truncate">
                                                {post.tags.map((t) => `#${t}`).join(" ")}
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

                                    {/* Card footer: like count + read link */}
                                    <div className="flex items-center justify-between border-t border-zinc-800/60 pt-4">
                                        {/* Read-only like count */}
                                        <span className="flex items-center gap-1.5 text-xs text-zinc-500 font-mono">
                                            <Heart size={12} className="text-zinc-600" />
                                            <span>{post.likeCount}</span>
                                        </span>

                                        <span className="text-xs font-semibold text-flutter-blue group-hover:translate-x-1 transition-transform flex items-center gap-1.5">
                                            Read Article
                                            <ArrowRight size={14} />
                                        </span>
                                    </div>
                                </Link>
                            </motion.div>
                        ))}
                    </div>
                )}
            </div>
        </>
    );
}
