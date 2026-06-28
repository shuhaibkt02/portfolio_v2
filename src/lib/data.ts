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
    isInternal: boolean;
    architectureDiagramId?: "waves-2" | "location-plugin";
    engineeringChallenges: string[];
    structuredNarrative: {
        problem: string;
        challenge: string;
        solution: string;
        result: string;
    };

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
        description: "A premium celebration ecosystem connecting customers with local bakers and artisans for gourmet cakes, gifts, and surprises.",
        thumbnail: "/projects/cakenook/thumb.jpg",
        techStack: ["Next.js", "TypeScript", "React", "Tailwind"],
        metrics: ["Hyper-Local Discovery", "SEO Optimized Structure", "Production Live"],
        color: "#FF4081",
        webUrl: "https://cakenook.in/",
        role: "Full-Stack Freelance Contract",
        date: "Jan 2026 - Jun 2026",
        isInternal: false,
        engineeringChallenges: [
            "Optimizing Next.js SSR for SEO search performance",
            "Implementing local vendor boundaries & geocoding",
            "Managing real-time perishable stock availability",
            "Vendor-specific order management dashboards",
            "Responsive mobile-first UI for high conversion"
        ],
        structuredNarrative: {
            problem: "Artisanal bakers and dessert creators had no dedicated platform to showcase customized products and reach local buyers directly, while customers struggled to discover premium celebration gifts in their immediate vicinity.",
            challenge: "Building a highly performant, SEO-optimized multi-vendor marketplace that loads instantly on mobile web, while managing geofenced local delivery boundaries and real-time vendor specific inventory.",
            solution: "Designed a Next.js 15 application utilizing Server-Side Rendering (SSR) for instant search indexing, integrated location API boundaries, implemented dynamic geofenced queries, and set up simple vendor order pipelines.",
            result: "Successfully launched in production at cakenook.in, providing a fluid search-to-checkout journey with premium visual presentation and organic search discovery."
        },

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
        metrics: ["Zero-Latency Offline Sales", "Direct Bluetooth Printing", "Automated Inventory Reports"],
        color: "#0468D7",
        date: "Feb 2025 - Apr 2026",
        company: "SpiralCode Innovates LLP",
        isInternal: true,
        engineeringChallenges: [
            "Zero-latency local write-through database pattern",
            "Native Bluetooth bridge for direct thermal printing",
            "Precise background GPS location tracking",
            "Offline inventory reconciliations & expense tracking"
        ],
        structuredNarrative: {
            problem: "Field sales representatives at distributors spent excessive hours manually invoicing, tracking stock, and reporting sales, leading to delayed billing, transcription errors, and inventory discrepancies.",
            challenge: "The mobile application had to perform heavy local database actions and direct Bluetooth thermal printing on site, fully offline, without any UI latency or data integrity issues.",
            solution: "Developed a Flutter ERP using Riverpod and Hive for zero-latency local database updates, combined with a custom Kotlin Bluetooth printing service and a background sync system.",
            result: "Billing and invoicing times dropped significantly, manual data entry errors were reduced, and stock tracking became instant, even in remote areas."
        },

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
        metrics: ["Reduced production crashes by 60%", "Forced Geofence Checkout", "Automated Mileage Tracking"],
        color: "#0288D1",
        company: "SpiralCode Innovates LLP",
        date: "Feb 2025 - Apr 2026",
        playStoreUrl: "https://play.google.com/store/apps/details?id=com.spiralcode.waves2",
        isInternal: true,
        architectureDiagramId: "waves-2",
        engineeringChallenges: [
            "Atomic local order queue storage with Hive",
            "3-stage background synchronization with exponential backoff",
            "Enforced checkout constraints with geolocation validation",
            "Automated background travel mileage tracking",
            "Telemetry tracking using Sentry and Crashlytics"
        ],
        structuredNarrative: {
            problem: "Merging primary and secondary sales created extreme validation challenges in the field, with salespersons bypassing rules and losing data in dead zones.",
            challenge: "Ensure zero data loss for orders and checkouts in remote areas, enforce strict checkout rules (forced checkout constraints) to prevent fake shop visits, and automate travel expense auditing.",
            solution: "Implemented an offline-first architecture with BLoC, combining instant local database validation with a deferred, fire-and-forget sync queue using exponential retry backoff, alongside background mileage calculations based on GPS paths.",
            result: "Ensured 100% reliable order synchronization, reduced fake shop check-ins through forced check-outs, and eliminated manual travel expense entry errors."
        },

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
        metrics: ["Salary-Grade GPS Accuracy", "Anti-Tamper Performance Audit", "Dual Perspective Dashboard"],
        color: "#7B1FA2",
        company: "SpiralCode Innovates LLP",
        date: "Feb 2025 - Apr 2026",
        isInternal: true,
        architectureDiagramId: "location-plugin",
        engineeringChallenges: [
            "Custom Kotlin native foreground service with EventChannel",
            "Kalman filtering algorithm to resolve GPS drift",
            "Persistent Room database surviving aggressive background OS kills",
            "Anti-tamper logs to prevent mock locations or spoofing"
        ],
        structuredNarrative: {
            problem: "Employee mileage audits and salary calculations were highly inaccurate due to standard background applications getting aggressively killed by the Android OS, alongside GPS drift overstating travel distance.",
            challenge: "Building a highly persistent, battery-optimized tracker that collects accurate coordinates in 15-minute intervals, survives background terminations, and prevents location tampering.",
            solution: "Built a custom Android native foreground service in Kotlin utilizing EventChannel, Kalman filtering algorithms to filter coordinate drift, and a local Room Database persistence layer surviving OS process restarts.",
            result: "Achieved salary-grade location tracking accuracy, survived background kills, and established transparent anti-tamper audit logs for managers."
        },

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
