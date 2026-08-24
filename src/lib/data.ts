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
    githubUrl?: string;
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

    challenge: {
        description: string;
        painPoints: {
            title: string;
            color: "red" | "orange" | "yellow" | "blue" | "green" | "purple";
        }[];
    };

    features: {
        id: string;
        label: string;
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
        id: "waves-2",
        title: "WAVES 2 - Adv. Sales Platform",
        category: "Enterprise Mobile Solution",
        description: "An advanced evolution combining primary and secondary sales into a unified platform, built on a robust Offline-First Workflow Architecture.",
        thumbnail: "/projects/waves2/thumb.jpg",
        techStack: ["Flutter", "BLoC", "Clean Arch", "Kotlin Plugin", "Sentry", "Firebase"],
        metrics: ["Reduced crashes by 60%", "Forced Geofence Checkout", "Automated Mileage Tracking"],
        color: "#0288D1",
        company: "SpiralCode Innovates LLP",
        date: "Feb 2025 - Dec 2025",
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
                { title: "Complex Validation", color: "yellow" }
            ]
        },
        features: [
            {
                id: "secondary",
                label: "Secondary Sales",
                iconName: "shopping-cart",
                title: "Direct Shop Sales",
                description: "Enables direct shop order creation and shop-level tracking. Enforces strict checkout rules before visiting the next shop.",
                metric: "Disciplined workflows"
            },
            {
                id: "sync",
                label: "Smart Sync",
                iconName: "wifi-off",
                title: "Offline Architecture",
                description: "User actions are saved locally immediately. Background services handle retry queues and data synchronization to prevent silent data loss.",
                metric: "Zero data loss"
            },
            {
                id: "expense",
                label: "Expenses",
                iconName: "chart-bar",
                title: "Expense Automation",
                description: "Travel expenses are calculated automatically based on daily distance traveled, eliminating manual entry errors.",
                metric: "Auto-calculated"
            }
        ],
        gallery: [1, 2, 3, 4].map(i => `/projects/waves2/screen-${i}.jpg`),
        research: [
            { title: "Sync Architecture", iconName: "database", description: "Adopted a 'Fire-and-Forget' UI pattern. Time & Location are captured at trigger, while heavy resolution (Google Maps API) happens in the background." },
            { title: "Validation", iconName: "shield", description: "Combined instant local validation with deferred server-side checks. Photo proof is compressed locally before being queued for upload." },
            { title: "Resilience", iconName: "server", description: "Fail-safe Logic: The app stores reference data for manual sync if the 3-retry background worker encounters persistent network failure." }
        ]
    },
    {
        id: "cakenook",
        title: "CakeNook",
        category: "Hyper-Local Marketplace",
        description: "Built a multi-vendor hyperlocal marketplace using Next.js and React.js connecting buyers with artisanal bakers.",
        thumbnail: "/projects/cakenook/thumb.jpg",
        techStack: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Google Maps Platform"],
        metrics: ["Complete Shopping Experience", "Razorpay Payments", "Geo-Boundary Delivery Validation"],
        color: "#FF4081",
        webUrl: "https://cakenook.in/",
        role: "Frontend Developer",
        date: "Jan 2026 - Jun 2026",
        isInternal: false,
        engineeringChallenges: [
            "Optimizing Next.js SSR for SEO search performance",
            "Implementing local vendor boundaries & geocoding validation",
            "Managing real-time perishable stock availability",
            "Core Web Vitals and Lighthouse performance optimizations"
        ],
        structuredNarrative: {
            problem: "Artisanal bakers and dessert creators had no dedicated platform to showcase customized products and reach local buyers directly, while customers struggled to discover premium celebration gifts in their immediate vicinity.",
            challenge: "Building a highly performant, SEO-optimized multi-vendor marketplace that loads instantly on mobile web, while managing geofenced local delivery boundaries and real-time vendor specific inventory.",
            solution: "Designed a Next.js 15 application utilizing Server-Side Rendering (SSR) for instant search indexing, integrated location API boundaries, implemented dynamic geofenced queries, and set up simple vendor order pipelines with Razorpay.",
            result: "Successfully launched in production at cakenook.in, providing a fluid search-to-checkout journey with premium visual presentation and organic search discovery."
        },
        challenge: {
            description: "The goal was to build a multi-vendor platform that bridges the gap between local artisanal creators and customers seeking premium celebrations with reliable delivery validation.",
            painPoints: [
                { title: "Fragmented Market", color: "red" },
                { title: "Logistics Complexity", color: "orange" },
                { title: "SEO Optimization", color: "yellow" }
            ]
        },
        features: [
            {
                id: "marketplace",
                label: "Marketplace",
                iconName: "shopping-cart",
                title: "Curated Ecosystem",
                description: "Connecting users with trusted local creators for cakes, flowers, and gifts, featuring vendor-specific order management.",
                metric: "Hyper-local"
            },
            {
                id: "tech",
                label: "Tech",
                iconName: "code",
                title: "Modern Stack",
                description: "Built with Next.js and TypeScript to ensure high performance, SEO visibility, and a smooth mobile-first experience.",
                metric: "High Performance"
            },
            {
                id: "discovery",
                label: "Discovery",
                iconName: "globe",
                title: "Geo-Boundary Validation",
                description: "Optimized for local search with Google Maps Platform geofencing to validate delivery availability.",
                metric: "SEO & Geofenced"
            }
        ],
        gallery: [1, 2, 3, 4].map(i => `/projects/cakenook/screen-${i}.jpg`),
        research: [
            { title: "Emotional UX", iconName: "layout", description: "Designed an interface that emphasizes elegance and emotion for celebration order conversion." },
            { title: "Local First", iconName: "search", description: "Prioritized location-based filtering to ensure freshness and timely delivery for perishable gourmet items." }
        ]
    },
    {
        id: "waves",
        title: "WAVES - Primary Sales ERP",
        category: "Enterprise Mobile Solution",
        description: "A primary-sales-focused ERP mobile application for field salespersons and distributors, handling the complete sales lifecycle offline.",
        thumbnail: "/projects/waves/thumb.jpg",
        techStack: ["Flutter", "Riverpod", "Kotlin Plugin", "Hive", "Fastlane"],
        metrics: ["Zero-Latency Offline Sales", "Direct Bluetooth Printing", "Automated Inventory Reports"],
        color: "#0468D7",
        date: "Feb 2025 - Dec 2025",
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
                { title: "No Field Visibility", color: "yellow" }
            ]
        },
        features: [
            {
                id: "erp",
                label: "ERP Core",
                iconName: "chart-bar",
                title: "Sales & Distribution",
                description: "Complete workflow for primary order creation, invoice generation, sales returns, and route-based customer management.",
                metric: "Full lifecycle support"
            },
            {
                id: "inventory",
                label: "Inventory",
                iconName: "database",
                title: "Stock & Accounts",
                description: "Manages cash accounts, inventory stock reports, and expense tracking. Supports thermal invoice printing directly from the device.",
                metric: "Real-time stock view"
            },
            {
                id: "tracking",
                label: "Tracking",
                iconName: "map",
                title: "Background Location",
                description: "Custom native Android Kotlin plugin for 15-minute interval background tracking via foreground service.",
                metric: "Precise field data"
            }
        ],
        gallery: [1, 2, 3, 4].map(i => `/projects/waves/screen-${i}.jpg`),
        research: [
            { title: "Zero Latency", iconName: "database", description: "Engineered a 'User-First' write-through pattern: Actions save locally instantly, while background services handle GPS resolution and data syncing." },
            { title: "Native Bridge", iconName: "code", description: "Built a custom EventChannel to offload battery-intensive GPS and retry-logic to the Android native layer (Kotlin) for stability." }
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
        date: "Feb 2025 - Dec 2025",
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
                { title: "Tamper Proofing", color: "yellow" }
            ]
        },
        features: [
            {
                id: "tracking",
                label: "Distance",
                iconName: "map",
                title: "Precision Tracking",
                description: "Native Kotlin foreground service with 15-minute interval integrated via EventChannel. Uses Coroutines for heavy processing.",
                metric: "Salary-grade accuracy"
            },
            {
                id: "dashboard",
                label: "Dashboards",
                iconName: "users",
                title: "Dual Perspective",
                description: "Employee dashboard for field actions (attendance, visits) and Manager dashboard for monitoring and auditing performance.",
                metric: "Manager oversight"
            },
            {
                id: "offline",
                label: "Offline",
                iconName: "wifi-off",
                title: "Offline-First Scope",
                description: "Critical actions like Attendance and Visit Checkouts work fully offline, syncing when connectivity is restored.",
                metric: "Always available"
            }
        ],
        gallery: [1, 2, 3, 4].map(i => `/projects/ozone/screen-${i}.jpg`),
        research: [
            { title: "Persistence", iconName: "database", description: "Built a custom persistence layer using SharedPreferences and Room to survive aggressive Android OS background app killing." },
            { title: "Audit Trail", iconName: "shield", description: "Every background action logs its execution state (Success/Retry/Fail), creating a transparent audit trail for salary validation." }
        ]
    },
    {
        id: "portfolio",
        title: "Personal Engineering Portfolio",
        category: "Web Development",
        description: "Personal portfolio built using Next.js, React.js and Tailwind CSS.",
        thumbnail: "/projects/cakenook/thumb.jpg",
        techStack: ["Next.js", "React.js", "Tailwind CSS", "TypeScript", "Framer Motion"],
        metrics: ["Responsive Design", "Resume Download", "Project Showcase", "SEO Optimized"],
        color: "#0468D7",
        webUrl: "https://shuhaibkt.vercel.app",
        githubUrl: "https://github.com/shuhaibkt02/portfolio_v2",
        role: "Developer & Designer",
        date: "2026",
        isInternal: false,
        engineeringChallenges: [
            "Implementing smooth framer-motion animations and interactive graph node selectors",
            "SEO optimization with dynamic metadata, OpenGraph tags, and sitemap generation",
            "Lightweight glassmorphism UI components with custom Tailwind token design system"
        ],
        structuredNarrative: {
            problem: "Standard resumes fail to showcase real engineering solutions, architectural decisions, and production metrics achieved across complex mobile apps.",
            challenge: "Create a highly interactive, fast, and visually compelling web application that effectively communicates Flutter expertise, native Android integration capabilities, and project case studies.",
            solution: "Designed and developed a Next.js 15 web app with server-side rendering, Framer Motion animations, custom graph visualizations, and structured project case studies.",
            result: "Delivered a performant, SEO-optimized portfolio showcasing engineering depth and production experience."
        },
        challenge: {
            description: "Communicating engineering competence and product leadership through a digital interactive medium.",
            painPoints: [
                { title: "Communicating Technical Depth", color: "blue" },
                { title: "Performance & Animation Balance", color: "purple" }
            ]
        },
        features: [
            {
                id: "showcase",
                label: "Showcase",
                iconName: "code",
                title: "Engineering Showcase",
                description: "Deep dive case studies highlighting problem statements, architectural solutions, and quantitative results.",
                metric: "100% Production Focused"
            },
            {
                id: "graph",
                label: "Graph",
                iconName: "database",
                title: "Domain Graph Visualizer",
                description: "Interactive node graph exploring domain skills, capabilities, and project evidence.",
                metric: "Interactive UX"
            }
        ],
        gallery: [1, 2, 3, 4].map(i => `/projects/cakenook/screen-${i}.jpg`),
        research: [
            { title: "SEO Optimization", iconName: "code", description: "Structured JSON-LD and OpenGraph cards for max search visibility." }
        ]
    },
    {
        id: "location-tracker-plugin",
        title: "Location Tracker Plugin",
        category: "Flutter Plugin / Experimental",
        description: "Reusable Flutter plugin experiment providing persistent background location tracking for ERP field applications.",
        thumbnail: "/projects/ozone/thumb.jpg",
        techStack: ["Flutter", "Kotlin", "Android", "Room DB"],
        metrics: ["Experimental Plugin", "Foreground Service", "Room DB Storage"],
        color: "#3DDC84",
        githubUrl: "https://github.com/shuhaibkt02/location_tracker",
        role: "Plugin Developer",
        date: "2025",
        isInternal: true,
        architectureDiagramId: "location-plugin",
        engineeringChallenges: [
            "Android Foreground Service with notification persistence",
            "Kotlin MethodChannel & EventChannel implementation",
            "Room Database FIFO storage queue for offline tracking"
        ],
        structuredNarrative: {
            problem: "Field employee mobile applications frequently lose location tracking data when operating in background mode or low-connectivity zones due to OS battery optimizations.",
            challenge: "Developing a Flutter plugin experiment to test persistent interval coordinate collection in background mode.",
            solution: "Engineered a native Kotlin plugin using Android Foreground Services, an EventChannel stream for real-time Flutter updates, and a local Room DB queue.",
            result: "Established background process persistence prototype and Room DB synchronization queues."
        },
        challenge: {
            description: "Building background location tracking for Android requires navigating aggressive OS battery saver policies.",
            painPoints: [
                { title: "OS Background App Kills", color: "red" },
                { title: "GPS Coordinate Drift", color: "orange" }
            ]
        },
        features: [
            {
                id: "service",
                label: "Foreground Service",
                iconName: "shield",
                title: "Android Foreground Service",
                description: "Runs continuous background location tracking with custom sticky notifications.",
                metric: "Experimental"
            },
            {
                id: "storage",
                label: "FIFO Storage",
                iconName: "database",
                title: "Room Persistence",
                description: "Queues coordinates in Room DB with FIFO retention rules.",
                metric: "Local persistence"
            }
        ],
        gallery: [1, 2, 3, 4].map(i => `/projects/ozone/screen-${i}.jpg`),
        research: [
            { title: "Platform Channels", iconName: "code", description: "Built MethodChannel for lifecycle control and EventChannel for coordinate streaming." }
        ]
    }
];
