# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based single-page language tutoring website built with Vite, TypeScript, and Tailwind CSS v4.

The site features a complete landing page for a German language tutoring service with sections for hero, features, courses, testimonials, pricing, contact, and footer.

## Development Commands

### Starting Development
```bash
npm i                # Install dependencies
npm run dev          # Start development server (runs on port 3000)
```

### Building
```bash
npm run build        # Build for production (output to ./build directory)
```

Note: There are no test scripts or linting commands configured in this project.

## Architecture

### Tech Stack
- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.3.5 with SWC plugin for fast React refresh
- **Styling**: Tailwind CSS v4 (using CSS-first approach via @theme)
- **UI Components**: Radix UI primitives for accessibility
- **Icons**: Lucide React

### Application Structure

The app follows a single-page architecture with all sections rendered in `App.tsx`:

```
App.tsx renders these components in order:
├── Navigation (sticky header)
├── Hero (main landing section)
├── Features
├── Courses
├── Testimonials
├── Pricing
├── Contact
└── Footer
```

**Key Pattern**: The site uses smooth scroll navigation. Sections have IDs (`courses`, `contact`, etc.) and navigation buttons use `scrollIntoView({ behavior: 'smooth' })` to navigate between sections.

### Component Organization

```
src/
├── App.tsx                    # Main app component
├── main.tsx                   # React entry point
├── index.css                  # Compiled Tailwind CSS (auto-generated)
├── components/
│   ├── Navigation.tsx         # Sticky nav with mobile menu
│   ├── Hero.tsx              # Landing section with CTA
│   ├── Features.tsx          # Feature grid
│   ├── Courses.tsx           # Course offerings
│   ├── Testimonials.tsx      # Student reviews
│   ├── Pricing.tsx           # Pricing tiers
│   ├── Contact.tsx           # Contact form
│   ├── Footer.tsx            # Footer with links
│   ├── ui/                   # Radix UI components (button, card, input, etc.)
│   └── figma/                # ImageWithFallback
└── styles/
    └── globals.css            # Tailwind v4 config & custom CSS variables
```

### Styling System

This project uses **Tailwind CSS v4** which differs from v3:

1. **CSS-First Configuration**: No `tailwind.config.js`. Configuration is in `src/styles/globals.css` using `@theme` directive
2. **CSS Variables**: Design tokens defined as CSS custom properties in `:root` and `.dark` selectors
3. **Custom Variants**: Dark mode uses `@custom-variant dark (&:is(.dark *));`
4. **Theme Variables**: Colors, spacing, typography defined in `globals.css` and referenced via `var(--variable-name)`

**Color System**: Uses a semantic color scheme with CSS variables:
- Primary colors: `--primary`, `--secondary`, `--accent`
- UI colors: `--background`, `--foreground`, `--border`, `--input`
- Feedback colors: `--destructive`, `--muted`
- Both light and dark themes defined

**Typography**: Custom font sizes defined as CSS variables (`--text-sm` through `--text-6xl`) with corresponding line heights.

### Utility Functions

**`cn()` function** (`src/components/ui/utils.ts`): Combines `clsx` and `tailwind-merge` for conditional className composition. Use this when conditionally applying Tailwind classes:

```typescript
import { cn } from "@/components/ui/utils";

<div className={cn("base-class", condition && "conditional-class")} />
```

### Vite Configuration

The `vite.config.ts` includes extensive package version aliasing (mapping versioned imports like `vaul@1.1.2` to `vaul`). The `@` alias maps to `./src` for clean imports.

**Build settings**:
- Target: `esnext`
- Output: `./build`
- Dev server: Port 3000, auto-opens browser

## Working with Components

### UI Components
The `src/components/ui/` directory contains pre-built Radix UI components. These are compound components with consistent APIs:

- Use `variant` prop for visual variations
- Use `size` prop for sizing
- Components are fully typed with TypeScript
- All components support `className` for additional styling via `cn()` utility

### Creating New Features

When adding new sections or features:
1. Create component in `src/components/`
2. Import and render in `App.tsx` in the desired order
3. Add an `id` attribute if it needs to be a scroll target
4. Update navigation links if needed

### Image Handling

Use `ImageWithFallback` component from `src/components/figma/` for external images.

## Important Notes

- **No TypeScript config file**: TypeScript configuration is minimal and handled by Vite
- **No linting/formatting**: Project has no ESLint or Prettier configuration
- **Git not initialized**: This is not a git repository (no .git directory)
- **Single-page app**: All content is on one page with smooth scrolling between sections
- **Mobile-first responsive**: Uses Tailwind's responsive utilities (`sm:`, `md:`, `lg:`)
