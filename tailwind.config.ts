import {nextui} from "@nextui-org/theme";

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/spinner.js',
    './node_modules/@nextui-org/theme/dist/components/listbox.js',
    './node_modules/@nextui-org/theme/dist/components/card.jsx',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#E96137',
        secondary: '#404141',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        btn: {
          background: 'hsl(var(--btn-background))',
          'background-hover': 'hsl(var(--btn-background-hover))',
        },
      },
      extend: {
        width: {
          '110': '440px',
        }
      }
    },
  },
  darkMode: "class",
  plugins: [nextui()],
}
