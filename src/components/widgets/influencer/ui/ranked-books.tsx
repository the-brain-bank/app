import { db } from "@/infrastructure/api/db";
import { recommendations, books, users } from "@/infrastructure/api/db/schema";
import { eq } from "drizzle-orm";
import type {
  AuthorUser,
  InfluencerUser,
  User,
} from "@/core/domain/entities/user";
import Image from "next/image";
import { TypographyH2 } from "@/components/ui/typography";
import { BookRecommendation } from "../../book-recommendation";
import { match, P } from "ts-pattern";

export async function InfluencerRankedBooksWidget({
  influencer,
}: {
  influencer: User & InfluencerUser;
}) {
  const booksRecommended = await db
    .select({
      recommendation: recommendations,
      book: books,
      author: users,
    })
    .from(recommendations)
    .innerJoin(books, eq(recommendations.bookId, books.id))
    .innerJoin(users, eq(books.authorId, users.id))
    .where(eq(recommendations.authorId, influencer.id));

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
          {match(influencer.image)
            .with(P.string.startsWith("https://"), (imageUrl) => (
              <Image
                src={imageUrl}
                alt={influencer.name}
                width={320}
                height={320}
                className="w-full h-auto object-cover bg-neutral-100 shadow-sm"
              />
            ))
            .otherwise(() => (
              <div className="w-full aspect-square bg-neutral-200 flex items-center justify-center">
                No Image
              </div>
            ))}
        </div>

        <p className="text-xl">{influencer.bio}</p>
      </div>

      {/* Books List Section */}
      <div className="flex flex-col gap-16 mt-8">
        {booksRecommended.map(({ recommendation, book, author }) => (
          <BookRecommendation
            key={recommendation.id}
            author={author as unknown as User & AuthorUser}
            book={book}
            recommendation={recommendation}
          />
        ))}
      </div>
    </div>
  );
}
