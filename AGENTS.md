# AGENTS.md

## Build & Development Commands
- `npm run dev` - Start development server (port 3000)
- `npm run build` - Build for production (output to ./build)
- `npm run commit "message"` - Automated version commit workflow (ask permission first)
- `npm run pull` - Smart sync with latest changes
- `npm run deploy` - Full deployment to build server (ask permission first)
- No test scripts configured - focus on manual testing

## Code Style Guidelines
- **Imports**: Use absolute imports with `@/` alias for src/ (e.g., `import { Button } from "@/components/ui/button"`)
- **Components**: Export named functions (not default), use PascalCase
- **Styling**: Tailwind CSS v3 with `cn()` utility from `@/components/ui/utils` for conditional classes
- **Types**: TypeScript strict mode, explicit prop types, no `any`
- **Error Handling**: Graceful fallbacks (use ImageWithFallback for images), no explicit error boundaries
- **Formatting**: No ESLint/Prettier - follow existing patterns exactly

## Architecture Patterns
- Multi-page React Router app with shared Navigation/Footer layout
- HomePage uses hash-based scrolling (`scrollIntoView({ behavior: 'smooth' })`)
- UI components from Radix UI with consistent variant/size props
- CSS variables for theming defined in globals.css
- Mobile-first responsive design with Tailwind breakpoints

## Important Workflow Rules
- Always check package.json for npm scripts before running commands
- Never run `npm run commit` or `npm run deploy` automatically - ask permission and wait for confirmation
- Follow existing component patterns in src/components/ui/
- Use semantic versioning branches (v#.#.#)
