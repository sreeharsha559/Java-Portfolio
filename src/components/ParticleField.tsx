"use client";

import { useEffect, useRef } from "react";

interface ParticleFieldProps {
  className?: string;
  density?: number;
  color?: string;
}

/** Lightweight canvas particle field — 60fps, DPR-capped, pauses offscreen,
 *  respects prefers-reduced-motion. Preferred over three.js for weight. */
export function ParticleField({
  className,
  density = 0.055,
  color = "96, 165, 250",
}: ParticleFieldProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let width = 0;
    let height = 0;
    let raf = 0;
    let particles: { x: number; y: number; r: number; vx: number; vy: number; a: number; tw: number }[] =
      [];
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.max(24, Math.min(110, Math.floor(width * height * density * 0.001)));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: 0.6 + Math.random() * 1.6,
        vx: (Math.random() - 0.5) * 0.15,
        vy: -(0.05 + Math.random() * 0.22),
        a: 0.15 + Math.random() * 0.5,
        tw: Math.random() * Math.PI * 2,
      }));
    };

    const draw = (scrollOffset: number) => {
      ctx.clearRect(0, 0, width, height);
      ctx.globalCompositeOperation = "lighter";
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.x += p.vx;
        p.y += p.vy + scrollOffset;
        p.tw += 0.02;
        if (p.y < -20) {
          p.y = height + 20;
          p.x = Math.random() * width;
        }
        if (p.x < -20) p.x = width + 20;
        if (p.x > width + 20) p.x = -20;
        const alpha = p.a * (0.6 + 0.4 * Math.sin(p.tw));
        ctx.beginPath();
        ctx.fillStyle = `rgba(${color}, ${alpha.toFixed(3)})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
    };

    resize();
    if (reduced) {
      draw(0);
      return;
    }

    // pause when offscreen
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(canvas);

    let scrollFactor = 0;
    const onScroll = () => {
      scrollFactor = (window.scrollY * 0.0006) % 1;
    };

    const tick = () => {
      if (visible) {
        draw(scrollFactor);
        raf = requestAnimationFrame(tick);
      } else {
        raf = requestAnimationFrame(tick);
      }
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("scroll", onScroll, { passive: true });

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      ro.disconnect();
      window.removeEventListener("scroll", onScroll);
    };
  }, [density, color]);

  return <canvas ref={canvasRef} className={className} aria-hidden />;
}