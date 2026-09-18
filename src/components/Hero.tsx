"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { motion, useReducedMotion } from "framer-motion";
import { FaDownload, FaJava, FaReact } from "react-icons/fa";
import { SiKotlin, SiSpringboot } from "react-icons/si";
import { AuroraBackground } from "@/components/AuroraBackground";
import { ParticleField } from "@/components/ParticleField";
import { Portrait } from "@/components/Portrait";
import { Magnetic } from "@/components/Magnetic";
import { Stats } from "@/components/Stats";
import { PROFILE } from "@/lib/data";
import { scrollToId } from "@/lib/utils";

const CHIPS = [
  { icon: FaJava, label: "Java", delay: "0s" },
  { icon: SiSpringboot, label: "Spring Boot", delay: "1.2s" },
  { icon: FaReact, label: "React", delay: "2s" }
  // { icon: SiKotlin, label: "Kotlin", delay: "0.6s" },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const chipsRef = useRef<HTMLDivElement>(null);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (reduce || !sectionRef.current) return;
    gsap.registerPlugin(ScrollTrigger);
    const ctx = gsap.context(() => {
      const trigger = sectionRef.current;
      const st = {
        trigger,
        start: "top top",
        end: "bottom top",
        scrub: 0.8,
      };
      gsap.to(sceneRef.current, { yPercent: 16, ease: "none", scrollTrigger: { ...st, invalidateOnRefresh: true } });
      gsap.to(chipsRef.current, {
        yPercent: -28,
        ease: "none",
        scrollTrigger: { ...st, invalidateOnRefresh: true },
      });
    }, sectionRef);
    return () => ctx.revert();
  }, [reduce]);

  const ease = [0.21, 0.47, 0.32, 0.98] as const;

  return (
    <section id="home" ref={sectionRef} className="relative overflow-hidden">
      <AuroraBackground />
      <ParticleField className="absolute inset-0 z-[1] h-full w-full" />

      <div className="relative z-[2] mx-auto flex min-h-screen max-w-7xl flex-col justify-center px-5 pb-28 pt-28 sm:px-8 lg:pt-32">
        <div className="grid items-center gap-14 lg:grid-cols-[1.08fr_0.92fr] lg:gap-8">
          {/* ---------- Left: copy ---------- */}
          <div>
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease }}
              className="flex items-center gap-3 font-mono text-xs uppercase tracking-[0.35em] text-accent/90 sm:text-sm"
            >
              <span className="inline-block h-2 w-2 rounded-full bg-accent shadow-[0_0_12px_rgba(56,189,248,0.9)]" />
              Hello, I&apos;m
            </motion.p>

            <motion.h1
              initial={{ opacity: 0, y: 26 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.75, delay: 0.1, ease }}
              className="mt-5 font-heading text-[2.6rem] font-bold leading-[1.05] tracking-tight text-white sm:text-6xl xl:text-7xl"
            >
              K&nbsp;{` `}
              <span className="text-gradient">Sree Harsha</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.22, ease }}
              className="mt-5 flex items-center gap-3 font-mono text-sm text-primary-light sm:text-base"
            >
              <span className="text-ink-muted">$</span>
              <span>
                {PROFILE.role}
                <span className="ml-1 inline-block h-4 w-[2px] animate-blink bg-accent align-middle" />
              </span>
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.32, ease }}
              className="mt-6 max-w-xl text-base leading-relaxed text-ink-soft sm:text-lg"
            >
              {PROFILE.intro}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.42, ease }}
              className="mt-9 flex flex-wrap items-center gap-4"
            >
              <Magnetic>
                <button
                  type="button"
                  onClick={() => scrollToId("projects")}
                  data-cursor="button"
                  className="group relative inline-flex h-12 items-center gap-2 overflow-hidden rounded-full bg-gradient-to-r from-primary via-primary-light to-accent px-7 font-semibold text-white shadow-glow-primary transition-all duration-300 hover:-translate-y-0.5 hover:shadow-glow"
                >
                  <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                  <span className="relative">View Projects</span>
                </button>
              </Magnetic>
              <Magnetic strength={0.25}>
                <a
                  href="/resume"
                  data-cursor="button"
                  className="inline-flex h-12 items-center gap-2 rounded-full border border-white/15 px-7 font-semibold text-white/90 backdrop-blur transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:bg-primary/10 hover:text-white"
                >
                  <FaDownload size={14} />
                  Download Resume
                </a>
              </Magnetic>
              <Magnetic strength={0.25}>
                <button
                  type="button"
                  onClick={() => scrollToId("contact")}
                  data-cursor="button"
                  className="inline-flex h-12 items-center gap-2 rounded-full px-7 font-semibold text-ink-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-white/5 hover:text-white"
                >
                  Contact Me
                </button>
              </Magnetic>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="mt-8 flex items-center gap-3"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-emerald-400" />
              </span>
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-ink-muted">
                {PROFILE.availability}
              </p>
            </motion.div>
          </div>

          {/* ---------- Right: portrait ---------- */}
          <div className="relative mx-auto w-full max-w-md lg:max-w-none">
            <motion.div
              ref={sceneRef}
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.2, ease }}
              className="relative will-change-transform"
            >
              {/* soft blue glow behind portrait */}
              <div className="absolute inset-0 -z-10 translate-y-6 rounded-full bg-[radial-gradient(circle_at_50%_45%,rgba(56,189,248,0.3),rgba(59,130,246,0.12)_45%,transparent_70%)] blur-2xl" aria-hidden />
              <div className="absolute inset-0 -z-10 animate-spin-slow rounded-full border border-dashed border-white/[0.07]" aria-hidden />
              <div className="relative px-6 py-4 sm:py-6">
                <Portrait className="relative z-10 mx-auto" />
              </div>
            </motion.div>

            {/* floating tech chips — centered row overlapping the photo's bottom edge */}
            <div
              ref={chipsRef}
              className="pointer-events-none absolute inset-x-0 bottom-[10px] z-20 flex flex-wrap items-center justify-center gap-2 px-3 sm:bottom-[16px] sm:gap-3"
              aria-hidden
            >
              {CHIPS.map((chip, i) => {
                const Icon = chip.icon;
                return (
                  <motion.div
                    key={chip.label}
                    initial={{ opacity: 0, scale: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.7 + i * 0.15, type: "spring", stiffness: 200, damping: 16 }}
                  >
                    <div
                      className="animate-float backdrop-blur-md"
                      style={{ animationDelay: chip.delay }}
                    >
                      <div className="glass flex items-center gap-2 rounded-xl px-3.5 py-2.5 shadow-glow-primary">
                        <Icon size={17} className="text-accent" />
                        <span className="font-mono text-xs font-medium text-white/90">{chip.label}</span>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </div>

        {/* scroll cue */}
        <motion.button
          type="button"
          onClick={() => scrollToId("about")}
          data-cursor="link"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-24 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 text-ink-muted transition hover:text-accent lg:flex"
          aria-label="Scroll to about section"
        >
          <span className="font-mono text-[10px] uppercase tracking-[0.3em]">scroll</span>
          <span className="flex h-10 w-6 items-start justify-center rounded-full border border-white/20 p-1.5">
            <motion.span
              animate={{ y: [0, 12, 0], opacity: [1, 0.2, 1] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
              className="h-2 w-1 rounded-full bg-accent"
            />
          </span>
        </motion.button>
      </div>

      {/* ---------- Stats ---------- */}
      <Stats />
    </section>
  );
}