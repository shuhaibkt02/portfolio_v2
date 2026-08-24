import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { getBlogBySlug, getAllBlogs } from "@/lib/blogData";
import { getArticleLikeCount } from "@/lib/blogEngagement";
import { renderSection } from "@/components/ui/ArticleSections";
import { ShareButton } from "@/components/ui/ArticleActions";
import { LikeButton } from "@/components/ui/LikeButton";

interface BlogDetailsPageProps {
    params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
    return getAllBlogs().map((post) => ({ slug: post.slug }));
}

export default async function BlogDetailsPage({ params }: BlogDetailsPageProps) {
    const { slug } = await params;
    const post = getBlogBySlug(slug);

    if (!post) notFound();

    const initialLikeCount = await getArticleLikeCount(post.id, post.likeCount);
    const allBlogs = getAllBlogs();
    const relatedPosts = allBlogs.filter((p) => p.slug !== post.slug).slice(0, 2);

    return (
        <main className="min-h-screen bg-zinc-950 text-white pt-28 pb-24 px-6 sm:px-12 relative overflow-hidden">
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-24 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-flutter-blue/5 rounded-full blur-3xl" />
            </div>

            <div className="mx-auto max-w-4xl relative z-10">
                <div className="mb-8">
                    <Link
                        href="/blog"
                        className="inline-flex items-center gap-2 text-xs font-mono text-zinc-400 hover:text-flutter-blue transition-colors group"
                    >
                        <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
                        <span>Back to all articles</span>
                    </Link>
                </div>

                <header className="mb-12">
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

                        <div className="flex items-center gap-2">
                            <LikeButton
                                articleId={post.id}
                                initialLikeCount={initialLikeCount}
                                variant="compact"
                            />
                            <ShareButton />
                        </div>
                    </div>
                </header>

                <article className="prose prose-invert max-w-none mb-16">
                    {post.sections.map((section, idx) => renderSection(section, idx))}
                </article>

                <div className="flex flex-col items-center gap-4 border-t border-b border-zinc-800/80 py-10 mb-12 text-center">
                    <p className="text-sm text-zinc-400">Did you find this article helpful?</p>
                    <LikeButton
                        articleId={post.id}
                        initialLikeCount={initialLikeCount}
                        variant="cta"
                    />
                </div>

                <div className="flex flex-wrap items-center gap-2 mb-16">
                    <span className="text-xs font-mono text-zinc-500 mr-2 flex items-center gap-1">
                        <Tag size={12} /> Tags:
                    </span>
                    {post.tags.map((tag) => (
                        <span
                            key={tag}
                            className="px-3 py-1 rounded-xl bg-zinc-900 border border-zinc-800 text-xs text-zinc-300"
                        >
                            #{tag}
                        </span>
                    ))}
                </div>

                <div className="rounded-3xl border border-zinc-800 bg-zinc-900/40 p-6 sm:p-8 mb-20 flex flex-col sm:flex-row items-center gap-6">
                    <div className="h-16 w-16 rounded-2xl bg-flutter-blue/20 border border-flutter-blue/40 flex items-center justify-center font-bold text-flutter-blue text-xl shrink-0">
                        SK
                    </div>
                    <div>
                        <h3 className="text-lg font-bold font-heading text-white">
                            Written by {post.author.name}
                        </h3>
                        <p className="text-xs font-mono text-flutter-blue mb-2">{post.author.role}</p>
                        <p className="text-sm text-zinc-400 leading-relaxed">
                            Mobile engineer crafting offline-first Flutter architecture, Android Kotlin
                            plugins, and robust enterprise applications.
                        </p>
                    </div>
                </div>

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
                                    <span className="text-xs font-mono text-flutter-blue mb-2 block">
                                        {rel.category}
                                    </span>
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
