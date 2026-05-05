import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{ts,tsx}',
    './src/components/**/*.{ts,tsx}',
    './src/app/**/*.{ts,tsx}',
    './src/lib/**/*.{ts,tsx}'
  ],
  theme: {
    extend: {
      colors: {
        bg: 'hsl(var(--bg))',
        fg: 'hsl(var(--fg))',
        muted: 'hsl(var(--muted))',
        border: 'hsl(var(--border))',
        card: 'hsl(var(--card))',
        accent: 'hsl(var(--accent))'
      },
      boxShadow: {
        glow: '0 0 0 1px rgba(255,255,255,0.06), 0 24px 80px rgba(15, 23, 42, 0.08)'
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(18px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' }
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' }
        }
      },
      animation: {
        fadeUp: 'fadeUp 0.8s ease-out both',
        float: 'float 6s ease-in-out infinite'
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui'],
        serif: ['Cormorant Garamond', 'ui-serif', 'Georgia']
      }
    }
  },
  plugins: []
};

export default config;
