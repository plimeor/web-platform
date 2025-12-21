# Agent Guidelines for web-platform

## Commands
- **Build all**: `pnpm build` (from root) or `turbo build`
- **Build specific app**: `cd apps/thread-server && bun build src/index.ts --outdir dist` or `cd apps/thread-client && tsc -b && vite build`
- **Dev**: `pnpm dev` (all apps) or `cd apps/<app-name> && pnpm dev`
- **Lint**: `pnpm lint` (all) or `cd apps/<app-name> && pnpm lint`
- **Format**: `pnpm format` (Biome) or `pnpm check` (lint + format)
- **Typecheck**: `pnpm typecheck` (all) or `cd apps/<app-name> && pnpm typecheck`
- **Database**: `cd apps/thread-server && pnpm db:generate|db:migrate|db:studio`

## Code Style
- **Formatter**: Biome with 2-space indents, 100 char line width, single quotes, semicolons as needed, no trailing commas
- **Imports**: Use path aliases `@/*` for local imports (e.g., `@/lib/api`), external imports first, then local
- **Types**: Strict TypeScript, infer types from Drizzle schemas (`typeof table.$inferSelect`), explicit return types on exported functions
- **Naming**: camelCase for variables/functions, PascalCase for types/classes/components, UPPER_SNAKE_CASE for constants
- **Error handling**: Use Elysia built-in error classes only:

### Built-in Error Classes
- `NotFoundError` (404): For missing resources
  ```ts
  throw new NotFoundError('User not found')
  ```

- `InternalServerError` (500): For server/database failures
  ```ts
  throw new InternalServerError('Database connection failed')
  ```

- `ParseError` (400): For request parsing failures and permission denied
  ```ts
  throw new ParseError(new Error('Invalid request format'))
  // Use for permission denied: user exists but can't access resource
  ```

- `InvalidCookieSignature` (400): For invalid signed cookies
  ```ts
  throw new InvalidCookieSignature('session-token', 'Invalid cookie signature')
  ```

- `InvalidFileType` (400): For file type validation failures
  ```ts
  throw new InvalidFileType('avatar', ['image/jpeg', 'image/png'])
  ```

- `ValidationError` (422): For request schema validation failures
  ```ts
  // Thrown automatically by Elysia for validation failures
  ```

### Built-in Status Codes
- `status(code, message)`: For any HTTP status code
  ```ts
  throw status(401, 'Unauthorized')
  throw status(403, 'Forbidden')
  throw status(418, "I'm a teapot")
  ```

### Usage Patterns
- **Authentication failures**: `throw status(401, 'Unauthorized')`
- **Permission denied**: `throw new ParseError(new Error('Access denied'))`
- **Missing resources**: `throw new NotFoundError('Resource not found')`
- **Server/database errors**: `throw new InternalServerError('Operation failed')`
- **Validation errors**: Handled automatically by Elysia
- **All other cases**: Use `status(code, message)` for custom responses

### Global Error Handler
Register errors in global error handler for type safety:
```ts
const app = new Elysia()
  .error({ NotFoundError, InternalServerError, ParseError })
  .onError(({ code, error, set }) => {
    switch (code) {
      case 'NotFoundError': set.status = 404; break
      case 'INTERNAL_SERVER_ERROR': set.status = 500; break
      case 'PARSE': set.status = 400; break
      // Handle all built-in error codes
    }
  })
```

- No custom error classes needed - use Elysia's native error handling
- **Namespaces**: Use namespaces for service grouping (e.g., `export namespace AuthService { export async function ... }`)
- **React**: Functional components with hooks, memoize expensive computations with `useMemo`
- **Database**: Drizzle ORM for schema and queries, UUID primary keys, timestamp defaults with `defaultNow()`

## Project Structure
- Turborepo monorepo with pnpm workspaces
- **thread-server**: Bun + Elysia backend with Drizzle ORM + Postgres
- **thread-client**: React + Vite frontend with React Router
- Node >=24, pnpm >=10
