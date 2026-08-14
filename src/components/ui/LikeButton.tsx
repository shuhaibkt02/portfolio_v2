"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Loader2 } from "lucide-react";
import { useArticleLike } from "@/hooks/useArticleLike";

interface LikeButtonProps {
    articleId: string;
    initialLikeCount: number;
    /** When true, renders a larger CTA variant (used at bottom of article) */
    variant?: "compact" | "cta";
}

export function LikeButton({
    articleId,
    initialLikeCount,
    variant = "compact",
}: LikeButtonProps) {
    const { liked, likeCount, isInitializing, isPending, toggleLike } =
        useArticleLike(articleId, initialLikeCount);

    const isDisabled = isInitializing || isPending;
    const isCta = variant === "cta";

    return (
        <button
            id={`like-button-${articleId}${isCta ? "-cta" : ""}`}
            onClick={toggleLike}
            disabled={isDisabled}
            aria-label={liked ? "Unlike this article" : "Like this article"}
            aria-pressed={liked}
            className={[
                "group inline-flex items-center gap-2 rounded-2xl border font-medium transition-all duration-200 select-none",
                "focus:outline-none focus-visible:ring-2 focus-visible:ring-flutter-blue/50",
                isCta
                    ? "px-6 py-3 text-sm"
                    : "px-4 py-2 text-xs",
                liked
                    ? "bg-rose-500/10 border-rose-500/40 text-rose-400 hover:bg-rose-500/20 hover:border-rose-500/60"
                    : "bg-zinc-900 border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:text-zinc-200",
                isDisabled ? "opacity-60 cursor-not-allowed pointer-events-none" : "cursor-pointer",
            ].join(" ")}
        >
            {/* Heart icon */}
            <AnimatePresence mode="wait" initial={false}>
                {isInitializing || isPending ? (
                    <motion.span
                        key="spinner"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.8 }}
                        transition={{ duration: 0.15 }}
                    >
                        <Loader2
                            size={isCta ? 18 : 14}
                            className="animate-spin text-zinc-400"
                        />
                    </motion.span>
                ) : (
                    <motion.span
                        key={liked ? "heart-filled" : "heart-outline"}
                        initial={{ scale: 0.6, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.6, opacity: 0 }}
                        transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    >
                        <Heart
                            size={isCta ? 18 : 14}
                            className={
                                liked
                                    ? "fill-rose-400 text-rose-400"
                                    : "text-zinc-400 group-hover:text-zinc-200 transition-colors"
                            }
                        />
                    </motion.span>
                )}
            </AnimatePresence>

            {/* Label */}
            <span className={liked ? "text-rose-400" : ""}>
                {liked ? "Liked" : "Like"}
            </span>

            {/* Count — animates when it changes */}
            <AnimatePresence mode="wait" initial={false}>
                <motion.span
                    key={likeCount}
                    initial={{ opacity: 0, y: -6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 6 }}
                    transition={{ duration: 0.18 }}
                    className={[
                        "font-mono tabular-nums",
                        isCta ? "text-sm" : "text-xs",
                        liked ? "text-rose-400" : "text-zinc-500",
                    ].join(" ")}
                >
                    {likeCount}
                </motion.span>
            </AnimatePresence>
        </button>
    );
}
