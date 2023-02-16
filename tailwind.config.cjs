/** @type {import('tailwindcss').Config} */
module.exports = {
  mode: "jit",
  content: ['./public/**/*.html',"./src/**/*.{js,ts,jsx,tsx}",],
  theme: {
    extend: {
      keyframes: {
        popin: {
          '0%': { transform: 'scale(0)' },
          '70%': { transform: 'scale(1.2)' },
          '100%': { transform: 'scale(1)' }
        },
     }, 
     animation: {
      'appear': 'popin 0.7s ease-out',
    },}
  },
  plugins: [],
}
