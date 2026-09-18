"use client";

import { motion } from "framer-motion";
import { RiBriefcaseLine, RiCheckDoubleLine } from "react-icons/ri";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { EXPERIENCE } from "@/lib/data";

export function Experience() {
  return (
    <section id="experience" className="relative scroll-mt-24 border-y border-white/[0.06] bg-surface-800/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <SectionHeading
          overline="experience"
          title="Where I've Shipped"
          sub="One internship, a lot of production-grade habits — real code, real repositories, real feedback loops."
        />

        <div className="relative mt-14">
          {/* rail */}
          <motion.div
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 1.2, ease: "easeOut" }}
            className="absolute left-4 top-0 h-full w-px origin-top bg-gradient-to-b from-primary via-primary/50 to-transparent lg:left-6"
            aria-hidden
          />

          {EXPERIENCE.map((exp) => (
            <Reveal key={`${exp.role}-${exp.company}`} y={32} className="relative pl-14 lg:pl-20">
              {/* dot */}
              <span className="absolute left-4 top-8 lg:left-6" aria-hidden>
                <span className="absolute -left-2 -top-2 h-6 w-6 animate-pulse-ring rounded-full bg-primary/30" />
                <span className="relative flex h-2.5 w-2.5 rounded-full bg-primary shadow-[0_0_14px_rgba(59,130,246,0.9)]" />
              </span>

              <article className="group relative mt-0 overflow-hidden rounded-2xl border border-white/[0.08] bg-surface-900/60 p-6 backdrop-blur-sm transition-all duration-500 hover:border-primary/40 hover:shadow-glow-primary sm:p-8">
                <div
                  aria-hidden
                  className="pointer-events-none absolute right-0 top-0 h-40 w-40 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-30"
                  style={{ background: "radial-gradient(circle, rgba(59,130,246,0.5), transparent 70%)" }}
                />
                <div className="flex flex-wrap items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary-light">
                    <RiBriefcaseLine size={18} />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-white sm:text-xl">{exp.role}</h3>
                    <p className="font-mono text-xs text-primary-light">{exp.company}</p>
                  </div>
                  <Badge variant="accent" className="ml-auto">
                    {exp.period}
                  </Badge>
                </div>

                <p className="mt-4 max-w-2xl leading-relaxed text-ink-muted">{exp.tagline}</p>

                <ul className="mt-6 grid gap-3 sm:grid-cols-2">
                  {exp.highlights.map((h) => (
                    <li key={h} className="flex gap-2.5 text-sm leading-snug text-ink-soft">
                      <RiCheckDoubleLine size={16} className="mt-0.5 shrink-0 text-accent" />
                      {h}
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex flex-wrap gap-2 border-t border-white/[0.06] pt-5">
                  {exp.skills.map((s) => (
                    <Badge key={s} variant="primary">
                      {s}
                    </Badge>
                  ))}
                </div>
              </article>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}