import { Book } from "@/core/domain/entities/book";
import { errAsync, Result, ResultAsync } from "neverthrow";
import { BookRepository } from "../application/ports/book";
import { SessionPort } from "../application/ports/session";
import { isAdminUser } from "../domain/entities/user";

export interface EditBookCommand {
  bookId: string;
  title: string;
  description: string;
  authorId: string;
  categoryIds: string[];
}

export class EditBookUseCase {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly sessionAdapter: SessionPort,
  ) {}

  async execute(
    command: EditBookCommand,
  ): Promise<Result<Omit<Book, "author" | "categories" | "recommendations">, string>> {
    const getSessionResult = await this.sessionAdapter.getSession();
    if (getSessionResult.isErr()) return errAsync(getSessionResult.error);

    const session = getSessionResult.value;
    if (isAdminUser(session.user) === false) {
      return errAsync("Only admins can edit books.");
    }

    const { bookId, categoryIds, ...bookData } = command;

    return ResultAsync.fromThrowable(() =>
      this.bookRepository.updateById(bookId, bookData, categoryIds),
    )().mapErr((error) => {
      if (error instanceof Error) return error.message;
      return "Unknown error when editing the book!";
    });
  }
}
