import { bookRepository } from "@/composition";
import type { Book } from "@/core/domain/entities/book";
import { redirect } from "next/navigation";
import { Widget as BookDetailsWidget } from "@/components/widgets/books/ui/book-details";

export default async function ({
  params,
}: {
  params: Promise<{
    bookId: Book["id"];
  }>;
}) {
  const { bookId } = await params;
  const book = await bookRepository.findById(bookId);
  if (!book) redirect("/");

  return (
    <section className="">
      <div className="mx-auto w-full max-w-350">
        <BookDetailsWidget book={book} />
      </div>
    </section>
  );
}
