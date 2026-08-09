import type { UserRepository } from "../application/ports/user";
import type { AuthorUser, User } from "../domain/entities/user";

export class GetTopAuthors {
  constructor(private readonly authorRepository: UserRepository) {}

  async execute(limit: number = 10): Promise<(User & AuthorUser)[]> {
    return this.authorRepository.findByRole<AuthorUser>({
      role: ["AUTHOR"],
      limit,
    });
  }
}
