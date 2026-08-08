import { PersonRepository } from '../application/ports/user';
import { BookRepository } from '../application/ports/book';
import { RecommendationRepository } from '../application/ports/recommendation';
import { Person } from '../domain/entities/user';
import { Book } from '../domain/entities/Book';
import { Recommendation } from '../domain/entities/recommendation';

export interface PersonProfile {
  person: Person;
  authoredBooks: Book[];
  recommendedBooks: Recommendation[];
}

export class GetPersonProfile {
  constructor(
    private readonly personRepository: PersonRepository,
    private readonly bookRepository: BookRepository,
    private readonly recommendationRepository: RecommendationRepository
  ) { }

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
