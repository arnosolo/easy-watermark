module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {},
    screens: {
      'sm': '25rem',
      // => @media (min-width: 640px) { ... }

      'md': '54rem',
      // => @media (min-width: 768px) { ... }

      'lg': '64em',
      // => @media (min-width: 1024px) { ... }

      'xl': '80em',
      // => @media (min-width: 1280px) { ... }

      '2xl': '86em',
      // => @media (min-width: 1536px) { ... }
    },
  },
  plugins: [],
}