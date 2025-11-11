# Origo Web

A modern, high-performance web application built with [Next.js 16](https://nextjs.org), [React 19](https://react.dev/), and [Bun](https://bun.sh/). This app is part of the Origo monorepo and includes TypeScript support, TanStack Query for data fetching, Tailwind CSS for styling, and comprehensive testing with Vitest.

## Features

- **Next.js 16**: Latest Next.js with App Router and Turbopack
- **React 19**: Cutting-edge React features
- **Type-Safe**: Full TypeScript support
- **Data Fetching**: TanStack Query for powerful async state management
- **Styling**: Tailwind CSS 4 for utility-first styling
- **API Client**: Pre-configured Axios client with interceptors
- **Testing**: Vitest + React Testing Library
- **Code Quality**: Integrated Biome for fast linting and formatting
- **Hot Reload**: Development mode with instant updates

## Prerequisites

- [Bun](https://bun.sh/) >= 1.0.0 or Node.js >= 22

## Getting Started

### Install dependencies (from monorepo root)

```bash
bun install
```

### Start development server

From the monorepo root:

```bash
bun run dev
```

Or directly from the Web directory:

```bash
cd apps/web
bun run dev
```

The app will start on `http://localhost:3000` with hot reload enabled.

## Available Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start development server with hot reload |
| `bun run build` | Build for production |
| `bun run start` | Start production server |
| `bun run test` | Run tests once |
| `bun run test:watch` | Run tests in watch mode |
| `bun run test:ui` | Run tests with Vitest UI |
| `bun run test:coverage` | Run tests with coverage report |
| `bun run lint` | Lint code with Biome |
| `bun run format` | Format code with Biome |
| `bun run typecheck` | Type check with TypeScript |

## Project Structure

```
apps/web/
├── app/                      # Next.js App Router
│   ├── lib/                  # Shared utilities
│   │   ├── api/              # API client configuration
│   │   └── hooks/            # Custom React hooks
│   ├── providers/            # React context providers
│   ├── __tests__/            # Test files
│   ├── layout.tsx            # Root layout
│   ├── page.tsx              # Home page
│   └── globals.css           # Global styles
├── biome.json                # Biome configuration
├── next.config.ts            # Next.js configuration
├── tailwind.config.ts        # Tailwind configuration
├── vitest.config.ts          # Vitest configuration
├── tsconfig.json             # TypeScript configuration
└── package.json              # Dependencies and scripts
```

## Environment Variables

Create a `.env.local` file in the `apps/web` directory:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3333
```

See `.env.example` for all available variables.

## API Integration

The app includes a pre-configured API client using Axios with interceptors for error handling:

```typescript
import { apiClient } from "@/lib/api"

// Use the client
const response = await apiClient.get("/endpoint")
```

## Testing

Tests are written using Vitest and React Testing Library:

```bash
# Run tests
bun run test

# Watch mode
bun run test:watch

# With coverage
bun run test:coverage

# With UI
bun run test:ui
```

## Styling

This app uses Tailwind CSS 4. Customize your theme in `tailwind.config.ts`.

## Type Safety

Shared types from `@origo/shared-types` package are available:

```typescript
import type { ApiResponse } from "@origo/shared-types"
```

## Learn More

- [Next.js Documentation](https://nextjs.org/docs)
- [React Documentation](https://react.dev/)
- [TanStack Query Documentation](https://tanstack.com/query)
- [Tailwind CSS Documentation](https://tailwindcss.com/)
- [Vitest Documentation](https://vitest.dev/)
- [Biome Documentation](https://biomejs.dev/)

## Deployment

The easiest way to deploy is using [Vercel](https://vercel.com):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/yourusername/origo)

See the [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more options.
