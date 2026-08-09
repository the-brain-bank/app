import type { UserRepository } from "../application/ports/user";
import type { User } from "../domain/entities/user";

export class GetTopAuthors {
  constructor(private readonly authorRepository: UserRepository) {}

  async execute(limit: number = 10): Promise<User[]> {
    return this.authorRepository.findByRole({
      role: ["AUTHOR"],
      limit,
    });
  }
}
