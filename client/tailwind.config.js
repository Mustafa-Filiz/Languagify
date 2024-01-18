/** @type {import('tailwindcss').Config} */
import { nextui } from '@nextui-org/react'

export default {
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      backgroundImage: {
        spotify: "url('/spotify.jpeg')",
      },
      colors: {
        'spotify-green': '#1db954',
        'spotify-black': '#121212',
        'spotify-l-black': '#212121',
        'spotify-gray': '#535353',
        'spotify-l-gray': '#b3b3b3',
      },
    },
  },
  darkMode: 'class',
  plugins: [nextui()],
}
