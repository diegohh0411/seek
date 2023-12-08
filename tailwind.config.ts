import type { Config } from 'tailwindcss'
import { config } from "./seek.config"

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './seek.config.ts'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Young Serif'],
        'sans-serif': ['Montserrat']
      },
      colors: {
        primary: `rgb(${config.primaryColor} / <alpha-value>)`,
      }
    },
  },
  plugins: [],
} satisfies Config

