"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LoginForm } from "@/components/login-form"
import { ThemeToggle } from "@/components/theme-toggle"
import { isAuthenticated } from "@/lib/auth"

export default function LoginPage() {
	const router = useRouter()
	const [isClient, setIsClient] = useState(false)

	useEffect(() => {
		setIsClient(true)

		if (isAuthenticated()) {
			router.push("/")
		}
	}, [router])

	if (!isClient) {
		return null
	}

	if (isAuthenticated()) {
		return null
	}

	return (
		<div className="relative flex min-h-svh flex-col bg-background">
			<header className="absolute top-0 right-0 p-4 md:p-6">
				<ThemeToggle />
			</header>
			<div className="flex flex-1 items-center justify-center gap-6 p-6 md:p-10">
				<div className="w-full max-w-sm">
					<LoginForm />
				</div>
			</div>
		</div>
	)
}
