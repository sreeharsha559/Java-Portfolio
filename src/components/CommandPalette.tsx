"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { RiArrowRightLine, RiSearchLine, RiTerminalLine } from "react-icons/ri";
import { TbCommand } from "react-icons/tb";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { PROFILE } from "@/lib/data";
import { cn, scrollToId } from "@/lib/utils";

const COMMANDS = [
  { id: "about", label: "About", hint: "More than just code", section: "about" },
  { id: "skills", label: "Skills", hint: "Interactive tech dashboard", section: "skills" },
  { id: "projects", label: "Projects", hint: "SafeStride · QueueFlow", section: "projects" },
  { id: "experience", label: "Experience", hint: "SkillDzire internship", section: "experience" },
  { id: "education", label: "Education", hint: "B.Tech CSE · CGPA 8.5", section: "education" },
  { id: "achievements", label: "Achievements", hint: "Competitions & leadership", section: "achievements" },
  { id: "github", label: "GitHub", hint: "Live repos & activity", section: "github" },
  { id: "resume", label: "Resume", hint: "Print-ready copy", section: "resume", url: "/resume" },
  { id: "contact", label: "Contact", hint: "Let's talk", section: "contact" },
] as const;

export default function CommandPalette() {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [index, setIndex] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setOpen((v) => !v);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const whoami = query.trim().toLowerCase() === "whoami";

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return COMMANDS;
    return COMMANDS.filter(
      (c) => c.label.toLowerCase().includes(q) || c.hint.toLowerCase().includes(q),
    );
  }, [query]);

  useEffect(() => {
    setIndex(0);
  }, [query, open]);

  const run = (id: (typeof COMMANDS)[number]["id"]) => {
    setOpen(false);
    setQuery("");
    const cmd = COMMANDS.find((c) => c.id === id);
    if (!cmd) return;
    if ("url" in cmd && cmd.url) {
      window.open(cmd.url, "_blank");
    } else if ("section" in cmd) {
      scrollToId(cmd.section);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setIndex((i) => (whoami ? 0 : Math.min(i + 1, results.length - 1)));
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setIndex((i) => (whoami ? 0 : Math.max(i - 1, 0)));
    } else if (e.key === "Enter" && !whoami) {
      e.preventDefault();
      const cmd = results[index];
      if (cmd) run(cmd.id);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent
        className="overflow-hidden rounded-2xl border border-white/10 bg-surface-800/95 shadow-card backdrop-blur-2xl"
        onOpenAutoFocus={() => inputRef.current?.focus()}
      >
        <div className="flex items-center gap-3 border-b border-white/[0.06] px-4 py-3.5">
          <TbCommand size={18} className="text-accent" />
          <input
            ref={inputRef}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder="Type a command… try `whoami`"
            aria-label="Search commands"
            className="w-full bg-transparent font-mono text-sm text-white placeholder:text-ink-muted/60 focus:outline-none"
          />
          <kbd className="hidden rounded-md border border-white/10 px-1.5 py-0.5 font-mono text-[10px] text-ink-muted sm:block">
            ESC
          </kbd>
        </div>

        <div className="max-h-80 overflow-y-auto p-2" role="listbox" aria-label="Commands">
          {whoami ? (
            <motion.div
              initial={{ opacity: 0, y: 4 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-start gap-3 rounded-xl border border-accent/25 bg-accent/10 px-4 py-4"
            >
              <RiTerminalLine size={18} className="mt-0.5 shrink-0 text-accent" />
              <div>
                <p className="font-mono text-sm text-white">
                  <span className="text-ink-muted">$ whoami</span>
                  <span className="ml-2 animate-blink text-accent">▍</span>
                </p>
                <p className="mt-2 font-mono text-sm text-accent">
                  {PROFILE.name} <span className="text-ink-muted">|</span> {PROFILE.role}
                </p>
              </div>
            </motion.div>
          ) : results.length === 0 ? (
            <p className="px-4 py-6 text-center font-mono text-xs text-ink-muted">
              No matching commands.
            </p>
          ) : (
            results.map((cmd, i) => (
              <button
                key={cmd.id}
                type="button"
                role="option"
                aria-selected={i === index}
                onClick={() => run(cmd.id)}
                onMouseEnter={() => setIndex(i)}
                data-cursor="link"
                className={cn(
                  "flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-colors",
                  i === index ? "border border-primary/30 bg-primary/10" : "border border-transparent",
                )}
              >
                <span className="flex items-center gap-3">
                  <RiArrowRightLine
                    size={15}
                    className={cn("transition-colors", i === index ? "text-primary-light" : "text-ink-muted/50")}
                  />
                  <span className={cn("font-mono text-sm", i === index ? "text-white" : "text-ink-soft")}>
                    {cmd.label}
                  </span>
                </span>
                <span className="hidden font-mono text-[11px] text-ink-muted sm:block">{cmd.hint}</span>
              </button>
            ))
          )}
        </div>

        <div className="flex items-center gap-4 border-t border-white/[0.06] px-4 py-2.5 font-mono text-[10px] text-ink-muted">
          <span className="flex items-center gap-1.5">
            <TbCommand size={12} /> K <span className="text-ink-muted/50">to toggle</span>
          </span>
          <span className="hidden items-center gap-1.5 sm:flex">
            <RiSearchLine size={12} /> ↑↓ to navigate
          </span>
        </div>
      </DialogContent>
    </Dialog>
  );
}