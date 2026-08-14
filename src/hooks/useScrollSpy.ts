"use client";

import { useState, useEffect } from "react";

export const useScrollSpy = (ids: string[], offset: number = 250) => {
    const [activeId, setActiveId] = useState<string>("");

    useEffect(() => {
        const handleScroll = () => {
            const scrollPosition = window.scrollY + offset;

            // Check elements from bottom to top or top to bottom to find current active section
            let currentSection = "";

            for (let i = 0; i < ids.length; i++) {
                const element = document.getElementById(ids[i]);
                if (element) {
                    const top = element.offsetTop;
                    const height = element.offsetHeight;

                    if (scrollPosition >= top && scrollPosition < top + height) {
                        currentSection = ids[i];
                        break;
                    }
                }
            }

            // At very top of page
            if (window.scrollY < 100 && ids.includes("home")) {
                currentSection = "home";
            }
            // Near bottom of page
            else if (
                window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 &&
                ids.length > 0
            ) {
                currentSection = ids[ids.length - 1];
            }

            if (currentSection) {
                setActiveId(currentSection);
            }
        };

        handleScroll();
        window.addEventListener("scroll", handleScroll, { passive: true });
        return () => window.removeEventListener("scroll", handleScroll);
    }, [ids, offset]);

    return activeId;
};
