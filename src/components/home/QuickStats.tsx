"use client";

import { motion, useInView, useSpring, useMotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

const stats = [
    { label: "Years Experience", value: 2, suffix: "+" },
    { label: "Crash Reduction", value: 60, suffix: "%" },
    { label: "Weekly Transactions", value: 5, suffix: "K+" },
    { label: "GPS Accuracy", value: 30, suffix: "%" },
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
                            <p className="mt-2 text-sm font-medium text-zinc-400 sm:text-base">
                                {stat.label}
                            </p>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};
