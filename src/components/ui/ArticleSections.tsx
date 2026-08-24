import { BlogSection } from "@/lib/blogData";
import { AlertCircle, Info, Lightbulb, ShieldAlert } from "lucide-react";
import { CodeBlock } from "./ArticleActions";

export function renderSection(section: BlogSection, idx: number) {
    switch (section.type) {
        case "paragraph":
            return (
                <p key={idx} className="text-zinc-300 text-base sm:text-lg leading-relaxed mb-6">
                    {section.content}
                </p>
            );
        case "heading":
            return (
                <h2
                    key={idx}
                    className="text-2xl sm:text-3xl font-bold font-heading text-white mt-12 mb-6 tracking-tight border-b border-zinc-800 pb-3"
                >
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
                        <li
                            key={itemIdx}
                            className="flex items-start gap-3 text-zinc-300 text-base leading-relaxed"
                        >
                            <span className="h-2 w-2 rounded-full bg-flutter-blue mt-2.5 shrink-0" />
                            <span>{item}</span>
                        </li>
                    ))}
                </ul>
            );
        case "code":
            return <CodeBlock key={idx} section={section} idx={idx} />;
        case "callout": {
            const variantStyles = {
                info: "bg-flutter-blue/10 border-flutter-blue/30 text-flutter-blue",
                warning: "bg-amber-500/10 border-amber-500/30 text-amber-400",
                tip: "bg-emerald-500/10 border-emerald-500/30 text-emerald-400",
                danger: "bg-red-500/10 border-red-500/30 text-red-400",
            };

            const VariantIcon = {
                info: Info,
                warning: AlertCircle,
                tip: Lightbulb,
                danger: ShieldAlert,
            }[section.variant || "info"];

            return (
                <div
                    key={idx}
                    className={`my-8 p-5 sm:p-6 rounded-2xl border backdrop-blur-sm flex items-start gap-4 ${variantStyles[section.variant || "info"]}`}
                >
                    <VariantIcon size={22} className="shrink-0 mt-0.5" />
                    <p className="text-sm sm:text-base leading-relaxed text-zinc-200">
                        {section.content}
                    </p>
                </div>
            );
        }
        case "quote":
            return (
                <blockquote
                    key={idx}
                    className="my-8 border-l-4 border-flutter-blue pl-6 italic text-zinc-300 text-lg sm:text-xl font-serif leading-relaxed"
                >
                    &ldquo;{section.content}&rdquo;
                </blockquote>
            );
        default:
            return null;
    }
}
