import { desc, eq } from "drizzle-orm";
import {
  GetAllRecommendationsParams,
  RecommendationRepository,
} from "../../../core/application/ports/recommendation";
import { Recommendation } from "../../../core/domain/entities/recommendation";
import { db } from "./index";
import { recommendations } from "./schema";
import { Result, ResultAsync } from "neverthrow";
import { PaginatedResponse } from "@/core/application/types/paginatinated-response";

export class DrizzleRecommendationRepository
  implements RecommendationRepository
{
  async findByBookId(bookId: string): Promise<Recommendation[]> {
    return db.query.recommendations.findMany({
      where: eq(recommendations.bookId, bookId),
      with: { author: true },
      orderBy: [desc(recommendations.createdAt)],
    });
  }

  async findByPersonId(personId: string): Promise<Recommendation[]> {
    return db.query.recommendations.findMany({
      where: eq(recommendations.authorId, personId),
      with: { book: { with: { author: true, category: true } } },
      orderBy: [desc(recommendations.createdAt)],
    });
  }

  async create(
    recData: Omit<Recommendation, "createdAt" | "id" | "updatedAt">,
  ): Promise<Result<Recommendation, string>> {
    return await ResultAsync.fromThrowable(
      async () => {
        const [newRec] = await db
          .insert(recommendations)
          .values({
            authorId: recData.authorId,
            bookId: recData.bookId,
            quote: recData.quote,
            sourceUrl: recData.sourceUrl,
          })
          .returning();
        return newRec;
      },
      (error) => {
        console.error("Error creating recommendation:", error);
        return String(error);
      },
    )();
  }

  async getAll(
    params: GetAllRecommendationsParams,
  ): Promise<Result<PaginatedResponse<Recommendation>, string>> {
    const result = await ResultAsync.fromThrowable(
      async () => {
        const recs = await db.query.recommendations.findMany({
          with: {
            author: true,
            book: true,
          },
          orderBy: [desc(recommendations.createdAt)],
        });
        const count = await db.$count(recommendations);
        return {
          data: recs,
          total: count,
          currentPage: params.offset / params.limit + 1,
          pageSize: params.limit,
          totalPages: Math.ceil(count / params.limit),
        };
      },
      (error) => String(error),
    )();
    return result;
  }
}
