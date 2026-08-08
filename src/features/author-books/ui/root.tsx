import { TypographyH2 } from "@/components/ui/typography";
import { BooksGrid } from "@/components/widgets/books/ui/grid";
import { BookList } from "@/components/widgets/books/ui/list";
import { Book } from "@/core/domain/entities/book";
import { User } from "@/core/domain/entities/user";

export async function Root({ books, author }: { books: Book[]; author: User }) {
  const mappedBooks = books.map((book) => ({
    ...book,
    author,
  }));

  return (
    <>
      <section className="pt-12">
        <div className="container mx-auto">
          <TypographyH2 className="mb-6">Authored books</TypographyH2>
          <BooksGrid>
            <BookList books={mappedBooks} />
          </BooksGrid>
        </div>
      </section>
    </>
  );
}
