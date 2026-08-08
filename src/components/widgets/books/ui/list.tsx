import type { Book } from "@/core/domain/entities/book";
import {
  BookAuthor,
  BookContent,
  BookCover,
  BookRoot,
  BookTitle,
} from "./book";
import Link from "next/link";

interface Props {
  books: Book[];
}

export function BookList({ books }: Props) {
  return books.map((book) => (
    <BookRoot key={book.id} bookId={book.id} className="max-w-75 h-75">
      <BookCover recommendationCount={book.recommendations.length} src={book.coverImage} alt={book.title} />
      <BookContent>
        <Link href={`/books/${book.id}`}>
          <BookTitle>{book.title}</BookTitle>
        </Link>
        <BookAuthor author={book.author} />
      </BookContent>
    </BookRoot>
  ));
}
