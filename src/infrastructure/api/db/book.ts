import { Book } from "@/core/domain/entities/book";
import { and, count, desc, eq, ilike, inArray } from "drizzle-orm";
import { db } from ".";
import {
  BookRepository,
  GetAllBooksQuery,
} from "../../../core/application/ports/book";
import { books, categoriesToBooks } from "./schema";
import { Result, ResultAsync } from "neverthrow";
import { PaginatedResponse } from "@/core/application/types/paginatinated-response";

export class DrizzleBookRepository implements BookRepository {
  async findById(id: string): Promise<Book | null> {
    const result = await db.query.books.findFirst({
      where: eq(books.id, id),
      with: {
        author: true,
        recommendations: true,
        categories: {
          with: { category: true }
        }
      },
    });

    if (!result) return null;

    return {
      ...result,
      categories: result.categories?.map((c) => c.category) || [],
    } as unknown as Book;
  }

  async findByAuthorId(authorId: string): Promise<Book[]> {
    return db.query.books.findMany({
      where: eq(books.authorId, authorId),
      orderBy: [desc(books.createdAt)],
      with: {
        author: {
          with: {
            authoredBooks: true
          }
        },
        recommendations: true,
        categories: {
          with: {
            category: true
          }
        }
      },
    });
  }

  async findTopBooks(limit: number = 10): Promise<Book[]> {
    return db.query.books.findMany({
      limit,
      orderBy: [desc(books.createdAt)],
      with: {
        author: {
          with: {
            authoredBooks: true
          }
        },
        recommendations: true,
        categories: {
          with: {
            category: true
          }
        }
      },
    });
  }

  async create(
    bookData: Omit<
      Book,
      "id" | "createdAt" | "updatedAt" | "author" | "categories"
    >,
    categoryIds: string[],
  ): Promise<Book> {
    return db.transaction(async (tx) => {
      const [newBook] = await tx.insert(books).values(bookData).returning();

      if (categoryIds && categoryIds.length > 0) {
        await tx.insert(categoriesToBooks).values(
          categoryIds.map((categoryId) => ({
            bookId: newBook.id,
            categoryId,
          })),
        );
      }

      return newBook as unknown as Book;
    });
  }

  async updateById(
    bookId: Book["id"],
    book: Partial<
      Omit<Book, "id" | "createdAt" | "updatedAt" | "author" | "categories" | "recommendations">
    >,
    categoryIds?: string[],
  ): Promise<Omit<Book, "author" | "categories" | "recommendations">> {
    return db.transaction(async (tx) => {
      const result = await tx
        .update(books)
        .set(book)
        .where(eq(books.id, bookId))
        .returning();

      if (categoryIds) {
        await tx.delete(categoriesToBooks).where(eq(categoriesToBooks.bookId, bookId));
        if (categoryIds.length > 0) {
          await tx.insert(categoriesToBooks).values(
            categoryIds.map((categoryId) => ({
              bookId,
              categoryId,
            })),
          );
        }
      }

      return result[0];
    });
  }

  async getAll(
    query: GetAllBooksQuery,
  ): Promise<Result<PaginatedResponse<Book>, string>> {
    const { limit, offset, authorId, categoryId, search } = query;

    return await ResultAsync.fromThrowable(
      async () => {
        const conditions = [] as any[];
        if (authorId) conditions.push(eq(books.authorId, authorId));
        if (search) conditions.push(ilike(books.title, `%${search}%`));

        // If filtering by category, get matching book IDs via subquery
        if (categoryId) {
          const matchingBookIds = await db
            .select({ bookId: categoriesToBooks.bookId })
            .from(categoriesToBooks)
            .where(eq(categoriesToBooks.categoryId, categoryId));

          conditions.push(
            inArray(
              books.id,
              matchingBookIds.map((r) => r.bookId),
            ),
          );
        }

        const where = conditions.length > 0 ? and(...conditions) : undefined;

        // Count total matching books
        const [{ total }] = await db
          .select({ total: count().mapWith(Number) })
          .from(books)
          .where(where);

        // Fetch paginated books with author and categories
        const result = await db.query.books.findMany({
          where,
          limit,
          offset,
          orderBy: [desc(books.createdAt)],
          with: {
            author: true,
            categories: {
              with: {
                category: true,
              },
            },
            recommendations: true
          },
        });

        const data = result.map((book) => ({
          ...book,
          categories: book.categories.map((c) => c.category),
        })) as unknown as Book[];

        return {
          data,
          total,
          currentPage: offset,
          pageSize: limit,
          totalPages: Math.ceil(total / limit),
        };
      },
      (error) => {
        if (error instanceof Error) {
          return error.message;
        }
        console.error("Unknown error occurred while fetching books:", error);
        return "Unknown error occurred while fetching books";
      },
    )();
  }
}

