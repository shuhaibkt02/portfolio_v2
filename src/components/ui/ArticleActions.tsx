"use client";

import { useState } from "react";
import { Check, Copy, Share2 } from "lucide-react";
import { BlogSection } from "@/lib/blogData";

interface CodeBlockProps {
    section: BlogSection;
    idx: number;
}

export function CodeBlock({ section, idx }: CodeBlockProps) {
    const [copied, setCopied] = useState(false);

    const handleCopy = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(section.content || "");
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <div
            id={`code-block-${idx}`}
            className="my-8 rounded-2xl border border-zinc-800 bg-zinc-950 overflow-hidden font-mono text-sm"
        >
            <div className="flex items-center justify-between px-4 py-2.5 bg-zinc-900 border-b border-zinc-800 text-xs text-zinc-400">
                <span>{section.language || "code"}</span>
                <button
                    id={`copy-code-${idx}`}
                    onClick={handleCopy}
                    className="flex items-center gap-1.5 hover:text-white transition-colors"
                >
                    {copied ? (
                        <Check size={14} className="text-green-400" />
                    ) : (
                        <Copy size={14} />
                    )}
                    <span>{copied ? "Copied" : "Copy"}</span>
                </button>
            </div>
            <pre className="p-4 sm:p-6 overflow-x-auto text-zinc-200 leading-relaxed text-xs sm:text-sm">
                <code>{section.content}</code>
            </pre>
        </div>
    );
}

export function ShareButton() {
    const [copied, setCopied] = useState(false);

    const handleShare = () => {
        if (navigator.clipboard) {
            navigator.clipboard.writeText(window.location.href);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    };

    return (
        <button
            id="share-article-button"
            onClick={handleShare}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-zinc-700 text-xs font-medium text-zinc-300 transition-colors"
        >
            {copied ? (
                <Check size={14} className="text-green-400" />
            ) : (
                <Share2 size={14} />
            )}
            <span>{copied ? "Link Copied!" : "Share"}</span>
        </button>
    );
}
