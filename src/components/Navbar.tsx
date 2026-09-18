"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { RiCloseLine, RiMenuLine } from "react-icons/ri";
import { NAV_LINKS, PROFILE } from "@/lib/data";
import { cn, scrollToId } from "@/lib/utils";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("home");
  const [open, setOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 28 });

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const ids = NAV_LINKS.map((l) => l.id);
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) setActive(entry.target.id);
        }
      },
      { rootMargin: "-35% 0px -60% 0px" },
    );
    ids.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, []);

  const go = (id: string) => {
    setOpen(false);
    scrollToId(id);
  };

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-[70] transition-all duration-500",
        scrolled
          ? "border-b border-white/[0.06] bg-[#050816]/85 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent",
      )}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 sm:px-8" aria-label="Main">
        <button
          type="button"
          onClick={() => go("home")}
          data-cursor="button"
          aria-label="Go to top"
          className="group flex items-center gap-3"
        >
          <span className="glow-border flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary/25 to-accent/10 font-heading text-sm font-bold text-white shadow-glow-primary transition group-hover:shadow-glow">
            {PROFILE.monogram}
          </span>
          <span className="hidden font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted sm:block">
            {PROFILE.firstName} <span className="text-accent">/</span> portfolio
          </span>
        </button>

        <ul className="hidden items-center gap-1 lg:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.id}>
              <button
                type="button"
                onClick={() => go(link.id)}
                data-cursor="link"
                className={cn(
                  "relative rounded-full px-4 py-2 font-mono text-[13px] transition-colors duration-300",
                  active === link.id ? "text-white" : "text-ink-muted hover:text-white",
                )}
                aria-current={active === link.id ? "page" : undefined}
              >
                {active === link.id && (
                  <motion.span
                    layoutId="nav-pill"
                    className="absolute inset-0 rounded-full border border-primary/30 bg-primary/10"
                    transition={{ type: "spring", stiffness: 350, damping: 30 }}
                  />
                )}
                <span className="relative">{link.label}</span>
              </button>
            </li>
          ))}
        </ul>

        <button
          type="button"
          onClick={() => go("contact")}
          data-cursor="button"
          className="hidden rounded-full bg-gradient-to-r from-primary to-accent px-5 py-2 font-mono text-xs font-semibold text-white shadow-glow-primary transition hover:-translate-y-0.5 hover:shadow-glow lg:inline-flex"
        >
          Let&apos;s talk
        </button>

        <button
          type="button"
          className="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-white/10 text-white lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
          data-cursor="button"
        >
          {open ? <RiCloseLine size={22} /> : <RiMenuLine size={22} />}
        </button>
      </nav>

      <motion.div
        className="absolute bottom-0 left-0 h-[2px] w-full origin-left bg-gradient-to-r from-primary via-accent to-primary"
        style={{ scaleX: progress }}
        aria-hidden
      />

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-16 z-[65] bg-[#050816]/95 backdrop-blur-xl lg:hidden"
          >
            <ul className="flex flex-col gap-1 px-6 py-8">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -24 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <button
                    type="button"
                    onClick={() => go(link.id)}
                    className={cn(
                      "flex w-full items-center gap-4 rounded-xl px-4 py-4 text-left font-heading text-2xl font-semibold transition",
                      active === link.id ? "text-white" : "text-ink-muted",
                    )}
                  >
                    <span className="font-mono text-xs text-primary-light">0{i + 1}</span>
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}