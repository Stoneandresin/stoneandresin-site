import type { Config } from 'tailwindcss'

export default {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      container: {
        center: true,
        padding: "1rem",
        screens: {
          "2xl": "1280px"
        }
      }
    },
  },
  plugins: [],
} satisfies Config
