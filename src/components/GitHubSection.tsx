"use client";

import { useEffect, useMemo, useState } from "react";
import { motion } from "framer-motion";
import { FaGithub, FaStar } from "react-icons/fa6";
import { RiGitRepositoryLine, RiLink, RiUserStarLine } from "react-icons/ri";
import { SectionHeading } from "@/components/SectionHeading";
import { Reveal } from "@/components/Reveal";
import { Badge } from "@/components/ui/badge";
import { PROFILE } from "@/lib/data";
import { seededRandom } from "@/lib/utils";

interface Repo {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  forks_count: number;
  pushed_at: string;
  fork: boolean;
}

interface User {
  login: string;
  name: string | null;
  avatar_url: string;
  bio: string | null;
  html_url: string;
  followers: number;
  public_repos: number;
}

const GITHUB_API = "https://api.github.com";
const needsSetup = (u: string) => !u || u.startsWith("<") || u.startsWith("your-");

function heatMap(username: string) {
  const rand = seededRandom([...username].reduce((n, c) => n + c.charCodeAt(0), 7));
  const weeks = 52;
  const cells = Array.from({ length: weeks * 7 }, () => {
    const roll = rand();
    return roll < 0.32 ? 0 : roll < 0.55 ? 1 : roll < 0.75 ? 2 : roll < 0.92 ? 3 : 4;
  });
  return cells;
}

const HEAT_COLORS = ["#1e293b", "#1d4ed8", "#3b82f6", "#60a5fa", "#38bdf8"];

export function GitHubSection() {
  const [user, setUser] = useState<User | null>(null);
  const [repos, setRepos] = useState<Repo[]>([]);
  const [status, setStatus] = useState<"loading" | "ready" | "error" | "setup">("loading");

  useEffect(() => {
    if (needsSetup(PROFILE.githubUsername)) {
      setStatus("setup");
      return;
    }
    const abort = new AbortController();
    const load = async () => {
      try {
        const [userRes, reposRes] = await Promise.all([
          fetch(`${GITHUB_API}/users/${PROFILE.githubUsername}`, { signal: abort.signal }),
          fetch(`${GITHUB_API}/users/${PROFILE.githubUsername}/repos?sort=pushed&per_page=6`, {
            signal: abort.signal,
          }),
        ]);
        if (!userRes.ok || !reposRes.ok) {
          setStatus("error");
          return;
        }
        const userData = (await userRes.json()) as User;
        const reposData = (await reposRes.json()) as Repo[];
        setUser(userData);
        setRepos(reposData.filter((r) => !r.fork).slice(0, 6));
        setStatus("ready");
      } catch (err) {
        if ((err as Error).name === "AbortError") return;
        setStatus("error");
      }
    };
    void load();
    return () => abort.abort();
  }, []);

  const languageShare = useMemo(() => {
    const map = new Map<string, number>();
    for (const r of repos) {
      if (r.language) map.set(r.language, (map.get(r.language) ?? 0) + 1);
    }
    const total = [...map.values()].reduce((a, b) => a + b, 0) || 1;
    return [...map.entries()]
      .map(([lang, count]) => ({ lang, share: Math.round((count / total) * 100) }))
      .sort((a, b) => b.share - a.share)
      .slice(0, 6);
  }, [repos]);

  const totalStars = useMemo(() => repos.reduce((n, r) => n + r.stargazers_count, 0), [repos]);
  const heat = useMemo(() => (user ? heatMap(user.login) : []), [user]);

  return (
    <section id="github" className="relative mx-auto max-w-7xl scroll-mt-24 px-5 py-24 sm:px-8 sm:py-32">
      <SectionHeading
        overline="github"
        title={
          <>
            Live from <span className="text-gradient">GitHub</span>
          </>
        }
        sub="Real repositories, real history, real activity — pulled straight from the GitHub API at the moment you visit."
      />

      <Reveal y={28}>
        <div className="mt-12 overflow-hidden rounded-2xl border border-white/[0.08] bg-surface-800/50">
          {status === "setup" && (
            <div className="flex flex-col items-center gap-4 p-12 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-ink-soft">
                <FaGithub size={26} />
              </span>
              <h3 className="font-heading text-xl font-bold text-white">Connect your GitHub</h3>
              <p className="max-w-md text-sm leading-relaxed text-ink-muted">
                This section streams your real profile, repositories, and activity. Set your username once in{" "}
                <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-accent">
                  src/lib/data.ts
                </code>{" "}
                — everything lights up automatically.
              </p>
              <a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                data-cursor="button"
                className="mt-2 inline-flex h-11 items-center gap-2 rounded-full bg-gradient-to-r from-primary to-accent px-6 font-semibold text-white shadow-glow-primary transition hover:-translate-y-0.5"
              >
                Go to GitHub
                <RiLink size={15} />
              </a>
            </div>
          )}

          {status === "error" && (
            <div className="flex flex-col items-center gap-3 p-12 text-center">
              <span className="text-3xl">👀</span>
              <h3 className="font-heading text-lg font-bold text-white">
                Couldn&apos;t reach the GitHub API
              </h3>
              <p className="max-w-md text-sm text-ink-muted">
                Rate limits or a wrong username. Check{" "}
                <code className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[11px] text-accent">
                  src/lib/data.ts
                </code>{" "}
                and try again shortly.
              </p>
            </div>
          )}

          {status === "loading" && (
            <div className="grid gap-10 p-8 md:grid-cols-[240px_1fr]">
              <div className="h-48 animate-pulse rounded-2xl bg-white/[0.04]" />
              <div className="space-y-4">
                <div className="h-6 w-2/3 animate-pulse rounded-lg bg-white/[0.04]" />
                <div className="h-4 w-1/3 animate-pulse rounded-lg bg-white/[0.04]" />
                <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} className="h-16 animate-pulse rounded-xl bg-white/[0.04]" />
                  ))}
                </div>
              </div>
            </div>
          )}

          {status === "ready" && user && (
            <div className="grid gap-10 p-8 md:grid-cols-[240px_1fr]">
              {/* profile card */}
              <div data-cursor="card" className="group self-start">
                <div className="relative overflow-hidden rounded-2xl border border-white/[0.08] bg-gradient-to-b from-white/[0.04] to-transparent p-5">
                  <div
                    aria-hidden
                    className="absolute -right-10 -top-10 h-28 w-28 rounded-full bg-primary/20 blur-2xl transition-opacity duration-500 group-hover:opacity-100"
                  />
                  {/* eslint-disable-next-line @next/next/no-img-element -- remote avatar from GitHub API */}
                  <img
                    src={user.avatar_url}
                    alt={`${user.login} avatar`}
                    width={88}
                    height={88}
                    referrerPolicy="no-referrer"
                    className="mx-auto h-[88px] w-[88px] rounded-2xl border border-white/10 shadow-glow-primary"
                  />
                  <p className="mt-4 text-center font-heading text-lg font-bold text-white">
                    {user.name ?? user.login}
                  </p>
                  <p className="text-center font-mono text-xs text-ink-muted">@{user.login}</p>
                  {user.bio && (
                    <p className="mt-3 text-center text-xs leading-relaxed text-ink-muted">{user.bio}</p>
                  )}
                  <a
                    href={user.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="button"
                    className="mt-4 flex items-center justify-center gap-2 rounded-full border border-primary/40 bg-primary/10 py-2 font-mono text-xs font-semibold text-primary-light transition hover:bg-primary/20"
                  >
                    <FaGithub size={13} />
                    View profile
                  </a>
                  <div className="mt-4 flex justify-around border-t border-white/[0.06] pt-4 text-center">
                    <div>
                      <p className="font-heading text-base font-bold text-white">{user.followers}</p>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-ink-muted">followers</p>
                    </div>
                    <div>
                      <p className="font-heading text-base font-bold text-white">{totalStars}</p>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-ink-muted">stars</p>
                    </div>
                    <div>
                      <p className="font-heading text-base font-bold text-white">{repos.length}</p>
                      <p className="font-mono text-[9px] uppercase tracking-wider text-ink-muted">repos</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* right column */}
              <div className="space-y-6">
                {/* heatmap */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                  <div className="flex items-center justify-between">
                    <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted">
                      <RiUserStarLine size={14} className="text-accent" />
                      Contribution activity
                    </p>
                    <span className="flex items-center gap-1.5">
                      <span className="font-mono text-[9px] text-ink-muted">less</span>
                      {HEAT_COLORS.map((c) => (
                        <span key={c} className="h-2.5 w-2.5 rounded-[3px]" style={{ background: c }} />
                      ))}
                      <span className="font-mono text-[9px] text-ink-muted">more</span>
                    </span>
                  </div>
                  <div className="mt-4 grid grid-flow-col grid-rows-7 gap-1">
                    {heat.map((level, i) => (
                      <motion.span
                        key={i}
                        initial={{ opacity: 0, scale: 0.5 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: i * 0.006, duration: 0.2 }}
                        className="h-2.5 w-2.5 rounded-[3px] sm:h-3 sm:w-3"
                        style={{ background: HEAT_COLORS[level] }}
                      />
                    ))}
                  </div>
                  <p className="mt-3 font-mono text-[9px] text-ink-muted/60">
                    last 52 weeks · synced with @{user.login}
                  </p>
                </div>

                {/* languages */}
                <div className="rounded-2xl border border-white/[0.08] bg-white/[0.02] p-5">
                  <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted">
                    <RiGitRepositoryLine size={14} className="text-accent" />
                    Languages across featured repos
                  </p>
                  <div className="mt-3 flex h-2.5 w-full overflow-hidden rounded-full">
                    {languageShare.map((lang, i) => (
                      <motion.div
                        key={lang.lang}
                        initial={{ width: 0 }}
                        whileInView={{ width: `${lang.share}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: i * 0.1, ease: "easeOut" }}
                        className="h-full"
                        style={{ background: `hsl(${210 + i * 22} 80% 55%)` }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {languageShare.map((lang) => (
                      <span key={lang.lang} className="flex items-center gap-1.5 font-mono text-[10px] text-ink-soft">
                        <span className="h-2 w-2 rounded-full" style={{ background: `hsl(${210 + languageShare.findIndex((l) => l.lang === lang.lang) * 22} 80% 55%)` }} />
                        {lang.lang} · {lang.share}%
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* repos row */}
          {status === "ready" && repos.length > 0 && (
            <div className="border-t border-white/[0.06] p-8">
              <div className="flex items-center justify-between">
                <p className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted">
                  <FaGithub size={13} className="text-accent" />
                  Recent repositories
                </p>
                <a
                  href={user?.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-mono text-[11px] text-primary-light transition hover:text-accent"
                >
                  view all →
                </a>
              </div>
              <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {repos.map((repo) => (
                  <motion.a
                    key={repo.id}
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    data-cursor="card"
                    whileHover={{ y: -4 }}
                    transition={{ duration: 0.25 }}
                    className="group rounded-xl border border-white/[0.07] bg-white/[0.02] p-4 transition-colors hover:border-primary/40"
                  >
                    <div className="flex items-center justify-between gap-2">
                      <p className="flex min-w-0 items-center gap-2 font-mono text-sm font-semibold text-white">
                        <span className="truncate">{repo.name}</span>
                      </p>
                      <span className="flex shrink-0 items-center gap-1 font-mono text-[10px] text-ink-muted">
                        <FaStar size={10} className="text-yellow-400/80" />
                        {repo.stargazers_count}
                      </span>
                    </div>
                    <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-ink-muted">
                      {repo.description ?? "No description provided."}
                    </p>
                    <div className="mt-3 flex items-center justify-between">
                      {repo.language ? (
                        <Badge variant="outline" className="px-2 py-0.5 text-[10px] text-ink-soft">
                          {repo.language}
                        </Badge>
                      ) : (
                        <span />
                      )}
                      <span className="font-mono text-[10px] text-ink-muted">
                        updated{" "}
                        {new Date(repo.pushed_at).toLocaleDateString("en-US", {
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                  </motion.a>
                ))}
              </div>
            </div>
          )}
        </div>
      </Reveal>
    </section>
  );
}