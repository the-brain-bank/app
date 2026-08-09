import type { Result } from "neverthrow";
import type {
  GetAllRecommendationsParams,
  RecommendationRepository,
} from "../application/ports/recommendation";
import type { Recommendation } from "../domain/entities/recommendation";
import type { PaginatedResponse } from "../application/types/paginatinated-response";

export class GetAllRecommendationsUseCase {
  constructor(
    private readonly recommendationRepository: RecommendationRepository,
  ) {}

  async execute(
    params: GetAllRecommendationsParams,
  ): Promise<Result<PaginatedResponse<Recommendation>, string>> {
    return this.recommendationRepository.getAll(params);
  }
}
