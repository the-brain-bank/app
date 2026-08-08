import { err, ok, ResultAsync } from "neverthrow";
import { BookRepository } from "../application/ports/book";
import { ImageUploadPort } from "../application/ports/image-upload";
import { Book } from "../domain/entities/book";

export class UploadBookCoverUseCase {
  constructor(
    private readonly bookRepository: BookRepository,
    private readonly imageUploadService: ImageUploadPort,
  ) {}

  async execute(
    bookId: Book["id"],
    file: File,
    {
      onUploadProgress,
    }: {
      onUploadProgress?: (progress: ProgressEvent) => void;
    } = {},
  ) {
    const imageUploadResult = await this.imageUploadService.upload({
      file,
      onProgress: onUploadProgress,
    });

    if (imageUploadResult.isErr()) return err(imageUploadResult.error);
    const bookUpdateResult = await ResultAsync.fromThrowable(async () => {
      return this.bookRepository.updateById(bookId, {
        coverImage: imageUploadResult.value.fileUrl,
      });
    })();
    if (bookUpdateResult.isErr())
      return err(
        bookUpdateResult.error instanceof Error
          ? bookUpdateResult.error.message
          : `Failed to update the cover link of the book!`,
      );

    return ok(bookUpdateResult.value);
  }
}
