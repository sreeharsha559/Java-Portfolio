"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { TbHeadphones, TbMusic, TbPlayerPauseFilled, TbPlayerPlayFilled, TbVolume, TbVolume3, TbX } from "react-icons/tb";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

const STORAGE_ENABLED = "portfolio:music-enabled";
const STORAGE_VOLUME = "portfolio:music-volume";
const AUDIO_SRC = "/audio/background-music.mp3";

type Playback = "idle" | "playing" | "paused" | "resuming";

/**
 * Persistent, floating music player.
 *
 * - OFF by default; never autoplays before a user interaction.
 * - Fades in on start, fades out on stop.
 * - Preference + volume stored in localStorage and restored on return
 *   (actual playback still waits for the browser's autoplay allowance).
 * - If /audio/background-music.mp3 is missing the player renders in a
 *   disabled placeholder state — the site still builds and runs fine.
 */
export default function MusicPlayer() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const fadeRaf = useRef<number | null>(null);
  const reduce = useReducedMotion();

  const [mounted, setMounted] = useState(false);
  const [playback, setPlayback] = useState<Playback>("idle");
  const [missing, setMissing] = useState(false);
  const [volume, setVolume] = useState(70);
  const [panelOpen, setPanelOpen] = useState(false);
  const mutedRef = useRef(false);

  useEffect(() => setMounted(true), []);

  /* Restore stored preference safely (SSR guard). */
  useEffect(() => {
    if (!mounted) return;
    try {
      const rawVolume = localStorage.getItem(STORAGE_VOLUME);
      if (rawVolume !== null) {
        const v = Number(rawVolume);
        if (Number.isFinite(v)) setVolume(Math.min(100, Math.max(0, v)));
      }
      if (localStorage.getItem(STORAGE_ENABLED) === "1") {
        setPlayback("resuming");
      } else {
        setPlayback("paused");
      }
    } catch {
      setPlayback("paused");
    }
  }, [mounted]);

  /* Audio element lifecycle + bound events. */
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    audio.volume = 0;

    const onError = () => setMissing(true);
    const onPlaying = () => setPlayback("playing");
    const onPause = () => setPlayback("paused");
    audio.addEventListener("error", onError);
    audio.addEventListener("playing", onPlaying);
    audio.addEventListener("pause", onPause);

    const onPageHide = () => {
      if (fadeRaf.current) cancelAnimationFrame(fadeRaf.current);
      audio.pause();
    };
    window.addEventListener("pagehide", onPageHide);

    return () => {
      audio.removeEventListener("error", onError);
      audio.removeEventListener("playing", onPlaying);
      audio.removeEventListener("pause", onPause);
      window.removeEventListener("pagehide", onPageHide);
      if (fadeRaf.current) cancelAnimationFrame(fadeRaf.current);
    };
  }, []);

  /* Preference was "ON" previously → resume on the first user gesture
     (browsers block autoplay until interaction). */
  useEffect(() => {
    if (playback !== "resuming") return;
    const onFirstGesture = () => {
      setPlayback("paused");
      void play();
    };
    window.addEventListener("pointerdown", onFirstGesture, { once: true });
    window.addEventListener("keydown", onFirstGesture, { once: true });
    return () => {
      window.removeEventListener("pointerdown", onFirstGesture);
      window.removeEventListener("keydown", onFirstGesture);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [playback]);

  const fadeTo = useCallback(
    (target: number, duration = 800, onDone?: () => void) => {
      const audio = audioRef.current;
      if (!audio) return;
      const start = audio.volume;
      const t0 = performance.now();
      const dur = reduce ? 60 : duration;
      const step = (now: number) => {
        const p = Math.min((now - t0) / dur, 1);
        audio.volume = start + (target - start) * p;
        if (p < 1) {
          fadeRaf.current = requestAnimationFrame(step);
        } else {
          fadeRaf.current = null;
          onDone?.();
        }
      };
      if (fadeRaf.current) cancelAnimationFrame(fadeRaf.current);
      fadeRaf.current = requestAnimationFrame(step);
    },
    [reduce],
  );

  const play = useCallback(async () => {
    const audio = audioRef.current;
    if (!audio || missing) return;
    try {
      await audio.play();
      fadeTo(volume / 100);
      try {
        localStorage.setItem(STORAGE_ENABLED, "1");
      } catch {
        /* ignore */
      }
    } catch {
      setPlayback("paused");
    }
  }, [missing, volume, fadeTo]);

  const stop = useCallback(() => {
    const audio = audioRef.current;
    if (!audio) return;
    fadeTo(0, 500, () => audio.pause());
    try {
      localStorage.setItem(STORAGE_ENABLED, "0");
    } catch {
      /* ignore */
    }
  }, [fadeTo]);

  const toggle = useCallback(() => {
    if (missing) return;
    if (playback === "playing") {
      stop();
    } else {
      void play();
    }
  }, [playback, missing, stop, play]);

  const onVolumeChange = (values: number[]) => {
    const v = values[0];
    setVolume(v);
    mutedRef.current = false;
    try {
      localStorage.setItem(STORAGE_VOLUME, String(v));
    } catch {
      /* ignore */
    }
    const audio = audioRef.current;
    if (audio && playback === "playing") audio.volume = v / 100;
  };

  const onMute = () => {
    const audio = audioRef.current;
    if (!audio) return;
    if (mutedRef.current) {
      mutedRef.current = false;
      audio.volume = volume / 100;
    } else {
      mutedRef.current = true;
      audio.volume = 0;
    }
  };

  const isOn = playback === "playing";

  return (
    <div className="fixed bottom-5 left-5 z-[60] flex flex-col-reverse items-start gap-2 sm:bottom-6 sm:left-6">
      <audio ref={audioRef} src={AUDIO_SRC} preload="metadata" />

      <AnimatePresence>
        {!missing && mounted && panelOpen && (
          <motion.div
            initial={{ opacity: 0, y: 8, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.96 }}
            transition={{ duration: 0.2 }}
            className="relative w-44 rounded-2xl border border-white/10 bg-surface-800/90 p-4 shadow-card backdrop-blur-xl"
            role="group"
            aria-label="Music controls"
          >
            <button
              type="button"
              onClick={() => setPanelOpen(false)}
              aria-label="Close music controls"
              className="absolute right-2.5 top-2.5 text-ink-muted transition hover:text-white"
            >
              <TbX size={14} />
            </button>

            <div className="flex items-center gap-2 font-mono text-[10px] uppercase tracking-widest text-ink-muted">
              {isOn ? (
                <span className="flex h-4 items-end gap-[3px]">
                  {[0, 1, 2].map((i) => (
                    <span
                      key={i}
                      className="eq-bar w-[3px] rounded-full bg-gradient-to-t from-primary to-accent"
                      style={{ height: "100%", animationDelay: `${i * 0.15}s` }}
                    />
                  ))}
                </span>
              ) : (
                <TbMusic size={13} className="text-accent" />
              )}
              <span>{isOn ? "playing" : playback === "resuming" ? "on hold" : "paused"}</span>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <button
                type="button"
                onClick={onMute}
                aria-label={mutedRef.current ? "Unmute" : "Mute"}
                aria-pressed={mutedRef.current}
                className="text-ink-soft transition hover:text-white"
              >
                {mutedRef.current || volume === 0 ? <TbVolume3 size={16} /> : <TbVolume size={16} />}
              </button>
              <Slider value={[mutedRef.current ? 0 : volume]} onValueChange={onVolumeChange} max={100} step={1} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <button
        type="button"
        onClick={toggle}
        onMouseEnter={() => setPanelOpen(true)}
        onFocus={() => setPanelOpen(true)}
        data-cursor="button"
        disabled={missing}
        aria-label={
          missing
            ? "Background music disabled — add public/audio/background-music.mp3"
            : isOn
              ? "Pause background music"
              : playback === "resuming"
                ? "Resume background music"
                : "Play background music"
        }
        aria-pressed={isOn}
        title={
          missing
            ? "Add /public/audio/background-music.mp3 to enable"
            : undefined
        }
        className={cn(
          "relative flex h-12 w-12 items-center justify-center rounded-full border transition-all duration-300 sm:h-14 sm:w-14",
          missing
            ? "border-white/10 bg-white/[0.03] text-ink-muted/60"
            : "border-accent/40 bg-surface-700 text-accent shadow-glow hover:scale-105 hover:shadow-glow",
          isOn && "border-accent bg-accent/15",
        )}
      >
        {missing ? (
          <TbHeadphones size={20} />
        ) : isOn ? (
          <span className="flex h-4 items-end gap-[3px]">
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="eq-bar w-[3px] rounded-full bg-gradient-to-t from-primary to-accent"
                style={{ height: "100%", animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </span>
        ) : playback === "resuming" ? (
          <TbPlayerPauseFilled size={20} />
        ) : (
          <TbPlayerPlayFilled size={20} />
        )}
      </button>
    </div>
  );
}