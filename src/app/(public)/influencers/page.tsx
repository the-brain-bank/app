import {
  AuthorRoot,
  AuthorImage,
  AuthorContent,
  AuthorTitle,
} from "@/components/widgets/author/ui/widget";
import { AuthorsGrid } from "@/components/widgets/author/ui/grid";
import { AuthorLoader } from "@/components/widgets/author/ui/loader";
import { getTopInfluencersUseCase } from "@/composition";
import type { InfluencerUser, User } from "@/core/domain/entities/user";
import { Suspense, use } from "react";
import { match } from "ts-pattern";
import type { Result } from "neverthrow";

export default function Page() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-6">
        <Suspense fallback={<AuthorLoader count={10} />}>
          <Influencers promise={getTopInfluencersUseCase.execute()} />
        </Suspense>
      </div>
    </section>
  );
}

function Influencers({
  promise,
}: {
  promise: Promise<Result<(User & InfluencerUser)[], string>>;
}) {
  const result = use(promise);

  if (result.isErr()) {
    return "Error...";
  }

  const influencers = result.value;

  return (
    <>
      {match(influencers)
        .with([], () => (
          <p className="text-neutral-400">No influencers available.</p>
        ))
        .otherwise(() => (
          <AuthorsGrid>
            {influencers.map((influencers) => (
              <AuthorRoot key={influencers.id}>
                <AuthorImage
                  className="aspect-square object-cover"
                  src={influencers.image}
                  alt={influencers.name}
                />
                <AuthorContent>
                  <AuthorTitle className="text-[#2b659b] font-medium text-[22px] mb-3">
                    {influencers.name}
                  </AuthorTitle>
                  <div className="flex flex-wrap gap-2">
                    {influencers.industry ? (
                      influencers.industry.split(",").map((tag) => (
                        <span
                          key={tag}
                          className="bg-[#e9f0f8] text-[#2b659b]/80 text-xs px-2 py-1.5 rounded-sm"
                        >
                          {tag.trim().toLowerCase()}
                        </span>
                      ))
                    ) : (
                      <span className="bg-[#e9f0f8] text-[#2b659b]/80 text-xs px-2 py-1.5 rounded-sm">
                        influencers
                      </span>
                    )}
                  </div>
                </AuthorContent>
              </AuthorRoot>
            ))}
          </AuthorsGrid>
        ))}
    </>
  );
}
