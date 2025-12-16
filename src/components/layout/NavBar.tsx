"use client";

import { Home, Briefcase, Cpu, User, Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

const navItems = [
    { name: "Home", href: "/", icon: Home },
    { name: "Work", href: "/#work", icon: Briefcase },
    { name: "Skills", href: "/#skills", icon: Cpu },
    { name: "About", href: "/#about", icon: User },
    { name: "Contact", href: "/#contact", icon: Mail },
];

export const NavBar = () => {
    const pathname = usePathname();

    return (
        <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 transform">
            <motion.nav
                className="flex items-center gap-2 rounded-full border border-white/10 bg-black/60 px-4 py-2 backdrop-blur-lg backdrop-saturate-150 supports-[backdrop-filter]:bg-black/30 lg:px-6 lg:py-3"
                initial={{ y: 100, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 20, stiffness: 100 }}
            >
                {navItems.map((item) => {
                    const isActive = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href));
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
            </motion.nav>
        </div>
    );
};
