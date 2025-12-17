"use client";

import { useEffect } from "react";
// @ts-ignore
import useSound from "use-sound";
import { useExperience } from "@/context/ExperienceContext";

export const SoundManager = () => {
    const { isImmersive, isSoundEnabled } = useExperience();

    // We assume the user will place a file named 'ambient.mp3' in public/audio/
    const [play, { stop, pause }] = useSound("/audio/ambient.mp3", {
        loop: true,
        volume: 0.5,
        interrupt: true,
    });

    useEffect(() => {
        if (isImmersive && isSoundEnabled) {
            play();
        } else {
            // We use stop() instead of pause() to reset track when toggling immersive mode, 
            // but pause() might be better if we want to resume. 
            // Let's use pause() for sound toggle, and stop for immersive toggle?
            // For simplicity, let's just pause/stop.
            stop();
        }

        return () => {
            stop();
        };
    }, [isImmersive, isSoundEnabled, play, stop]);

    return null;
};
