import { BookRepository } from '../application/ports/book';
import { Book } from '@/core/domain/entities/book';

export class GetTopBooks {
  constructor(private readonly bookRepository: BookRepository) { }

  async execute(limit: number = 10): Promise<Book[]> {
    return this.bookRepository.findTopBooks(limit);
  }
}
