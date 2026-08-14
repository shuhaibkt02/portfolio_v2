import { getAllBlogs, BlogPostWithEngagement } from "@/lib/blogData";
import { db } from "@/lib/firebase/admin";

export async function getPostsWithEngagement(): Promise<BlogPostWithEngagement[]> {
    const staticPosts = getAllBlogs();

    try {
        const snapshot = await db.collection("articles").get();
        const countMap: Record<string, number> = {};
        snapshot.forEach((doc) => {
            countMap[doc.id] = doc.data()?.likeCount ?? 0;
        });

        return staticPosts.map((post) => ({
            ...post,
            likeCount: countMap[post.id] ?? post.likeCount,
        }));
    } catch {
        return staticPosts as BlogPostWithEngagement[];
    }
}

export async function getArticleLikeCount(articleId: string, fallback: number): Promise<number> {
    try {
        const doc = await db.collection("articles").doc(articleId).get();
        return doc.exists ? (doc.data()?.likeCount ?? fallback) : fallback;
    } catch {
        return fallback;
    }
}
