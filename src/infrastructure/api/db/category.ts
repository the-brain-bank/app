import { CategoryRepository } from "@/core/application/ports/category";
import { Category } from "@/core/domain/entities/category";
import { count, eq, ilike } from "drizzle-orm";
import { db } from ".";
import { categories } from "./schema";

export class DrizzleCategoryRepository implements CategoryRepository {
  async findAll(
    limit: number = 10,
    offset: number = 0,
    search?: string,
  ): Promise<{
    data: Category[];
    page: number;
    pageSize: number;
    totalCount: number;
  }> {
    const whereClause = search ? ilike(categories.name, `%${search}%`) : undefined;

    const result = await db.query.categories.findMany({
      where: whereClause,
      with: {
        books: {
          with: {
            book: true,
          },
        },
      },
      limit,
      offset,
    });
    const totalCount = await db
      .select({ count: count().mapWith(Number) })
      .from(categories)
      .where(whereClause);

    return {
      page: offset,
      pageSize: limit,
      data: result.map((row) => ({
        id: row.id,
        name: row.name,
        books: row.books.map((b) => b.book),
      })) as Category[],
      totalCount: totalCount[0].count,
    };
  }

  async create(
    category: Omit<Category, "id" | "createdAt" | "updatedAt">,
  ): Promise<Category> {
    const result = await db
      .insert(categories)
      .values({
        name: category.name,
      })
      .returning({
        id: categories.id,
        name: categories.name,
      });

    return {
      ...result[0],
      books: [],
    };
  }

  async updateById(id: string, name: string): Promise<Category> {
    await db.update(categories).set({ name }).where(eq(categories.id, id));

    const result = await this.findById(id);

    return {
      id: result!.id,
      name: result!.name,
      books: result!.books,
    } as Category;
  }

  async findById(id: string): Promise<Category | null> {
    const result = await db.query.categories.findFirst({
      where: eq(categories.id, id),
      with: {
        books: {
          with: {
            book: true,
          },
        },
      },
    });

    if (!result) return null;

    return {
      id: result.id,
      name: result.name,
      books: result.books.map((b) => b.book),
    } as Category;
  }

  async findByName(name: string): Promise<Category | null> {
    const result = await db.query.categories.findFirst({
      where: eq(categories.name, name),
      with: {
        books: {
          with: {
            book: true,
          },
        },
      },
    });

    if (!result) return null;

    return {
      id: result.id,
      name: result.name,
      books: result.books.map((b) => b.book),
    } as Category;
  }

  async deleteById(id: string): Promise<boolean> {
    await db.delete(categories).where(eq(categories.id, id));
    return true;
  }
}
