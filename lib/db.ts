import { Pool } from "pg"

const connectionString = process.env.NEON_DATABASE_URL

if (!connectionString) {
    throw new Error("NEON_DATABASE_URL is not set")
}

// Reuse pool in dev to avoid exhausting connections on hot reloads
const globalForPool = global as unknown as { pgPool?: Pool }

export const pool = globalForPool.pgPool ?? new Pool({
    connectionString,
    ssl: { rejectUnauthorized: false },
})

if (process.env.NODE_ENV !== "production") globalForPool.pgPool = pool


