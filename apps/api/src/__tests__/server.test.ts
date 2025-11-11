import { afterAll, beforeAll, describe, expect, it } from "vitest"

describe("Server Health Check", () => {
	const API_URL = "http://localhost:3333"

	it("should respond to health check", async () => {
		const response = await fetch(`${API_URL}/`)

		expect(response.status).toBe(200)

		const data = (await response.json()) as { message: string }
		expect(data).toHaveProperty("message")
		expect(data.message).toContain("Origo API")
	})
})

describe("Login Endpoint", () => {
	const API_URL = "http://localhost:3333"

	it("should reject login with invalid credentials", async () => {
		const response = await fetch(`${API_URL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: "nonexistent@example.com",
				password: "wrongpassword",
			}),
		})

		expect(response.status).toBe(401)

		const data = (await response.json()) as { error: string }
		expect(data).toHaveProperty("error")
	})

	it("should reject login with invalid email format", async () => {
		const response = await fetch(`${API_URL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: "invalidemail",
				password: "password123",
			}),
		})

		expect(response.status).toBe(400)
	})

	it("should reject login with short password", async () => {
		const response = await fetch(`${API_URL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: "test@example.com",
				password: "12345",
			}),
		})

		expect(response.status).toBe(400)
	})

	it("should accept login with valid credentials", async () => {
		const response = await fetch(`${API_URL}/login`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				email: "caiocarvalho.py@gmail.com",
				password: "sahlofolina",
			}),
		})

		expect(response.status).toBe(200)

		const data = (await response.json()) as {
			token: string
			user: { id: number; name: string; email: string }
		}
		expect(data).toHaveProperty("token")
		expect(data).toHaveProperty("user")
		expect(data.user).toHaveProperty("id")
		expect(data.user).toHaveProperty("name")
		expect(data.user).toHaveProperty("email")
		expect(data.user.email).toBe("caiocarvalho.py@gmail.com")
	})
})
