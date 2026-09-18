"use client";

import type { IconType } from "react-icons";
import { motion } from "framer-motion";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RiArrowRightLine, RiMailLine } from "react-icons/ri";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal, Stagger, staggerItem } from "@/components/Reveal";
import { Magnetic } from "@/components/Magnetic";
import { CONTACT, PROFILE } from "@/lib/data";

const ICONS: Record<string, IconType> = {
  mail: RiMailLine,
  linkedin: FaLinkedin,
  github: FaGithub,
};

export function Contact() {
  return (
    <section id="contact" className="relative overflow-hidden scroll-mt-24 border-b border-white/[0.06] py-24 sm:py-36">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 h-[560px] w-[860px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.18),transparent_60%)] blur-3xl"
      />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col items-center text-center">
          <SectionHeading
            align="center"
            overline="contact"
            title={
              <span className="text-4xl leading-tight sm:text-5xl lg:text-6xl">
                Let&apos;s Build Something <span className="text-gradient">Amazing Together</span>
              </span>
            }
            sub="I'm currently open to full-time software engineering roles and internships. If you have an idea, a team, or a problem worth solving — my inbox is open."
          />

          <Stagger className="mt-12 grid w-full max-w-3xl gap-4 sm:grid-cols-3" gap={0.12}>
            {CONTACT.map((c) => {
              const Icon = ICONS[c.icon] ?? RiMailLine;
              return (
                <motion.a
                  key={c.label}
                  href={c.href}
                  target={c.href.startsWith("http") ? "_blank" : undefined}
                  rel={c.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  variants={staggerItem}
                  data-cursor="card"
                  className="group relative flex flex-col items-center gap-2 rounded-2xl border border-white/[0.08] bg-surface-800/60 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:shadow-glow-primary"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-white/10 bg-white/[0.04] text-primary-light transition group-hover:border-primary/30 group-hover:text-accent">
                    <Icon size={20} />
                  </span>
                  <p className="font-heading text-base font-semibold text-white">{c.label}</p>
                  <p className="max-w-full truncate font-mono text-[11px] text-ink-muted">{c.value}</p>
                  <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-accent/80">
                    {c.hint}
                    <RiArrowRightLine className="ml-1 inline transition-transform group-hover:translate-x-0.5" size={11} />
                  </p>
                </motion.a>
              );
            })}
          </Stagger>

          <Reveal delay={0.25} y={20} className="mt-12">
            <Magnetic>
              <a
                href={`mailto:${PROFILE.email}?subject=Let's%20build%20something%20amazing`}
                data-cursor="button"
                className="group relative inline-flex h-14 items-center gap-3 overflow-hidden rounded-full bg-gradient-to-r from-primary via-primary-light to-accent px-10 font-heading text-base font-semibold text-white shadow-glow-primary transition-all duration-300 hover:-translate-y-1 hover:shadow-glow"
              >
                <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative">Start a conversation</span>
                <RiArrowRightLine className="relative transition-transform duration-300 group-hover:translate-x-1" size={18} />
              </a>
            </Magnetic>
          </Reveal>

          <Reveal delay={0.35}>
            <p className="mt-6 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted/70">
              {PROFILE.location} · {PROFILE.availability.toLowerCase()}
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}