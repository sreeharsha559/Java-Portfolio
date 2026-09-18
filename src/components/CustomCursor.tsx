"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { cn } from "@/lib/utils";

type CursorVariant = "default" | "link" | "button" | "card" | "image";

export default function CustomCursor() {
  const reduce = useReducedMotion();
  const [variant, setVariant] = useState<CursorVariant>("default");
  const [enabled, setEnabled] = useState(false);
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const snapped = useRef(false);

  useEffect(() => {
    const fine = window.matchMedia("(pointer: fine)").matches;
    if (!fine || reduce) return;
    setEnabled(true);

    const onMove = (e: PointerEvent) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (!snapped.current) {
        ring.current.x = e.clientX;
        ring.current.y = e.clientY;
        snapped.current = true;
      }
      if (!document.documentElement.classList.contains("custom-cursor-on")) {
        document.documentElement.classList.add("custom-cursor-on");
      }
    };

    const onOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement)?.closest?.("[data-cursor]") as HTMLElement | null;
      if (target?.dataset.cursor) setVariant(target.dataset.cursor as CursorVariant);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerover", onOver, { passive: true });

    let raf = 0;
    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.16;
      ring.current.y += (pos.current.y - ring.current.y) * 0.16;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) translate(-50%, -50%)`;
      }
      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ring.current.x}px, ${ring.current.y}px, 0) translate(-50%, -50%)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerover", onOver);
      cancelAnimationFrame(raf);
      document.documentElement.classList.remove("custom-cursor-on");
    };
  }, [reduce]);

  if (!enabled) return null;

  const isButton = variant === "button";

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[9999] hidden md:block">
      <div
        ref={dotRef}
        className={cn(
          "absolute top-0 left-0 h-[7px] w-[7px] rounded-full bg-accent shadow-[0_0_12px_rgba(56,189,248,0.9)] transition-opacity duration-200",
          variant === "link" && "opacity-40",
          isButton && "opacity-0",
        )}
      />
      <div
        ref={ringRef}
        className={cn(
          "absolute top-0 left-0 flex items-center justify-center rounded-full border will-change-transform transition-[width,height,background-color,border-color,opacity] duration-300 ease-out",
          // size
          variant === "default" && "h-9 w-9",
          variant === "link" && "h-12 w-12",
          isButton && "h-8 w-8",
          variant === "card" && "h-20 w-20",
          variant === "image" && "h-16 w-16",
          // fill
          variant === "default" && "border-accent/50 bg-transparent",
          variant === "link" && "border-accent/80 bg-accent/10 backdrop-blur-sm",
          isButton && "border-primary/80 bg-primary/90",
          variant === "card" && "border-accent/60 bg-accent/5 backdrop-blur-[1px]",
          variant === "image" && "border-primary/70 bg-primary/10 backdrop-blur-sm",
        )}
      >
        <span
          className={cn(
            "font-mono font-semibold transition-[opacity,color] duration-200",
            variant === "default" && "text-accent opacity-0",
            variant === "link" && "text-accent opacity-100",
            isButton && "text-white opacity-100",
            variant === "card" && "text-2xl text-accent",
            variant === "image" && "text-accent opacity-100",
          )}
        >
          {isButton ? "→" : "↗"}
        </span>
      </div>
    </div>
  );
}