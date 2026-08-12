import type { UserRepository } from "../application/ports/user";
import type { AuthorUser } from "../domain/entities/user";

export class SearchAuthorByNameUseCase {
  constructor(private readonly userRepository: UserRepository<AuthorUser>) {}

  async execute(query: string) {
    return await this.userRepository.findByRole({
      role: ["AUTHOR"],
      search: query,
      limit: 20,
    });
  }
}
