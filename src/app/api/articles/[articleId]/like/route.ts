import { NextRequest, NextResponse } from "next/server";
import { getAuth } from "firebase-admin/auth";
import { FieldValue } from "firebase-admin/firestore";
import { db } from "@/lib/firebase/admin";

async function verifyToken(request: NextRequest): Promise<{ uid: string } | null> {
    const authHeader = request.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) return null;

    const token = authHeader.slice(7);
    try {
        const decoded = await getAuth().verifyIdToken(token);
        return { uid: decoded.uid };
    } catch {
        return null;
    }
}

interface RouteContext {
    params: Promise<{ articleId: string }>;
}

export async function GET(request: NextRequest, { params }: RouteContext) {
    const { articleId } = await params;

    const identity = await verifyToken(request);
    if (!identity) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { uid } = identity;

    try {
        const [articleDoc, likeDoc] = await Promise.all([
            db.collection("articles").doc(articleId).get(),
            db.collection("articleLikes").doc(articleId).collection("users").doc(uid).get(),
        ]);

        const likeCount: number = articleDoc.exists
            ? (articleDoc.data()?.likeCount ?? 0)
            : 0;

        return NextResponse.json({
            liked: likeDoc.exists,
            likeCount,
        });
    } catch (error) {
        console.error("[GET like] Firestore error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(request: NextRequest, { params }: RouteContext) {
    const { articleId } = await params;

    const identity = await verifyToken(request);
    if (!identity) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { uid } = identity;
    const articleRef = db.collection("articles").doc(articleId);
    const likeRef = db
        .collection("articleLikes")
        .doc(articleId)
        .collection("users")
        .doc(uid);

    try {
        const newCount = await db.runTransaction(async (tx) => {
            const [articleSnap, likeSnap] = await Promise.all([
                tx.get(articleRef),
                tx.get(likeRef),
            ]);

            if (likeSnap.exists) {
                return articleSnap.exists ? (articleSnap.data()?.likeCount ?? 0) : 0;
            }

            const currentCount: number = articleSnap.exists
                ? (articleSnap.data()?.likeCount ?? 0)
                : 0;

            tx.set(likeRef, { createdAt: new Date() });

            tx.set(
                articleRef,
                { likeCount: FieldValue.increment(1) },
                { merge: true }
            );

            return currentCount + 1;
        });

        return NextResponse.json({ liked: true, likeCount: newCount });
    } catch (error) {
        console.error("[POST like] Transaction error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function DELETE(request: NextRequest, { params }: RouteContext) {
    const { articleId } = await params;

    const identity = await verifyToken(request);
    if (!identity) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const { uid } = identity;
    const articleRef = db.collection("articles").doc(articleId);
    const likeRef = db
        .collection("articleLikes")
        .doc(articleId)
        .collection("users")
        .doc(uid);

    try {
        const newCount = await db.runTransaction(async (tx) => {
            const [articleSnap, likeSnap] = await Promise.all([
                tx.get(articleRef),
                tx.get(likeRef),
            ]);

            if (!likeSnap.exists) {
                return articleSnap.exists ? (articleSnap.data()?.likeCount ?? 0) : 0;
            }

            const currentCount: number = articleSnap.exists
                ? (articleSnap.data()?.likeCount ?? 0)
                : 0;

            tx.delete(likeRef);

            const nextCount = Math.max(0, currentCount - 1);
            tx.set(articleRef, { likeCount: nextCount }, { merge: true });

            return nextCount;
        });

        return NextResponse.json({ liked: false, likeCount: newCount });
    } catch (error) {
        console.error("[DELETE like] Transaction error:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}
