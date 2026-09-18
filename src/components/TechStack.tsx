"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import type { IconType } from "react-icons";
import { FaGitAlt, FaJava, FaPython, FaReact } from "react-icons/fa";
import {
  SiAndroidstudio,
  SiCss,
  SiDocker,
  SiFirebase,
  SiGithub,
  SiHibernate,
  SiHtml5,
  SiJavascript,
  SiKotlin,
  SiMysql,
  SiPostman,
  SiSpringboot,
  SiSpringsecurity,
  SiTypescript,
} from "react-icons/si";
import { TbApi } from "react-icons/tb";
import { cn } from "@/lib/utils";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { TECH_CATEGORIES, TECH_STACK, type TechCategory } from "@/lib/data";

const ICONS: Record<string, IconType> = {
  java: FaJava,
  python: FaPython,
  kotlin: SiKotlin,
  typescript: SiTypescript,
  javascript: SiJavascript,
  react: FaReact,
  html: SiHtml5,
  css: SiCss,
  springboot: SiSpringboot,
  springsecurity: SiSpringsecurity,
  hibernate: SiHibernate,
  rest: TbApi,
  mysql: SiMysql,
  git: FaGitAlt,
  github: SiGithub,
  docker: SiDocker,
  postman: SiPostman,
  androidstudio: SiAndroidstudio,
  firebase: SiFirebase,
};

const FALLBACK_ICON: IconType = TbApi;

type Filter = "All" | TechCategory;

export function TechStack() {
  const [filter, setFilter] = useState<Filter>("All");
  const [hovered, setHovered] = useState<string | null>(null);

  const filtered = useMemo(
    () => (filter === "All" ? TECH_STACK : TECH_STACK.filter((t) => t.category === filter)),
    [filter],
  );

  return (
    <section id="skills" className="relative scroll-mt-24 border-y border-white/[0.06] bg-surface-800/30 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            overline="tech stack"
            title={
              <>
                Engineering <span className="text-gradient">Toolbox</span>
              </>
            }
            sub="The languages, frameworks and tools I reach for when turning requirements into working software — filter by category."
          />
          <Reveal delay={0.15} y={16}>
            <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted">
              {`//`} hover a card to reveal proficiency
            </p>
          </Reveal>
        </div>

        {/* Filter bar */}
        <Reveal delay={0.1} y={18}>
          <div className="no-scrollbar mt-10 flex gap-2 overflow-x-auto pb-1" role="tablist" aria-label="Filter technologies">
            {TECH_CATEGORIES.map((cat) => {
              const count = cat === "All" ? TECH_STACK.length : TECH_STACK.filter((t) => t.category === cat).length;
              return (
                <button
                  key={cat}
                  type="button"
                  role="tab"
                  aria-selected={filter === cat}
                  onClick={() => setFilter(cat)}
                  data-cursor="button"
                  className={cn(
                    "relative shrink-0 rounded-full border px-4 py-2 font-mono text-xs transition-colors duration-300",
                    filter === cat
                      ? "border-transparent text-white"
                      : "border-white/10 bg-white/[0.03] text-ink-muted hover:border-primary/40 hover:text-white",
                  )}
                >
                  {filter === cat && (
                    <motion.span
                      layoutId="tech-filter-pill"
                      className="absolute inset-0 rounded-full bg-gradient-to-r from-primary to-accent"
                      transition={{ type: "spring", stiffness: 350, damping: 30 }}
                    />
                  )}
                  <span className="relative flex items-center gap-1.5">
                    {cat}
                    <span className={cn("font-mono text-[10px]", filter === cat ? "text-white/70" : "text-ink-muted/60")}>
                      {count}
                    </span>
                  </span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* Grid */}
        <motion.div layout className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          <AnimatePresence mode="popLayout">
            {filtered.map((tech) => {
              const Icon = ICONS[tech.icon] ?? FALLBACK_ICON;
              const isHovered = hovered === tech.name;
              return (
                <motion.article
                  key={tech.name}
                  layout
                  initial={{ opacity: 0, scale: 0.92 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.92 }}
                  transition={{ duration: 0.35, ease: [0.21, 0.47, 0.32, 0.98] }}
                  onHoverStart={() => setHovered(tech.name)}
                  onHoverEnd={() => setHovered(null)}
                  onFocus={() => setHovered(tech.name)}
                  onBlur={() => setHovered(null)}
                  data-cursor="card"
                  className={cn(
                    "group relative overflow-hidden rounded-2xl border p-5 transition-all duration-300",
                    isHovered
                      ? "border-primary/40 bg-surface-700/70 shadow-glow-primary"
                      : "border-white/[0.07] bg-surface-800/50",
                  )}
                >
                  <div className="flex items-start justify-between">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-ink-soft transition-colors duration-300 group-hover:border-primary/30 group-hover:text-primary-light">
                      <Icon size={19} />
                    </span>
                    <span className="font-mono text-[10px] uppercase tracking-wider text-ink-muted/60">
                      {tech.category}
                    </span>
                  </div>

                  <h3 className="mt-4 font-heading text-base font-semibold text-white">{tech.name}</h3>

                  <div className="mt-3">
                    <div className="flex items-center justify-between font-mono text-[10px]">
                      <span className="text-ink-muted">proficiency</span>
                      <span className={cn("transition-colors", isHovered ? "text-accent" : "text-ink-muted/70")}>
                        {tech.levelLabel}
                      </span>
                    </div>
                    <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-white/[0.06]">
                      <motion.div
                        initial={{ width: 0 }}
                        whileInView={{ width: `${tech.level}%` }}
                        viewport={{ once: true, margin: "-40px" }}
                        transition={{ duration: 1, delay: 0.1, ease: "easeOut" }}
                        className="h-full rounded-full bg-gradient-to-r from-primary via-primary-light to-accent"
                      />
                    </div>
                  </div>

                  <div className={cn("mt-3 grid transition-all duration-300", isHovered ? "opacity-100" : "opacity-0")}>
                    <div className="flex flex-wrap gap-1.5">
                      {tech.usage.slice(0, 2).map((u) => (
                        <Badge key={u} variant="primary" className="px-2 py-0.5 text-[10px]">
                          {u}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}