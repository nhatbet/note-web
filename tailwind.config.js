/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  // purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {},
    fontSize: {
      'sm': ['.8rem', {
        lineHeight: '1.5',
        letterSpacing: '-0.01em',
        // fontWeight: '500',
      }],
      'base': ['1rem', {
        lineHeight: '1.5',
        letterSpacing: '-0.01em',
        // fontWeight: '500',
      }],
      'lg': ['1.5rem', {
        lineHeight: '2rem',
        letterSpacing: '-0.02em',
        // fontWeight: '500',
      }],
      'xl': ['3rem', {
        lineHeight: '2.25rem',
        letterSpacing: '-0.02em',
        // fontWeight: '500',
      }],
    }
  },
  plugins: [],
}

