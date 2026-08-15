import { BookRepository } from "../application/ports/book";
import { Book } from "../domain/entities/book";

export class FindBookByIdUseCase {
    constructor(private readonly bookRepository: BookRepository) { }

    async execute(bookId: Book['id']) {
        return await this.bookRepository.findById(bookId);
    }
}