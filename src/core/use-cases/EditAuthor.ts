import { errAsync, type Result } from "neverthrow";
import type {
  UpdateByIdPayload,
  UserRepository,
} from "../application/ports/user";
import type { SessionPort } from "../application/ports/session";
import type { AuthorUser, User } from "../domain/entities/user";

export class EditAuthorUseCase {
  constructor(
    private readonly userRepository: UserRepository<AuthorUser>,
    private readonly sessionAdapter: SessionPort,
  ) {}

  async execute({
    id,
    update,
  }: UpdateByIdPayload): Promise<Result<User, string>> {
    const getSessionResult = await this.sessionAdapter.getSession();
    if (getSessionResult.isErr()) return errAsync(getSessionResult.error);

    return await this.userRepository.updateById({
      id,
      update,
    });
  }
}
