import { GetAllPayload } from "@/core/application/ports/user";
import { PaginatedResponse } from "@/core/application/types/paginatinated-response";
import { InfluencerWithRecommendationCount } from "@/core/domain/entities/influencer";
import { and, arrayOverlaps, desc, ilike, sql } from "drizzle-orm";
import { Result, ResultAsync } from "neverthrow";
import { recommendations, users } from "./schema";
import { db } from ".";
import { InfluencerRepository } from "@/core/application/ports/influencer";

export class DrizzleInfluencerRepository implements InfluencerRepository {
    async getAll(
        payload: GetAllPayload,
    ): Promise<Result<PaginatedResponse<InfluencerWithRecommendationCount>, string>> {
        return await ResultAsync.fromThrowable(async () => {
            const conditions = [];
            if (payload.search) {
                conditions.push(ilike(users.name, `%${payload.search}%`));
            }
            conditions.push(arrayOverlaps(users.role, ["INFLUENCER"]));

            const where = conditions.length > 0 ? and(...conditions) : undefined;
            const result = await db.query.users.findMany({
                limit: payload.limit,
                offset: payload.offset,
                where,
                orderBy: [desc(users.createdAt)],
                extras: {
                    numberOfRecommendations: sql<number>`cast((
                        SELECT count(*)
                        FROM ${recommendations}
                        WHERE ${recommendations.authorId} = "users"."id"
                    ) as int)`.as("numberOfRecommendations"),
                },
            });
            const count = await db.$count(users, where);
            const response: PaginatedResponse<InfluencerWithRecommendationCount> = {
                data: result as unknown as (InfluencerWithRecommendationCount)[],
                total: count,
                currentPage: payload.offset,
                pageSize: payload.limit,
                totalPages: Math.ceil(count / payload.limit),
            };
            return response;
        })().mapErr((error) =>
            error instanceof Error
                ? error.message
                : `Failed to execute the findAll method in DrizzleAuthorRepository: ${error}`,
        );
    }
}