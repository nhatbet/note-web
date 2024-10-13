/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontSize: {
      'sm': ['1.2rem', {
        lineHeight: '1.5',
        letterSpacing: '-0.01em',
        // fontWeight: '500',
      }],
      'base': ['1.4rem', {
        lineHeight: '1.5',
        letterSpacing: '-0.01em',
        // fontWeight: '500',
      }],
      'lg': ['1.8rem', {
        lineHeight: '2rem',
        letterSpacing: '-0.02em',
        // fontWeight: '500',
      }],
      'xl': ['2rem', {
        lineHeight: '2.25rem',
        letterSpacing: '-0.02em',
        // fontWeight: '500',
      }],
    }
  },
  plugins: [],
}

