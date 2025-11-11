// Shared types across the monorepo

/**
 * API Response wrapper
 */
export interface ApiResponse<T = unknown> {
	data: T
	message?: string
	success: boolean
}

/**
 * API Error response
 */
export interface ApiError {
	message: string
	code?: string
	statusCode: number
	errors?: Record<string, string[]>
}

/**
 * Pagination metadata
 */
export interface PaginationMeta {
	page: number
	perPage: number
	total: number
	totalPages: number
}

/**
 * Paginated response
 */
export interface PaginatedResponse<T = unknown> {
	data: T[]
	meta: PaginationMeta
}

// Add your shared types here
