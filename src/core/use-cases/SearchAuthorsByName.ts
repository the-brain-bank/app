import { ResultAsync } from "neverthrow";
import type { UserRepository } from "../application/ports/user";

export class SearchAuthorByNameUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: string) {
    const users = ResultAsync.fromThrowable(
      async () => {
        return this.userRepository.findByRole({
          role: ["AUTHOR"],
          search: query,
          limit: 20,
        });
      },
      (error) => {
        return `Failed to search users by name: ${error instanceof Error ? error.message : "Unknown error"}`;
      },
    )();
    return users;
  }
}
