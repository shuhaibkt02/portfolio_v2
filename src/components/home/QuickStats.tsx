"use client";

import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
    { label: "Experience", value: 3, suffix: "+", sublabel: "Software Engineering" },
    { label: "Production Apps", value: 8, suffix: "+", sublabel: "Delivered for Clients" },
    { label: "Crash Reduction", value: 70, suffix: "%", sublabel: "WAVES 2 ERP Application" },
    { label: "GPS Accuracy", value: 70, suffix: "%", sublabel: "Ozone Activity Tracker" },
];

const Counter = ({ value, suffix }: { value: number; suffix: string }) => {
    const ref = useRef<HTMLSpanElement>(null);
    const motionValue = useMotionValue(0);
    const springValue = useSpring(motionValue, {
        damping: 30,
        stiffness: 100,
    });
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    useEffect(() => {
        if (isInView) {
            motionValue.set(value);
        }
    }, [isInView, value, motionValue]);

    useEffect(() => {
        return springValue.on("change", (latest) => {
            if (ref.current) {
                ref.current.textContent = Math.floor(latest).toFixed(0) + suffix;
            }
        });
    }, [springValue, suffix]);

    return <span ref={ref} className="text-4xl font-bold font-heading text-flutter-blue sm:text-5xl" />;
};

export const QuickStats = () => {
    return (
        <section className="relative z-10 -mt-20 w-full px-4 sm:px-8">
            <div className="mx-auto max-w-6xl rounded-3xl border border-white/10 bg-black/60 p-8 shadow-2xl backdrop-blur-xl sm:p-12">
                <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
                    {stats.map((stat, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            className="flex flex-col items-center text-center"
                        >
                            <Counter value={stat.value} suffix={stat.suffix} />
                            <p className="mt-2 text-sm font-bold text-white sm:text-base">
                                {stat.label}
                            </p>
                            {stat.sublabel && (
                                <p className="mt-1 text-xs text-zinc-400">
                                    {stat.sublabel}
                                </p>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
