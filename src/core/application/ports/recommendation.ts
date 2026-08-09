import type { Result } from 'neverthrow';
import type { Recommendation } from '../../domain/entities/recommendation';
import type { PaginatedResponse } from '../types/paginatinated-response';

export interface GetAllRecommendationsParams {
  limit: number;
  offset: number;
  bookId?: string;
  authorId?: string;
}

export interface RecommendationRepository {
  findByBookId(bookId: string): Promise<Recommendation[]>;
  findByPersonId(personId: string): Promise<Recommendation[]>;
  create(recommendation: Omit<Recommendation, 'createdAt' | "updatedAt" | "id">): Promise<Result<Recommendation, string>>;
  getAll(params: GetAllRecommendationsParams): Promise<Result<PaginatedResponse<Recommendation>, string>>;
}
