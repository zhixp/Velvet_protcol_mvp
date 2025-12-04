import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        velvet: {
          black: '#050505',
          charcoal: '#121212',
          gold: '#C5A059',
          blue: '#3B82F6',
        },
      },
      backdropBlur: {
        glass: '12px',
      },
    },
  },
  plugins: [],
};

export default config;
