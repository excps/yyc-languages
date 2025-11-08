# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based single-page language tutoring website for YYC-Languages, a German language tutoring service. Built with Vite, TypeScript, and Tailwind CSS v4.

The site features a complete landing page with sections for hero, features, courses, testimonials, pricing, contact, and footer.

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
- **Build Tool**: Vite 6.4.1 with SWC plugin for fast React refresh
- **Styling**: Tailwind CSS v4 (using CSS-first approach via @theme)
- **UI Components**: Radix UI primitives for accessibility
- **Icons**: Lucide React

### Application Structure

The app follows a single-page architecture with all sections rendered in `App.tsx`:

```
App.tsx renders these components in order:
├── Navigation (sticky header with clickable logo)
├── Hero (main landing section with CTA)
├── Features
├── Courses (3 German language levels: Beginner, Intermediate, Advanced)
├── Testimonials
├── Pricing (3 plans: Meet & Greet, Standard, 10 Lesson OFFER)
├── Contact
└── Footer
```

**Key Navigation Pattern**:
- Smooth scroll navigation using `scrollIntoView({ behavior: 'smooth' })`
- Sections have IDs (`courses`, `contact`, etc.) for scroll targets
- Site title "YYC-Languages" in navigation is clickable and scrolls to top
- "About" menu item is hidden but kept in code for potential future use

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
│   └── general/              # ImageWithFallback
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

**German Flag Theme**: The site uses a consistent German flag color scheme (black/gray, red, gold/amber) across Courses and Pricing sections:
- Each card has a `color` property (e.g., `bg-gray-100 border-gray-300`, `bg-red-50 border-red-200`, `bg-amber-50 border-amber-200`)
- Each card has a `titleColor` property matching the border color (e.g., `text-gray-700`, `text-red-600`, `text-amber-600`)
- This creates visual consistency and thematic connection to German culture

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

### Card Components Pattern (Courses & Pricing)

Both `Courses.tsx` and `Pricing.tsx` follow a consistent card layout pattern:

**Structure**:
```jsx
<Card className="p-8 {color} border-2 flex flex-col h-full">
  <div className="flex-grow">
    {/* Header with colored title */}
    <h3 className={`text-2xl font-bold ${titleColor} mb-2`}>Title</h3>
    {/* Content, description, features list */}
  </div>
  {/* CTA Button - bottom aligned */}
  <Button className={popular ? 'bg-blue-600' : 'bg-gray-900'}>CTA</Button>
</Card>
```

**Key Patterns**:
- Cards use `flex flex-col h-full` for equal height
- Content wrapped in `flex-grow` div to push CTA button to bottom
- Titles are `text-2xl font-bold` with dynamic color matching card theme
- Feature lists use `space-y-3 mb-8` with `Check` icons from Lucide
- CTAs are bottom-aligned across all cards regardless of content height
- Button colors: blue for popular items, dark gray otherwise

**Data Structure** (both components):
```typescript
{
  name/level: string,
  color: string,           // e.g., "bg-red-50 border-red-200"
  titleColor: string,      // e.g., "text-red-600"
  popular?: boolean,       // Optional, affects button styling
  features: string[],
  // ... other properties
}
```

### Creating New Features

When adding new sections or features:
1. Create component in `src/components/`
2. Import and render in `App.tsx` in the desired order
3. Add an `id` attribute if it needs to be a scroll target
4. Update navigation links if needed
5. For card-based layouts, follow the Courses/Pricing pattern for consistency

### Image Handling

Use `ImageWithFallback` component from `src/components/general/` for external images. This provides graceful fallback handling for broken image URLs.

## Important Notes

- **No TypeScript config file**: TypeScript configuration is minimal and handled by Vite
- **No linting/formatting**: Project has no ESLint or Prettier configuration
- **Single-page app**: All content is on one page with smooth scrolling between sections
- **Mobile-first responsive**: Uses Tailwind's responsive utilities (`sm:`, `md:`, `lg:`)
- **Consistent Design**: When modifying cards, maintain consistency between Courses and Pricing sections (same padding, font sizes, spacing)
