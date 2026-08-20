import { BookRecommendation } from "../../book-recommendation";
import type { AuthorUser, User } from "@/core/domain/entities/user";
import { getBookRecommendationsUseCase } from "@/composition";

export async function InfluencerMentionsWidget({ bookId }: { bookId: string }) {
  const result = await getBookRecommendationsUseCase.execute(bookId);

  if (result.isErr()) return "Failed to get recommendations";

  const mentions = result.value;

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
