"use client";

import type { IconType } from "react-icons";
import { motion } from "framer-motion";
import { FaTrophy, FaFlag, FaRocket, FaMedal } from "react-icons/fa6";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { ACHIEVEMENTS } from "@/lib/data";
import { cn } from "@/lib/utils";

const ICONS: Record<string, IconType> = {
  trophy: FaTrophy,
  flag: FaFlag,
  rocket: FaRocket,
  medal: FaMedal,
};

export function Achievements() {
  return (
    <section id="achievements" className="relative scroll-mt-24 border-y border-white/[0.06] bg-surface-800/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          overline="achievements"
          title="Proof of Work Under Pressure"
          sub="Competitions, coordination and national hackathons — outcomes measured against the clock, not just grades."
        />

        <div className="mt-14 grid gap-5 md:grid-cols-2">
          {ACHIEVEMENTS.map((a, i) => {
            const Icon = ICONS[a.icon] ?? FaTrophy;
            const featured = a.featured;
            return (
              <Reveal
                key={a.title}
                y={30}
                delay={i * 0.06}
                className={cn(featured && "md:col-span-2")}
              >
                <motion.article
                  data-cursor="card"
                  whileHover={{ y: -6 }}
                  transition={{ duration: 0.3, ease: [0.21, 0.47, 0.32, 0.98] }}
                  className={cn(
                    "group relative flex h-full flex-col overflow-hidden rounded-2xl border p-6 transition-colors duration-500 sm:p-8",
                    featured
                      ? "border-primary/30 bg-gradient-to-br from-primary/15 via-surface-800/60 to-surface-900/80 shadow-glow-primary"
                      : "border-white/[0.08] bg-surface-900/50 hover:border-accent/30",
                  )}
                >
                  {featured && (
                    <div
                      aria-hidden
                      className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-primary/25 blur-3xl"
                    />
                  )}
                  <div className="relative flex flex-1 flex-col gap-5 sm:flex-row sm:items-center">
                    <span
                      className={cn(
                        "flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl transition-all duration-500",
                        featured
                          ? "bg-gradient-to-br from-primary to-accent text-white shadow-glow"
                          : "border border-white/10 bg-white/[0.04] text-primary-light group-hover:text-accent",
                      )}
                    >
                      <Icon size={26} />
                    </span>
                    <div className="flex-1">
                      <p
                        className={cn(
                          "font-mono text-sm font-bold tracking-[0.2em] uppercase",
                          featured ? "text-accent" : "text-primary-light",
                        )}
                      >
                        {a.placement}
                      </p>
                      <h3 className="mt-1 font-heading text-xl font-bold text-white">{a.title}</h3>
                      <p className="mt-2 max-w-2xl text-sm leading-relaxed text-ink-muted">{a.note}</p>
                    </div>
                    <span
                      aria-hidden
                      className="hidden font-heading text-5xl font-bold text-white/[0.06] sm:block"
                    >
                      0{i + 1}
                    </span>
                  </div>
                </motion.article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}