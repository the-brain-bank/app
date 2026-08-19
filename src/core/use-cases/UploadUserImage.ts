import { err } from "neverthrow";
import type { ImageUploadPort } from "../application/ports/image-upload";
import type { UserRepository } from "../application/ports/user";
import type { User } from "../domain/entities/user";

export class UploadUserImageUseCase {
  constructor(
    private readonly userRepo: UserRepository<User>,
    private readonly imageUploadRepo: ImageUploadPort,
  ) {}

  async execute(userId: User["id"], image: File) {
    const uploadResult = await this.imageUploadRepo.upload({
      file: image,
    });
    if (uploadResult.isErr()) return err(uploadResult.error);

    return await this.userRepo.updateById({
      id: userId,
      update: {
        image: uploadResult.value.fileUrl,
      },
    });
  }
}
