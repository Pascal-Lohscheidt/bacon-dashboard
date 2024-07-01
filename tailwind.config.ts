import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      gridTemplateColumns: {
        'main-grid': '1fr 35rem',
        overlay: '24rem 1fr 35rem',
      },
      gridTemplateRows: {
        'main-grid': '1fr',
        overlay: '6rem 1fr',
      },
    },
  },
  plugins: [],
};
export default config;
