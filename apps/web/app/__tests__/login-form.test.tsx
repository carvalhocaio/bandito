import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import { beforeEach, describe, expect, it, vi } from "vitest"
import { LoginForm } from "@/components/login-form"

// Mock fetch
global.fetch = vi.fn()

describe("LoginForm", () => {
	beforeEach(() => {
		vi.clearAllMocks()
		// Mock localStorage
		const localStorageMock = {
			getItem: vi.fn(),
			setItem: vi.fn(),
			removeItem: vi.fn(),
			clear: vi.fn(),
		}
		global.localStorage = localStorageMock as any
	})

	it("should render login form", () => {
		render(<LoginForm />)

		expect(screen.getByText("Welcome to Bandito")).toBeInTheDocument()
		expect(screen.getByLabelText("Email")).toBeInTheDocument()
		expect(screen.getByLabelText("Password")).toBeInTheDocument()
		expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument()
	})

	it("should handle input changes", () => {
		render(<LoginForm />)

		const emailInput = screen.getByLabelText("Email") as HTMLInputElement
		const passwordInput = screen.getByLabelText("Password") as HTMLInputElement

		fireEvent.change(emailInput, { target: { value: "test@example.com" } })
		fireEvent.change(passwordInput, { target: { value: "password123" } })

		expect(emailInput.value).toBe("test@example.com")
		expect(passwordInput.value).toBe("password123")
	})

	it("should show error message on failed login", async () => {
		;(global.fetch as any).mockResolvedValueOnce({
			ok: false,
			json: async () => ({ error: "Invalid credentials" }),
		})

		render(<LoginForm />)

		const emailInput = screen.getByLabelText("Email")
		const passwordInput = screen.getByLabelText("Password")
		const submitButton = screen.getByRole("button", { name: /login/i })

		fireEvent.change(emailInput, { target: { value: "test@example.com" } })
		fireEvent.change(passwordInput, { target: { value: "wrongpassword" } })
		fireEvent.click(submitButton)

		await waitFor(() => {
			expect(screen.getByText("Invalid credentials")).toBeInTheDocument()
		})
	})

	it("should disable inputs during loading", async () => {
		;(global.fetch as any).mockImplementationOnce(
			() =>
				new Promise((resolve) =>
					setTimeout(
						() =>
							resolve({
								ok: false,
								json: async () => ({ error: "Error" }),
							}),
						100,
					),
				),
		)

		render(<LoginForm />)

		const emailInput = screen.getByLabelText("Email")
		const passwordInput = screen.getByLabelText("Password")
		const submitButton = screen.getByRole("button", { name: /login/i })

		fireEvent.change(emailInput, { target: { value: "test@example.com" } })
		fireEvent.change(passwordInput, { target: { value: "password123" } })
		fireEvent.click(submitButton)

		expect(emailInput).toBeDisabled()
		expect(passwordInput).toBeDisabled()
		expect(submitButton).toBeDisabled()
		expect(screen.getByText("Logging in...")).toBeInTheDocument()
	})

	it("should store token and user data on successful login", async () => {
		const mockUser = {
			id: 1,
			name: "Test User",
			email: "test@example.com",
		}
		const mockToken = "mock.jwt.token"

		;(global.fetch as any).mockResolvedValueOnce({
			ok: true,
			json: async () => ({
				token: mockToken,
				user: mockUser,
			}),
		})

		// Mock window.location.href
		delete (window as any).location
		window.location = { href: "" } as any

		render(<LoginForm />)

		const emailInput = screen.getByLabelText("Email")
		const passwordInput = screen.getByLabelText("Password")
		const submitButton = screen.getByRole("button", { name: /login/i })

		fireEvent.change(emailInput, { target: { value: "test@example.com" } })
		fireEvent.change(passwordInput, { target: { value: "password123" } })
		fireEvent.click(submitButton)

		await waitFor(() => {
			expect(localStorage.setItem).toHaveBeenCalledWith("token", mockToken)
			expect(localStorage.setItem).toHaveBeenCalledWith("user", JSON.stringify(mockUser))
		})
	})
})
