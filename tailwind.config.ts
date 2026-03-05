import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-mono)', 'ui-monospace', 'monospace'],
        mono: ['var(--font-mono)', 'ui-monospace', 'monospace'],
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      colors: {
        accent: {
          orange: 'var(--accent-orange)',
          blue: 'var(--accent-blue)',
          yellow: 'var(--accent-yellow)',
          grey: 'var(--accent-grey)',
          'grey-alt': 'var(--accent-grey-alt)',
          green: 'var(--accent-green)',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};

export default config;
