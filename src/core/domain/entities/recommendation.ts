import { Book } from './book';
import { User } from './user';

export interface Recommendation {
  id: string;
  bookId: string;
  authorId: string;
  quote: string;
  sourceUrl: string;
  createdAt: Date;
  updatedAt: Date;

  // relations
  book: Book;
  author: User;
}
