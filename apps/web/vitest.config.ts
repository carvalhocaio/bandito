import { resolve } from "node:path"
import react from "@vitejs/plugin-react"
import { defineConfig } from "vitest/config"

export default defineConfig({
	plugins: [react()],
	test: {
		globals: true,
		environment: "jsdom",
		setupFiles: ["./vitest.setup.ts"],
		coverage: {
			provider: "v8",
			reporter: ["text", "json", "html"],
			exclude: ["node_modules/", ".next/", "**/*.config.*", "**/layout.tsx", "**/page.tsx"],
		},
	},
	resolve: {
		alias: {
			"@": resolve(__dirname, "./app"),
		},
	},
})
