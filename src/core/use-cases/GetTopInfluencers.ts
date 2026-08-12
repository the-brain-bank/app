import type { Result } from "neverthrow";
import type { UserRepository } from "../application/ports/user";
import type { InfluencerUser, User } from "../domain/entities/user";

export class GetTopInfluencersUseCase {
  constructor(
    private readonly userRepository: UserRepository<InfluencerUser>,
  ) {}

  async execute(): Promise<Result<(User & InfluencerUser)[], string>> {
    return await this.userRepository.findByRole({
      role: ["INFLUENCER"],
      limit: 20,
      offset: 0,
    });
  }
}
