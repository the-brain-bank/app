import { Recommendation } from '../../domain/entities/recommendation';

export interface RecommendationRepository {
  findByBookId(bookId: string): Promise<Recommendation[]>;
  findByPersonId(personId: string): Promise<Recommendation[]>;
  create(recommendation: Omit<Recommendation, 'createdAt'>): Promise<Recommendation>;
}
