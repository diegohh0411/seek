import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'serif': ['Young Serif'],
        'monospace': ['JetBrains Mono']
      }
    },
  },
  plugins: [],
} satisfies Config

