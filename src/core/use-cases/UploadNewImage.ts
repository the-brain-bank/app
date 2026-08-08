import { err, ok } from "neverthrow";
import { ImageUploadPort } from "../application/ports/image-upload";

export class UploadNewImageUseCase {
  constructor(private readonly imageUploadService: ImageUploadPort) {}

  async execute(
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

    return ok(imageUploadResult.value.fileUrl);
  }
}
