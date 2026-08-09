import type { Result } from "neverthrow";
import type { RecommendationRepository } from "../application/ports/recommendation";
import type { Recommendation } from "../domain/entities/recommendation";

export class AddRecommendationUseCase {
  constructor(private recommendationRepository: RecommendationRepository) {}

  async execute(
    payload: Omit<Recommendation, "createdAt" | "updatedAt" | "id">,
  ): Promise<Result<Recommendation, string>> {
    const newRecommendation: Omit<
      Recommendation,
      "createdAt" | "updatedAt" | "id"
    > = {
      bookId: payload.bookId,
      authorId: payload.authorId,
      quote: payload.quote,
      sourceUrl: payload.sourceUrl,
    };

    return await this.recommendationRepository.create(newRecommendation);
  }
}
