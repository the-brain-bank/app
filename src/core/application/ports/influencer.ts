import { InfluencerUser } from "@/core/domain/entities/user";
import type { Result } from "neverthrow";
import { GetAllPayload } from "./user";
import { PaginatedResponse } from "../types/paginatinated-response";
import { InfluencerWithRecommendationCount } from "@/core/domain/entities/influencer";

export interface InfluencerRepository {
    getAll(payload: GetAllPayload): Promise<Result<PaginatedResponse<InfluencerWithRecommendationCount>, string>>
}