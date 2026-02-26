/** @type {import('tailwindcss').Config} */
export default {
  content: ['./app/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}', './hooks/**/*.{js,ts,jsx,tsx}', './context/**/*.{js,ts,jsx,tsx}', './lib/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        // ─── MONOCHROME CORE ───
        ink: '#000000',          // Pure black background
        ash: '#FFFFFF',          // Pure white text
        charcoal: '#111111',     // Cards, panels, elevated surfaces
        silver: '#888888',       // Muted text, secondary info

        // ─── GREEN ACCENTS (A/B comparison) ───
        acid: '#c8ff00',         // Yellow-green (current)
        electric: '#39FF14',     // Electric green (new option)

        // ─── SEMANTIC ───
        rust: '#ff3d00',         // Errors, sold-out, warnings

        // ─── LEGACY (keep for compatibility) ───
        'concrete-white': '#F0F0F0',
        'neon-green': '#39FF14',
      },
      fontFamily: {
        syne: ['Syne', 'sans-serif'],
        mono: ['"Space Mono"', 'monospace'],
        marker: ['"Permanent Marker"', 'cursive'],
        brutalist: ['Syne', 'sans-serif'],
      },
      fontSize: {
        'display-xl': ['clamp(5rem, 22vw, 20rem)', { lineHeight: '0.85', letterSpacing: '-0.04em' }],
        'display-lg': ['clamp(3.5rem, 16vw, 14rem)', { lineHeight: '0.85', letterSpacing: '-0.03em' }],
        'display-md': ['clamp(2.5rem, 8vw, 7rem)', { lineHeight: '0.85', letterSpacing: '-0.03em' }],
        'display-sm': ['clamp(2rem, 6vw, 5rem)', { lineHeight: '0.9', letterSpacing: '-0.02em' }],
        'label-xs': ['9px', { lineHeight: '1.4', letterSpacing: '0.3em' }],
        'label-2xs': ['8px', { lineHeight: '1.4', letterSpacing: '0.4em' }],
      },
      animation: {
        'glitch': 'glitch 0.3s ease-in-out',
        'noise': 'noise 0.5s steps(2) infinite',
        'pulse-slow': 'pulse 3s ease-in-out infinite',
        'marquee': 'marquee 20s linear infinite',
        'spool': 'spool 2s ease-in-out',
        'float': 'float 6s ease-in-out infinite',
        'shimmer': 'shimmer 2s linear infinite',
      },
      keyframes: {
        glitch: {
          '0%, 100%': { transform: 'translate(0)' },
          '20%': { transform: 'translate(-3px, 3px)' },
          '40%': { transform: 'translate(3px, -3px)' },
          '60%': { transform: 'translate(-2px, -2px)' },
          '80%': { transform: 'translate(2px, 2px)' },
        },
        noise: {
          '0%': { transform: 'translate(0, 0)' },
          '100%': { transform: 'translate(-10%, -10%)' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        spool: {
          '0%': { strokeDashoffset: '283' },
          '100%': { strokeDashoffset: '0' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'noise-texture': "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E\")",
      },
    },
  },
  plugins: [],
};
