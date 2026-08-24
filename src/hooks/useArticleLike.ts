"use client";

import { useEffect, useSyncExternalStore, useCallback } from "react";
import { ensureAnonymousUser } from "@/lib/firebase/auth";

export interface LikeState {
    liked: boolean;
    likeCount: number;
    isInitializing: boolean;
    isPending: boolean;
    error: string | null;
}

export interface UseLikeReturn extends LikeState {
    toggleLike: () => Promise<void>;
}

interface ArticleLikeStore {
    state: LikeState;
    serverSnapshot: LikeState;
    listeners: Set<() => void>;
    fetchPromise: Promise<void> | null;
}

const stores = new Map<string, ArticleLikeStore>();
const cleanupTimers = new Map<string, ReturnType<typeof setTimeout>>();

function getOrCreateStore(articleId: string, initialLikeCount: number): ArticleLikeStore {
    const existingTimer = cleanupTimers.get(articleId);
    if (existingTimer) {
        clearTimeout(existingTimer);
        cleanupTimers.delete(articleId);
    }

    let store = stores.get(articleId);
    if (!store) {
        const initialState: LikeState = {
            liked: false,
            likeCount: initialLikeCount,
            isInitializing: true,
            isPending: false,
            error: null,
        };
        store = {
            state: initialState,
            serverSnapshot: initialState,
            listeners: new Set(),
            fetchPromise: null,
        };
        stores.set(articleId, store);
    } else if (store.state.isInitializing) {
        store.state.likeCount = initialLikeCount;
        store.serverSnapshot.likeCount = initialLikeCount;
    }
    return store;
}

function notify(store: ArticleLikeStore) {
    store.listeners.forEach((listener) => listener());
}

async function fetchLikeStatus(articleId: string, store: ArticleLikeStore) {
    if (store.fetchPromise) return;

    store.fetchPromise = (async () => {
        try {
            const user = await ensureAnonymousUser();
            const token = await user.getIdToken();

            const res = await fetch(`/api/articles/${articleId}/like`, {
                headers: { Authorization: `Bearer ${token}` },
            });

            if (!res.ok) throw new Error("Failed to fetch like status");

            const data: { liked: boolean; likeCount: number } = await res.json();

            store.state = {
                ...store.state,
                liked: data.liked,
                likeCount: data.likeCount,
                isInitializing: false,
                error: null,
            };
        } catch (err) {
            console.error("[useArticleLike] init error:", err);
            store.state = {
                ...store.state,
                isInitializing: false,
                error: "Could not load like status",
            };
        } finally {
            notify(store);
        }
    })();
}

async function toggleArticleLike(articleId: string) {
    const store = stores.get(articleId);
    if (!store || store.state.isInitializing || store.state.isPending) return;

    const currentLiked = store.state.liked;
    store.state = {
        ...store.state,
        isPending: true,
        error: null,
    };
    notify(store);

    try {
        const user = await ensureAnonymousUser();
        const token = await user.getIdToken();

        const method = currentLiked ? "DELETE" : "POST";

        const res = await fetch(`/api/articles/${articleId}/like`, {
            method,
            headers: { Authorization: `Bearer ${token}` },
        });

        if (!res.ok) throw new Error("Like request failed");

        const data: { liked: boolean; likeCount: number } = await res.json();

        store.state = {
            ...store.state,
            liked: data.liked,
            likeCount: data.likeCount,
            isPending: false,
            error: null,
        };
    } catch (err) {
        console.error("[useArticleLike] toggle error:", err);
        store.state = {
            ...store.state,
            isPending: false,
            error: "Could not update like. Please try again.",
        };
    } finally {
        notify(store);
    }
}

export function useArticleLike(
    articleId: string,
    initialLikeCount: number
): UseLikeReturn {
    const store = getOrCreateStore(articleId, initialLikeCount);

    const subscribe = useCallback(
        (onStoreChange: () => void) => {
            const existingTimer = cleanupTimers.get(articleId);
            if (existingTimer) {
                clearTimeout(existingTimer);
                cleanupTimers.delete(articleId);
            }
            store.listeners.add(onStoreChange);
            return () => {
                store.listeners.delete(onStoreChange);
                if (store.listeners.size === 0) {
                    const timer = setTimeout(() => {
                        const current = stores.get(articleId);
                        if (current && current.listeners.size === 0) {
                            stores.delete(articleId);
                        }
                        cleanupTimers.delete(articleId);
                    }, 500);
                    cleanupTimers.set(articleId, timer);
                }
            };
        },
        [articleId, store]
    );

    const getSnapshot = useCallback(() => store.state, [store]);

    const getServerSnapshot = useCallback(
        () => store.serverSnapshot,
        [store]
    );

    const state = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

    useEffect(() => {
        if (store.state.isInitializing && !store.fetchPromise) {
            fetchLikeStatus(articleId, store);
        }
    }, [articleId, store]);

    const toggleLike = useCallback(async () => {
        await toggleArticleLike(articleId);
    }, [articleId]);

    return {
        ...state,
        toggleLike,
    };
}
