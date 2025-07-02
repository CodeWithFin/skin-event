/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Vitapharm Brand Colors
        'brand-brown': '#6B3F27',
        'brand-burgundy': '#8B2C3E',
        'brand-cream': '#F9F4EF',
        'brand-pink': '#F4C2C2',
        'brand-peach': '#FFDAB9',
        'brand-charcoal': '#333333',
      },
      fontFamily: {
        'sans': ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'blink': 'blink 1s linear infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        blink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0.3' },
        }
      }
    },
  },
  plugins: [],
}
