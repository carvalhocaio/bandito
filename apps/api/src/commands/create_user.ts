import { client, db } from "@/db"
import { users } from "@/db/schema"

await db.insert(users).values({
	name: "Caio Carvalho",
	email: "caiocarvalho.py@gmail.com",
	password: await Bun.password.hash(""),
})

console.log("User created successfully!")
await client.end()
