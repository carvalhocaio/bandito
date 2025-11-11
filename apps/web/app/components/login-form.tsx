"use client"

import { GalleryVerticalEnd } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"

export function LoginForm({ className, ...props }: React.ComponentPropsWithoutRef<"div">) {
	const [email, setEmail] = useState("")
	const [password, setPassword] = useState("")
	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState("")

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault()
		setIsLoading(true)
		setError("")

		try {
			const response = await fetch("http://localhost:3333/login", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({ email, password }),
			})

			if (!response.ok) {
				const data = await response.json()
				throw new Error(data.error || "Invalid credentials")
			}

			const data = await response.json()

			// Armazena o token
			localStorage.setItem("token", data.token)
			localStorage.setItem("user", JSON.stringify(data.user))

			// Redireciona ou atualiza a página
			window.location.href = "/"
		} catch (err) {
			setError(err instanceof Error ? err.message : "An error occurred")
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className={cn("flex flex-col gap-6", className)} {...props}>
			<form onSubmit={handleSubmit}>
				<div className="flex flex-col gap-6">
					<div className="flex flex-col items-center gap-2">
						<div className="flex flex-col items-center gap-2 font-medium">
							<div className="flex h-8 w-8 items-center justify-center rounded-md">
								<GalleryVerticalEnd className="size-6" />
							</div>
							<span className="sr-only">Origo</span>
						</div>
						<h1 className="text-xl font-bold">Welcome to Bandito</h1>
					</div>
					{error && (
						<div className="text-sm text-destructive bg-destructive/10 p-3 rounded-md text-center">
							{error}
						</div>
					)}
					<div className="flex flex-col gap-6">
						<div className="grid gap-2">
							<Label htmlFor="email">Email</Label>
							<Input
								id="email"
								type="email"
								placeholder="m@example.com"
								required
								value={email}
								onChange={(e) => setEmail(e.target.value)}
								disabled={isLoading}
							/>
						</div>
						<div className="grid gap-2">
							<Label htmlFor="password">Password</Label>
							<Input
								id="password"
								type="password"
								required
								value={password}
								onChange={(e) => setPassword(e.target.value)}
								disabled={isLoading}
							/>
						</div>
						<Button type="submit" className="w-full" disabled={isLoading}>
							{isLoading ? "Logging in..." : "Login"}
						</Button>
					</div>
				</div>
			</form>
		</div>
	)
}
