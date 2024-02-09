/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'protest-riot': ['Protest Riot', 'sans-serif'],
        'Honk':['Honk','system-ui'],
        'Bungee-Spice':['Bungee Spice', 'sans-serif'],
        'Nabla':['Nabla',' system-ui']
      },
    },
  },
  plugins: [],
}

