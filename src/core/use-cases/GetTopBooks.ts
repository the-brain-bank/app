import type { Result } from "neverthrow";
import type { BookRepository } from "../application/ports/book";
import type { Book } from "@/core/domain/entities/book";

export class GetTopBooks {
  constructor(private readonly bookRepository: BookRepository) {}

  async execute(limit: number = 10): Promise<Result<Book[], string>> {
    return await this.bookRepository.findTopBooks(limit);
  }
}
