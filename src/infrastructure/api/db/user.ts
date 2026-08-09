import type { UserRepository } from "@/core/application/ports/user";
import type { User } from "@/core/domain/entities/user";
import { and, desc, eq, ilike, arrayContains, arrayOverlaps } from "drizzle-orm";
import { db } from "./index";
import { users } from "./schema";
import { ResultAsync } from "neverthrow";
import type { TypedPromiseResponse } from "@/core/application/types/typed-response";

export class DrizzleUserRepository implements UserRepository {
  async findById(id: string): Promise<User | null> {
    const result = await db.query.users.findFirst({
      where: eq(users.id, id),
      with: {
        authoredBooks: {
          with: {
            recommendations: true,
          },
        },
      },
    });
    return result || null;
  }

  async findBySlug(slug: string): Promise<User | null> {
    const result = await db.query.users.findFirst({
      where: eq(users.slug, slug),
    });
    return result || null;
  }

  async findAll(
    limit: number = 20,
    offset: number = 0,
    search?: string,
  ): Promise<User[]> {
    return db.query.users.findMany({
      limit,
      offset,
      where: search ? ilike(users.name, `%${search}%`) : undefined,
      orderBy: [desc(users.createdAt)],
    });
  }

  findByRole(payload: {
    role: User["role"] | [];
    limit?: number;
    offset?: number;
    search?: string;
  }): Promise<User[]> {
    const conditions = [];
    if (payload.search) {
      conditions.push(ilike(users.name, `%${payload.search}%`));
    }
    if (payload.role && payload.role.length > 0) {
      conditions.push(arrayOverlaps(users.role, payload.role));
    }

    const where = conditions.length > 0 ? and(...conditions) : undefined;

    return db.query.users.findMany({
      where,
      limit: payload.limit,
      offset: payload.offset,
      orderBy: [desc(users.createdAt)],
    });
  }

  async create(
    personData: Omit<User, "id" | "createdAt" | "updatedAt">,
  ): Promise<User> {
    const [newPerson] = await db.insert(users).values(personData).returning();
    return newPerson;
  }

  async updateById(
    id: string,
    user: Partial<Omit<User, "id" | "createdAt" | "updatedAt">>,
  ): Promise<User> {
    const [update] = await db
      .update(users)
      .set(user)
      .where(eq(users.id, id))
      .returning();
    return update;
  }

  async searchByName(
    name: string,
    limit: number = 20,
  ): Promise<TypedPromiseResponse<User[], string>> {
    return await ResultAsync.fromThrowable(
      async () => {
        return db
          .select()
          .from(users)
          .where(ilike(users.name, `%${name}%`))
          .limit(limit);
      },
      (error) => {
        console.error("Error searching users by name:", error);
        return "Error searching users by name";
      },
    )().map((users) => users as User[]);
  }
}
