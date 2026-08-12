import type { UserRepository } from "../application/ports/user";
import type { User } from "../domain/entities/user";
import { errAsync, type Result, ResultAsync } from "neverthrow";
import type { SessionPort } from "../application/ports/session";

export class AddNewUserUseCase {
  constructor(
    private readonly userRepository: UserRepository<User>,
    private readonly sessionAdapter: SessionPort,
  ) {}

  async execute(
    user: Omit<User, "id" | "createdAt" | "updatedAt">,
  ): Promise<Result<User, string>> {
    const getSessionResult = await this.sessionAdapter.getSession();
    if (getSessionResult.isErr()) return errAsync(getSessionResult.error);
    return await this.userRepository.create(user);
  }
}
