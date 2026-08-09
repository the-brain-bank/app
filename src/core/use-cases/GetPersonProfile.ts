import type { BookRepository } from "../application/ports/book";
import type { RecommendationRepository } from "../application/ports/recommendation";
import type { UserRepository } from "../application/ports/user";
import type { Book } from "../domain/entities/book";
import type { Recommendation } from "../domain/entities/recommendation";
import type { User } from "../domain/entities/user";

export interface PersonProfile {
  person: User;
  authoredBooks: Book[];
  recommendedBooks: Recommendation[];
}

export class GetPersonProfile {
  constructor(
    private readonly personRepository: UserRepository,
    private readonly bookRepository: BookRepository,
    private readonly recommendationRepository: RecommendationRepository,
  ) {}

  async execute(slug: string): Promise<PersonProfile | null> {
    const person = await this.personRepository.findBySlug(slug);
    if (!person) {
      return null;
    }

    const [authoredBooks, recommendedBooks] = await Promise.all([
      this.bookRepository.findByAuthorId(person.id),
      this.recommendationRepository.findByPersonId(person.id),
    ]);

    return {
      person,
      authoredBooks,
      recommendedBooks,
    };
  }
}
