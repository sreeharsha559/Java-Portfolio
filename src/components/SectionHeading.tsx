"use client";

import { cn } from "@/lib/utils";
import { Reveal } from "@/components/Reveal";

interface SectionHeadingProps {
  overline: string;
  title: React.ReactNode;
  sub?: React.ReactNode;
  className?: string;
  align?: "left" | "center";
}

export function SectionHeading({
  overline,
  title,
  sub,
  className,
  align = "left",
}: SectionHeadingProps) {
  return (
    <div className={cn("max-w-2xl", align === "center" && "mx-auto text-center", className)}>
      <Reveal y={18}>
        <p className="font-mono text-xs uppercase tracking-[0.3em] text-accent/80">
          <span className="mr-2 text-primary-light">{`//`}</span>
          {overline}
        </p>
        <h2 className="mt-4 font-heading text-3xl font-bold tracking-tight text-white sm:text-4xl md:text-5xl">
          {title}
        </h2>
      </Reveal>
      {sub && (
        <Reveal delay={0.1} y={18}>
          <p className="mt-5 text-base leading-relaxed text-ink-muted">{sub}</p>
        </Reveal>
      )}
    </div>
  );
}