"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, Clock, Share2, Check, Copy, AlertCircle, Info, Lightbulb, ShieldAlert, Tag } from "lucide-react";
import { useState } from "react";
import { getBlogBySlug, getAllBlogs, BlogSection } from "@/lib/blogData";

interface BlogDetailsPageProps {
    params: Promise<{ slug: string }>;
}

export default function BlogDetailsPage({ params }: BlogDetailsPageProps) {
    const resolvedParams = use(params);
    const post = getBlogBySlug(resolvedParams.slug);
    const [copied, setCopied] = useState(false);
    const [codeCopiedIdx, setCodeCopiedIdx] = useState<number | null>(null);

    if (!post) {
        notFound();
    }

    const allBlogs = getAllBlogs();
    const relatedPosts = allBlogs.filter((p) => p.slug !== post.slug).slice(0, 2);

    const handleShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    const handleCopyCode = (code: string, idx: number) => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(code);
            setCodeCopiedIdx(idx);
            setTimeout(() => setCodeCopiedIdx(null), 2000);
        }
    };

    const renderSection = (section: BlogSection, idx: number) => {
        switch (section.type) {
            case "paragraph":
                return (
                    <p key={idx} className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-6">
                        {section.content}
                    </p>
                );
            case "heading":
                return (
                    <h2 key={idx} className="text-2xl sm:text-3xl font-bold font-heading text-white mt-12 mb-6 tracking-tight border-b border-zinc-800 pb-3">
                        {section.content}
                    </h2>
                );
            case "subheading":
                return (
                    <h3 key={idx} className="text-xl font-bold font-heading text-zinc-100 mt-8 mb-4">
                        {section.content}
                    </h3>
                );
            case "list":
                return (
                    <ul key={idx} className="space-y-3 my-6 pl-2">
                        {section.items?.map((item, itemIdx) => (
                            <li key={itemIdx} className="flex items-start gap-3 text-zinc-300 text-base leading-relaxed">
                                <span className="h-2 w-2 rounded-full bg-flutter-blue mt-2.5 shrink-0" />
                                <span>{item}</span>
                            </li>
                        ))}
                    </ul>
                );
            case "code":
                return (
                    <div key={idx} className="my-8 rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden font-mono text-sm">
                        <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-400">
                            <span>{section.language || "code"}</span>
                            <button
                                onClick={() => handleCopyCode(section.content || "", idx)}
                                className="flex items-center gap-1.5 hover:text-white transition-colors"
                            >
                                {codeCopiedIdx === idx ? <Check size={14} className="text-green-400" /> : <Copy size={14} />}
                                <span>{codeCopiedIdx === idx ? "Copied" : "Copy"}</span>
                            </button>
                        </div>
                        <pre className="p-4 sm:p-6 overflow-x-auto text-zinc-200 leading-relaxed text-xs sm:text-sm">
                            <code>{section.content}</code>
                        </pre>
                    </div>
                );
            case "callout":
                const variantStyles = {
                    info: "bg-flutter-blue/10 border-flutter-blue/30 text-flutter-blue",
                    warning: "bg-amber-500/10 border-amber-500/30 text-amber-400",
                    tip: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
                    danger: "bg-red-500/10 border-red-500/30 text-red-400"
                };

                const VariantIcon = {
                    info: Info,
                    warning: AlertCircle,
                    tip: Lightbulb,
                    danger: ShieldAlert
                }[section.variant || "info"];

                return (
                    <div
                        key={idx}
                        className={`my-8 p-5 sm:p-6 rounded-2xl border backdrop-blur-sm flex items-start gap-4 ${
                            variantStyles[section.variant || "info"]
                        }`}
                    >
                        <VariantIcon size={22} className="shrink-0 mt-0.5" />
                        <p className="text-sm sm:text-base leading-relaxed text-zinc-200">
                            {section.content}
                        </p>
                    </div>
                );
            case "quote":
                return (
                    <blockquote
                        key={idx}
                        className="my-8 border-l-4 border-flutter-blue pl-6 italic text-zinc-300 text-lg sm:text-xl font-serif leading-relaxed"
                    >
                        "{section.content}"
                    </blockquote>
                );
            default:
                return null;
        }
    };

    return (
        <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-24 px-6 sm:px-12 relative overflow-hidden">
            {/* Ambient Background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-flutter-blue/5 rounded-full blur-3xl" />
            </div>

            <div className="mx-auto max-w-4xl relative z-10">
                {/* Navigation Back Link */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="mb-8"
                >
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-flutter-blue transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to all articles</span>
                    </Link>
                </motion.div>

                {/* Article Header */}
                <motion.header
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mb-12"
                >
                    <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="px-3 py-1 rounded-full bg-flutter-blue/10 border border-flutter-blue/20 text-flutter-blue text-xs font-semibold">
                            {post.category}
                        </span>
                        <div className="flex items-center gap-4 text-xs font-mono text-zinc-500">
                            <span className="flex items-center gap-1">
                                <Calendar size={13} />
                                {post.publishedAt}
                            </span>
                            <span className="flex items-center gap-1">
                                <Clock size={13} />
                                {post.readTime}
                            </span>
                        </div>
                    </div>

                    <h1 className="text-3xl sm:text-5xl font-bold font-heading text-white tracking-tight leading-tight mb-6">
                        {post.title}
                    </h1>

                    <p className="text-lg sm:text-xl text-zinc-400 leading-relaxed font-normal mb-8">
                        {post.excerpt}
                    </p>

                    {/* Author & Share Bar */}
                    <div className="flex items-center justify-between border-y border-zinc-800/80 py-4">
                        <div className="flex items-center gap-3">
                            <div className="h-10 w-10 rounded-full bg-flutter-blue/20 border border-flutter-blue/40 flex items-center justify-center font-bold text-flutter-blue text-sm">
                                SK
                            </div>
                            <div>
                                <p className="text-sm font-semibold text-white">{post.author.name}</p>
                                <p className="text-xs text-zinc-500 font-mono">{post.author.role}</p>
                            </div>
                        </div>

                        <button
                            onClick={handleShare}
                            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-zinc-300 transition-colors"
                        >
                            {copied ? <Check size={14} className="text-green-400" /> : <Share2 size={14} />}
                            <span>{copied ? "Link Copied!" : "Share"}</span>
                        </button>
                    </div>
                </motion.header>

                {/* Article Body */}
                <motion.article
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.1 }}
                    className="prose prose-invert max-w-none mb-16"
                >
                    {post.sections.map((section, idx) => renderSection(section, idx))}
                </motion.article>

                {/* Tags Footer */}
                <div className="flex flex-wrap items-center gap-2 border-t border-zinc-800/80 pt-8 mb-16">
                    <span className="text-xs font-mono text-zinc-500 mr-2 flex items-center gap-1">
                        <Tag size={12} /> Tags:
                    </span>
                    {post.tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300">
                            #{tag}
                        </span>
                    ))}
                </div>

                {/* Author Card */}
                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 mb-20 flex flex-col sm:flex-row items-center gap-6">
                    <div className="h-16 w-16 rounded-2xl bg-flutter-blue/20 border border-flutter-blue/40 flex items-center justify-center font-bold text-flutter-blue text-xl shrink-0">
                        SK
                    </div>
                    <div>
                        <h3 className="text-lg font-bold font-heading text-white">Written by {post.author.name}</h3>
                        <p className="text-xs font-mono text-flutter-blue mb-2">{post.author.role}</p>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Mobile engineer crafting offline-first Flutter architecture, Android Kotlin plugins, and robust enterprise applications.
                        </p>
                    </div>
                </div>

                {/* Related Posts */}
                {relatedPosts.length > 0 && (
                    <div>
                        <h3 className="text-2xl font-bold font-heading text-white mb-6">More Articles</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {relatedPosts.map((rel) => (
                                <Link
                                    key={rel.id}
                                    href={`/blog/${rel.slug}`}
                                    className="group block p-6 rounded-2xl border border-zinc-800 bg-zinc-900/40 hover:border-flutter-blue/40 transition-colors"
                                >
                                    <span className="text-xs font-mono text-flutter-blue mb-2 block">{rel.category}</span>
                                    <h4 className="text-base font-bold font-heading text-white group-hover:text-flutter-blue transition-colors mb-2">
                                        {rel.title}
                                    </h4>
                                    <p className="text-xs text-zinc-400 line-clamp-2">{rel.excerpt}</p>
                                </Link>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </main>
    );
}
