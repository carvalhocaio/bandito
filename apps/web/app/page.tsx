"use client"

import { useQuery } from "@tanstack/react-query"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { apiClient } from "./lib/api/client"
import { getUser, isAuthenticated, logout } from "./lib/auth"

interface ApiResponse {
	message: string
}

async function fetchApi(): Promise<ApiResponse> {
	const response = await apiClient.get("/")
	return response.data
}

export default function Home() {
	const router = useRouter()
	const [isClient, setIsClient] = useState(false)
	const [user, setUser] = useState<{ name: string; email: string } | null>(null)

	useEffect(() => {
		setIsClient(true)
		setUser(getUser())

		if (!isAuthenticated()) {
			router.push("/login")
		}
	}, [router])

	const { data, isLoading, error } = useQuery({
		queryKey: ["api-root"],
		queryFn: fetchApi,
		enabled: isClient && isAuthenticated(),
	})

	if (!isClient || !isAuthenticated()) {
		return null
	}

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	return (
		<div className="p-8">
			<div className="flex justify-between items-center mb-8">
				<div>
					<h1 className="text-2xl font-bold">Origo</h1>
					{user && (
						<p className="text-muted-foreground">
							Welcome, {user.name} ({user.email})
						</p>
					)}
				</div>
				<Button onClick={logout} variant="outline">
					Logout
				</Button>
			</div>
			<h2 className="text-xl font-semibold mb-4">API Response</h2>
			<pre className="bg-muted p-4 rounded-md">{JSON.stringify(data, null, 2)}</pre>
		</div>
	)
}
