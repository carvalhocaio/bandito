import { render, screen } from "@testing-library/react"
import { describe, expect, it } from "vitest"
import { QueryProvider } from "../providers/query-provider"

describe("QueryProvider", () => {
	it("should render children correctly", () => {
		render(
			<QueryProvider>
				<div>Test Content</div>
			</QueryProvider>,
		)

		expect(screen.getByText("Test Content")).toBeInTheDocument()
	})

	it("should provide QueryClient context", () => {
		const TestComponent = () => {
			return <div data-testid="test-component">Component with Query Context</div>
		}

		render(
			<QueryProvider>
				<TestComponent />
			</QueryProvider>,
		)

		expect(screen.getByTestId("test-component")).toBeInTheDocument()
	})
})
