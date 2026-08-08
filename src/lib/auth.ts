import { betterAuth } from "better-auth";
import { drizzleAdapter } from "better-auth/adapters/drizzle";
import { db } from "@/infrastructure/api/db";
import { randomUUID } from "node:crypto";

export const auth = betterAuth({
    database: drizzleAdapter(db, {
        provider: "pg",
        usePlural: true,
    }),
    emailAndPassword: {
        enabled: true,
    },
    advanced: {
        database: {
            generateId: () => randomUUID(),
        }
    },
    experimental: { joins: true },
});