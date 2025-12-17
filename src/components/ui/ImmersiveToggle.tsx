"use client";

import { Sparkles, Volume2, VolumeX } from "lucide-react";
import { useExperience } from "@/context/ExperienceContext";
import { motion, AnimatePresence } from "framer-motion";

export const ImmersiveToggle = () => {
    const { isImmersive, setImmersive, isSoundEnabled, setSoundEnabled } = useExperience();

    return (
        <div className="flex items-center gap-2">
            <button
                onClick={() => setImmersive(!isImmersive)}
                className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${isImmersive
                        ? "bg-flutter-blue text-white shadow-[0_0_15px_rgba(56,189,248,0.5)]"
                        : "bg-white/5 text-zinc-400 hover:bg-white/10 hover:text-white"
                    }`}
                title={isImmersive ? "Disable Immersive Mode" : "Enable Immersive Mode"}
            >
                <Sparkles
                    size={20}
                    className={`transition-all duration-300 ${isImmersive ? "" : "opacity-70"}`}
                />
            </button>

            <AnimatePresence>
                {isImmersive && (
                    <motion.button
                        initial={{ width: 0, opacity: 0, scale: 0.8 }}
                        animate={{ width: "auto", opacity: 1, scale: 1 }}
                        exit={{ width: 0, opacity: 0, scale: 0.8 }}
                        transition={{ type: "spring", stiffness: 300, damping: 25 }}
                        onClick={() => setSoundEnabled(!isSoundEnabled)}
                        className={`flex items-center justify-center p-2 rounded-full transition-all overflow-hidden ${isSoundEnabled
                                ? "bg-white/10 text-flutter-blue"
                                : "bg-white/5 text-zinc-500 hover:text-white"
                            }`}
                        title={isSoundEnabled ? "Mute Sound" : "Enable Sound"}
                    >
                        {isSoundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
                    </motion.button>
                )}
            </AnimatePresence>
        </div>
    );
};
