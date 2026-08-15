import { db } from "@/infrastructure/api/db";
import { recommendations, users } from "@/infrastructure/api/db/schema";
import { eq, desc, sql } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

export async function InfluencerMentionsWidget({ bookId }: { bookId: string }) {
  const mentions = await db
    .select({
      recommendation: recommendations,
      author: users,
      numberOfRecommendations: sql<number>`cast((
        SELECT count(*)
        FROM ${recommendations} r2
        WHERE r2.author_id = ${users.id}
      ) as int)`,
    })
    .from(recommendations)
    .innerJoin(users, eq(recommendations.authorId, users.id))
    .where(eq(recommendations.bookId, bookId))
    .orderBy(desc(recommendations.createdAt));

  if (!mentions.length) return null;

  return (
    <div className="flex flex-col gap-12 mt-16 pt-16 border-t border-neutral-200">
      {mentions.map(({ recommendation, author, numberOfRecommendations }) => (
        <div key={recommendation.id} className="flex flex-col md:flex-row gap-6 md:gap-8 items-start">
          {/* Mentions Count */}
          <div className="flex flex-col items-center justify-start w-32 shrink-0 pt-2">
            <span className="text-[4.5rem] ">
              {numberOfRecommendations}
            </span>
            <span className="">
              {numberOfRecommendations === 1 ? "mention" : "mentions"}
            </span>
          </div>

          {/* Influencer Image */}
          <div className="shrink-0">
            {author.image ? (
              <Image
                src={author.image}
                alt={author.name}
                width={160}
                height={160}
                className="object-cover w-40 h-40"
              />
            ) : (
              <div className="w-40 h-40 flex items-center justify-center ">
                No image
              </div>
            )}
          </div>

          {/* Quote and Author */}
          <div className="flex-1 flex flex-col pt-2">
            <blockquote className="text-xl font-serif leading-relaxed flex gap-3">
              <span className="text-3xl">
                “
              </span>
              <span>{recommendation.quote}</span>
            </blockquote>

            <div className="mt-6 ml-6 grid gap-2">
              <Link
                href={`/influencers/${author.id}`}
                className="underline"
              >
                {author.name}
              </Link>

              <Link
                target="_blank"
                rel="noopener noreferrer"
                // @ts-expect-error recommendation.sourceUrl is an external URL
                href={recommendation.sourceUrl}
                className="text-sm transition-colors inline-block px-2 py-1 rounded-sm max-w-max bg-foreground text-background"
              >
                {numberOfRecommendations === 1
                  ? "View source"
                  : `View all ${numberOfRecommendations} sources`}
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
