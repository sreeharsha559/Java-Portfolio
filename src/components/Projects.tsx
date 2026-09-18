"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FaGithub } from "react-icons/fa";
import { RiArrowDownSLine, RiCheckLine } from "react-icons/ri";
import { TbExternalLink } from "react-icons/tb";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { TiltCard } from "@/components/TiltCard";
import { Badge } from "@/components/ui/badge";
import { SafeStridePhone, QueueFlowDashboard } from "@/components/ProjectMockups";
import { PROJECTS, type Project } from "@/lib/data";
import { cn } from "@/lib/utils";

export function Projects() {
  return (
    <section id="projects" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        overline="projects"
        title={
          <>
            Products, not <span className="text-gradient">homework</span>
          </>
        }
        sub="Startup-style builds that solve real problems — from mobile safety hardware-adjacent software to realtime queue systems at scale."
      />

      <div className="mt-16 space-y-24 lg:space-y-32">
        {PROJECTS.map((project, i) => (
          <ProjectShowcase key={project.id} project={project} reverse={i % 2 === 1} />
        ))}
      </div>
    </section>
  );
}

function ProjectShowcase({ project, reverse }: { project: Project; reverse: boolean }) {
  const [detailsOpen, setDetailsOpen] = useState(false);

  return (
    <Reveal y={40}>
      <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
        {/* ---------- Visual ---------- */}
        <div className={cn(reverse ? "lg:order-2" : "lg:order-1")}>
          <TiltCard glowColor={project.accentSoft} intensity={7} cursorType="image">
            <div className="group relative">
              <div
                className="absolute inset-0 -z-10 mx-auto my-auto h-3/4 w-3/4 rounded-full opacity-30 blur-3xl"
                style={{ background: `radial-gradient(circle, ${project.accentSoft}, transparent 65%)` }}
                aria-hidden
              />
              <div className="animate-float-slow will-change-transform">
                {project.id === "safestride" ? <SafeStridePhone /> : <QueueFlowDashboard />}
              </div>
            </div>
          </TiltCard>
        </div>

        {/* ---------- Copy ---------- */}
        <div className={cn(reverse ? "lg:order-1" : "lg:order-2")}>
          <div className="flex items-center gap-4">
            <span className="font-heading text-5xl font-bold text-transparent [-webkit-text-stroke:1px_rgba(148,163,184,0.25)] sm:text-6xl">
              {project.index}
            </span>
            <span className="font-mono text-xs text-ink-muted">
              {project.year} · {project.tech.length} technologies
            </span>
          </div>

          <h3 className="mt-3 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl">
            {project.name}
          </h3>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.25em]" style={{ color: project.accent }}>
            {project.tagline}
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-ink-soft">{project.description}</p>

          <div className="mt-6 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <span
                key={t}
                className="rounded-full border px-3 py-1 font-mono text-[11px]"
                style={{ borderColor: project.accentSoft, background: project.accentSoft, color: "#E0F2FE" }}
              >
                {t}
              </span>
            ))}
          </div>

          {/* feature highlights */}
          <ul className="mt-7 grid gap-3 sm:grid-cols-2">
            {project.features.slice(0, 4).map((f) => (
              <li key={f.label} className="flex items-start gap-2.5">
                <span
                  className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full"
                  style={{ background: project.accentSoft }}
                >
                  <RiCheckLine size={12} style={{ color: project.accent }} />
                </span>
                <div>
                  <p className="text-sm font-semibold text-white">{f.label}</p>
                  <p className="text-[11px] leading-snug text-ink-muted">{f.detail}</p>
                </div>
              </li>
            ))}
          </ul>

          {/* actions */}
          <div className="mt-8 flex flex-wrap items-center gap-3">
            <Magnetic>
              <button
                type="button"
                onClick={() => setDetailsOpen((v) => !v)}
                data-cursor="button"
                aria-expanded={detailsOpen}
                className="inline-flex h-11 items-center gap-2 rounded-full border border-white/15 px-5 font-semibold text-white/90 backdrop-blur transition hover:border-white/40 hover:text-white"
              >
                {detailsOpen ? "Hide Details" : "View Details"}
                <motion.span animate={{ rotate: detailsOpen ? 180 : 0 }}>
                  <RiArrowDownSLine size={16} />
                </motion.span>
              </button>
            </Magnetic>
            <Magnetic strength={0.25}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="button"
                className="inline-flex h-11 items-center gap-2 rounded-full border border-primary/40 bg-primary/10 px-5 font-semibold text-primary-light transition hover:bg-primary/20"
              >
                <FaGithub size={15} />
                GitHub
              </a>
            </Magnetic>
            {project.demo ? (
              <Magnetic strength={0.25}>
                <a
                  href={project.demo}
                  target="_blank"
                  rel="noopener noreferrer"
                  data-cursor="button"
                  className="inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-5 font-semibold text-white shadow-glow-primary transition hover:-translate-y-0.5"
                >
                  Live Demo
                  <TbExternalLink size={15} />
                </a>
              </Magnetic>
            ) : (
              <span
                className="inline-flex h-11 items-center gap-2 rounded-full border border-dashed border-white/20 px-5 font-semibold text-ink-muted/70"
                title="Live demo URL not deployed yet — wire it in src/lib/data.ts"
              >
                Live Demo
                <Badge variant="outline" className="px-1.5 py-0 text-[9px]">soon</Badge>
              </span>
            )}
          </div>

          <AnimatePresence initial={false}>
            {detailsOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: [0.21, 0.47, 0.32, 0.98] }}
                className="overflow-hidden"
              >
                <div className="mt-6 rounded-2xl border border-white/[0.08] bg-surface-800/50 p-5">
                  <p className="font-mono text-[11px] uppercase tracking-[0.25em]" style={{ color: project.accent }}>
                    What I built
                  </p>
                  <ul className="mt-3 space-y-2">
                    {project.built.map((item) => (
                      <li key={item} className="flex gap-2.5 text-sm text-ink-soft">
                        <span className="mt-2 h-1 w-1 shrink-0 rounded-full" style={{ background: project.accent }} />
                        {item}
                      </li>
                    ))}
                  </ul>
                  {project.features.length > 4 && (
                    <div className="mt-4 grid gap-2 border-t border-white/[0.06] pt-4 sm:grid-cols-2">
                      {project.features.slice(4).map((f) => (
                        <p key={f.label} className="text-xs text-ink-muted">
                          <span className="font-semibold text-white">{f.label}</span> — {f.detail}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </Reveal>
  );
}