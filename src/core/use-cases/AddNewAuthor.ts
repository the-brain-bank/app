import type {
  CreateAuthorPayload,
  UserRepository,
} from "../application/ports/user";
import type { AuthorUser, User } from "../domain/entities/user";
import { errAsync, type Result } from "neverthrow";
import type { SessionPort } from "../application/ports/session";

export class AddNewAuthorUseCase {
  constructor(
    private readonly userRepository: UserRepository<AuthorUser>,
    private readonly sessionAdapter: SessionPort,
  ) {}

  async execute(
    user: Omit<CreateAuthorPayload, "role">,
  ): Promise<Result<User, string>> {
    const getSessionResult = await this.sessionAdapter.getSession();
    if (getSessionResult.isErr()) return errAsync(getSessionResult.error);
    return await this.userRepository.create({
      ...user,
      role: ["AUTHOR"],
    });
  }
}
