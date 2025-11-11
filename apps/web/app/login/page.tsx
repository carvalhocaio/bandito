"use client"

import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { LoginForm } from "@/components/login-form"
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
		<div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-background p-6 md:p-10">
			<div className="w-full max-w-sm">
				<LoginForm />
			</div>
		</div>
	)
}
