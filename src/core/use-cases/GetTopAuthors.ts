import type { Result } from "neverthrow";
import type { UserRepository } from "../application/ports/user";
import type { AuthorUser, User } from "../domain/entities/user";

export class GetTopAuthors {
  constructor(private readonly authorRepository: UserRepository<AuthorUser>) {}

  async execute(
    limit: number = 10,
  ): Promise<Result<(User & AuthorUser)[], string>> {
    return await this.authorRepository.findByRole({
      role: ["AUTHOR"],
      limit,
    });
  }
}
