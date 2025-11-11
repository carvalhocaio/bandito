"use client"

export function getToken(): string | null {
	if (typeof window === "undefined") return null
	return localStorage.getItem("token")
}

export function getUser() {
	if (typeof window === "undefined") return null
	const userStr = localStorage.getItem("user")
	return userStr ? JSON.parse(userStr) : null
}

export function isAuthenticated(): boolean {
	return !!getToken()
}

export function logout() {
	if (typeof window === "undefined") return
	localStorage.removeItem("token")
	localStorage.removeItem("user")
	window.location.href = "/login"
}
