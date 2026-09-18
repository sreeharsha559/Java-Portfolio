"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { PROFILE } from "@/lib/data";

const CANDIDATES = [
  "/images/hero-portrait.webp",
  "/images/hero-portrait.png",
  "/images/hero-portrait.jpg",
];

type PortraitState =
  | { status: "loading" }
  | { status: "ready"; src: string }
  | { status: "fallback" };

/** Portrait loader with a graceful "HS" monogram fallback until the
 *  owner drops their photo into /public/images/ (see that folder's README). */
export function Portrait({ className }: { className?: string }) {
  const [state, setState] = useState<PortraitState>({ status: "loading" });

  useEffect(() => {
    let cancelled = false;
    let found = false;
    let i = 0;
    const tryNext = () => {
      if (cancelled) return;
      if (found) return;
      if (i >= CANDIDATES.length) {
        setState({ status: "fallback" });
        return;
      }
      const img = new Image();
      img.src = CANDIDATES[i];
      img.onload = () => {
        if (cancelled || found) return;
        found = true;
        setState({ status: "ready", src: CANDIDATES[i] });
      };
      img.onerror = () => {
        i += 1;
        tryNext();
      };
    };
    tryNext();
    return () => {
      cancelled = true;
    };
  }, []);

  if (state.status === "loading") {
    return <div className={className} aria-busy="true" />;
  }

  if (state.status === "fallback") {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0, scale: 0.92 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
      >
        <div className="relative flex aspect-square w-full items-center justify-center overflow-hidden rounded-[2rem] border border-white/10 bg-gradient-to-br from-surface-700 via-surface-800 to-surface-900 shadow-card">
          <div className="portrait-glow absolute inset-0" aria-hidden />
          <span className="animate-float-slow font-heading text-[7rem] font-bold text-white/90 drop-shadow-[0_0_30px_rgba(56,189,248,0.4)] sm:text-[8rem]">
            {PROFILE.monogram}
          </span>
          <span className="absolute bottom-6 font-mono text-[10px] uppercase tracking-[0.4em] text-ink-muted">
            {PROFILE.role}
          </span>
        </div>
      </motion.div>
    );
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, scale: 0.94 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.9, ease: [0.21, 0.47, 0.32, 0.98] }}
    >
      <div className="relative aspect-square w-full overflow-hidden rounded-[2rem] border border-white/10 bg-surface-800/40 shadow-card">
        {/* Edge dissolve so even non-transparent photos melt into the dark theme */}
        {/* eslint-disable-next-line @next/next/no-img-element -- runtime-selected user asset, next/image can't resolve candidates */}
        <img
          src={state.src}
          alt={`Portrait of ${PROFILE.name}, ${PROFILE.role}`}
          loading="eager"
          decoding="async"
          fetchPriority="high"
          draggable={false}
          className="absolute inset-0 z-10 h-full w-full object-cover [mask-image:radial-gradient(ellipse_72%_72%_at_50%_46%,black_48%,transparent_76%)]"
        />
        <div className="portrait-glow absolute inset-0 z-0" aria-hidden />
        <div
          aria-hidden
          className="absolute inset-0 z-20 rounded-[2rem] ring-1 ring-inset ring-accent/15 [background:radial-gradient(ellipse_at_center,transparent_58%,rgba(5,8,22,0.55))]"
        />
      </div>
    </motion.div>
  );
}