import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: '#0D1B2A',
          light: '#162338',
          50: '#e8edf2',
        },
        nearblack: '#1E1E1E',
        offwhite: '#F4F4F2',
        silver: '#C0C0C0',
        lime: {
          DEFAULT: '#25D366',
          hover: '#1fb857',
          10: 'rgba(37,211,102,0.10)',
          20: 'rgba(37,211,102,0.20)',
        },
        midgray: '#666666',
        border: '#E2E2E0',
      },
      fontFamily: {
        sans: ['Arial', 'Helvetica Neue', 'Helvetica', 'sans-serif'],
      },
      letterSpacing: {
        widest: '0.12em',
      },
      boxShadow: {
        card: '0 1px 3px rgba(13,27,42,0.08), 0 1px 2px rgba(13,27,42,0.04)',
        elevated: '0 4px 16px rgba(13,27,42,0.12)',
        glow: '0 0 0 3px rgba(37,211,102,0.20)',
      },
      borderRadius: {
        xl: '12px',
        '2xl': '16px',
      },
    },
  },
  plugins: [],
}

export default config
