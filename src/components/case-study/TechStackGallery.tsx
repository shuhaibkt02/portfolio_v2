"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { Wifi, Battery, ShieldAlert, CheckCircle, Database, Printer, MapPin, Search, Calendar, Landmark } from "lucide-react";

type TechStackGalleryProps = {
    techStack: string[];
    galleryImages: string[];
};

const DeviceMockup = ({ imagePath }: { imagePath: string }) => {
    const parts = imagePath.split("/");
    const projectId = parts[2] || "waves";
    const fileName = parts[3] || "screen-1";
    const screenNum = parseInt(fileName.split("-")[1]) || 1;

    const renderScreenContent = () => {
        if (projectId === "cakenook") {
            switch (screenNum) {
                case 1:
                    return (
                        <div className="p-4 flex flex-col h-full bg-zinc-950 font-sans">
                            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                                <span className="text-sm font-bold text-white font-heading">CakeNook Catalog</span>
                                <div className="flex items-center gap-1 text-xs text-zinc-400">
                                    <MapPin size={12} className="text-pink-500" /> Bengaluru
                                </div>
                            </div>
                            <div className="flex-1 space-y-3 overflow-y-auto">
                                <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-2 flex gap-3">
                                    <div className="w-16 h-16 rounded-lg bg-pink-500/20 border border-pink-500/10 flex items-center justify-center text-pink-500 font-bold">Cake</div>
                                    <div className="flex-1">
                                        <h4 className="text-xs font-bold text-white">Chocolate Fantasy</h4>
                                        <p className="text-[10px] text-zinc-400">By Sweet Treats Co.</p>
                                        <span className="text-xs font-semibold text-pink-400 mt-1 block">₹1,200</span>
                                    </div>
                                </div>
                                <div className="rounded-xl bg-zinc-900 border border-zinc-800 p-2 flex gap-3">
                                    <div className="w-16 h-16 rounded-lg bg-pink-500/20 border border-pink-500/10 flex items-center justify-center text-pink-500 font-bold">Gift</div>
                                    <div className="flex-1">
                                        <h4 className="text-xs font-bold text-white">Red Rose Bouquet</h4>
                                        <p className="text-[10px] text-zinc-400">By Flora Artisans</p>
                                        <span className="text-xs font-semibold text-pink-400 mt-1 block">₹699</span>
                                    </div>
                                </div>
                            </div>
                            <div className="mt-2 text-[10px] text-zinc-500 text-center font-mono border-t border-zinc-900 pt-2">
                                Next.js SSR SEO Catalog
                            </div>
                        </div>
                    );
                case 2:
                    return (
                        <div className="p-4 flex flex-col h-full bg-zinc-950 font-sans">
                            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
                                <span className="text-sm font-bold text-white">Vendor Dashboard</span>
                                <span className="text-[9px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded-full font-mono">Live</span>
                            </div>
                            <div className="flex-1 space-y-3">
                                <div className="bg-zinc-900 rounded-xl p-3 border border-zinc-800">
                                    <span className="text-[10px] text-zinc-400 block uppercase font-mono">Sales This Week</span>
                                    <h4 className="text-lg font-bold text-white mt-1">₹42,850</h4>
                                </div>
                                <div className="bg-zinc-900 rounded-xl p-3 border border-zinc-800">
                                    <span className="text-[10px] text-zinc-400 block uppercase font-mono">Pending Orders</span>
                                    <div className="flex items-center justify-between mt-2">
                                        <span className="text-xs text-white">4 Orders</span>
                                        <span className="text-[10px] text-pink-400 font-medium">View Pipeline →</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-[9px] text-zinc-500 text-center font-mono">
                                Real-Time Perishable Inventory API
                            </div>
                        </div>
                    );
                case 3:
                    return (
                        <div className="p-4 flex flex-col h-full bg-zinc-950 font-sans">
                            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
                                <span className="text-sm font-bold text-white">Express Checkout</span>
                                <Calendar size={14} className="text-pink-400" />
                            </div>
                            <div className="flex-1 space-y-3 text-left">
                                <div className="bg-zinc-900 rounded-xl p-3 border border-zinc-800 space-y-2">
                                    <span className="text-[10px] text-zinc-400 block uppercase font-mono">Gifting Add-on</span>
                                    <p className="text-xs text-zinc-300 font-mono italic">\"Happy Birthday, Mom! We love you!\"</p>
                                </div>
                                <div className="bg-zinc-900 rounded-xl p-3 border border-zinc-800 space-y-1">
                                    <span className="text-[10px] text-zinc-400 block uppercase font-mono">Delivery Schedule</span>
                                    <p className="text-xs text-white">Tomorrow, 10:00 AM - 12:00 PM</p>
                                </div>
                            </div>
                            <button className="w-full bg-pink-600 text-white rounded-lg py-2 text-xs font-bold hover:bg-pink-700 transition-colors">
                                Pay ₹1,899
                            </button>
                        </div>
                    );
                default:
                    return (
                        <div className="p-4 flex flex-col h-full bg-zinc-950 font-sans justify-between">
                            <div className="border-b border-zinc-800 pb-3">
                                <span className="text-sm font-bold text-white">Local Baker Discovery</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center p-4">
                                <div className="relative w-24 h-24 rounded-full border border-pink-500/20 bg-pink-500/5 flex items-center justify-center">
                                    <div className="absolute inset-2 rounded-full border border-pink-500/40 animate-ping" />
                                    <MapPin size={24} className="text-pink-500" />
                                </div>
                                <p className="text-xs text-zinc-400 mt-4 text-center">Geofencing active within 5km radius</p>
                            </div>
                            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-center text-[10px] text-white">
                                8 Premium Bakers Near You
                            </div>
                        </div>
                    );
            }
        } else if (projectId === "waves" || projectId === "waves2") {
            const isV2 = projectId === "waves2";
            switch (screenNum) {
                case 1:
                    return (
                        <div className="p-4 flex flex-col h-full bg-zinc-950 font-sans">
                            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-4">
                                <span className="text-sm font-bold text-white">{isV2 ? "WAVES 2 Secondary" : "WAVES ERP Primary"}</span>
                                <span className="text-[10px] text-emerald-400 font-mono flex items-center gap-1">
                                    <CheckCircle size={10} /> {isV2 ? "Enforced" : "Write-Through"}
                                </span>
                            </div>
                            <div className="flex-1 space-y-2 text-left font-mono">
                                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
                                    <span className="text-[9px] text-zinc-500 block uppercase">Selected Route</span>
                                    <span className="text-xs text-white">Central Market Route A</span>
                                </div>
                                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3">
                                    <span className="text-[9px] text-zinc-500 block uppercase">Order Basket</span>
                                    <div className="flex items-center justify-between text-xs text-zinc-300 mt-1">
                                        <span>Product SKU_A</span>
                                        <span>x150 Qty</span>
                                    </div>
                                    <div className="flex items-center justify-between text-xs text-zinc-300">
                                        <span>Product SKU_B</span>
                                        <span>x40 Qty</span>
                                    </div>
                                </div>
                            </div>
                            <div className="text-[10px] text-zinc-500 text-center font-mono">
                                Hive DB Local Cache Storage
                            </div>
                        </div>
                    );
                case 2:
                    return (
                        <div className="p-4 flex flex-col h-full bg-zinc-950 font-mono">
                            <div className="flex items-center justify-between border-b border-zinc-800 pb-3 mb-3">
                                <span className="text-xs font-bold text-white">{isV2 ? "Sync Queue Console" : "Bluetooth Invoice Bridge"}</span>
                                <Database size={12} className="text-flutter-blue" />
                            </div>
                            {isV2 ? (
                                <div className="flex-1 space-y-2 text-[10px] text-left text-zinc-400 overflow-y-auto">
                                    <div className="text-emerald-400 font-semibold">[09:42:15] Queue init. 3 pending</div>
                                    <div>[09:42:16] Attempting Sync with exponential backoff (Retry 1)</div>
                                    <div className="text-emerald-400">[09:42:18] ERPNext POST: 201 Created</div>
                                    <div className="text-emerald-400">[09:42:19] Order #9421 synced successfully</div>
                                    <div>[09:42:20] Sync worker entering idle state</div>
                                </div>
                            ) : (
                                <div className="flex-1 flex flex-col justify-between">
                                    <div className="border border-dashed border-zinc-800 rounded-xl p-3 text-[10px] text-left bg-zinc-900/40 text-zinc-400 space-y-1">
                                        <p className="font-bold text-center text-white pb-1">WAVES ERP INVOICE</p>
                                        <p>Date: 2026-06-28</p>
                                        <p>Total items: 190 Qty</p>
                                        <p className="border-t border-zinc-800 pt-1 font-bold text-white text-right">Total: ₹24,800.00</p>
                                    </div>
                                    <div className="flex items-center justify-center gap-2 text-[10px] text-flutter-blue bg-flutter-blue/10 rounded-lg py-2 border border-flutter-blue/20">
                                        <Printer size={12} /> ESC/POS Printer Connected
                                    </div>
                                </div>
                            )}
                            <div className="text-[9px] text-zinc-600 text-center mt-2">
                                {isV2 ? "3-Stage Exponential Retry Queue" : "Kotlin Native ESC/POS Plugin"}
                            </div>
                        </div>
                    );
                case 3:
                    return (
                        <div className="p-4 flex flex-col h-full bg-zinc-950 font-sans justify-between">
                            <div className="border-b border-zinc-800 pb-3">
                                <span className="text-sm font-bold text-white">{isV2 ? "Automated Expense Audit" : "Stock & Inventory Control"}</span>
                            </div>
                            {isV2 ? (
                                <div className="flex-1 space-y-2 py-4">
                                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex justify-between items-center">
                                        <span className="text-xs text-zinc-400">Daily Tracked Route</span>
                                        <span className="text-xs font-bold text-white font-mono">42.8 km</span>
                                    </div>
                                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-3 flex justify-between items-center">
                                        <span className="text-xs text-zinc-400">Calculated Allowance</span>
                                        <span className="text-xs font-bold text-emerald-400 font-mono">₹428.00</span>
                                    </div>
                                </div>
                            ) : (
                                <div className="flex-1 space-y-2 py-3 overflow-y-auto">
                                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2 flex justify-between items-center text-xs">
                                        <span className="text-white">Product SKU_A</span>
                                        <span className="text-zinc-400 font-mono">In Stock: 420</span>
                                    </div>
                                    <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2 flex justify-between items-center text-xs">
                                        <span className="text-white">Product SKU_B</span>
                                        <span className="text-zinc-400 font-mono">In Stock: 85</span>
                                    </div>
                                </div>
                            )}
                            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-center text-[10px] text-zinc-500 font-mono">
                                {isV2 ? "Auto Travel Cost Processing" : "Real-Time Stock Reconciliation"}
                            </div>
                        </div>
                    );
                default:
                    return (
                        <div className="p-4 flex flex-col h-full bg-zinc-950 font-sans justify-between">
                            <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
                                <span className="text-sm font-bold text-white">Location Telemetry</span>
                                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center p-4">
                                <div className="w-16 h-16 rounded-full border border-flutter-blue/30 bg-flutter-blue/10 flex items-center justify-center text-flutter-blue">
                                    <MapPin size={24} />
                                </div>
                                <p className="text-xs font-bold text-white mt-4">Foreground Service Active</p>
                                <p className="text-[10px] text-zinc-500 font-mono mt-1">Ping interval: 15 minutes</p>
                            </div>
                            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-center text-[9px] text-zinc-400 font-mono">
                                Kalman Filter Drifts Resolved
                            </div>
                        </div>
                    );
            }
        } else if (projectId === "ozone") {
            switch (screenNum) {
                case 1:
                    return (
                        <div className="p-4 flex flex-col h-full bg-zinc-950 font-sans justify-between">
                            <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
                                <span className="text-sm font-bold text-white">Ozone Punch-In</span>
                                <span className="text-[9px] text-emerald-400 font-mono bg-emerald-500/10 px-2 py-0.5 rounded-full">Secure</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center p-4">
                                <div className="w-20 h-20 rounded-full border border-purple-500/20 bg-purple-500/5 flex items-center justify-center">
                                    <CheckCircle size={32} className="text-purple-500" />
                                </div>
                                <h4 className="text-xs font-bold text-white mt-4">Attendance Recorded</h4>
                                <p className="text-[10px] text-zinc-500 mt-1">Start Time: 09:00 AM</p>
                            </div>
                            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-center text-[9px] text-zinc-400 font-mono">
                                Foreground Service Started
                            </div>
                        </div>
                    );
                case 2:
                    return (
                        <div className="p-4 flex flex-col h-full bg-zinc-950 font-mono text-left">
                            <div className="border-b border-zinc-800 pb-3 mb-3 flex items-center justify-between">
                                <span className="text-xs font-bold text-white">Kalman Filter Stream</span>
                                <span className="text-[9px] text-purple-400">On-Device</span>
                            </div>
                            <div className="flex-1 space-y-2 text-[10px] text-zinc-400 overflow-y-auto">
                                <div>[09:00:15] GPS Lat: 12.9715, Lng: 77.5942</div>
                                <div className="text-purple-400">[09:00:15] Kalman raw resolution input...</div>
                                <div className="text-emerald-400">[09:00:15] Coords filtered ➔ 12.9716, 77.5946</div>
                                <div className="text-emerald-400">[09:00:15] Room DB persistent write success</div>
                                <div>[09:15:20] GPS Lat: 12.9721, Lng: 77.5954</div>
                            </div>
                            <div className="text-[9px] text-zinc-600 text-center mt-2">
                                Kotlin Location Engine
                            </div>
                        </div>
                    );
                case 3:
                    return (
                        <div className="p-4 flex flex-col h-full bg-zinc-950 font-sans justify-between">
                            <div className="border-b border-zinc-800 pb-3 flex items-center justify-between">
                                <span className="text-sm font-bold text-white">Anti-Tamper Logs</span>
                                <ShieldAlert size={14} className="text-purple-500" />
                            </div>
                            <div className="flex-1 space-y-2 py-4 text-left font-mono">
                                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2 flex justify-between text-[10px]">
                                    <span className="text-zinc-400">Mock Location Check</span>
                                    <span className="text-emerald-400 font-bold">PASS</span>
                                </div>
                                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2 flex justify-between text-[10px]">
                                    <span className="text-zinc-400">Developer Options</span>
                                    <span className="text-emerald-400 font-bold">OFF</span>
                                </div>
                                <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2 flex justify-between text-[10px]">
                                    <span className="text-zinc-400">OS Background State</span>
                                    <span className="text-emerald-400 font-bold">STABLE</span>
                                </div>
                            </div>
                            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-center text-[9px] text-zinc-500">
                                Anti-Spoofing Audit Active
                            </div>
                        </div>
                    );
                default:
                    return (
                        <div className="p-4 flex flex-col h-full bg-zinc-950 font-sans justify-between">
                            <div className="border-b border-zinc-800 pb-3">
                                <span className="text-sm font-bold text-white">Manager Perspective</span>
                            </div>
                            <div className="flex-1 flex flex-col items-center justify-center p-4">
                                <div className="w-14 h-14 rounded-full border border-purple-500/20 bg-purple-500/5 flex items-center justify-center text-purple-500">
                                    <Landmark size={20} />
                                </div>
                                <h4 className="text-xs font-bold text-white mt-4">8 Active Employees</h4>
                                <p className="text-[9px] text-zinc-500 mt-1">Audit status: 0 anomalies</p>
                            </div>
                            <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-2 text-center text-[9px] text-zinc-400 font-mono">
                                Precise Salary Audit Verified
                            </div>
                        </div>
                    );
            }
        }

        return (
            <div className="p-4 flex items-center justify-center h-full bg-zinc-950 text-zinc-600 text-xs">
                Mockup Screen Content Not Available
            </div>
        );
    };

    return (
        <div className="relative w-[280px] h-[520px] rounded-[40px] border-[10px] border-zinc-800 bg-zinc-950 shadow-2xl flex flex-col overflow-hidden select-none">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 h-5 w-32 bg-zinc-800 rounded-b-2xl z-30 flex items-center justify-center gap-1.5">
                <div className="h-1 w-8 bg-zinc-700 rounded-full" />
                <div className="h-1.5 w-1.5 bg-zinc-900 rounded-full" />
            </div>

            <div className="h-6 bg-zinc-950 border-b border-zinc-900/20 flex items-center justify-between px-6 pt-1 text-[8px] text-zinc-400 font-mono shrink-0 z-20">
                <span>14:02</span>
                <div className="flex items-center gap-1">
                    <Wifi size={8} />
                    <Battery size={8} />
                </div>
            </div>

            <div className="flex-1 overflow-hidden relative z-10">
                {renderScreenContent()}
            </div>

            <div className="h-4 bg-zinc-950 flex items-center justify-center shrink-0 z-20">
                <div className="w-20 h-1 bg-zinc-800 rounded-full" />
            </div>
        </div>
    );
};

export const TechStackGallery = ({ techStack, galleryImages }: TechStackGalleryProps) => {
    const [imageErrors, setImageErrors] = useState<Record<string, boolean>>({});

    const handleImageError = (image: string) => {
        setImageErrors((prev) => ({ ...prev, [image]: true }));
    };

    return (
        <section className="bg-zinc-950 py-24 text-white border-t border-zinc-900">
            <div className="mx-auto max-w-7xl px-6 sm:px-12">

                <div className="mb-24 text-center">
                    <h2 className="mb-8 text-2xl font-bold font-heading">Technologies Used</h2>
                    <div className="flex flex-wrap justify-center gap-4">
                        {techStack.map((tech, i) => (
                            <motion.div
                                key={tech}
                                initial={{ opacity: 0, scale: 0.8 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.05 }}
                                className="rounded-full border border-zinc-800 bg-zinc-900 px-6 py-3 text-sm font-medium text-zinc-300 hover:border-flutter-blue hover:text-white transition-colors cursor-default"
                            >
                                {tech}
                            </motion.div>
                        ))}
                    </div>
                </div>

                <div>
                    <h2 className="mb-4 text-center text-3xl font-bold font-heading">Project Interface Flow</h2>
                    <p className="mb-16 text-center text-zinc-400 max-w-xl mx-auto">
                        Visual layout mapping the primary interface checkpoints and telemetry data pipelines of the application.
                    </p>
                    <div className="flex flex-wrap items-center justify-center gap-12">
                        {galleryImages.map((image, i) => {
                            const isError = imageErrors[image] || true;
                            
                            return (
                                <motion.div
                                    key={image}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1, duration: 0.6 }}
                                    className="flex flex-col items-center"
                                >
                                    {isError ? (
                                        <DeviceMockup imagePath={image} />
                                    ) : (
                                        <div className="relative overflow-hidden rounded-[32px] border border-zinc-800 bg-zinc-900 w-[280px] h-[520px] shadow-2xl">
                                            <img
                                                src={image}
                                                alt={`Screen mockup ${i + 1}`}
                                                className="object-cover w-full h-full"
                                                onError={() => handleImageError(image)}
                                            />
                                        </div>
                                    )}
                                    <span className="mt-4 text-xs font-mono text-zinc-500">
                                        Checkpoint {i + 1}
                                    </span>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

            </div>
        </section>
    );
};
