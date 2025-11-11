# Origo API

A modern, high-performance REST API using [Fastify](https://fastify.dev/) and [Bun](https://bun.sh/). This API is part of the Origo monorepo and includes TypeScript support, automatic API documentation, type-safe validation, and code formatting out of the box.

## Features

- **Lightning Fast**: Powered by Bun runtime and Fastify framework
- **Type-Safe**: Full TypeScript support with Zod schema validation
- **Auto Documentation**: Interactive API docs with Swagger/OpenAPI and Scalar UI
- **Schema Validation**: Request/response validation using `fastify-type-provider-zod`
- **Code Formatting**: Integrated Biome for fast linting and formatting
- **Hot Reload**: Development mode with automatic restart on file changes
- **CORS**: Pre-configured CORS support

## Prerequisites

- [Bun](https://bun.sh/) >= 1.0.0

## Getting Started

### Install dependencies (from monorepo root)

```bash
npm install
```

### Start development server

From the monorepo root:

```bash
npm run dev
```

Or directly from the API directory:

```bash
cd apps/api
bun run dev
```

The server will start on `http://localhost:3333` with hot reload enabled.

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

## API Documentation

Once the server is running, you can access the interactive API documentation at:

- **Scalar UI**: [http://localhost:3333/docs](http://localhost:3333/docs)

The documentation is automatically generated from your route schemas.

## Project Structure

```
apps/api/
├── src/
│   └── server.ts          # Main server file with routes
├── biome.json             # Biome configuration
├── package.json           # Dependencies and scripts
├── tsconfig.json          # TypeScript configuration
└── README.md              # This file
```

## Useful Links

- [Bun Documentation](https://bun.sh/docs)
- [Fastify Documentation](https://fastify.dev/)
- [Zod Documentation](https://zod.dev/)
- [Biome Documentation](https://biomejs.dev/)
