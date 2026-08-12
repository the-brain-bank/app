import type { UserRepository } from "../application/ports/user";
import type { InfluencerUser } from "../domain/entities/user";

interface Payload {
  limit: number;
  offset: number;
  search?: string;
  sortBy?: string;
  sortOrder?: "ASC" | "DESC";
}

export class GetAllInfluencersUseCase {
  constructor(private readonly userRepo: UserRepository<InfluencerUser>) {}

  async execute(payload: Payload) {
    return await this.userRepo.findByRole({
      role: ["INFLUENCER"],
      limit: payload.limit,
      offset: payload.offset,
      search: payload.search,
    });
  }
}
