"use client";

import { cn } from "@/lib/utils";

interface AuroraBackgroundProps {
  className?: string;
}

/** Animated blueprint grid + floating gradient light blobs. Pure CSS — 60fps cheap. */
export function AuroraBackground({ className }: AuroraBackgroundProps) {
  return (
    <div className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)} aria-hidden>
      <div className="grid-bg absolute inset-0 [mask-image:radial-gradient(ellipse_80%_70%_at_50%_40%,black,transparent_75%)]" />
      <div className="absolute -top-40 left-1/4 h-[480px] w-[480px] animate-aurora rounded-full bg-primary/20 blur-[140px]" />
      <div className="absolute right-[8%] top-[12%] h-[420px] w-[420px] animate-aurora rounded-full bg-accent/15 blur-[140px] [animation-delay:-8s]" />
      <div className="absolute bottom-[5%] left-[12%] h-[360px] w-[360px] animate-aurora rounded-full bg-primary/10 blur-[130px] [animation-delay:-14s]" />
    </div>
  );
}

interface DividerProps {
  className?: string;
  label?: string;
}

/** Clean section divider with a soft line + optional mono label. */
export function Divider({ className, label }: DividerProps) {
  return (
    <div className={cn("relative mx-auto flex max-w-6xl items-center gap-4 px-6", className)} aria-hidden>
      <div className="h-px flex-1 bg-gradient-to-r from-transparent via-white/10 to-white/5" />
      {label && <span className="font-mono text-[10px] uppercase tracking-[0.3em] text-ink-muted/70">{label}</span>}
      <div className="h-px flex-1 bg-gradient-to-l from-transparent via-white/10 to-white/5" />
    </div>
  );
}