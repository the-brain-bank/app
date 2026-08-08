/**
 * Seed script to create the default admin user.
 *
 * Directly inserts into the database with proper password hashing
 * (using the same scrypt algorithm that better-auth uses internally).
 *
 * Reads credentials from environment variables:
 *   ADMIN_NAME     – display name  (default: "Admin")
 *   ADMIN_EMAIL    – login email   (required)
 *   ADMIN_PASS     – password      (required)
 *   ADMIN_INDUSTRY – industry      (default: "Technology")
 *
 * Usage:
 *   pnpm db:seed-admin
 *
 * The script is idempotent – if a user with the given email already exists
 * it will skip creation and only ensure the role is set to ADMIN.
 */

import "dotenv/config";
import { Pool } from "pg";
import { drizzle } from "drizzle-orm/node-postgres";
import { eq } from "drizzle-orm";
import * as schema from "./schema";
import { users, accounts } from "./schema";
import { randomUUID } from "node:crypto";
import { hashPassword } from "@better-auth/utils/password";

// ── helpers ──────────────────────────────────────────────────────────
function env(key: string, fallback?: string): string {
  const value = process.env[key] ?? fallback;
  if (!value) {
    console.error(`❌  Missing required environment variable: ${key}`);
    process.exit(1);
  }
  return value;
}

// ── main ─────────────────────────────────────────────────────────────
async function seedAdmin() {
  const adminName = env("ADMIN_NAME", "Admin");
  const adminEmail = env("ADMIN_EMAIL");
  const adminPassword = env("ADMIN_PASS");
  const adminIndustry = env("ADMIN_INDUSTRY", "Technology");

  const pool = new Pool({
    connectionString: env("DATABASE_URL"),
  });
  const db = drizzle(pool, { schema });

  // 1. Check if the admin already exists
  const existing = await db.query.users.findFirst({
    where: eq(users.email, adminEmail),
  });

  if (existing) {
    if (existing.role === "ADMIN") {
      console.log(`✅  Admin user already exists (${adminEmail}). Nothing to do.`);
    } else {
      await db
        .update(users)
        .set({ role: "ADMIN" })
        .where(eq(users.id, existing.id));
      console.log(`✅  Promoted existing user ${adminEmail} to ADMIN.`);
    }
    await pool.end();
    return;
  }

  // 2. Create the user directly
  const userId = randomUUID();
  const now = new Date();

  await db.insert(users).values({
    id: userId,
    name: adminName,
    email: adminEmail,
    emailVerified: true,
    industry: adminIndustry,
    role: "ADMIN",
    createdAt: now,
    updatedAt: now,
  });

  // 3. Create the credential account (mirrors what better-auth does)
  const hashedPassword = await hashPassword(adminPassword);

  await db.insert(accounts).values({
    id: randomUUID(),
    accountId: userId,
    providerId: "credential",
    userId: userId,
    password: hashedPassword,
    createdAt: now,
    updatedAt: now,
  });

  console.log(`✅  Admin user created successfully!`);
  console.log(`   Email: ${adminEmail}`);
  console.log(`   Name:  ${adminName}`);
  console.log(`   Role:  ADMIN`);

  await pool.end();
}

seedAdmin().catch((err) => {
  console.error("❌  Seed failed:", err);
  process.exit(1);
});
