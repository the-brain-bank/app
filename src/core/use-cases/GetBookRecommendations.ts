import type { RecommendationRepository } from "../application/ports/recommendation";
import type { Book } from "../domain/entities/book";

export class GetBookRecommendationsUseCase {
  constructor(
    private readonly recommendationRepository: RecommendationRepository,
  ) {}

  async execute(bookId: Book["id"]) {
    return await this.recommendationRepository.findByBookId(bookId);
  }
}
