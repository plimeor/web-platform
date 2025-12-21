# TypeScript Configuration

Shared TypeScript configurations for the monorepo.

## Available Configurations

### `base.json`

Core TypeScript configuration with strict mode enabled. This is the foundation for all other configs.

Key features:
- ES2022 target with bundler module resolution
- Strict type checking with additional safety options
- `noEmit: true` by default (build tools handle output)

### `node.json`

Configuration for Node.js services. Extends `base.json`.

- ES2022 lib only (no DOM types)

### `react.json`

Configuration for React applications (Vite). Extends `base.json`.

- DOM and DOM.Iterable type definitions
- React JSX transform support

### `bun.json`

Configuration for Bun runtime services. Extends `base.json`.

- ES2022 lib only (no DOM types)
- Bun type definitions included

## Usage

In your project's `tsconfig.json`:

```jsonc
{
  "extends": "../../infra/typescript/react.json",
  "compilerOptions": {
    "baseUrl": ".",
    "paths": {
      "@/*": ["./src/*"]
    }
  },
  "include": ["src/**/*"]
}
```

## Configuration Options Reference

### Type Checking Options

| Option | Description |
|--------|-------------|
| `strict` | Enables all strict type-checking options |
| `noUnusedLocals` | Reports errors on unused local variables |
| `noUnusedParameters` | Reports errors on unused parameters |
| `noFallthroughCasesInSwitch` | Reports errors for fallthrough cases in switch |
| `noUncheckedIndexedAccess` | Adds `undefined` to index signature results |
| `exactOptionalPropertyTypes` | Differentiates `undefined` from missing properties |
| `noImplicitReturns` | Ensures all code paths return a value |
| `noImplicitOverride` | Requires `override` keyword for overridden methods |

### Module Options

| Option | Description |
|--------|-------------|
| `moduleResolution: "bundler"` | Optimized for bundlers like Vite |
| `moduleDetection: "force"` | Treats all files as modules (avoids global scripts) |
| `verbatimModuleSyntax` | Enforces explicit `type` imports/exports |
| `isolatedModules` | Ensures compatibility with single-file transpilers |

## Philosophy

- **Strict by default**: All strict checks enabled
- **Modern ESM**: ESNext modules with bundler resolution
- **Safety first**: Additional checks like `noUncheckedIndexedAccess`
- **No emit by default**: Build tools (Vite, Bun) handle output
- **Project-specific paths**: Each project defines its own path aliases
