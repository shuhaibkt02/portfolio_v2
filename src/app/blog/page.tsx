import Link from "next/link";
import { ArrowRight, BookOpen, Calendar, Clock, Cpu } from "lucide-react";
import { getAllBlogs, BlogPostWithEngagement } from "@/lib/blogData";
import { db } from "@/lib/firebase/admin";
import { BlogFilter } from "@/components/ui/BlogFilter";

/**
 * Fetch real likeCounts from Firestore for all articles in a single batch.
 * Merges them into the static blog post data.
 */
async function getPostsWithEngagement(): Promise<BlogPostWithEngagement[]> {
    const staticPosts = getAllBlogs();

    try {
        // Batch-fetch all article docs in one round-trip
        const snapshot = await db.collection("articles").get();
        const countMap: Record<string, number> = {};
        snapshot.forEach((doc) => {
            countMap[doc.id] = doc.data()?.likeCount ?? 0;
        });

        return staticPosts.map((post) => ({
            ...post,
            likeCount: countMap[post.id] ?? post.likeCount,
        }));
    } catch (err) {
        console.error("[BlogListPage] Firestore fetch failed:", err);
        // Non-fatal — fall back to static defaults (all 0s)
        return staticPosts as BlogPostWithEngagement[];
    }
}

export default async function BlogListPage() {
    const allPosts = await getPostsWithEngagement();

    const allTags = Array.from(new Set(allPosts.flatMap((post) => post.tags)));
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
                <div className="text-center max-w-3xl mx-auto mb-14">
                    <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-flutter-blue/10 border border-flutter-blue/20 text-flutter-blue text-xs font-mono mb-4">
                        <BookOpen size={14} />
                        <span>Engineering Insights &amp; Articles</span>
                    </div>
                    <h1 className="text-4xl sm:text-5xl font-bold font-heading text-white tracking-tight">
                        Engineering Blog
                    </h1>
                    <p className="mt-4 text-zinc-400 text-base leading-relaxed">
                        Practical articles on Flutter security, native Android integrations,
                        offline-first architectures, and REST API engineering.
                    </p>
                </div>

                {/* Featured Hero Article — static, rendered server-side */}
                {featuredPost && (
                    <div className="mb-16">
                        <Link
                            href={`/blog/${featuredPost.slug}`}
                            id="featured-article-link"
                            className="group block"
                        >
                            <div className="rounded-3xl border border-zinc-800/80 bg-zinc-900/40 hover:border-flutter-blue/40 p-6 sm:p-8 transition-all duration-300 hover:bg-zinc-900/70 relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                                <div className="lg:col-span-7 space-y-4">
                                    <div className="flex items-center gap-3">
                                        <span className="px-3 py-1 rounded-full bg-flutter-blue/10 border border-flutter-blue/20 text-flutter-blue text-xs font-semibold">
                                            Featured Article
                                        </span>
                                        <span className="text-xs font-mono text-zinc-500">
                                            {featuredPost.category}
                                        </span>
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

                                {/* Gradient Banner */}
                                <div
                                    className={`lg:col-span-5 relative aspect-video rounded-2xl overflow-hidden bg-gradient-to-br ${featuredPost.coverGradient} border border-white/10 p-6 flex flex-col justify-between group-hover:scale-[1.02] transition-transform duration-500`}
                                >
                                    <div className="flex items-center justify-between text-white/60">
                                        <Cpu size={28} className="text-flutter-blue" />
                                        <span className="text-[10px] font-mono tracking-widest uppercase bg-black/40 px-2.5 py-1 rounded-md border border-white/10">
                                            {featuredPost.bannerSnippet?.label || "FEATURED POST"}
                                        </span>
                                    </div>
                                    {featuredPost.bannerSnippet && (
                                        <div className="space-y-1 font-mono text-xs text-zinc-300 bg-black/50 backdrop-blur-md p-3.5 rounded-xl border border-white/10">
                                            {featuredPost.bannerSnippet.codeLines.map((line, lIdx) => (
                                                <div key={lIdx} className={line.color || "text-zinc-300"}>
                                                    {line.text}
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            </div>
                        </Link>
                    </div>
                )}

                {/* Client island: search, tag filter, article grid (with like counts) */}
                <BlogFilter posts={allPosts} allTags={allTags} />
            </div>
        </main>
    );
}
