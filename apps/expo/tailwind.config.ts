import baseConfig from "@empathattic/tailwind-config";
import { type Config } from "tailwindcss";

export default {
  presets: [baseConfig],
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
} satisfies Config;
