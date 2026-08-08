import { errAsync, Result, ResultAsync } from "neverthrow";
import { UserRepository } from "../application/ports/user";
import { SessionPort } from "../application/ports/session";
import { User } from "../domain/entities/user";

export interface EditAuthorCommand {
  authorId: string;
  name?: string;
  bio?: string | null;
  industry?: string;
}

export class EditAuthorUseCase {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly sessionAdapter: SessionPort,
  ) {}

  async execute(command: EditAuthorCommand): Promise<Result<User, string>> {
    const getSessionResult = await this.sessionAdapter.getSession();
    if (getSessionResult.isErr()) return errAsync(getSessionResult.error);

    const { authorId, ...userData } = command;

    return ResultAsync.fromThrowable(() =>
      this.userRepository.updateById(authorId, userData),
    )().mapErr((error) => {
      if (error instanceof Error) return error.message;
      return "Unknown error when editing the author!";
    });
  }
}
