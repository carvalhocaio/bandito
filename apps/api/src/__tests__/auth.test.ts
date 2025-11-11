import { describe, expect, it } from "vitest"
import { generateToken, verifyToken } from "../lib/auth"

describe("Auth Utils", () => {
	// Password hashing tests are skipped because Bun.password is not available in Vitest/Node environment
	// These are tested indirectly through the server integration tests

	describe("JWT Token", () => {
		it("should generate a JWT token", async () => {
			const payload = {
				userId: 1,
				email: "test@example.com",
			}

			const token = await generateToken(payload)

			expect(token).toBeDefined()
			expect(typeof token).toBe("string")
			expect(token.split(".").length).toBe(3) // JWT has 3 parts
		})

		it("should verify valid JWT token", async () => {
			const payload = {
				userId: 1,
				email: "test@example.com",
			}

			const token = await generateToken(payload)
			const verified = await verifyToken(token)

			expect(verified).toBeDefined()
			expect(verified?.userId).toBe(payload.userId)
			expect(verified?.email).toBe(payload.email)
		})

		it("should reject invalid JWT token", async () => {
			const invalidToken = "invalid.token.here"

			const verified = await verifyToken(invalidToken)

			expect(verified).toBeNull()
		})

		it("should reject tampered JWT token", async () => {
			const payload = {
				userId: 1,
				email: "test@example.com",
			}

			const token = await generateToken(payload)
			const tamperedToken = token.slice(0, -5) + "xxxxx"

			const verified = await verifyToken(tamperedToken)

			expect(verified).toBeNull()
		})
	})
})
