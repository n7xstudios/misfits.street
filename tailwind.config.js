/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'ink':     '#0a0a0a',
        'ash':     '#f5f5f0',
        'acid':    '#c8ff00',
        'rust':    '#ff3d00',
        'silver':  '#c0c0c0',
        'charcoal':'#1a1a1a',
        'concrete-white': '#f0f0f0',
        'neon-green': '#c8ff00',
      },
      fontFamily: {
        'syne':   ['"Syne"', 'sans-serif'],
        'mono':   ['"Space Mono"', 'monospace'],
        'marker': ['"Permanent Marker"', 'cursive'],
        // legacy alias
        'brutalist': ['"Syne"', 'sans-serif'],
      },
      fontSize: {
        'fluid-hero': 'clamp(4rem, 18vw, 18rem)',
      },
      animation: {
        'glitch':     'glitch 1s linear infinite',
        'noise':      'noise 0.18s steps(8) infinite',
        'pulse-slow': 'pulse 2.5s cubic-bezier(0.4,0,0.6,1) infinite',
        'marquee':    'marquee 20s linear infinite',
        'marquee-rev':'marquee-rev 14s linear infinite',
        'spool':      'spool 0.1s linear',
      },
      keyframes: {
        glitch: {
          '0%,100%': { clipPath: 'inset(0 0 98% 0)', transform: 'translate(-2px,0)' },
          '20%':     { clipPath: 'inset(30% 0 50% 0)', transform: 'translate(2px,0)' },
          '40%':     { clipPath: 'inset(60% 0 20% 0)', transform: 'translate(-1px,0)' },
          '60%':     { clipPath: 'inset(80% 0 5% 0)',  transform: 'translate(3px,0)' },
          '80%':     { clipPath: 'inset(10% 0 75% 0)', transform: 'translate(-3px,0)' },
        },
        noise: {
          '0%':   { transform: 'translate(0,0)' },
          '10%':  { transform: 'translate(-5%,-5%)' },
          '20%':  { transform: 'translate(-10%,5%)' },
          '30%':  { transform: 'translate(5%,-10%)' },
          '40%':  { transform: 'translate(-5%,15%)' },
          '50%':  { transform: 'translate(-10%,5%)' },
          '60%':  { transform: 'translate(15%,0)' },
          '70%':  { transform: 'translate(0,10%)' },
          '80%':  { transform: 'translate(-15%,0)' },
          '90%':  { transform: 'translate(10%,5%)' },
          '100%': { transform: 'translate(5%,0)' },
        },
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-rev': {
          '0%':   { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      backgroundImage: {
        'noise-pattern': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
}
