import { BookCover } from "@/components/widgets/books/ui/book";
import { bookRepository, sessionAdapter } from "@/composition";
import type { Book } from "@/core/domain/entities/book";
import { PenBox } from "lucide-react";
import Link from "next/link";
import { redirect } from "next/navigation";
import { Widget as BookDetailsWidget } from "@/components/widgets/books/ui/book-details";

const StoreBadges = () => (
  <div className="flex flex-row items-center gap-2 mt-8 flex-wrap">
    <div className="bg-black text-white rounded flex items-center justify-center py-1.5 px-3 gap-2 cursor-pointer hover:bg-neutral-800 transition-colors">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M12 2C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 18c-4.411 0-8-3.589-8-8s3.589-8 8-8 8 3.589 8 8-3.589 8-8 8Z" /></svg>
      <div className="flex flex-col items-start leading-[1.1]"><span className="text-[9px] opacity-80 uppercase tracking-wider font-semibold">Get it on</span><span className="text-sm font-bold">Amazon.com</span></div>
    </div>
    <div className="bg-black text-white rounded flex items-center justify-center py-1.5 px-3 gap-2 cursor-pointer hover:bg-neutral-800 transition-colors">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><path d="M16.365 20.301c-1.393.98-2.61 1.053-3.955.05-1.298-.96-2.583-.96-3.83 0-1.52.92-2.738.77-3.96-.28-3.5-3.03-5.22-7.85-3.32-11.45 1.06-2.02 2.87-3.23 4.98-3.33 1.48-.07 2.82.88 3.65.88.82 0 2.45-1.12 4.19-.94 1.76.17 3.32.96 4.28 2.38-3.56 2.05-3.04 6.74.6 8.23-.74 1.87-1.74 3.55-2.64 4.46zM11.965 5.56c-.24-1.92 1.34-3.54 3.19-3.77.34 2.14-1.42 3.86-3.19 3.77z" /></svg>
      <div className="flex flex-col items-start leading-[1.1]"><span className="text-[9px] opacity-80 uppercase tracking-wider font-semibold">Get it on</span><span className="text-sm font-bold">Apple Books</span></div>
    </div>
    <div className="bg-black text-white rounded flex items-center justify-center py-1.5 px-3 gap-2 cursor-pointer hover:bg-neutral-800 transition-colors">
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5"><rect width="18" height="18" x="3" y="3" rx="2" /><path d="M7 7h10v10H7z" /></svg>
      <div className="flex flex-col items-start leading-[1.1]"><span className="text-[9px] opacity-80 uppercase tracking-wider font-semibold">Get it on</span><span className="text-sm font-bold">Bookshop</span></div>
    </div>
  </div>
);

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

  const session = await sessionAdapter.getSession();
  const isAdmin = session.isOk() && session.value.user.role === "ADMIN";

  return (
    <section className="">
      <div className="mx-auto w-full max-w-[1400px]">
        <BookDetailsWidget book={book} />
      </div>
    </section>
  );
}
