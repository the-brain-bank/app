import { err } from "neverthrow";
import type { ImageUploadPort } from "../application/ports/image-upload";
import type { UserRepository } from "../application/ports/user";
import type { AuthorUser, User } from "../domain/entities/user";

export class UploadAuthorImageUseCase {
  constructor(
    private readonly userRepository: UserRepository<AuthorUser>,
    private readonly imageUploadService: ImageUploadPort,
  ) {}

  async execute(
    authorId: User["id"],
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
    return this.userRepository.updateById({
      id: authorId,
      update: {
        image: imageUploadResult.value.fileUrl,
      },
    });
  }
}
