/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx,mdx}",
    "./src/content/**/*.mdx",
  ],
  theme: {
    extend: {
      colors: {
        'sun-gold': '#fcd232',
        'sun-dark': '#0e211f',
      },
      fontFamily: {
        'sans': ['"Libre Franklin"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'serif': ['"Martel"', 'ui-serif', 'Georgia', 'serif'],
        'heading': ['"Libre Franklin"', 'ui-sans-serif', 'system-ui', 'sans-serif'],
        'body': ['"Martel"', 'ui-serif', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [
    require('tailwindcss-react-aria-components'),
    require('@tailwindcss/typography'),
  ],
}
