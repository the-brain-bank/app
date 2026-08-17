import { TypographyH2 } from "@/components/ui/typography";
import {
  BookAuthor,
  BookContent,
  BookCover,
  BookRoot,
  BookTitle,
} from "@/components/widgets/books/ui/book";
import { BooksGrid } from "@/components/widgets/books/ui/grid";
import { BookLoader } from "@/components/widgets/books/ui/loader";
import { getTopBooksUseCase } from "@/composition";
import type { Book } from "@/core/domain/entities/book";
import type { Result } from "neverthrow";
import type { Metadata } from "next";
import Link from "next/link";
import { Suspense, use } from "react";
import { match } from "ts-pattern";

export const metadata: Metadata = {
  title: "Top Recommended Books",
  description:
    "Browse the highest-ranked books recommended by influential people. Rankings are based on how often a book is mentioned across interviews, tweets, and content.",
};

export default function BooksPage() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <Suspense fallback={<BookLoader count={10} />}>
          <Books promise={getTopBooksUseCase.execute(20)} />
        </Suspense>
      </div>
    </section>
  );
}

function Books({ promise }: { promise: Promise<Result<Book[], string>> }) {
  const result = use(promise);

  if (result.isErr()) return "Error...";

  const books = result.value;

  return (
    <>
      {match(books)
        .with([], () => <p className="text-neutral-400">No books available.</p>)
        .otherwise(() => (
          <BooksGrid>
            {books.map((book) => (
              <BookRoot bookId={book.id} key={book.id}>
                <BookCover
                  recommendationCount={book.recommendations.length}
                  src={book.coverImage}
                  alt={book.title}
                />
                <BookContent>
                  <Link href={`/books/${book.id}`}>
                    <BookTitle>{book.title}</BookTitle>
                  </Link>
                  <BookAuthor author={book.author} />
                </BookContent>
              </BookRoot>
            ))}
          </BooksGrid>
        ))}
    </>
  );
}
