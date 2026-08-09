import type { Book } from "@/core/domain/entities/book";
import type { Result } from "neverthrow";
import type { PaginatedResponse } from "../types/paginatinated-response";

export interface GetAllBooksQuery {
  limit: number;
  offset: number;
  authorId?: string;
  categoryId?: string;
  search?: string;
}

export interface BookRepository {
  findById(id: string): Promise<Book | null>;
  findByAuthorId(authorId: string): Promise<Book[]>;
  findTopBooks(limit?: number): Promise<Result<Book[], string>>;
  create(
    book: Omit<
      Book,
      "id" | "createdAt" | "updatedAt" | "author" | "categories"
    >,
    categoryIds: string[],
  ): Promise<Book>;
  updateById(
    bookId: Book["id"],
    book: Partial<
      Omit<
        Book,
        | "id"
        | "createdAt"
        | "updatedAt"
        | "author"
        | "categories"
        | "recommendations"
      >
    >,
    categoryIds?: string[],
  ): Promise<Omit<Book, "author" | "categories" | "recommendations">>;
  getAll(
    query: GetAllBooksQuery,
  ): Promise<Result<PaginatedResponse<Book>, string>>;
}
