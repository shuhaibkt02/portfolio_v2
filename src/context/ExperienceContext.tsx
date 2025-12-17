"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

interface ExperienceContextType {
    isImmersive: boolean;
    setImmersive: (value: boolean) => void;
    isSoundEnabled: boolean;
    setSoundEnabled: (value: boolean) => void;
}

const ExperienceContext = createContext<ExperienceContextType | undefined>(undefined);

export const ExperienceProvider = ({ children }: { children: React.ReactNode }) => {
    // Default to false initially, or load from local storage
    const [isImmersive, setIsImmersive] = useState(false);
    const [isSoundEnabled, setIsSoundEnabled] = useState(false);

    // Optional: Persist to localStorage
    useEffect(() => {
        const storedImmersive = localStorage.getItem("immersive-mode");
        const storedSound = localStorage.getItem("sound-enabled");

        if (storedImmersive !== null) setIsImmersive(storedImmersive === "true");
        if (storedSound !== null) setIsSoundEnabled(storedSound === "true");
    }, []);

    useEffect(() => {
        localStorage.setItem("immersive-mode", String(isImmersive));
    }, [isImmersive]);

    useEffect(() => {
        localStorage.setItem("sound-enabled", String(isSoundEnabled));
    }, [isSoundEnabled]);

    return (
        <ExperienceContext.Provider
            value={{
                isImmersive,
                setImmersive: setIsImmersive,
                isSoundEnabled,
                setSoundEnabled: setIsSoundEnabled,
            }}
        >
            {children}
        </ExperienceContext.Provider>
    );
};

export const useExperience = () => {
    const context = useContext(ExperienceContext);
    if (context === undefined) {
        throw new Error("useExperience must be used within an ExperienceProvider");
    }
    return context;
};
