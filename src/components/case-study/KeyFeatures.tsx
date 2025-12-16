"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { Camera, Map, WifiOff, Users } from "lucide-react";

const features = [
    {
        id: "attendance",
        label: "Attendance",
        icon: Camera,
        title: "Photo-verified Check-ins",
        description: "Eliminated proxy attendance by requiring geofenced selfies. The system uses on-device ML to verify liveness.",
        metric: "100% accurate time tracking",
    },
    {
        id: "location",
        label: "Location",
        icon: Map,
        title: "Precision Tracking",
        description: "Custom Kalman filter implementation reduces GPS drift by 30%, ensuring mileage reimbursements are fair and accurate.",
        metric: "30% reduction in GPS drift",
    },
    {
        id: "offline",
        label: "Offline-First",
        icon: WifiOff,
        title: "Works without Internet",
        description: "Built with Hive and a heavy sync queue architecture. Data is stored locally and synced when connection restores.",
        metric: "Seamless low-network operation",
    },
    {
        id: "sales",
        label: "Sales",
        icon: Users,
        title: "Multi-channel Sales",
        description: "Unified interface for van sales, booking, and delivery. Integrated directly with ERPNext for real-time inventory updates.",
        metric: "3 sales channels unified",
    },
];

export const KeyFeatures = () => {
    const [activeTab, setActiveTab] = useState(features[0].id);

    return (
        <section className="bg-black py-24 text-white">
            <div className="mx-auto max-w-7xl px-6 sm:px-12">
                <h2 className="mb-12 text-center text-3xl font-bold font-heading sm:text-4xl">Key Features</h2>

                <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start">
                    {/* Tabs Navigation */}
                    <div className="flex w-full flex-row overflow-x-auto rounded-xl bg-zinc-900 p-1 lg:w-1/3 lg:flex-col lg:overflow-visible">
                        {features.map((feature) => (
                            <button
                                key={feature.id}
                                onClick={() => setActiveTab(feature.id)}
                                className={`relative flex items-center gap-4 rounded-lg px-6 py-4 text-left transition-colors ${activeTab === feature.id ? "text-white" : "text-zinc-500 hover:text-zinc-300"
                                    }`}
                            >
                                {activeTab === feature.id && (
                                    <motion.div
                                        layoutId="activeTab"
                                        className="absolute inset-0 rounded-lg bg-zinc-800"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                <span className="relative z-10 flex h-8 w-8 items-center justify-center rounded-full bg-zinc-950 text-current">
                                    <feature.icon size={16} />
                                </span>
                                <span className="relative z-10 font-medium">{feature.label}</span>
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    <div className="min-h-[400px] w-full flex-1 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 lg:p-12">
                        <AnimatePresence mode="wait">
                            {features.map((feature) => (
                                feature.id === activeTab ? (
                                    <motion.div
                                        key={feature.id}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.3 }}
                                        className="flex flex-col gap-6"
                                    >
                                        <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-flutter-blue text-white shadow-lg shadow-blue-500/20">
                                            <feature.icon size={32} />
                                        </div>

                                        <div>
                                            <h3 className="text-3xl font-bold text-white mb-4">{feature.title}</h3>
                                            <p className="text-lg text-zinc-400 leading-relaxed mb-6">{feature.description}</p>

                                            <div className="inline-flex items-center rounded-full bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
                                                Impact: {feature.metric}
                                            </div>
                                        </div>

                                        {/* Placeholder for feature visual (e.g. video/gif) */}
                                        <div className="mt-4 aspect-video w-full rounded-xl bg-zinc-950 border border-zinc-800 flex items-center justify-center text-zinc-600">
                                            [Feature Demo/Screenshot Placeholder]
                                        </div>
                                    </motion.div>
                                ) : null
                            ))}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
