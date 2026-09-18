import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#3B82F6",
          light: "#60A5FA",
          dark: "#2563EB",
        },
        accent: {
          DEFAULT: "#38BDF8",
          soft: "#0EA5E9",
        },
        surface: {
          900: "#050816",
          800: "#0B1120",
          700: "#111827",
          600: "#1E293B",
        },
        ink: {
          DEFAULT: "#FFFFFF",
          soft: "#CBD5E1",
          muted: "#94A3B8",
        },
      },
      fontFamily: {
        heading: ["var(--font-space-grotesk)", "Inter", "system-ui", "sans-serif"],
        sans: ["var(--font-inter)", "Inter", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      boxShadow: {
        glow: "0 0 80px -18px rgba(56,189,248,0.5)",
        "glow-primary": "0 0 80px -18px rgba(59,130,246,0.55)",
        card: "0 20px 60px -30px rgba(2,6,23,0.9)",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-14px)" },
        },
        aurora: {
          "0%,100%": { transform: "translate(0,0) scale(1)" },
          "33%": { transform: "translate(50px,-40px) scale(1.12)" },
          "66%": { transform: "translate(-40px,30px) scale(0.92)" },
        },
        glowPulse: {
          "0%,100%": { opacity: "0.45" },
          "50%": { opacity: "0.9" },
        },
        spinSlow: {
          to: { transform: "rotate(360deg)" },
        },
        marquee: {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-50%)" },
        },
        eq: {
          "0%,100%": { transform: "scaleY(0.3)" },
          "50%": { transform: "scaleY(1)" },
        },
        pulseRing: {
          "0%": { transform: "scale(0.7)", opacity: "0.9" },
          "100%": { transform: "scale(2.4)", opacity: "0" },
        },
        shimmer: {
          "100%": { transform: "translateX(200%)" },
        },
        scan: {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100%)" },
        },
        blink: {
          "0%,100%": { opacity: "1" },
          "50%": { opacity: "0" },
        },
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        "float-slow": "float 9s ease-in-out infinite",
        aurora: "aurora 20s ease-in-out infinite",
        "glow-pulse": "glowPulse 5s ease-in-out infinite",
        "spin-slow": "spinSlow 24s linear infinite",
        marquee: "marquee 30s linear infinite",
        "pulse-ring": "pulseRing 1.6s cubic-bezier(0.2,0.6,0.4,1) infinite",
        shimmer: "shimmer 2.2s ease-in-out infinite",
        scan: "scan 5s ease-in-out infinite",
        blink: "blink 1.2s step-end infinite",
      },
      transitionTimingFunction: {
        spring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
      },
    },
  },
  plugins: [],
};

export default config;