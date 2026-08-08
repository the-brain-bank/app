import { desc, eq } from "drizzle-orm";
import { RecommendationRepository } from "../../../core/application/ports/recommendation";
import { Recommendation } from "../../../core/domain/entities/recommendation";
import { db } from "./index";
import { recommendations } from "./schema";

export class DrizzleRecommendationRepository implements RecommendationRepository {
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
    recData: Omit<Recommendation, "createdAt">,
  ): Promise<Recommendation> {
    const [newRec] = await db
      .insert(recommendations)
      .values(recData)
      .returning();
    return newRec as Recommendation;
  }
}
