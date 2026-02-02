
/** @type {import('tailwindcss').Config} */
export default {
  content: [
  './index.html',
  './src/**/*.{js,ts,jsx,tsx}'
],
  theme: {
    extend: {
      colors: {
        terminal: {
          black: '#0a0a0f',
          card: '#12121a',
          border: '#2a2a3e',
          text: '#e5e7eb',
          muted: '#6b7280',
        },
        accent: {
          green: '#22c55e',
          blue: '#3b82f6',
          purple: '#a855f7',
          yellow: '#eab308',
          red: '#ef4444',
        }
      },
      fontFamily: {
        mono: ['"JetBrains Mono"', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'blink': 'blink 1s step-end infinite',
        'scanline': 'scanline 8s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        scanline: {
          '0%': { backgroundPosition: '0% 0%' },
          '100%': { backgroundPosition: '0% 100%' },
        }
      }
    },
  },
  plugins: [],
}
