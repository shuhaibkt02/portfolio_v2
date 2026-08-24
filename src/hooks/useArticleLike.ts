"use client";

import { useState, useEffect, useCallback } from "react";
import { ensureAnonymousUser } from "@/lib/firebase/auth";

interface LikeState {
    liked: boolean;
    likeCount: number;
    isInitializing: boolean;
    isPending: boolean;
    error: string | null;
}

interface UseLikeReturn extends LikeState {
    toggleLike: () => Promise<void>;
}

export function useArticleLike(
    articleId: string,
    initialLikeCount: number
): UseLikeReturn {
    const [state, setState] = useState<LikeState>({
        liked: false,
        likeCount: initialLikeCount,
        isInitializing: true,
        isPending: false,
        error: null,
    });

    useEffect(() => {
        let cancelled = false;

        const fetchLikeStatus = async () => {
            try {
                const user = await ensureAnonymousUser();
                const token = await user.getIdToken();

                const res = await fetch(`/api/articles/${articleId}/like`, {
                    headers: { Authorization: `Bearer ${token}` },
                });

                if (!res.ok) throw new Error("Failed to fetch like status");

                const data: { liked: boolean; likeCount: number } = await res.json();

                if (!cancelled) {
                    setState((prev) => ({
                        ...prev,
                        liked: data.liked,
                        likeCount: data.likeCount,
                        isInitializing: false,
                    }));
                }
            } catch (err) {
                if (!cancelled) {
                    console.error("[useArticleLike] init error:", err);
                    setState((prev) => ({
                        ...prev,
                        isInitializing: false,
                        error: "Could not load like status",
                    }));
                }
            }
        };

        fetchLikeStatus();
        return () => { cancelled = true; };
    }, [articleId]);

    const toggleLike = useCallback(async () => {
        if (state.isInitializing || state.isPending) return;

        setState((prev) => ({ ...prev, isPending: true, error: null }));

        try {
            const user = await ensureAnonymousUser();
            const token = await user.getIdToken();

            const method = state.liked ? "DELETE" : "POST";

            const res = await fetch(`/api/articles/${articleId}/like`, {
                method,
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Like request failed");

            const data: { liked: boolean; likeCount: number } = await res.json();

            setState((prev) => ({
                ...prev,
                liked: data.liked,
                likeCount: data.likeCount,
                isPending: false,
            }));
        } catch (err) {
            console.error("[useArticleLike] toggle error:", err);
            setState((prev) => ({
                ...prev,
                isPending: false,
                error: "Could not update like. Please try again.",
            }));
        }
    }, [articleId, state.liked, state.isInitializing, state.isPending]);

    return { ...state, toggleLike };
}
