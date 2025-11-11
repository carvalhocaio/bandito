import { fireEvent, render, screen } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { ThemeToggle } from "@/components/theme-toggle"
import { ThemeProvider } from "@/providers/theme-provider"

describe("ThemeToggle", () => {
	it("should render theme toggle button", () => {
		render(
			<ThemeProvider>
				<ThemeToggle />
			</ThemeProvider>,
		)

		const button = screen.getByRole("button", { name: /toggle theme/i })
		expect(button).toBeInTheDocument()
	})

	it("should toggle theme on click", async () => {
		render(
			<ThemeProvider attribute="class" defaultTheme="light">
				<ThemeToggle />
			</ThemeProvider>,
		)

		const button = screen.getByRole("button", { name: /toggle theme/i })

		// Initial state should be light
		expect(document.documentElement.classList.contains("dark")).toBe(false)

		// Click to toggle
		fireEvent.click(button)

		// Should switch to dark
		expect(document.documentElement.classList.contains("dark")).toBe(true)

		// Click again
		fireEvent.click(button)

		// Should switch back to light
		expect(document.documentElement.classList.contains("dark")).toBe(false)
	})
})
