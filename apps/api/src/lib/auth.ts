import { eq } from "drizzle-orm"
import { jwtVerify, SignJWT } from "jose"
import { db } from "@/db"
import { users } from "@/db/schema"

const JWT_SECRET = new TextEncoder().encode(process.env.JWT_SECRET || "")

export interface JWTPayload {
	userId: number
	email: string
}

export async function hashPassword(password: string): Promise<string> {
	return await Bun.password.hash(password, {
		algorithm: "bcrypt",
		cost: 10,
	})
}

export async function verifyPassword(
	password: string,
	hash: string,
): Promise<boolean> {
	return await Bun.password.verify(password, hash)
}

export async function generateToken(payload: JWTPayload): Promise<string> {
	return await new SignJWT({ ...payload })
		.setProtectedHeader({ alg: "HS256" })
		.setIssuedAt()
		.setExpirationTime("1d")
		.sign(JWT_SECRET)
}

export async function verifyToken(token: string): Promise<JWTPayload | null> {
	try {
		const { payload } = await jwtVerify(token, JWT_SECRET)
		return {
			userId: payload.userId as number,
			email: payload.email as string,
		}
	} catch {
		return null
	}
}

export async function loginUser(email: string, password: string) {
	const [user] = await db.select().from(users).where(eq(users.email, email))

	if (!user) {
		throw new Error("Invalid credentials")
	}

	const isValid = await verifyPassword(password, user.password)
	if (!isValid) {
		throw new Error("Invalid credentials")
	}

	const token = await generateToken({
		userId: user.id,
		email: user.email,
	})

	return {
		token,
		user: {
			id: user.id,
			name: user.name,
			email: user.email,
		},
	}
}
