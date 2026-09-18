"use client";

import { motion } from "framer-motion";
import { Counter } from "@/components/Counter";
import { STATS } from "@/lib/data";

/** Animated stat strip that sits under the hero. */
export function Stats() {
  const ease = [0.21, 0.47, 0.32, 0.98] as const;

  return (
    <div className="relative z-[2] border-t border-white/[0.06]">
      <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px px-5 py-12 sm:px-8 md:grid-cols-4">
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 + i * 0.1, ease }}
            className="group relative px-2 py-6 text-center sm:px-6"
          >
            <div className="font-heading text-4xl font-bold tracking-tight text-white sm:text-5xl">
              <Counter value={stat.value} suffix={stat.suffix} decimals={stat.decimals} />
            </div>
            <p className="mt-2 text-sm font-medium text-ink-soft sm:text-base">{stat.label}</p>
            <p className="mt-1 hidden font-mono text-[11px] text-ink-muted/70 sm:block">{stat.sub}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}