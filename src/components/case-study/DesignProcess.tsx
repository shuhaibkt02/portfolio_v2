"use client";

import { motion } from "framer-motion";
import { useState } from "react";

export const DesignProcess = () => {
    const [sliderValue, setSliderValue] = useState(50);

    return (
        <section className="bg-zinc-900 py-24 text-white">
            <div className="mx-auto max-w-7xl px-6 sm:px-12">
                <h2 className="mb-12 text-center text-3xl font-bold font-heading sm:text-4xl">Design Iterations</h2>

                <div className="relative mx-auto aspect-video w-full max-w-5xl overflow-hidden rounded-2xl bg-black border border-white/10 shadow-2xl">
                    {/* Background Image (After) */}
                    <div className="absolute inset-0 flex items-center justify-center bg-blue-900/20 text-blue-200">
                        <span className="text-4xl font-bold">High-Fidelity (After)</span>
                        {/* Replace this div with an actual <img> tag when assets are available */}
                    </div>

                    {/* Foreground Image (Before) - Clipped */}
                    <div
                        className="absolute inset-0 flex items-center justify-center bg-zinc-800 text-zinc-500 overflow-hidden"
                        style={{ clipPath: `inset(0 ${100 - sliderValue}% 0 0)` }}
                    >
                        <div className="absolute inset-0 flex items-center justify-center bg-zinc-800 w-full h-full">
                            {/* This inner div ensures image stays centered/sized correctly regardless of clip */}
                            <span className="text-4xl font-bold">Wireframe (Before)</span>
                        </div>
                    </div>

                    {/* Slider Handle */}
                    <div
                        className="absolute inset-y-0 w-1 bg-white cursor-ew-resize"
                        style={{ left: `${sliderValue}%` }}
                    >
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white flex items-center justify-center shadow-lg">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-black"><path d="m9 18 6-6-6-6" /></svg>
                        </div>
                    </div>

                    {/* Range Input for Interaction */}
                    <input
                        type="range"
                        min="0"
                        max="100"
                        value={sliderValue}
                        onChange={(e) => setSliderValue(Number(e.target.value))}
                        className="absolute inset-0 z-20 h-full w-full cursor-ew-resize opacity-0"
                    />
                </div>

                <p className="mt-8 text-center text-zinc-400">Drag the slider to compare the wireframe with the final UI.</p>
            </div>
        </section>
    );
};
