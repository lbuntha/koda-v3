import type { Config } from "tailwindcss";
import { kodaColors } from "@koda/theme";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: kodaColors
    }
  },
  plugins: []
} satisfies Config;
