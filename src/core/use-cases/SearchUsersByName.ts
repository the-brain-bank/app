import { ResultAsync } from "neverthrow";
import type { UserRepository } from "../application/ports/user";
import type { User } from "../domain/entities/user";

export class SearchUsersByNameUseCase {
  constructor(private readonly userRepository: UserRepository) {}

  async execute(query: string, role?: User["role"]) {
    const users = ResultAsync.fromThrowable(
      async () => {
        return this.userRepository.findByRole({
          role: role ?? [],
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
