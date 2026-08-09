import { bookRepository, sessionAdapter } from "@/composition";
import type { Book } from "@/core/domain/entities/book";
import { DeleteBook } from "./_components/actions/delete-book";
import { EditCover } from "./_components/actions/edit-cover";
import { EditBook } from "./_components/actions/edit-book";
import { redirect } from "next/navigation";
import {
  BookActions,
  BookAuthor,
  BookCover,
  BookDescription,
  BookTitle,
} from "@/components/widgets/books/ui/book";
import { Separator } from "@/components/ui/separator";
import { UploadBookCover } from "@/features/upload-book-cover";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";

export default async function BookDetailPage({
  params,
}: {
  params: Promise<{
    bookId: Book["id"];
  }>;
}) {
  const { bookId } = await params;
  const book = await bookRepository.findById(bookId);
  if (!book) redirect("/admin/books");

  return (
    <section className="py-12">
      <div className="container mx-auto space-y-6">
        <Link
          href="/admin/books"
          className={buttonVariants({ variant: "secondary" })}
        >
          <ArrowLeft className="mr-2 inline-block h-4 w-4" />
          Back to books
        </Link>
        <div className="flex flex-wrap gap-12">
          <div className="max-w-75">
            <BookCover recommendationCount={book.recommendations.length} className="max-h-100 w-auto" src={book.coverImage} />
          </div>
          <div>
            <div className="max-w-md">
              <BookTitle className="relative line-clamp-none">{book.title}</BookTitle>
              <BookDescription className="line-clamp-none">{book.description}</BookDescription>
            </div>
            <Separator />
            <div>
              <BookAuthor author={book.author} />
            </div>
          </div>
          <Actions book={book} />
        </div>
      </div>
    </section>
  );
}

async function Actions({ book }: { book: Book }) {
  const session = await sessionAdapter.getSession();
  if (session.isErr()) return null;

  return (
    <BookActions>
      {session.value.user.role.includes("ADMIN") && <DeleteBook book={book} />}
      <EditCover book={book} />
      <EditBook book={book} />
      <UploadBookCover />
    </BookActions>
  );
}
