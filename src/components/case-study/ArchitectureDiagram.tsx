"use client";

import { motion } from "framer-motion";
import { ArrowRight, ArrowDown } from "lucide-react";
import { useState } from "react";

type NodeDetail = {
    title: string;
    description: string;
    tech: string;
};

const wavesNodes: NodeDetail[] = [
    { title: "Flutter UI", description: "Reactive presentation layer with optimistic state updates.", tech: "Flutter / Dart" },
    { title: "BLoC", description: "Business logic component handling local state validation.", tech: "flutter_bloc" },
    { title: "Repository", description: "Bridges local data and network services seamlessly.", tech: "Clean Architecture" },
    { title: "Local Hive", description: "Fast, zero-latency local key-value database.", tech: "Hive DB" },
    { title: "Background Sync", description: "3-stage transactional queue with exponential retry backoff.", tech: "WorkManager / WorkManager (Kotlin)" },
    { title: "ERPNext API", description: "Central enterprise system receiving verified sync records.", tech: "REST API" }
];

const gpsNodes: NodeDetail[] = [
    { title: "Flutter UI", description: "Renders live location updates and trip progress map.", tech: "Flutter UI" },
    { title: "MethodChannel", description: "Sends start/stop commands and config parameters to Native Android.", tech: "Platform Channel" },
    { title: "Foreground Service", description: "Keeps tracking service active, surviving aggressive Android OS resource terminations.", tech: "Kotlin Foreground Service" },
    { title: "FusedLocationProvider", description: "Google Play Services location engine optimized for battery usage.", tech: "Google API" },
    { title: "Kalman Filter", description: "Removes coordinate drift and GPS noise algorithms on-device.", tech: "Kotlin Algorithm" },
    { title: "Room Database", description: "Stores persistent, raw coordinates as a tamper-proof local audit trail.", tech: "Room DB" },
    { title: "EventChannel", description: "Streams real-time coordinate updates back to Dart/Flutter asynchronously.", tech: "Stream Channel" }
];

type ArchitectureDiagramProps = {
    diagramId?: "waves-2" | "location-plugin";
};

export const ArchitectureDiagram = ({ diagramId }: ArchitectureDiagramProps) => {
    const [hoveredNode, setHoveredNode] = useState<number | null>(null);

    if (!diagramId) return null;

    const isWaves = diagramId === "waves-2";
    const nodes = isWaves ? wavesNodes : gpsNodes;
    const title = isWaves ? "Offline-First Sync Architecture" : "Native Kotlin Location Tracking System Flow";

    return (
        <section className="bg-zinc-950 py-24 text-white border-t border-zinc-900">
            <div className="mx-auto max-w-7xl px-6 sm:px-12">
                <h2 className="mb-4 text-center text-3xl font-bold font-heading sm:text-4xl">{title}</h2>
                <p className="mb-16 text-center text-zinc-400 max-w-2xl mx-auto">
                    Hover over any system node in the diagram below to inspect its technical details and implementation responsibility.
                </p>

                <div className="hidden lg:flex lg:flex-wrap lg:items-center lg:justify-center lg:gap-4 xl:gap-6 bg-zinc-900/40 p-12 rounded-3xl border border-zinc-800/80 backdrop-blur-sm">
                    {nodes.map((node, i) => (
                        <div key={i} className="flex items-center gap-4 xl:gap-6">
                            <motion.div
                                className={`relative cursor-pointer rounded-2xl border p-5 w-48 text-center transition-all duration-300 ${
                                    hoveredNode === i
                                        ? "border-flutter-blue bg-zinc-900 shadow-[0_0_25px_rgba(4,104,215,0.35)] scale-105"
                                        : "border-zinc-800 bg-zinc-950/70 hover:border-zinc-700"
                                }`}
                                onMouseEnter={() => setHoveredNode(i)}
                                onMouseLeave={() => setHoveredNode(null)}
                                whileHover={{ y: -4 }}
                            >
                                <span className="block text-xs font-semibold text-flutter-blue uppercase tracking-widest mb-1">
                                    {node.tech}
                                </span>
                                <h3 className="text-base font-bold text-white">{node.title}</h3>
                            </motion.div>

                            {i < nodes.length - 1 && (
                                <motion.div
                                    animate={hoveredNode === i ? { x: [0, 4, 0] } : {}}
                                    transition={{ repeat: Infinity, duration: 1 }}
                                    className="text-zinc-600 flex items-center justify-center"
                                >
                                    <ArrowRight size={20} className="text-flutter-blue/80" />
                                </motion.div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="flex flex-col items-center gap-4 lg:hidden bg-zinc-900/40 p-6 sm:p-8 rounded-3xl border border-zinc-800/80">
                    {nodes.map((node, i) => (
                        <div key={i} className="w-full flex flex-col items-center gap-4">
                            <motion.div
                                className={`w-full max-w-md rounded-2xl border p-5 text-center transition-all duration-300 ${
                                    hoveredNode === i
                                        ? "border-flutter-blue bg-zinc-900 shadow-[0_0_20px_rgba(4,104,215,0.25)]"
                                        : "border-zinc-800 bg-zinc-950/70"
                                }`}
                                onClick={() => setHoveredNode(hoveredNode === i ? null : i)}
                                whileTap={{ scale: 0.98 }}
                            >
                                <span className="block text-xs font-semibold text-flutter-blue uppercase tracking-widest mb-1">
                                    {node.tech}
                                </span>
                                <h3 className="text-lg font-bold text-white mb-2">{node.title}</h3>
                                <p className="text-sm text-zinc-400">{node.description}</p>
                            </motion.div>

                            {i < nodes.length - 1 && (
                                <div className="text-zinc-600 flex items-center justify-center py-1">
                                    <ArrowDown size={20} className="text-flutter-blue/80 animate-bounce" />
                                </div>
                            )}
                        </div>
                    ))}
                </div>

                <div className="hidden lg:block mt-8 min-h-[100px] max-w-3xl mx-auto text-center">
                    {hoveredNode !== null ? (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-zinc-900 border border-zinc-800 p-6 rounded-2xl shadow-xl"
                        >
                            <h4 className="text-lg font-bold text-white flex items-center justify-center gap-2">
                                <span className="text-flutter-blue">{nodes[hoveredNode].title}</span>
                                <span className="text-xs text-zinc-500 font-mono">({nodes[hoveredNode].tech})</span>
                            </h4>
                            <p className="mt-2 text-zinc-300 text-sm leading-relaxed">{nodes[hoveredNode].description}</p>
                        </motion.div>
                    ) : (
                        <p className="text-zinc-500 text-sm italic">Hover over any system component block to inspect the engineering implementation details.</p>
                    )}
                </div>
            </div>
        </section>
    );
};
