/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,jsx,ts,tsx}",
    "./src/components/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    fontFamily: {
      Lato: '"Lato", sans-serif"',
    },
    container: {
      center: true,
      padding: "4rem",
    },
    extend: {
      colors: {
        dark_primary: "#06223F",
        bg_light_primary: "#F5F9FD",
        gray: "#B7C5D3",
      },
      screens: {
        "xxs": "375px",
        "xs": "428px",
        "sm": "640px",
        "md": "769px",
        "lg": "1024px",
        "xl": "1152px",
        "2xl": "1280px",
        "3xl": "1360px",
        "4xl": "1366px",
        "5xl": "1400px",
        "6xl": "1440px",
        "7xl": "1600px",
        "8xl": "1680px",
        "9xl": "1920px",
    },
      backgroundImage: {
        primaryLinear: "linear-gradient(180deg, #bfabadbd 0.48%, #bfabad70 100%);",
      },
      dropShadow: {
        primary: "-5px 35px 40px rgba(223, 229, 236, 0.9)",
      },
    },
  },
  plugins: [],
}