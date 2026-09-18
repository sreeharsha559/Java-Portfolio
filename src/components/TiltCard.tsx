"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useMotionValue,
  useSpring,
  useMotionTemplate,
  useReducedMotion,
} from "framer-motion";
import { cn } from "@/lib/utils";

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  intensity?: number;
  glowColor?: string;
  cursorType?: "card" | "image";
}

/** 3D tilt on pointer move + a radial glow that follows the cursor. */
export function TiltCard({
  children,
  className,
  intensity = 9,
  glowColor = "rgba(56,189,248,0.35)",
  cursorType = "card",
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  const rx = useMotionValue(0);
  const ry = useMotionValue(0);
  const glowX = useMotionValue(50);
  const glowY = useMotionValue(50);

  const srx = useSpring(rx, { stiffness: 180, damping: 16, mass: 0.5 });
  const sry = useSpring(ry, { stiffness: 180, damping: 16, mass: 0.5 });
  const background = useMotionTemplate`radial-gradient(circle at ${glowX}% ${glowY}%, ${glowColor}, transparent 55%)`;

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || reduce) return;
    const rect = el.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    ry.set((px - 0.5) * intensity * 2);
    rx.set(-(py - 0.5) * intensity * 2);
    glowX.set(px * 100);
    glowY.set(py * 100);
  };

  const onLeave = () => {
    rx.set(0);
    ry.set(0);
    glowX.set(50);
    glowY.set(50);
  };

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      data-cursor={cursorType}
      style={{ rotateX: srx, rotateY: sry, transformStyle: "preserve-3d", perspective: 1000 }}
      className={cn("relative will-change-transform", className)}
    >
      <motion.div
        aria-hidden
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0 transition-opacity duration-300 group-hover:opacity-100"
        style={{ background }}
      />
      {children}
    </motion.div>
  );
}