/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        "stone-gray": "#E2E2DF",
        "kuro-midori": "#1B241E",
        "brass-gold": "#BBA57B",
        "urushi-red": "#AE282C",
        // Tuned for kuro-midori surfaces: slightly higher luminance, controlled chroma
        "urushi-on-dark": "#BF3E42",
      },
      fontFamily: {
        sans: [
          "var(--font-inter)",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        display: [
          "var(--font-playfair)",
          "ui-serif",
          "Georgia",
          "serif",
        ],
      },
      spacing: {
        section: "7.5rem",
        "section-lg": "10rem",
        "section-xl": "12.5rem",
      },
    },
  },
};
