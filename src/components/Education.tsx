"use client";

import { motion } from "framer-motion";
import { RiGraduationCapLine } from "react-icons/ri";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { EDUCATION } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Education() {
  return (
    <section id="education" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        overline="education"
        title="The Road Here"
        sub="From first Hello World to a degree in Computer Science — each milestone sharpened the aim."
      />

      <div className="relative mt-14 max-w-3xl">
        {/* central rail */}
        <motion.div
          initial={{ scaleY: 0 }}
          whileInView={{ scaleY: 1 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          className="absolute left-[22px] top-0 h-full w-px origin-top bg-gradient-to-b from-primary via-accent/50 to-transparent sm:left-1/2 sm:-translate-x-1/2"
          aria-hidden
        />

        <div className="space-y-10">
          {EDUCATION.map((item, i) => {
            const left = i % 2 === 1;
            return (
              <Reveal key={item.stage} y={30} className="relative">
                {/* milestone node */}
                <span
                  className="absolute left-[22px] top-6 z-10 -translate-x-1/2 sm:left-1/2"
                  aria-hidden
                >
                  <span className="relative flex h-11 w-11 items-center justify-center rounded-full border border-accent/40 bg-surface-800 shadow-glow">
                    <RiGraduationCapLine size={17} className="text-accent" />
                    <span className="absolute inset-0 animate-pulse-ring rounded-full border border-accent/30" />
                  </span>
                </span>

                <article
                  className={cn(
                    "ml-12 rounded-2xl border p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 sm:ml-0 sm:w-[calc(50%-3rem)]",
                    item.featured
                      ? "border-primary/40 bg-surface-800/80 shadow-glow-primary hover:shadow-glow"
                      : "border-white/[0.08] bg-surface-800/50 hover:border-white/20",
                    left ? "sm:ml-auto" : "sm:mr-auto",
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-accent">
                        milestone 0{i + 1}
                      </p>
                      <h3 className={cn("mt-2 font-heading text-lg font-bold", item.featured ? "text-white" : "text-white")}>
                        {item.stage}
                      </h3>
                      <p className="mt-0.5 font-mono text-xs text-ink-muted">{item.place}</p>
                    </div>
                    {item.featured && (
                      <Badge variant="primary" className="shrink-0">
                        {item.score}
                      </Badge>
                    )}
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{item.detail}</p>
                  <p className="mt-3 font-mono text-[11px] text-primary-light">
                    <span className="mr-1 text-ink-muted/60">{`//`}</span>
                    {item.period}
                  </p>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}