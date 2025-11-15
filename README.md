# YYC-Languages

A React-based multi-page language tutoring website for YYC-Languages, a German language tutoring service. Built with Vite, TypeScript, and Tailwind CSS v3, using React Router for navigation.

## Quick Start

### Installation
```bash
npm i
```

### Development
```bash
npm run dev          # Start development server (port 3000)
```

### Building
```bash
npm run build        # Build for production (output to ./build)
npm run preview      # Preview production build
```

## Version Control

This project uses semantic versioning with branch names (e.g., v0.3.1, v0.3.2).

### Automated Version Commit
```bash
npm run commit "your commit message"
```

This automatically:
- Increments patch version (v0.3.1 → v0.3.2)
- Creates new version branch
- Updates package.json
- Commits and pushes changes

### Sync with Latest
```bash
npm run pull         # Fetch and merge latest version branch
```

## Deployment

### Full Deployment
```bash
npm run deploy       # Deploy to remote server (doc0)
```

### Update Portainer Stack
```bash
npm run portainer-update <version>
```

## Documentation

- **[CLAUDE.md](CLAUDE.md)** - Comprehensive development guide
- **[docs/](docs/)** - Additional documentation
  - [Sync Workflow](docs/sync-workflow.md) - `npm run pull` workflow diagram

## Tech Stack

- **Framework**: React 18.3.1 with TypeScript
- **Build Tool**: Vite 6.4.1
- **Styling**: Tailwind CSS v3.4.18
- **Routing**: React Router DOM 7.9.5
- **UI Components**: Radix UI primitives
- **Deployment**: Docker with nginx

## Project Structure

```
src/
├── pages/           # Page components (Home, About, FAQ, etc.)
├── components/      # Reusable components
│   ├── ui/         # Radix UI components
│   └── general/    # Shared components
└── styles/         # Tailwind CSS configuration
```
