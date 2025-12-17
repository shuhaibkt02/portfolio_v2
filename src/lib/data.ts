export type CaseStudy = {
    id: string;
    title: string;
    category: string;
    description: string;
    thumbnail: string;
    techStack: string[];
    metrics: string[];
    color: string;
    playStoreUrl?: string;
    webUrl?: string;
    role?: string;
    company?: string;
    date?: string;

    // Detailed Content
    challenge: {
        description: string;
        painPoints: {
            title: string;
            color: "red" | "orange" | "yellow" | "blue" | "green" | "purple";
        }[];
    };

    features: {
        id: string;
        label: string; // Tab label
        iconName: "camera" | "map" | "wifi-off" | "users" | "shopping-cart" | "chart-bar" | "globe" | "shield" | "database" | "code";
        title: string;
        description: string;
        metric: string;
    }[];

    gallery: string[];

    research: {
        title: string;
        description: string;
        iconName: "search" | "users" | "layout" | "code" | "database" | "server" | "shield";
    }[];

    designProcess?: {
        beforeImage: string;
        afterImage: string;
    };
};

export const caseStudies: CaseStudy[] = [
    {
        id: "cakenook",
        title: "CakeNook",
        category: "Hyper-Local Marketplace",
        description: "A premium celebration ecosystem connecting customers with the finest local bakers and artisans for gourmet cakes, gifts, and surprises.",
        thumbnail: "/projects/cakenook/thumb.jpg",
        techStack: ["Next.js", "TypeScript", "React", "Tailwind"],
        metrics: ["Hyper-Local", "SEO Optimized", "Production Live"],
        color: "#FF4081",
        webUrl: "https://cakenook.in/",
        role: "Full Stack Developer & UI/UX Designer",
        date: "Dec 2025",

        challenge: {
            description: "The goal was to build a multi-vendor platform that bridges the gap between local artisanal creators and customers seeking premium celebrations. It required a seamless digital experience that preserves the emotional essence of gifting while ensuring reliable, hyper-local delivery.",
            painPoints: [
                { title: "Fragmented Market", color: "red" },
                { title: "Logistics Complexity", color: "orange" },
                { title: "Quality Assurance", color: "yellow" },
            ]
        },

        features: [
            {
                id: "marketplace",
                label: "Marketplace",
                iconName: "shopping-cart",
                title: "Curated Ecosystem",
                description: "A platform connecting users with trusted local creators for cakes, flowers, and gifts, featuring vendor-specific management.",
                metric: "Hyper-local",
            },
            {
                id: "tech",
                label: "Tech",
                iconName: "code",
                title: "Modern Stack",
                description: "Built with Next.js and TypeScript to ensure high performance, SEO visibility, and a smooth mobile-first experience.",
                metric: "High Performance",
            },
            {
                id: "discovery",
                label: "Discovery",
                iconName: "globe",
                title: "Smart Discovery",
                description: "Optimized for local search to help users find the nearest premium bakers and gifts with ease.",
                metric: "SEO Optimized",
            }
        ],

        gallery: [1, 2, 3, 4].map(i => `/projects/cakenook/screen-${i}.jpg`),

        research: [
            { title: "Emotional UX", iconName: "layout", description: "Designed an interface that emphasizes elegance and emotion, aligning with the tagline 'A Surprise that Speaks from the Heart'." },
            { title: "Local First", iconName: "search", description: "Prioritized location-based filtering to ensure freshness and timely delivery for perishable gourmet items." },
        ]
    },
    {
        id: "waves",
        title: "WAVES - Primary Sales ERP",
        category: "Enterprise Mobile Solution",
        description: "A primary-sales-focused ERP mobile application for field salespersons and distributors, handling the complete sales lifecycle offline.",
        thumbnail: "/projects/waves/thumb.jpg",
        techStack: ["Flutter", "Riverpod", "Kotlin Plugin", "Hive", "PDF Gen"],
        metrics: ["Offline Primary Sales", "Thermal Printing", "Inventory Reports"],
        color: "#0468D7",
        date: "Feb 2025 - Present",
        company: "Spiralcode Innovation",

        challenge: {
            description: "Field salespersons needed a robust tool to manage primary orders, returns, and inventory without relying on constant internet connectivity. The challenge was to integrate complex accounting and thermal printing features into a mobile-first experience.",
            painPoints: [
                { title: "Manual Invoicing Errors", color: "red" },
                { title: "Stock Discrepancies", color: "orange" },
                { title: "No Field Visibility", color: "yellow" },
            ]
        },

        features: [
            {
                id: "erp",
                label: "ERP Core",
                iconName: "chart-bar",
                title: "Sales & Distribution",
                description: "Complete workflow for primary order creation, invoice generation, sales returns, and route-based customer management.",
                metric: "Full lifecycle support",
            },
            {
                id: "inventory",
                label: "Inventory",
                iconName: "database",
                title: "Stock & Accounts",
                description: "Manages cash accounts, inventory stock reports, and expense tracking. Supports thermal invoice printing directly from the device.",
                metric: "Real-time stock view",
            },
            {
                id: "tracking",
                label: "Tracking",
                iconName: "map",
                title: "Background Location",
                description: "Custom native Android Kotlin plugin for 15-minute interval background tracking via foreground service.",
                metric: "Precise field data",
            }
        ],

        gallery: [1, 2, 3, 4].map(i => `/projects/waves/screen-${i}.jpg`),

        research: [
            { title: "Zero Latency", iconName: "database", description: "Engineered a 'User-First' write-through pattern: Actions save locally instantly, while background services handle GPS resolution and data syncing." },
            { title: "Native Bridge", iconName: "code", description: "Built a custom EventChannel to offload battery-intensive GPS and retry-logic to the Android native layer (Kotlin) for stability." },
            { title: "Robust Sync", iconName: "server", description: "Implemented a 3-stage retry queue with exponential backoff. If reliable sync fails after 3 attempts, the system prompts for manual intervention." },
        ]
    },
    {
        id: "waves-2",
        title: "WAVES 2 - Adv. Sales Platform",
        category: "Enterprise Mobile Solution",
        description: "An advanced evolution combining primary and secondary sales into a unified platform, built on a robust Offline-First Workflow Architecture.",
        thumbnail: "/projects/waves2/thumb.jpg",
        techStack: ["Flutter", "BLoC", "Clean Arch", "Kotlin Plugin", "Sentry", "Firebase Crashlytics", "Remote Config"],
        metrics: ["Route Intelligence", "Sync Reliability", "Expense Automation"],
        color: "#0288D1",
        company: "Spiralcode Innovation",
        date: "Feb 2025 - Present",
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.spiralcode.waves2",

        challenge: {
            description: "Merging primary and secondary sales created complexity in validation and data synchronization. The goal was to enforce strict sales discipline (e.g., forced checkout) while ensuring zero data loss in offline environments.",
            painPoints: [
                { title: "Data Synchronization Logic", color: "red" },
                { title: "Fake Shop Visits", color: "orange" },
                { title: "Complex Validation", color: "yellow" },
            ]
        },

        features: [
            {
                id: "secondary",
                label: "Secondary Sales",
                iconName: "shopping-cart",
                title: "Direct Shop Sales",
                description: "Enables direct shop order creation and shop-level tracking. Enforces strict checkout rules before visiting the next shop.",
                metric: "Disciplined workflows",
            },
            {
                id: "sync",
                label: "Smart Sync",
                iconName: "wifi-off",
                title: "Offline Architecture",
                description: "User actions are saved locally immediately. Background services handle retry queues and data synchronization to prevent silent data loss.",
                metric: "Zero data loss",
            },
            {
                id: "expense",
                label: "Expenses",
                iconName: "chart-bar",
                title: "Expense Automation",
                description: "Travel expenses are calculated automatically based on daily distance traveled, eliminating manual entry errors.",
                metric: "Auto-calculated",
            }
        ],

        gallery: [1, 2, 3, 4].map(i => `/projects/waves2/screen-${i}.jpg`),

        research: [
            { title: "Sync Architecture", iconName: "database", description: "Adopted a 'Fire-and-Forget' UI pattern. Time & Location are captured at trigger, while heavy resolution (Google Maps API) happens in the background." },
            { title: "Validation", iconName: "shield", description: "Combined instant local validation with deferred server-side checks. Photo proof is compressed locally before being queued for upload." },
            { title: "Resilience", iconName: "server", description: "Fail-safe Logic: The app stores reference data for manual sync if the 3-retry background worker encounters persistent network failure." },
        ]
    },
    {
        id: "ozone",
        title: "Ozone - Activity Tracker",
        category: "Workforce Management",
        description: "Focused employee activity and distance-tracking application used for salary calculation, featuring an Offline-First Workflow Architecture.",
        thumbnail: "/projects/ozone/thumb.jpg",
        techStack: ["Flutter", "Riverpod", "Kotlin Plugin", "Room DB"],
        metrics: ["Accurate Mileage", "Performance Audit", "Dual Dashboard"],
        color: "#7B1FA2",
        company: "Spiralcode Innovation",
        date: "Feb 2025 - Present",

        challenge: {
            description: "Salary calculations depended heavily on accurate distance tracking. The challenge was to create a tamper-proof tracking system that works reliably in the background while conserving battery.",
            painPoints: [
                { title: "GPS Drift", color: "red" },
                { title: "Battery Optimization", color: "orange" },
                { title: "Tamper Proofing", color: "yellow" },
            ]
        },

        features: [
            {
                id: "tracking",
                label: "Distance",
                iconName: "map",
                title: "Precision Tracking",
                description: "Native Kotlin foreground service with 15-minute interval integrated via EventChannel. Uses Coroutines for heavy processing.",
                metric: "Salary-grade accuracy",
            },
            {
                id: "dashboard",
                label: "Dashboards",
                iconName: "users",
                title: "Dual Perspective",
                description: "Employee dashboard for field actions (attendance, visits) and Manager dashboard for monitoring and auditing performance.",
                metric: "Manager oversight",
            },
            {
                id: "offline",
                label: "Offline",
                iconName: "wifi-off",
                title: "Offline-First Scope",
                description: "Critical actions like Attendance and Visit Checkouts work fully offline, syncing when connectivity is restored.",
                metric: "Always available",
            }
        ],

        gallery: [1, 2, 3, 4].map(i => `/projects/ozone/screen-${i}.jpg`),

        research: [
            { title: "Persistence", iconName: "database", description: "Built a custom persistence layer using SharedPreferences to survive aggressive Android OS background app killing." },
            { title: "Retry Logic", iconName: "server", description: "Background workers attempt to resolve GPS coordinates 3 times before flagging data as 'incomplete' for manual user review." },
            { title: "Audit Trail", iconName: "shield", description: "Every background action logs its execution state (Success/Retry/Fail), creating a transparent audit trail for salary validation." },
        ]
    },

];
