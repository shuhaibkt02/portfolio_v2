"use client";

import { useEffect } from "react";
// @ts-ignore
import useSound from "use-sound";
import { useExperience } from "@/context/ExperienceContext";

export const SoundManager = () => {
    const { isImmersive, isSoundEnabled } = useExperience();

    const [play, { stop }] = useSound("/audio/ambient.mp3", {
        loop: true,
        volume: 0.5,
        interrupt: true,
    });

    useEffect(() => {
        if (isImmersive && isSoundEnabled) {
            play();
        } else {
            stop();
        }

        return () => {
            stop();
        };
    }, [isImmersive, isSoundEnabled, play, stop]);

    return null;
};
