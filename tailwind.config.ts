import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Core dark palette
        void:      "#0E0E0E",
        chocolate: "#1A1410",
        // Core light palette
        parchment: "#F5F2ED",
        pearl:     "#EDE8E0",
        // Gold accent system
        gold: {
          DEFAULT: "#C6A56B",
          light:   "#DFC99A",
          dark:    "#9A7A42",
          pale:    "#F2E9D8",
        },
        // Product identity accents
        pistachio: {
          DEFAULT: "#7A9C5A",
          light:   "#A8C484",
          dark:    "#4F6E38",
        },
        hazel: {
          DEFAULT: "#8B5E3C",
          light:   "#B8845C",
          dark:    "#5C3A20",
        },
        lotus: {
          DEFAULT: "#C9A96E",
          light:   "#E8D5A3",
          dark:    "#9C7A42",
        },
        angel: {
          pink:    "#D4849A",
          blue:    "#84A8C4",
          light:   "#F0D8E0",
        },
        // Neutrals
        smoke:   "#2A2520",
        ash:     "#6B6560",
        mist:    "#C8C0B4",
      },
      fontFamily: {
        display: ["var(--font-playfair)", "Georgia", "serif"],
        sans:    ["var(--font-raleway)", "system-ui", "sans-serif"],
        mono:    ["var(--font-cormorant)", "Georgia", "serif"],
      },
      fontSize: {
        // Display scale
        "display-2xl": ["clamp(4rem, 9vw, 9rem)", { lineHeight: "0.9", letterSpacing: "-0.03em" }],
        "display-xl":  ["clamp(3rem, 7vw, 7rem)",  { lineHeight: "0.92", letterSpacing: "-0.025em" }],
        "display-lg":  ["clamp(2.2rem, 5vw, 5rem)", { lineHeight: "0.95", letterSpacing: "-0.02em" }],
        "display-md":  ["clamp(1.6rem, 3.5vw, 3.5rem)", { lineHeight: "1.05", letterSpacing: "-0.015em" }],
        // Body scale
        "body-xl":  ["1.125rem", { lineHeight: "1.7", letterSpacing: "0.01em" }],
        "body-lg":  ["1rem",     { lineHeight: "1.75", letterSpacing: "0.01em" }],
        "body-sm":  ["0.875rem", { lineHeight: "1.7", letterSpacing: "0.02em" }],
        // Label scale
        "label-lg": ["0.8125rem", { lineHeight: "1", letterSpacing: "0.2em" }],
        "label-md": ["0.75rem",   { lineHeight: "1", letterSpacing: "0.25em" }],
        "label-sm": ["0.6875rem", { lineHeight: "1", letterSpacing: "0.3em" }],
      },
      spacing: {
        "section": "clamp(5rem, 10vw, 10rem)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
        "800": "800ms",
        "1200": "1200ms",
      },
      transitionTimingFunction: {
        "luxury": "cubic-bezier(0.16, 1, 0.3, 1)",
        "snap":   "cubic-bezier(0.23, 1, 0.32, 1)",
      },
      animation: {
        "float":       "float 8s ease-in-out infinite",
        "float-slow":  "float 12s ease-in-out infinite reverse",
        "shimmer":     "shimmer 3s ease-in-out infinite",
        "grain":       "grain 0.8s steps(2) infinite",
        "marquee":     "marquee 30s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%":      { transform: "translateY(-14px)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.5" },
          "50%":      { opacity: "1" },
        },
        grain: {
          "0%, 100%": { transform: "translate(0, 0)" },
          "10%":  { transform: "translate(-2%, -3%)" },
          "20%":  { transform: "translate(3%, 1%)" },
          "30%":  { transform: "translate(-1%, 4%)" },
          "40%":  { transform: "translate(2%, -2%)" },
          "50%":  { transform: "translate(-3%, 3%)" },
          "60%":  { transform: "translate(1%, -1%)" },
          "70%":  { transform: "translate(-2%, 2%)" },
          "80%":  { transform: "translate(3%, -3%)" },
          "90%":  { transform: "translate(-1%, 1%)" },
        },
        marquee: {
          "0%":   { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      backgroundImage: {
        "grain-texture": "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='1'/%3E%3C/svg%3E\")",
        "gold-gradient":        "linear-gradient(135deg, #C6A56B 0%, #F2E9D8 50%, #C6A56B 100%)",
        "chocolate-gradient":   "linear-gradient(180deg, #0E0E0E 0%, #1A1410 100%)",
        "parchment-gradient":   "linear-gradient(180deg, #F5F2ED 0%, #EDE8E0 100%)",
      },
      clipPath: {
        "shard-right":  "polygon(0 0, 100% 0, 100% 85%, 90% 100%, 0 100%)",
        "shard-left":   "polygon(0 0, 100% 0, 100% 100%, 10% 100%, 0 85%)",
        "shard-bottom": "polygon(0 0, 100% 0, 100% 90%, 50% 100%, 0 90%)",
      },
    },
  },
  plugins: [],
};

export default config;
