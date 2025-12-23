// tailwind.config.js
const plugin = require("tailwindcss/plugin");

module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class", // ✅ enable theme toggle
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        sans: ["Inter", "ui-sans-serif", "system-ui"],
        heading: ["Orbitron", "sans-serif"],
        quote: ["Playfair Display", "serif"],
        inter: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
        jetbrains: ["JetBrains Mono", "monospace"],
        roboto: ["Roboto", "sans-serif"],
        ackbar: ["Ackbar", "cursive"], // ✅ already imported in index.css
      },
      keyframes: {
        marqueeLeft: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marqueeRight: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0%)" },
        },
      },
      animation: {
        marqueeLeft: "marqueeLeft 20s linear infinite",
        marqueeRight: "marqueeRight 20s linear infinite",
      },
      colors: {
        neon: "#39ff14", // ✅ neon green for dark mode accents
        lightBg: "#ffffff", // ✅ for white theme backgrounds
        lightText: "#111111", // ✅ for white theme text
        darkBg: "#000000", // ✅ explicit dark background
        darkText: "#f5f5f5", // ✅ explicit dark text
        colors: {
  neon: "#39ff14", // still keep neon
  accent: "var(--accent-color)", // NEW dynamic accent
  lightBg: "#ffffff",
  lightText: "#111111",
  darkBg: "#000000",
  darkText: "#f5f5f5",
},

      },
    },
  },
  plugins: [
    // Enable smooth scroll globally
    plugin(({ addBase }) => {
      addBase({
        html: { scrollBehavior: "smooth" },
      });
    }),
    require("@tailwindcss/typography"),
    require("@tailwindcss/forms"),
    require("@tailwindcss/aspect-ratio"),
    require("tailwind-scrollbar"),
  ],
};
