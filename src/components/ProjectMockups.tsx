"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

/* ============================================================
   SafeStride — animated phone mockup
   ============================================================ */

const CONTACTS = [
  { name: "Mom", initials: "M", relation: "Primary contact" },
  { name: "Dad", initials: "D", relation: "Primary contact" },
  { name: "112", initials: "E", relation: "Emergency" },
];

const PHASE_NORMAL = "normal";
const PHASE_ALERT = "alert";
const PHASE_SOS = "sos";

export function SafeStridePhone() {
  const [phase, setPhase] = useState(PHASE_NORMAL);
  const [steps, setSteps] = useState(1240);
  const [countdown, setCountdown] = useState(20);

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];
    if (phase === PHASE_NORMAL) {
      const stepTimer = setInterval(() => setSteps((s) => (s + 1) % 10000), 400);
      timers.push(
        stepTimer,
        setTimeout(() => setPhase(PHASE_ALERT), 3500),
      );
    } else if (phase === PHASE_ALERT) {
      setCountdown(20);
      const bar = setInterval(() => setCountdown((c) => Math.max(0, c - 1)), 100);
      timers.push(
        bar,
        setTimeout(() => setPhase(PHASE_SOS), 2000),
      );
    } else {
      timers.push(setTimeout(() => setPhase(PHASE_NORMAL), 2600));
    }
    return () => timers.forEach(clearTimeout);
  }, [phase]);

  return (
    <div className="mx-auto w-[248px] sm:w-[268px]" role="img" aria-label="SafeStride app on a phone">
      <div className="rounded-[2.9rem] border border-white/15 bg-surface-900 p-2.5 shadow-2xl shadow-black/60">
        <div className="relative overflow-hidden rounded-[2.1rem] bg-gradient-to-b from-surface-700 to-surface-900">
          <div className="absolute left-1/2 top-2.5 z-20 h-[22px] w-20 -translate-x-1/2 rounded-full bg-black/90" />

          <div className="relative px-4 pt-14 pb-6">
            {/* header */}
            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading text-sm font-bold text-white">SafeStride</p>
                <p className="font-mono text-[9px] tracking-widest text-primary-light">SAFETY MODE</p>
              </div>
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-accent/15 text-accent">
                <ShieldIcon />
              </span>
            </div>

            {/* status card */}
            <div className="mt-4 rounded-2xl border border-white/10 bg-white/[0.04] p-3.5">
              <AnimatePresence mode="wait">
                {phase === PHASE_NORMAL && (
                  <motion.div
                    key="normal"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                  >
                    <p className="font-mono text-[9px] uppercase tracking-widest text-ink-muted">Activity</p>
                    <p className="mt-1 text-2xl font-bold text-white">{steps.toLocaleString()}</p>
                    <p className="text-[10px] text-ink-muted">steps · walking detected</p>
                    <div className="mt-2 flex items-center gap-1.5">
                      <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-400" />
                      <span className="font-mono text-[9px] text-emerald-400">Sensors calibrated</span>
                    </div>
                  </motion.div>
                )}
                {phase === PHASE_ALERT && (
                  <motion.div
                    key="alert"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <div className="relative mx-auto flex h-14 w-14 items-center justify-center">
                      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-orange-400/40" />
                      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-orange-400/40 [animation-delay:0.4s]" />
                      <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-orange-500/90 font-bold text-white">
                        !
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-bold text-white">Fall detected?</p>
                    <p className="mt-0.5 font-mono text-[10px] text-ink-muted">cancel to dismiss</p>
                    <div className="mt-3 flex items-center justify-center gap-3">
                      <span className="rounded-lg bg-white/10 px-3 py-1 font-mono text-[10px] font-semibold text-white">
                        {countdown}s
                      </span>
                      <span className="rounded-lg bg-emerald-500/80 px-3 py-1 font-mono text-[10px] font-semibold text-white">
                        OK — I&apos;m fine
                      </span>
                    </div>
                  </motion.div>
                )}
                {phase === PHASE_SOS && (
                  <motion.div
                    key="sos"
                    initial={{ opacity: 0, scale: 0.96 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-center"
                  >
                    <div className="relative mx-auto flex h-14 w-14 items-center justify-center">
                      <span className="absolute inset-0 animate-pulse-ring rounded-full bg-red-500/50" />
                      <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-red-500 text-white">
                        <SosIcon />
                      </span>
                    </div>
                    <p className="mt-2 text-sm font-bold text-white">SOS alert sent</p>
                    <p className="mt-0.5 font-mono text-[10px] text-ink-muted">SMS + GPS link → 3 contacts</p>
                    <div className="mt-2 rounded-lg border border-red-400/40 bg-red-500/15 px-2 py-1 font-mono text-[9px] text-red-300">
                      location pinned · 13.2100° N, 78.7500° E
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* contacts */}
            <div className="mt-3 space-y-2">
              {CONTACTS.map((c, i) => (
                <motion.div
                  key={c.name}
                  initial={{ opacity: 0, x: i === 2 ? 24 : -24 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.4 + i * 0.12 }}
                  className="flex items-center gap-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] p-2"
                >
                  <span
                    className={
                      i === 2
                        ? "flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/25 text-[10px] font-bold text-emerald-300"
                        : "flex h-7 w-7 items-center justify-center rounded-full bg-primary/25 text-[10px] font-bold text-primary-light"
                    }
                  >
                    {c.initials}
                  </span>
                  <div className="flex-1">
                    <p className="text-[11px] font-semibold text-white">{c.name}</p>
                    <p className="font-mono text-[8px] uppercase tracking-wider text-ink-muted">{c.relation}</p>
                  </div>
                  <span className="font-mono text-[9px] text-accent">SMS ✓</span>
                </motion.div>
              ))}
            </div>

            {/* SOS button */}
            <button
              type="button"
              className="mt-3 flex w-full items-center justify-center gap-2 rounded-xl border border-red-400/50 bg-red-500/20 py-2.5 font-mono text-[11px] font-bold tracking-[0.2em] text-red-200"
            >
              PANIC SOS
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-red-400" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function ShieldIcon() {
  return (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function SosIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <path d="M12 2v20" />
      <path d="M2 12h20" />
    </svg>
  );
}

/* ============================================================
   QueueFlow — animated admin dashboard mockup
   ============================================================ */

interface Token {
  id: string;
  priority: 1 | 2 | 3;
  service: string;
  status: "serving" | "waiting" | "done";
}

const SEED_TOKENS: Token[] = [
  { id: "A-12", priority: 1, service: "Priority", status: "serving" },
  { id: "B-04", priority: 2, service: "General", status: "waiting" },
  { id: "A-13", priority: 1, service: "Priority", status: "waiting" },
  { id: "C-06", priority: 3, service: "Inquiry", status: "waiting" },
  { id: "B-05", priority: 2, service: "General", status: "waiting" },
  { id: "B-06", priority: 2, service: "General", status: "waiting" },
];

const PRIORITY_META = {
  1: { label: "P1 · high", cls: "border-red-400/40 bg-red-500/15 text-red-300" },
  2: { label: "P2 · std", cls: "border-primary/40 bg-primary/15 text-primary-light" },
  3: { label: "P3 · low", cls: "border-white/15 bg-white/10 text-ink-muted" },
} as const;

const BASE_BARS = [42, 68, 30, 82, 55, 74, 46];

export function QueueFlowDashboard() {
  const [tokens, setTokens] = useState<Token[]>(SEED_TOKENS);
  const [bars, setBars] = useState<number[]>(BASE_BARS);

  useEffect(() => {
    let counter = 13;
    const base = (i: number) => [34, 58, 44, 78, 52, 66, 39][i % 7];
    const timer = setInterval(() => {
      setTokens((prev) => {
        // the currently-served token leaves; the next waiting one is served.
        const alive = prev.filter((t) => t.status !== "done").slice(0, 5);
        const next: Token[] = alive.map((t, i) =>
          i === 0 ? { ...t, status: "serving" as const } : { ...t, status: "waiting" as const },
        );
        counter += 1;
        const letter = Math.random() > 0.45 ? "A" : "B";
        const fresh: Token = {
          id: `${letter}-${String(counter).padStart(2, "0")}`,
          priority: (Math.random() > 0.55 ? 2 : 1) as 1 | 2 | 3,
          service: "General",
          status: "waiting",
        };
        return [...next, fresh].slice(0, 6);
      });
      setBars((prev) => prev.map((_, i) => base(i + Math.floor(Math.random() * 5))));
    }, 2200);

    return () => clearInterval(timer);
  }, []);

  const nowServing = tokens.find((t) => t.status === "serving");

  return (
    <div className="mx-auto w-full max-w-[460px]" role="img" aria-label="QueueFlow admin dashboard preview">
      <div className="overflow-hidden rounded-2xl border border-white/15 bg-surface-900 shadow-2xl shadow-black/50">
        {/* window chrome */}
        <div className="flex items-center gap-2 border-b border-white/[0.07] bg-surface-800/80 px-4 py-3">
          <span className="flex gap-1.5">
            <i className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
            <i className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
            <i className="h-2.5 w-2.5 rounded-full bg-emerald-400/80" />
          </span>
          <span className="mx-auto flex items-center gap-2 rounded-md bg-white/[0.05] px-3 py-1 font-mono text-[10px] text-ink-muted">
            <LockIcon />
            queueflow.app <span className="text-ink-muted/50">/admin</span>
          </span>
          <span className="flex items-center gap-1 font-mono text-[9px] text-accent">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" /> LIVE
          </span>
        </div>

        <div className="grid grid-cols-[56px_1fr]">
          {/* sidebar */}
          <div className="flex flex-col items-center gap-3 border-r border-white/[0.07] py-4">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-primary to-accent font-heading text-[10px] font-bold text-white">
              QF
            </span>
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="flex h-7 w-7 items-center justify-center rounded-lg bg-white/[0.05] text-ink-muted">
                <i className="block h-1.5 w-1.5 rounded-full bg-current" />
              </span>
            ))}
          </div>

          {/* main */}
          <div className="p-3.5">
            <div className="flex items-center justify-between">
              <div>
                <p className="font-heading text-sm font-bold text-white">Live Queue</p>
                <p className="font-mono text-[8px] uppercase tracking-widest text-ink-muted">Counter 03 · WebSocket sync</p>
              </div>
              <div className="rounded-lg border border-emerald-400/30 bg-emerald-500/10 px-2 py-1 font-mono text-[9px] font-semibold text-emerald-300">
                ● online
              </div>
            </div>

            {/* KPI cards */}
            <div className="mt-3 grid grid-cols-3 gap-2">
              <div className="rounded-xl border border-accent/30 bg-accent/10 p-2.5">
                <p className="font-mono text-[8px] uppercase tracking-wider text-ink-muted">Now serving</p>
                <p className="mt-0.5 font-heading text-xl font-bold text-accent">
                  {nowServing?.id ?? "—-"}
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-2.5">
                <p className="font-mono text-[8px] uppercase tracking-wider text-ink-muted">Waiting</p>
                <p className="mt-0.5 font-heading text-xl font-bold text-white">
                  {tokens.reduce((n, t) => (t.status === "waiting" ? n + 1 : n), 0)}
                </p>
              </div>
              <div className="rounded-xl border border-white/[0.07] bg-white/[0.03] p-2.5">
                <p className="font-mono text-[8px] uppercase tracking-wider text-ink-muted">Avg. wait</p>
                <p className="mt-0.5 font-heading text-xl font-bold text-white">3m 40s</p>
              </div>
            </div>

            {/* queue rows */}
            <div className="mt-3 space-y-1.5">
              {tokens.map((t) => (
                <div
                  key={t.id}
                  className={
                    t.status === "serving"
                      ? "flex items-center gap-2 rounded-lg border border-accent/50 bg-accent/10 p-2"
                      : t.status === "done"
                        ? "flex items-center gap-2 rounded-lg border border-white/[0.05] bg-white/[0.02] p-2 opacity-40"
                        : "flex items-center gap-2 rounded-lg border border-white/[0.07] bg-white/[0.03] p-2"
                  }
                >
                  <AnimatePresence>
                    {t.status === "serving" && (
                      <motion.span
                        initial={{ opacity: 1 }}
                        animate={{ opacity: [1, 0.4, 1] }}
                        exit={{ opacity: 0 }}
                        transition={{ repeat: Infinity, duration: 1.2 }}
                        className="h-1.5 w-1.5 rounded-full bg-accent"
                      />
                    )}
                  </AnimatePresence>
                  <span className="font-mono text-[11px] font-bold text-white">{t.id}</span>
                  <span
                    className={`rounded px-1.5 py-0.5 font-mono text-[8px] font-semibold ${PRIORITY_META[t.priority].cls}`}
                  >
                    {PRIORITY_META[t.priority].label}
                  </span>
                  <span className="ml-auto font-mono text-[9px] text-ink-muted">{t.service}</span>
                  <span
                    className={`font-mono text-[8px] uppercase tracking-wider ${
                      t.status === "serving" ? "text-accent" : t.status === "done" ? "text-ink-muted" : "text-ink-muted/60"
                    }`}
                  >
                    {t.status}
                  </span>
                </div>
              ))}
            </div>

            {/* mini chart */}
            <div className="mt-3 rounded-xl border border-white/[0.07] bg-white/[0.02] p-3">
              <p className="font-mono text-[8px] uppercase tracking-wider text-ink-muted">Throughput / 10 min</p>
              <div className="mt-2 flex h-16 items-end gap-1.5">
                {bars.map((h, i) => (
                  <motion.div
                    key={`${i}-${h}`}
                    animate={{ height: `${h}%` }}
                    transition={{ duration: 0.7, ease: "easeInOut" }}
                    className="w-full rounded-sm bg-gradient-to-t from-primary/50 to-accent"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LockIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
      <rect x="3" y="11" width="18" height="11" rx="2" />
      <path d="M7 11V7a5 5 0 0 1 10 0v4" />
    </svg>
  );
}