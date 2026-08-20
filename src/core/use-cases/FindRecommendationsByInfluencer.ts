import type { RecommendationRepository } from "../application/ports/recommendation";
import type { User } from "../domain/entities/user";

export class FindRecommendationsByInfluencer {
  constructor(
    private readonly recommendationRepository: RecommendationRepository,
  ) {}

  async execute(influencerId: User["id"]) {
    return await this.recommendationRepository.findByInfluencerId(influencerId);
  }
}
