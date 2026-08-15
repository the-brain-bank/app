import { db } from "@/infrastructure/api/db";
import { recommendations, books, users } from "@/infrastructure/api/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import type { InfluencerUser, User } from "@/core/domain/entities/user";
import Image from "next/image";
import Link from "next/link";
import { TypographyH2, TypographyH3 } from "@/components/ui/typography";

export async function InfluencerRankedBooksWidget({
  influencer,
}: {
  influencer: User & InfluencerUser;
}) {
  const totalMentions = sql<number>`cast((
    SELECT count(*)
    FROM ${recommendations} r2
    WHERE r2.book_id = ${books.id}
  ) as int)`;

  const booksRecommended = await db
    .select({
      recommendation: recommendations,
      book: books,
      author: users,
      totalMentions,
    })
    .from(recommendations)
    .innerJoin(books, eq(recommendations.bookId, books.id))
    .innerJoin(users, eq(books.authorId, users.id))
    .where(eq(recommendations.authorId, influencer.id))
    .orderBy(desc(totalMentions), desc(recommendations.createdAt));

  if (!booksRecommended.length) return null;

  const totalInfluencerMentions = booksRecommended.length;

  return (
    <div className="flex flex-col gap-12 w-full">
      <TypographyH2>
        {totalInfluencerMentions} books {influencer.name} mentioned, ranked!
      </TypographyH2>

      {/* Header Section */}
      <div className="mb-12 flex flex-col md:flex-row gap-8 items-start">
        <div className="w-64 md:w-80 shrink-0">
          {influencer.image ? (
            <Image
              src={influencer.image}
              alt={influencer.name}
              width={320}
              height={320}
              className="w-full h-auto object-cover bg-neutral-100 shadow-sm"
            />
          ) : (
            <div className="w-full aspect-square bg-neutral-200 flex items-center justify-center">
              No Image
            </div>
          )}
        </div>

        <p className="text-xl">
          {influencer.bio}
        </p>
      </div>


      {/* Books List Section */}
      <div className="flex flex-col gap-16 mt-8">
        {booksRecommended.map(({ recommendation, book, author, totalMentions }) => (
          <div key={recommendation.id} className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">

            {/* Rank and Book Cover */}
            <div className="flex gap-6 md:gap-8 shrink-0 w-full md:w-auto">
              <div className="flex flex-col items-center justify-start w-24 pt-1">
                <span className="text-[4.5rem] md:text-[5.5rem] ">
                  {totalMentions}
                </span>
                <span className="mt-2 text-lg">
                  {totalMentions === 1 ? "mention" : "mentions"}
                </span>
              </div>

              <div className="w-40 md:w-48 shrink-0">
                <Link href={`/books/${book.slug}`}>
                  <Image
                    src={book.coverImage}
                    alt={book.title}
                    width={192}
                    height={288}
                    className="w-full h-auto object-cover shadow-md transition-transform hover:-translate-y-1"
                  />
                </Link>
              </div>
            </div>

            {/* Details */}
            <div className="flex-1 flex flex-col pt-2 md:pt-4">
              <TypographyH3>
                <Link
                  href={`/books/${book.id}`}
                  className=""
                >
                  {book.title}
                </Link>
              </TypographyH3>
              <p className="text-neutral-600 text-lg mb-6">by {author.name}</p>

              <blockquote className="text-lg leading-relaxed flex gap-3 italic">
                <span className="text-3xl mt-1 text-neutral-400">“</span>
                <span>{recommendation.quote}</span>
              </blockquote>

              <div className="mt-6 ml-6 grid gap-2">                <Link
                target="_blank"
                rel="noopener noreferrer"
                // @ts-expect-error recommendation.sourceUrl is an external URL
                href={recommendation.sourceUrl}
                className="text-sm transition-colors inline-block px-2 py-1 rounded-sm max-w-max bg-foreground text-background"
              >
                View source
              </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
