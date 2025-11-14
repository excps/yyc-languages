# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React-based multi-page language tutoring website for YYC-Languages, a German language tutoring service. Built with Vite, TypeScript, and Tailwind CSS v3, using React Router for navigation.

The site features multiple pages including a home page with landing sections, plus dedicated pages for About, FAQ, Privacy Policy, and Terms of Service.

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

### Version Control & Commits
This project uses semantic versioning with branch names (e.g., v0.2.1, v0.2.2).

**Automated Version Commit Workflow**:
```bash
npm run commit "your commit message"
```

This command automatically:
1. Detects current version branch (e.g., v0.2.1)
2. Increments patch version (e.g., v0.2.2)
3. Creates new branch with incremented version
4. Updates package.json version number
5. Stages all changes and commits with prefixed message
6. Pushes the new branch to remote repository

**Example**:
```bash
npm run commit "added new feature"
# Creates branch v0.2.2 with commit message: "v0.2.2 added new feature"
```

**Requirements**:
- Must be on a version branch (v#.#.#) for the script to work
- Script will fail if target version branch already exists

**Manual Commits**:
If you need to commit without incrementing the version, use standard git commands.

**Syncing with Latest Changes**:
```bash
npm run pull-latest
```

This command automatically:
1. Fetches all changes from remote repository
2. Identifies the latest version branch (highest version number)
3. Merges the latest branch into your current branch (with confirmation)
4. If you're already on the latest branch, pulls the latest changes

**Example use cases**:
- You're on `v0.2.1` and want to merge changes from `v0.2.3`
- You want to update your current branch with the latest remote changes
- You need to sync your local repository with the remote

### Deployment
```bash
make sync            # Alternative rsync (excludes node_modules)
```

### Docker Development
```bash
make dev-full        # Install deps and start development server
make deploy          # Build React app and create Docker image
make compose-up      # Start Docker container on port 8080
make compose-down    # Stop Docker container
```

Note: There are no test scripts or linting commands configured in this project.

## Architecture

### Tech Stack
- **Framework**: React 18.3.1 with TypeScript
- **Routing**: React Router DOM 7.9.5 for multi-page navigation
- **Build Tool**: Vite 6.4.1 with SWC plugin for fast React refresh
- **Styling**: Tailwind CSS v3.4.18 with CSS variables
- **UI Components**: Radix UI primitives for accessibility
- **Icons**: Lucide React
- **Deployment**: Docker with nginx for production

### Application Structure

The app uses React Router with multiple pages:

```
App.tsx (Router Layout):
├── Navigation (sticky header, shared across all pages)
├── Routes:
│   ├── / → HomePage (main landing with all sections)
│   ├── /about → AboutPage
│   ├── /meet-andrea → MeetAndreaPage
│   ├── /faq → FAQPage
│   ├── /privacy-policy → PrivacyPolicyPage
│   ├── /terms-of-service → TermsOfServicePage
│   └── * → NotFoundPage (404)
└── Footer (shared across all pages)
```

**HomePage Structure** (main landing page):
```
HomePage renders these components in order:
├── Hero (main landing section with CTA)
├── Features
├── Courses (3 German language levels)
├── Testimonials (currently commented out)
├── Pricing (3 plans: Meet & Greet, Standard, 10 Lesson OFFER)
└── Contact
```

**Key Navigation Patterns**:
- Hash-based scrolling within HomePage using `scrollIntoView({ behavior: 'smooth' })`
- HomePage uses `useLocation` hook to detect hash changes and auto-scroll to sections
- Sections have IDs (`courses`, `contact`, etc.) for scroll targets
- Navigation supports both page routes and hash scrolling on home page
- Site title "YYC-Languages" in navigation routes to home page
- Auto-scroll to top when navigating to HomePage without hash

### Component Organization

```
src/
├── App.tsx                    # Router setup with shared Navigation/Footer
├── main.tsx                   # React entry point
├── index.css                  # Compiled Tailwind CSS (auto-generated)
├── pages/
│   ├── HomePage.tsx           # Main landing page with all sections
│   ├── AboutPage.tsx          # Dedicated about page
│   ├── MeetAndreaPage.tsx     # About the tutor page
│   ├── FAQPage.tsx            # FAQ page
│   ├── PrivacyPolicyPage.tsx  # Privacy policy page
│   ├── TermsOfServicePage.tsx # Terms of service page
│   └── NotFoundPage.tsx       # 404 error page
├── components/
│   ├── Navigation.tsx         # Sticky nav with mobile menu
│   ├── Hero.tsx              # Landing section with CTA
│   ├── Features.tsx          # Feature grid
│   ├── Courses.tsx           # Course offerings
│   ├── Testimonials.tsx      # Customer testimonials
│   ├── Pricing.tsx           # Pricing tiers
│   ├── Contact.tsx           # Contact form
│   ├── Footer.tsx            # Footer with links
│   ├── ui/                   # Radix UI components (button, card, input, etc.)
│   └── general/              # ImageWithFallback
└── styles/
    └── globals.css            # Tailwind config & custom CSS variables
```

### Styling System

This project uses **Tailwind CSS v3** with CSS variables:

1. **CSS Variables**: Design tokens defined as CSS custom properties in `:root` and `.dark` selectors
2. **Custom Variants**: Dark mode uses `@custom-variant dark (&:is(.dark *));`
3. **Theme Variables**: Colors, spacing, typography defined in `globals.css` and referenced via `var(--variable-name)`

**Color System**: Uses a semantic color scheme with CSS variables:
- Primary colors: `--primary`, `--secondary`, `--accent`
- UI colors: `--background`, `--foreground`, `--border`, `--input`
- Feedback colors: `--destructive`, `--muted`
- Both light and dark themes defined

**Typography**: Custom font sizes defined as CSS variables with corresponding line heights.

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

### Docker Configuration

Production deployment uses Docker with nginx:
- **Dockerfile**: Multi-stage build with nginx Alpine
- **nginx.conf**: Custom configuration with security headers, gzip, caching
- **Environment variables**: Configurable via Docker environment
- **Health checks**: Built-in container health monitoring
- **Makefile**: Comprehensive build and deployment automation

## Working with Components

### UI Components
The `src/components/ui/` directory contains pre-built Radix UI components. These are compound components with consistent APIs:

- Use `variant` prop for visual variations
- Use `size` prop for sizing
- Components are fully typed with TypeScript
- All components support `className` for additional styling via `cn()` utility

### Adding New Pages

To add a new page:
1. Create component in `src/pages/`
2. Import and add route in `App.tsx`
3. Add navigation link in `Navigation.tsx` if needed
4. Ensure consistent layout with shared Navigation and Footer

### Adding New Sections to HomePage

When adding new sections to the main landing page:
1. Create component in `src/components/`
2. Import and render in `HomePage.tsx` in the desired order
3. Add an `id` attribute if it needs to be a scroll target
4. Update navigation links if needed

### Image Handling

Use `ImageWithFallback` component from `src/components/general/` for external images. This provides graceful fallback handling for broken image URLs.

## Important Notes

- **Multi-page architecture**: Uses React Router for navigation between pages
- **Hash scrolling**: HomePage supports smooth scrolling to sections via hash URLs
- **No TypeScript config file**: TypeScript configuration is minimal and handled by Vite
- **No linting/formatting**: Project has no ESLint or Prettier configuration
- **Docker ready**: Full containerization support for production deployment
- **Mobile-first responsive**: Uses Tailwind's responsive utilities (`sm:`, `md:`, `lg:`)
- **Environment variables**: Support for runtime configuration via Docker
- **Remote deployment**: Supports rsync deployment to remote server (doc0)
- **Git-based versioning**: Docker images tagged with branch names automatically