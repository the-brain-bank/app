import { TypographyH2 } from "@/components/ui/typography";
import { BookList } from "@/components/widgets/books/ui/list";
import { query } from "../api/query";
import { BooksGrid } from "@/components/widgets/books/ui/grid";

export async function Root() {
  const data = await query();

  return (
    <section className="py-8 mb-20">
      <div className="container mx-auto">
        <TypographyH2 className="mb-4">Top Books</TypographyH2>
        <BooksGrid>

          <BookList books={data} />
        </BooksGrid>
      </div>
    </section>
  );
}
