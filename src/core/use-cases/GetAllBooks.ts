import type { Result } from "neverthrow";
import type {
  BookRepository,
  GetAllBooksQuery,
} from "../application/ports/book";
import type { Book } from "../domain/entities/book";
import type { PaginatedResponse } from "../application/types/paginatinated-response";

export class GetAllBooksUseCase {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(
    query: GetAllBooksQuery,
  ): Promise<Result<PaginatedResponse<Book>, string>> {
    return await this.bookRepository.getAll(query);
  }
}
