import { beforeEach, describe, expect, it, vi } from "vitest"
import { getToken, getUser, isAuthenticated, logout } from "@/lib/auth"

describe("Auth Utilities", () => {
	beforeEach(() => {
		// Clear localStorage before each test
		localStorage.clear()
		vi.clearAllMocks()
	})

	describe("getToken", () => {
		it("should return null when no token exists", () => {
			const token = getToken()
			expect(token).toBeNull()
		})

		it("should return token when it exists", () => {
			localStorage.setItem("token", "test-token-123")
			const token = getToken()
			expect(token).toBe("test-token-123")
		})
	})

	describe("getUser", () => {
		it("should return null when no user exists", () => {
			const user = getUser()
			expect(user).toBeNull()
		})

		it("should return user when it exists", () => {
			const mockUser = {
				id: 1,
				name: "Test User",
				email: "test@example.com",
			}
			localStorage.setItem("user", JSON.stringify(mockUser))

			const user = getUser()
			expect(user).toEqual(mockUser)
		})

		it("should handle invalid JSON gracefully", () => {
			localStorage.setItem("user", "invalid-json")

			expect(() => getUser()).toThrow()
		})
	})

	describe("isAuthenticated", () => {
		it("should return false when no token exists", () => {
			expect(isAuthenticated()).toBe(false)
		})

		it("should return true when token exists", () => {
			localStorage.setItem("token", "test-token-123")
			expect(isAuthenticated()).toBe(true)
		})
	})

	describe("logout", () => {
		it("should remove token and user from localStorage", () => {
			localStorage.setItem("token", "test-token-123")
			localStorage.setItem(
				"user",
				JSON.stringify({ id: 1, name: "Test", email: "test@example.com" }),
			)

			// Mock window.location.href
			delete (window as any).location
			window.location = { href: "" } as any

			logout()

			expect(localStorage.getItem("token")).toBeNull()
			expect(localStorage.getItem("user")).toBeNull()
		})

		it("should redirect to login page", () => {
			delete (window as any).location
			window.location = { href: "" } as any

			logout()

			expect(window.location.href).toBe("/login")
		})
	})
})
