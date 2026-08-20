import { db } from "@/infrastructure/api/db";
import { books, recommendations, users } from "@/infrastructure/api/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import { BookRecommendation } from "../../book-recommendation";
import { AuthorUser, User } from "@/core/domain/entities/user";

export async function InfluencerMentionsWidget({ bookId }: { bookId: string }) {
  const mentions = await db
    .select({
      recommendation: recommendations,
      author: users,
      book: books,
    })
    .from(recommendations)
    .innerJoin(users, eq(recommendations.authorId, users.id))
    .innerJoin(books, eq(recommendations.bookId, books.id))
    .where(eq(recommendations.bookId, bookId))
    .orderBy(desc(recommendations.createdAt));

  if (!mentions.length) return null;

  return (
    <div className="flex flex-col gap-12 mt-16 pt-16 border-t border-neutral-200">
      {mentions.map(({ recommendation, author, book }) => (
        <BookRecommendation
          author={author as unknown as User & AuthorUser}
          book={book}
          recommendation={recommendation}
          variant="book"
          key={recommendation.id}
        />
      ))}
    </div>
  );
}
