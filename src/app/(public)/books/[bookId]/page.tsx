import { bookRepository } from "@/composition";
import type { Book } from "@/core/domain/entities/book";
import { redirect } from "next/navigation";
import { Widget as BookDetailsWidget } from "@/components/widgets/books/ui/book-details";
import { InfluencerMentionsWidget } from "@/components/widgets/books/ui/influencer-mentions";

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
    <section className="pb-24">
      <div className="mx-auto w-full max-w-[1200px] px-6 md:px-12">
        <BookDetailsWidget book={book} />
        <InfluencerMentionsWidget bookId={bookId} />
      </div>
    </section>
  );
}
