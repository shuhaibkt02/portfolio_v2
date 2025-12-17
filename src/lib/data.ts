export type CaseStudy = {
    id: string;
    title: string;
    category: string;
    description: string;
    thumbnail: string;
    techStack: string[];
    metrics: string[];
    color: string;
};

export const caseStudies: CaseStudy[] = [
    {
        id: "waves-ozone",
        title: "WAVES & Ozone - Ent. Field Sales",
        category: "Enterprise Mobile Solution",
        description: "Offline-first field sales and workforce management platform with high-precision location tracking.",
        thumbnail: "/projects/erp-thumb.jpg", // Placeholder
        techStack: ["Flutter", "Kotlin", "Clean Arch", "Riverpod", "Hive"],
        metrics: ["30% GPS Accuracy Boost", "60% Crash Reduction", "Offline Reliability"],
        color: "#0468D7",
    },
    {
        id: "cakenook",
        title: "CakeNook e-Commerce",
        category: "Full Stack Web",
        description: "Customer-facing platform for browsing, ordering, and managing cake purchases.",
        thumbnail: "/projects/sales-thumb.jpg", // Placeholder
        techStack: ["Next.js", "TypeScript", "React", "PostgreSQL"],
        metrics: ["SEO Optimized", "Responsive UI", "Smooth Ordering Flow"],
        color: "#FF4081",
    },
];
