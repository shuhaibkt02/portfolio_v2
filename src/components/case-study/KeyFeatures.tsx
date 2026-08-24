"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { Camera, Map, WifiOff, Users, ShoppingCart, BarChart, Globe, Shield, Database, Code } from "lucide-react";

const iconMap: Record<string, any> = {
    camera: Camera,
    map: Map,
    "wifi-off": WifiOff,
    users: Users,
    "shopping-cart": ShoppingCart,
    "chart-bar": BarChart,
    globe: Globe,
    shield: Shield,
    database: Database,
    code: Code,
};

type KeyFeaturesProps = {
    features: {
        id: string;
        label: string;
        iconName: string;
        title: string;
        description: string;
        metric: string;
    }[];
};

export const KeyFeatures = ({ features }: KeyFeaturesProps) => {
    const [activeTab, setActiveTab] = useState("");

    useEffect(() => {
        if (features && features.length > 0) {
            setActiveTab(features[0].id);
        }
    }, [features]);

    if (!features || features.length === 0) return null;

    return (
        <section className="bg-black py-24 text-white">
            <div className="mx-auto max-w-7xl px-6 sm:px-12">
                <h2 className="mb-12 text-center text-3xl font-bold font-heading sm:text-4xl">Key Features</h2>

                <div className="flex flex-col items-center gap-12 lg:flex-row lg:items-start">
                    <div className="flex w-full flex-row overflow-x-auto rounded-xl bg-zinc-900 p-1 lg:w-1/3 lg:flex-col lg:overflow-visible">
                        {features.map((feature) => {
                            const Icon = iconMap[feature.iconName] || Shield;
                            return (
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
                                        <Icon size={16} />
                                    </span>
                                    <span className="relative z-10 font-medium">{feature.label}</span>
                                </button>
                            );
                        })}
                    </div>

                    <div className="min-h-[400px] w-full flex-1 rounded-3xl border border-zinc-800 bg-zinc-900/50 p-8 lg:p-12">
                        <AnimatePresence mode="wait">
                            {features.map((feature) => {
                                if (feature.id === activeTab) {
                                    const Icon = iconMap[feature.iconName] || Shield;
                                    return (
                                        <motion.div
                                            key={feature.id}
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            exit={{ opacity: 0, x: -20 }}
                                            transition={{ duration: 0.3 }}
                                            className="flex flex-col gap-6"
                                        >
                                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-flutter-blue text-white shadow-lg shadow-blue-500/20">
                                                <Icon size={32} />
                                            </div>

                                            <div>
                                                <h3 className="text-3xl font-bold text-white mb-4">{feature.title}</h3>
                                                <p className="text-lg text-zinc-400 leading-relaxed mb-6">{feature.description}</p>

                                                <div className="inline-flex items-center rounded-full bg-green-500/10 px-4 py-2 text-sm font-medium text-green-400">
                                                    Impact: {feature.metric}
                                                </div>
                                            </div>
                                        </motion.div>
                                    );
                                }
                                return null;
                            })}
                        </AnimatePresence>
                    </div>
                </div>
            </div>
        </section>
    );
};
