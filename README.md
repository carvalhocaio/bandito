# Origo

A modern full-stack monorepo template with Fastify and Next.js, powered by Turborepo and Bun.

## Tech Stack

### Frontend (`apps/web`)
- **[Next.js 16](https://nextjs.org/)** - React framework for production with App Router
- **[React 19](https://react.dev/)** - UI library
- **[TanStack Query](https://tanstack.com/query)** - Powerful data fetching and caching
- **[Tailwind CSS 4](https://tailwindcss.com/)** - Utility-first CSS framework
- **[Axios](https://axios-http.com/)** - HTTP client with interceptors
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### Backend (`apps/api`)
- **[Fastify](https://fastify.dev/)** - Fast and low overhead web framework
- **[Zod](https://zod.dev/)** - TypeScript-first schema validation
- **[Fastify Type Provider Zod](https://github.com/turkerdev/fastify-type-provider-zod)** - Type-safe routes
- **[Fastify Swagger](https://github.com/fastify/fastify-swagger)** - OpenAPI documentation
- **[Scalar API Reference](https://github.com/scalar/scalar)** - Beautiful API documentation
- **[Biome](https://biomejs.dev/)** - Fast formatter and linter
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety

### Runtime & Tooling
- **[Bun](https://bun.sh/)** - Fast all-in-one JavaScript runtime
- **[Turborepo](https://turbo.build/repo)** - High-performance build system for monorepos
- **[Husky](https://typicode.github.io/husky/)** - Git hooks
- **[lint-staged](https://github.com/lint-staged/lint-staged)** - Run linters on staged files

## Prerequisites

- **[Bun](https://bun.sh/)** 1.0+ (recommended) or Node.js 18+

Install Bun:
```bash
curl -fsSL https://bun.sh/install | bash
```

Or use Node.js with npm if you prefer.

## Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/carvalhocaio/origo.git
   cd origo
   ```

2. **Install dependencies**
   ```bash
   bun install
   ```

   Or with npm:
   ```bash
   npm install
   ```

3. **Run development servers**
   ```bash
   bun run dev
   ```

   Or with npm:
   ```bash
   npm run dev
   ```

   This will start:
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:3333
   - API Docs: http://localhost:3333/docs

## Project Structure

```
origo/
├── apps/
│   ├── api/                  # Fastify backend
│   │   ├── src/
│   │   │   └── server.ts     # Main application file
│   │   ├── biome.json        # Biome configuration
│   │   ├── tsconfig.json     # TypeScript configuration
│   │   └── package.json
│   └── web/                  # Next.js frontend
│       ├── app/              # Next.js app directory
│       │   ├── lib/          # Libraries and utilities
│       │   │   ├── api/      # API client
│       │   │   └── hooks/    # Custom React hooks
│       │   ├── providers/    # React context providers
│       │   ├── layout.tsx    # Root layout
│       │   └── page.tsx      # Home page
│       ├── biome.json        # Biome configuration
│       ├── next.config.ts    # Next.js configuration
│       ├── tailwind.config.ts
│       ├── tsconfig.json     # TypeScript configuration
│       └── package.json
├── packages/                 # Shared packages (future)
├── .github/
│   └── workflows/
│       └── build.yml         # CI/CD pipeline
├── .husky/                   # Git hooks
├── package.json              # Root package.json
└── turbo.json                # Turborepo configuration
```

## Available Scripts

### Root
- `bun run dev` - Start all apps in development mode (parallel)
- `bun run build` - Build all apps for production

### Frontend (`apps/web`)
- `bun run dev` - Start Next.js dev server (port 3000)
- `bun run build` - Build for production
- `bun run start` - Start production server
- `bun run lint` - Check code with Biome
- `bun run format` - Format and fix code with Biome

### Backend (`apps/api`)
- `bun run dev` - Start Fastify server with hot reload (port 3333)
- `bun run start` - Start production server
- `bun run lint` - Check code with Biome
- `bun run format` - Format and fix code with Biome

## Configuration

### Environment Variables

Create `.env` files in each app directory:

**`apps/web/.env`**
```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3333
```

**`apps/api/.env`**
```env
PORT=3333
HOST=0.0.0.0
```

### Linting & Formatting

This project uses automatic code quality checks before commits:

- **TypeScript files**: Automatically formatted and linted with Biome
- Pre-commit hooks run automatically when you commit
- Fixable issues are corrected automatically
- Non-fixable errors will block the commit

### API CORS

The Fastify backend is configured to accept requests from all origins by default.
Update the CORS settings in `apps/api/src/server.ts` for production:

```typescript
await app.register(fastifyCors, {
  origin: process.env.ALLOWED_ORIGINS || true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
})
```

## API Documentation

When the API is running, you can access:

- **Interactive API Docs (Scalar)**: http://localhost:3333/docs
- **Swagger JSON**: http://localhost:3333/documentation/json

The API uses OpenAPI 3.0 specification and provides:
- Type-safe request/response validation with Zod
- Automatic schema generation
- Beautiful interactive documentation

## Features

### Type Safety
- Full TypeScript across the monorepo
- Zod schemas for runtime validation
- Type-safe API routes with Fastify Type Provider

### Developer Experience
- Hot reload in development (both API and web)
- Fast builds with Turborepo caching
- Automatic code formatting with Biome
- Git hooks for code quality

### Production Ready
- Optimized builds
- CI/CD with GitHub Actions
- Environment variables support
- CORS configuration

## CI/CD

The project includes a GitHub Actions workflow that:
- Runs on push to `main` branch
- Runs on pull requests to `main`
- Installs dependencies with Bun
- Builds all apps to ensure no errors

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'feat: add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

This template combines the best practices from modern web development, leveraging the power of:
- **Bun** for blazing fast JavaScript runtime
- **Turborepo** for efficient monorepo management and caching
- **Fastify** for high-performance TypeScript APIs
- **Next.js** for cutting-edge React development with App Router
- **Biome** for lightning-fast linting and formatting
