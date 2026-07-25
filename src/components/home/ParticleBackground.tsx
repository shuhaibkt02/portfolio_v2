"use client";

import { useEffect, useRef } from "react";

/**
 * StarfieldBackground — minimal, deep-space dark background.
 *
 * Layers, each restrained:
 *  1. Three star depth-layers (far/mid/near) — parallax via slow independent
 *     drift, no scroll/mouse coupling needed to feel alive.
 *  2. Gentle per-star twinkle (opacity breathing, staggered phase).
 *  3. Sparse constellation lines — only the few nearest-neighbor pairs among
 *     the "near" layer get connected, and only within a tight distance. This
 *     keeps it a scattering of stars with the occasional constellation,
 *     not a network-graph particle background.
 *  4. Rare shooting stars — a slow timer, one streak at a time.
 *  5. A single, very faint nebula haze so the field isn't perfectly flat.
 *
 * Respects prefers-reduced-motion (freezes twinkle/drift, no shooting stars).
 * Renders at devicePixelRatio, resize is debounced.
 */

type Star = {
    x: number;
    y: number;
    baseX: number;
    baseY: number;
    radius: number;
    layer: 0 | 1 | 2; // 0 = far, 1 = mid, 2 = near
    twinkleOffset: number;
    twinkleSpeed: number;
    driftAngle: number;
};

type ShootingStar = {
    x: number;
    y: number;
    vx: number;
    vy: number;
    life: number;
    maxLife: number;
};

const BACKGROUND = "#05050a";
const NEBULA = "rgba(76, 63, 148, 0.05)"; // faint indigo haze, single accent only

const LAYER_CONFIG = [
    { count: 90, radius: [0.4, 0.9], speed: 0.0015, opacity: 0.5 }, // far
    { count: 55, radius: [0.7, 1.4], speed: 0.004, opacity: 0.75 }, // mid
    { count: 28, radius: [1.1, 2.0], speed: 0.008, opacity: 1 }, // near
] as const;

export const ParticleBackground = () => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        let width = 0;
        let height = 0;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);

        let stars: Star[] = [];
        let shootingStars: ShootingStar[] = [];
        let animationFrameId: number;
        let time = 0;
        let nextShootingStarAt = 0;
        let resizeTimeout: ReturnType<typeof setTimeout>;

        const resizeCanvas = () => {
            width = window.innerWidth;
            height = window.innerHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
        };

        const initStars = () => {
            stars = [];
            LAYER_CONFIG.forEach((cfg, layerIndex) => {
                const scaled = Math.round(
                    cfg.count * Math.min((width * height) / (1440 * 900), 1.6)
                );
                for (let i = 0; i < scaled; i++) {
                    const x = Math.random() * width;
                    const y = Math.random() * height;
                    stars.push({
                        x,
                        y,
                        baseX: x,
                        baseY: y,
                        radius:
                            cfg.radius[0] +
                            Math.random() * (cfg.radius[1] - cfg.radius[0]),
                        layer: layerIndex as 0 | 1 | 2,
                        twinkleOffset: Math.random() * Math.PI * 2,
                        twinkleSpeed: 0.01 + Math.random() * 0.015,
                        driftAngle: Math.random() * Math.PI * 2,
                    });
                }
            });
        };

        const scheduleNextShootingStar = () => {
            nextShootingStarAt = time + 4000 + Math.random() * 7000;
        };

        const spawnShootingStar = () => {
            const startX = Math.random() * width * 0.6 + width * 0.2;
            const startY = Math.random() * height * 0.25;
            const angle = Math.PI / 4 + (Math.random() * 0.3 - 0.15);
            const speed = 9 + Math.random() * 5;
            shootingStars.push({
                x: startX,
                y: startY,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                life: 0,
                maxLife: 40 + Math.random() * 20,
            });
        };

        const nearestPairs = () => {
            // Only connect within the "near" layer, only true nearest neighbors,
            // only if close enough — keeps constellations sparse and deliberate.
            const near = stars.filter((s) => s.layer === 2);
            const maxDist = Math.min(width, height) * 0.12;
            const pairs: [Star, Star][] = [];
            near.forEach((s, i) => {
                let closest: Star | null = null;
                let closestDist = maxDist;
                near.forEach((other, j) => {
                    if (i === j) return;
                    const d = Math.hypot(s.x - other.x, s.y - other.y);
                    if (d < closestDist) {
                        closestDist = d;
                        closest = other;
                    }
                });
                if (closest) pairs.push([s, closest]);
            });
            return pairs;
        };

        const drawFrame = (animated: boolean) => {
            ctx.fillStyle = BACKGROUND;
            ctx.fillRect(0, 0, width, height);

            // Single faint nebula haze, off-center, for depth without noise
            const nebulaGradient = ctx.createRadialGradient(
                width * 0.72,
                height * 0.28,
                0,
                width * 0.72,
                height * 0.28,
                Math.max(width, height) * 0.55
            );
            nebulaGradient.addColorStop(0, NEBULA);
            nebulaGradient.addColorStop(1, "rgba(76, 63, 148, 0)");
            ctx.fillStyle = nebulaGradient;
            ctx.fillRect(0, 0, width, height);

            // Constellation lines (drawn before stars so stars sit on top)
            const pairs = nearestPairs();
            ctx.strokeStyle = "rgba(180, 190, 220, 0.12)";
            ctx.lineWidth = 1;
            pairs.forEach(([a, b]) => {
                ctx.beginPath();
                ctx.moveTo(a.x, a.y);
                ctx.lineTo(b.x, b.y);
                ctx.stroke();
            });

            stars.forEach((s) => {
                const cfg = LAYER_CONFIG[s.layer];
                if (animated) {
                    s.x = s.baseX + Math.cos(s.driftAngle) * 6;
                    s.y = s.baseY + Math.sin(s.driftAngle) * 6;
                    s.driftAngle += cfg.speed;
                }
                const twinkle = animated
                    ? 0.5 + 0.5 * Math.sin(time * s.twinkleSpeed + s.twinkleOffset)
                    : 0.75;
                const opacity = cfg.opacity * (0.4 + twinkle * 0.6);

                ctx.fillStyle = `rgba(235, 238, 250, ${opacity})`;
                ctx.beginPath();
                ctx.arc(s.x, s.y, s.radius, 0, Math.PI * 2);
                ctx.fill();

                // subtle glow only for the near layer's brighter stars
                if (s.layer === 2) {
                    ctx.fillStyle = `rgba(180, 195, 255, ${opacity * 0.15})`;
                    ctx.beginPath();
                    ctx.arc(s.x, s.y, s.radius * 3, 0, Math.PI * 2);
                    ctx.fill();
                }
            });

            if (animated) {
                shootingStars.forEach((ss) => {
                    ss.x += ss.vx;
                    ss.y += ss.vy;
                    ss.life += 1;

                    const fade = 1 - ss.life / ss.maxLife;
                    const tailX = ss.x - ss.vx * 3.5;
                    const tailY = ss.y - ss.vy * 3.5;

                    const gradient = ctx.createLinearGradient(
                        ss.x,
                        ss.y,
                        tailX,
                        tailY
                    );
                    gradient.addColorStop(0, `rgba(255, 255, 255, ${fade})`);
                    gradient.addColorStop(1, "rgba(255, 255, 255, 0)");
                    ctx.strokeStyle = gradient;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(ss.x, ss.y);
                    ctx.lineTo(tailX, tailY);
                    ctx.stroke();
                });
                shootingStars = shootingStars.filter(
                    (ss) =>
                        ss.life < ss.maxLife &&
                        ss.x < width + 50 &&
                        ss.y < height + 50
                );
            }
        };

        const animate = () => {
            time += 16;

            if (time >= nextShootingStarAt) {
                spawnShootingStar();
                scheduleNextShootingStar();
            }

            drawFrame(true);
            animationFrameId = requestAnimationFrame(animate);
        };

        const handleResize = () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                resizeCanvas();
                initStars();
                if (prefersReducedMotion) drawFrame(false);
            }, 150);
        };

        resizeCanvas();
        initStars();

        if (prefersReducedMotion) {
            drawFrame(false);
        } else {
            scheduleNextShootingStar();
            animate();
        }

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
            clearTimeout(resizeTimeout);
            cancelAnimationFrame(animationFrameId);
        };
    }, []);

    return (
        <canvas
            ref={canvasRef}
            className="pointer-events-none absolute inset-0 z-0 h-full w-full"
        />
    );
};