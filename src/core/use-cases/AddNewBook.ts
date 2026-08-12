import { Book } from "@/core/domain/entities/book";
import { errAsync, Result, ResultAsync } from "neverthrow";
import { BookRepository } from "../application/ports/book";
import { SessionPort } from "../application/ports/session";
import { UploadNewImageUseCase } from "./UploadNewImage";

export interface CreateBookCommand {
  title: string;
  coverImage: File;
  description: string;
  authorId: string;
  categoryIds: string[];
}

export class AddNewBooksUseCase {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly sessionAdapter: SessionPort,
    private readonly imageUploader: UploadNewImageUseCase,
  ) {}

  async execute(command: CreateBookCommand): Promise<Result<Book, string>> {
    const getSessionResult = await this.sessionAdapter.getSession();
    if (getSessionResult.isErr()) return errAsync(getSessionResult.error);

    const uploadResult = await this.imageUploader.execute(command.coverImage);
    if (uploadResult.isErr()) return errAsync(uploadResult.error);

    const slug =
      command.title.toLowerCase().replace(/[^a-z0-9]+/g, "-") +
      "-" +
      Date.now().toString().slice(-6);

    return ResultAsync.fromThrowable(() =>
      this.bookRepository.create(
        {
          title: command.title,
          slug,
          coverImage: uploadResult.value,
          description: command.description,
          authorId: command.authorId,
          recommendations: [],
        },
        command.categoryIds,
      ),
    )().mapErr((error) => {
      if (error instanceof Error) return error.message;
      return "Unknown error when adding a new book!";
    });
  }
}
