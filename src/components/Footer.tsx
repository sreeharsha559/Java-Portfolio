"use client";

import { FaGithub, FaLinkedin } from "react-icons/fa";
import { RiArrowUpLine, RiMailLine } from "react-icons/ri";
import { NAV_LINKS, PROFILE } from "@/lib/data";
import { scrollToId } from "@/lib/utils";

export function Footer() {
  return (
    <footer className="border-t border-white/[0.06] bg-surface-800/40">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-5 py-12 sm:px-8 md:flex-row md:items-start md:justify-between">
        <div className="max-w-xs">
          <div className="flex items-center gap-3">
            <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-primary to-accent font-heading text-sm font-bold text-white shadow-glow-primary">
              {PROFILE.monogram}
            </span>
            <div>
              <p className="font-heading font-semibold text-white">{PROFILE.name}</p>
              <p className="font-mono text-[11px] text-accent">{PROFILE.role}</p>
            </div>
          </div>
          <p className="mt-4 text-sm leading-relaxed text-ink-muted">{PROFILE.tagline}</p>
        </div>

        <nav aria-label="Footer">
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted">Navigate</p>
          <ul className="mt-3 grid grid-cols-2 gap-x-8 gap-y-2">
            {NAV_LINKS.map((l) => (
              <li key={l.id}>
                <button
                  type="button"
                  onClick={() => scrollToId(l.id)}
                  className="text-sm text-ink-soft transition hover:text-accent"
                >
                  {l.label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <p className="font-mono text-[11px] uppercase tracking-[0.25em] text-ink-muted">Connect</p>
          <div className="mt-3 flex gap-3">
            <a
              href={`https://${PROFILE.linkedin}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              data-cursor="link"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-ink-soft transition hover:border-primary/50 hover:text-primary-light"
            >
              <FaLinkedin size={16} />
            </a>
            <a
              href={`https://github.com/${PROFILE.githubUsername}`}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              data-cursor="link"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-ink-soft transition hover:border-primary/50 hover:text-primary-light"
            >
              <FaGithub size={16} />
            </a>
            <a
              href={`mailto:${PROFILE.email}`}
              aria-label="Email"
              data-cursor="link"
              className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-ink-soft transition hover:border-primary/50 hover:text-primary-light"
            >
              <RiMailLine size={16} />
            </a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/[0.06]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-5 py-5 sm:px-8 md:flex-row">
          <p className="font-mono text-[11px] text-ink-muted">
            © {new Date().getFullYear()} {PROFILE.name}. Crafted with Next.js, TypeScript &amp; intent.
          </p>
          <button
            type="button"
            onClick={() => scrollToId("home")}
            data-cursor="button"
            aria-label="Back to top"
            className="group flex items-center gap-2 font-mono text-[11px] text-ink-muted transition hover:text-accent"
          >
            Back to top
            <span className="flex h-7 w-7 items-center justify-center rounded-full border border-white/10 transition group-hover:border-accent/50">
              <RiArrowUpLine size={13} />
            </span>
          </button>
        </div>
      </div>
    </footer>
  );
}