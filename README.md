# Misfits Street // Digital Brutalism Demo

A raw, industrial, high-performance streetwear experience built with React, Tailwind CSS, GSAP, and Lenis.

## Tech Stack

- **Framework**: Vite + React (TypeScript)
- **Styling**: Tailwind CSS
- **Animation**: GSAP (ScrollTrigger, Draggable)
- **Smooth Scroll**: Lenis
- **Aesthetic**: Digital Brutalism (Noise, Glitch, massive Typography)

## Setup & Run

1. **Install Dependencies** (if not already done):
   ```bash
   npm install
   ```
2. **Start Dev Server**:

   ```bash
   npm run dev
   ```

3. **Open**: `http://localhost:5173`

## Features Implemented

- **Global Noise Overlay**: SVG-based persistent grain.
- **Brutalist Preloader**: 0-100% aggressive counter with snap-hide.
- **Hero Section**: Looping industrial video with `mix-blend-mode: difference` text.
- **Draggable Gallery**: OS-window style product cards with physics interaction.
- **Smooth Scroll**: Lenis integration with GSAP sync.

## Project Structure

- `src/components/Preloader.tsx` - The chaotic intro.
- `src/components/Hero.tsx` - The main visual impact.
- `src/components/DraggableGallery.tsx` - Interactive product zone.
- `src/App.tsx` - Main orchestrator and layout.
- `src/index.css` - Global styles, fonts, and noise animation.
- `tailwind.config.js` - Custom theme colors (Charcoal, Neon Green).
