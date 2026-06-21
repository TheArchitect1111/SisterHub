import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand:   "var(--color-brand)",
        accent:  "var(--color-accent)",
        bg:      "var(--color-bg)",
        surface: "var(--color-surface)",
        muted:   "var(--color-text-muted)",
        border:  "var(--color-border)",
      },
      fontFamily: {
        display: ["var(--font-display)"],
        body:    ["var(--font-body)"],
      },
    },
  },
  plugins: [],
};

export default config;
