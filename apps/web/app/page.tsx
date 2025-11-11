"use client"

import { useQuery } from "@tanstack/react-query"
import { apiClient } from "./lib/api/client"

interface ApiResponse {
	message: string
}

async function fetchApi(): Promise<ApiResponse> {
	const response = await apiClient.get("/")
	return response.data
}

export default function Home() {
	const { data, isLoading, error } = useQuery({
		queryKey: ["api-root"],
		queryFn: fetchApi,
	})

	if (isLoading) {
		return <div>Loading...</div>
	}

	if (error) {
		return <div>Error: {error.message}</div>
	}

	return (
		<div>
			<h1>Origo</h1>
			<h2>API Response</h2>
			<pre>{JSON.stringify(data, null, 2)}</pre>
		</div>
	)
}
