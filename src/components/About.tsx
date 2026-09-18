"use client";

import type { IconType } from "react-icons";
import { PiBookOpenFill, PiLightbulbFill, PiPuzzlePieceFill, PiUsersThreeFill } from "react-icons/pi";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { ABOUT_CARDS } from "@/lib/data";

const ICONS: Record<string, IconType> = {
  stack: PiPuzzlePieceFill,
  solve: PiLightbulbFill,
  lead: PiUsersThreeFill,
  learn: PiBookOpenFill,
};

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        overline="about"
        title="More Than Just Code"
        sub="A developer profile built on engineering, ownership and a habit of shipping — not just credits and frameworks."
      />

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {ABOUT_CARDS.map((card, i) => {
          const Icon = ICONS[card.icon] ?? PiPuzzlePieceFill;
          return (
            <Reveal key={card.title} y={30} delay={i * 0.08} className="h-full">
              <article
                data-cursor="card"
                className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-white/[0.07] bg-surface-800/50 p-6 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1.5 hover:border-primary/40 hover:bg-surface-700/60 hover:shadow-glow-primary"
              >
                <div
                  className="pointer-events-none absolute -right-16 -top-16 h-40 w-40 rounded-full bg-primary/20 opacity-0 blur-3xl transition-opacity duration-500 group-hover:opacity-100"
                  aria-hidden
                />
                <div className="relative">
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl border border-primary/25 bg-primary/10 text-primary-light transition-colors duration-500 group-hover:bg-primary/20">
                    <Icon size={22} />
                  </span>
                  <h3 className="mt-5 font-heading text-lg font-semibold text-white">{card.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-ink-muted">{card.body}</p>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {card.tags.map((tag) => (
                      <Badge key={tag} variant="outline" className="text-ink-soft">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="mt-auto pt-6">
                  <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
                  <p className="mt-4 font-mono text-[10px] uppercase tracking-[0.25em] text-primary-light/70">
                    {card.title === "Full Stack Development"
                      ? "core discipline"
                      : card.title === "Problem Solving"
                        ? "engineer mindset"
                        : card.title === "Leadership"
                          ? "team multiplier"
                          : "growth loop"}
                  </p>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>
    </section>
  );
}