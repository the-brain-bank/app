import { TypographyH1 } from "@/components/ui/typography";
import { Influencers } from "./_components/influencers";
import { getAllInfluencersAction } from "./_actions/query";
import { getAllInfluencersUseCase } from "@/composition";
import { err, ok } from "neverthrow";

export default async function HomePage() {
  return (
    <section className="text-left">
      <div className="container mx-auto">
        <div className="space-y-8 py-12">
          <TypographyH1>Favorite books of influential people</TypographyH1>
          <p>
            The more a book is mentioned, the higher the recommendation in our
            ranking.
          </p>
          <p>
            Where do we get the mentions from? Any content created by the person
            such as Tweets, a YouTube channel, Reddit comments, books, amazon
            reviews and blog posts. Any interviews.
          </p>
        </div>
        <Influencers
          promise={(async () => {
            const result = await getAllInfluencersUseCase.execute({
              limit: 1000,
              offset: 0,
            });
            if (result.isErr()) return err(result.error);
            return ok(result.value.data);
          })()}
        />
      </div>
    </section>
  );
}
