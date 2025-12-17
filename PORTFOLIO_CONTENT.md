# Portfolio Content Inventory

This document contains **all** text content currently used in the Work Details pages.
Use this to track what needs to be updated.

## 1. Global / Static Text
*These strings appear on **every** case study page and are currently hardcoded in the components.*

**Page Headers:**
- **Challenge Section**: "The Challenge", "Problem Statement"
- **Research Section**: "Research & Discovery"
- **Design Process**: "Design Iterations" (Optional: Hidden for Enterprise projects)
- **Key Features**: "Key Features"
- **Tech Stack**: "Technologies Used", "Project Gallery"

---

## 2. Dynamic Project Content (from `src/lib/data.ts`)

### Project 1: WAVES - Primary Sales ERP (`waves`)
*Status: Live*

**Core Info**
- **Title**: WAVES - Primary Sales ERP
- **Category**: Enterprise Mobile Solution
- **Description**: A primary-sales-focused ERP mobile application for field salespersons and distributors, handling the complete sales lifecycle offline.
- **Metrics**: "Offline Primary Sales", "Thermal Printing", "Inventory Reports"

**The Challenge**
- **Description**: Field salespersons needed a robust tool to manage primary orders, returns, and inventory without relying on constant internet connectivity. The challenge was to integrate complex accounting and thermal printing features into a mobile-first experience.
- **Pain Points**:
  - "Manual Invoicing Errors" (Color: red)
  - "Stock Discrepancies" (Color: orange)
  - "No Field Visibility" (Color: yellow)

**Key Features**
- **Sales & Distribution** (Icon: chart-bar): Complete workflow for primary order creation, invoice generation, sales returns, and route-based customer management.
- **Stock & Accounts** (Icon: database): Manages cash accounts, inventory stock reports, and expense tracking. Supports thermal invoice printing directly from the device.
- **Background Location** (Icon: map): Custom native Android Kotlin plugin for 15-minute interval background tracking via foreground service.

**Tech Stack**
- Flutter, Riverpod, Kotlin Plugin, Hive, PDF Generation

**Research**
- **Zero Latency**: Engineered a 'User-First' write-through pattern: Actions save locally instantly, while background services handle GPS resolution and data syncing.
- **Native Bridge**: Built a custom EventChannel to offload battery-intensive GPS and retry-logic to the Android native layer (Kotlin) for stability.
- **Robust Sync**: Implemented a 3-stage retry queue with exponential backoff. If reliable sync fails after 3 attempts, the system prompts for manual intervention.

---

### Project 2: WAVES 2 - Adv. Sales Platform (`waves-2`)
*Status: Live*

**Core Info**
- **Title**: WAVES 2 - Adv. Sales Platform
- **Category**: Enterprise Mobile Solution
- **Description**: An advanced evolution combining primary and secondary sales into a unified platform, built on a robust Offline-First Workflow Architecture.
- **Metrics**: "Route Intelligence", "Sync Reliability", "Expense Automation"
- **Play Store**: [Link](https://play.google.com/store/apps/details?id=com.spiralcode.waves2)

**The Challenge**
- **Description**: Merging primary and secondary sales created complexity in validation and data synchronization. The goal was to enforce strict sales discipline (e.g., forced checkout) while ensuring zero data loss in offline environments.
- **Pain Points**:
  - "Data Synchronization Logic" (Color: red)
  - "Fake Shop Visits" (Color: orange)
  - "Complex Validation" (Color: yellow)

**Key Features**
- **Direct Shop Sales** (Icon: shopping-cart): Enables direct shop order creation and shop-level tracking. Enforces strict checkout rules before visiting the next shop.
- **Offline Architecture** (Icon: wifi-off): User actions are saved locally immediately. Background services handle retry queues and data synchronization to prevent silent data loss.
- **Expense Automation** (Icon: chart-bar): Travel expenses are calculated automatically based on daily distance traveled, eliminating manual entry errors.

**Tech Stack**
- Flutter, BLoC, Clean Arch, Kotlin Plugin, Sentry, Firebase Crashlytics, Remote Config

**Research**
- **Sync Architecture**: Adopted a 'Fire-and-Forget' UI pattern. Time & Location are captured at trigger, while heavy resolution (Google Maps API) happens in the background.
- **Validation**: Combined instant local validation with deferred server-side checks. Photo proof is compressed locally before being queued for upload.
- **Resilience**: Fail-safe Logic: The app stores reference data for manual sync if the 3-retry background worker encounters persistent network failure.

---

### Project 3: Ozone - Activity Tracker (`ozone`)
*Status: Live*

**Core Info**
- **Title**: Ozone - Activity Tracker
- **Category**: Workforce Management
- **Description**: Focused employee activity and distance-tracking application used for salary calculation, featuring an Offline-First Workflow Architecture.
- **Metrics**: "Accurate Mileage", "Performance Audit", "Dual Dashboard"

**The Challenge**
- **Description**: Salary calculations depended heavily on accurate distance tracking. The challenge was to create a tamper-proof tracking system that works reliably in the background while conserving battery.
- **Pain Points**:
  - "GPS Drift" (Color: red)
  - "Battery Optimization" (Color: orange)
  - "Tamper Proofing" (Color: yellow)

**Key Features**
- **Precision Tracking** (Icon: map): Native Kotlin foreground service with 15-minute interval integrated via EventChannel. Uses Coroutines for heavy processing.
- **Dual Perspective** (Icon: users): Employee dashboard for field actions (attendance, visits) and Manager dashboard for monitoring and auditing performance.
- **Offline-First Scope** (Icon: wifi-off): Critical actions like Attendance and Visit Checkouts work fully offline, syncing when connectivity is restored.

**Tech Stack**
- Flutter, Riverpod, Kotlin Plugin, Room DB

**Research**
- **Persistence**: Built a custom persistence layer using SharedPreferences to survive aggressive Android OS background app killing.
- **Retry Logic**: Background workers attempt to resolve GPS coordinates 3 times before flagging data as 'incomplete' for manual user review.
- **Audit Trail**: Every background action logs its execution state (Success/Retry/Fail), creating a transparent audit trail for salary validation.

---

### Project 4: CakeNook e-Commerce (`cakenook`)
*Status: Live*

**Core Info**
- **Title**: CakeNook e-Commerce
- **Category**: Full Stack Web
- **Description**: Production e-commerce web application for a cake business, focusing on smooth ordering and SEO performance.
- **Metrics**: "SEO Optimized", "Mobile Responsive", "Production Live"

**The Challenge**
- **Description**: The client needed a professional, responsive platform to replace manual ordering. Key requirements were search engine visibility and a seamless checkout flow for custom products.
- **Pain Points**:
  - "Low Visibility" (Color: red)
  - "Manual Orders" (Color: orange)
  - "Mobile Experience" (Color: yellow)

**Key Features**
- **Ordering Flow** (Icon: shopping-cart): Full cart and checkout experience optimized for mobile devices.
- **Modern Stack** (Icon: code): Built with Next.js and TypeScript for type safety and server-side rendering benefits.
- **Discoverability** (Icon: globe): Implemented SEO best practices to ensure the business is easily found by local customers.

**Research**
- **UX**: Simplifying the checkout process reduced cart abandonment.
- **Stack**: Next.js selected for superior SEO capabilities compared to SPA.
