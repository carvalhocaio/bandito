# @origo/shared-types

Shared TypeScript types and interfaces across the Origo monorepo.

## Usage

### In API (apps/api)

```typescript
import type { ApiResponse, ApiError } from "@origo/shared-types"

// Use in your routes
app.get("/", async (request, reply) => {
  const response: ApiResponse<{ message: string }> = {
    data: { message: "Hello" },
    success: true
  }
  return reply.send(response)
})
```

### In Web (apps/web)

```typescript
import type { ApiResponse, PaginatedResponse } from "@origo/shared-types"

// Use in your API client
async function fetchData(): Promise<ApiResponse<User[]>> {
  const response = await fetch("/api/users")
  return response.json()
}
```

## Adding New Types

1. Add your type definitions to `src/index.ts`
2. Export them from the main entry point
3. Use them across your apps

## Available Types

- `ApiResponse<T>` - Standard API response wrapper
- `ApiError` - Error response structure
- `PaginationMeta` - Pagination metadata
- `PaginatedResponse<T>` - Paginated data response
