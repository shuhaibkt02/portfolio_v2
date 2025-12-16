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
        id: "erp-flutter-app",
        title: "Enterprise ERP Flutter Application",
        category: "Mobile Application",
        description: "An offline-first enterprise solution for real-time field employee tracking and operations.",
        thumbnail: "/projects/erp-thumb.jpg", // Placeholder
        techStack: ["Flutter", "BLoC", "Hive", "Firebase"],
        metrics: ["100% Accurate Time Tracking", "60% Crash Reduction"],
        color: "#0468D7",
    },
    {
        id: "location-tracker-plugin",
        title: "Location Tracker Plugin",
        category: "Flutter Plugin",
        description: "A custom Kotlin-based plugin for high-precision background location tracking with Kalman filtering.",
        thumbnail: "/projects/plugin-thumb.jpg",
        techStack: ["Kotlin", "Dart", "Room DB", "Background Service"],
        metrics: ["30% GPS Accuracy Improvement", "Battery Optimized"],
        color: "#00B0FF",
    },
    {
        id: "employee-management-system",
        title: "Employee Management System",
        category: "Enterprise Solution",
        description: "Comprehensive dashboard for managing attendance, payroll, and performance.",
        thumbnail: "/projects/employee-thumb.jpg",
        techStack: ["Flutter Web", "Node.js", "MongoDB"],
        metrics: ["5K+ Weekly Transactions", "Streamlined Workflows"],
        color: "#7C4DFF",
    },
    {
        id: "sales-management-platform",
        title: "Sales Management Platform",
        category: "SaaS Product",
        description: "Unified sales channel management with real-time reporting and inventory integration.",
        thumbnail: "/projects/sales-thumb.jpg",
        techStack: ["Flutter", "Riverpod", "ERPNext API"],
        metrics: ["300+ Active Sales Users", "Real-time Sync"],
        color: "#FF4081",
    },
];
