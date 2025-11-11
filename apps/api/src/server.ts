import { fastifyCors } from "@fastify/cors"
import { fastifySwagger } from "@fastify/swagger"
import ScalarApiReference from "@scalar/fastify-api-reference"
import { fastify } from "fastify"
import {
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
	type ZodTypeProvider,
} from "fastify-type-provider-zod"
import { z } from "zod"
import { loginUser } from "@/lib/auth"

const app = fastify().withTypeProvider<ZodTypeProvider>()

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

await app.register(fastifyCors, {
	origin: true,
	methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
})

await app.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Origo API",
			description: "API with Fastify and Bun",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
})

await app.register(ScalarApiReference, {
	routePrefix: "/docs",
})

app.get(
	"/",
	{
		schema: {
			tags: ["Health"],
			description: "Health check endpoint",
			response: {
				200: z.object({
					message: z.string(),
				}),
			},
		},
	},
	async function handler(_request, reply) {
		return reply.status(200).send({ message: "Hello from Origo API!" })
	},
)

app.post(
	"/login",
	{
		schema: {
			tags: ["Auth"],
			description: "Login with email and password",
			body: z.object({
				email: z.string().email(),
				password: z.string().min(6),
			}),
			response: {
				200: z.object({
					token: z.string(),
					user: z.object({
						id: z.number(),
						name: z.string(),
						email: z.string().email(),
					}),
				}),
				401: z.object({
					error: z.string(),
				}),
			},
		},
	},
	async function handler(request, reply) {
		try {
			const { email, password } = request.body
			const result = await loginUser(email, password)
			return reply.status(200).send(result)
		} catch (error) {
			return reply.status(401).send({
				error: error instanceof Error ? error.message : "Invalid credentials",
			})
		}
	},
)

try {
	await app.listen({ port: 3333, host: "0.0.0.0" })
	console.log("HTTP server running on http://localhost:3333")
	console.log("Docs available at http://localhost:3333/docs")
} catch (err) {
	app.log.error(err)
	process.exit(1)
}
