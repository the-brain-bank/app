import type { UserRepository } from "../application/ports/user";
import type { User } from "../domain/entities/user";

export class SearchUsersByNameUseCase {
  constructor(private readonly userRepository: UserRepository<User>) {}

  async execute(query: string) {
    return await this.userRepository.findAll({
      search: query,
      limit: 20,
      offset: 0,
    });
  }
}
