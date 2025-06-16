# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Development
- `yarn dev` - Start development server at localhost:3000
- `yarn build` - Build production application
- `yarn start` - Start production server
- `yarn lint` - Run ESLint for code quality checks
- `yarn deploy` - Deploy to Vercel production

### Docker
- `docker build -t devfolio .` - Build Docker image
- `docker run -p 3000:3000 devfolio` - Run in container
- `./docker-build-run.sh` - Combined build and run script

## Architecture

### Core Structure
This is a Next.js 14 portfolio website with App Router featuring:

- **Single Page Application**: All content is on one page with smooth scrolling navigation
- **Component-based Architecture**: Modular React components in `/components`
- **Data-driven Content**: All portfolio content managed through TypeScript files in `/data`
- **Custom Animation System**: Framer Motion animations with custom cursor and floating icons
- **Responsive Design**: Mobile-first approach with touch optimization

### Key Features
- **Zen Mode**: Toggle to hide text content (`ZenModeContext`)
- **Custom Cursor**: Gaming-style cursor with smoke trail effects (desktop only)
- **Floating Tech Icons**: Interactive SVG icons from `/public/floating-icons`
- **Credly Badges**: Local OpenBadge 3.0 PNGs instead of iframes
- **Smooth Scrolling**: Custom scroll implementation using Locomotive Scroll

### Data Management
All portfolio content is centralized in `/data` directory:
- `personal.ts` - Professional identities and descriptions
- `projects.ts` - Project showcase data
- `experience.ts` - Work history
- `certifications.ts` - Professional certifications (uses Credly badge IDs)
- `tech-stack.ts` - Technologies and skills
- `social-media.ts` - Social links
- `navigation.ts` - Menu items

### Styling System
- **Tailwind CSS** with custom color palette:
  - `electricBlue` (#00FFFF) - Primary accent
  - `circuitGreen` (#39FF14) - Secondary accent  
  - `steelGray` (#71797E) - Neutral tones
  - `brushedAluminum` (#C0C0C0) - Metal effects
- **Custom animations** defined in tailwind.config.ts
- **Dark theme** optimized design

### Component Architecture
- **Layout Components**: Hero, About, Projects, Experience, Certifications, Contact
- **UI Components**: Custom cursor, background patterns, navigation, social links
- **Context Providers**: ZenMode state management, smooth scroll provider
- **Utility Components**: Reveal animations, spotlight effects, BentoGrid layouts

### Asset Management
- **Static Assets**: `/public/assets` for general images and CV
- **Tech Icons**: `/public/floating-icons` - SVG icons auto-loaded for animations
- **Credly Badges**: `/public/credly-badges` - PNG files named by badge ID
- **Image Optimization**: Next.js Image component with remote pattern allowlist

### Performance Features
- **Bundle Optimization**: Custom webpack config for chunk splitting
- **Image Optimization**: AVIF/WebP formats with custom sizes
- **Console Removal**: Production builds strip console logs
- **Compression**: Gzip compression enabled
- **Source Maps**: Disabled in production for security

## Development Notes

### Adding New Certifications
1. Download OpenBadge 3.0 PNG from Credly
2. Save to `/public/credly-badges/{badge-id}.png`
3. Add entry to `data/certifications.ts` with matching badge ID

### Adding Tech Icons
1. Place SVG files in `/public/floating-icons`
2. Icons automatically appear in background animations
3. Use tech-friendly naming (e.g., `react.svg`, `typescript.svg`)

### Touch Device Handling
- Custom cursor disabled on touch devices
- Mobile-optimized navigation and interactions
- Single-tap functionality (no double-tap delays)

### Smooth Scrolling
- Uses Locomotive Scroll library
- Custom scroll manager in `/utils/scrollManager.ts`
- Coordinated with Framer Motion animations