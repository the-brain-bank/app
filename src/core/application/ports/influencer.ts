import type { Result } from "neverthrow";
import type { GetAllPayload } from "./user";
import type { PaginatedResponse } from "../types/paginatinated-response";
import type { InfluencerWithRecommendationCount } from "@/core/domain/entities/influencer";

export interface InfluencerRepository {
  getAll(
    payload: GetAllPayload,
  ): Promise<
    Result<PaginatedResponse<InfluencerWithRecommendationCount>, string>
  >;
}
