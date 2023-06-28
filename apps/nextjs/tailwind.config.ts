import type { Config } from "tailwindcss";

import baseConfig from "@empathattic/tailwind-config";

export default {
  content: ["./src/**/*.tsx"],
  presets: [baseConfig],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)"],
        heading: ["var(--font-raleway)"],
      },
    },
  },
} satisfies Config;
