import { err, ok, ResultAsync } from "neverthrow";
import { ImageUploadPort } from "../application/ports/image-upload";
import { UserRepository } from "../application/ports/user";
import { Book } from "../domain/entities/book";

export class UploadAuthorImageUseCase {
  constructor(
    private readonly userRepository: UserRepository,
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
    const updateResult = await ResultAsync.fromThrowable(async () => {
      return this.userRepository.updateById(bookId, {
        image: imageUploadResult.value.fileUrl,
      });
    })();
    if (updateResult.isErr())
      return err(
        updateResult.error instanceof Error
          ? updateResult.error.message
          : `Failed to update the cover link of the book!`,
      );

    return ok(updateResult.value);
  }
}
