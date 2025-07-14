/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        space: ['Space Grotesk', 'sans-serif'],
        inter: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
        handwriting: ['Great Vibes', 'cursive'], // 👑 Signature font
        fontFamily: {
  poppins: ['Poppins', 'sans-serif'],
  jetbrains: ['JetBrains Mono', 'monospace'],
  // keep others if you need them
},

      },
      colors: {
        accent: '#00FFB3',
        lightAccent: '#00ccff',
        dark: {
          100: '#1a1a1a',
          200: '#2a2a2a',
          300: '#3a3a3a',
        },
      },
      animation: {
        float: 'float 6s ease-in-out infinite',
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'spin-slow': 'spin 20s linear infinite',
        blink: 'blink 1s step-start infinite',
        fadeInSlow: 'fadeInSlow 2s ease-in-out forwards',
        signature: 'signatureDraw 3s ease forwards',
        waveGlow: 'waveGlow 6s ease-in-out infinite',
        typing: 'typing 3.5s steps(40, end)',
        blinkCursor: 'blinkCursor 0.8s step-start infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0' },
        },
        fadeInSlow: {
          '0%': { opacity: '0', transform: 'translateY(10px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        signatureDraw: {
          '0%': { strokeDashoffset: 1000, opacity: 0 },
          '20%': { opacity: 1 },
          '100%': { strokeDashoffset: 0, opacity: 1 },
        },
        waveGlow: {
          '0%, 100%': { filter: 'drop-shadow(0 0 6px #00ffcc)' },
          '50%': { filter: 'drop-shadow(0 0 20px #00ffcc)' },
        },
        typing: {
          'from': { width: '0' },
          'to': { width: '100%' },
        },
        blinkCursor: {
          '0%': { borderColor: 'transparent' },
          '50%': { borderColor: '#00FFB3' },
          '100%': { borderColor: 'transparent' },
        },
      },
    },
  },
  plugins: [],
};
