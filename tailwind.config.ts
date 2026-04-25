import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        bg: "#0E0E0E",
        text: "#D8D8D8",
        muted: "#6B6B6B",
        accent: "#FF4A4A",
        surface: "#161616",
        line: "#222222"
      },
      fontFamily: {
        display: ['"Degular Display"', "ui-serif", "Georgia", "serif"],
        sans: ['"Satoshi"', "ui-sans-serif", "system-ui", "sans-serif"],
        mono: ['"JetBrains Mono"', "ui-monospace", "SFMono-Regular", "monospace"]
      },
      spacing: {
        xs: "8px",
        sm: "16px",
        md: "32px",
        lg: "64px",
        xl: "96px",
        "2xl": "160px",
        "3xl": "240px"
      },
      maxWidth: {
        content: "1400px"
      },
      letterSpacing: {
        micro: "0.1em",
        hero: "-0.03em"
      },
      lineHeight: {
        hero: "0.95"
      },
      transitionTimingFunction: {
        snappy: "cubic-bezier(0.16, 1, 0.3, 1)",
        smooth: "cubic-bezier(0.87, 0, 0.13, 1)",
        circ: "cubic-bezier(0.85, 0, 0.15, 1)"
      },
      boxShadow: {
        none: "0 0 #0000"
      }
    }
  },
  plugins: []
};

export default config;

