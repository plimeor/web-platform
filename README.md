# web-platform

A personal web platform monorepo for building and experimenting with web applications, services, and shared packages.

## 🎯 Repository Scope

This is a long-term monorepo containing:

- **Web-facing applications** (SPA / SSR / hybrid)
- **Node.js services** (BFF, API, agents, web-facing services)
- **Shared packages** (auth, logging, utilities, types)
- **Experimental projects** and spikes

Both experimental and production-ready code coexist here. Maturity is expressed at the project level, not the repository level.

## 📁 Structure

```
web-platform/
├── apps/       # Runnable applications and services
├── packages/   # Shared libraries and utilities
└── infra/      # Deployment and infrastructure configuration
```

### What belongs here

- Web applications and user-facing services
- APIs and backend-for-frontend (BFF) services
- Shared utilities, types, and libraries used across projects
- Web-platform infrastructure and deployment configs

### What does NOT belong here

- Non-web-facing backend systems
- Offline data processing or batch jobs
- Model training or heavy ML infrastructure

## 🛠️ Tech Stack

- **Monorepo**: pnpm workspaces + Turborepo
- **Code quality**: Biome (formatter + linter)
- **Language**: TypeScript (optional per project)
- **Git hooks**: husky
- **Node.js**: v24+

## 🚀 Getting Started

### Prerequisites

- Node.js v24+
- pnpm v10+

### Installation

```bash
pnpm install
```

### Common Commands

```bash
# Build all projects
pnpm build

# Dev mode for all projects
pnpm dev

# Lint all projects
pnpm lint

# Type check all projects
pnpm typecheck

# Format code (entire monorepo)
pnpm format

# Check and fix (format + lint)
pnpm check

# Clean all build outputs
pnpm clean
```

## 📦 Adding New Projects

### Add an application

```bash
mkdir -p apps/my-app
cd apps/my-app
pnpm init
```

Update `apps/my-app/package.json`:
```json
{
  "name": "@repo/my-app",
  "version": "0.1.0",
  "private": true
}
```

### Add a package

```bash
mkdir -p packages/my-package
cd packages/my-package
pnpm init
```

Update `packages/my-package/package.json`:
```json
{
  "name": "@repo/my-package",
  "version": "0.1.0",
  "type": "module",
  "exports": {
    ".": {
      "types": "./dist/index.d.ts",
      "default": "./dist/index.js"
    }
  }
}
```

## 🏗️ Development Philosophy

- **Clear boundaries**: Prefer explicit over implicit
- **Simple conventions**: Avoid over-engineering
- **Extract when reused**: Don't prematurely create shared packages
- **Label experiments**: Make project maturity explicit
- **Long-term thinking**: Structure for maintainability

## 📝 License

MIT
