"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import { useExperience } from "@/context/ExperienceContext";

export const SmoothScroll = () => {
    const { isImmersive } = useExperience();

    useEffect(() => {
        if (!isImmersive) return;

        const lenis = new Lenis({
            autoRaf: true,
        });

        return () => {
            lenis.destroy();
        };
    }, [isImmersive]);

    return null;
};
