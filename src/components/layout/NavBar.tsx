"use client";

import { Home, Briefcase, Cpu, User, Mail, Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import { useState, useEffect } from "react";
import { useScrollSpy } from "@/hooks/useScrollSpy";
import { ImmersiveToggle } from "@/components/ui/ImmersiveToggle";

const navItems = [
    { name: "Home", href: "#home", icon: Home },
    { name: "Work", href: "#work", icon: Briefcase },
    { name: "Skills", href: "#skills", icon: Cpu },
    { name: "About", href: "#about", icon: User },
    { name: "Contact", href: "#contact", icon: Mail },
];

export const NavBar = () => {
    const activeSection = useScrollSpy(navItems.map((item) => item.href.replace("#", "")), 100);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    // Lock body scroll when mobile menu is open
    useEffect(() => {
        if (isMobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isMobileMenuOpen]);

    return (
        <>
            {/* Desktop Navigation (Floating Dock) */}
            <div className="hidden md:fixed md:bottom-6 md:left-1/2 md:z-50 md:-translate-x-1/2 md:transform md:block">
                <motion.nav
                    className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-6 py-3 backdrop-blur-lg backdrop-saturate-150 supports-[backdrop-filter]:bg-black/30"
                    initial={{ y: 100, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ type: "spring", damping: 20, stiffness: 100 }}
                >
                    {navItems.map((item) => {
                        const isActive = activeSection === item.href.replace("#", "");
                        const Icon = item.icon;

                        return (
                            <Link
                                key={item.name}
                                href={item.href}
                                className={twMerge(
                                    clsx(
                                        "relative flex flex-col items-center justify-center p-2 transition-colors duration-200 hover:text-flutter-blue",
                                        isActive ? "text-flutter-blue" : "text-zinc-400"
                                    )
                                )}
                            >
                                <div className="relative">
                                    <Icon
                                        size={24}
                                        strokeWidth={isActive ? 2.5 : 2}
                                        className="transition-all duration-200"
                                    />
                                    {isActive && (
                                        <motion.div
                                            layoutId="nav-pill"
                                            className="absolute -bottom-3 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full"
                                            style={{ backgroundColor: "#0468D7" }}
                                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                                        />
                                    )}
                                </div>
                                <span className="sr-only">{item.name}</span>
                            </Link>
                        );
                    })}

                    {/* Divider and Toggle */}
                    <div className="mx-1 h-6 w-px bg-white/10" />
                    <ImmersiveToggle />
                </motion.nav>
            </div>

            {/* Mobile Navigation (Top Bar + Hamburger) */}
            <div className="md:hidden">
                {/* Top Bar */}
                <div className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between border-b border-white/5 bg-black/60 px-6 py-4 backdrop-blur-lg backdrop-saturate-150 supports-[backdrop-filter]:bg-black/30">
                    <span className="text-xl font-bold font-heading">
                        <span className="text-flutter-blue">Shuhaib</span>
                    </span>
                    <div className="flex items-center gap-4">
                        <ImmersiveToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 text-zinc-400 transition-colors hover:text-white"
                            aria-label="Toggle menu"
                        >
                            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu Overlay */}
                <AnimatePresence>
                    {isMobileMenuOpen && (
                        <motion.div
                            initial={{ x: "100%" }}
                            animate={{ x: 0 }}
                            exit={{ x: "100%" }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="fixed inset-0 z-40 flex flex-col items-center justify-center bg-zinc-950 pt-20"
                        >
                            <nav className="flex flex-col items-center gap-8">
                                {navItems.map((item, index) => {
                                    const isActive = activeSection === item.href.replace("#", "");
                                    const Icon = item.icon;

                                    return (
                                        <motion.div
                                            key={item.name}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.1 * index }}
                                        >
                                            <Link
                                                href={item.href}
                                                onClick={() => setIsMobileMenuOpen(false)}
                                                className={twMerge(
                                                    clsx(
                                                        "group flex items-center gap-4 text-2xl font-medium transition-colors",
                                                        isActive ? "text-flutter-blue" : "text-zinc-400 hover:text-white"
                                                    )
                                                )}
                                            >
                                                <Icon
                                                    size={28}
                                                    strokeWidth={isActive ? 2.5 : 2}
                                                    className="transition-all"
                                                />
                                                {item.name}
                                            </Link>
                                        </motion.div>
                                    );
                                })}
                            </nav>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </>
    );
};
